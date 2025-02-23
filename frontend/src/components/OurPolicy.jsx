import React from 'react'
import { assets } from '../assets/assets'

function OurPolicy() {
  return (
    <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-[#ADB5BD]'>
      <div>
        <img src={assets.exchange_dark_icon} className='w-12 m-auto mb-5' alt="" />
        <p className='semi-bold'>Easy Exchange Policy</p>
        <p className='text-[#DEE2E6]'>We offer hassle free exchange policy</p>
      </div>
      <div>
        <img src={assets.quality_icon} className='w-12 m-auto mb-5' alt="" />
        <p className='semi-bold'>7 Days Return Policy</p>
        <p className='text-[#DEE2E6]'>We provide 7 day free return policy</p>
      </div>
      <div>
        <img src={assets.support_dark_icon} className='w-12 m-auto mb-5' alt="" />
        <p className='semi-bold'>Best Customer Support</p>
        <p className='text-[#DEE2E6]'>We provide 24/7 customer support</p>
      </div>
    </div>
  )
}

export default OurPolicy
