import { useLocation, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { motion } from 'framer-motion';
import { 
  CheckCircle2, 
  Calendar, 
  CreditCard, 
  MapPin, 
  ShoppingBag, 
  User, 
  Phone, 
  Mail, 
  Printer, 
  Truck, 
  ShieldCheck, 
  ArrowRight,
  PackageCheck
} from 'lucide-react';

export default function OrderSuccessPage() {
  const location = useLocation();

  // Fallback demo order details if page is accessed directly or refreshed
  const fallbackOrderDetails = {
    orderId: 'TRD-2026-987412',
    date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' }),
    items: [
      {
        id: 3,
        name: 'Bhringraj Powder',
        price: '279',
        salePrice: '279',
        image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=600&q=80',
        quantity: 1,
        variation: { id: 302, name: '250g', weight: '250g' },
        slug: 'bhringraj-powder',
      },
      {
        id: 2,
        name: 'Moringa Powder',
        price: '199',
        salePrice: '199',
        image: 'https://images.unsplash.com/photo-1611070973770-b1a672610042?auto=format&fit=crop&w=600&q=80',
        quantity: 2,
        variation: { id: 201, name: '100g', weight: '100g' },
        slug: 'moringa-powder',
      }
    ],
    subtotal: 677,
    discountAmount: 68,
    totalAmount: 609,
    paymentMethod: 'online',
    shippingAddress: {
      firstName: 'Puneeth',
      lastName: 'Kumar',
      address: '#10, 2nd Main, Gokulam',
      apartment: 'Apt 4B',
      city: 'Mysuru',
      pinCode: '570002',
      phone: '9880033463',
      email: 'puneeth@example.com'
    }
  };

  const isDemo = !location.state?.orderDetails;
  const orderDetails = location.state?.orderDetails || fallbackOrderDetails;
  const {
    orderId,
    date,
    items,
    subtotal,
    discountAmount,
    totalAmount,
    paymentMethod,
    shippingAddress
  } = orderDetails;

  const handlePrint = () => {
    window.print();
  };

  // Motion variants
  const pageVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.6,
        staggerChildren: 0.1,
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  const circleVariants = {
    hidden: { scale: 0.6, opacity: 0 },
    visible: { 
      scale: 1, 
      opacity: 1,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15,
        delay: 0.1
      }
    }
  };

  return (
    <>
      <Helmet>
        <title>Order Confirmed | TRIDAMYA Organic Store</title>
        <meta name="description" content="Thank you for ordering with Tridamya. Your organic herbs order has been placed successfully. Delivering across Karnataka from Mysuru." />
      </Helmet>

      {/* Page Header */}
      <div className="section section--sm section--cream no-print" style={{ borderBottom: '1px solid var(--color-cream-dark)' }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb__separator">/</span>
            <span className="breadcrumb__current">Order Success</span>
          </nav>
          <div style={{ marginTop: '16px' }}>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-4xl)' }}>Order Confirmation</h1>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container">
          <motion.div 
            className="order-success-flow"
            variants={pageVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Celebration Banner */}
            <motion.div 
              className="text-center" 
              variants={itemVariants} 
              style={{ marginBottom: '40px', padding: '24px 0' }}
            >
              <motion.div 
                style={{ 
                  display: 'inline-flex', 
                  alignItems: 'center', 
                  justifyContent: 'center', 
                  width: '80px', 
                  height: '80px', 
                  borderRadius: '50%', 
                  background: 'var(--color-sage)', 
                  color: 'var(--color-primary)', 
                  marginBottom: '20px'
                }}
                variants={circleVariants}
              >
                <CheckCircle2 size={44} style={{ strokeWidth: 2 }} />
              </motion.div>
              
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-4xl)', color: 'var(--color-primary-dark)', marginBottom: '12px' }}>
                Thank You for Your Order!
              </h2>
              <p style={{ color: 'var(--color-gray-600)', maxWidth: '600px', margin: '0 auto', fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
                Your order has been received and is now being hand-packaged with care at our processing unit in <strong>Mysuru, Karnataka</strong>. We will notify you once your package is on the way.
              </p>

              {isDemo && (
                <div style={{ 
                  display: 'inline-block',
                  margin: '16px auto 0',
                  padding: '4px 12px',
                  background: 'var(--color-cream-dark)',
                  color: 'var(--color-primary-dark)',
                  borderRadius: '12px',
                  fontSize: 'var(--text-xs)',
                  fontWeight: 600
                }}>
                  Showing latest order receipt
                </div>
              )}
            </motion.div>

            {/* Delivery Progress Tracker */}
            <motion.div 
              className="checkout-section no-print" 
              variants={itemVariants}
              style={{ padding: '24px 32px', marginBottom: '32px' }}
            >
              <h3 style={{ fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: '20px', color: 'var(--color-charcoal)' }}>
                Order Status Timeline
              </h3>
              
              {/* Tracker Grid */}
              <div className="tracker-steps" style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', position: 'relative', gap: '8px' }}>
                {/* Horizontal progress bar */}
                <div style={{ 
                  position: 'absolute', 
                  top: '16px', 
                  left: '12.5%', 
                  right: '12.5%', 
                  height: '4px', 
                  background: 'var(--color-gray-200)', 
                  zIndex: 1 
                }}>
                  <div style={{ width: '25%', height: '100%', background: 'var(--color-primary)' }}></div>
                </div>

                {/* Step 1: Received */}
                <div className="text-center" style={{ zIndex: 2 }}>
                  <div style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '50%', 
                    background: 'var(--color-primary)', 
                    color: 'var(--color-white)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 8px',
                    fontWeight: 700,
                    fontSize: '14px',
                    boxShadow: '0 0 0 4px var(--color-sage)'
                  }}>
                    ✓
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-primary-dark)', display: 'block' }}>Order Received</span>
                  <span style={{ fontSize: '11px', color: 'var(--color-gray-500)' }}>Ready for fulfillment</span>
                </div>

                {/* Step 2: Processing */}
                <div className="text-center" style={{ zIndex: 2 }}>
                  <div style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '50%', 
                    background: 'var(--color-gray-100)', 
                    color: 'var(--color-gray-500)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 8px',
                    fontWeight: 600,
                    fontSize: '14px',
                    border: '2px dashed var(--color-gray-300)'
                  }}>
                    2
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-gray-600)', display: 'block' }}>Packing</span>
                  <span style={{ fontSize: '11px', color: 'var(--color-gray-400)' }}>At Belagola facility</span>
                </div>

                {/* Step 3: Dispatched */}
                <div className="text-center" style={{ zIndex: 2 }}>
                  <div style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '50%', 
                    background: 'var(--color-gray-100)', 
                    color: 'var(--color-gray-500)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 8px',
                    fontWeight: 600,
                    fontSize: '14px',
                    border: '2px dashed var(--color-gray-300)'
                  }}>
                    3
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-gray-600)', display: 'block' }}>In Transit</span>
                  <span style={{ fontSize: '11px', color: 'var(--color-gray-400)' }}>Mysore transit networks</span>
                </div>

                {/* Step 4: Delivered */}
                <div className="text-center" style={{ zIndex: 2 }}>
                  <div style={{ 
                    width: '36px', 
                    height: '36px', 
                    borderRadius: '50%', 
                    background: 'var(--color-gray-100)', 
                    color: 'var(--color-gray-500)', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    margin: '0 auto 8px',
                    fontWeight: 600,
                    fontSize: '14px',
                    border: '2px dashed var(--color-gray-300)'
                  }}>
                    4
                  </div>
                  <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-gray-600)', display: 'block' }}>Delivered</span>
                  <span style={{ fontSize: '11px', color: 'var(--color-gray-400)' }}>Doorstep handoff</span>
                </div>
              </div>
            </motion.div>

            {/* Layout Grid */}
            <div className="checkout-layout">
              {/* Left Column: Details */}
              <div className="order-details-main">
                {/* Meta details (ID, Date, Method) */}
                <motion.div className="checkout-section" variants={itemVariants}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '16px' }}>
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <PackageCheck size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                      <div>
                        <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-gray-400)', display: 'block' }}>Order Identifier</span>
                        <strong style={{ fontSize: '14px', color: 'var(--color-charcoal)' }}>{orderId}</strong>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <Calendar size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                      <div>
                        <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-gray-400)', display: 'block' }}>Placement Date</span>
                        <strong style={{ fontSize: '14px', color: 'var(--color-charcoal)' }}>{date}</strong>
                      </div>
                    </div>

                    <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                      <CreditCard size={20} style={{ color: 'var(--color-primary)', flexShrink: 0 }} />
                      <div>
                        <span style={{ fontSize: '11px', textTransform: 'uppercase', color: 'var(--color-gray-400)', display: 'block' }}>Payment Channel</span>
                        <strong style={{ fontSize: '14px', color: 'var(--color-charcoal)', textTransform: 'uppercase' }}>
                          {paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
                        </strong>
                      </div>
                    </div>
                  </div>
                </motion.div>

                {/* Items Summary */}
                <motion.div className="checkout-section" variants={itemVariants}>
                  <h3 className="checkout-section__title" style={{ borderBottom: '1px solid var(--color-gray-100)', paddingBottom: '12px', marginBottom: '16px' }}>
                    Purchased Herbals
                  </h3>

                  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                    {items.map((item, idx) => {
                      const price = item.salePrice || item.price;
                      return (
                        <div 
                          key={`${item.id}-${item.variation?.id || 'std'}`} 
                          style={{ 
                            display: 'flex', 
                            gap: '16px', 
                            alignItems: 'center',
                            paddingBottom: idx !== items.length - 1 ? '16px' : 0,
                            borderBottom: idx !== items.length - 1 ? '1px solid var(--color-gray-100)' : 'none'
                          }}
                        >
                          <img 
                            src={item.image} 
                            alt={item.name} 
                            style={{ 
                              width: '64px', 
                              height: '64px', 
                              objectFit: 'cover', 
                              borderRadius: 'var(--radius-md)', 
                              border: '1px solid var(--color-gray-200)',
                              backgroundColor: 'var(--color-cream)',
                              flexShrink: 0
                            }}
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <h4 style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-charcoal)', marginBottom: '4px' }}>
                              {item.name}
                            </h4>
                            <div style={{ display: 'flex', gap: '12px', fontSize: '13px', color: 'var(--color-gray-500)' }}>
                              <span>Quantity: {item.quantity}</span>
                              {item.variation && (
                                <span>• Weight Option: {item.variation.name}</span>
                              )}
                            </div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                              ₹{parseFloat(price) * item.quantity}
                            </span>
                            <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-gray-400)' }}>
                              ₹{price} each
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>

                {/* Shipping Coordinates */}
                <motion.div className="checkout-section" variants={itemVariants}>
                  <h3 className="checkout-section__title" style={{ borderBottom: '1px solid var(--color-gray-100)', paddingBottom: '12px', marginBottom: '16px' }}>
                    Shipping Coordinates
                  </h3>

                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
                    <div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <User size={16} style={{ color: 'var(--color-primary)', marginTop: '2px', flexShrink: 0 }} />
                        <div>
                          <span style={{ fontSize: '11px', color: 'var(--color-gray-400)', textTransform: 'uppercase', display: 'block' }}>Recipient</span>
                          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                            {shippingAddress.firstName} {shippingAddress.lastName}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start', marginBottom: '12px' }}>
                        <Phone size={16} style={{ color: 'var(--color-primary)', marginTop: '2px', flexShrink: 0 }} />
                        <div>
                          <span style={{ fontSize: '11px', color: 'var(--color-gray-400)', textTransform: 'uppercase', display: 'block' }}>Phone Contact</span>
                          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                            {shippingAddress.phone}
                          </span>
                        </div>
                      </div>

                      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <Mail size={16} style={{ color: 'var(--color-primary)', marginTop: '2px', flexShrink: 0 }} />
                        <div>
                          <span style={{ fontSize: '11px', color: 'var(--color-gray-400)', textTransform: 'uppercase', display: 'block' }}>Email Address</span>
                          <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-charcoal)', wordBreak: 'break-all' }}>
                            {shippingAddress.email}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <div style={{ display: 'flex', gap: '8px', alignItems: 'flex-start' }}>
                        <MapPin size={16} style={{ color: 'var(--color-primary)', marginTop: '2px', flexShrink: 0 }} />
                        <div>
                          <span style={{ fontSize: '11px', color: 'var(--color-gray-400)', textTransform: 'uppercase', display: 'block' }}>Delivery Address</span>
                          <span style={{ fontSize: '14px', color: 'var(--color-charcoal)', lineHeight: '1.5', display: 'block' }}>
                            {shippingAddress.address}
                            {shippingAddress.apartment && `, ${shippingAddress.apartment}`}
                            <br />
                            {shippingAddress.city}, Karnataka - {shippingAddress.pinCode}
                          </span>
                        </div>
                      </div>
                      
                      <div style={{ 
                        marginTop: '16px', 
                        padding: '8px 12px', 
                        background: 'var(--color-cream)', 
                        borderRadius: 'var(--radius-sm)', 
                        borderLeft: '3px solid var(--color-primary)', 
                        fontSize: '12px',
                        color: 'var(--color-primary-dark)'
                      }}>
                        📌 Karnataka Delivery Zone
                      </div>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Right Column: Pricing breakdown & CTAs */}
              <div>
                <motion.div className="summary-card" variants={itemVariants} style={{ position: 'static', marginBottom: '24px' }}>
                  <h3 className="summary-card__title" style={{ fontSize: '1.25rem', marginBottom: '16px' }}>Invoice Receipt</h3>
                  
                  <div className="summary-row">
                    <span style={{ color: 'var(--color-gray-500)', fontSize: '14px' }}>Subtotal</span>
                    <span style={{ fontWeight: 600, color: 'var(--color-charcoal)' }}>₹{subtotal}</span>
                  </div>

                  {discountAmount > 0 && (
                    <div className="summary-row" style={{ color: 'var(--color-success)' }}>
                      <span style={{ fontSize: '14px' }}>Coupon Code Applied</span>
                      <span style={{ fontWeight: 600 }}>-₹{discountAmount}</span>
                    </div>
                  )}

                  <div className="summary-row">
                    <span style={{ color: 'var(--color-gray-500)', fontSize: '14px' }}>Karnataka Delivery Fee</span>
                    <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>FREE</span>
                  </div>

                  <div className="summary-row summary-row--total" style={{ borderTop: '1px solid var(--color-gray-200)', paddingTop: '16px', marginTop: '16px' }}>
                    <span style={{ fontWeight: 700, color: 'var(--color-charcoal)' }}>Amount Settled</span>
                    <span style={{ fontSize: 'var(--text-2xl)', fontWeight: 800, color: 'var(--color-primary-dark)' }}>₹{totalAmount}</span>
                  </div>

                  <div 
                    style={{ 
                      marginTop: '20px', 
                      padding: '12px', 
                      background: 'var(--color-white)', 
                      border: '1px solid var(--color-gray-200)',
                      borderRadius: 'var(--radius-sm)',
                      fontSize: '13px'
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                      <span style={{ color: 'var(--color-gray-500)' }}>Status:</span>
                      <strong style={{ color: paymentMethod === 'online' ? 'var(--color-success)' : 'var(--color-warning)' }}>
                        {paymentMethod === 'online' ? 'PAID ✓' : 'PAY ON HAND'}
                      </strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span style={{ color: 'var(--color-gray-500)' }}>Est. Arrival:</span>
                      <strong>3-5 Business Days</strong>
                    </div>
                  </div>

                  {/* Actions Grid */}
                  <div className="no-print" style={{ marginTop: '24px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    <Link 
                      to="/shop" 
                      className="btn btn--primary" 
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    >
                      <ShoppingBag size={16} />
                      Continue Shopping
                    </Link>
                    
                    <Link 
                      to="/account" 
                      className="btn btn--outline" 
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}
                    >
                      <User size={16} />
                      Go to My Account
                    </Link>
                    
                    <button 
                      onClick={handlePrint}
                      className="btn btn--ghost" 
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', border: '1px solid var(--color-gray-300)' }}
                    >
                      <Printer size={16} />
                      Print Receipt
                    </button>
                  </div>
                </motion.div>

                {/* Sourcing Trust Details */}
                <motion.div 
                  className="no-print"
                  variants={itemVariants}
                  style={{
                    background: 'var(--color-gray-50)',
                    border: '1.5px solid var(--color-gray-200)',
                    borderRadius: 'var(--radius-lg)',
                    padding: '20px',
                  }}
                >
                  <h4 style={{ fontSize: '13px', fontWeight: 700, textTransform: 'uppercase', color: 'var(--color-charcoal)', marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <ShieldCheck size={16} style={{ color: 'var(--color-primary)' }} />
                    Secure Packing Pledge
                  </h4>
                  <p style={{ fontSize: '12px', color: 'var(--color-gray-600)', lineHeight: '1.5', marginBottom: '8px' }}>
                    Our Single-Origin Ayurvedic Powders are processed at Belagola Food Industrial Estate in Mysuru. Sealed securely to lock in absolute nutritional value.
                  </p>
                  <Link 
                    to="/shipping-policy" 
                    style={{ fontSize: '12px', color: 'var(--color-primary)', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                  >
                    View Shipping Policies <ArrowRight size={12} />
                  </Link>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </>
  );
}
