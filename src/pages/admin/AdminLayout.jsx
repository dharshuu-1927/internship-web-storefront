import { Link, NavLink, Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function AdminLayout() {
  const { seller, logout } = useAuth();
  if (!seller) return <Navigate to="/admin/login" replace />;

  return (
    <>
      <header className="header admin">
        <div className="container header-inner">
          <Link to="/admin" className="logo">Seller Admin</Link>
          <nav>
            <NavLink to="/admin" end>Products</NavLink>
            <NavLink to="/admin/orders">Orders</NavLink>
            <Link to="/">Storefront</Link>
            <button className="btn" onClick={logout}>Log out</button>
          </nav>
        </div>
      </header>
      <main className="container">
        <Outlet />
      </main>
    </>
  );
}
