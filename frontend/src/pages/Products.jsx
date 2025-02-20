import React, { useContext, useState } from 'react'
import { useParams } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { useEffect } from 'react'
import { assets } from '../assets/assets'
import RelatedProducts from '../components/RelatedProducts'

function Products() {
  const {productId} = useParams();
  const {products, currency, sizeUnit, addToCart} = useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState('');
  const [size, setSize] = useState('');
  const [color, setColor] = useState('');
  const [collapsible, setCollapsible] = useState(false);
  const [price, setPrice] = useState('');

  const updatePrice = (size) => {
      const sizeLoop = productData.sizes_prices;
      sizeLoop.map((item) => {
        if (item.size === size) {
          setPrice(item.price);
        }
      })
  }

  const  fetchProductData = async() => {
    setSize('');
    setColor('');
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImage(item.image[0]);
        setPrice(item.sizes_prices[0].price)
        return null;
      }
    })
  }
  useEffect(() => {
    fetchProductData();
  }, [productId])
  return productData ? (
    <div className='border-t-2 border-[#ADB5BD] pt-10 transition-opacity ease-in duration-500 opacity-100'>
      {/* Product Data */}
      <div className='flex gap-12 sm:gap-12 flex-col  sm:flex-row'>
        {/* Product images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal sm:w-[18.7%] w-full'>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImage(item)} src={item} key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
              ))
            }
          </div>
          <div className='w-full sm:w-[80%]'>
            <img className='w-full h-auto' src={image} alt="" />
          </div>
        </div>
        {/* Product info */}
        <div className='flex-1'>
          <h1 className='font-medium text-4xl text-[#DEE2E6] mt-2'>{productData.name}</h1>
          {/* <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className='pl-2'>(122)</p>
          </div> */}
          <p className='mt-5 text-2xl text-[#DEE2E6] font-medium'>{currency} {price}</p>
          <p className='mt-5 text-[#ADB5BD] md:w-4/5'>{productData.tagLine}</p>
          <div className='flex flex-col gap-4 my-8'>
            <p className='text-[#DEE2E6]'>Select Size</p>
            <div className='flex gap-2'>
              {productData.sizes_prices.map((item, index) => (
                <button onClick={() => (setSize(item.size), updatePrice(item.size))} type="button" className={`border border-[#ADB5BD] rounded-[2px] py-2 px-4 bg-[#ADB5BD] ${item.size === size ? 'bg-[#DEE2E6]' : ''}`} key={index}>{item.size} {sizeUnit}</button>
              ))}
            </div>
          </div>
          {/* Colors selection */}
          <div className='flex flex-col gap-4 my-8'>
            <p className='text-[#DEE2E6]'>Select Color</p>
            <div className='flex gap-2'>
            {productData.colors.map((item, index) => (
              <button onClick={() => setColor(item.color)} type="button" className={`border border-[#ADB5BD] rounded-[2px] py-2 px-4 bg-[#ADB5BD] ${item.color === color ? 'bg-[#DEE2E6]' : ''}`} key={index}>{item.color}</button>
            ))}
            </div>
          </div>
          <button onClick={() => addToCart(productData._id, size, color, price)} className='bg-black text-[#DEE2E6] px-8 py-3 text-sm active:bg-gray-700'>ADD TO CART</button>
          <hr className='mt-8 sm:w-4/5 bg-[#ADB5BD]'/>
          <div className='text-sm text-[#ADB5BD] mt-5 flex flex-col gap-1'>
            <p>100% Original product.</p>
            <p>Cash on delivery is available on this product.</p>
            <p>Easy return and exchange policy within 7 days.</p>
          </div>
        </div>
      </div>
      {/* Description and Review section */}
      <div className='mt-20'>
        <div className='flex'>
          <b onClick={() => setCollapsible(!collapsible)} className='border border-[#ADB5BD] py-3 px-5 text-sm text-[#DEE2E6] w-full cursor-pointer'>Description</b>
          {/* <b className='border border-[#ADB5BD] py-3 px-5 text-sm text-[#DEE2E6]'>Reviews(122)</b> */}
        </div>
        <div className={`flex flex-col gap-4 border border-[#ADB5BD] px-6 py-6 text-sm text-[#ADB5BD] ${collapsible === true ? 'block' : 'hidden'}`}>
          <p>{productData.description}</p>
        </div>
      </div>
      {/* Display related products */}
      <RelatedProducts category={productData.category} subCategory={productData.subCategory}/>
    </div>
  ) : <div className='opacity-0'></div>
}

export default Products
