import { Link, NavLink, Outlet } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function StoreLayout() {
  const { count } = useCart();

  const subscribe = (e) => {
    e.preventDefault();
    alert('Thanks for subscribing!');
    e.target.reset();
  };

  return (
    <>
      <header className="header">
        <div className="container header-inner">
          <Link to="/" className="logo">
            🛍️EveryKart
          </Link>
          <nav>
            <NavLink to="/" end>Home</NavLink>
            <NavLink to="/products">Shop</NavLink>
            <NavLink to="/cart">Cart ({count})</NavLink>
            <NavLink to="/admin">Seller</NavLink>
          </nav>
        </div>
      </header>

      <main className="container">
        <Outlet />
      </main>

      <footer className="site-footer">
        <div className="container footer-top">
          <div className="f-col f-brand">
            <h3>EveryKart</h3>
            <p>Quality products from local sellers, delivered to your door.</p>
            <div className="f-social">
              <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
              <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
              <a href="https://youtube.com" target="_blank" rel="noreferrer">YouTube</a>
            </div>
          </div>

          <div className="f-col">
            <h4>Shop</h4>
            <Link to="/products?category=Clothing">Clothing</Link>
            <Link to="/products?category=Footwear">Footwear</Link>
            <Link to="/products?category=Accessories">Accessories</Link>
            <Link to="/products?category=Home">Home</Link>
          </div>

          <div className="f-col">
            <h4>Customer care</h4>
            <a href="mailto:support@everykart.demo">support@everykart.demo</a>
            <a href="tel:+919000000000">+91 90000 00000</a>
            <span>Mon to Sat, 9 AM to 6 PM IST</span>
            <span>Chennai, Tamil Nadu, India</span>
          </div>

          <div className="f-col">
            <h4>Sell with us</h4>
            <Link to="/admin">Seller login</Link>
            <Link to="/cart">Your cart</Link>
            <h4 className="f-news-title">Newsletter</h4>
            <form className="f-news" onSubmit={subscribe}>
              <input type="email" placeholder="Your email" required />
              <button className="btn primary">Join</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} EveryKart. Demo project, mock data only.</span>
          <span>UPI · Cards · Net Banking · Cash on Delivery</span>
        </div>
      </footer>
    </>
  );
}