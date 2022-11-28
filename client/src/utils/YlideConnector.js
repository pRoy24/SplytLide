import {
	Ylide,
	BlockchainMap,
	BlockchainWalletMap,
	YlideKeyStore,
	BrowserIframeStorage,
	ListSourceMultiplexer,
  CriticalSection,
  ListSourceDrainer,
  IndexerListSource,
  BlockchainListSource,
  MessageContentV3,
  BrowserLocalStorage,
  BlockchainSourceType,
  SourceReadingSession,
} from '@ylide/sdk';
import { everscaleBlockchainFactory, everscaleWalletFactory } from '@ylide/everscale';
import {
	evmWalletFactories,
	evmBlockchainFactories,
	EVMNetwork,
  EthereumBlockchainController,
	EVM_CHAINS,
	EVM_NAMES,
	EVM_RPCS,
  EthereumListSource,
} from '@ylide/ethereum';
import { utils } from 'ethers';


Ylide.registerBlockchainFactory(everscaleBlockchainFactory);
// Ylide.registerBlockchainFactory(evmBlockchainFactories[EVMNetwork.LOCAL_HARDHAT]);
Ylide.registerBlockchainFactory(evmBlockchainFactories[EVMNetwork.ETHEREUM]);
Ylide.registerBlockchainFactory(evmBlockchainFactories[EVMNetwork.AVALANCHE]);
Ylide.registerBlockchainFactory(evmBlockchainFactories[EVMNetwork.ARBITRUM]);
Ylide.registerBlockchainFactory(evmBlockchainFactories[EVMNetwork.BNBCHAIN]);
Ylide.registerBlockchainFactory(evmBlockchainFactories[EVMNetwork.OPTIMISM]);
Ylide.registerBlockchainFactory(evmBlockchainFactories[EVMNetwork.POLYGON]);
Ylide.registerBlockchainFactory(evmBlockchainFactories[EVMNetwork.FANTOM]);
Ylide.registerBlockchainFactory(evmBlockchainFactories[EVMNetwork.KLAYTN]);
Ylide.registerBlockchainFactory(evmBlockchainFactories[EVMNetwork.GNOSIS]);
Ylide.registerBlockchainFactory(evmBlockchainFactories[EVMNetwork.AURORA]);
Ylide.registerBlockchainFactory(evmBlockchainFactories[EVMNetwork.CELO]);
Ylide.registerBlockchainFactory(evmBlockchainFactories[EVMNetwork.CRONOS]);
Ylide.registerBlockchainFactory(evmBlockchainFactories[EVMNetwork.MOONBEAM]);
Ylide.registerBlockchainFactory(evmBlockchainFactories[EVMNetwork.MOONRIVER]);
Ylide.registerBlockchainFactory(evmBlockchainFactories[EVMNetwork.METIS]);
Ylide.registerBlockchainFactory(evmBlockchainFactories[EVMNetwork.ASTAR]);
Ylide.registerWalletFactory(everscaleWalletFactory);
Ylide.registerWalletFactory(evmWalletFactories.metamask);
Ylide.registerWalletFactory(evmWalletFactories.coinbase);
Ylide.registerWalletFactory(evmWalletFactories.trustwallet);
Ylide.registerWalletFactory(evmWalletFactories.binance);
Ylide.registerWalletFactory(evmWalletFactories.walletconnect);

let initConnector = false;

export class YlideConnector {
  storage = new BrowserLocalStorage();
  ylide;
  keystore;
  folderChangeCriticalSection = new CriticalSection();
  accountSourceMatch = new Map();
  wallets = [];
  constructor() {
    if (!initConnector) {
      initConnector = true;
      this.initChain();
    } 
  }

  async initChain() {
		this.registeredWallets = Ylide.walletsList.map(w => w.factory);
		this.registeredBlockchains = Ylide.blockchainsList.map(b => b.factory).filter((a) => (a.blockchain === 'POLYGON'));
  }

  async initWallet() {

    let reader;
    this.availableWallets = await Ylide.getAvailableWallets();

    const keystore = new YlideKeyStore(this.storage, {
	  onPasswordRequest: async (reason) =>
		  prompt(`Enter Ylide password for ${reason}:`),
      onDeriveRequest: async (
        reason, blockchainGroup,
        walletName, address, magicString
      ) => {
        try {
          const wallet = this.wallet;
          if (!wallet) {
            return null;
          }
          return  wallet.signMagicString(
            {
              address,
              blockchain: blockchainGroup,
              publicKey: null,
            },
            magicString,
          );
        } catch (err) {
          console.log(err);
          return null;
        }
      },
    });

    await keystore.init();
    
    this.keystore = keystore;
    const ylide = new Ylide(keystore);


    
    this.wallet = await ylide.addWallet('evm', 'metamask', {
      dev: false, //document.location.hostname === 'localhost',
      onSwitchAccountRequest: {},
      onNetworkSwitchRequest: async (
      reason,
      currentNetwork,
      needNetworkVMNetwork,
      needChainId,
    ) => {
      try {
      // await this.switchEVMChain(needNetwork);
      } catch (err) {

      }
    },
    //walletConnectProvider: factory.wallet === 'walletconnect' ? wc?.walletConnectProvider : null,
    });
    const blockchain = await ylide.addBlockchain('POLYGON');
    const account = await this.wallet.requestAuthentication();
    
    this.account = account;
    this.reader = blockchain;
    this.blockchain = blockchain;

    this.ylide = ylide;

  }

  async createKeyStore() {
    const self = this;
    const passwordStr = process.env.password;
    const keyPairResponse = await this.keystore.create(
      'For your second key',
      'evm', // blockchain group
      "metamask", // wallet name
      self.account.address,
      passwordStr
    );
    this.keypair = keyPairResponse;
    //localStorage.setItem("ylide_password", passwordStr);
  }

  async getKeyStore() {
    const keyStoreRemote = await this.reader.extractPublicKeyFromAddress(this.account.address);
    console.log(keyStoreRemote);
  }

  async sendInvoiceMessage(content) {
    const msgId = await this.ylide.sendMessage({
      wallet: this.wallet,
      sender: this.account,
      content,
      recipients: ['0x15a33D60283e3D20751D6740162D1212c1ad2a2d'],
    });
  }

  async readInvoiceMessages() {
     const blockchain = "POLYGON";
     const account = this.account;
    const reader =  this.reader;
    this.readingSession = new SourceReadingSession();

    this.readingSession.sourceOptimizer = (subject, reader) => {
				return new IndexerListSource(
					new EthereumListSource(reader, subject, 30000),
					this.readingSession.indexerHub,
					reader,
					subject,
				);
		};

    const accountAddress = this.account.address.toLowerCase();
    const addressPadded = "000000000000000000000000" + accountAddress.split("0x")[1];
    const ls = this.readingSession.listSource(
      {
        blockchain,
        type: BlockchainSourceType.DIRECT,
        recipient: addressPadded,
        sender: null,
      },
      reader,
    );


		const sentAddress = Ylide.getSentAddress(this.wallet.addressToUint256(this.account.address));

    const lsSent = this.readingSession.listSource(
      {
        blockchain,
        type: BlockchainSourceType.DIRECT,
        recipient: sentAddress,
        sender: null,
      },
      reader,
    );
    this.accountSourceMatch.set(ls, { account, reader });
    const multiplexer = new ListSourceMultiplexer([ls, lsSent]);
    this.currentList = new ListSourceDrainer(multiplexer);
    try {
      await this.currentList.resume();
    } catch (e) {
      console.log(e);
    }
    const self = this;
    const messages = await this.currentList.readUntil(10);
    const messageListResponse = messages.map(function(messageEncrypted) {
      const msgId = messageEncrypted.msg.msgId;
      return reader.retrieveMessageContentByMsgId(msgId).then(function(dataRes) {
        return self.ylide.decryptMessageContent(self.keypair, messageEncrypted.msg, dataRes).then(function(decoded) {
          console.log(decoded);
          if (decoded.subject.startsWith("SPLYTLIDE_INV_")) {
            return decoded;
          } else {
            return null;
          }
        })
      })
    });
    const dataRes = (await Promise.all(messageListResponse)).filter(Boolean);
    console.log(dataRes);
    return dataRes;
  }


  async sendNewMessage(payload) {
    console.log(payload);
    console.log("TT");
    const network = 3;
    const dataMessage = JSON.stringify(payload);
    const subject = `SPLYTLIDE_INV_REQ_${this.account.address}`;
    const content = MessageContentV3.plain(subject, dataMessage);

    
    const msgId = await this.ylide.sendMessage({
      wallet: this.wallet,
      sender: this.account,
      content,
      recipients: payload.sharer_addresses,
    },
    {
      network:network ,
    },);
    console.log(msgId);
  }
    
  

}