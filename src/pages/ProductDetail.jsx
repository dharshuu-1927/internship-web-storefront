import { Link, useParams } from 'react-router-dom';
import { getProduct } from '../api/mockApi';
import useAsync from '../hooks/useAsync';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../components/ProductCard';
import { Loading, ErrorBox } from '../components/Status';

export default function ProductDetail() {
  const { id } = useParams();
  const { add } = useCart();
  const { data: p, loading, error, reload } = useAsync(() => getProduct(id), [id]);

  if (loading) return <Loading />;
  if (error) return <ErrorBox message={error} onRetry={reload} />;

  const out = p.stock <= 0;
  return (
    <>
      <p><Link to="/products">← Back to products</Link></p>
      <div className="detail">
        <img src={p.image} alt={p.name} />
        <div>
          <span className="tag">{p.category}</span>
          <h1>{p.name}</h1>
          <p className="price big">{formatPrice(p.price)}</p>
          <p>{p.description}</p>
          <p className={out ? 'stock out' : 'stock'}>{out ? 'Out of stock' : `${p.stock} in stock`}</p>
          <button className="btn primary" disabled={out} onClick={() => add(p)}>
            Add to cart
          </button>
        </div>
      </div>
    </>
  );
}
