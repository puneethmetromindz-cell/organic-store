import { Link } from 'react-router-dom';
import { Instagram, Facebook, Youtube, Phone, Mail, MapPin } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="footer" id="site-footer">
      <div className="container">
        <div className="footer__grid">
          {/* Brand Column */}
          <div>
            <div className="footer__brand-name">TRIDAMYA</div>
            <div className="footer__brand-tagline">Ancient Wisdom | Modern Purity</div>
            <p className="footer__brand-desc">
              Nourish your body naturally with thoughtfully crafted wellness powders
              inspired by tradition and crafted for modern living.
            </p>
            <div className="footer__social">
              <a
                href="https://www.instagram.com/tridamyaorganic"
                target="_blank"
                rel="noopener noreferrer"
                className="footer__social-link"
                aria-label="Instagram"
              >
                <Instagram size={18} />
              </a>
              <a
                href="#"
                className="footer__social-link"
                aria-label="Facebook"
              >
                <Facebook size={18} />
              </a>
              <a
                href="#"
                className="footer__social-link"
                aria-label="YouTube"
              >
                <Youtube size={18} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer__heading">Quick Links</h4>
            <div className="footer__links">
              <Link to="/shop" className="footer__link">Shop All</Link>
              <Link to="/about" className="footer__link">About Us</Link>
              <Link to="/blog" className="footer__link">Wellness Journal</Link>
              <Link to="/contact" className="footer__link">Contact Us</Link>
              <Link to="/account" className="footer__link">My Account</Link>
              <Link to="/wishlist" className="footer__link">Wishlist</Link>
            </div>
          </div>

          {/* Policies */}
          <div>
            <h4 className="footer__heading">Policies</h4>
            <div className="footer__links">
              <Link to="/privacy-policy" className="footer__link">Privacy Policy</Link>
              <Link to="/terms-conditions" className="footer__link">Terms & Conditions</Link>
              <Link to="/shipping-policy" className="footer__link">Shipping Policy</Link>
              <Link to="/refund-policy" className="footer__link">Refund & Return Policy</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="footer__heading">Contact Us</h4>
            <div className="footer__contact-item">
              <Phone size={16} className="footer__contact-icon" />
              <div>
                <a href="tel:+919880033463">+91 9880033463</a>
              </div>
            </div>
            <div className="footer__contact-item">
              <Mail size={16} className="footer__contact-icon" />
              <div>
                <a href="mailto:Tridamya@gmail.com">Tridamya@gmail.com</a>
              </div>
            </div>
            <div className="footer__contact-item">
              <MapPin size={16} className="footer__contact-icon" />
              <div>
                #10/A-9, 2nd Cross,<br />
                Belagola Food Industrial Estate,<br />
                Mysuru
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer__bottom">
          <p className="footer__copyright">
            © {new Date().getFullYear()} TRIDAMYA. All rights reserved.
          </p>
          <div className="footer__bottom-links">
            <Link to="/privacy-policy" className="footer__bottom-link">Privacy</Link>
            <Link to="/terms-conditions" className="footer__bottom-link">Terms</Link>
            <Link to="/shipping-policy" className="footer__bottom-link">Shipping</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
