// src/Pages/RefundPolicy.jsx
import React, { useState, useEffect } from 'react';

const policies = {
  terms: {
    title: "Terms & Conditions",
    lastUpdated: "February 2026",
    content: `Terms & Conditions 
Last Updated: February 2026

Welcome to Fabulous by Nora. These Terms & Conditions (“Terms”) govern your use of our website, products, and services. By accessing or making a purchase from our site, you agree to be bound by these Terms. Please read them carefully.

1. Use of Our Website
By using our website, you confirm that:
• You are at least 18 years old (or using the site under supervision).
• You will provide accurate and complete information.
• You will not use the site for any unlawful purpose.
We reserve the right to refuse service to anyone at any time.

2. Products & Descriptions
We strive to display accurate product images, colors, and descriptions. However:
• Colors may vary due to screen settings.
• Some items, especially handmade or custom pieces, may have slight variations.
• Prices and availability may change without notice.
We reserve the right to discontinue any product at any time.

3. Orders & Payments
When you place an order, you agree that:
• All information provided is accurate.
• You are authorized to use the payment method.
• Payment must be completed before processing begins.
We may cancel or refuse an order if:
• Payment cannot be verified
• Fraud is suspected
• Items are unavailable

4. Custom Orders
All custom-made, tailored, or personalized items are:
• Non-refundable • Non-returnable • Final sale
You are responsible for providing accurate measurements. We are not liable for fit issues resulting from incorrect measurements submitted by customers.

5. Shipping Policy
Shipping timelines and rates are outlined in our Shipping Policy. Once an order is shipped, delivery time depends on the carrier and location.
Fabulous by Nora is not responsible for lost or stolen packages, incorrect shipping addresses, or delays caused by carriers or customs.

6. Refunds & Returns
Our Refund Policy governs all returns, exchanges, and cancellations. By placing an order, you agree to all conditions outlined in the policy.

7. Intellectual Property
All content on this website—including logos, designs, photos, text, graphics, product images, and website layout—is the exclusive property of Fabulous by Nora and may not be copied, reproduced, distributed, or used without our written permission.

8. Promotions & Discounts
Any sales, promotions, or discount codes cannot be combined unless stated, must be used within the valid timeframe, and are honored at our sole discretion.

9. User Accounts
You are responsible for maintaining the confidentiality of your account and all activity under it. We may suspend or terminate accounts that violate our Terms.

10. Limitation of Liability
To the fullest extent permitted by law, Fabulous by Nora is not liable for indirect, incidental, or consequential damage. Our total liability will not exceed the total purchase price of your order.

11. Third-Party Services
We may use third-party services (payment processors, shipping carriers, analytics tools). These parties have their own terms and privacy policies.

12. Privacy Policy
Your use of our site is also governed by our Privacy Policy.

13. Changes to Terms
We may update these Terms at any time. Continued use of the site means you accept the updated Terms.

14. Governing Law
These Terms are governed by the laws of the State of Texas.

15. Contact Us
Email: info@fabulousbynora.com`,
  },

  privacy: {
    title: "Privacy Policy",
    lastUpdated: "February 2026",
    content: `Privacy Policy  
Last Updated: February 2026

At Fabulous by Nora, we value your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, share, and safeguard your data when you visit our website or make a purchase.

1. Information We Collect
A. Personal Information (name, email, phone, addresses, payment info)
B. Automatically Collected (IP, device, browser, cookies)
C. Order & Transaction Data

2. How We Use Your Information
• Process and fulfill orders
• Send confirmations and updates
• Improve website experience
• Prevent fraud
• Send promotional emails (opt-in only)

3. How We Protect Your Information
We use SSL encryption, secure payment gateways, and restricted access. No method is 100% secure, but we follow industry best practices.

4. Sharing Your Information
We do not sell your data. We only share with trusted partners (payment processors, shipping carriers, email providers) who agree to keep it confidential.

5. Cookies & Tracking
Used to improve performance, remember cart items, and analyze traffic. You can disable cookies in your browser.

6. Your Rights & Choices
You may access, correct, delete your data, or opt out of marketing. Contact: info@fabulousbynora.com

7. Third-Party Links & Children's Privacy
We are not responsible for external sites. We do not collect data from children under 13.

8. Changes to This Policy
Updates will be posted here with a new “Last Updated” date.

9. Contact Us
Email: info@fabulousbynora.com`,
  },

  shipping: {
    title: "Shipping Policy",
    lastUpdated: "February 2026",
    content: `Shipping Policy  
Thank you for shopping with Fabulous by Nora. We are committed to ensuring that your items are delivered safely, promptly, and in excellent condition.

1. Processing Time
• Ready-to-Wear: 2–4 business days
• Custom Orders: 15–30 business days (or as communicated)

2. Shipping Time
• Standard U.S.: 3–7 business days
• Express U.S.: 1–3 business days
• International: 7–21 business days

3. Shipping Rates
Calculated at checkout based on destination, speed, weight, and size. International customers are responsible for all duties/taxes.

4. Order Tracking
You’ll receive a tracking number via email/SMS once shipped.

5. Shipping Address
You are responsible for correct address entry. We are not liable for lost packages due to incorrect addresses.

6. Lost, Delayed, or Stolen Packages
Once handed to the carrier, responsibility transfers. Contact the carrier first; we will assist where possible.

7. International Shipping Notes
Customs delays may occur. We cannot mark packages as “gift”.

8. Contact Us
Email: info@fabulousbynora.com`,
  },

  refund: {
    title: "Refund Policy",
    lastUpdated: "February 2026",
    content: `Refund Policy 

Your satisfaction is very important to us.

1. No Refunds on Custom Orders
All custom, tailored, or personalized items are final sale and non-refundable once production begins.

2. Ready-to-Wear Items
Returns/exchanges accepted within 7 days if unworn, tags attached, original condition → store credit or exchange only (no cash refunds).

3. Damaged or Incorrect Items
Notify us within 48 hours with photos → replacement or store credit.

4. Cancellation Policy
Orders can only be cancelled within 24 hours of purchase.

5. Final Sale Items
Sale items, accessories, jewelry, gift cards → non-returnable.

6. Shipping Costs
Non-refundable. Return shipping is customer’s responsibility unless item was damaged/incorrect.

7. Measurement Responsibility
No refunds for fit issues due to incorrect measurements provided by customer.

8. Processing Time
Approved returns processed in 3–7 business days.

9. Contact Us
Email: info@fabulousbynora.com`,
  },
};

function RefundPolicy() {
  const [activeTab, setActiveTab] = useState('refund');
  const activeColor = "rgba(189, 0, 124, 1)"; // Your brand magenta-purple

  // Always scroll to top when the page is visited
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-4 sm:gap-8 mb-12">
          {Object.entries(policies).map(([key, policy]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-6 py-2 text-sm sm:text-base font-semibold tracking-wider transition-all duration-300 border-b-2 ${
                activeTab === key
                  ? `text-[${activeColor}] border-[${activeColor}]`
                  : "text-gray-600 border-transparent hover:text-gray-900"
              }`}
              style={{
                fontFamily: "'Playfair Display', serif",
                borderBottom: activeTab === key ? `2px solid ${activeColor}` : "2px solid transparent",
              }}
            >
              {policy.title}
            </button>
          ))}
        </div>

        {/* Content Card */}
        <div className="bg-white shadow-xl rounded-lg p-8 sm:p-12">
          <h1
            className="text-2xl sm:text-3xl font-bold text-center mb-4"
            style={{ fontFamily: "'Playfair Display', serif", color: activeColor }}
          >
            {policies[activeTab].title}
          </h1>
          <p className="text-center text-gray-500 mb-10">
            Last Updated: {policies[activeTab].lastUpdated}
          </p>

          <div className="prose prose-lg max-w-none text-gray-700 whitespace-pre-line leading-relaxed">
            {policies[activeTab].content}
          </div>

          <div className="mt-12 text-center">
            <p className="text-sm text-gray-500">
              Questions? Email us at{" "}
              <a
                href="mailto:info@fabulousbynora.com"
                className="underline"
                style={{ color: activeColor }}
              >
                info@fabulousbynora.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RefundPolicy;