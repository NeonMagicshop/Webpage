import React from "react";
import Title from "../components/Title";
import MetaPixel from '../utils/meta/MetaPixel';

function TermsConditions() {
  return (
    <div>
    <MetaPixel />
      <div className="text-2xl text-center pt-8 border-t border-[#ADB5BD]">
        <Title text1={"Terms &"} text2={"Conditions"} />
      </div>
      <div className="my-10 flex flex-col items-center gap-16">
        <div className="flex flex-col items-center gap-6 md:w-3/4 text-[#ADB5BD]">
          <p>
            1. Introduction Welcome to Neon Magic. These Terms and Conditions govern
            your use of our website located at Neon Magic.store. By accessing or
            using the Service, you agree to be bound by these Terms. If you
            disagree with any part of the Terms, you may not access the Service.
            <br/>2. Intellectual Property All content published and made available on
            our Service is the property of Neon Magic.store  and its licensors. This
            includes, but is not limited to, text, graphics, logos, images, and
            software. 
            <br/>3. User Responsibilities You agree to use the Service only
            for lawful purposes. You may not use our Service to engage in any
            activity that is illegal or harmful. You agree not to disrupt or
            interfere with the security or accessibility of the Service. 
            <br/>4. User Accounts If you create an account on our website: You are
            responsible for maintaining the confidentiality of your account
            details. You agree to accept responsibility for all activities under
            your account. 
            <br/>5. Third-Party Links Our Service may contain links to
            third-party websites. We are not responsible for the content or
            practices of any third-party websites. 
            <br/>6. Limitation of Liability To
            the maximum extent permitted by law, Neon Magic will not be liable for
            any indirect, incidental, or consequential damages arising from your
            use of the Service. 
            <br/>7. Indemnification You agree to indemnify and
            hold harmless Neon Magic, its directors, employees, and affiliates from
            any claims or demands made by any third party due to your breach of
            these Terms. 
            <br/>8. Termination We reserve the right to terminate or
            suspend access to our Service without notice if you violate these
            Terms. 
            <br/>9. Changes to These Terms We may update these Terms from time
            to time. You are advised to review this page periodically for
            changes. 
            <br/>10. Governing Law These Terms are governed by the laws of
            Pakistan, without regard to its conflict of law provisions. 
            <br/>11. Contact Us If you have any questions about these Terms, please
            contact us at support@neonmagic.shop or you can contact us on +92-318-252-5652. 
            <br/>Effective Date: 18th January 2025
          </p>
        </div>
      </div>
    </div>
  );
}

export default TermsConditions;
