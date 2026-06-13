import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { ShieldCheck, Truck, CreditCard, Percent, ArrowLeft, Loader } from 'lucide-react';
import useCartStore from '../store/cartStore';
import toast from 'react-hot-toast';

export default function CheckoutPage() {
  const { items, getSubtotal, clearCart } = useCartStore();
  const navigate = useNavigate();

  // Form states
  const [email, setEmail] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [address, setAddress] = useState('');
  const [apartment, setApartment] = useState('');
  const [city, setCity] = useState('');
  const [pinCode, setPinCode] = useState('');
  const [phone, setPhone] = useState('');
  const [orderNotes, setOrderNotes] = useState('');
  
  // Payment states
  const [paymentMethod, setPaymentMethod] = useState('cod');
  
  // Coupon states
  const [couponInput, setCouponInput] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);

  // Loading simulation states
  const [isProcessing, setIsProcessing] = useState(false);

  const subtotal = getSubtotal();
  const shippingFee = 0;
  const totalAmount = Math.max(0, subtotal + shippingFee - discountAmount);

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (couponInput.trim().toUpperCase() === 'TRIDAMYA10') {
      const discount = Math.round(subtotal * 0.1);
      setDiscountAmount(discount);
      setAppliedCoupon('TRIDAMYA10');
      toast.success('Coupon applied! 10% discount has been subtracted.');
    } else {
      toast.error("Invalid coupon code! Try using 'TRIDAMYA10' for a 10% discount.");
    }
    setCouponInput('');
  };

  const handleRemoveCoupon = () => {
    setDiscountAmount(0);
    setAppliedCoupon('');
    toast.success('Coupon code removed.');
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();

    if (!email || !firstName || !lastName || !address || !city || !pinCode || !phone) {
      toast.error('Please fill out all shipping and contact information fields.');
      return;
    }

    if (pinCode.length !== 6 || isNaN(pinCode)) {
      toast.error('Please enter a valid 6-digit PIN code.');
      return;
    }

    if (phone.length < 10 || isNaN(phone)) {
      toast.error('Please enter a valid 10-digit mobile number.');
      return;
    }

    // Capture order details before clearing the cart
    const orderDetails = {
      orderId: `TRD-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
      items: [...items],
      subtotal,
      discountAmount,
      totalAmount,
      paymentMethod,
      shippingAddress: {
        firstName,
        lastName,
        address,
        apartment,
        city,
        pinCode,
        phone,
        email
      }
    };

    if (paymentMethod === 'online') {
      // Simulate Razorpay Secure Payment Portal launch
      setIsProcessing(true);
      setTimeout(() => {
        setIsProcessing(false);
        clearCart();
        navigate('/order-success', { state: { orderDetails } });
        toast.success('Payment completed successfully via mock Razorpay!');
      }, 3000);
    } else {
      // COD Order Placement
      clearCart();
      navigate('/order-success', { state: { orderDetails } });
      toast.success('Order placed successfully! Cash on Delivery confirmed.');
    }
  };

  if (items.length === 0) {
    return (
      <div className="container section text-center" style={{ padding: '80px 0' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-4xl)', marginBottom: '16px' }}>Your Cart is Empty</h2>
        <p style={{ color: 'var(--color-gray-500)', marginBottom: '24px' }}>Add products to your cart before proceeding to checkout.</p>
        <Link to="/shop" className="btn btn--primary">Return to Shop</Link>
      </div>
    );
  }

  return (
    <>
      <Helmet>
        <title>Secure Checkout | TRIDAMYA Organic Store</title>
        <meta name="description" content="Securely place your order for Tridamya's pure organic wellness powders. Karnataka delivery only. Cash on Delivery and Secure Online payment options available." />
      </Helmet>

      {/* Simulated Secure Payment loader overlay */}
      {isProcessing && (
        <div className="payment-loader-overlay">
          <div className="payment-loader-card">
            <Loader size={48} className="loader__spinner" style={{ margin: '0 auto 20px', color: 'var(--color-primary)' }} />
            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-2xl)', marginBottom: '12px', color: 'var(--color-primary-dark)' }}>
              Launching Secure Payment Portal
            </h3>
            <p style={{ color: 'var(--color-gray-600)', fontSize: 'var(--text-sm)', lineHeight: '1.6' }}>
              Setting up secure gateway window (Razorpay API)... <br />
              Please do not close this window, refresh the page, or click the back button.
            </p>
          </div>
        </div>
      )}

      {/* Page Header */}
      <div className="section section--sm section--cream" style={{ borderBottom: '1px solid var(--color-cream-dark)' }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb__separator">/</span>
            <Link to="/cart">Shopping Cart</Link>
            <span className="breadcrumb__separator">/</span>
            <span className="breadcrumb__current">Secure Checkout</span>
          </nav>
          
          <div style={{ marginTop: '16px' }}>
            <span className="section-header__eyebrow" style={{ textAlign: 'left', marginBottom: '8px' }}>Purity Delivered Securely</span>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-5xl)' }}>Secure Checkout</h1>
          </div>
        </div>
      </div>

      {/* Checkout Content Layout */}
      <div className="section">
        <div className="container">
          <form onSubmit={handlePlaceOrder} className="checkout-layout">
            
            {/* Left Column: Checkout Forms */}
            <div>
              {/* COD delivery notice */}
              <div 
                style={{
                  background: 'var(--color-cream)',
                  border: '1.5px solid var(--color-sage-dark)',
                  borderRadius: 'var(--radius-md)',
                  padding: '16px',
                  marginBottom: '24px',
                  fontSize: '13px',
                  color: 'var(--color-primary-dark)',
                }}
              >
                📍 <strong>Karnataka Delivery Only:</strong> We are currently serving customers throughout Karnataka, India. All orders are hand-picked and dispatched directly from our Mysuru food industrial facility.
              </div>

              {/* Billing/Contact details section */}
              <div className="checkout-section">
                <h2 className="checkout-section__title">Contact Information</h2>
                <div className="input-group">
                  <label htmlFor="customer-email">Email Address</label>
                  <input
                    type="email"
                    id="customer-email"
                    className="input"
                    placeholder="e.g. customer@domain.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Shipping Address section */}
              <div className="checkout-section">
                <h2 className="checkout-section__title">Shipping Address</h2>
                <div className="checkout-form-grid">
                  <div className="input-group">
                    <label htmlFor="first-name">First Name</label>
                    <input
                      type="text"
                      id="first-name"
                      className="input"
                      value={firstName}
                      onChange={(e) => setFirstName(e.target.value)}
                      required
                    />
                  </div>
                  <div className="input-group">
                    <label htmlFor="last-name">Last Name</label>
                    <input
                      type="text"
                      id="last-name"
                      className="input"
                      value={lastName}
                      onChange={(e) => setLastName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-group checkout-form-grid__full">
                    <label htmlFor="street-address">Street Address</label>
                    <input
                      type="text"
                      id="street-address"
                      className="input"
                      placeholder="House/Apartment no., Street name, Area"
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-group checkout-form-grid__full">
                    <label htmlFor="apartment-address">Apartment, suite, unit etc. (Optional)</label>
                    <input
                      type="text"
                      id="apartment-address"
                      className="input"
                      value={apartment}
                      onChange={(e) => setApartment(e.target.value)}
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="shipping-city">City / Town</label>
                    <input
                      type="text"
                      id="shipping-city"
                      className="input"
                      value={city}
                      onChange={(e) => setCity(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="shipping-state">State</label>
                    <select
                      id="shipping-state"
                      className="input"
                      disabled
                      style={{ backgroundColor: 'var(--color-gray-100)', cursor: 'not-allowed' }}
                      aria-label="Locked State"
                    >
                      <option value="karnataka">Karnataka</option>
                    </select>
                  </div>

                  <div className="input-group">
                    <label htmlFor="shipping-pincode">PIN Code (6 digits)</label>
                    <input
                      type="text"
                      id="shipping-pincode"
                      className="input"
                      maxLength={6}
                      placeholder="e.g. 570016"
                      value={pinCode}
                      onChange={(e) => setPinCode(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="shipping-phone">Phone Number (10 digits)</label>
                    <input
                      type="tel"
                      id="shipping-phone"
                      className="input"
                      maxLength={10}
                      placeholder="e.g. 9880033463"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Delivery preferences / Order Notes */}
              <div className="checkout-section">
                <h2 className="checkout-section__title">Additional Notes</h2>
                <div className="input-group">
                  <label htmlFor="order-notes">Order Notes (Optional)</label>
                  <textarea
                    id="order-notes"
                    className="input textarea"
                    placeholder="Instructions for delivery riders, gate codes or packaging preferences..."
                    value={orderNotes}
                    onChange={(e) => setOrderNotes(e.target.value)}
                  ></textarea>
                </div>
              </div>

              {/* Payment Methods selector */}
              <div className="checkout-section">
                <h2 className="checkout-section__title">Payment Method</h2>
                <div className="payment-methods">
                  
                  {/* Cash on Delivery option */}
                  <div 
                    onClick={() => setPaymentMethod('cod')}
                    className={`payment-method-option ${paymentMethod === 'cod' ? 'active' : ''}`}
                  >
                    <div className="payment-method-option__header">
                      <input 
                        type="radio" 
                        id="payment-cod" 
                        name="payment" 
                        value="cod" 
                        checked={paymentMethod === 'cod'} 
                        onChange={() => setPaymentMethod('cod')}
                        style={{ cursor: 'pointer', accentColor: 'var(--color-primary)' }}
                      />
                      <label htmlFor="payment-cod" style={{ display: 'flex', gap: '8px', alignItems: 'center', cursor: 'pointer' }}>
                        <Truck size={16} />
                        Cash on Delivery (COD)
                      </label>
                    </div>
                    <p className="payment-method-option__description">
                      Pay with cash, cards or UPI upon delivery at your doorstep. Standard shipping applies.
                    </p>
                  </div>

                  {/* Online payment option */}
                  <div 
                    onClick={() => setPaymentMethod('online')}
                    className={`payment-method-option ${paymentMethod === 'online' ? 'active' : ''}`}
                  >
                    <div className="payment-method-option__header">
                      <input 
                        type="radio" 
                        id="payment-online" 
                        name="payment" 
                        value="online" 
                        checked={paymentMethod === 'online'} 
                        onChange={() => setPaymentMethod('online')}
                        style={{ cursor: 'pointer', accentColor: 'var(--color-primary)' }}
                      />
                      <label htmlFor="payment-online" style={{ display: 'flex', gap: '8px', alignItems: 'center', cursor: 'pointer' }}>
                        <CreditCard size={16} />
                        Razorpay Secure Online Checkout
                      </label>
                    </div>
                    <p className="payment-method-option__description">
                      Pay safely via UPI, Credit/Debit cards, Netbanking, or Wallet. Launches Razorpay secure frame overlay.
                    </p>
                  </div>

                </div>
              </div>
            </div>

            {/* Right Column: Checkout Summary & Coupons */}
            <aside>
              {/* Order summary listing */}
              <div className="summary-card" style={{ position: 'static', marginBottom: '24px' }}>
                <h2 className="summary-card__title" style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Your Items</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '240px', overflowY: 'auto', paddingRight: '4px', marginBottom: '20px' }}>
                  {items.map((item) => {
                    const price = item.salePrice || item.price;
                    return (
                      <div key={`${item.id}-${item.variation?.id || 'std'}`} style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                        <img 
                          src={item.image} 
                          alt={item.name} 
                          style={{ width: '48px', height: '48px', objectFit: 'cover', borderRadius: '4px', border: '1px solid var(--color-gray-200)', backgroundColor: 'var(--color-cream)' }}
                        />
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <h4 style={{ fontSize: '13px', fontWeight: 600, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{item.name}</h4>
                          <span style={{ fontSize: '11px', color: 'var(--color-gray-500)' }}>
                            Qty: {item.quantity} {item.variation ? `(${item.variation.name})` : ''}
                          </span>
                        </div>
                        <span style={{ fontSize: '13px', fontWeight: 600 }}>₹{parseFloat(price) * item.quantity}</span>
                      </div>
                    );
                  })}
                </div>

                {/* Coupon Code block */}
                <div style={{ borderTop: '1px solid var(--color-gray-200)', paddingTop: '20px', marginBottom: '20px' }}>
                  <span className="option-group__label" style={{ fontSize: '11px' }}>Apply Coupon Code:</span>
                  {appliedCoupon ? (
                    <div 
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        padding: '8px 12px',
                        background: 'var(--color-sage)',
                        border: '1.5px solid var(--color-primary)',
                        borderRadius: 'var(--radius-sm)',
                        fontSize: '13px',
                        color: 'var(--color-primary-dark)',
                        fontWeight: 600,
                      }}
                    >
                      <span style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <Percent size={14} />
                        {appliedCoupon} Applied!
                      </span>
                      <button 
                        type="button" 
                        onClick={handleRemoveCoupon}
                        style={{ color: 'var(--color-error)', fontSize: '11px', textTransform: 'uppercase', fontWeight: 700 }}
                      >
                        Remove
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="e.g. TRIDAMYA10"
                        value={couponInput}
                        onChange={(e) => setCouponInput(e.target.value)}
                        className="input"
                        style={{ padding: '8px 12px', fontSize: '13px' }}
                        aria-label="Coupon Field"
                      />
                      <button 
                        type="button" 
                        onClick={handleApplyCoupon}
                        className="btn btn--outline btn--sm"
                      >
                        Apply
                      </button>
                    </div>
                  )}
                  <span style={{ display: 'block', fontSize: '10px', color: 'var(--color-gray-400)', marginTop: '4px' }}>
                    *Use coupon "TRIDAMYA10" to test a 10% subtotal discount code.
                  </span>
                </div>

                {/* Checkout Subtotal & Fees */}
                <div style={{ borderTop: '1px solid var(--color-gray-200)', paddingTop: '20px' }}>
                  <div className="summary-row">
                    <span>Subtotal</span>
                    <span>₹{subtotal}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="summary-row" style={{ color: 'var(--color-success)', fontWeight: 600 }}>
                      <span>Discount ({appliedCoupon})</span>
                      <span>-₹{discountAmount}</span>
                    </div>
                  )}

                  <div className="summary-row">
                    <span>Shipping</span>
                    <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>FREE</span>
                  </div>

                  <div className="summary-row summary-row--total">
                    <span>Grand Total</span>
                    <span>₹{totalAmount}</span>
                  </div>
                </div>

                {/* Checkout Buttons */}
                <div style={{ marginTop: '24px' }}>
                  <button 
                    type="submit" 
                    className="btn btn--primary" 
                    style={{ width: '100%', padding: '14px 20px', display: 'flex', justifyContent: 'center', gap: '8px' }}
                  >
                    Place Secure Order
                  </button>
                </div>

                {/* Back to Cart Option */}
                <div style={{ marginTop: '16px', textAlign: 'center' }}>
                  <Link to="/cart" className="btn btn--ghost btn--sm" style={{ display: 'inline-flex', gap: '6px', alignItems: 'center', fontSize: '12px' }}>
                    <ArrowLeft size={12} />
                    Return to Cart
                  </Link>
                </div>
              </div>

              {/* Trust Indicators */}
              <div 
                style={{
                  background: 'var(--color-gray-50)',
                  border: '1.5px solid var(--color-gray-200)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px',
                }}
              >
                <h3 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-charcoal)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <ShieldCheck size={16} style={{ color: 'var(--color-primary)' }} />
                  Tridamya Trust Metrics
                </h3>
                <ul style={{ fontSize: '12px', color: 'var(--color-gray-600)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  <li>✓ <strong>Pesticide-Free Guarantee:</strong> Hand-picked botanical powders sourced directly from certified organic farms.</li>
                  <li>✓ <strong>Refund Coverage:</strong> 100% money-back policy for damage during Mysuru transport transit.</li>
                  <li>✓ <strong>Direct Farm Sourcing:</strong> Directly supporting rural farmer cooperatives in Mysore & Belagola.</li>
                </ul>
              </div>
            </aside>

          </form>
        </div>
      </div>
    </>
  );
}
