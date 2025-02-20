import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { backendUrl, currency } from "../App";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";

function Orders({ token }) {
  const [orders, setOrders] = useState([]);
  const [filterProducts, setFilterProducts] = useState(orders);
  const [sortType, setSortType] = useState('relevant');

  const fetchAllOrders = async () => {
    if (!token) {
      return null;
    }
    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );
      if (response.data.success) {
        setOrders(response.data.orders.reverse());
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };


  const sortProduct = () => {
    let fpCopy = orders.slice();
    
    switch (sortType) {
      case 'Order Placed':
        setFilterProducts(fpCopy.filter(item => item.status === 'Order Placed'));
        break;
      case 'Packing':
        setFilterProducts(fpCopy.filter(item => item.status === 'Packing'));
        break;
      case 'Shipped':
        setFilterProducts(fpCopy.filter(item => item.status === 'Shipped'));
        break;
      case 'Out for delivery':
        setFilterProducts(fpCopy.filter(item => item.status === 'Out for delivery'));
        break;
      case 'Delivered':
        setFilterProducts(fpCopy.filter(item => item.status === 'Delivered'));
        break;
    
      default:
        setFilterProducts(fpCopy);
        break;
    }
  }
  
  useEffect(() => {
    sortProduct();
  }, [sortType])

  const statusHandler = async (e, orderId) => {
      try {
        const response = await axios.post(backendUrl + '/api/order/status', {orderId, status: e.target.value}, {headers: {token}});
        if (response.data.success) {
          await fetchAllOrders();
        }
      } catch (error) {
        console.log();
        toast.error(error.message);
      }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <div>
      <div className="flex justify-between">
        <h3 className="text-[#DEE2E6]">Order Page</h3>
        <select
          onChange={(e) => setSortType(e.target.value)}
          className="border-2 border-[#ADB5BD] text-sm text-[#ADB5BD] px-2"
        >
          <option value="All">Sort by: Show All</option>
          <option value="Order Placed">Sort by: Order Placed</option>
          <option value="Packing">Sort by: Packing</option>
          <option value="Shipped">Sort by: Shipped</option>
          <option value="Out for delivery">Sort by: Out for delivery</option>
          <option value="Delivered">Sort by: Delivered</option>
        </select>
      </div>
      <div>
        {filterProducts.map((order, index) => (
          <div className="grid grid-cols-1 sm:grid-cols-[0.5fr_2fr_1fr] lg:grid-cols-[0.5fr_2fr_1fr_1fr_1fr] gap-3 items-start border-2 border-[#ADB5BD] p-5 md:p-8 my-3 md:my-4 text-xs sm:text-sm text-[#ADB5BD]" key={index}>
            <img className="w-12" src={assets.parcel_icon} alt="" />
            <div>
              <div>
                {order.items.map((item, index) => {
                  if (index === order.items.length - 1) {
                    return (
                      <p className="py-0.5" key={index}>
                        Name: {item.name}
                        <br/>Quantity: {item.quantity} 
                        <br/>Size: {item.size}
                        <br/> color: {item.color}
                      </p>
                    );
                  } else {
                    return (
                      <p className="py-0.5" key={index}>
                        Name: {item.name}
                        <br/>Quantity: {item.quantity} 
                        <br/>Size: {item.size}
                        <br/> color: {item.color}
                      </p>
                    );
                  }
                })}
              </div>
              <p className="mt-3 mb-2 font-medium">{order.address.firstName + " " + order.address.lastName}</p>
              <div>
                <p>
                  {order.address.address +
                    ", " +
                    order.address.city +
                    ", " +
                    order.address.country +
                    ", " +
                    order.address.postalCode}
                </p>
              </div>
              <p>{order.address.phone}</p>
              <p>{order.address.email}</p>
            </div>
            <div>
              <p className="text-sm sm:text-[15px]">Items: {order.items.length}</p>
              <p className="mt-3">Method: {order.paymentMethod}</p>
              <p>Payment: {order.payment ? 'Done' : 'pending'}</p>
              <p>Date: {new Date(order.date).toLocaleDateString()}</p>
            </div>
            <p className="text-sm sm:text-[15px]">{currency} {order.amount}</p>
            <select onChange={(event) => statusHandler(event, order._id)} value={order.status} className="p-2 font-semibold">
              <option value="Order Placed">Order Placed</option>
              <option value="Packing">Packing</option>
              <option value="Shipped">Shipped</option>
              <option value="Out for delivery">Out for delivery</option>
              <option value="Delivered">Delivered</option>
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Orders;
