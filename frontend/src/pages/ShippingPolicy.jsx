import React from "react";
import Title from "../components/Title";

function ShippingPolicy() {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t border-[#ADB5BD]">
        <Title text1={"Shipping"} text2={"Policy"} />
      </div>
      <div className="my-10 flex flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-6 md:w-3/4 text-[#ADB5BD]">
          <p>
            Processing Time: All orders are processed within 1-3 business days
            (excluding weekends and holidays) after receiving your order
            confirmation email. You will receive another notification when your
            order has shipped. 
            <br />Shipping Rates and Estimates: Shipping charges
            for your order will be calculated and displayed at checkout.
            <br />Standard Shipping: 5-7 business days 
            <br />Shipping times may vary depending on your location and carrier delays. 
            <br />Domestic Shipping: We currently ship to addresses within Pakistan. 
            <br />Order Tracking: Once your order has placed, you will receive a tracking number via email
            or whatsapp to monitor your shipment. 
            <br />Lost or Damaged Items: If your order arrives damaged or is lost in transit, 
            <br />please contact us at support@neonmagic.shop or you can contact us on +92 318 2525652 within 7
            days of receipt, and we will work with the carrier to resolve the
            issue. 
            <br />Contact Us: For any shipping-related inquiries, please
            contact our customer support team at support@neonmagic.shop or you can
            contact us on +92 318 2525652 
            <br />Thank you for shopping with us! ٖ
          </p>
        </div>
      </div>
    </div>
  );
}

export default ShippingPolicy;
