import React from 'react'
import {assets} from '../assets/assets.js'

function Hero() {
  return (
    <div className='flex border border-[#ADB5BD]'>
      <img className='w-full' src={assets.web_poster} alt="" />
    </div>
  )
}

export default Hero
