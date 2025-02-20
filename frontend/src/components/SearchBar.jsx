import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import { useLocation } from 'react-router-dom';

function SearchBar() {
    const {search, setSearch, showSearch, setShowSearch} = useContext(ShopContext);
    const [visible, setVisible] = useState(false);
    const location = useLocation();

    useEffect(() => {
        if (location.pathname.includes('collection') && showSearch) {
            setVisible(true);
        } else {
            setVisible(false);  
        }
    }, [location])
  return showSearch && visible ? (
    <div className='border-t border-[#ADB5BD] text-center'>
      <div className='inline-flex items-center justify-center border border-[#ADB5BD] px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:1/2'>
        <input value={search} onChange={(e) => setSearch(e.target.value)} className='flex-1 outline-none bg-inherit text-sm text-[#6C757D]' type="text" placeholder='Search' />
        <img src={assets.search_dark_icon} className='w-5' alt="" />
      </div>
      <img onClick={() => setShowSearch(false)} src={assets.close_dark_icon} className='inline w-5 cursor-pointer' alt="" />
    </div>
  ) : null
}

export default SearchBar
