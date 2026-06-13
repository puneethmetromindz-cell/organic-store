import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { User, ShoppingBag, MapPin, Settings, LogOut, Heart, ArrowRight, CheckCircle } from 'lucide-react';
import useWishlistStore from '../store/wishlistStore';
import toast from 'react-hot-toast';

export default function AccountPage() {
  const [activeTab, setActiveTab] = useState('overview');
  const wishlistCount = useWishlistStore((s) => s.getItemCount());
  const navigate = useNavigate();

  // Mock profile details
  const [profileName, setProfileName] = useState('Priya Sharma');
  const [profileEmail, setProfileEmail] = useState('priya.sharma@domain.com');
  const [profilePhone, setProfilePhone] = useState('+91 9880033463');

  // Mock addresses details
  const [billingAddress, setBillingAddress] = useState({
    name: 'Priya Sharma',
    street: '#12, 4th Main Road, Gokulam 3rd Stage',
    city: 'Mysuru',
    state: 'Karnataka',
    pin: '570002',
    phone: '9880033463'
  });

  const [shippingAddress, setShippingAddress] = useState({
    name: 'Priya Sharma',
    street: '#12, 4th Main Road, Gokulam 3rd Stage',
    city: 'Mysuru',
    state: 'Karnataka',
    pin: '570002',
    phone: '9880033463'
  });

  // Mock orders history list (WooCommerce preparation)
  const mockOrders = [
    {
      id: 'TRD-2026-9812',
      date: 'June 05, 2026',
      total: '₹448',
      status: 'Delivered',
      payment: 'Razorpay UPI',
      items: 'Amla Powder (100g) x 1, Moringa Powder (100g) x 1'
    },
    {
      id: 'TRD-2026-9705',
      date: 'May 18, 2026',
      total: '₹279',
      status: 'Delivered',
      payment: 'Cash on Delivery',
      items: 'Bhringraj Powder (100g) x 1'
    },
    {
      id: 'TRD-2026-9524',
      date: 'April 30, 2026',
      total: '₹499',
      status: 'Delivered',
      payment: 'Razorpay Card',
      items: 'Amla Powder (500g) x 1'
    }
  ];

  const handleProfileSave = (e) => {
    e.preventDefault();
    toast.success('Account profile updated successfully!');
  };

  const handleLogout = () => {
    toast.success('Logged out successfully from Tridamya Store.');
    navigate('/');
  };

  return (
    <>
      <Helmet>
        <title>My Account Dashboard | TRIDAMYA Organic Store</title>
        <meta name="description" content="Manage your Tridamya customer profile, view orders history, update shipping address, and check items in your wishlist." />
      </Helmet>

      {/* Header Banner */}
      <div className="section section--sm section--cream" style={{ borderBottom: '1px solid var(--color-cream-dark)' }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb__separator">/</span>
            <span className="breadcrumb__current">My Account</span>
          </nav>
          
          <div style={{ marginTop: '16px' }}>
            <span className="section-header__eyebrow" style={{ textAlign: 'left', marginBottom: '8px' }}>Customer Portal</span>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-5xl)' }}>Hello, {profileName}</h1>
          </div>
        </div>
      </div>

      {/* Dashboard Section layout */}
      <div className="section">
        <div className="container">
          <div className="account-layout">
            
            {/* Left Column Navigation Tabs Sidebar */}
            <nav className="account-nav" aria-label="Account Tabs Menu">
              <button 
                onClick={() => setActiveTab('overview')} 
                className={`account-nav-btn ${activeTab === 'overview' ? 'active' : ''}`}
              >
                <User size={16} />
                Overview
              </button>
              <button 
                onClick={() => setActiveTab('orders')} 
                className={`account-nav-btn ${activeTab === 'orders' ? 'active' : ''}`}
              >
                <ShoppingBag size={16} />
                Order History
              </button>
              <button 
                onClick={() => setActiveTab('addresses')} 
                className={`account-nav-btn ${activeTab === 'addresses' ? 'active' : ''}`}
              >
                <MapPin size={16} />
                Saved Addresses
              </button>
              <button 
                onClick={() => setActiveTab('profile')} 
                className={`account-nav-btn ${activeTab === 'profile' ? 'active' : ''}`}
              >
                <Settings size={16} />
                Profile Settings
              </button>
              <button 
                onClick={handleLogout} 
                className="account-nav-btn"
                style={{ color: 'var(--color-error)' }}
              >
                <LogOut size={16} />
                Log Out
              </button>
            </nav>

            {/* Right Column: Tab View Panels */}
            <main>
              
              {/* Overview Tab Content */}
              {activeTab === 'overview' && (
                <div className="account-card">
                  <h2 className="account-card__title">Dashboard Overview</h2>
                  <p style={{ color: 'var(--color-gray-600)', lineHeight: '1.6' }}>
                    Welcome back to the Tridamya customer portal. From here, you can track your Mysuru-sourced deliveries, check recent order items, update your Gokulam/Karnataka addresses, and manage your account details.
                  </p>

                  <div className="account-grid-summary">
                    <div className="account-stat-box">
                      <ShoppingBag size={24} style={{ color: 'var(--color-primary)', margin: '0 auto 8px' }} />
                      <span style={{ fontSize: '12px', color: 'var(--color-gray-500)', textTransform: 'uppercase' }}>Orders Sourced</span>
                      <strong className="account-stat-box__value">3</strong>
                    </div>

                    <div className="account-stat-box">
                      <Heart size={24} style={{ color: 'var(--color-primary)', margin: '0 auto 8px' }} />
                      <span style={{ fontSize: '12px', color: 'var(--color-gray-500)', textTransform: 'uppercase' }}>Saved Favorites</span>
                      <strong className="account-stat-box__value">{wishlistCount}</strong>
                    </div>

                    <div className="account-stat-box">
                      <MapPin size={24} style={{ color: 'var(--color-primary)', margin: '0 auto 8px' }} />
                      <span style={{ fontSize: '12px', color: 'var(--color-gray-500)', textTransform: 'uppercase' }}>States Served</span>
                      <strong className="account-stat-box__value">Karnataka</strong>
                    </div>
                  </div>

                  {/* Wishlist Shortcut panel */}
                  <div style={{ marginTop: '32px', background: 'var(--color-gray-50)', padding: '20px', borderRadius: 'var(--radius-md)', border: '1px solid var(--color-gray-200)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px' }}>
                    <div>
                      <h3 style={{ fontSize: '15px', fontWeight: 700, display: 'flex', gap: '8px', alignItems: 'center' }}>
                        <Heart size={16} fill="var(--color-primary)" color="var(--color-primary)" />
                        Refine Your Wellness Plan?
                      </h3>
                      <p style={{ fontSize: '12px', color: 'var(--color-gray-500)', marginBottom: 0, marginTop: '4px' }}>
                        You have {wishlistCount} organic powders saved in your wishlist folder. Add them to your basket now!
                      </p>
                    </div>
                    <Link to="/wishlist" className="btn btn--outline btn--sm" style={{ display: 'inline-flex', gap: '6px', alignItems: 'center' }}>
                      Go to Wishlist
                      <ArrowRight size={12} />
                    </Link>
                  </div>
                </div>
              )}

              {/* Order History Tab Content */}
              {activeTab === 'orders' && (
                <div className="account-card">
                  <h2 className="account-card__title">Order History</h2>
                  <p style={{ color: 'var(--color-gray-500)', fontSize: '13px', marginBottom: '24px' }}>
                    Note: Orders represent mock customer logs prepared for WooCommerce API integration.
                  </p>
                  
                  <div style={{ overflowX: 'auto' }}>
                    <table className="orders-table" aria-label="Customer Orders History">
                      <thead>
                        <tr>
                          <th scope="col">Order ID</th>
                          <th scope="col">Date</th>
                          <th scope="col">Total</th>
                          <th scope="col">Payment</th>
                          <th scope="col">Status</th>
                        </tr>
                      </thead>
                      <tbody>
                        {mockOrders.map((order) => (
                          <tr key={order.id}>
                            <td style={{ fontWeight: 600, color: 'var(--color-primary)' }}>{order.id}</td>
                            <td>{order.date}</td>
                            <td style={{ fontWeight: 600 }}>{order.total}</td>
                            <td>{order.payment}</td>
                            <td>
                              <span className="status-tag status-tag--completed">
                                {order.status}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Saved Addresses Tab Content */}
              {activeTab === 'addresses' && (
                <div className="account-card">
                  <h2 className="account-card__title">Saved Addresses</h2>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '24px' }}>
                    
                    {/* Billing address card */}
                    <div style={{ border: '1.5px solid var(--color-gray-200)', borderRadius: 'var(--radius-md)', padding: '20px', background: 'var(--color-gray-50)' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-dark)', borderBottom: '1px solid var(--color-gray-200)', paddingBottom: '8px', marginBottom: '12px' }}>
                        Default Billing Address
                      </h3>
                      <address style={{ fontSize: '13px', color: 'var(--color-gray-600)', fontStyle: 'normal', lineHeight: '1.6' }}>
                        <strong>{billingAddress.name}</strong><br />
                        {billingAddress.street}<br />
                        {billingAddress.city}, {billingAddress.state}<br />
                        PIN: {billingAddress.pin}<br />
                        Phone: {billingAddress.phone}
                      </address>
                      <button 
                        onClick={() => toast.success('Billing address edit panel is a placeholder for WooCommerce integration.')}
                        style={{ color: 'var(--color-primary)', fontSize: '12px', fontWeight: 600, marginTop: '16px', borderBottom: '1px dashed var(--color-primary)' }}
                      >
                        Edit Address
                      </button>
                    </div>

                    {/* Shipping address card */}
                    <div style={{ border: '1.5px solid var(--color-gray-200)', borderRadius: 'var(--radius-md)', padding: '20px', background: 'var(--color-gray-50)' }}>
                      <h3 style={{ fontSize: '14px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-primary-dark)', borderBottom: '1px solid var(--color-gray-200)', paddingBottom: '8px', marginBottom: '12px' }}>
                        Default Shipping Address
                      </h3>
                      <address style={{ fontSize: '13px', color: 'var(--color-gray-600)', fontStyle: 'normal', lineHeight: '1.6' }}>
                        <strong>{shippingAddress.name}</strong><br />
                        {shippingAddress.street}<br />
                        {shippingAddress.city}, {shippingAddress.state}<br />
                        PIN: {shippingAddress.pin}<br />
                        Phone: {shippingAddress.phone}
                      </address>
                      <button 
                        onClick={() => toast.success('Shipping address edit panel is a placeholder for WooCommerce integration.')}
                        style={{ color: 'var(--color-primary)', fontSize: '12px', fontWeight: 600, marginTop: '16px', borderBottom: '1px dashed var(--color-primary)' }}
                      >
                        Edit Address
                      </button>
                    </div>

                  </div>
                </div>
              )}

              {/* Profile Settings Tab Content */}
              {activeTab === 'profile' && (
                <div className="account-card">
                  <h2 className="account-card__title">Profile Information</h2>
                  <form onSubmit={handleProfileSave} style={{ marginTop: '24px' }}>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                      <div className="input-group">
                        <label htmlFor="profile-full-name">Full Name</label>
                        <input
                          type="text"
                          id="profile-full-name"
                          className="input"
                          value={profileName}
                          onChange={(e) => setProfileName(e.target.value)}
                          required
                        />
                      </div>

                      <div className="input-group">
                        <label htmlFor="profile-phone-num">Mobile Number</label>
                        <input
                          type="tel"
                          id="profile-phone-num"
                          className="input"
                          value={profilePhone}
                          onChange={(e) => setProfilePhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>

                    <div className="input-group" style={{ marginBottom: '20px' }}>
                      <label htmlFor="profile-email-addr">Email Address</label>
                      <input
                        type="email"
                        id="profile-email-addr"
                        className="input"
                        value={profileEmail}
                        onChange={(e) => setProfileEmail(e.target.value)}
                        required
                      />
                    </div>

                    <hr style={{ border: 'none', borderTop: '1px solid var(--color-gray-100)', margin: '24px 0' }} />
                    <h3 style={{ fontSize: '16px', fontWeight: 700, fontFamily: 'var(--font-heading)', color: 'var(--color-primary-dark)', marginBottom: '16px' }}>
                      Update Password
                    </h3>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                      <div className="input-group">
                        <label htmlFor="profile-current-password">Current Password</label>
                        <input
                          type="password"
                          id="profile-current-password"
                          className="input"
                          placeholder="••••••••"
                        />
                      </div>

                      <div className="input-group">
                        <label htmlFor="profile-new-password">New Password</label>
                        <input
                          type="password"
                          id="profile-new-password"
                          className="input"
                          placeholder="••••••••"
                        />
                      </div>
                    </div>

                    <button type="submit" className="btn btn--primary">
                      Save Profile Settings
                    </button>
                  </form>
                </div>
              )}

            </main>

          </div>
        </div>
      </div>
    </>
  );
}
