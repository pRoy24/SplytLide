import React from 'react';

export default function AddressBlock(props) {
  const { address } = props; 
  return (
    <div className='inline-block'>
      {address.slice(0, 4)}...{address.slice(address.length - 5, address.length)}
    </div>
  )
}