import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import MetaPixelLead from '../utils/meta/MetaPixelLead';

function OrderPlaced() {
    const {navigate, token, setCartItems, backendUrl} = useContext(ShopContext);
  return (
    <div>
    <MetaPixelLead />
      <div className="text-center pt-8 border-t border-[#ADB5BD]">
        <h1 className='text-[#F48C06] my-4 text-xl sm:text-4xl'>Your Order Has been Placed Placed Successfully!</h1>
      </div>
      <div className="text-1/4xl sm:text-xl text-center pt-4 text-[#ADB5BD]">
      <p >We at Neon Magic welcome you to the Neon Magic family, we appreciate for your trust in us,
      and can't wait for you to see the magic come to light!</p>
      <p className='text-[#DEE2E6]'>Be sure to check your email for the order confirmation. Didn't get the email? Be sure to check your spam email, ThankYou!</p>
      <p>If you have any questions regarding your order, feel free to reach us out at <br/> neonmagic@gmail.com or +92-336-563-5253</p> 
      {token ? <p className='cursor-pointer text-[#DEE2E6] hover:text-[#F48C06]'><a href="/orders">Continue To Order's Page</a></p>
      : <p className='cursor-pointer text-[#F48C06] hover:text-[#DEE2E6]'><a href="/track-order">Track Order</a></p>}
      <button onClick={() => navigate('/')} className='bg-black text-[#DEE2E6] text-xs px-10 py-4 mt-4'>Continue Shopping</button>
      </div>
    </div>
  )
}

export default OrderPlaced
