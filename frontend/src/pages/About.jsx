import React from 'react'
import Title from '../components/Title'
import { assets } from '../assets/assets'

function About() {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t border-[#ADB5BD]">
        <Title text1={'ABOUT'} text2={'US'}/>
      </div>
      <div className="my-10 flex flex-col md:flex-row gap-16">
        <img className='w-full md:max-w-[450px]' src={assets.neonmagic_poster} alt="" />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-[#ADB5BD]">
          <p>At Neon Magic, we specialize in crafting vibrant, customized neon signs that bring your vision to life. Whether it’s for your business, home, or a special event, our designs add personality and a glowing touch to any space. With a focus on quality, creativity, and customer satisfaction, we’re here to light up your world—one sign at a time.</p>
          <b className='text-[#DEE2E6]'>Our Mission</b>
          <p>Light Up Your World, One Neon Sign at a time!</p>
        </div>
      </div>
      <div className="text-xl py-4">
        <Title text1={'Why'} text2={'Choose Us'}/>
      </div>
      <div className="flex flex-col md:flex-row text-sm mb-20">
        <div className="border border-[#ADB5BD] px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 text-[#DEE2E6]">
          <b>Quality Assurance:</b>
          <p className='text-[#ADB5BD]'>At the heart of our commitment lies unwavering quality assurance. We meticulously inspect every step of the process, from raw material sourcing to final delivery. Our rigorous testing procedures ensure that only products meeting the highest standards reach our customers. We believe in delivering excellence and exceeding expectations in every aspect of our service.</p>
        </div>
        <div className="border border-[#ADB5BD] px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 text-[#DEE2E6]">
          <b>Convenience:</b>
          <p className='text-[#ADB5BD]'>We strive to make your experience as seamless as possible. Our user-friendly platform and intuitive interface provide easy access to our services. We offer flexible delivery options and convenient payment methods to cater to your specific needs. We believe in making your life easier and freeing up your time so you can focus on what matters most.</p>
        </div>
        <div className="border border-[#ADB5BD] px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5 text-[#DEE2E6]">
          <b>Exceptional Customer Service:</b>
          <p className='text-[#ADB5BD]'>Our dedication to exceptional customer service sets us apart. We are committed to providing prompt and personalized support to address any questions or concerns you may have. Our knowledgeable and friendly team is always available to assist you and ensure your complete satisfaction. We value your feedback and strive to continuously improve our services based on your valuable input.</p>
        </div>
      </div>
    </div>
  )
}

export default About
