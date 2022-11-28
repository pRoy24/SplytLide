import React from "react";
import AddressBlock from './AddressBlock';

export function UserPositiveBalances(props) {
  const { invoiceMessages } = props;

  const invoiceMessageDisplay = invoiceMessages.map(function(itemDataJson, idx) {

    return (
      <div>
        <div className="text-left pl-4">
          <div className="avatar rounded-full w-8 h-8 bg-green-500 inline-block"></div>
          <div className="inline-block ml-2 mr-2">
          <div>
           <div className="text-sm">
           From <AddressBlock address={itemDataJson.subject}/> 
           </div>
           <div className="text-sm">
            Amount due {itemDataJson.share} $ 
           </div>
           <div>
           {itemDataJson.body}
           </div>
          </div>
          </div>
        </div>
    </div>
    )
  }); 
  return (
    <div>
      <div className="pt-2 font-lg font-bold text-right pr-6 pl-4 text-slate-900">
        YOU ARE OWED
      </div>
      <div>
        {invoiceMessageDisplay}
      </div>
    </div>
  )


}