import { useState, useEffect, useMemo, useRef } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { 
  Heart, 
  ShoppingBag, 
  Star, 
  Check, 
  Plus, 
  Info, 
  ShieldCheck, 
  Leaf, 
  Award, 
  Truck, 
  ChevronRight, 
  MessageSquare 
} from 'lucide-react';
import useCartStore from '../store/cartStore';
import useWishlistStore from '../store/wishlistStore';
import { mockProducts, mockReviews } from '../data/mockData';
import ProductCard from '../components/common/ProductCard';
import toast from 'react-hot-toast';

export default function ProductPage() {
  const { slug } = useParams();
  const navigate = useNavigate();
  
  const { addItem } = useCartStore();
  const { toggleItem, isInWishlist } = useWishlistStore();

  // Find active product
  const product = useMemo(() => {
    return mockProducts.find((p) => p.slug === slug);
  }, [slug]);

  // States
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedVariation, setSelectedVariation] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState('ingredients');
  const [showStickyBar, setShowStickyBar] = useState(false);

  // Zoom gallery states
  const [zoomPos, setZoomPos] = useState({ x: 0, y: 0 });
  const [isZoomed, setIsZoomed] = useState(false);

  // Review states (local state for listing and submissions)
  const [localReviews, setLocalReviews] = useState([]);
  const [reviewAuthor, setReviewAuthor] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewText, setReviewText] = useState('');

  // Frequently Bought Together states
  const [fbtCheckedIds, setFbtCheckedIds] = useState([]);

  // Refs
  const reviewsSectionRef = useRef(null);

  // Setup default state values when product changes
  useEffect(() => {
    if (product) {
      setActiveImageIndex(0);
      setQuantity(1);
      setActiveTab('ingredients');
      
      // Default to first variation if any exist
      if (product.variations && product.variations.length > 0) {
        setSelectedVariation(product.variations[0]);
      } else {
        setSelectedVariation(null);
      }

      // Initialize reviews list
      const productReviews = mockReviews.filter((r) => r.product_id === product.id);
      const fallbackReviews = [
        { id: 201, product_id: product.id, reviewer: 'Anjali M.', rating: 5, review: 'Fantastic quality, feels highly therapeutic and pure. Very quick shipping too.', date: '2026-06-02', verified: true },
        { id: 202, product_id: product.id, reviewer: 'Rajesh G.', rating: 4, review: 'Very fresh and natural aroma. Sourced beautifully. Recommended.', date: '2026-05-28', verified: true }
      ];
      setLocalReviews(productReviews.length > 0 ? productReviews : fallbackReviews);

      // Reset bundle partner checkboxes (check all partners by default)
      const partners = getFbtPartners();
      setFbtCheckedIds(partners.map((p) => p.id));
    }
  }, [product]);

  // Show sticky bottom bar on scroll past buy section
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 600) {
        setShowStickyBar(true);
      } else {
        setShowStickyBar(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  if (!product) {
    return (
      <div className="container section text-center" style={{ padding: '80px 0' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-4xl)', marginBottom: '16px' }}>Product Not Found</h2>
        <p style={{ color: 'var(--color-gray-500)', marginBottom: '24px' }}>The wellness powder you are looking for does not exist or has been relocated.</p>
        <Link to="/shop" className="btn btn--primary">Return to Shop</Link>
      </div>
    );
  }

  // Get Frequently Bought Together products (up to 2 related products)
  function getFbtPartners() {
    return mockProducts.filter((p) => p.id !== product.id).slice(0, 2);
  }

  const fbtPartners = getFbtPartners();
  const isLiked = isInWishlist(product.id);

  // Calculate prices based on variation
  const currentPrice = selectedVariation ? selectedVariation.price : product.price;
  const currentSalePrice = selectedVariation ? selectedVariation.sale_price : product.sale_price;
  const displayPrice = currentSalePrice || currentPrice;
  const originalPrice = currentSalePrice ? currentPrice : (selectedVariation ? selectedVariation.regular_price : product.regular_price);
  const hasDiscount = originalPrice && parseFloat(originalPrice) > parseFloat(displayPrice);

  // Calculations for bundle price
  const bundleTotal = useMemo(() => {
    let sum = parseFloat(displayPrice);
    fbtPartners.forEach((partner) => {
      if (fbtCheckedIds.includes(partner.id)) {
        const partnerPrice = partner.sale_price || partner.price;
        sum += parseFloat(partnerPrice);
      }
    });
    return sum;
  }, [displayPrice, fbtCheckedIds, fbtPartners]);

  // Dynamic FBT partner toggle
  const handleFbtToggle = (partnerId) => {
    setFbtCheckedIds((prev) =>
      prev.includes(partnerId) ? prev.filter((id) => id !== partnerId) : [...prev, partnerId]
    );
  };

  // FBT Bundle Add to Cart
  const handleAddBundleToCart = () => {
    // 1. Add current product with variation & quantity
    addItem(product, quantity, selectedVariation);
    
    // 2. Add checked partner products
    fbtPartners.forEach((partner) => {
      if (fbtCheckedIds.includes(partner.id)) {
        const partnerVar = partner.variations && partner.variations.length > 0 ? partner.variations[0] : null;
        addItem(partner, 1, partnerVar);
      }
    });
    
    toast.success('Successfully added bundle items to cart!');
  };

  // Image Zoom hover coordinates calculation
  const handleMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setZoomPos({ x, y });
  };

  // Form submit handler for reviews
  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!reviewAuthor.trim() || !reviewText.trim()) {
      toast.error('Please fill in your name and review message.');
      return;
    }

    const newReview = {
      id: Date.now(),
      product_id: product.id,
      reviewer: reviewAuthor,
      rating: reviewRating,
      review: reviewText,
      date: new Date().toISOString().split('T')[0],
      verified: true,
    };

    setLocalReviews([newReview, ...localReviews]);
    setReviewAuthor('');
    setReviewText('');
    setReviewRating(5);
    toast.success('Thank you! Your verified review has been submitted.');
  };

  const handleAddToCart = () => {
    addItem(product, quantity, selectedVariation);
    toast.success(`${product.name} (${selectedVariation ? selectedVariation.name : 'Standard'}) added to cart!`);
  };

  const handleBuyNow = () => {
    addItem(product, quantity, selectedVariation);
    navigate('/checkout');
  };

  const handleWishlistToggle = () => {
    toggleItem(product);
    if (!isLiked) {
      toast.success(`${product.name} added to wishlist!`);
    } else {
      toast.success(`${product.name} removed from wishlist.`);
    }
  };

  // Related products filters (same category, excluding current product)
  const relatedProducts = mockProducts
    .filter((p) => p.id !== product.id && p.categories.some((cat) => product.categories.some((c) => c.id === cat.id)))
    .slice(0, 4);

  // Nutritional Table Parser helper
  const parsedNutrition = useMemo(() => {
    const raw = product.meta_data.nutritional_facts || '';
    if (!raw) return [];
    
    // Per 100g: Energy 48 kcal, Protein 0.9g...
    const parts = raw.split(':');
    const label = parts[0]?.trim() || 'Breakdown';
    const items = parts[1] ? parts[1].split(',') : raw.split(',');
    
    const formatted = items.map((item) => {
      const match = item.trim().match(/^([A-Za-z\s]+)\s+([0-9\.\s\w\μ]+)$/);
      if (match) {
        return { name: match[1].trim(), value: match[2].trim() };
      }
      return { name: item.trim(), value: '' };
    });

    return { label, formatted };
  }, [product]);

  // Reviews Stats Calculations
  const averageRating = useMemo(() => {
    if (localReviews.length === 0) return 0;
    const sum = localReviews.reduce((acc, r) => acc + r.rating, 0);
    return (sum / localReviews.length).toFixed(1);
  }, [localReviews]);

  const ratingDistribution = useMemo(() => {
    const dist = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    localReviews.forEach((r) => {
      if (dist[r.rating] !== undefined) dist[r.rating]++;
    });
    
    // Convert to percentages
    const total = localReviews.length || 1;
    Object.keys(dist).forEach((key) => {
      dist[key] = Math.round((dist[key] / total) * 100);
    });
    return dist;
  }, [localReviews]);

  const primaryImage = product.images?.[activeImageIndex]?.src || '/images/products/placeholder.jpg';
  const categoryName = product.categories?.[0]?.name || 'Wellness';

  return (
    <>
      <Helmet>
        <title>{product.name} - Pure Organic Powder | TRIDAMYA</title>
        <meta name="description" content={product.short_description} />
      </Helmet>

      {/* Breadcrumbs Header */}
      <div className="section section--sm section--cream" style={{ borderBottom: '1px solid var(--color-cream-dark)' }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb__separator">/</span>
            <Link to="/shop">Shop</Link>
            <span className="breadcrumb__separator">/</span>
            <Link to={`/shop/${product.categories?.[0]?.slug}`}>{categoryName}</Link>
            <span className="breadcrumb__separator">/</span>
            <span className="breadcrumb__current">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="section">
        <div className="container">
          
          {/* Main 2-Column Product Detail Layout */}
          <div className="product-detail-layout">
            
            {/* Left Column: Zoom Image Gallery */}
            <div className="product-gallery">
              <div 
                className={`gallery-main ${isZoomed ? 'gallery-main--zoom' : ''}`}
                onMouseEnter={() => setIsZoomed(true)}
                onMouseLeave={() => setIsZoomed(false)}
                onMouseMove={handleMouseMove}
              >
                <img 
                  src={primaryImage} 
                  alt={product.images?.[activeImageIndex]?.alt || product.name} 
                  className="gallery-main__image"
                  style={isZoomed ? { transformOrigin: `${zoomPos.x}% ${zoomPos.y}%` } : {}}
                />
                
                {/* Visual indicator of zoom on corner */}
                <div style={{ position: 'absolute', bottom: '12px', right: '12px', background: 'rgba(0,0,0,0.6)', color: '#fff', fontSize: '10px', padding: '4px 8px', borderRadius: '4px', pointerEvents: 'none', textTransform: 'uppercase', tracking: '0.05em' }}>
                  Hover to Zoom
                </div>
              </div>

              {/* Gallery Thumbnails List */}
              {product.images && product.images.length > 1 && (
                <div className="gallery-thumbs">
                  {product.images.map((img, idx) => (
                    <button
                      key={img.id}
                      onClick={() => setActiveImageIndex(idx)}
                      className={`gallery-thumb ${activeImageIndex === idx ? 'active' : ''}`}
                      aria-label={`Switch image to ${img.alt || idx}`}
                    >
                      <img src={img.src} alt={img.alt || product.name} />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Right Column: Buying controls & detail panel */}
            <div>
              {/* Product Badges */}
              <div className="product-detail__badges">
                {hasDiscount && <span className="badge badge--sale">Sale</span>}
                {product.featured && <span className="badge badge--new">Featured</span>}
                <span className="badge badge--stock">{product.stock_status === 'instock' ? 'In Stock' : 'Out of Stock'}</span>
              </div>

              <div className="product-detail__category">{categoryName}</div>
              <h1 className="product-detail__title">{product.name}</h1>

              {/* Review Anchor Rating Link */}
              <div className="product-detail__rating-row">
                <div className="rating-stars" aria-label={`Rating: ${averageRating} stars`}>
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < Math.round(averageRating) ? '#F59E0B' : 'none'} 
                      color="#F59E0B"
                    />
                  ))}
                </div>
                <button 
                  onClick={() => reviewsSectionRef.current?.scrollIntoView({ behavior: 'smooth' })}
                  style={{ color: 'var(--color-primary)', fontWeight: 600, borderBottom: '1px dashed var(--color-primary)' }}
                >
                  {averageRating} / 5.0 ({localReviews.length} Verified {localReviews.length === 1 ? 'Review' : 'Reviews'})
                </button>
              </div>

              {/* Price Row */}
              <div className="product-detail__price-row">
                <span className="product-detail__price-current">₹{displayPrice}</span>
                {hasDiscount && (
                  <span className="product-detail__price-original">₹{originalPrice}</span>
                )}
              </div>

              <p className="product-detail__desc">{product.short_description}</p>

              {/* Variations package selector (Weight swatches) */}
              {product.variations && product.variations.length > 0 && (
                <div className="product-detail__option-group">
                  <span className="option-group__label">Choose Weight:</span>
                  <div className="variation-selector">
                    {product.variations.map((v) => (
                      <button
                        key={v.id}
                        onClick={() => setSelectedVariation(v)}
                        className={`variation-btn ${selectedVariation?.id === v.id ? 'active' : ''}`}
                      >
                        {v.name} - ₹{v.sale_price || v.price}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Quantity Select and Action buttons */}
              <div className="purchase-actions">
                <div className="qty-selector">
                  <button 
                    className="qty-selector__btn" 
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    aria-label="Decrease quantity"
                  >
                    -
                  </button>
                  <span className="qty-selector__value">{quantity}</span>
                  <button 
                    className="qty-selector__btn" 
                    onClick={() => setQuantity(quantity + 1)}
                    aria-label="Increase quantity"
                  >
                    +
                  </button>
                </div>

                <button 
                  className="btn btn--primary" 
                  onClick={handleAddToCart}
                  style={{ display: 'flex', gap: '8px', justifyContent: 'center' }}
                >
                  <ShoppingBag size={18} />
                  Add to Cart
                </button>

                <button className="btn btn--secondary" onClick={handleBuyNow}>
                  Buy Now
                </button>
              </div>

              {/* Save to Wishlist Toggle Link */}
              <button 
                onClick={handleWishlistToggle}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '32px', color: isLiked ? 'var(--color-error)' : 'var(--color-gray-600)', fontSize: '14px', fontWeight: 600 }}
              >
                <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                {isLiked ? 'Saved in Wishlist' : 'Add to Wishlist'}
              </button>

              {/* Highlights section with icons */}
              {product.meta_data.highlights && (
                <div className="product-detail__highlights">
                  {product.meta_data.highlights.map((h, idx) => (
                    <div key={idx} className="highlight-item">
                      <Check size={16} className="highlight-item__bullet" />
                      <span>{h}</span>
                    </div>
                  ))}
                </div>
              )}

              {/* Trust value descriptors */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', borderTop: '1px solid var(--color-gray-100)', paddingTop: '24px' }}>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <ShieldCheck size={20} style={{ color: 'var(--color-primary)' }} />
                  <div style={{ fontSize: '13px' }}>
                    <strong style={{ display: 'block', color: 'var(--color-charcoal)' }}>100% Purity Certified</strong>
                    <span style={{ color: 'var(--color-gray-500)' }}>Every batch undergoes rigorous quality assurance for heavy metals & contaminants.</span>
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
                  <Leaf size={20} style={{ color: 'var(--color-primary)' }} />
                  <div style={{ fontSize: '13px' }}>
                    <strong style={{ display: 'block', color: 'var(--color-charcoal)' }}>Eco-Conscious Zero Additives</strong>
                    <span style={{ color: 'var(--color-gray-500)' }}>Pure whole food powder without starch fillers, colors, sugar or synthetic additives.</span>
                  </div>
                </div>
              </div>

            </div>

          </div>

          {/* Earthy Tabs Content Section */}
          <div className="product-tabs">
            <div className="tabs-header">
              <button 
                className={`tab-btn ${activeTab === 'ingredients' ? 'active' : ''}`}
                onClick={() => setActiveTab('ingredients')}
              >
                Ingredients
              </button>
              <button 
                className={`tab-btn ${activeTab === 'nutrition' ? 'active' : ''}`}
                onClick={() => setActiveTab('nutrition')}
              >
                Nutritional Profile
              </button>
              <button 
                className={`tab-btn ${activeTab === 'usage' ? 'active' : ''}`}
                onClick={() => setActiveTab('usage')}
              >
                Usage Instructions
              </button>
              <button 
                className={`tab-btn ${activeTab === 'storage' ? 'active' : ''}`}
                onClick={() => setActiveTab('storage')}
              >
                Storage & Shelf Life
              </button>
              <button 
                className={`tab-btn ${activeTab === 'origin' ? 'active' : ''}`}
                onClick={() => setActiveTab('origin')}
              >
                Origin & Values
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'ingredients' && (
                <div>
                  <h4>Botanical Ingredients</h4>
                  <p>{product.meta_data.ingredients}</p>
                  <p style={{ marginTop: '16px', fontSize: '13px', color: 'var(--color-gray-400)', fontStyle: 'italic' }}>
                    Tridamya botanicals are sourced ethically directly from local growers in Mysuru district, supporting fair-trade practices and natural wild harvesting methods.
                  </p>
                </div>
              )}

              {activeTab === 'nutrition' && (
                <div>
                  <h4>Nutritional Profile</h4>
                  {parsedNutrition.formatted && parsedNutrition.formatted.length > 0 ? (
                    <>
                      <p style={{ fontWeight: 600 }}>{parsedNutrition.label}:</p>
                      <table className="tab-table">
                        <thead>
                          <tr>
                            <th>Component</th>
                            <th>Value per Serving / Weight</th>
                          </tr>
                        </thead>
                        <tbody>
                          {parsedNutrition.formatted.map((row, idx) => (
                            <tr key={idx}>
                              <td>{row.name}</td>
                              <td>{row.value || 'Yes'}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </>
                  ) : (
                    <p>{product.meta_data.nutritional_facts}</p>
                  )}
                </div>
              )}

              {activeTab === 'usage' && (
                <div>
                  <h4>Recommended How to Use</h4>
                  <p>{product.meta_data.how_to_use}</p>
                  <div style={{ marginTop: '16px', padding: '12px', background: 'var(--color-gray-50)', borderRadius: '6px', borderLeft: '3px solid var(--color-earth)', fontSize: '13px', color: 'var(--color-gray-600)' }}>
                    <strong>Standard Serving:</strong> 1 Teaspoon (approx. 5 grams) daily, or as advised by a qualified wellness practitioner.
                  </div>
                </div>
              )}

              {activeTab === 'storage' && (
                <div>
                  <h4>Storage Guidelines</h4>
                  <p>{product.meta_data.storage}</p>
                  <h4 style={{ marginTop: '24px' }}>Shelf Life</h4>
                  <p>{product.meta_data.shelf_life}</p>
                </div>
              )}

              {activeTab === 'origin' && (
                <div>
                  <h4>Ethical Sourcing & Origin</h4>
                  <table className="tab-table">
                    <tbody>
                      <tr>
                        <th>Country of Origin</th>
                        <td>{product.meta_data.country_of_origin}</td>
                      </tr>
                      <tr>
                        <th>Harvest Region</th>
                        <td>Karnataka, Southern India</td>
                      </tr>
                      <tr>
                        <th>Processing Base</th>
                        <td>Mysuru Food Industrial Estate, Belagola</td>
                      </tr>
                      <tr>
                        <th>Purity Guarantee</th>
                        <td>Zero fillers, synthetic chemicals, pesticides, or irradiation sterilization processes.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>

          {/* Frequently Bought Together Bundle block */}
          {fbtPartners.length > 0 && (
            <div className="fbt-bundle">
              <h3 className="fbt-title">Frequently Bought Together</h3>
              <div className="fbt-layout">
                
                <div className="fbt-items">
                  {/* Current Product display item */}
                  <div className="fbt-item-card">
                    <input 
                      type="checkbox" 
                      checked={true}
                      readOnly
                      className="filter-checkbox"
                      style={{ marginRight: '8px', cursor: 'default', pointerEvents: 'none' }}
                      aria-label="Current product (required)"
                    />
                    <img 
                      src={product.images?.[0]?.src} 
                      alt={product.name} 
                      className="fbt-item-card__img"
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-primary)', fontWeight: 600 }}>This Item</div>
                      <h4 style={{ fontSize: '15px', fontWeight: 600, fontFamily: 'var(--font-body)' }}>{product.name}</h4>
                      <span style={{ fontWeight: 700 }}>₹{displayPrice}</span>
                    </div>
                  </div>

                  {/* Plus Sign */}
                  <div className="fbt-plus-sign">+</div>

                  {/* Partner products */}
                  {fbtPartners.map((partner, idx) => {
                    const checked = fbtCheckedIds.includes(partner.id);
                    const pPrice = partner.sale_price || partner.price;
                    return (
                      <div key={partner.id} style={{ display: 'contents' }}>
                        <div className="fbt-item-card" style={{ opacity: checked ? 1 : 0.6 }}>
                          <input 
                            type="checkbox" 
                            checked={checked}
                            onChange={() => handleFbtToggle(partner.id)}
                            className="filter-checkbox"
                            style={{ marginRight: '8px' }}
                            aria-label={`Include ${partner.name} in bundle`}
                          />
                          <img 
                            src={partner.images?.[0]?.src} 
                            alt={partner.name} 
                            className="fbt-item-card__img"
                          />
                          <div style={{ flex: 1, minWidth: 0 }}>
                            <div style={{ fontSize: '12px', textTransform: 'uppercase', color: 'var(--color-primary)', fontWeight: 600, visibility: 'hidden' }}>This Item</div>
                            <h4 style={{ fontSize: '15px', fontWeight: 600, fontFamily: 'var(--font-body)' }}>
                              <Link to={`/product/${partner.slug}`} style={{ hoverColor: 'var(--color-primary)' }}>{partner.name}</Link>
                            </h4>
                            <span style={{ fontWeight: 700 }}>₹{pPrice}</span>
                          </div>
                        </div>
                        {idx < fbtPartners.length - 1 && <div className="fbt-plus-sign">+</div>}
                      </div>
                    );
                  })}
                </div>

                {/* Bundle Summary Pricing Box */}
                <div className="fbt-summary-box">
                  <div className="fbt-summary-box__total-row">
                    <span className="fbt-summary-box__label">Total Bundle Price:</span>
                    <span className="fbt-summary-box__price">₹{bundleTotal}</span>
                  </div>
                  <button 
                    onClick={handleAddBundleToCart}
                    className="btn btn--primary btn--sm" 
                    style={{ width: '100%', marginTop: '12px', display: 'flex', gap: '8px', justifyContent: 'center' }}
                  >
                    <ShoppingBag size={14} />
                    Add Bundle to Cart
                  </button>
                </div>

              </div>
            </div>
          )}

          {/* Reviews Rating Breakdown Dashboard & Verified Reviews */}
          <div className="reviews-container" ref={reviewsSectionRef}>
            <h3 className="reviews-header">Verified Customer Reviews</h3>
            
            <div className="reviews-dashboard">
              
              {/* Score panel */}
              <div className="reviews-dashboard__score">
                <span className="reviews-dashboard__score-big">{averageRating}</span>
                <span style={{ fontSize: '14px', color: 'var(--color-gray-500)', fontWeight: 600 }}>out of 5.0</span>
                <div className="rating-stars" style={{ margin: '8px 0' }}>
                  {[...Array(5)].map((_, i) => (
                    <Star 
                      key={i} 
                      size={16} 
                      fill={i < Math.round(averageRating) ? '#F59E0B' : 'none'} 
                      color="#F59E0B"
                    />
                  ))}
                </div>
                <span style={{ fontSize: '12px', color: 'var(--color-gray-400)' }}>Based on {localReviews.length} reviews</span>
              </div>

              {/* Bars chart */}
              <div className="reviews-dashboard__breakdown">
                {[5, 4, 3, 2, 1].map((stars) => (
                  <div key={stars} className="rating-row">
                    <span style={{ width: '12px' }}>{stars}</span>
                    <Star size={12} fill="#F59E0B" color="#F59E0B" />
                    <div className="rating-bar-bg">
                      <div className="rating-bar-fill" style={{ width: `${ratingDistribution[stars]}%` }}></div>
                    </div>
                    <span style={{ width: '32px', textAlign: 'right' }}>{ratingDistribution[stars]}%</span>
                  </div>
                ))}
              </div>

              {/* Review call to action */}
              <div className="reviews-dashboard__cta">
                <MessageSquare size={32} style={{ color: 'var(--color-sage-dark)', marginBottom: '12px' }} />
                <h4 style={{ fontSize: '16px', fontWeight: 600, marginBottom: '4px' }}>Have you used this product?</h4>
                <p style={{ fontSize: '12px', color: 'var(--color-gray-400)', marginBottom: '16px' }}>Share your feedback and purity experience with the Tridamya community.</p>
                <button 
                  onClick={() => {
                    const formElem = document.getElementById('review-submission-form');
                    formElem?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="btn btn--outline btn--sm"
                >
                  Write a Review
                </button>
              </div>

            </div>

            {/* List of Reviews */}
            <div className="reviews-list">
              {localReviews.map((rev) => (
                <div key={rev.id} className="review-item">
                  <div className="review-item__meta">
                    <div>
                      <div className="review-item__author-row">
                        <span className="review-item__author">{rev.reviewer}</span>
                        {rev.verified && (
                          <span className="verified-badge">
                            Verified Purchase
                          </span>
                        )}
                      </div>
                      <div className="rating-stars" style={{ marginTop: '4px' }}>
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            size={12} 
                            fill={i < rev.rating ? '#F59E0B' : 'none'} 
                            color="#F59E0B"
                          />
                        ))}
                      </div>
                    </div>
                    <span className="review-item__date">{rev.date}</span>
                  </div>
                  <p className="review-item__text">"{rev.review}"</p>
                </div>
              ))}
            </div>

            {/* Review Submission Form */}
            <div className="review-form-container" id="review-submission-form">
              <h4 className="review-form-title">Write a Verified Review</h4>
              <form onSubmit={handleReviewSubmit}>
                
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
                  <div className="input-group">
                    <label htmlFor="reviewer-name">Your Full Name</label>
                    <input
                      type="text"
                      id="reviewer-name"
                      className="input"
                      placeholder="e.g. Priyan Sharma"
                      value={reviewAuthor}
                      onChange={(e) => setReviewAuthor(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label>Product Rating (Stars)</label>
                    <div className="star-rating-input" style={{ marginTop: '10px' }}>
                      {[1, 2, 3, 4, 5].map((star) => (
                        <button
                          key={star}
                          type="button"
                          className={`star-rating-input__btn ${reviewRating >= star ? 'active' : ''}`}
                          onClick={() => setReviewRating(star)}
                          aria-label={`Rate ${star} star`}
                        >
                          <Star size={24} fill={reviewRating >= star ? '#F59E0B' : 'none'} />
                        </button>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="input-group" style={{ marginBottom: '20px' }}>
                  <label htmlFor="review-content">Your Review Message</label>
                  <textarea
                    id="review-content"
                    className="input textarea"
                    placeholder="Tell us about the purity, taste, texture, packing, and overall wellness benefits you experienced."
                    value={reviewText}
                    onChange={(e) => setReviewText(e.target.value)}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn--primary">
                  Submit Verified Review
                </button>
              </form>
            </div>

          </div>

          {/* Related Products Section */}
          {relatedProducts.length > 0 && (
            <div style={{ marginTop: '80px', borderTop: '1px solid var(--color-gray-200)', paddingTop: '60px' }}>
              <div className="section-header">
                <span className="section-header__decorative">Complete Your Wellness Routine</span>
                <h3 className="section-header__title">Related Products</h3>
                <div className="section-header__divider"></div>
              </div>
              <div className="product-grid" style={{ marginTop: '30px' }}>
                {relatedProducts.map((p) => (
                  <ProductCard key={p.id} product={p} />
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Sticky Bottom Add to Cart Bar */}
      <div className={`sticky-product-bar ${showStickyBar ? 'visible' : ''}`}>
        <div className="sticky-product-bar__info">
          <img 
            src={product.images?.[0]?.src} 
            alt={product.name} 
            style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px', backgroundColor: 'var(--color-cream-dark)' }} 
          />
          <div>
            <div className="sticky-product-bar__name">{product.name}</div>
            <div className="sticky-product-bar__price">
              ₹{displayPrice}
              {selectedVariation && (
                <span style={{ fontSize: '11px', color: 'var(--color-gray-500)', fontWeight: 500, marginLeft: '8px' }}>
                  ({selectedVariation.name})
                </span>
              )}
            </div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {/* Quantity visual indicator */}
          <span style={{ fontSize: '12px', color: 'var(--color-gray-500)', fontWeight: 600, display: 'none' }}>
            Qty: {quantity}
          </span>
          <button 
            className="btn btn--primary btn--sm" 
            onClick={handleAddToCart}
            style={{ display: 'flex', gap: '6px', padding: '10px 20px' }}
          >
            <ShoppingBag size={14} />
            Quick Add
          </button>
        </div>
      </div>
    </>
  );
}
