import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import useWishlistStore from '../store/wishlistStore';
import useCartStore from '../store/cartStore';
import { mockProducts } from '../data/mockData';
import toast from 'react-hot-toast';

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const { addItem } = useCartStore();

  const handleMoveToCart = (item) => {
    // Find the full product object to check variations
    const fullProduct = mockProducts.find((p) => p.id === item.id);
    
    // Choose the first variation as default if available
    const defaultVariation = fullProduct && fullProduct.variations && fullProduct.variations.length > 0
      ? fullProduct.variations[0]
      : null;

    addItem(fullProduct || item, 1, defaultVariation);
    removeItem(item.id);
    toast.success(`${item.name} moved to cart!`);
  };

  const handleRemove = (id, name) => {
    removeItem(id);
    toast.success(`${name} removed from wishlist.`);
  };

  return (
    <>
      <Helmet>
        <title>My Wishlist | TRIDAMYA Organic Store</title>
        <meta name="description" content="View and manage your saved organic wellness powders. Move items to the cart or refine your daily wellness routine." />
      </Helmet>

      {/* Page Header */}
      <div className="section section--sm section--cream" style={{ borderBottom: '1px solid var(--color-cream-dark)' }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb__separator">/</span>
            <span className="breadcrumb__current">Wishlist</span>
          </nav>
          
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', gap: '16px' }}>
            <div>
              <span className="section-header__eyebrow" style={{ textAlign: 'left', marginBottom: '8px' }}>Your Saved Favorites</span>
              <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-5xl)' }}>My Wishlist</h1>
            </div>
            {items.length > 0 && (
              <button 
                onClick={clearWishlist}
                className="btn btn--ghost" 
                style={{ color: 'var(--color-error)', textTransform: 'uppercase', fontSize: 'var(--text-xs)', fontWeight: 600, display: 'flex', gap: '6px', alignItems: 'center' }}
              >
                <Trash2 size={14} />
                Clear All Favorites
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Main Grid Content */}
      <div className="section">
        <div className="container">
          {items.length > 0 ? (
            <div className="product-grid">
              {items.map((item) => {
                const displayPrice = item.salePrice || item.price;
                const originalPrice = item.salePrice ? item.price : null;
                const hasDiscount = originalPrice && parseFloat(originalPrice) > parseFloat(displayPrice);

                return (
                  <div key={item.id} className="product-card" id={`wishlist-item-${item.id}`}>
                    
                    {/* Image wrap */}
                    <div className="product-card__image-wrap">
                      <Link to={`/product/${item.slug}`} style={{ display: 'block', height: '100%' }}>
                        <img 
                          src={item.image || '/images/products/placeholder.jpg'} 
                          alt={item.name} 
                          className="product-card__image"
                          loading="lazy"
                        />
                      </Link>

                      {/* Remove Button Overlay */}
                      <div className="product-card__badges" style={{ left: 'auto', right: '12px' }}>
                        <button
                          onClick={() => handleRemove(item.id, item.name)}
                          className="product-card__action-btn"
                          style={{ backgroundColor: 'var(--color-white)', color: 'var(--color-error)' }}
                          aria-label={`Remove ${item.name} from wishlist`}
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>

                    {/* Info */}
                    <div className="product-card__info">
                      <div className="product-card__category">{item.category || 'Wellness'}</div>
                      <h4 className="product-card__name">
                        <Link to={`/product/${item.slug}`}>{item.name}</Link>
                      </h4>
                      
                      <div className="product-card__price" style={{ marginBottom: '16px' }}>
                        <span className="product-card__price-current">₹{displayPrice}</span>
                        {hasDiscount && (
                          <span className="product-card__price-original">₹{originalPrice}</span>
                        )}
                      </div>

                      {/* Wishlist actions */}
                      <div style={{ display: 'flex', gap: '10px' }}>
                        <button
                          onClick={() => handleMoveToCart(item)}
                          className="btn btn--primary btn--sm"
                          style={{ flex: 1, display: 'flex', gap: '6px', justifyContent: 'center' }}
                        >
                          <ShoppingBag size={14} />
                          Move to Cart
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
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
              <Heart size={48} style={{ color: 'var(--color-sage-dark)', marginBottom: '16px' }} />
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-3xl)', marginBottom: '8px' }}>
                Your Wishlist is Empty
              </h3>
              <p style={{ color: 'var(--color-gray-500)', marginBottom: '24px', lineHeight: '1.6' }}>
                Nourish your body and explore the Tridamya collections. Tap the heart icons on products to add items here.
              </p>
              <Link to="/shop" className="btn btn--primary" style={{ display: 'inline-flex', gap: '8px' }}>
                Explore Products
                <ArrowRight size={16} />
              </Link>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
