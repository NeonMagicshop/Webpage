import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios, { all } from 'axios';

function Orders() {
  const {backendUrl, token, currency } = useContext(ShopContext);
  const [orderData, setOrderData] = useState([]);
  const loadOrderData = async () => {
      try {
        if (!token) {
          return null
        }
        const response = await axios.post(backendUrl + '/api/order/userorders',{}, {headers: {token}});
        console.log(response.data.orders);
        
        if (response.data.success) {
          let allOrdersItem = [];
          response.data.orders.map((order) => {
            order.items.map((item) => {
              item['status'] = order.status;
              item['payment'] = order.payment;
              item['paymentMethod'] = order.paymentMethod;
              item['date'] = order.date;
              allOrdersItem.push(item);
            })
          })
          setOrderData(allOrdersItem.reverse());
        }
        
      } catch (error) {
        console.log(error);
        
      }
  }
  console.log(orderData);
  
  useEffect(() => {
    loadOrderData();
  }, [token]);

  return (
    <div className='border-t border-[#ADB5BD] pt-16'>
      <div className="text-2xl">
        <Title text1={'MY'} text2={'ORDERS'}/>
      </div>
      <div>
        {
         orderData.map((item, index) => (
            <div key={index} className='py-4 border-t border-b border-[#ADB5BD] text-[#DEE2E6] flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex-col sm:flex-row items-center gap-3 mt-1 text-base text-[#ADB5BD]'>
                    <p>{currency} {item.price}</p>
                    <p>Quantity: {item.quantity}</p>
                    <p>Size: {item.size}</p>
                    <p>Color: {item.color}</p>
                  </div>
                  <p className='mt-1'>Date: <span className='text-[#ADB5BD]'>{new Date(item.date).toDateString()}</span></p>
                  <p className='mt-1'>Payment: <span className='text-[#ADB5BD]'>{item.paymentMethod}</span></p>
                </div>
              </div>
              <div className='md:w-1/2 flex justify-between'>
                <div className="flex items-center gap-2">
                  <p className='min-w-2 h-2 rounded-full bg-[#F48C06]'></p>
                  <p className='text-sm text-[#ADB5BD] md:text-base'>{item.status}</p>
                </div>
                <button onClick={loadOrderData} className='border border-[#ADB5BD] hover:bg-black text-[#DEE2E6] px-4 py-2 font-medium rounded-sm'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default Orders
