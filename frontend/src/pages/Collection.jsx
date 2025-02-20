import React, { useContext, useEffect, useState } from 'react'
import {ShopContext} from '../context/ShopContext'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import ProductItem from '../components/ProductItem'

function Collection() {
  const { products, search, showSearch } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState(products); // Initialize with all products
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState('relevant');

  const toggleCategory = (e) => {
    if(category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value))
    }else{
      setCategory(prev => [...prev, e.target.value])
    }
  }

  // const toggleSubCategory = (e) => {
  //   if(subCategory.includes(e.target.value)) {
  //     setSubCategory(prev => prev.filter(item => item !== e.target.value))
  //   }else{
  //     setSubCategory(prev => [...prev, e.target.value])
  //   }
  // }

  const applyFilter = () => {
    let productsCopy = products.slice();

    if (showSearch && search) {
      productsCopy = productsCopy.filter(item => item.name.toLowerCase().includes(search.toLowerCase()));
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item => category.includes(item.category)); 
    }
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy);
  }

  const sortProduct = () => {
    let fpCopy = filterProducts.slice();

    switch (sortType) {
      case 'low-high':
        setFilterProducts(fpCopy.sort((a, b) => (a.sizes_prices[0].price - b.sizes_prices[0].price)));
        break;
      case 'high-low':
        setFilterProducts(fpCopy.sort((a,b) => (b.sizes_prices[0].price - a.sizes_prices[0].price)));
        break;
    
      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch, products])

  useEffect(() => {
    sortProduct();
  }, [sortType])

  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-[#ADB5BD]'>
      {/* Filter options */}
      <div className='min-2-60'>
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl text-[#DEE2E6] flex items-center cursor-pointer gap-2'>FILTERS
        <img src={assets.dropdown_icon} className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} alt="" /></p>
        {/* Category filter */}
        <div className={`border border-[#ADB5BD] pl-5 py-3 px-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm text-[#DEE2E6] font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light text-[#ADB5BD]'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'NeonSign'} onChange={toggleCategory}/> NeonSign
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'NeonPoster'} onChange={toggleCategory}/> NeonPoster
            </p>
          </div>
        </div>
        {/* Subcategory filter */}
        {/* <div className={`border border-[#ADB5BD] pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm text-[#DEE2E6] font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light text-[#ADB5BD]'>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubCategory} /> Topwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleSubCategory} /> Bottomwear
            </p>
            <p className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggleSubCategory} /> Winterwear
            </p>
          </div>
        </div> */}
      </div>
      {/* Right side */}
      <div className='flex-1'>
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          <Title text1={'All'} text2={'Items'}/>
          {/* Products sort */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-[#ADB5BD] text-sm text-[#ADB5BD] bg-[#03071E] px-2'>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>
        {/* Map products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {
            filterProducts.map((item, index) => (
              <ProductItem key={index} id={item._id} name={item.name} price={item.sizes_prices[0].price} image={item.image}/>
            ))
          }
        </div>
      </div>
    </div>
  )
}

export default Collection
