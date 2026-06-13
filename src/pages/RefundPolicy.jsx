import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function RefundPolicy() {
  return (
    <>
      <Helmet>
        <title>Refund & Return Policy | TRIDAMYA Organic Store</title>
        <meta name="description" content="Review Tridamya's refund and returns policy. Sourced with care, backed by our 100% transit damage guarantee." />
      </Helmet>

      {/* Page Header */}
      <div className="section section--sm section--cream" style={{ borderBottom: '1px solid var(--color-cream-dark)' }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb__separator">/</span>
            <span className="breadcrumb__current">Refund & Return Policy</span>
          </nav>
          <div style={{ marginTop: '16px' }}>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-5xl)' }}>Refund & Return Policy</h1>
            <p style={{ color: 'var(--color-gray-500)', fontSize: 'var(--text-sm)' }}>Last Updated: June 13, 2026</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="tab-content" style={{ padding: 0 }}>
            <p>At Tridamya, we take immense pride in the purity and Ayurvedic quality of our single-ingredient botanical powders. We want you to be completely satisfied with your wellness purchase, and we handle returns with transparency and care.</p>

            <h2>1. Natural Sourcing & Harvesting Disclaimer</h2>
            <p>Because our powders (Amla, Moringa, Bhringraj, Beetroot) are 100% pure botanicals without artificial fillers, colors, or processing aids, slight variations in texture, color, and aroma are normal across seasonal harvests. These natural variations reflect the authenticity of our product and are not considered defects eligible for refund.</p>

            <h2>2. Return Eligibility & Window</h2>
            <p>• <strong>Return Period:</strong> You may request a return or exchange within <strong>7 days</strong> of receiving your package.<br />
              • <strong>Condition:</strong> Due to health, hygiene, and safety regulations regarding ingestible and topical wellness products, items must be unopened, unused, with the original protective foil seal completely intact, and in the original packaging.
            </p>

            <h2>3. Damaged or Defective Products</h2>
            <p>If your order is damaged during transit (e.g. leaking seals, torn pouches, broken outer packaging), we offer a <strong>100% replacement or refund guarantee</strong>. Please report the damage within 24 hours of delivery by emailing <strong>Tridamya@gmail.com</strong>. You must include:<br />
              • Your order number (e.g., TRD-2026-XXXXXX)<br />
              • Clear photos of the outer shipping box and the damaged product package.
            </p>

            <h2>4. Return Processing Steps</h2>
            <p>1. Contact our support desk at <strong>Tridamya@gmail.com</strong> with your order number and reason for return.<br />
              2. If approved, we will provide you with a return authorization and the shipping coordinates for our Mysuru warehouse center.<br />
              3. Pack the items securely and ship them back using a local courier service. You are responsible for return shipping costs unless the return is due to transit damage or shipping error.
            </p>

            <h2>5. Refund Processing & Timelines</h2>
            <p>• <strong>Inspection:</strong> Once received at our Belagola facility, we will inspect the items and notify you of the approval or rejection of your refund.<br />
              • <strong>Approved Refunds:</strong> Approved refunds are credited to the original payment method (for online payments) or to a designated bank account/UPI ID (for Cash on Delivery orders) within <strong>5 to 7 business days</strong>.<br />
              • <strong>COD Processing:</strong> For COD orders, a customer service representative will contact you to collect bank details or UPI coordinates for refund transfer.
            </p>

            <h2>6. Help and Customer Support</h2>
            <p>For any questions regarding returns, please contact our support desk:<br />
              • Email: <strong>Tridamya@gmail.com</strong><br />
              • Address: <strong>#10/A-9, 2nd Cross, Belagola Food Industrial Estate, Mysuru</strong>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
