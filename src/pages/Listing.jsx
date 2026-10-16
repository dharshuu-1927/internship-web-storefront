import { useSearchParams } from 'react-router-dom';
import { getProducts } from '../api/mockApi';
import { categories } from '../data/products';
import useAsync from '../hooks/useAsync';
import ProductCard from '../components/ProductCard';
import { Loading, ErrorBox, Empty } from '../components/Status';

export default function Listing() {
  const [params, setParams] = useSearchParams();
  const search = params.get('q') || '';
  const category = params.get('category') || '';

  const { data, loading, error, reload } = useAsync(
    () => getProducts({ search, category }),
    [search, category]
  );

  const update = (key, value) => {
    const next = new URLSearchParams(params);
    if (value) next.set(key, value);
    else next.delete(key);
    setParams(next, { replace: true });
  };

  return (
    <>
      <h1>All products</h1>
      <div className="filters">
        <input
          type="search"
          placeholder="Search products…"
          value={search}
          onChange={(e) => update('q', e.target.value)}
          aria-label="Search products"
        />
        <select value={category} onChange={(e) => update('category', e.target.value)} aria-label="Filter by category">
          <option value="">All categories</option>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>
      </div>

      {loading && <Loading />}
      {error && <ErrorBox message={error} onRetry={reload} />}
      {data && data.length === 0 && <Empty text="No products match your search." />}
      {data && data.length > 0 && (
        <div className="grid">
          {data.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      )}
    </>
  );
}
