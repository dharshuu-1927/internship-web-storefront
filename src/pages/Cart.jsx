import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { formatPrice } from '../components/ProductCard';
import { Empty } from '../components/Status';

export default function Cart() {
  const { items, setQty, remove, clear, total } = useCart();

  if (items.length === 0) {
    return (
      <>
        <h1>Your cart</h1>
        <Empty text="Your cart is empty." />
        <Link to="/products" className="btn primary">Continue shopping</Link>
      </>
    );
  }

  return (
    <>
      <h1>Your cart</h1>
      <div className="cart-list">
        {items.map((i) => (
          <div className="cart-row" key={i.id}>
            <img src={i.image} alt={i.name} />
            <div className="cart-info">
              <strong>{i.name}</strong>
              <span>{formatPrice(i.price)}</span>
            </div>
            <div className="qty">
              <button className="btn" onClick={() => setQty(i.id, i.qty - 1)} aria-label="Decrease quantity">−</button>
              <span>{i.qty}</span>
              <button className="btn" onClick={() => setQty(i.id, i.qty + 1)} aria-label="Increase quantity">+</button>
            </div>
            <strong className="line-total">{formatPrice(i.price * i.qty)}</strong>
            <button className="btn danger" onClick={() => remove(i.id)}>Remove</button>
          </div>
        ))}
      </div>
      <div className="cart-summary">
        <h2>Total: {formatPrice(total)}</h2>
        <button className="btn" onClick={clear}>Clear cart</button>
        <button className="btn primary" disabled title="Checkout is out of scope for this task">
          Checkout (not available)
        </button>
      </div>
    </>
  );
}
