import { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { Calendar, Clock, Share2, Facebook, Twitter, Mail, ArrowLeft, ArrowRight, ShoppingBag } from 'lucide-react';
import { mockBlogPosts } from '../data/mockData';

// Map mock images to premium Unsplash URLs to prevent placeholder errors
const blogImages = {
  1: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80',
  2: 'https://images.unsplash.com/photo-1611070973770-b1a672610042?auto=format&fit=crop&w=800&q=80',
  3: 'https://images.unsplash.com/photo-1608248597279-f99d160bfcbc?auto=format&fit=crop&w=800&q=80',
  4: 'https://images.unsplash.com/photo-1593113598332-cd59c5ac3f90?auto=format&fit=crop&w=800&q=80',
};

// Supplement mock data
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

// Rich content lookup database
const articleBodies = {
  '5-ayurvedic-superfoods-daily-diet': {
    author: 'Dr. Vasudha Rao (BAMS)',
    content: (
      <>
        <p>In Ayurvedic science, food is not merely fuel; it is the ultimate medicine (Mahabheshaja). In today’s fast-paced world, incorporating single-ingredient organic superfoods into our daily diets is one of the easiest ways to realign our bodies, support immunity, and protect vital trace mineral values.</p>
        
        <h2>1. Amla (Indian Gooseberry) - The Great Rejuvenator</h2>
        <p>Known as <em>Amritaphala</em> (the fruit of immortality), Amla is legendary for containing up to twenty times more Vitamin C than oranges. Unlike synthetic supplements, the natural tannins in pure organic Amla powder protect the Vitamin C molecules, ensuring they are not destroyed by heat or storage. Daily consumption supports digestive fire (Agni), purifies blood toxins, and fosters healthy hair follicles from within.</p>
        
        <blockquote>
          "Amla is a natural Rasayana, meaning it works at the cellular level to reverse cellular damage and slow down physiological aging."
        </blockquote>

        <h2>2. Moringa - The Miracle Tree of Minerals</h2>
        <p>Originating from organic farms in southern India, Moringa Oleifera leaves are packed with calcium, iron, protein, and amino acids. Traditional communities have harvested Moringa leaves for thousands of years to support nursing mothers and increase natural metabolic rates without overstimulating the nervous system. It acts as an incredible nutrient dense builder for anyone recovering from chronic fatigue.</p>

        <h2>3. Bhringraj - The King of Hair Health</h2>
        <p>Though popularly known for topical hair oils, Bhringraj is also used in small therapeutic dosages internally in traditional remedies to calm excessive Pitta (fire) dosha. Calming Pitta directly impacts liver health and cellular regeneration, which is why Bhringraj works so effectively in stopping premature hair greying and support deep sleep cycles.</p>

        <h2>4. Beetroot - The Soil's Natural Energizer</h2>
        <p>Often overlooked in classic Ayurvedic texts but highly aligned with the concept of blood nourishment (Rakta Dhatu), Beetroot is a powerhouse of organic nitrates. Ground into pure powder, it acts as a stamina boosting energizer by dilating blood vessels and supporting oxygen supply during strenuous activity. It is the perfect natural pre-workout replacement.</p>

        <h2>How to Integrate Them Effortlessly</h2>
        <p>The beauty of organic powders lies in their versatility. You do not need to swallow capsules. Simply dissolve a teaspoon of Amla in warm water with raw honey in the morning, sprinkle Moringa over your soups or lentils, or whisk Beetroot powder into a warm cup of milk after a workout. Always start with a small dosage (2-3g) to let your body align naturally.</p>
      </>
    )
  },
  'complete-guide-moringa-benefits': {
    author: 'Meera Krishnan (Nutritionist)',
    content: (
      <>
        <p>Moringa Oleifera, often hailed as the "Miracle Tree" or "Drumstick Tree," has transition from an ancient backyard remedy to a global superfood sensation. Sourced directly from local growers in Karnataka, our organic Moringa powder is dried carefully under low heat to retain maximum chlorophyll, protein, and amino acid values.</p>

        <h2>Why Moringa is a Nutritional Powerhouse</h2>
        <p>Moringa leaves contain over 90 nutrients and 46 antioxidants. Gram for gram, pure Moringa powder contains: <br />
          • 17 times more calcium than milk <br />
          • 9 times more iron than spinach <br />
          • 15 times more potassium than bananas <br />
          • 4 times more protein than eggs
        </p>

        <blockquote>
          "Moringa leaves are unique because they contain all 9 essential amino acids, making them a rare complete plant-based protein source."
        </blockquote>

        <h2>Top 3 Health Benefits of Moringa Powder</h2>
        <h3>1. Combats Inflammation</h3>
        <p>Moringa contains isothiocyanates, which are primary anti-inflammatory compounds. Regularly mixing a teaspoon of Moringa powder into your daily soups or smoothies can help reduce cellular inflammation and joint swelling.</p>
        
        <h3>2. Regulates Blood Sugar Levels</h3>
        <p>Studies suggest that chlorogenic acid in Moringa leaf cells helps stabilize glucose levels after meals, supporting metabolic health and reducing sugar cravings.</p>

        <h3>3. Boosts Natural Energy</h3>
        <p>Unlike caffeine, which triggers stress response cortisol spikes, Moringa provides natural, sustained energy through its rich profile of iron, B-vitamins, and magnesium. It nourishes the cells directly to fight chronic fatigue.</p>

        <h2>Simple Green Smoothie Recipe</h2>
        <p>Mix 1 teaspoon of Tridamya Moringa Powder with 1 ripe banana, 1 cup of coconut water, and a squeeze of fresh lemon juice. Blend until smooth and enjoy as an alkalizing mid-morning energy booster!</p>
      </>
    )
  },
  'natural-hair-care-bhringraj-herbs': {
    author: 'Rajesh Gowda (Ayurvedic Specialist)',
    content: (
      <>
        <p>Hair is described in Ayurveda as a byproduct (Upadhatu) of bone tissue (Asti Dhatu). This means beautiful, lustrous hair is a direct reflection of deep systemic nourishment. In this guide, we explore how traditional powders like Bhringraj, Amla, and hibiscus support hair root vitality naturally.</p>

        <h2>Bhringraj: The King of Herbs (Keshraj)</h2>
        <p>Bhringraj (Eclipta Alba) holds the highest crown in Ayurvedic hair care. It is known to possess cooling properties that neutralize excessive Pitta (heat) on the scalp. High Pitta is the primary trigger behind hair follicle inflammation, thinning, and premature greying. Using Bhringraj regularly nourishes the roots and stimulates blood circulation in the scalp.</p>

        <blockquote>
          "Applying a paste of pure Bhringraj powder with warm water once a week works as an ancient, organic conditioner that builds strand thickness."
        </blockquote>

        <h2>Synergistic Hair Herbs</h2>
        <h3>1. Amla Powder</h3>
        <p>Rich in Vitamin C and antioxidants, Amla strengthens the hair shaft, prevents breakage, and adds a natural dark shine. It acts as an organic astringent that cleanses the scalp of dandruff scales.</p>
        
        <h3>2. Neem & Shikakai</h3>
        <p>While Shikakai cleanses mild oils without stripping the scalp's natural sebum, Neem powder acts as a strong anti-fungal shield that clears scalp itching and inflammation.</p>

        <h2>How to Make a Tridamya Hair Mask</h2>
        <p>Combine 2 tablespoons of Bhringraj Powder with 1 tablespoon of Amla Powder. Slowly add warm water or organic coconut oil to form a smooth, paste-like consistency. Apply directly to your scalp, focusing on the roots. Leave on for 30–45 minutes, then rinse thoroughly with lukewarm water. Use twice a week for maximum volume and texture changes.</p>
      </>
    )
  },
  'earthy-beetroot-latte-recipe': {
    author: 'Chef Rohan Murthy (Mysore Culinary Base)',
    content: (
      <>
        <p>Beetroot is nature's natural energizer. Packed with nitrates, it expands blood vessels and improves oxygen transport. While drinking cold beet juices can sometimes disrupt weak digestion (Manda Agni) due to its cold, damp nature, blending pure Beetroot powder into a warm, spiced latte is the perfect warming pre-workout alternative.</p>

        <h2>Ingredients Needed</h2>
        <p>
          • 1 teaspoon Tridamya Beetroot Powder <br />
          • 1 cup Almond Milk (or organic cow's milk) <br />
          • 1/4 teaspoon ground Cinnamon <br />
          • A tiny pinch of dry Ginger powder (Sunthi) <br />
          • 1 teaspoon Raw Honey or Maple Syrup
        </p>

        <blockquote>
          "Adding warming spices like cinnamon and dry ginger to beetroot latte helps digest the heavy sugars of beet, supporting stomach absorption."
        </blockquote>

        <h2>Step-by-Step Instructions</h2>
        <h3>Step 1: Warm the Milk</h3>
        <p>In a small saucepan, heat one cup of almond milk over medium heat until steaming but not boiling.</p>

        <h3>Step 2: Whisk the Powders</h3>
        <p>Add 1 teaspoon of Tridamya Beetroot Powder, cinnamon, and dry ginger to a mug. Pour in a small splash of the warm milk and whisk vigorously to form a smooth, lump-free paste.</p>

        <h3>Step 3: Froth and Serve</h3>
        <p>Pour the remaining warm milk into the mug while stirring. Froth with a hand blender if desired. Stir in raw honey to taste, and sprinkle a dash of cinnamon on top. Enjoy your beautiful pink stamina booster!</p>
      </>
    )
  }
};

export default function BlogPostPage() {
  const { slug } = useParams();

  const post = useMemo(() => {
    return enrichedPosts.find((p) => p.slug === slug);
  }, [slug]);

  const bodyData = useMemo(() => {
    if (!post) return null;
    return articleBodies[post.slug] || {
      author: 'Tridamya Wellness Team',
      content: <p>{post.excerpt}</p>
    };
  }, [post]);

  // Related posts (excluding current post)
  const relatedPosts = useMemo(() => {
    if (!post) return [];
    return enrichedPosts.filter((p) => p.id !== post.id).slice(0, 2);
  }, [post]);

  if (!post) {
    return (
      <div className="container section text-center" style={{ padding: '80px 0' }}>
        <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: 'var(--text-4xl)', marginBottom: '16px' }}>Article Not Found</h2>
        <p style={{ color: 'var(--color-gray-500)', marginBottom: '24px' }}>The blog post you are searching for is not available.</p>
        <Link to="/blog" className="btn btn--primary">Return to Journal</Link>
      </div>
    );
  }

  const activeImage = blogImages[post.id] || post.image;

  return (
    <>
      <Helmet>
        <title>{post.title} | TRIDAMYA Journal</title>
        <meta name="description" content={post.excerpt} />
      </Helmet>

      {/* Breadcrumb Section */}
      <div className="section section--sm section--cream" style={{ borderBottom: '1px solid var(--color-cream-dark)' }}>
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <span className="breadcrumb__separator">/</span>
            <Link to="/blog">Wellness Journal</Link>
            <span className="breadcrumb__separator">/</span>
            <span className="breadcrumb__current">{post.title}</span>
          </nav>
        </div>
      </div>

      {/* Article Container */}
      <article className="section">
        <div className="container">
          <div className="blog-post">
            
            {/* Header */}
            <header className="blog-post__header">
              <span className="blog-card__category" style={{ display: 'inline-block', marginBottom: '8px' }}>{post.category}</span>
              <h1 className="blog-post__title">{post.title}</h1>
              
              <div className="blog-post__meta">
                <span>By <strong>{bodyData?.author}</strong></span>
                <span>•</span>
                <span style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <Calendar size={14} />
                  {post.date}
                </span>
                <span>•</span>
                <span style={{ display: 'flex', gap: '4px', alignItems: 'center' }}>
                  <Clock size={14} />
                  {post.read_time}
                </span>
              </div>
            </header>

            {/* Featured Image */}
            <img 
              src={activeImage} 
              alt={post.title} 
              className="blog-post__featured-img"
            />

            {/* Content Body */}
            <div className="blog-post__content">
              {bodyData?.content}
            </div>

            {/* Social Share Placeholders */}
            <div className="blog-post__share">
              <span className="blog-post__share-title">Share Article:</span>
              <div style={{ display: 'flex', gap: '10px' }}>
                <button 
                  onClick={() => toast.success('Link copied to clipboard!')}
                  className="btn--icon"
                  style={{ width: '36px', height: '36px', border: '1px solid var(--color-gray-200)' }}
                  aria-label="Share via Link"
                >
                  <Share2 size={16} />
                </button>
                <button 
                  onClick={() => toast.success('Sharing to Facebook (simulated)...')}
                  className="btn--icon"
                  style={{ width: '36px', height: '36px', border: '1px solid var(--color-gray-200)' }}
                  aria-label="Share on Facebook"
                >
                  <Facebook size={16} />
                </button>
                <button 
                  onClick={() => toast.success('Sharing to Twitter (simulated)...')}
                  className="btn--icon"
                  style={{ width: '36px', height: '36px', border: '1px solid var(--color-gray-200)' }}
                  aria-label="Share on Twitter"
                >
                  <Twitter size={16} />
                </button>
                <button 
                  onClick={() => window.open(`mailto:?subject=${encodeURIComponent(post.title)}&body=Read this article: ${window.location.href}`)}
                  className="btn--icon"
                  style={{ width: '36px', height: '36px', border: '1px solid var(--color-gray-200)' }}
                  aria-label="Share via Email"
                >
                  <Mail size={16} />
                </button>
              </div>
            </div>

            {/* Shopping CTA Banner */}
            <div className="blog-post__cta">
              <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '24px', color: 'var(--color-primary-dark)', marginBottom: '8px' }}>
                Experience the Power of Pure Botanicals
              </h3>
              <p style={{ fontSize: '13px', color: 'var(--color-gray-600)', maxWidth: '500px', margin: '0 auto 20px', lineHeight: '1.6' }}>
                Nourish your body daily. Discover our range of 100% natural organic powders, freshly ground and sourced ethically in Mysuru.
              </p>
              <Link to="/shop" className="btn btn--primary btn--sm" style={{ display: 'inline-flex', gap: '8px' }}>
                <ShoppingBag size={14} />
                Shop Pure Powders
              </Link>
            </div>

            {/* Return link */}
            <div style={{ borderTop: '1px solid var(--color-gray-200)', paddingTop: '24px', marginTop: '40px' }}>
              <Link to="/blog" className="btn btn--outline btn--sm" style={{ display: 'inline-flex', gap: '8px', alignItems: 'center' }}>
                <ArrowLeft size={14} />
                Back to Journal Feed
              </Link>
            </div>

          </div>

          {/* Related Articles recommendations */}
          {relatedPosts.length > 0 && (
            <div style={{ marginTop: '80px', borderTop: '1px solid var(--color-gray-200)', paddingTop: '60px' }}>
              <div className="section-header">
                <span className="section-header__eyebrow">More Wisdom</span>
                <h3 className="section-header__title" style={{ fontSize: '32px' }}>Related Articles</h3>
                <div className="section-header__divider"></div>
              </div>
              <div className="blog-grid" style={{ marginTop: '30px' }}>
                {relatedPosts.map((related) => (
                  <article key={related.id} className="blog-card">
                    <div className="blog-card__img-wrap">
                      <Link to={`/blog/${related.slug}`}>
                        <img 
                          src={blogImages[related.id] || related.image} 
                          alt={related.title} 
                          className="blog-card__img"
                        />
                      </Link>
                    </div>
                    <div className="blog-card__content">
                      <span className="blog-card__category">{related.category}</span>
                      <h4 className="blog-card__title" style={{ fontSize: '18px' }}>
                        <Link to={`/blog/${related.slug}`}>{related.title}</Link>
                      </h4>
                      <p className="blog-card__excerpt" style={{ fontSize: '13px' }}>{related.excerpt}</p>
                      <div className="blog-card__meta">
                        <span>{related.date}</span>
                        <span>{related.read_time}</span>
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          )}

        </div>
      </article>
    </>
  );
}
