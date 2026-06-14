import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ShieldCheck, Leaf, Heart, Eye, Award, Globe } from 'lucide-react';
import aboutStoryImg from '../assets/about/about-story-img.webp';
import aboutHeritageImg from '../assets/about/heritage.webp';
import aboutBannerImg from '../assets/about/Indian-farm-about-background.webp';

export default function AboutPage() {
  const values = [
    {
      icon: <ShieldCheck size={24} />,
      title: 'Purity Without Compromise',
      desc: 'No fillers, no colors, no preservatives, and no synthetic trace elements. We pack only 100% pure, natural botanicals.'
    },
    {
      icon: <Leaf size={24} />,
      title: 'Ethical wild harvesting',
      desc: 'We source wild-grown materials directly from chemical-free forests and farms, maintaining vital minerals and active enzymes.'
    },
    {
      icon: <Award size={24} />,
      title: 'Karnataka Farmer Cooperatives',
      desc: 'We purchase crops directly from farmer clusters in Mysuru, Mandya, and Chamarajanagar district zones at fair-trade values.'
    },
    {
      icon: <Globe size={24} />,
      title: 'Biodegradable Packaging',
      desc: 'Sourced and packed in high-quality biodegradable paper containers designed to protect shelf life and prevent ecological waste.'
    }
  ];

  return (
    <>
      <Helmet>
        <title>Our Story & Purity Philosophy | TRIDAMYA Organic Store</title>
        <meta name="description" content="Discover the story of Tridamya. Inspired by ancient wellness wisdom and dedicated to modern purity. ethically sourced organic powders from Mysuru, Karnataka." />
      </Helmet>

      {/* About Page Hero Section */}
      <section className="about-hero">
        <div className="about-hero__bg">
          <img
            src={aboutBannerImg}
            alt="Indian farm background"
          />
        </div>
        <div className="container" style={{ zIndex: 1 }}>
          <span className="section-header__eyebrow" style={{ color: 'var(--color-sage)' }}>Our Philosophy</span>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', color: '#fff', marginBottom: '16px' }}>
            Ancient Wisdom, Modern Purity
          </h1>
          <p style={{ color: 'var(--color-cream)', maxWidth: '600px', margin: '0 auto', fontSize: 'var(--text-lg)' }}>
            Nourishing your daily routine through single-ingredient botanical powders, ethically sourced from Mysore's rich agricultural soils.
          </p>
        </div>
      </section>

      {/* Breadcrumb row */}
      <div className="section section--sm section--cream" style={{ borderBottom: '1px solid var(--color-cream-dark)' }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb__separator">/</span>
            <span className="breadcrumb__current">Our Story</span>
          </nav>
        </div>
      </div>

      {/* Brand Story Section */}
      <section className="section">
        <div className="container">
          <div className="about-story-grid">

            {/* Story text */}
            <div>
              <span className="section-header__eyebrow" style={{ textAlign: 'left', marginBottom: '8px' }}>Who We Are</span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-4xl)', marginBottom: '20px' }}>
                The Tridamya Journey
              </h2>
              <p style={{ lineHeight: '1.7', color: 'var(--color-gray-600)', marginBottom: '16px' }}>
                Tridamya was founded on a simple realization: while modern life moves at a lightning pace, our bodies still crave the slow, natural nourishment that ancient traditions perfected.
              </p>
              <p style={{ lineHeight: '1.7', color: 'var(--color-gray-600)', marginBottom: '16px' }}>
                We noticed that the market was flooded with wellness supplements filled with starch carriers, anti-caking agents, synthetic stabilizers, and suspicious flavorings. We decided to take a different path — returning to single-ingredient botanicals in their absolute, raw, pure powder form.
              </p>
              <p style={{ lineHeight: '1.7', color: 'var(--color-gray-600)' }}>
                Our name, Tridamya, stands for the three core balances: pure cultivation, ancient harvesting science, and modern hygienic processing. We bridge this gap by bringing whole-food supplements from local farms directly to your home.
              </p>
            </div>

            {/* Story Image wrapper */}
            <div className="about-story-img">
              <img
                src={aboutStoryImg}
                alt="Harvested organic herbs"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Sourcing & Roots Section */}
      <section className="section section--cream" style={{ borderTop: '1px solid var(--color-cream-dark)', borderBottom: '1px solid var(--color-cream-dark)' }}>
        <div className="container">
          <div className="about-story-grid" style={{ direction: 'rtl' }}>

            {/* Roots text */}
            <div style={{ direction: 'ltr', textAlign: 'left' }}>
              <span className="section-header__eyebrow" style={{ textAlign: 'left', marginBottom: '8px' }}>Karnataka Roots</span>
              <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-4xl)', marginBottom: '20px' }}>
                Sourced from Mysore's Rich Heritage
              </h2>
              <p style={{ lineHeight: '1.7', color: 'var(--color-gray-600)', marginBottom: '16px' }}>
                Our production base is proudly situated in the Gokulam/Belagola Food Industrial Estate in Mysuru, Karnataka. The surrounding regions of Mysore are famous for mineral-rich soil fed by clean Kaveri river streams.
              </p>
              <p style={{ lineHeight: '1.7', color: 'var(--color-gray-600)', marginBottom: '24px' }}>
                By establishing our processing base directly in Mysuru, we reduce the transport carbon footprint and maintain a direct hands-on relationship with agricultural collectives. We support local growers by purchasing crops at higher-than-average fair trade prices.
              </p>
              <div
                style={{
                  borderLeft: '4px solid var(--color-primary)',
                  paddingLeft: '16px',
                  fontStyle: 'italic',
                  color: 'var(--color-primary-dark)',
                  fontSize: '15px'
                }}
              >
                "Every purchase directly funds regional farming cooperatives in Chamarajanagar, Mandya, and Mysore districts, supporting chemical-free organic agriculture."
              </div>
            </div>

            {/* Roots image */}
            <div className="about-story-img" style={{ direction: 'ltr' }}>
              <img
                src={aboutHeritageImg}
                alt="Mysore Moringa Farm"
              />
            </div>

          </div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="section">
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '32px' }}>

            {/* Mission panel */}
            <div className="checkout-section" style={{ marginBottom: 0, border: '1.5px solid var(--color-gray-200)' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                <div className="trust-badge__icon" style={{ backgroundColor: 'var(--color-sage)', color: 'var(--color-primary)' }}>
                  <Heart size={20} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: 'var(--color-primary-dark)' }}>Our Mission</h3>
              </div>
              <p style={{ color: 'var(--color-gray-600)', lineHeight: '1.7', fontSize: '14px' }}>
                To democratize authentic Ayurveda and traditional superfoods by offering single-ingredient, whole-food powders free from chemical processing, preservatives, and starch fillers. We aim to inspire a return to pure, slow wellness practices that protect both human health and regional biodiversity.
              </p>
            </div>

            {/* Vision panel */}
            <div className="checkout-section" style={{ marginBottom: 0, border: '1.5px solid var(--color-gray-200)' }}>
              <div style={{ display: 'flex', gap: '16px', alignItems: 'center', marginBottom: '16px' }}>
                <div className="trust-badge__icon" style={{ backgroundColor: 'var(--color-sage)', color: 'var(--color-primary)' }}>
                  <Eye size={20} />
                </div>
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: 'var(--color-primary-dark)' }}>Our Vision</h3>
              </div>
              <p style={{ color: 'var(--color-gray-600)', lineHeight: '1.7', fontSize: '14px' }}>
                To become India's most trusted direct-to-consumer organic wellness brand, known for absolute transparency, fair-trade relations with Karnataka farming collectives, and sustainable zero-waste biodegradable packaging operations.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Why Choose Us Values Grid */}
      <section className="section section--cream" style={{ borderTop: '1px solid var(--color-cream-dark)' }}>
        <div className="container">
          <div className="section-header">
            <span className="section-header__decorative">Our Standards</span>
            <h2 className="section-header__title">Why Choose Tridamya?</h2>
            <div className="section-header__divider"></div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px', marginTop: '40px' }}>
            {values.map((v, idx) => (
              <div
                key={idx}
                style={{
                  background: 'var(--color-white)',
                  border: '1.5px solid var(--color-gray-200)',
                  borderRadius: 'var(--radius-lg)',
                  padding: '24px',
                  transition: 'transform 0.2s',
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
              >
                <div
                  style={{
                    width: '48px',
                    height: '48px',
                    borderRadius: 'var(--radius-full)',
                    backgroundColor: 'var(--color-sage)',
                    color: 'var(--color-primary)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: '16px'
                  }}
                >
                  {v.icon}
                </div>
                <h4 style={{ fontFamily: 'var(--font-body)', fontSize: '16px', fontWeight: 700, color: 'var(--color-charcoal)', marginBottom: '8px' }}>
                  {v.title}
                </h4>
                <p style={{ fontSize: '13px', color: 'var(--color-gray-500)', lineHeight: '1.6', marginBottom: 0 }}>
                  {v.desc}
                </p>
              </div>
            ))}
          </div>

          {/* Shop CTA */}
          <div style={{ textAlign: 'center', marginTop: '48px' }}>
            <Link to="/shop" className="btn btn--primary">
              Shop Our Organic Powders
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
