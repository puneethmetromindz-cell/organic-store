import { Link } from 'react-router-dom';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import useCartStore from '../../store/cartStore';
import useUIStore from '../../store/uiStore';

export default function CartDrawer() {
  const { items, removeItem, updateQuantity, getSubtotal } = useCartStore();
  const { isCartOpen, closeCart } = useUIStore();

  const subtotal = getSubtotal();

  const handleClose = () => {
    closeCart();
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`overlay ${isCartOpen ? 'active' : ''}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* Cart Drawer */}
      <div
        className={`cart-drawer ${isCartOpen ? 'open' : ''}`}
        id="cart-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Shopping Cart"
      >
        <div className="cart-drawer__header">
          <h3 className="cart-drawer__title">
            Shopping Cart
            <span className="cart-drawer__count">
              ({items.reduce((sum, item) => sum + item.quantity, 0)})
            </span>
          </h3>
          <button
            className="btn--icon"
            onClick={handleClose}
            aria-label="Close cart"
            style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={22} />
          </button>
        </div>

        <div className="cart-drawer__items">
          {items.length === 0 ? (
            <div className="cart-drawer__empty">
              <ShoppingBag size={48} className="cart-drawer__empty-icon" />
              <p>Your cart is empty</p>
              <Link to="/shop" className="btn btn--primary btn--sm" onClick={handleClose} style={{ marginTop: '16px' }}>
                Shop Our Powders
              </Link>
            </div>
          ) : (
            items.map((item) => (
              <div key={`${item.id}-${item.variation?.id || 'default'}`} className="cart-item">
                <div className="cart-item__image">
                  <img src={item.image} alt={item.name} />
                </div>
                <div className="cart-item__details">
                  <h4 className="cart-item__name">
                    <Link to={`/product/${item.slug}`} onClick={handleClose}>
                      {item.name}
                    </Link>
                  </h4>
                  {item.variation && (
                    <div className="cart-item__variant">
                      Size: {item.variation.weight}
                    </div>
                  )}
                  <div className="cart-item__bottom">
                    <div className="qty-selector">
                      <button
                        className="qty-selector__btn"
                        onClick={() => updateQuantity(item.id, item.variation?.id, item.quantity - 1)}
                        aria-label="Decrease quantity"
                      >
                        <Minus size={14} />
                      </button>
                      <span className="qty-selector__value" aria-label="Quantity">
                        {item.quantity}
                      </span>
                      <button
                        className="qty-selector__btn"
                        onClick={() => updateQuantity(item.id, item.variation?.id, item.quantity + 1)}
                        aria-label="Increase quantity"
                      >
                        <Plus size={14} />
                      </button>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="cart-item__price">
                        ₹{(parseFloat(item.salePrice || item.price) * item.quantity).toFixed(0)}
                      </span>
                      <button
                        className="cart-item__remove"
                        onClick={() => removeItem(item.id, item.variation?.id)}
                        aria-label="Remove item"
                        style={{ display: 'flex', alignItems: 'center' }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-drawer__footer">
            <div className="cart-drawer__subtotal">
              <span className="cart-drawer__subtotal-label">Subtotal</span>
              <span className="cart-drawer__subtotal-value">₹{subtotal.toFixed(0)}</span>
            </div>
            <div className="cart-drawer__actions">
              <Link to="/cart" className="btn btn--outline" onClick={handleClose} style={{ width: '100%', textAlign: 'center' }}>
                View Cart
              </Link>
              <Link to="/checkout" className="btn btn--primary" onClick={handleClose} style={{ width: '100%', textAlign: 'center' }}>
                Checkout
              </Link>
            </div>
          </div>
        )}
      </div>
    </>
  );
}
