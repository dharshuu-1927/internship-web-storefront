import { getOrders } from '../../api/mockApi';
import useAsync from '../../hooks/useAsync';
import { formatPrice } from '../../components/ProductCard';
import { Loading, ErrorBox, Empty } from '../../components/Status';

export default function AdminOrders() {
  const { data, loading, error, reload } = useAsync(() => getOrders(), []);

  return (
    <>
      <h1>Orders</h1>
      {loading && <Loading />}
      {error && <ErrorBox message={error} onRetry={reload} />}
      {data && data.length === 0 && <Empty text="No orders yet." />}
      {data && data.length > 0 && (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Order</th>
                <th>Customer</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {data.map((o) => (
                <tr key={o.id}>
                  <td>{o.id}</td>
                  <td>{o.customer}</td>
                  <td>{o.date}</td>
                  <td>{o.items}</td>
                  <td>{formatPrice(o.total)}</td>
                  <td><span className={`badge ${o.status.toLowerCase()}`}>{o.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </>
  );
}
