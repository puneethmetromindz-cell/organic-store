import { Link } from 'react-router-dom';

export default function BrandStoryPreview() {
  const storyImage = 'https://images.unsplash.com/photo-1515377905703-c4788e51af15?auto=format&fit=crop&w=800&q=80';

  return (
    <section className="section section--cream" id="brand-story" style={{ borderTop: '1px solid var(--color-cream-dark)', borderBottom: '1px solid var(--color-cream-dark)' }}>
      <div className="container">
        <div className="our-story">
          {/* Left Column: Image */}
          <div className="our-story__image" style={{ boxShadow: 'var(--shadow-lg)' }}>
            <img src={storyImage} alt="Hand-selected Ayurvedic herbs preparation" />
          </div>

          {/* Right Column: Text & CTA */}
          <div>
            <span className="our-story__decorative">Rooted in Tradition</span>
            <h2 className="our-story__title" style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-5xl)', fontWeight: 600, color: 'var(--color-charcoal)' }}>
              Ancient Wisdom &bull; Modern Purity
            </h2>
            
            <p className="our-story__text">
              At Tridamya, we believe in restoring the sacred link between nature and modern wellness. Our journey began with a simple quest: to source the most potent, chemical-free herbs and transform them into pure, bio-available powders without losing their natural vital energy.
            </p>
            
            <p className="our-story__text">
              Every single batch of our organic wellness powders—from immune-boosting Amla to nourishing Moringa—is sourced directly from ethical, local farms in Karnataka, gently processed at low temperatures, and packed with love. Zero fillers, zero chemicals. Only 100% natural, raw goodness.
            </p>

            <div style={{ marginTop: '30px' }}>
              <Link to="/about" className="btn btn--primary">
                Read Our Full Story
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
