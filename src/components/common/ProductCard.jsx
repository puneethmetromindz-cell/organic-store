import { Link } from 'react-router-dom';
import { Heart, ShoppingBag, Eye } from 'lucide-react';
import useCartStore from '../../store/cartStore';
import useWishlistStore from '../../store/wishlistStore';
import toast from 'react-hot-toast';

export default function ProductCard({ product }) {
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  const isLiked = isInWishlist(product.id);

  const handleWishlistToggle = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleItem(product);
    if (!isLiked) {
      toast.success(`${product.name} added to wishlist!`);
    } else {
      toast.success(`${product.name} removed from wishlist.`);
    }
  };

  const handleQuickAdd = (e) => {
    e.preventDefault();
    e.stopPropagation();
    
    // Use the first variation as the default if variations exist
    const defaultVariation = product.variations && product.variations.length > 0 
      ? product.variations[0] 
      : null;

    addItem(product, 1, defaultVariation);
    toast.success(`${product.name} ${defaultVariation ? `(${defaultVariation.name})` : ''} added to cart!`);
  };

  const primaryImage = product.images?.[0]?.src || '/images/products/placeholder.jpg';
  const categoryName = product.categories?.[0]?.name || 'Wellness';
  const displayPrice = product.sale_price || product.price;
  const originalPrice = product.regular_price || null;
  const hasDiscount = originalPrice && parseFloat(originalPrice) > parseFloat(displayPrice);

  return (
    <div className="product-card" id={`product-${product.id}`}>
      {/* Product Image and Badges */}
      <div className="product-card__image-wrap">
        <Link to={`/product/${product.slug}`} style={{ display: 'block', height: '100%' }}>
          <img
            src={primaryImage}
            alt={product.images?.[0]?.alt || product.name}
            className="product-card__image"
            loading="lazy"
          />
        </Link>

        {/* Badges (New, Sale, etc.) */}
        <div className="product-card__badges">
          {hasDiscount && <span className="badge badge--sale">Sale</span>}
          {product.featured && <span className="badge badge--new">Featured</span>}
        </div>

        {/* Floating Actions on Hover */}
        <div className="product-card__actions">
          <button
            className={`product-card__action-btn ${isLiked ? 'active' : ''}`}
            onClick={handleWishlistToggle}
            aria-label={isLiked ? 'Remove from Wishlist' : 'Add to Wishlist'}
          >
            <Heart size={16} fill={isLiked ? '#fff' : 'none'} />
          </button>
          <Link
            to={`/product/${product.slug}`}
            className="product-card__action-btn"
            aria-label="View Details"
          >
            <Eye size={16} />
          </Link>
        </div>

        {/* Slide up Quick Add Overlay */}
        <div className="product-card__quick-add">
          <button
            className="btn btn--primary btn--sm"
            onClick={handleQuickAdd}
            style={{ width: '100%', display: 'flex', gap: '8px' }}
          >
            <ShoppingBag size={14} />
            Quick Add
          </button>
        </div>
      </div>

      {/* Product Info */}
      <div className="product-card__info">
        <div className="product-card__category">{categoryName}</div>
        <h4 className="product-card__name">
          <Link to={`/product/${product.slug}`}>{product.name}</Link>
        </h4>
        <div className="product-card__price">
          <span className="product-card__price-current">₹{displayPrice}</span>
          {hasDiscount && (
            <span className="product-card__price-original">₹{originalPrice}</span>
          )}
        </div>
        {product.variations && product.variations.length > 0 && (
          <div className="product-card__weight">
            Available in: {product.variations.map((v) => v.name).join(', ')}
          </div>
        )}
      </div>
    </div>
  );
}
