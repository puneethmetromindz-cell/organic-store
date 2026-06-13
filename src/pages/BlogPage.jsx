import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, ChevronRight } from 'lucide-react';
import { mockBlogPosts } from '../data/mockData';

// Map mock images to premium Unsplash URLs to prevent placeholder errors
const blogImages = {
  1: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
  2: 'https://images.unsplash.com/photo-1611070973770-b1a672610042?auto=format&fit=crop&w=800&q=80',
  3: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80',
  4: 'https://images.unsplash.com/photo-1593113598332-cd59c5ac3f90?auto=format&fit=crop&w=800&q=80',
};

// Supplement with a recipe post to cover all user requested categories
const enrichedPosts = [
  ...mockBlogPosts,
  {
    id: 4,
    title: 'Earthy Beetroot Latte: A Natural Stamina-Boosting Recipe',
    slug: 'earthy-beetroot-latte-recipe',
    excerpt: 'Learn how to make this vibrant, health-boosting organic beetroot latte in under 5 minutes using pure Tridamya Beetroot powder and warm almond milk.',
    category: 'Recipes',
    date: '2026-05-10',
    read_time: '4 min read',
    image: '/images/blog/beetroot-latte.jpg'
  }
];

export default function BlogPage() {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = ['All', 'Health Tips', 'Wellness Guides', 'Ingredient Benefits', 'Recipes'];

  // Handle category filtering
  const filteredPosts = useMemo(() => {
    if (activeCategory === 'All') return enrichedPosts;
    return enrichedPosts.filter(post => post.category === activeCategory);
  }, [activeCategory]);

  // Designate the first post in the list as the Featured article
  const featuredPost = enrichedPosts[0];
  const regularPosts = filteredPosts.filter(post => post.id !== featuredPost.id || activeCategory !== 'All');

  return (
    <>
      <Helmet>
        <title>Wellness Journal - Organic Wisdom & Health Tips | TRIDAMYA</title>
        <meta name="description" content="Explore Ayurvedic health tips, superfood benefits, natural hair care guides, and wholesome recipes inside Tridamya's premium Wellness Journal." />
      </Helmet>

      {/* Page Header */}
      <div className="section section--sm section--cream" style={{ borderBottom: '1px solid var(--color-cream-dark)' }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb__separator">/</span>
            <span className="breadcrumb__current">Wellness Journal</span>
          </nav>
          
          <div style={{ marginTop: '16px' }}>
            <span className="section-header__eyebrow" style={{ textAlign: 'left', marginBottom: '8px' }}>Organic Wisdom</span>
            <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-5xl)' }}>Wellness Journal</h1>
            <p style={{ marginTop: '8px', color: 'var(--color-gray-500)', maxWidth: '600px', fontSize: 'var(--text-sm)' }}>
              Explore the science of single-ingredient botanical powders, traditional Ayurvedic preparations, and wholesome recipes for vitality.
            </p>
          </div>
        </div>
      </div>

      {/* Blog Listing content */}
      <div className="section">
        <div className="container">
          
          {/* Featured Post Banner (Visible on 'All' category tab) */}
          {activeCategory === 'All' && featuredPost && (
            <div className="blog-featured">
              <div className="blog-featured__img-wrap">
                <img 
                  src={blogImages[featuredPost.id] || featuredPost.image} 
                  alt={featuredPost.title} 
                  className="blog-featured__img"
                />
              </div>
              <div className="blog-featured__content">
                <span className="blog-card__category">{featuredPost.category}</span>
                <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.75rem, 3vw, 2.5rem)', color: 'var(--color-charcoal)', marginBottom: '12px', lineHeight: '1.2' }}>
                  <Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                </h2>
                <p style={{ color: 'var(--color-gray-600)', fontSize: 'var(--text-sm)', lineHeight: '1.6', marginBottom: '24px' }}>
                  {featuredPost.excerpt}
                </p>
                
                <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--color-gray-400)', alignItems: 'center', marginBottom: '24px' }}>
                  <span style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <Calendar size={14} />
                    {featuredPost.date}
                  </span>
                  <span style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                    <Clock size={14} />
                    {featuredPost.read_time}
                  </span>
                </div>

                <div>
                  <Link to={`/blog/${featuredPost.slug}`} className="btn btn--primary btn--sm" style={{ display: 'inline-flex', gap: '6px' }}>
                    Read Article
                    <ChevronRight size={14} />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* Category Tabs list */}
          <div className="blog-categories">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`blog-category-btn ${activeCategory === cat ? 'active' : ''}`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Articles list grid */}
          {filteredPosts.length > 0 ? (
            <div className="blog-grid">
              {regularPosts.map((post) => (
                <article key={post.id} className="blog-card">
                  <div className="blog-card__img-wrap">
                    <Link to={`/blog/${post.slug}`}>
                      <img 
                        src={blogImages[post.id] || post.image} 
                        alt={post.title} 
                        className="blog-card__img"
                        loading="lazy"
                      />
                    </Link>
                  </div>
                  <div className="blog-card__content">
                    <span className="blog-card__category">{post.category}</span>
                    <h3 className="blog-card__title">
                      <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                    </h3>
                    <p className="blog-card__excerpt">
                      {post.excerpt}
                    </p>
                    <div className="blog-card__meta">
                      <span style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        <Calendar size={12} />
                        {post.date}
                      </span>
                      <span style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                        <Clock size={12} />
                        {post.read_time}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            <div 
              style={{
                textAlign: 'center',
                padding: '60px 24px',
                background: 'var(--color-gray-50)',
                border: '1.5px dashed var(--color-gray-200)',
                borderRadius: 'var(--radius-lg)',
                maxWidth: '480px',
                margin: '0 auto',
              }}
            >
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', marginBottom: '8px' }}>No Articles Found</h3>
              <p style={{ color: 'var(--color-gray-500)', fontSize: '13px', marginBottom: '16px' }}>We haven't posted any wellness articles in the "{activeCategory}" category yet. Check back soon!</p>
              <button onClick={() => setActiveCategory('All')} className="btn btn--outline btn--sm">
                View All Articles
              </button>
            </div>
          )}

        </div>
      </div>
    </>
  );
}
