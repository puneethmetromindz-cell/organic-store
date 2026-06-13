import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function ShippingPolicy() {
  return (
    <>
      <Helmet>
        <title>Shipping Policy | TRIDAMYA Organic Store</title>
        <meta name="description" content="Review Tridamya's shipping guidelines. Sourcing from Mysuru, delivering exclusively to locations across Karnataka, India." />
      </Helmet>

      {/* Page Header */}
      <div className="section section--sm section--cream" style={{ borderBottom: '1px solid var(--color-cream-dark)' }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb__separator">/</span>
            <span className="breadcrumb__current">Shipping Policy</span>
          </nav>
          <div style={{ marginTop: '16px' }}>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-5xl)' }}>Shipping Policy</h1>
            <p style={{ color: 'var(--color-gray-500)', fontSize: 'var(--text-sm)' }}>Last Updated: June 13, 2026</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="tab-content" style={{ padding: 0 }}>
            <p>At Tridamya, we package and ship our pure Ayurvedic wellness powders directly from our processing facility in Mysuru. Our logistics operations are optimized to maintain the freshness and nutrient integrity of our products during transit.</p>

            <h2>1. Exclusive Karnataka Service Area</h2>
            <p>To ensure local freshness and fast transport, <strong>Tridamya shipping is currently restricted exclusively to addresses within the state of Karnataka, India</strong>. Orders placed with shipping addresses outside Karnataka cannot be processed and will be automatically cancelled and refunded.</p>

            <h2>2. Processing & Dispatch Timelines</h2>
            <p>• <strong>Order Processing:</strong> Standard order processing takes 24 to 48 hours from order placement. Our facility is closed on Sundays and national public holidays.<br />
              • <strong>Transit Duration:</strong> Once dispatched from our Mysuru center, standard delivery times vary from 3 to 5 business days, depending on the destination city (e.g., Bengaluru, Hubballi, Mangaluru, Belagavi, etc.).
            </p>

            <h2>3. Shipping Charges & Free Thresholds</h2>
            <p>We are pleased to offer <strong>FREE Standard Shipping</strong> on all orders delivered within Karnataka. There are no minimum purchase requirements or hidden shipping fees at checkout.</p>

            <h2>4. Delivery Partners & Tracking</h2>
            <p>We work with trusted regional courier networks and local Mysuru transit riders to complete safe doorstep handoffs. When your package leaves our Belagola facility, a confirmation text message and/or email containing tracking details will be sent to the contact info provided at checkout.</p>

            <h2>5. Cash on Delivery (COD) Guidelines</h2>
            <p>For Cash on Delivery orders, please ensure an authorized adult is available at the shipping address to hand over the exact invoice total. Payment can be made in cash or via scanning the rider's instant UPI code. Delivery agents will not leave packages without receiving the invoice balance in full.</p>

            <h2>6. Packaging & Delivery Issues</h2>
            <p>All powders are sealed in moisture-resistant, food-grade stand-up pouches to ensure safe travel. If your package arrives damaged, tampered with, or if you experience transit delays, please contact our Mysuru dispatch team within 24 hours at <strong>Tridamya@gmail.com</strong> or call our customer line for instant resolution.</p>
          </div>
        </div>
      </div>
    </>
  );
}
