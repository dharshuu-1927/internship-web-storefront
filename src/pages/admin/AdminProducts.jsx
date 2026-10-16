import { Link } from 'react-router-dom';
import { getProducts } from '../../api/mockApi';
import useAsync from '../../hooks/useAsync';
import { formatPrice } from '../../components/ProductCard';
import { Loading, ErrorBox, Empty } from '../../components/Status';

export default function AdminProducts() {
  const { data, loading, error, reload } = useAsync(() => getProducts(), []);

  return (
    <>
      <div className="row-between">
        <h1>Products</h1>
        <Link to="/admin/products/new" className="btn primary">+ Add product</Link>
      </div>

      {loading && <Loading />}
      {error && <ErrorBox message={error} onRetry={reload} />}
      {data && data.length === 0 && <Empty text="No products yet." />}
      {data && data.length > 0 && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Stock</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {data.map((p) => (
                <tr key={p.id}>
                  <td><img className="thumb" src={p.image} alt={p.name} /></td>
                  <td>{p.name}</td>
                  <td>{p.category}</td>
                  <td>{formatPrice(p.price)}</td>
                  <td>{p.stock}</td>
                  <td><Link className="btn" to={`/admin/products/${p.id}/edit`}>Edit</Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
