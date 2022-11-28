import React from "react";
import AddressBlock from './AddressBlock';

export function UserNegativeBalances(props) {
  //const { userOwedList } = props;
  const { invoiceMessages } = props;

  if (invoiceMessages.length === 0) {
    return <span />;
  }
  console.log(invoiceMessages);
  const invoiceMessageDisplay = invoiceMessages.map(function(item, idx) {
    const itemDataJson = JSON.parse(item.content);
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
            Amount due {itemDataJson.amount} $ 
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
      <div className="pt-2 font-lg font-bold text-left pr-6 pl-6 text-slate-900">
        YOU OWE
      </div>
      <div>
        {invoiceMessageDisplay}
      </div>
    </div>
  )
}