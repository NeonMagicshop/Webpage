import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

function CartTotal() {
  const {currency, delivery_fee, getCartAmount} = useContext(ShopContext);

  return (
    <div className='w-full'>
      <div className='text-2xl'>
        <Title text1={'CART'} text2={'TOTALS'}/>
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm text-[#DEE2E6]'> 
        <div className='flex justify-between'>
            <p>SUBTOTAL</p>
            <p className='text-[#ADB5BD]'>{currency} {getCartAmount()}.00</p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <p>DELIVERY FEE</p>
            <p className='text-[#ADB5BD]'>{delivery_fee === 0 ? "FREE" : "" + currency + delivery_fee + '.00'} </p>
        </div>
        <hr />
        <div className='flex justify-between'>
            <p>TOTAL</p>
            <p className='text-[#ADB5BD]'>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}.00</p>
        </div>
      </div>
    </div>
  )
}

export default CartTotal
