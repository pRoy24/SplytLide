import React, { useState } from "react";
import { ActionRow } from "../cards/ActionRow";
import { BalanceRow } from "../cards/BalanceRow";
import { UserNegativeBalances } from "../cards/UserNegativeBalances";
import { UserPositiveBalances } from '../cards/UserPositiveBalances';
import { AddExpenseDialog } from "../dialogs/AddExpenseDialog";

export default function HomeView(props) {
  const { connector, createNewInvoice, positiveBalances, negativeBalances } = props;
  const [ showInvoiceDialogVisible, setShowInvoiceDialogVisible ] = useState(false); 
  const account = connector.account;
  const showSendInvoiceDialog = () => {
    setShowInvoiceDialogVisible(true);
  } 
  const hideShowInvoiceDialogVisible = () => {
    setShowInvoiceDialogVisible(false);
  }
  let totalPositive = 0;
  let totalNegative = 0;
  positiveBalances.forEach(function(positiveBal) {
    totalPositive += parseInt(positiveBal.share);
  }); 
  negativeBalances.forEach(function(negativeBal) {
    totalNegative += parseInt(negativeBal.share);
  });
  return (
    <div className="bg-neutral-300 mt-2 shadow shadow-xl shadow-slate-200">
      <div>
       <ActionRow showSendInvoiceDialog={showSendInvoiceDialog}/> 
       <BalanceRow totalPositive={totalPositive} totalNegative={totalNegative}/> 
       <AddExpenseDialog createNewInvoice={createNewInvoice} show={showInvoiceDialogVisible} hide={hideShowInvoiceDialogVisible}/>
       </div>
       <div className="bg-neutral-100">
         <div className="grid grid-cols-2 gap-1">
            <div className="border-r-2 md:border-r-4 h-96">
               <UserNegativeBalances invoiceMessages={negativeBalances}/>
            </div>
            <div>
              <UserPositiveBalances invoiceMessages={positiveBalances} />
            </div>
         </div>
       </div>
    </div>
  )
}