import React, { useContext, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from '../components/Title';
import axios, { all } from 'axios';
import { toast } from 'react-toastify';

// order-1737113788532-xwdbd
function TrackOrder() {
      const {backendUrl, token, currency } = useContext(ShopContext);
      const [orderId, setOrderId] = useState("");
      const [orderData, setOrderData] = useState([]);
      const findOrder = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post(backendUrl + '/api/order/trackorder', {orderId});

          if (response.data.success) {
            let allOrdersItem = [];
            response.data.orders.map((order) => (
              order.items.map((item) => {
                item['status'] = order.status;
                item['payment'] = order.payment;
                item['paymentMethod'] = order.paymentMethod;
                item['date'] = order.date;
                allOrdersItem.push(item);
              })
            ))
            setOrderData(allOrdersItem.reverse());
          } else {
            toast.error("The OrderId does not exist");
          }
          
        } catch (error) {
          console.log(error);
        }
 
    }

  return (
    <div className='border-t border-[#ADB5BD] pt-16'>
      <div className="text-2xl">
        <Title text1={'Track'} text2={'ORDER'}/>
      </div>
      <div className='flex flex-col items-center mb-6 py-8 px-10 sm:flex-row border border-[#ADB5BD] text-[#ADB5BD]'>
        <form onSubmit={findOrder} action="flex flex-col items-center w-[90%] sm:max-w-96 m-14 gap-4">
            <p>Order Number</p>
            <input onChange={(e) => setOrderId(e.target.value)} value={orderId} type="text" className='w-full px-3 py-2 border border-[#ADB5BD] bg-[#03071E] text-[#6C757D]' placeholder='Enter Your Order Number Here' required />
            <button className='bg-black text-[#DEE2E6] font-light px-8 py-2 mt-4'>Track</button>
        </form>
      </div>
      <div>
        {
         orderData.map((item, index) => (
            <div key={index} className='py-4 border-t border-b border-[#ADB5BD] text-[#DEE2E6] flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
              <div className='flex items-start gap-6 text-sm'>
                <img className='w-16 sm:w-20' src={item.image[0]} alt="" />
                <div>
                  <p className='sm:text-base font-medium'>{item.name}</p>
                  <div className='flex items-center gap-3 mt-1 text-base text-[#ADB5BD]'>
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
                <button onClick={findOrder} className='border border-[#ADB5BD] hover:bg-black text-[#DEE2E6] px-4 py-2 font-medium rounded-sm'>Track Order</button>
              </div>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default TrackOrder
