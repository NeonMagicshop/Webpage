import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App';
import { toast } from 'react-toastify';

function Add({token}) {
  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [tagLine, setTagLine] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('NeonSign');
    // const [subCategory, setSubCategory] = useState('Topwear');
  const [bestseller, setBestseller] = useState(false);
  const [colors, setColors] = useState([]);
  const [productSizes, setProductSizes] = useState([
    { size: '', price: '' }, 
  ]);
  const [productColors, setProductColors] = useState([
    { color: '' },
  ]);

  const handleSizeChange = (index, size, price) => {
    const updatedSizes = [...productSizes]; 
    updatedSizes[index] = { size, price };
    setProductSizes(updatedSizes);
  };

  const handleAddSize = () => {
    setProductSizes([...productSizes, { size: '', price: '' }]); 
  };

  const handleRemoveSize = (index) => {
    if (productSizes.length > 1) { // Prevent removing the last size option
      const updatedSizes = [...productSizes];
      updatedSizes.splice(index, 1);
      setProductSizes(updatedSizes);
    }
  };

  const handleColorChange = (index, color) => {
    const updatedColors = [...productColors];
    updatedColors[index].color = color;
    setProductColors(updatedColors);
  };

  const handleAddColor = () => {
    setProductColors([...productColors, { color: '' }]);
  };

  const handleRemoveColor = (index) => {
    if (productColors.length > 1) { 
      const updatedColors = [...productColors];
      updatedColors.splice(index, 1);
      setProductColors(updatedColors);
    }
  };

  const onSubmitHandler = async (e) => {
      e.preventDefault();

      try {
        const formData = new FormData();
        formData.append('name', name);
        formData.append('tagLine', tagLine);
        formData.append('description', description);
        formData.append('category', category);
        // formData.append('subCategory', subCategory);
        formData.append('bestseller', bestseller);
        formData.append('sizes_prices', JSON.stringify(productSizes));
        formData.append('colors', JSON.stringify(productColors));
        
        image1 && formData.append('image1', image1);
        image2 && formData.append('image2', image2);
        image3 && formData.append('image3', image3);
        image4 && formData.append('image4', image4);

        const response = await axios.post(backendUrl + '/api/product/add', formData, {headers:{token}});
        
        if (response.data.success) {
          toast.success(response.data.message);
          setName('');
          setDescription('');
          setTagLine('');
          setImage1(false);
          setImage2(false);
          setImage3(false);
          setImage4(false);
          setProductSizes([{ size: '', price: '' },]);
          setColors([]);
          setBestseller(false);
        } else {
          toast.error(response.data.message); 
        }
        
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
  }

 return token ? (
    <form onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3'>
      <div>
        <p className='mb-2 text-[#DEE2E6]'>Upload Image</p>
        <div className='flex gap-2'>
          <label htmlFor="image1">
            <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
            <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden/>
          </label>
          <label htmlFor="image2">
            <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
            <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden/>
          </label>
          <label htmlFor="image3">
            <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
            <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden/>
          </label>
          <label htmlFor="image4">
            <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
            <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden/>
          </label>
        </div>
      </div>

      <div className='w-full'>
        <p className='mb-2 text-[#DEE2E6]'>Product Name</p>
        <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2 text-[#ADB5BD]' type="text" placeholder='Type here' required/>
      </div>

      <div className='w-full'>
        <p className='mb-2 text-[#DEE2E6]'>Product Tagline</p>
        <input onChange={(e) => setTagLine(e.target.value)} value={tagLine} className='w-full max-w-[500px] px-3 py-2 text-[#ADB5BD]' type="text" placeholder='Type here' required/>
      </div>

      <div className='w-full'>
        <p className='mb-2 text-[#DEE2E6]'>Product Description</p>
        <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2 text-[#ADB5BD]' type="text" placeholder='Type here' required/>
      </div>

      <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
        <div>
          <p className='mb-2 text-[#DEE2E6]'>Product Category</p>
          <select onChange={(e) => setCategory(e.target.value)} className='w-full px-3 py-2 text-[#ADB5BD]'>
            <option value="NeonSign">NeonSign</option>
            <option value="NeonPoster">NeonPoster</option>
          </select>
        </div>
        {/* <div>
          <p className='mb-2 text-[#DEE2E6]'>Sub Category</p>
          <select onChange={(e) => setSubCategory(e.target.value)} className='w-full px-3 py-2 text-[#ADB5BD]'>
            <option value="Topwear">Topwear</option>
            <option value="Bottomwear">Bottomwear</option>
            <option value="Winterwear">Winterwear</option>
          </select>
        </div> */}
      </div>
      {/* add product size and price */}
      <div>
        <p className='mb-2 text-[#DEE2E6]'>Product Sizes</p>
        {productSizes.map((item, index) => (
          <div className='flex flex-col py-2 sm:flex-row gap-2 w-full sm:gap-8' key={index}>
            <input 
              type="text" 
              placeholder="Size" 
              value={item.size} 
              onChange={(e) => handleSizeChange(index, e.target.value, item.price)}
              className='w-full px-3 py-2 sm:w-[120px] text-[#ADB5BD]'
              required
            />
            <input 
              type="number" 
              placeholder="Price" 
              value={item.price} 
              onChange={(e) => handleSizeChange(index, item.size, e.target.value)}
              className='w-full px-3 py-2 sm:w-[120px] text-[#ADB5BD]'
              required
            />
            <button className='text-[#DEE2E6] text-right md:text-center cursor-pointer text-lg' onClick={() => handleRemoveSize(index)}>X</button>
          </div>
        ))}
        <button className='w-24 py-1 mt-1 sm:mt-4 bg-black text-[#DEE2E6]' onClick={handleAddSize}>Add More</button>
      </div>

      {/* <div>
        <p className='pb-2 text-[#DEE2E6]'>Product Sizes</p>
        <div className='flex gap-3'>
          <div onClick={() => setSizes(prev => prev.includes('2 x 1') ? prev.filter(size => size !== '2 x 1') : [...prev, '2 x 1'])}>
            <p className={`${sizes.includes('2 x 1') ? 'bg-[#F48C06]' : 'bg-[#ADB5BD]'} px-3 py-1 cursor-pointer`}>2 x 1</p>
          </div>
          <div onClick={() => setSizes(prev => prev.includes('1.5 x 1') ? prev.filter(size => size !== '1.5 x 1') : [...prev, '1.5 x 1'])}>
            <p className={`${sizes.includes('1.5 x 1') ? 'bg-[#F48C06]' : 'bg-[#ADB5BD]'} px-3 py-1 cursor-pointer`}>1.5 x 1</p>
          </div>
        </div>
      </div> */}

      {/* add product colors */}
      <div>
        <p className='mb-2 text-[#DEE2E6]'>Product Colors</p>
        {productColors.map((color, index) => (
          <div className='flex flex-col py-2 sm:flex-row gap-2 w-full sm:gap-8' key={index}>
            <input 
              type="text" 
              placeholder="Color" 
              value={color.color} 
              onChange={(e) => handleColorChange(index, e.target.value)} 
              className='w-full px-3 py-2 sm:w-[120px] text-[#ADB5BD]'
              required
            />
            <button className='text-[#DEE2E6] text-right md:text-center cursor-pointer text-lg' onClick={() => handleRemoveColor(index)}>X</button>
          </div>
        ))}
        <button className='w-24 py-1 mt-1 sm:mt-4 bg-black text-[#DEE2E6]' onClick={handleAddColor}>Add More</button>
      </div>

        <div className='flex gap-2 mt-2'>
          <input onChange={() => setBestseller(!bestseller)} checked={bestseller} type="checkbox" id='bestseller'/>
          <label className='cursor-pointer text-[#DEE2E6]' htmlFor="bestseller">Add to bestseller</label>
        </div>

        <button type='submit' className='w-28 py-3 mt-4 bg-black text-[#DEE2E6]'>ADD</button>
    </form>
  ) : null
}

export default Add
