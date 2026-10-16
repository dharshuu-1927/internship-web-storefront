import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export const formatPrice = (n) => `₹${Number(n).toLocaleString('en-IN')}`;

export default function ProductCard({ product }) {
  const { add } = useCart();
  const out = product.stock <= 0;

  return (
    <div className="card">
      <Link to={`/product/${product.id}`}>
        <img src={product.image} alt={product.name} loading="lazy" />
      </Link>
      <div className="card-body">
        <span className="tag">{product.category}</span>
        <h3>
          <Link to={`/product/${product.id}`}>{product.name}</Link>
        </h3>
        <p className="price">{formatPrice(product.price)}</p>
        <button className="btn primary" disabled={out} onClick={() => add(product)}>
          {out ? 'Out of stock' : 'Add to cart'}
        </button>
      </div>
    </div>
  );
}
