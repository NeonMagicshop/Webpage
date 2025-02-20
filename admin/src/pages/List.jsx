import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App';
import { toast } from 'react-toastify';

function Link({token}) {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    if (!token) {
      return null;
    }
      try {
        const response = await axios.get(backendUrl + '/api/product/list');
        if (response.data.success) {
          setList(response.data.products);
        } else {
          toast.error(response.data.message);
        }
        
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
  };

  const removeProduct = async (id) => {
      try {
        const response = await axios.post(backendUrl + '/api/product/delete', {id}, {headers: {token}});
        if (response.data.success) {
          toast.success(response.data.message);
          await fetchList();
        } else {
          toast.error(response.data.message);
        }
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
  }

  useEffect(() => {
    fetchList();
  }, []);

  return token ? (
    <>
      <p className='mb-2 text-[#DEE2E6]'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* List Table Title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr_1fr] items-center py-1 px-2 border border-[#ADB5BD] text-[#DEE2E6] text-sm'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Sizes</b>
          <b>Colors</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>
        {/* Product List */}
        {
          list.map((item, index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm text-[#ADB5BD]' key={index}>
              {console.log(item)}
              <img className='w-12' src={item.image[0]} alt="" />
              <p>{item.name}</p>
              <p>{item.category}</p>
              <p>{item.sizes_prices.map((sizes, index) => <span key={index}>{sizes.size}, <br/></span>)}</p>
              <p>{item.colors.map((color, index) => <span key={index}>{color.color}, <br/></span>)}</p>
              <p>{item.sizes_prices.map((sizes, index) => <span key={index}>{currency} {sizes.price}, <br/></span>)}</p>
              <p onClick={() => removeProduct(item._id)} className='text-right md:text-center cursor-pointer text-lg'>X</p>
            </div>
          ))
        }
      </div>
    </>
  ) : null
}

export default Link
