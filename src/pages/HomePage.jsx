import { Helmet } from 'react-helmet-async';
import Hero from '../components/home/Hero';
import FeaturedCategories from '../components/home/FeaturedCategories';
import BestSellers from '../components/home/BestSellers';
import NewArrivals from '../components/home/NewArrivals';
import BrandStoryPreview from '../components/home/BrandStoryPreview';
import TrustBadges from '../components/home/TrustBadges';
import Testimonials from '../components/home/Testimonials';
import Newsletter from '../components/home/Newsletter';
import FAQ from '../components/home/FAQ';

export default function HomePage() {
  return (
    <>
      <Helmet>
        <title>TRIDAMYA | Ancient Wisdom · Modern Purity — Premium Wellness Powders</title>
        <meta
          name="description"
          content="Experience pure, 100% natural, additive-free wellness powders inspired by ancient wisdom. Sourced and processed ethically in Karnataka, India."
        />
        <meta property="og:title" content="TRIDAMYA | Ancient Wisdom · Modern Purity" />
        <meta
          property="og:description"
          content="Discover functional superfood powders including Amla, Moringa, Bhringraj, and Beetroot."
        />
      </Helmet>

      {/* Hero Banner Section */}
      <Hero />

      {/* Trust Badges Bar */}
      <TrustBadges />

      {/* Featured Categories Grid */}
      <FeaturedCategories />

      {/* Best Sellers Grid */}
      <BestSellers />

      {/* Brand Story Preview section */}
      <BrandStoryPreview />

      {/* New Arrivals Grid */}
      <NewArrivals />

      {/* Customer Testimonials Slider */}
      <Testimonials />

      {/* FAQ Accordion Accordion */}
      <FAQ />

      {/* Newsletter signup banner */}
      <Newsletter />
    </>
  );
}
