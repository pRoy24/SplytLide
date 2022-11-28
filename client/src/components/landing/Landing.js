import React, { useEffect } from 'react';
import LoginView from './LoginView';
import HomeView from './HomeView';
import { TopNav } from '../nav/TopNav';

export function Landing(props) {
  
  const { isConnected, connector, createNewInvoice, invoiceMessages } = props;  
  let defaultView = <span />;

  const activateKey = async () => {   

  }

  if (!isConnected) {
    defaultView = <LoginView activateKey={ activateKey }/>;
  } else {
    defaultView = <HomeView connector={ connector } createNewInvoice={ createNewInvoice }
    invoiceMessages={invoiceMessages}/>;
  }
  const self = this;
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