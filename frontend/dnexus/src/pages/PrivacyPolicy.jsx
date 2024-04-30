import React from 'react';
import './Style/PrivacyPolicy.css';
import Navbar from '../components/Navbar/ConditionalNavbar';
import Footer from '../components/Footer/Footer';
import Breadcrumbs from '../components/Breadcrumbs/Breadcrumbs';

const PrivacyPolicy = () => {
    return (
        <div>
        <Navbar/>
        <Breadcrumbs pageTitle="Privacy Policy" />
        <div className="about-us-container">
        <div className="about-us-content">
        <p>
        At DNexus, we take your privacy seriously. This Privacy Policy outlines the types of personal information we collect, how we use it, and the measures we take to protect your information.
    </p>
    <p>
        <strong>Information We Collect:</strong> We collect personal information such as your name, email address, and contact details when you interact with our website or use our services. We may also collect non-personal information such as your IP address, browser type, and device information.
    </p>
    <p>
        <strong>How We Use Your Information:</strong> We use your personal information to provide and improve our services, communicate with you, and personalize your experience. We may also use your information for marketing and promotional purposes with your consent.
    </p>
    <p>
        <strong>Information Sharing:</strong> We do not sell, trade, or otherwise transfer your personal information to third parties without your consent. However, we may share your information with trusted service providers who assist us in operating our website and providing our services.
    </p>
    <p>
        <strong>Data Security:</strong> We implement appropriate security measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction.
    </p>
    <p>
        <strong>Updates to this Policy:</strong> We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. We will notify you of any significant changes and seek your consent if required.
    </p>
    <p>
        If you have any questions or concerns about our Privacy Policy, please contact us. By using our website or services, you agree to the terms outlined in this Privacy Policy.
    </p>
</div>
        </div>
        <Footer/>
        </div>
    );
}

export default PrivacyPolicy;
