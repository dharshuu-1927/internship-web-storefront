import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { addProduct, getProduct, updateProduct } from '../../api/mockApi';
import { categories } from '../../data/products';
import { Loading, ErrorBox } from '../../components/Status';

const empty = { name: '', price: '', category: categories[0], stock: '', description: '', image: '' };
const MAX_IMAGE_BYTES = 300 * 1024; // keep small so it fits in localStorage

export default function ProductForm() {
  const { id } = useParams();
  const editing = Boolean(id);
  const navigate = useNavigate();

  const [form, setForm] = useState(empty);
  const [loading, setLoading] = useState(editing);
  const [loadError, setLoadError] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  const load = () => {
    setLoading(true);
    setLoadError('');
    getProduct(id)
      .then((p) => setForm(p))
      .catch((e) => setLoadError(e.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (editing) load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: e.target.value }));

  const onImage = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!file.type.startsWith('image/')) return setError('Please choose an image file.');
    if (file.size > MAX_IMAGE_BYTES) return setError('Image is too large. Please use one under 300 KB.');
    setError('');
    const reader = new FileReader();
    reader.onload = () => setForm((f) => ({ ...f, image: reader.result }));
    reader.readAsDataURL(file);
  };

  const submit = async (e) => {
    e.preventDefault();
    if (!form.image) return setError('Please upload a product image.');
    if (Number(form.price) <= 0) return setError('Price must be greater than 0.');
    if (Number(form.stock) < 0) return setError('Stock cannot be negative.');
    setSaving(true);
    setError('');
    try {
      if (editing) await updateProduct(id, form);
      else await addProduct(form);
      navigate('/admin');
    } catch (err) {
      setError(err.message);
      setSaving(false);
    }
  };

  if (loading) return <Loading />;
  if (loadError) return <ErrorBox message={loadError} onRetry={load} />;

  return (
    <>
      <p><Link to="/admin">← Back to products</Link></p>
      <h1>{editing ? 'Edit product' : 'Add product'}</h1>
      <form className="form" onSubmit={submit}>
        <label>
          Name
          <input value={form.name} onChange={set('name')} required />
        </label>
        <div className="two-col">
          <label>
            Price (₹)
            <input type="number" min="1" value={form.price} onChange={set('price')} required />
          </label>
          <label>
            Stock
            <input type="number" min="0" value={form.stock} onChange={set('stock')} required />
          </label>
        </div>
        <label>
          Category
          <select value={form.category} onChange={set('category')}>
            {categories.map((c) => <option key={c}>{c}</option>)}
          </select>
        </label>
        <label>
          Description
          <textarea rows="3" value={form.description} onChange={set('description')} required />
        </label>
        <label>
          Image
          <input type="file" accept="image/*" onChange={onImage} />
        </label>
        {form.image && <img className="preview" src={form.image} alt="Preview" />}
        {error && <p className="form-error" role="alert">{error}</p>}
        <button className="btn primary" disabled={saving}>
          {saving ? 'Saving…' : editing ? 'Save changes' : 'Add product'}
        </button>
      </form>
    </>
  );
}
