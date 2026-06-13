import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

export default function TermsConditions() {
  return (
    <>
      <Helmet>
        <title>Terms & Conditions | TRIDAMYA Organic Store</title>
        <meta name="description" content="Review the Terms & Conditions governing order placements and website usage at Tridamya Organic Store." />
      </Helmet>

      {/* Page Header */}
      <div className="section section--sm section--cream" style={{ borderBottom: '1px solid var(--color-cream-dark)' }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb__separator">/</span>
            <span className="breadcrumb__current">Terms & Conditions</span>
          </nav>
          <div style={{ marginTop: '16px' }}>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-5xl)' }}>Terms & Conditions</h1>
            <p style={{ color: 'var(--color-gray-500)', fontSize: 'var(--text-sm)' }}>Last Updated: June 13, 2026</p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="section">
        <div className="container" style={{ maxWidth: '800px' }}>
          <div className="tab-content" style={{ padding: 0 }}>
            <p>Welcome to Tridamya. These Terms & Conditions govern your access to and usage of our website and purchase of our organic wellness powders processed at Belagola Food Industrial Estate, Mysuru.</p>

            <h2>1. User Accounts & Verification</h2>
            <p>By placing guest orders or registering account dashboards, you confirm that all billing details, shipping addresses in Karnataka, and contact numbers provided are accurate. We reserve the right to verify or cancel orders if false details are suspected.</p>

            <h2>2. Sourcing and Sizing Variations</h2>
            <p>Tridamya powders are single-ingredient botanicals. Since harvests fluctuate naturally by seasons, slight variations in texture, color, or aroma are standard and reflect absolute purity. Products are sold by weight packages (e.g., 100g, 250g, 500g) which you choose via variation selectors.</p>

            <h2>3. Sourcing limits & COD rules</h2>
            <p>• <strong>Scope of Service:</strong> Delivery is currently limited exclusively to shipping addresses inside Karnataka, India. <br />
              • <strong>COD Orders:</strong> When choosing Cash on Delivery, you agree to pay invoice totals in full (via cash or instant UPI scan) upon package handoff. Failing to settle COD totals will lead to account restrictions.
            </p>

            <h2>4. Disclaimer of Health Benefits</h2>
            <p>All highlights, nutritional facts, botanical attributes, and usage descriptions are inspired by traditional Ayurvedic literature and modern general nutritional data. They are not intended as medical prescriptions, diagnostic guides, or replacements for professional clinical consults.</p>

            <h2>5. Jurisdiction</h2>
            <p>These terms are governed in accordance with Indian business laws. All legal claims, disputes, or liabilities arising from usage or purchases are subject exclusively to the courts located in <strong>Mysuru, Karnataka, India</strong>.</p>
          </div>
        </div>
      </div>
    </>
  );
}
