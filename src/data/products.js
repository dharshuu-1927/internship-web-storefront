// Mock catalog. Images use picsum.photos placeholders (seeded so they stay stable).
const img = (keyword) => {
  const images = {
    'tshirt': 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400',
    'denim,jacket': 'https://images.unsplash.com/photo-1551028719-00167b16eac5?w=400',
    'linen,shirt': 'https://images.unsplash.com/photo-1598033129183-c4f50c736f10?w=400',
    'kurta': 'https://images.unsplash.com/photo-1597983073493-88cd35cf93b0?w=400',
    'running,shoes': 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400',
    'sandals': 'https://images.unsplash.com/photo-1603487742131-4160ec999306?w=400',
    'sneakers': 'https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400',
    'loafers,shoes': 'https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400',
    'wallet': 'https://images.unsplash.com/photo-1627123424574-724758594e93?w=400',
    'wristwatch': 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400',
    'sunglasses': 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400',
    'tote,bag': 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=400',
    'bedsheet': 'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400',
    'coffee,mug': 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=400',
    'candle': 'https://images.unsplash.com/photo-1603006905003-be475563bc59?w=400',
    'wall,clock': 'https://images.unsplash.com/photo-1563861826100-9cb868fdbe1c?w=400',
  };

  return images[keyword] || '';
};

export const categories = ['Clothing', 'Footwear', 'Accessories', 'Home'];

export const initialProducts = [
  { id: 1, name: 'Cotton T-Shirt', price: 499, category: 'Clothing', stock: 40, image: img('tshirt'), description: 'Soft everyday cotton tee, available in multiple colours.' },
  { id: 2, name: 'Denim Jacket', price: 1999, category: 'Clothing', stock: 12, image: img('denim,jacket'), description: 'Classic blue denim jacket with a relaxed fit.' },
  { id: 3, name: 'Linen Shirt', price: 899, category: 'Clothing', stock: 25, image: img('linen,shirt'), description: 'Breathable linen shirt, perfect for summer.' },
  { id: 4, name: 'Printed Kurta', price: 1199, category: 'Clothing', stock: 18, image: img('kurta'), description: 'Hand-block printed kurta in pure cotton.' },
  { id: 5, name: 'Running Shoes', price: 2499, category: 'Footwear', stock: 15, image: img('running,shoes'), description: 'Lightweight running shoes with cushioned sole.' },
  { id: 6, name: 'Leather Sandals', price: 1299, category: 'Footwear', stock: 20, image: img('sandals'), description: 'Handmade leather sandals with a comfortable footbed.' },
  { id: 7, name: 'Canvas Sneakers', price: 1499, category: 'Footwear', stock: 30, image: img('sneakers'), description: 'Casual canvas sneakers for daily wear.' },
  { id: 8, name: 'Formal Loafers', price: 2199, category: 'Footwear', stock: 8, image: img('loafers,shoes'), description: 'Polished loafers for office and events.' },
  { id: 9, name: 'Leather Wallet', price: 699, category: 'Accessories', stock: 50, image: img('wallet'), description: 'Slim bifold wallet with card slots.' },
  { id: 10, name: 'Analog Watch', price: 2999, category: 'Accessories', stock: 10, image: img('wristwatch'), description: 'Minimal analog watch with leather strap.' },
  { id: 11, name: 'Sunglasses', price: 799, category: 'Accessories', stock: 35, image: img('sunglasses'), description: 'UV-protected sunglasses with a lightweight frame.' },
  { id: 12, name: 'Tote Bag', price: 599, category: 'Accessories', stock: 45, image: img('tote,bag'), description: 'Sturdy canvas tote bag for everyday carry.' },
  { id: 13, name: 'Cotton Bedsheet Set', price: 1599, category: 'Home', stock: 14, image: img('bedsheet'), description: 'Double bedsheet with two pillow covers.' },
  { id: 14, name: 'Ceramic Mug', price: 249, category: 'Home', stock: 60, image: img('coffee,mug'), description: 'Hand-glazed ceramic mug, 300 ml.' },
  { id: 15, name: 'Scented Candle', price: 399, category: 'Home', stock: 0, image: img('candle'), description: 'Soy wax candle with lavender fragrance.' },
  { id: 16, name: 'Wall Clock', price: 1099, category: 'Home', stock: 9, image: img('wall,clock'), description: 'Wooden wall clock with silent movement.' },
];

export const initialOrders = [
  { id: 'ORD-1001', customer: 'Anita R', date: '2026-10-01', items: 2, total: 1498, status: 'Delivered' },
  { id: 'ORD-1002', customer: 'Karthik S', date: '2026-10-03', items: 1, total: 2499, status: 'Shipped' },
  { id: 'ORD-1003', customer: 'Meena P', date: '2026-10-05', items: 3, total: 2097, status: 'Processing' },
  { id: 'ORD-1004', customer: 'dilip D', date: '2026-10-07', items: 1, total: 2999, status: 'Processing' },
  { id: 'ORD-1005', customer: 'Dharshu D', date: '2026-10-08', items: 4, total: 3196, status: 'Pending' },
];
