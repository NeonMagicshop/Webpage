import React, { useContext, useState } from "react";
import { assets } from "../assets/assets.js";
import { Link, NavLink } from "react-router-dom";
import { ShopContext } from "../context/ShopContext.jsx";

function Navbar() {
  const [visible, setVisible] = useState(false);
  const {
    setShowSearch,
    getCartCount,
    navigate,
    token,
    setToken,
    setCartItems,
  } = useContext(ShopContext);

  const logout = () => {
    navigate("/login");
    localStorage.removeItem("token");
    setToken("");
    setCartItems({});
  };

  return (
    <div className="flex item-center justify-between py-5 font-medium ">
      <Link to={"/"}>
        <img src={assets.neonmagic_logo} className="w-36" alt="" />
      </Link>

      <ul className="hidden sm:flex gap-5 text-sm text-[#E0E0E0]">
        <NavLink to="/" className="flex flex-col items-center gap-1">
          <p>Home</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-[#E0E0E0] hidden" />
        </NavLink>
        <NavLink to="/collection" className="flex flex-col items-center gap-1">
          <p>Collection</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-[#E0E0E0] hidden" />
        </NavLink>
        <NavLink to="/track-order" className="flex flex-col items-center gap-1">
          <p>Track Order</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-[#E0E0E0] hidden" />
        </NavLink>
        <NavLink to="/about" className="flex flex-col items-center gap-1">
          <p>About</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-[#E0E0E0] hidden" />
        </NavLink>
        <NavLink to="/contact" className="flex flex-col items-center gap-1">
          <p>Contact</p>
          <hr className="w-2/4 border-none h-[1.5px] bg-[#E0E0E0] hidden" />
        </NavLink>
      </ul>
      <div className="flex items-center gap-6">
        <img
          onClick={() => (setShowSearch(true), navigate("/collection"))}
          src={assets.search_dark_icon}
          className="w-6 cursor-pointer"
          alt=""
        />

        <div className="group relative">
          <img
            onClick={() => (token ? null : navigate("/login"))}
            src={assets.profile_dark_icon}
            className="w-6 cursor-pointer"
            alt=""
          />
          {/* Dropdown Menu */}

          {token && (
            <div className="group-hover:block hidden absolute dropdown-menu right-0 pt-4">
              <div className="flex flex-col gap-2 w-36 py-3 px-5 bg-[#E0E0E0] text-[#333333] rounded">
                <p className="cursor-pointer bg-[#E0E0E0] hover:text-[#03071E]">MyProfile</p>
                <p onClick={() => navigate('/orders')} className="cursor-pointer bg-[#E0E0E0] hover:text-[#03071E]">Orders</p>
                <p onClick={logout} className="cursor-pointer bg-[#E0E0E0] hover:text-[#03071E]">
                  Logout
                </p>
              </div>
            </div>
          )}
        </div>

        <Link to="/cart" className="relative">
          <img src={assets.cart_dark_icon} className="w-6 min-w-5" alt="" />
          <p className="absolute right-[-5px] bottom-[-5px] w-4 text-center leading-4 bg-[#F48C06] text-[#E9ECEF] aspect-square rounded-full text-[8px]">
            {getCartCount()}
          </p>
        </Link>
        <img
          onClick={() => setVisible(true)}
          src={assets.menu_dark_icon}
          className="w-6 cursor-pointer sm:hidden"
          alt=""
        />
      </div>

      {/* sidebar menu for small screens */}
      <div
        className={`absolute top-0 right-0 overflow-hidden bg-[#03071E] transition-all ${
          visible ? "w-full" : "w-0"
        }`}
      >
        <div className="flex flex-col text-[#E0E0E0]">
          <div
            onClick={() => setVisible(false)}
            className="flex items-center gap-4 p-3 cursor-pointer"
          >
            <img src={assets.dropdown_dark_icon} className="h-5 " alt="" />
            <p>Back</p>
          </div>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/"
          >
            Home
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/collection"
          >
            Collection
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/track-order"
          >
            Track Order
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/about"
          >
            About
          </NavLink>
          <NavLink
            onClick={() => setVisible(false)}
            className="py-2 pl-6 border"
            to="/contact"
          >
            Contact
          </NavLink>
        </div>
      </div>
    </div>
  );
}

export default Navbar;
