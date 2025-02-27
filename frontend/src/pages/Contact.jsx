import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'
import MetaPixel from '../utils/meta/MetaPixel';

function Contact() {
  return (
    <div>
    <MetaPixel />
    <div className='text-center text-2xl pt-10 border-t'>
      <Title text1={'CONTACT'} text2={'US'}/>
    </div>
    <div className='my-10 flex flex-col justify-center md:flex-row gap-10 mb-28'>
      <img className='w-full md:max-w-[480px]' src={assets.neonmagic_poster} alt="" />
      <div className="flex flex-col justify-center items-start gap-6">
        <p className='font-semibold text-xl text-[#DEE2E6]'>Say Hello!</p>
        <p className='text-[#ADB5BD]'>Have questions or a custom neon sign idea in mind? <br /> Reach out to us on Whatsapp</p>
        <p className='text-[#ADB5BD]'>Tel: +92 318 2525652 <br /> Email: support@neonmagic.shop</p>
        {/* <p className='font-semibold text-xl text-[#DEE2E6]'>Careers at Forever</p>
        <p className='text-[#ADB5BD]'>Lear more about our teams and job openings.</p>

        <button className='border border-[#ADB5BD] px-8 py-4 text-sm text-[#DEE2E6] hover:bg-black hover:text-[#DEE2E6] transition-all duration-500'>Explore Jobs</button> */}
      </div>
    </div>
    </div>
  )
}

export default Contact
