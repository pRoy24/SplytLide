import React, { useEffect } from 'react';
import LoginView from './LoginView';
import HomeView from './HomeView';
import { TopNav } from '../nav/TopNav';

export function Landing(props) {
  
  const { isConnected, connector, createNewInvoice, invoiceMessages } = props;  
  let defaultView = <span />;


  if (!isConnected) {
    defaultView = <LoginView />;
  } else {
    console.log(connector);
    const connectedAddress = connector.account.address;
    console.log(connectedAddress);
    const positiveBalances = [];
    const negativeBalances = [];
    invoiceMessages.forEach(function(messageItem) {
      const messageJson = JSON.parse(messageItem.content);
      if (messageJson.subject && connectedAddress && messageJson.subject.toString().toLowerCase() === connectedAddress.toLowerCase()) {
        positiveBalances.push(messageJson);
      } else {
        negativeBalances.push(messageJson);
      }
    });
   
    defaultView = <HomeView connector={ connector } createNewInvoice={ createNewInvoice }
    positiveBalances={positiveBalances} negativeBalances={negativeBalances}/>;
  }
  return (
    <div>
      <TopNav/>
      <div className='container mx-auto px-4'>
       <div>
        {defaultView}
       </div>
      </div>
    </div>
  )
}