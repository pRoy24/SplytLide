import React from "react";

export function ActionRow() {
  return (
    <div> 
      <div className="flex flex-row">
        <div className="text-upper text-2xl font-semibold text-left pt-5 pl-6 basis-3/4">
          Dashboard
        </div>
        <div className="pt-4 text-left relative basis-1/4">
          <div className="absolute left-4">
          <button className="focus:outline-none text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 dark:focus:ring-red-900">
            Add Expense
          </button>
          <button className="focus:outline-none text-white bg-emerald-600 hover:bg-emerald-800 focus:ring-4 focus:ring-emerald-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-emerald-600 dark:hover:bg-emerald-700 dark:focus:ring-emerald-900">
            Settle up
          </button>
          </div>
        </div>
      </div>
    </div>
  )
}