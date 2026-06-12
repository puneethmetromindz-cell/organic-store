import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const categories = [
  {
    id: 1,
    name: 'Daily Wellness',
    slug: 'daily-wellness',
    description: 'Everyday powders for holistic health, vitality, and well-being.',
    image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
    color: 'var(--color-sage)',
  },
  {
    id: 2,
    name: 'Functional Nutrition',
    slug: 'functional-nutrition',
    description: 'Targeted superfoods for energy, detoxification, and strength.',
    image: 'https://images.unsplash.com/photo-1611070973770-b1a672610042?auto=format&fit=crop&w=800&q=80',
    color: 'var(--color-cream-dark)',
  },
  {
    id: 3,
    name: 'Beauty & Hair',
    slug: 'beauty-hair',
    description: 'Ayurvedic remedies for lustrous hair and naturally radiant skin.',
    image: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80',
    color: 'var(--color-sage-dark)',
  },
];

export default function FeaturedCategories() {
  return (
    <section className="section" id="featured-categories" style={{ backgroundColor: 'var(--color-gray-50)' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-header__decorative">Curated Collections</span>
          <h2 className="section-header__title">Shop by Category</h2>
          <div className="section-header__divider"></div>
          <p className="section-header__subtitle" style={{ marginTop: '16px' }}>
            Nourish your routine with our thoughtfully sourced, 100% natural Ayurvedic powders.
          </p>
        </div>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
            gap: '30px',
            marginTop: '20px',
          }}
        >
          {categories.map((category) => (
            <div
              key={category.id}
              className="card"
              style={{
                display: 'flex',
                flexDirection: 'column',
                height: '420px',
                position: 'relative',
                overflow: 'hidden',
                borderRadius: '16px',
                border: '1px solid var(--color-gray-150)',
                boxShadow: 'var(--shadow-md)',
              }}
            >
              {/* Category Image */}
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  position: 'absolute',
                  inset: 0,
                  zIndex: 0,
                }}
              >
                <img
                  src={category.image}
                  alt={category.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    transition: 'transform 0.8s var(--ease-out)',
                  }}
                  onMouseEnter={(e) => (e.currentTarget.style.transform = 'scale(1.08)')}
                  onMouseLeave={(e) => (e.currentTarget.style.transform = 'scale(1)')}
                />
                {/* Dark Vignette Overlay */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background: 'linear-gradient(to top, rgba(30, 77, 43, 0.9) 0%, rgba(30, 77, 43, 0.4) 50%, rgba(0, 0, 0, 0.1) 100%)',
                    zIndex: 1,
                  }}
                />
              </div>

              {/* Category Details */}
              <div
                style={{
                  marginTop: 'auto',
                  padding: '30px',
                  position: 'relative',
                  zIndex: 2,
                  color: 'var(--color-white)',
                }}
              >
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontSize: 'var(--text-3xl)',
                    fontWeight: 700,
                    color: 'var(--color-white)',
                    marginBottom: '10px',
                  }}
                >
                  {category.name}
                </h3>
                <p
                  style={{
                    fontSize: 'var(--text-sm)',
                    color: 'rgba(255, 255, 255, 0.85)',
                    lineHeight: '1.5',
                    marginBottom: '20px',
                  }}
                >
                  {category.description}
                </p>
                <Link
                  to={`/shop/${category.slug}`}
                  className="btn btn--outline-white btn--sm"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    borderColor: 'rgba(255, 255, 255, 0.4)',
                  }}
                >
                  Explore Category
                  <ArrowRight size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
