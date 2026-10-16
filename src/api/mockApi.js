// Mock API: every call is async, has a small delay (so loading states show),
// and can fail on demand (so error states can be tested).
import { initialProducts, initialOrders } from '../data/products';

const STORAGE_KEY = 'mock-products-v1';
const DELAY_MS = 600;

// Set to true (or add ?fail=1 to the URL) to simulate server errors.
const shouldFail = () => new URLSearchParams(window.location.search).get('fail') === '1';

const wait = (ms = DELAY_MS) => new Promise((r) => setTimeout(r, ms));

function load() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) return JSON.parse(raw);
  } catch { /* ignore */ }
  return [...initialProducts];
}

function save(list) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  } catch { /* ignore, e.g. image too large */ }
}

async function guard() {
  await wait();
  if (shouldFail()) throw new Error('Could not reach the server. Please try again.');
}

export async function getProducts({ search = '', category = '' } = {}) {
  await guard();
  const q = search.trim().toLowerCase();
  return load().filter((p) => {
    const matchesSearch = !q || p.name.toLowerCase().includes(q) || p.description.toLowerCase().includes(q);
    const matchesCategory = !category || p.category === category;
    return matchesSearch && matchesCategory;
  });
}

export async function getProduct(id) {
  await guard();
  const product = load().find((p) => p.id === Number(id));
  if (!product) throw new Error('Product not found.');
  return product;
}

export async function addProduct(data) {
  await guard();
  const list = load();
  const id = list.reduce((m, p) => Math.max(m, p.id), 0) + 1;
  const product = { ...data, id, price: Number(data.price), stock: Number(data.stock) };
  save([...list, product]);
  return product;
}

export async function updateProduct(id, data) {
  await guard();
  const list = load();
  const idx = list.findIndex((p) => p.id === Number(id));
  if (idx === -1) throw new Error('Product not found.');
  list[idx] = { ...list[idx], ...data, id: Number(id), price: Number(data.price), stock: Number(data.stock) };
  save(list);
  return list[idx];
}

export async function getOrders() {
  await guard();
  return initialOrders;
}

// Seller login: any non-empty email with the demo password works.
export const DEMO_EMAIL = 'seller@shop.com';
export const DEMO_PASSWORD = 'seller123';

export async function loginSeller(email, password) {
  await wait(400);
  if (email === DEMO_EMAIL && password === DEMO_PASSWORD) return { email };
  throw new Error('Invalid email or password.');
}
