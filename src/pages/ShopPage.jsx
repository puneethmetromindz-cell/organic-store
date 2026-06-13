import { useState, useEffect, useMemo } from 'react';
import { useParams, useSearchParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { SlidersHorizontal, Search, RotateCcw, X, Grid } from 'lucide-react';
import { mockProducts, mockCategories } from '../data/mockData';
import ProductCard from '../components/common/ProductCard';

export default function ShopPage() {
  const { category: routeCategory } = useParams();
  const [searchParams, setSearchParams] = useSearchParams();

  // Local state for UI toggles
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  // Filters read from URL search params or defaults
  const activeCategory = routeCategory || searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('search') || '';
  const minPrice = parseInt(searchParams.get('minPrice') || '0', 10);
  const maxPrice = parseInt(searchParams.get('maxPrice') || '600', 10);
  const inStockOnly = searchParams.get('inStock') === 'true';
  const sortBy = searchParams.get('sort') || 'featured';

  // Pagination local state
  const [visibleCount, setVisibleCount] = useState(3); // Default limit, set to 3 to show Load More for our 4 mock products

  // Reset pagination on filter change
  useEffect(() => {
    setVisibleCount(3);
  }, [activeCategory, searchQuery, minPrice, maxPrice, inStockOnly, sortBy]);

  // Sync route param with search param when category is loaded from route
  useEffect(() => {
    if (routeCategory) {
      // Clear category param if it's in the route to keep URL clean
      if (searchParams.get('category')) {
        const newParams = new URLSearchParams(searchParams);
        newParams.delete('category');
        setSearchParams(newParams, { replace: true });
      }
    }
  }, [routeCategory, searchParams, setSearchParams]);

  // Handler for setting URL params
  const updateFilters = (updates) => {
    const newParams = new URLSearchParams(searchParams);
    
    // Reset pagination context visually
    Object.keys(updates).forEach((key) => {
      const val = updates[key];
      if (val === null || val === undefined || val === '' || val === 'all' || val === false) {
        newParams.delete(key);
      } else {
        newParams.set(key, val.toString());
      }
    });

    setSearchParams(newParams);
  };

  // Reset all filters
  const handleResetFilters = () => {
    setSearchParams(new URLSearchParams());
    // Also navigate to main shop if on a category route
    if (routeCategory) {
      window.history.pushState(null, '', '/shop');
      // Force trigger page update
      updateFilters({ category: 'all' });
    }
  };

  // Calculate product counts per category dynamically
  const categoryCounts = useMemo(() => {
    const counts = { all: mockProducts.length };
    mockCategories.forEach((cat) => {
      counts[cat.slug] = mockProducts.filter((product) =>
        product.categories.some((c) => c.slug === cat.slug)
      ).length;
    });
    return counts;
  }, []);

  // Filter and Sort Products logic
  const filteredProducts = useMemo(() => {
    return mockProducts
      .filter((product) => {
        // Category Filter
        if (activeCategory !== 'all' && !product.categories.some((c) => c.slug === activeCategory)) {
          return false;
        }

        // Price Filter
        const productPrice = parseFloat(product.sale_price || product.price);
        if (productPrice < minPrice || productPrice > maxPrice) {
          return false;
        }

        // Stock Availability Filter
        if (inStockOnly && product.stock_status !== 'instock') {
          return false;
        }

        // Search Filter
        if (searchQuery.trim() !== '') {
          const q = searchQuery.toLowerCase();
          const matchesName = product.name.toLowerCase().includes(q);
          const matchesDesc = product.description.toLowerCase().includes(q);
          const matchesShortDesc = product.short_description.toLowerCase().includes(q);
          const matchesCategory = product.categories.some((c) => c.name.toLowerCase().includes(q));
          const matchesTags = product.tags.some((t) => t.name.toLowerCase().includes(q));
          
          if (!matchesName && !matchesDesc && !matchesShortDesc && !matchesCategory && !matchesTags) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        // Sorting logic
        const priceA = parseFloat(a.sale_price || a.price);
        const priceB = parseFloat(b.sale_price || b.price);

        if (sortBy === 'price-low') {
          return priceA - priceB;
        }
        if (sortBy === 'price-high') {
          return priceB - priceA;
        }
        if (sortBy === 'rating') {
          return parseFloat(b.average_rating) - parseFloat(a.average_rating);
        }
        // Default: featured/id
        return a.id - b.id;
      });
  }, [activeCategory, searchQuery, minPrice, maxPrice, inStockOnly, sortBy]);

  // Paginated list
  const paginatedProducts = useMemo(() => {
    return filteredProducts.slice(0, visibleCount);
  }, [filteredProducts, visibleCount]);

  const activeCategoryObject = mockCategories.find((c) => c.slug === activeCategory);
  const pageTitle = activeCategoryObject ? `${activeCategoryObject.name} | TRIDAMYA Shop` : 'Shop Organic Powders | TRIDAMYA';

  return (
    <>
      <Helmet>
        <title>{pageTitle}</title>
        <meta
          name="description"
          content={
            activeCategoryObject
              ? activeCategoryObject.description
              : "Shop the range of 100% natural, chemical-free, traditional organic wellness powders sourced from Mysuru, Karnataka."
          }
        />
      </Helmet>

      {/* Breadcrumb Header Section */}
      <div className="section section--sm section--cream" style={{ borderBottom: '1px solid var(--color-cream-dark)' }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb__separator">/</span>
            {activeCategory !== 'all' ? (
              <>
                <Link to="/shop">Shop</Link>
                <span className="breadcrumb__separator">/</span>
                <span className="breadcrumb__current">{activeCategoryObject?.name}</span>
              </>
            ) : (
              <span className="breadcrumb__current">Shop</span>
            )}
          </nav>
          
          <div style={{ marginTop: '16px' }}>
            <span className="section-header__eyebrow" style={{ textAlign: 'left', marginBottom: '8px' }}>
              Tridamya Collection
            </span>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-5xl)' }}>
              {activeCategoryObject ? activeCategoryObject.name : 'Shop All Products'}
            </h1>
            <p style={{ marginTop: '8px', color: 'var(--color-gray-500)', maxWidth: '600px', fontSize: 'var(--text-sm)' }}>
              {activeCategoryObject 
                ? activeCategoryObject.description 
                : 'Ancient formulations meeting modern purity. Hand-selected organic botanicals ground to preserve vital trace minerals and enzymes.'}
            </p>
          </div>
        </div>
      </div>

      {/* Shop Layout Content */}
      <div className="section">
        <div className="container">
          
          {/* Mobile Filter Toggle Button */}
          <div style={{ marginBottom: '16px' }}>
            <button
              onClick={() => setIsMobileSidebarOpen(!isMobileSidebarOpen)}
              className="btn btn--outline mobile-filter-toggle"
              aria-label="Toggle Filters Sidebar"
            >
              <SlidersHorizontal size={16} />
              {isMobileSidebarOpen ? 'Close Filters' : 'Filters & Options'}
            </button>
          </div>

          <div className="shop-layout">
            
            {/* Filters Sidebar (Collapsible on Mobile) */}
            <aside className={`shop-sidebar ${isMobileSidebarOpen ? 'active' : ''}`}>
              <div className="shop-sidebar__title-row">
                <h3 className="shop-sidebar__title">Filters</h3>
                {(activeCategory !== 'all' || searchQuery || minPrice > 0 || maxPrice < 600 || inStockOnly) && (
                  <button onClick={handleResetFilters} className="shop-sidebar__clear-btn" style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <RotateCcw size={12} />
                    Clear
                  </button>
                )}
              </div>

              {/* Categories Filter Group */}
              <div className="filter-group">
                <h4 className="filter-group__title">Categories</h4>
                <div className="filter-list">
                  <button
                    onClick={() => {
                      if (routeCategory) {
                        window.history.pushState(null, '', '/shop');
                      }
                      updateFilters({ category: 'all' });
                    }}
                    className={`filter-list__item ${activeCategory === 'all' ? 'active' : ''}`}
                    style={{ width: '100%', textAlign: 'left' }}
                  >
                    <span>All Products</span>
                    <span className="filter-list__count">{categoryCounts.all}</span>
                  </button>
                  {mockCategories.map((cat) => (
                    <button
                      key={cat.id}
                      onClick={() => {
                        if (routeCategory) {
                          window.history.pushState(null, '', `/shop/${cat.slug}`);
                          // Update active category local context via search params trick
                          updateFilters({ category: cat.slug });
                        } else {
                          updateFilters({ category: cat.slug });
                        }
                      }}
                      className={`filter-list__item ${activeCategory === cat.slug ? 'active' : ''}`}
                      style={{ width: '100%', textAlign: 'left' }}
                    >
                      <span>{cat.name}</span>
                      <span className="filter-list__count">{categoryCounts[cat.slug]}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Price Filter Group */}
              <div className="filter-group">
                <h4 className="filter-group__title">Price Range</h4>
                <div style={{ padding: '0 4px' }}>
                  <input
                    type="range"
                    min="0"
                    max="600"
                    step="50"
                    value={maxPrice}
                    onChange={(e) => updateFilters({ maxPrice: e.target.value })}
                    style={{ width: '100%', accentColor: 'var(--color-primary)' }}
                    aria-label="Max Price Filter"
                  />
                  <div className="price-range-inputs">
                    <div>
                      <span style={{ display: 'block', fontSize: '9px', textTransform: 'uppercase', color: 'var(--color-gray-400)' }}>Min</span>
                      <input
                        type="number"
                        value={minPrice}
                        onChange={(e) => updateFilters({ minPrice: e.target.value })}
                        placeholder="Min Price"
                        aria-label="Minimum price filter value"
                      />
                    </div>
                    <span>to</span>
                    <div>
                      <span style={{ display: 'block', fontSize: '9px', textTransform: 'uppercase', color: 'var(--color-gray-400)' }}>Max</span>
                      <input
                        type="number"
                        value={maxPrice}
                        onChange={(e) => updateFilters({ maxPrice: e.target.value })}
                        placeholder="Max Price"
                        aria-label="Maximum price filter value"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Availability Filter Group */}
              <div className="filter-group">
                <h4 className="filter-group__title">Availability</h4>
                <label className="filter-checkbox-label">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => updateFilters({ inStock: e.target.checked })}
                    className="filter-checkbox"
                  />
                  <span>In Stock Only</span>
                </label>
              </div>

              {/* Trust Value Summary on sidebar */}
              <div style={{ marginTop: '32px', borderTop: '1px dashed var(--color-gray-200)', paddingTop: '24px' }}>
                <h4 className="filter-group__title" style={{ fontSize: '11px', color: 'var(--color-primary)' }}>Tridamya Promise</h4>
                <p style={{ fontSize: '11px', color: 'var(--color-gray-500)', lineHeight: '1.4' }}>
                  ✓ 100% Organically Farmed<br />
                  ✓ Zero Preservatives & Fillers<br />
                  ✓ Mysuru, Karnataka Certified
                </p>
              </div>
            </aside>

            {/* Main Products catalog column */}
            <div>
              {/* Shop Controls Top Bar */}
              <div className="shop-controls">
                
                {/* Search query input on Shop page */}
                <div className="shop-controls__search">
                  <Search size={16} className="shop-controls__search-icon" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => updateFilters({ search: e.target.value })}
                    placeholder="Search in this collection..."
                    className="shop-controls__search-input"
                    aria-label="Filter by keyword"
                  />
                  {searchQuery && (
                    <button
                      onClick={() => updateFilters({ search: '' })}
                      style={{ position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)', color: 'var(--color-gray-400)' }}
                      aria-label="Clear Search Input"
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>

                <div className="shop-controls__meta">
                  <span className="shop-controls__count">
                    Showing {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'}
                  </span>
                  <div className="shop-controls__sort">
                    <span className="shop-controls__sort-label">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => updateFilters({ sort: e.target.value })}
                      className="shop-controls__sort-select"
                      aria-label="Sort products"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Top Rated</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Product Grid Render */}
              {paginatedProducts.length > 0 ? (
                <>
                  <div className="product-grid">
                    {paginatedProducts.map((product) => (
                      <ProductCard key={product.id} product={product} />
                    ))}
                  </div>

                  {/* Elegant Pagination Load More */}
                  {filteredProducts.length > visibleCount && (
                    <div style={{ textAlign: 'center', marginTop: '48px' }}>
                      <button
                        onClick={() => setVisibleCount((prev) => prev + 4)}
                        className="btn btn--primary"
                        style={{ padding: '12px 36px' }}
                      >
                        Load More Products
                      </button>
                    </div>
                  )}
                </>
              ) : (
                <div
                  style={{
                    textAlign: 'center',
                    padding: '80px 24px',
                    background: 'var(--color-gray-50)',
                    border: '1.5px dashed var(--color-gray-200)',
                    borderRadius: 'var(--radius-lg)',
                    marginTop: '20px',
                  }}
                >
                  <Search size={48} style={{ color: 'var(--color-gray-300)', marginBottom: '16px' }} />
                  <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-3xl)', marginBottom: '8px' }}>
                    No Products Found
                  </h3>
                  <p style={{ color: 'var(--color-gray-500)', maxWidth: '400px', margin: '0 auto 24px' }}>
                    We couldn't find any products matching your specific combinations of filters or search terms. Try clearing filters or tweaking details!
                  </p>
                  <button onClick={handleResetFilters} className="btn btn--outline" style={{ display: 'inline-flex', gap: '8px' }}>
                    <RotateCcw size={16} />
                    Reset All Filters
                  </button>
                </div>
              )}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
