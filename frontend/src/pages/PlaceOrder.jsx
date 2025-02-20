import React, { useContext, useState } from "react";
import Title from "../components/Title";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
import axios from "axios";
import { toast } from "react-toastify";

function PlaceOrder() {
  const {navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products} = useContext(ShopContext);
  const [method, setMethod] = useState("cod");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    address: "",
    city: "",
    state: "",
    postalCode: "",
    country: "",
    phone: "",
  });

  const onChangeHandler = (e) => {
      const name = e.target.name;
      const value = e.target.value;

      setFormData(data => ({...data, [name]: value}));
  }

  const onSubmitHandler = async (e) => {
      e.preventDefault();
      try {
        let orderItems = [];
        for (const itemId in cartItems) {
          for (const size in cartItems[itemId]) {
            for(const color in cartItems[itemId][size]) {
              for(const price in cartItems[itemId][size][color]) {
                if (cartItems[itemId][size][color][price] > 0) {
                  const itemInfo = structuredClone(products.find(product => product._id === itemId)); 
                  if (itemInfo) {
                    itemInfo.size = size;
                    itemInfo.color = color;
                    itemInfo.price = price;
                    itemInfo.quantity = cartItems[itemId][size][color][price];
                    orderItems.push(itemInfo);
                  }
                }
              }
            }
          }
        }
        
        let orderData = {
          address: formData,
          items: orderItems,
          amount: getCartAmount() + delivery_fee
        }

        switch (method) {
          // API calls for COD
          case 'cod':
            const response = await axios.post(backendUrl + '/api/order/place', orderData, {headers: {token}});
            
            if (response.data.success) {
              setCartItems({});
              navigate('/order-placed');
            } else{
              toast.error(response.data.message);
            }
            break;
            // case 'stripe':
            // const responseStripe = await axios.post(backendUrl + '/api/order/stripe', orderData, {headers: {token}});
            
            // if (responseStripe.data.success) {
            //   const {session_url} = responseStripe.data;
            //   window.location.replace(session_url);
            //   // setCartItems({});
            // } else{
            //   toast.error(response.data.message);
            // }
            // break;
        
          default: 
            break;
        }
        
      } catch (error) {
        console.log(error);
        toast.error(error.message);
      }
  }

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[18vh] border-t border-[#ADB5BD]">
      {/* Left side */}
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px]">
        <div className="text-xl sm:text-2xl my-3">
          <Title text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="firstName" value={formData.firstName}
            className="border border-[#ADB5BD] bg-[#03071E] text-[#6C757D] rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="First Name"
          />
          <input required onChange={onChangeHandler} name="lastName" value={formData.lastName}
            className="border border-[#ADB5BD] bg-[#03071E] text-[#6C757D] rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input required onChange={onChangeHandler} name="email" value={formData.email}
          className="border border-[#ADB5BD] bg-[#03071E] text-[#6C757D] rounded py-1.5 px-3.5 w-full"
          type="email"
          placeholder="Email address"
        />
        <input required onChange={onChangeHandler} name="address" value={formData.address}
          className="border border-[#ADB5BD] bg-[#03071E] text-[#6C757D] rounded py-1.5 px-3.5 w-full"
          type="text"
          placeholder="Address"
        />
        <div className="flex gap-3">
          <input required onChange={onChangeHandler} name="city" value={formData.city}
            className="border border-[#ADB5BD] bg-[#03071E] text-[#6C757D] rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="City"
          />
          <input required onChange={onChangeHandler} name="state" value={formData.state}
            className="border border-[#ADB5BD] bg-[#03071E] text-[#6C757D] rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="State"
          />
        </div>
        <div className="flex gap-3">
          <input onChange={onChangeHandler} name="postalCode" value={formData.postalCode}
            className="border border-[#ADB5BD] bg-[#03071E] text-[#6C757D] rounded py-1.5 px-3.5 w-full"
            type="number"
            placeholder="Postal Code (optional)"
          />
          <input required onChange={onChangeHandler} name="country" value={formData.country}
            className="border border-[#ADB5BD] bg-[#03071E] text-[#6C757D] rounded py-1.5 px-3.5 w-full"
            type="text"
            placeholder="Country"
          />
        </div>
        <input required onChange={onChangeHandler} name="phone" value={formData.phone}
          className="border border-[#ADB5BD] bg-[#03071E] text-[#6C757D] rounded py-1.5 px-3.5 w-full"
          type="number"
          placeholder="Phone"
        />
      </div>
      {/* Right side */}
      <div className="mt-8">
        <div className="mt-8 min-w-80">
          <CartTotal />
        </div>
        <div className="mt-12">
          <Title text1={"PAYMENT"} text2={"METHOD"} />
          {/* Payment Method selection */}
          <div className="flex gap-3 flex-collg-flex-row">
            {/* <div
              onClick={() => setMethod("stripe")}
              className="flex items-center gap-3 border border-[#ADB5BD] p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "stripe" ? "bg-[#F48C06]" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.stripe_logo} alt="" />
            </div>
            <div
              onClick={() => setMethod("razorpay")}
              className="flex items-center gap-3 border border-[#ADB5BD] p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-[#F48C06]" : ""
                }`}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div> */}
            <div
              onClick={() => setMethod("cod")}
              className="flex items-center gap-3 border border-[#ADB5BD] p-2 px-3 cursor-pointer"
            >
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "cod" ? "bg-[#F48C06]" : ""
                }`}
              ></p>
              <p className="text-[#ADB5BD] text-sm font-medium mx-4">
                CASH ON DELIVERY
              </p>
            </div>
          </div>
          <div className="w-full text-end mt-8">
            <button type="submit" className="bg-black text-[#DEE2E6] px-16 py-3 text-sm">PLACE ORDER</button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default PlaceOrder;
