import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Phone, Mail, MapPin, MessageSquare, ExternalLink, HelpCircle, CheckCircle } from 'lucide-react';
import toast from 'react-hot-toast';

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !email || !message) {
      toast.error('Please fill out all required contact form fields.');
      return;
    }
    
    // Simulate submission success
    toast.success(`Thank you, ${name}! Your message has been received. Our wellness team will get back to you shortly.`);
    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
  };

  return (
    <>
      <Helmet>
        <title>Contact Us | TRIDAMYA Organic Store</title>
        <meta name="description" content="Get in touch with the Tridamya team. Direct phone +91 9880033463, email Tridamya@gmail.com. Sourced and processed at Belagola Food Industrial Estate, Mysuru." />
      </Helmet>

      {/* Page Header */}
      <div className="section section--sm section--cream" style={{ borderBottom: '1px solid var(--color-cream-dark)' }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb__separator">/</span>
            <span className="breadcrumb__current">Contact Us</span>
          </nav>
          
          <div style={{ marginTop: '16px' }}>
            <span className="section-header__eyebrow" style={{ textAlign: 'left', marginBottom: '8px' }}>Get In Touch</span>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-5xl)' }}>Contact Us</h1>
          </div>
        </div>
      </div>

      {/* Split Layout Section */}
      <div className="section">
        <div className="container">
          <div className="contact-layout">
            
            {/* Left Column: Contact Form */}
            <div className="checkout-section" style={{ marginBottom: 0 }}>
              <h2 className="checkout-section__title">Send Us a Message</h2>
              <p style={{ color: 'var(--color-gray-500)', fontSize: '13px', marginBottom: '24px' }}>
                Whether you have questions about our wild amla harvesting, custom powder recipes, bulk corporate rates, or wholesale inquiries, we would love to hear from you.
              </p>
              
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
                  <div className="input-group">
                    <label htmlFor="contact-name">Your Name *</label>
                    <input
                      type="text"
                      id="contact-name"
                      className="input"
                      placeholder="e.g. Priyan Sharma"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-group">
                    <label htmlFor="contact-phone">Phone Number</label>
                    <input
                      type="tel"
                      id="contact-phone"
                      className="input"
                      placeholder="e.g. 9880033463"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                    />
                  </div>
                </div>

                <div className="input-group" style={{ marginBottom: '16px' }}>
                  <label htmlFor="contact-email">Email Address *</label>
                  <input
                    type="email"
                    id="contact-email"
                    className="input"
                    placeholder="e.g. you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="input-group" style={{ marginBottom: '24px' }}>
                  <label htmlFor="contact-message">Your Message *</label>
                  <textarea
                    id="contact-message"
                    className="input textarea"
                    placeholder="What would you like to ask or share with us?"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  ></textarea>
                </div>

                <button type="submit" className="btn btn--primary" style={{ width: '100%' }}>
                  Submit Inquiry Message
                </button>
              </form>
            </div>

            {/* Right Column: Address, Phone, Map & WhatsApp */}
            <div>
              <div className="contact-card-info">
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: 'var(--color-primary-dark)', marginBottom: '20px', borderBottom: '1.5px solid var(--color-cream-dark)', paddingBottom: '8px' }}>
                  Business Information
                </h2>

                <div className="contact-info-list">
                  
                  {/* Phone detail */}
                  <div className="contact-detail-row">
                    <div className="contact-detail-row__icon">
                      <Phone size={18} />
                    </div>
                    <div className="contact-detail-row__content">
                      <h4>Phone</h4>
                      <p>
                        <a href="tel:+919880033463" style={{ fontWeight: 600 }}>+91 9880033463</a>
                      </p>
                      <span style={{ fontSize: '11px', color: 'var(--color-gray-500)' }}>Available Mon to Sat: 9:00 AM - 6:00 PM IST</span>
                    </div>
                  </div>

                  {/* Email detail */}
                  <div className="contact-detail-row">
                    <div className="contact-detail-row__icon">
                      <Mail size={18} />
                    </div>
                    <div className="contact-detail-row__content">
                      <h4>Email Support</h4>
                      <p>
                        <a href="mailto:Tridamya@gmail.com" style={{ fontWeight: 600 }}>Tridamya@gmail.com</a>
                      </p>
                      <span style={{ fontSize: '11px', color: 'var(--color-gray-500)' }}>We respond within 24 business hours.</span>
                    </div>
                  </div>

                  {/* Address detail */}
                  <div className="contact-detail-row">
                    <div className="contact-detail-row__icon">
                      <MapPin size={18} />
                    </div>
                    <div className="contact-detail-row__content">
                      <h4>Mysore Production Base</h4>
                      <p>
                        #10/A-9, 2nd Cross,<br />
                        Belagola Food Industrial Estate,<br />
                        Mysuru, Karnataka, India
                      </p>
                    </div>
                  </div>

                </div>

                {/* Styled Iframe Map Placeholder */}
                <div className="map-placeholder">
                  <div style={{ padding: '24px', textAlign: 'center', zIndex: 1 }}>
                    <MapPin size={24} style={{ color: 'var(--color-primary)', margin: '0 auto 8px' }} />
                    <strong style={{ display: 'block', fontSize: '13px', color: 'var(--color-charcoal)' }}>Belagola Food Industrial Estate</strong>
                    <span style={{ display: 'block', fontSize: '11px', color: 'var(--color-gray-500)', marginTop: '4px' }}>Mysuru, Karnataka, India</span>
                    <a 
                      href="https://maps.google.com/?q=Belagola+Food+Industrial+Estate+Mysore"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn--outline btn--sm"
                      style={{ marginTop: '16px', textTransform: 'none', display: 'inline-flex', gap: '6px', padding: '6px 14px' }}
                    >
                      View on Google Maps
                      <ExternalLink size={12} />
                    </a>
                  </div>
                  {/* Subtle map pattern simulation overlay */}
                  <div style={{ position: 'absolute', inset: 0, opacity: 0.1, backgroundColor: 'var(--color-primary-dark)', pointerEvents: 'none' }}></div>
                </div>

              </div>

              {/* Large WhatsApp CTA */}
              <a 
                href="https://wa.me/919880033463?text=Hi%20Tridamya%20Organic%20Store%2C%20I%20have%20an%20inquiry%20regarding%20your%20products."
                target="_blank"
                rel="noopener noreferrer"
                className="whatsapp-cta"
              >
                <MessageSquare size={20} />
                Message Us on WhatsApp
              </a>

              {/* FAQ Shortcut links */}
              <div 
                style={{
                  marginTop: '24px',
                  background: 'var(--color-gray-50)',
                  border: '1.5px solid var(--color-gray-200)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '20px',
                  textAlign: 'center',
                }}
              >
                <HelpCircle size={24} style={{ color: 'var(--color-primary)', margin: '0 auto 8px' }} />
                <h4 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--color-charcoal)', marginBottom: '4px' }}>Looking for Quick Answers?</h4>
                <p style={{ fontSize: '11px', color: 'var(--color-gray-500)', marginBottom: '12px' }}>Check out our FAQ accordion on the homepage for details on COD, shelf-life, and Karnataka shipping limits.</p>
                <Link to="/" style={{ color: 'var(--color-primary)', fontSize: '12px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                  Go to Homepage FAQs →
                </Link>
              </div>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
