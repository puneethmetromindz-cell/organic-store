import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function PrivacyPolicy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | TRIDAMYA Organic Store</title>
        <meta name="description" content="Review Tridamya's Privacy Policy. Learn how we handle customer contact details, payment information, and delivery data." />
      </Helmet>

      {/* Page Header */}
      <div className="section section--sm section--cream" style={{ borderBottom: '1px solid var(--color-cream-dark)' }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb__separator">/</span>
            <span className="breadcrumb__current">Privacy Policy</span>
          </nav>
          <div style={{ marginTop: '16px' }}>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-5xl)' }}>Privacy Policy</h1>
            <p style={{ color: 'var(--color-gray-500)', fontSize: 'var(--text-sm)' }}>Last Updated: June 13, 2026</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="tab-content" style={{ padding: 0 }}>
            <p>At Tridamya, we prioritize the protection and confidentiality of our customers' personal data. This Privacy Policy details how we collect, store, and utilize your information when you browse our website or purchase our organic wellness powders sourced from Mysuru, Karnataka.</p>

            <h2>1. Information We Collect</h2>
            <p>When you place an order or contact us, we collect standard customer identifiers necessary to fulfill deliveries, including: <br />
              • Contact data (Email address, mobile phone number) <br />
              • Shipping and billing coordinates (Full name, street address, city, state, PIN code) <br />
              • Order transaction notes and notes left for Mysore transit riders.
            </p>

            <h2>2. Payment Transaction Security</h2>
            <p>For online payments, Tridamya uses secure payment gateway integrations (Razorpay API). We do not collect, process, or store credit/debit card numbers, UPI credentials, or net banking passwords on our local Mysuru servers. All payment transactions occur directly via Razorpay's encrypted payment interfaces.</p>

            <h2>3. Sourcing & Delivery Communications</h2>
            <p>We use your contact details to send invoice details, order confirmation notifications, and delivery status updates. Your address details are shared with Mysore/Karnataka delivery partners solely for the purpose of shipping. We currently serve Karnataka exclusively, with future PAN India shipping plans under development.</p>

            <h2>4. Cookies & Web Tracking</h2>
            <p>Tridamya uses cookies to maintain shopping cart session states (synced with our local cart stores) and to monitor site navigation traffic to improve performance. You may disable cookies in your browser settings, though it may disable cart persistence.</p>

            <h2>5. Contact Us</h2>
            <p>If you have any questions regarding data usage or wish to request data removal, contact our data compliance desk at: <br />
              • Email: <strong>Tridamya@gmail.com</strong> <br />
              • Address: <strong>#10/A-9, 2nd Cross, Belagola Food Industrial Estate, Mysuru</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
