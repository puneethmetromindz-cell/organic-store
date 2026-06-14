import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import heroImg from '../../assets/home/hero.webp';

export default function Hero() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] },
    },
  };

  return (
    <section className="hero" id="hero-banner">
      {/* Background Image Wrapper */}
      <div className="hero__bg">
        <img src={heroImg} alt="Premium Organic Herbs Background" />
      </div>

      {/* Main Content Area */}
      <div className="container">
        <motion.div
          className="hero__content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.span className="hero__eyebrow" variants={itemVariants}>
            Ancient Wisdom &bull; Modern Purity
          </motion.span>

          <motion.h1 className="hero__title" variants={itemVariants}>
            Nourish Your Body Naturally
          </motion.h1>

          <motion.p className="hero__subtitle" variants={itemVariants}>
            Crafted with traditional Ayurvedic wisdom and modern purity. Experience 100% natural, additive-free wellness powders curated for contemporary lifestyle.
          </motion.p>

          <motion.div className="hero__actions" variants={itemVariants}>
            <Link to="/shop" className="btn btn--primary btn--lg">
              Explore Shop
            </Link>
            <Link to="/about" className="btn btn--outline-white btn--lg">
              Our Story
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
