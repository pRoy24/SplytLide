import React from "react";
import { ActionRow } from "../cards/ActionRow";
import { BalanceRow } from "../cards/BalanceRow";
import { UserNegativeBalances } from "../cards/UserNegativeBalances";
import { UserPositiveBalances } from '../cards/UserPositiveBalances';

export default function HomeView() {
  return (
    <div className="bg-neutral-300 mt-2 shadow shadow-xl shadow-slate-200">
      <div>
       <ActionRow /> 
       <BalanceRow /> 
       </div>
       <div className="bg-neutral-100">
         <div className="grid grid-cols-2 gap-1">
            <div className="border-r-2 md:border-r-4 h-96">
               <UserNegativeBalances/>
            </div>
            <div>
              <UserPositiveBalances />
            </div>
         </div>
       </div>
    </div>
  )
}