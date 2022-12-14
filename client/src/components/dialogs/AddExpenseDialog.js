import React, { useState } from 'react';

export function AddExpenseDialog(props) {
  const { createNewInvoice, show , hide} = props;
  const [ addressListString, setAddressListString,] = useState('');
  const [ amount, setAmount ] = useState(0);
  const [ description, setDescription ] = useState('');
  const createNewInvoiceHandler = (evt) => {
    evt.preventDefault();
    console.log(addressListString);
    const addressList = addressListString.trim().split(',');
    const payload = {
      addressList,
      amount,
      description,
    }
    console.log(payload);
    createNewInvoice(payload);
  }
  let displayClass = "hidden";
  if (show) {
    displayClass = "block";
  }
  return (
    <div>
<form onSubmit={createNewInvoiceHandler}>
<div id="defaultModal" tabindex="-1" aria-hidden="true" class={
  `${displayClass} overflow-y-auto overflow-x-hidden
   fixed top-0 right-0 left-0 z-50 p-4 m-auto md:inset-0 h-modal md:h-full`}>
    <div class="relative w-full max-w-2xl h-full md:h-auto m-auto">
        <div class="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div class="flex justify-between items-start p-4 rounded-t border-b dark:border-gray-600">
                <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
                    Send an expense or split a bill.
                </h3>
                <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-toggle="defaultModal" onClick={hide}>
                    <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
                    <span class="sr-only">Close modal</span>
                </button>
            </div>

            <div class="p-6 space-y-6">
            <div>
              <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">With you and (Add addresses separated by commas)</label>
              <input type="text" id="first_name" class="bg-gray-50 border border-gray-300
              text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
              p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                dark:focus:border-blue-500" placeholder="Address list of address separated by commas" required
                onChange={(evt) => setAddressListString(evt.target.value)}/>
            </div>
            <div>
              <label for="first_name" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Amount
              </label>
              <input type="text" id="first_name" class="bg-gray-50 border border-gray-300
              text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
              p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
                dark:focus:border-blue-500" placeholder="Amount of USDC spent in total" required 
                onChange={(evt) => setAmount(evt.target.value)}/>
            </div>           
            <div>
        <label for="description" class="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
          Add a brief description of the expense
          </label>
            <textarea rows="2" id="description" class="bg-gray-50 border border-gray-300
             text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full 
             p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500
              dark:focus:border-blue-500" placeholder="Description" onChange={(evt) => setDescription(evt.target.value)}/> 
        </div>
          
            <div className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
                  Paid by <div className='inline'>You</div> and split <div className='inline'>equally</div> 
                </div>
            </div>
       
            <div class="flex items-center p-6 space-x-2 rounded-b border-t border-gray-200 dark:border-gray-600">
                <button data-modal-toggle="defaultModal" type="submit"
                 class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300
                  font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700
                   dark:focus:ring-blue-800">
                    Send
                   </button>
                <button data-modal-toggle="defaultModal" type="button"
                 class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 
                 focus:outline-none focus:ring-blue-300 rounded-lg border border-gray-200
                  text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700
                   dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600
                    dark:focus:ring-gray-600">
                      Cancel
                </button>
            </div>
        </div>
    </div>
</div>
</form>
    </div>
  )
}