import { useState } from 'react';
import toast from 'react-hot-toast';

export default function Newsletter() {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) {
      toast.error('Please enter your email address.');
      return;
    }

    // Simple email regex validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error('Please enter a valid email address.');
      return;
    }

    toast.success('Thank you for subscribing to the Tridamya Wellness Journal!');
    setEmail('');
  };

  return (
    <section className="section section--dark newsletter" id="newsletter-signup">
      <div className="container" style={{ maxWidth: '640px' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-4xl)', fontWeight: 600, marginBottom: '12px' }}>
          Subscribe to Tridamya
        </h2>
        <p style={{ color: 'var(--color-gray-300)', fontSize: 'var(--text-base)', lineHeight: '1.6' }}>
          Join our wellness circle. Receive traditional Ayurvedic remedies, ingredient spotlights, early product batch releases, and exclusive offers.
        </p>

        <form onSubmit={handleSubmit} className="newsletter__form">
          <input
            type="email"
            className="input newsletter__input"
            placeholder="Enter your email address"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email address for newsletter"
            style={{ borderRadius: '4px' }}
          />
          <button type="submit" className="btn btn--primary" style={{ padding: '12px 24px' }}>
            Subscribe
          </button>
        </form>
      </div>
    </section>
  );
}
