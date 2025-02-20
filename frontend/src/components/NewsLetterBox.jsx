import React from 'react'

function NewsLetterBox() {
    const onSubmitHandler = (event) => {
        event.preventDefault();
    }
  return (
    <div className='text-center'>
      <p className='text-2xl font-medium text-[#ADB5BD]'>Subscribe now & get 20% off</p>
      <p className='text-[#DEE2E6] t-3'>
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus enim nulla quae eveniet ab dolorem
      </p>
      <form onSubmit={onSubmitHandler} className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border border-[#ADB5BD] pl-3'>
        <input className='w-full sm:flex-1 outline-none text-[#6C757D]' type="email" placeholder='Enter your email' required/>
        <button type='submit' className='bg-black text-[#DEE2E6] text-xs  px-10 py-4'>SUBSCRIBE</button>
      </form>
    </div>
  )
}

export default NewsLetterBox
