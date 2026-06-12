import { Link, useLocation } from 'react-router-dom';
import { X, ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import useUIStore from '../../store/uiStore';

const menuLinks = [
  { name: 'Home', path: '/' },
  { name: 'Shop All', path: '/shop' },
  {
    name: 'Categories',
    children: [
      { name: 'Daily Wellness', path: '/shop/daily-wellness' },
      { name: 'Beauty & Hair', path: '/shop/beauty-hair' },
      { name: 'Functional Nutrition', path: '/shop/functional-nutrition' },
    ],
  },
  { name: 'About Us', path: '/about' },
  { name: 'Wellness Journal', path: '/blog' },
  { name: 'Contact', path: '/contact' },
];

const bottomLinks = [
  { name: 'My Account', path: '/account' },
  { name: 'Wishlist', path: '/wishlist' },
  { name: 'Track Order', path: '/account' },
];

export default function MobileMenu() {
  const { isMobileMenuOpen, closeMobileMenu } = useUIStore();
  const [expandedItem, setExpandedItem] = useState(null);
  const location = useLocation();

  const handleLinkClick = () => {
    closeMobileMenu();
    setExpandedItem(null);
  };

  return (
    <>
      {/* Overlay */}
      <div
        className={`overlay ${isMobileMenuOpen ? 'active' : ''}`}
        onClick={closeMobileMenu}
        aria-hidden="true"
      />

      {/* Menu */}
      <nav
        className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}
        aria-label="Mobile navigation"
        id="mobile-menu"
      >
        <div className="mobile-menu__header">
          <div>
            <div className="header__logo-text" style={{ fontSize: '1.2rem' }}>TRIDAMYA</div>
            <div className="header__logo-tagline">Ancient Wisdom | Modern Purity</div>
          </div>
          <button
            className="btn--icon"
            onClick={closeMobileMenu}
            aria-label="Close menu"
            style={{ width: 40, height: 40, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <X size={22} />
          </button>
        </div>

        <div className="mobile-menu__nav">
          {menuLinks.map((link) =>
            link.children ? (
              <div key={link.name}>
                <button
                  className="mobile-menu__link"
                  onClick={() =>
                    setExpandedItem(expandedItem === link.name ? null : link.name)
                  }
                  style={{ width: '100%', textAlign: 'left' }}
                >
                  {link.name}
                  {expandedItem === link.name ? (
                    <ChevronDown size={18} />
                  ) : (
                    <ChevronRight size={18} />
                  )}
                </button>
                <AnimatePresence>
                  {expandedItem === link.name && (
                    <motion.div
                      className="mobile-menu__submenu"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                    >
                      {link.children.map((child) => (
                        <Link
                          key={child.name}
                          to={child.path}
                          className={`mobile-menu__link ${location.pathname === child.path ? 'active' : ''}`}
                          onClick={handleLinkClick}
                          style={{ fontSize: '0.9rem' }}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              <Link
                key={link.name}
                to={link.path}
                className={`mobile-menu__link ${location.pathname === link.path ? 'active' : ''}`}
                onClick={handleLinkClick}
              >
                {link.name}
                <ChevronRight size={18} />
              </Link>
            )
          )}
        </div>

        <div className="mobile-menu__footer">
          {bottomLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="mobile-menu__link"
              onClick={handleLinkClick}
              style={{ padding: '10px 0', fontSize: '0.85rem', color: 'var(--color-gray-500)' }}
            >
              {link.name}
            </Link>
          ))}
          <div style={{ marginTop: '16px', fontSize: '12px', color: 'var(--color-gray-400)' }}>
            <a href="tel:+919880033463" style={{ display: 'block', marginBottom: 8 }}>
              📞 +91 9880033463
            </a>
            <a href="mailto:Tridamya@gmail.com">
              ✉️ Tridamya@gmail.com
            </a>
          </div>
        </div>
      </nav>
    </>
  );
}
