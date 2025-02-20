import React from 'react'
import {assets} from '../assets/assets.js'

function Navbar({setToken}) {
  return (
    <div className='flex items-center py-2 px-[4%] justify-between'>
      <img className='w-[max(10%,80px)]' src={assets.neonmagic_logo} alt="" />
      <button onClick={() => setToken('')} className='bg-black text-[#DEE2E6] px-5 py-2 sm:px-7 sm:py-2 rounded-full text-xs sm:text-sm'>logout</button>
    </div>
  )
}

export default Navbar
