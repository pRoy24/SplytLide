import React, { useEffect, useMemo, useState } from 'react';


import { Landing } from './Landing';

import {YlideConnector} from '../../utils/YlideConnector'


export default function LandingContainer() {
  const [connector, setConnector ] = useState({});
  const [ isConnected, setIsConnected ] = useState(false);
  const [ invoiceMessages, setInvoiceMessages ] = useState([]);
  useEffect(() => {
    const yc = new YlideConnector();
    console.log(yc);
    yc.initWallet().then(function(response) {
       setConnector(yc);
      if (yc.account && yc.account.address) {
       setIsConnected(true);
       yc.createKeyStore().then(function(ycr) {
       yc.readInvoiceMessages().then(function(invoiceMessageList) {
        setInvoiceMessages(invoiceMessageList);
       })
      })
      }
    });
  }, []);
 
  const createNewInvoice = (dataPayload) => {
    const numSharers = dataPayload.addressList.length + 1;
    const share = parseInt(dataPayload.amount) / numSharers;
    const payload = {
      "subject": dataPayload.addressList[0],
      "body": dataPayload.description,
      "amount": dataPayload.amount,
      "sharers": numSharers,
      "sharer_addresses": dataPayload.addressList,
      "share": share.toFixed(2)
    };
    console.log(payload);
    connector.sendNewMessage(payload);
  }

  return (
    <div>
      <Landing isConnected={isConnected} connector={connector} createNewInvoice={createNewInvoice}
      invoiceMessages={invoiceMessages}/>
    </div>
  )
}