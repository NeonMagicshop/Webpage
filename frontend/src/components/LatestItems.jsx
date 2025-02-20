import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from './Title';
import ProductItem from './ProductItem';
import { Link } from 'react-router-dom';

function LatestCollection() {
  const { products } = useContext(ShopContext);
  const [latestProducts, setLatestProducts] = useState([]);

  useEffect(() => {
    setLatestProducts(products.slice(0, 10));
  }, [products]);

  return (
    <div className='my-10'>
      <div className='text-center py-8 text-3xl'>
        <Title text1={'Latest'} text2={'Items'} />
        <p className='w-3/4 m-auto text-xs sm:text-sm md:text-base text-[#ADB5BD]'>
          Decor Your Space With Trending Signs
        </p>
      </div>
      {/* Render products even if latestProducts is initially empty */}
      <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6'>
        {latestProducts.map((item, index) => (
            <Link className='text-[#ADB5BD] cursor-pointer' to={`/product/${item._id}`}>
              <ProductItem key={index} id={item._id} name={item.name} price={item.sizes_prices[0].price} image={item.image}/>
            </Link>
        ))}
      </div>
    </div>
  );
}

export default LatestCollection;