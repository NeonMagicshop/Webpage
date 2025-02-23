import React from "react";
import Title from "../components/Title";

function RefundPolicy() {
  return (
    <div>
      <div className="text-2xl text-center pt-8 border-t border-[#ADB5BD]">
        <Title text1={"Refund"} text2={"Policy"} />
      </div>
      <div className="my-10 flex flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-6 md:w-3/4 text-[#ADB5BD]">
          <p>
            1. Eligibility for Refunds We want you to be fully satisfied with
            your purchase. If you are not completely happy with your order, you
            may request a refund under the following conditions: 
            <br /> The item must be returned within 15 days of receipt. 
            <br />The product must be unused, in its original packaging, 
            and in the same condition as when you received it. Proof of purchase must be provided. 
            <br />2. Non-Refundable Items 
            <br />Certain items are non-refundable, including: 
            <br />Personalized or custom-made items 
            <br />3. Refund Process To initiate a refund, please
            contact our customer support team at  support@neonmagic.shop or you can
            contact us on +92 318 2525652 with your order number and details of
            the issue. Once your return is received and inspected, we will
            notify you of the approval or rejection of your refund. 
            <br />If approved, refunds will be processed within 7-10 business days and credited to
            your original method of payment. 
            <br />4. Late or Missing Refunds 
            <br />If you haven’t received a refund within the expected timeframe, please
            check your bank account again, then contact your credit card company
            or bank. If the issue persists, contact us at  support@neonmagic.shop or you
            can contact us on +92 318 2525652 
            <br />5. Shipping Costs 
            <br />Shipping costs are non-refundable. If you receive a refund, the cost of return
            shipping will be deducted from your refund unless the product was
            defective or incorrect. 
            <br />6. Exchanges 
            <br />We only replace items if theyare defective or damaged. If you need to exchange a product, contact
            us at  support@neonmagic.shop or you can contact us on +92 318 2525652. 
            <br />7. Contact Us 
            <br />For any questions about our refund policy, please contact
            us at  support@neonmagic.shop or you can contact us on +92 318 2525652. 
            <br />By making a purchase from our store, you agree to this refund policy.
            We reserve the right to modify this policy at any time without prior
            notice.
          </p>
        </div>
      </div>
    </div>
  );
}

export default RefundPolicy;
