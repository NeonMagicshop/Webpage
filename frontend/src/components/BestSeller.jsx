import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';

function BestSeller() {
    const { products } = useContext(ShopContext);
    const [bestSeller, setBestSeller] = useState([]); 
  
    useEffect(() => {
      const bestProducts = products.filter((item) => item.bestSeller);
      setBestSeller(bestProducts.slice(0, 5));
    }, [products]);
    

  return (
    <div className='my-10'>
      <div className='text-center text-3xl py-8'>
        <Title text1={'Best'} text2={'Seller'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-[#ADB5BD]'>
        Get Your Self The Best That You Deserve
        </p>
      </div>
      {/* Render products even if bestSeller is initially empty */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {bestSeller.map((item, index) => (
          <ProductItem key={index} id={item._id} image={item.image} name={item.name} price={item.sizes_prices[0].price} />
        ))}
      </div>
    </div>
  );
}

export default BestSeller;