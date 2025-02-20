import React from "react";
import { assets } from "../assets/assets";
import { Link, NavLink } from "react-router-dom";

function Footer() {
    return (
        <div>
            <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
                <div>
                    <Link to={"/"}>
                     <img className="mb-5 w-32" src={assets.neonmagic_logo} alt="" />
                    </Link>
                    <p className="w-full md:w-2/3 text-[#ADB5BD]">
                      At Neon Magic, with a focus on quality, creativity, and customer satisfaction, we’re here to light up your world—one sign at a time.
                    </p>
                </div>
                <div>
                    <p className="text-xl font-medium mb-5 text-[#DEE2E6]">COMPANY</p>
                    <ul className="flex flex-col gap-1 text-[#ADB5BD]">
                        <Link to="/" className="gap-1">
                          <p>Home</p>
                          <hr className="w-2/4 border-none h-[1.5px] bg-[#ADB5BD] hidden" />
                        </Link>
                        <Link to="/about" className="gap-1">
                          <p>About Us</p>
                          <hr className="w-2/4 border-none h-[1.5px] bg-[#ADB5BD] hidden" />
                        </Link>
                        <Link to="/contact" className="gap-1">
                          <p>Contact Us</p>
                          <hr className="w-2/4 border-none h-[1.5px] bg-[#ADB5BD] hidden" />
                        </Link>
                        <Link to="/terms-&-conditions" className="gap-1">
                          <p>Terms & Conditions</p>
                          <hr className="w-2/4 border-none h-[1.5px] bg-[#ADB5BD] hidden" />
                        </Link>
                        <Link to="/shipping-policy" className="gap-1">
                          <p>Shipping Policy</p>
                          <hr className="w-2/4 border-none h-[1.5px] bg-[#ADB5BD] hidden" />
                        </Link>
                        <Link to="/refund-policy" className="gap-1">
                          <p>Refund Policy</p>
                          <hr className="w-2/4 border-none h-[1.5px] bg-[#ADB5BD] hidden" />
                        </Link>
                    </ul>
                </div>
                <div>
                    <p className="text-xl font-medium mb-5 text-[#DEE2E6]">GET IN TOUCH</p>
                    <ul className="flex flex-col gap-1 text-[#ADB5BD]">
                        <li>+92-318-252-5652</li>
                        <li>contact@Lumeon.com</li>
                    </ul>
                    <ul className="flex pt-2 gap-5 text-[#ADB5BD]">
                      <a href="https://wa.me/923182525652" className="w-6 sm:w-8 cursor-pointer"><img src={assets.whatsapp_icon} alt="" /></a>
                      <a href="https://www.facebook.com/profile.php?id=61571232460238&mibextid=ZbWKwL" className="w-6 sm:w-8 cursor-pointer"><img src={assets.facebook_icon} alt="" /></a>
                      <a href="https://www.instagram.com/neonmagic.shop?igsh=MXZpb29qcjl5cnp6cw==" className="w-6 sm:w-8 cursor-pointer"><img src={assets.instagram_icon} alt="" /></a>
                    </ul>
                </div>
            </div>
            <div>
                <hr className="bg-[#ADB5BD]"/>
                <p className="py-5 text-sm text-center text-[#ADB5BD]">
                    Copyright 2025@Lumeon.com - All Right Reserved.
                </p>
            </div>
        </div>
    );
}

export default Footer;
