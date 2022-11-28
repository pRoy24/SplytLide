import React from 'react';
import { UserNegativeBalances } from './UserNegativeBalances';

export function BalanceRow(props) {
  const { totalNegative, totalPositive } = props;
  const sumTotal = totalPositive - totalNegative;
  return (
    <div className='grid grid-cols-3 gap-1 p-4 text-center'>
      <div className='border border-slate-400 hover:border-slate-500 pt-4 pb-4'>
        Total Balance ${sumTotal}
      </div>
      <div className='border border-slate-400 hover:border-slate-500 pt-4 pb-4'>
        You Owe ${totalNegative}
      </div>
      <div className='border border-slate-400 hover:border-slate-500 pt-4 pb-4'>
        You are owed ${totalPositive}
      </div>
    </div>
  )
}