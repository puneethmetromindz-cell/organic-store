import ProductCard from '../common/ProductCard';
import { mockProducts } from '../../data/mockData';
import { Link } from 'react-router-dom';

export default function BestSellers() {
  // Filter products that are featured as our Best Sellers
  const bestSellers = mockProducts.filter((product) => product.featured).slice(0, 4);

  return (
    <section className="section" id="best-sellers" style={{ paddingBottom: '0' }}>
      <div className="container">
        <div className="section-header">
          <span className="section-header__decorative">Customer Favorites</span>
          <h2 className="section-header__title">Our Best Sellers</h2>
          <div className="section-header__divider"></div>
          <p className="section-header__subtitle" style={{ marginTop: '16px' }}>
            Proven favorites crafted to support your daily wellness, beauty, and vitality.
          </p>
        </div>

        <div className="product-grid" style={{ marginTop: '20px' }}>
          {bestSellers.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="text-center" style={{ marginTop: '48px' }}>
          <Link to="/shop" className="btn btn--outline">
            View All Products
          </Link>
        </div>
      </div>
    </section>
  );
}
