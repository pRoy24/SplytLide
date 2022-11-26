import React from "react";

export function UserNegativeBalances(props) {
  //const { userOwedList } = props;
  const userOwedList = [
    {
      name: 'Rajamaesh',
      address: '0x01112342333',
      chain: '1',
      amount: '12.34',
      token: 'usdc',
      usdValue: '12.34',
    },
    {
      name: 'Steve',
      address: '0x01112342333',
      chain: '1',
      amount: '12.34',
      token: 'usdc',
      usdValue: '12.34',
    },
    {
      name: 'Sally',
      address: '0x01112342333',
      chain: '1',
      amount: '12.34',
      token: 'usdc',
      usdValue: '12.34',
    },      
  ]
  const userOwedListDisplay = userOwedList.map(function(item, idx) {
    return (
    <div>
       <div className="text-left pl-4">
          <div className="avatar rounded-full w-8 h-8 bg-green-500 inline-block"></div>
          <div className="inline-block ml-2 mr-2">
            <div>
            {item.name}
            </div>
            <div>
              You owe {item.usdValue}
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
        {userOwedListDisplay}
      </div>
    </div>
  )
}