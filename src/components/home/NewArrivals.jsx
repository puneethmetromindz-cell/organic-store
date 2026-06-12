import ProductCard from '../common/ProductCard';
import { mockProducts } from '../../data/mockData';
import { Link } from 'react-router-dom';

export default function NewArrivals() {
  // Let's display our products in reversed order to differentiate from Best Sellers
  const newArrivals = mockProducts.slice().reverse().slice(0, 4); // Reverse to get newer/different ones

  return (
    <section className="section" id="new-arrivals">
      <div className="container">
        <div className="section-header">
          <span className="section-header__decorative">Freshly Harvested</span>
          <h2 className="section-header__title">New Arrivals</h2>
          <div className="section-header__divider"></div>
          <p className="section-header__subtitle" style={{ marginTop: '16px' }}>
            Explore our latest premium superfoods and traditional health additions.
          </p>
        </div>

        <div className="product-grid" style={{ marginTop: '20px' }}>
          {newArrivals.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center" style={{ marginTop: '48px' }}>
          <Link to="/shop" className="btn btn--outline">
            Discover Fresh Batches
          </Link>
        </div>
      </div>
    </section>
  );
}
