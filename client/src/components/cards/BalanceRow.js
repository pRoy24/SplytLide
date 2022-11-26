import React from 'react';
import { UserNegativeBalances } from './UserNegativeBalances';

export function BalanceRow() {
  return (
    <div className='grid grid-cols-3 gap-1 p-4 text-center'>
      <div className='border border-slate-400 hover:border-slate-500 pt-4 pb-4'>
        Total Balance
      </div>
      <div className='border border-slate-400 hover:border-slate-500 pt-4 pb-4'>
        You Owe
      </div>
      <div className='border border-slate-400 hover:border-slate-500 pt-4 pb-4'>
        You are owed
      </div>
    </div>
  )
}