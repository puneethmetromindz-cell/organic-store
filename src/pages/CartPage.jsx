import { Helmet } from 'react-helmet-async';
import { Link, useNavigate } from 'react-router-dom';
import { Trash2, ShoppingBag, ArrowRight, ArrowLeft } from 'lucide-react';
import useCartStore from '../store/cartStore';

export default function CartPage() {
  const { items, updateQuantity, removeItem, getSubtotal, getItemCount } = useCartStore();
  const navigate = useNavigate();

  const subtotal = getSubtotal();
  const itemCount = getItemCount();
  const shippingFee = 0; // Free shipping in Karnataka
  const totalAmount = subtotal + shippingFee;

  const handleQuantityChange = (itemId, variationId, currentQty, amount) => {
    const newQty = currentQty + amount;
    if (newQty >= 1) {
      updateQuantity(itemId, variationId, newQty);
    }
  };

  const handleCheckoutRedirect = () => {
    navigate('/checkout');
  };

  return (
    <>
      <Helmet>
        <title>Shopping Cart | TRIDAMYA Organic Store</title>
        <meta name="description" content="View and manage the organic wellness powders in your shopping cart. Review details, adjust quantities, and proceed to secure checkout." />
      </Helmet>

      {/* Breadcrumb Page Header */}
      <div className="section section--sm section--cream" style={{ borderBottom: '1px solid var(--color-cream-dark)' }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb__separator">/</span>
            <span className="breadcrumb__current">Shopping Cart</span>
          </nav>
          
          <div style={{ marginTop: '16px' }}>
            <span className="section-header__eyebrow" style={{ textAlign: 'left', marginBottom: '8px' }}>Your Cart Summary</span>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-5xl)' }}>
              Shopping Cart ({itemCount} {itemCount === 1 ? 'item' : 'items'})
            </h1>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="container">
          {items.length > 0 ? (
            <div className="cart-page-layout">
              
              {/* Left Column: Cart Items List */}
              <div style={{ overflowX: 'auto' }}>
                <table className="cart-table" aria-label="Shopping Cart Items">
                  <thead>
                    <tr>
                      <th scope="col">Product</th>
                      <th scope="col" style={{ width: '120px', textAlign: 'center' }}>Quantity</th>
                      <th scope="col" style={{ width: '100px', textAlign: 'right' }}>Total</th>
                      <th scope="col" style={{ width: '60px', textAlign: 'center' }}></th>
                    </tr>
                  </thead>
                  <tbody>
                    {items.map((item) => {
                      const price = item.salePrice || item.price;
                      const itemSubtotal = parseFloat(price) * item.quantity;
                      const variationId = item.variation?.id || null;

                      return (
                        <tr key={`${item.id}-${variationId || 'std'}`}>
                          <td>
                            <div className="cart-item-detail">
                              <img 
                                src={item.image || '/images/products/placeholder.jpg'} 
                                alt={item.name} 
                                className="cart-item-detail__img"
                              />
                              <div>
                                <h3 className="cart-item-detail__name">
                                  <Link to={`/product/${item.slug}`}>{item.name}</Link>
                                </h3>
                                {item.variation && (
                                  <div className="cart-item-detail__variation">
                                    Size: <strong>{item.variation.name}</strong>
                                  </div>
                                )}
                                <div style={{ fontSize: '13px', color: 'var(--color-gray-500)', marginTop: '4px' }}>
                                  ₹{price} each
                                </div>
                              </div>
                            </div>
                          </td>

                          <td style={{ textAlign: 'center' }}>
                            <div className="qty-selector" style={{ display: 'inline-flex' }}>
                              <button 
                                className="qty-selector__btn"
                                onClick={() => handleQuantityChange(item.id, variationId, item.quantity, -1)}
                                aria-label={`Decrease quantity of ${item.name}`}
                              >
                                -
                              </button>
                              <span className="qty-selector__value" aria-label="quantity">{item.quantity}</span>
                              <button 
                                className="qty-selector__btn"
                                onClick={() => handleQuantityChange(item.id, variationId, item.quantity, 1)}
                                aria-label={`Increase quantity of ${item.name}`}
                              >
                                +
                              </button>
                            </div>
                          </td>

                          <td style={{ textAlign: 'right', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                            ₹{itemSubtotal}
                          </td>

                          <td style={{ textAlign: 'center' }}>
                            <button
                              onClick={() => removeItem(item.id, variationId)}
                              style={{ color: 'var(--color-gray-400)', hoverColor: 'var(--color-error)' }}
                              className="btn--icon"
                              aria-label={`Remove ${item.name} from cart`}
                            >
                              <Trash2 size={16} />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                {/* Back to Shop Option */}
                <div style={{ marginTop: '24px' }}>
                  <Link to="/shop" className="btn btn--outline btn--sm" style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
                    <ArrowLeft size={14} />
                    Continue Shopping
                  </Link>
                </div>
              </div>

              {/* Right Column: Order Summary Card */}
              <aside className="summary-card">
                <h2 className="summary-card__title">Order Summary</h2>
                
                <div className="summary-row">
                  <span>Subtotal</span>
                  <span style={{ fontWeight: 600, color: 'var(--color-charcoal)' }}>₹{subtotal}</span>
                </div>

                <div className="summary-row">
                  <span>Shipping</span>
                  <span style={{ color: 'var(--color-success)', fontWeight: 600 }}>FREE</span>
                </div>

                <div style={{ fontSize: '11px', color: 'var(--color-gray-500)', borderBottom: '1px solid var(--color-gray-200)', paddingBottom: '12px', marginBottom: '12px' }}>
                  *Enjoy free delivery across Karnataka as part of our direct farm promotion!
                </div>

                <div className="summary-row summary-row--total">
                  <span>Total</span>
                  <span>₹{totalAmount}</span>
                </div>

                <div style={{ marginTop: '24px' }}>
                  <button 
                    onClick={handleCheckoutRedirect}
                    className="btn btn--primary" 
                    style={{ width: '100%', display: 'flex', gap: '8px', justifyContent: 'center' }}
                  >
                    Proceed to Checkout
                    <ArrowRight size={16} />
                  </button>
                </div>

                {/* Secure checkout info */}
                <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '12px', color: 'var(--color-gray-400)' }}>
                  🔒 Secure transaction. Tax included.
                </div>
              </aside>

            </div>
          ) : (
            <div 
              style={{
                textAlign: 'center',
                padding: '80px 24px',
                background: 'var(--color-gray-50)',
                border: '1.5px dashed var(--color-gray-200)',
                borderRadius: 'var(--radius-lg)',
                maxWidth: '600px',
                margin: '0 auto',
              }}
            >
              <ShoppingBag size={48} style={{ color: 'var(--color-gray-300)', marginBottom: '16px' }} />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-3xl)', marginBottom: '8px' }}>
                Your Cart is Empty
              </h3>
              <p style={{ color: 'var(--color-gray-500)', marginBottom: '24px', lineHeight: '1.6' }}>
                You haven't added any products to your shopping cart yet. Discover our pure wellness powders and begin your health journey.
              </p>
              <Link to="/shop" className="btn btn--primary" style={{ display: 'inline-flex', gap: '8px' }}>
                Shop Our Powders
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
