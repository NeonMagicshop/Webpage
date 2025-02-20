import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

function Cart() {
  const { products, currency, cartItems, updateQuantity, navigate } = useContext(ShopContext);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    if (products.length > 0) {
      const tempData = [];
      for (const itemId in cartItems) {
        for (const size in cartItems[itemId]) {
          for (const color in cartItems[itemId][size]) {
            for (const price in cartItems[itemId][size][color]) {
              if (cartItems[itemId][size][color][price] > 0) {
                tempData.push({
                  _id: itemId, 
                  size: size,
                  color: color,
                  price: price,
                  quantity: cartItems[itemId][size][color][price],
                });
              }
            }
          }
        }
      }
      setCartData(tempData);
    }
  }, [cartItems, products]);

  return (
    <div className="border-t border-[#ADB5BD] pt-14">
      <div className="text-2xl mb-3">
        <Title text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );
          return (
            <div
              key={index}
              className="py-4 border-t border-b border-[#ADB5BD] text-[#ADB5BD] grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr-0.5fr] items-center gap-4"
            >
              <div className="flex items-center gap-6">
                <img
                  src={productData.image[0]}
                  className="w-16 sm:w-20"
                  alt=""
                />
                <div>
                  <p className="text-sm sm:text-lg font-medium">
                    {productData.name}
                  </p>
                    <p>
                      {currency} {item.price}
                    </p>
                    <div className="flex items-center gap-5 mt-2">
                    <p className="px-2 sm:px-3 sm:py-1 border border-[#ADB5BD] bg-[#ADB5BD] text-[#121212]">
                      {item.size}
                    </p>
                    <p className="px-2 sm:px-3 sm:py-1 border border-[#ADB5BD] bg-[#ADB5BD] text-[#121212]">
                      {item.color}
                    </p>
                  </div>
                </div>
              </div>
              <input
                onChange={(e) =>
                  e.target.value === "" || e.target.value === "0"
                    ? null
                    : updateQuantity(
                        item._id,
                        item.size,
                        item.color,
                        item.price,
                        Number(e.target.value)
                      )
                }
                className="border border-[#ADB5BD] bg-[#03071E] max-w-10 sm:max-w-20 px-1 sm:px-2 py-1"
                type="number"
                min={1}
                defaultValue={item.quantity}
              />
              <img
                onClick={() => updateQuantity(item._id, item.size, item.color, item.price, 0)}
                className="w-5 sm:w-6 cursor-pointer"
                src={assets.trash_dark_icon}
                alt=""
              />
            </div>
          );
        })}
      </div>
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => cartData.length > 0 ? navigate("/place-order") : null}
              className="bg-black text-[#DEE2E6] text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
