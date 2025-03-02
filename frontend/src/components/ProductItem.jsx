import React, { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { Link } from 'react-router-dom';

function ProductItem({id, image, name, price}) {
    const {currency} = useContext(ShopContext);
    
  return (
    <Link className='text-[#ADB5BD] cursor-pointer' to={`/product/${id}`}>
      <div className='relative overflow-hidden rounded-[5px]'>
        <span className='absolute top-2 left-2 bg-[#F48C06] text-[#DEE2E6] text-xs font-bold px-2 py-1 rounded'>
         Sale
        </span>
        <img className='hover:scale-110 transition ease-in-out' src={image[0]} alt="" />
      </div>
      <p className='pt-3 pb-1 text-sm'>{name}</p>
      <div className='flex flex-row gap-2'>
        <p className='line-through text-[#F48C06] text-sm font-medium'>{currency} {Math.round(price / 0.7)}</p>
        <p className='text-sm font-medium'>{currency} {price}</p>
      </div>
    </Link>
  )
}

export default ProductItem
