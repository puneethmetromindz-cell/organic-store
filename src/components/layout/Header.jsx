import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Search, User, Heart, ShoppingBag, Menu, ChevronDown } from 'lucide-react';
import useCartStore from '../../store/cartStore';
import useWishlistStore from '../../store/wishlistStore';
import useUIStore from '../../store/uiStore';
import treeLogo from '../../assets/tree-logo.webp';

const navLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop', path: '/shop' },
  {
    name: 'Categories',
    path: '/shop',
    dropdown: [
      { name: 'Daily Wellness', path: '/shop/daily-wellness' },
      { name: 'Beauty & Hair', path: '/shop/beauty-hair' },
      { name: 'Functional Nutrition', path: '/shop/functional-nutrition' },
    ],
  },
  { name: 'About', path: '/about' },
  { name: 'Wellness Journal', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

export default function Header() {
  const [isCompact, setIsCompact] = useState(false);
  const location = useLocation();
  const cartItemCount = useCartStore((s) => s.getItemCount());
  const wishlistCount = useWishlistStore((s) => s.getItemCount());
  const { openMobileMenu, openSearch, openCart } = useUIStore();

  useEffect(() => {
    const handleScroll = () => {
      setIsCompact(window.scrollY > 60);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`header ${isCompact ? 'header--compact' : ''}`} id="site-header">
      <div className="header__inner">
        {/* Logo */}
        <Link to="/" className="header__logo" aria-label="TRIDAMYA Home">

          <img
            src={treeLogo}
            alt="TRIDAMYA"
            className="header__logo-icon"
          />

          <div className="header__logo-content">

            <div className="header__logo-text">
              TRIDAMYA
            </div>

            <div className="header__logo-tagline">
              Ancient Wisdom | Modern Purity
            </div>

          </div>

        </Link>

        {/* Desktop Navigation */}
        <nav className="header__nav" aria-label="Main navigation">
          {navLinks.map((link) =>
            link.dropdown ? (
              <div key={link.name} className="header__dropdown">
                <Link
                  to={link.path}
                  className={`header__nav-link ${location.pathname.startsWith('/shop') ? 'active' : ''}`}
                >
                  {link.name}
                  <ChevronDown size={14} style={{ marginLeft: 4, verticalAlign: 'middle' }} />
                </Link>
                <div className="header__dropdown-menu">
                  {link.dropdown.map((item) => (
                    <Link key={item.name} to={item.path} className="header__dropdown-item">
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                className={`header__nav-link ${location.pathname === link.path ? 'active' : ''}`}
              >
                {link.name}
              </Link>
            )
          )}
        </nav>

        {/* Actions */}
        <div className="header__actions">
          <button
            className="header__action-btn"
            onClick={openSearch}
            aria-label="Search products"
            id="search-trigger"
          >
            <Search size={20} />
          </button>

          <Link to="/account" className="header__action-btn" aria-label="My account" id="account-link">
            <User size={20} />
          </Link>

          <Link to="/wishlist" className="header__action-btn" aria-label="Wishlist" id="wishlist-link">
            <Heart size={20} />
            {wishlistCount > 0 && (
              <span className="header__action-badge">{wishlistCount}</span>
            )}
          </Link>

          <button
            className="header__action-btn"
            onClick={openCart}
            aria-label="Shopping cart"
            id="cart-trigger"
          >
            <ShoppingBag size={20} />
            {cartItemCount > 0 && (
              <span className="header__action-badge">{cartItemCount}</span>
            )}
          </button>

          <button
            className="header__action-btn header__menu-btn"
            onClick={openMobileMenu}
            aria-label="Open menu"
            id="menu-trigger"
          >
            <Menu size={22} />
          </button>
        </div>
      </div>
    </header>
  );
}
