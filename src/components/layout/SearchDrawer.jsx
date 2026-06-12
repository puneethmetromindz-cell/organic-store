import { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Search } from 'lucide-react';
import useUIStore from '../../store/uiStore';
import { mockProducts } from '../../data/mockData';

export default function SearchDrawer() {
  const { isSearchOpen, closeSearch } = useUIStore();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const inputRef = useRef(null);
  const navigate = useNavigate();

  // Focus input on mount
  useEffect(() => {
    if (isSearchOpen && inputRef.current) {
      setTimeout(() => {
        inputRef.current.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  // Handle product filtering
  useEffect(() => {
    if (query.trim() === '') {
      setResults([]);
      return;
    }

    const filtered = mockProducts.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.short_description.toLowerCase().includes(query.toLowerCase()) ||
        product.categories.some((c) => c.name.toLowerCase().includes(query.toLowerCase()))
    );

    setResults(filtered);
  }, [query]);

  if (!isSearchOpen) return null;

  const handleClose = () => {
    setQuery('');
    closeSearch();
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/shop?search=${encodeURIComponent(query)}`);
      handleClose();
    }
  };

  const popularSearches = ['Amla', 'Moringa', 'Bhringraj', 'Beetroot'];

  return (
    <div className="search-overlay" id="search-overlay" role="dialog" aria-modal="true" aria-label="Search Products">
      <div className="search-overlay__header">
        <Search size={24} className="text-gray-400" />
        <form onSubmit={handleSearchSubmit} style={{ flex: 1, display: 'flex' }}>
          <input
            ref={inputRef}
            type="text"
            className="search-overlay__input"
            placeholder="Search our pure organic powders..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search query"
          />
        </form>
        <button
          className="btn--icon"
          onClick={handleClose}
          aria-label="Close search"
          style={{ width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
        >
          <X size={24} />
        </button>
      </div>

      <div className="search-overlay__results">
        {query.trim() === '' ? (
          <div>
            <h4 className="search-overlay__section-title">Popular Searches</h4>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px', marginTop: '12px' }}>
              {popularSearches.map((term) => (
                <button
                  key={term}
                  onClick={() => setQuery(term)}
                  className="btn btn--outline btn--sm"
                  style={{ textTransform: 'none', borderRadius: '20px', padding: '6px 16px' }}
                >
                  {term}
                </button>
              ))}
            </div>
            
            <h4 className="search-overlay__section-title" style={{ marginTop: '40px' }}>
              Shop By Category
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '12px' }}>
              <Link to="/shop/daily-wellness" className="search-overlay__suggestion" onClick={handleClose}>
                Daily Wellness
              </Link>
              <Link to="/shop/beauty-hair" className="search-overlay__suggestion" onClick={handleClose}>
                Beauty & Hair
              </Link>
              <Link to="/shop/functional-nutrition" className="search-overlay__suggestion" onClick={handleClose}>
                Functional Nutrition
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <h4 className="search-overlay__section-title">
              Search Results ({results.length})
            </h4>
            {results.length === 0 ? (
              <p style={{ marginTop: '20px', color: 'var(--color-gray-500)' }}>
                No products found matching "{query}".
              </p>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
                {results.map((product) => (
                  <Link
                    key={product.id}
                    to={`/product/${product.slug}`}
                    className="flex items-center gap-4"
                    onClick={handleClose}
                    style={{
                      padding: '12px',
                      borderRadius: '8px',
                      backgroundColor: 'var(--color-gray-50)',
                      transition: 'background-color 0.2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-cream)')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = 'var(--color-gray-50)')}
                  >
                    <img
                      src={product.images?.[0]?.src || ''}
                      alt={product.name}
                      style={{
                        width: '60px',
                        height: '60px',
                        objectFit: 'cover',
                        borderRadius: '6px',
                        backgroundColor: 'var(--color-cream-dark)',
                      }}
                    />
                    <div style={{ flex: 1 }}>
                      <h5 style={{ fontSize: '1rem', fontWeight: 600, color: 'var(--color-charcoal)' }}>
                        {product.name}
                      </h5>
                      <p style={{ fontSize: '0.85rem', color: 'var(--color-gray-500)', margin: '2px 0 0 0' }}>
                        {product.short_description}
                      </p>
                    </div>
                    <span style={{ fontWeight: 700, color: 'var(--color-primary)' }}>
                      ₹{product.sale_price || product.price}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
