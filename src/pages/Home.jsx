
import { Link } from 'react-router-dom';
import { getProducts } from '../api/mockApi';
import { categories } from '../data/products';
import useAsync from '../hooks/useAsync';
import ProductCard from '../components/ProductCard';
import { Loading, ErrorBox } from '../components/Status';
import { motion } from 'framer-motion';

export default function Home() {
  const { data, loading, error, reload } = useAsync(
    () => getProducts(),
    []
  );

  return (
    <main className="home-page">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <span className="hero-tag">THE NEW COLLECTION</span>

          <motion.h1
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Find Your
            <br />
            <span>Everyday Style.</span>
          </motion.h1>

          <p>
            Discover timeless fashion, handpicked essentials,
            and styles that feel like you.
          </p>

          <Link to="/products" className="btn primary hero-btn">
            Explore Collection <span>→</span>
          </Link>

          <div className="hero-note">
            <span>✦</span> Your style, your story.
          </div>
        </div>

        <div className="hero-visual">
          <motion.img
            src="https://images.unsplash.com/photo-1483985988355-763728e1935b?auto=format&fit=crop&w=1000&q=85"
            alt="Fashion collection"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
          />

          <div className="hero-floating-card">
            <span>CURATED FOR YOU</span>
            <strong>Style that speaks.</strong>
          </div>

          <div className="hero-circle">
            NEW
            <br />
            SEASON
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <div className="home-benefits">
        <div>
          <span>✦</span>
          <p>Curated Collections</p>
        </div>

        <div>
          <span>♡</span>
          <p>Everyday Essentials</p>
        </div>

        <div>
          <span>↗</span>
          <p>Discover Local Sellers</p>
        </div>
      </div>

      {/* Shop by Category - Repeated Scroll Animation */}
      <motion.section
        className="home-section"
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.2 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow">FIND YOUR FAVOURITES</span>
            <h2>Shop by category</h2>
          </div>

          <Link to="/products" className="text-link">
            View all products →
          </Link>
        </div>

        <div className="category-grid">
          {categories.map((category, index) => (
            <Link
              key={category}
              className={`category-card category-card-${index % 4}`}
              to={`/products?category=${encodeURIComponent(category)}`}
            >
              <div className="category-card-content">
                <span>0{index + 1}</span>
                <h3>{category}</h3>
                <p>Explore collection ↗</p>
              </div>
            </Link>
          ))}
        </div>
      </motion.section>

      {/* Featured Products */}
      <motion.section
        className="home-section featured-section"
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.15 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        <div className="section-heading">
          <div>
            <span className="eyebrow">HANDPICKED FOR YOU</span>
            <h2>Featured products</h2>
            <p className="section-description">
              Everyday favourites worth adding to your collection.
            </p>
          </div>

          <Link to="/products" className="text-link">
            Shop all →
          </Link>
        </div>

        {loading && <Loading />}
        {error && <ErrorBox message={error} onRetry={reload} />}

        {data &&
          (data.length > 0 ? (
            <div className="grid">
              {data.slice(0, 4).map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <p>No products available yet. Check back soon!</p>
          ))}
      </motion.section>

      {/* Final CTA - Repeated Scroll Animation */}
      <motion.section
        className="home-cta"
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, amount: 0.3 }}
        transition={{ duration: 0.9, ease: 'easeOut' }}
      >
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <span className="eyebrow">
            YOUR NEXT FAVOURITE IS HERE
          </span>

          <h2>A little style goes a long way.</h2>

          <p>
            Explore the collection and find something you love.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link to="/products" className="btn primary">
            Shop the collection →
          </Link>
        </motion.div>
      </motion.section>
    </main>
  );

}