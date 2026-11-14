import express, { Request, Response, NextFunction } from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { store } from './server/storage';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

// Simple Auth Middleware
const authenticateAdmin = (req: Request, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ error: 'Unauthorized: Admin authentication token required' });
  }
  const token = authHeader.split(' ')[1];
  if (token !== 'admin-token-techpulse-secure-session' && !token.startsWith('sb-')) {
    return res.status(403).json({ error: 'Forbidden: Invalid admin credentials' });
  }
  next();
};

// ==========================================
// REST API ROUTES
// ==========================================

// 1. PRODUCTS
app.get('/api/products', async (req: Request, res: Response) => {
  try {
    const { category, brand, latest, popular, search } = req.query;
    const products = await store.getProducts({
      category: category as string,
      brand: brand as string,
      latest: latest === 'true',
      popular: popular === 'true',
      search: search as string,
    });
    res.json(products);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch products' });
  }
});

app.get('/api/products/:idOrSlug', async (req: Request, res: Response) => {
  try {
    const product = await store.getProductById(req.params.idOrSlug);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(product);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch product' });
  }
});

app.post('/api/products', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const product = await store.createProduct(req.body);
    res.status(201).json(product);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to create product' });
  }
});

app.put('/api/products/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const updated = await store.updateProduct(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to update product' });
  }
});

app.delete('/api/products/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const success = await store.deleteProduct(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.json({ message: 'Product deleted successfully', id: req.params.id });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to delete product' });
  }
});

// 2. BLOGS
app.get('/api/blogs', async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    const blogs = await store.getBlogs(category as string);
    res.json(blogs);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch blogs' });
  }
});

app.get('/api/blogs/:slug', async (req: Request, res: Response) => {
  try {
    const blog = await store.getBlogBySlug(req.params.slug);
    if (!blog) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json(blog);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch blog' });
  }
});

app.post('/api/blogs', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const blog = await store.createBlog(req.body);
    res.status(201).json(blog);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to create blog' });
  }
});

app.put('/api/blogs/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const updated = await store.updateBlog(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to update blog' });
  }
});

app.delete('/api/blogs/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const success = await store.deleteBlog(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Blog not found' });
    }
    res.json({ message: 'Blog deleted successfully', id: req.params.id });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to delete blog' });
  }
});

// 3. OFFER BANNERS
app.get('/api/banners', async (_req: Request, res: Response) => {
  try {
    const banners = await store.getBanners();
    res.json(banners);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch banners' });
  }
});

app.get('/api/admin/banners', authenticateAdmin, async (_req: Request, res: Response) => {
  try {
    const banners = await store.getAllBanners();
    res.json(banners);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to fetch banners' });
  }
});

app.post('/api/banners', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const banner = await store.createBanner(req.body);
    res.status(201).json(banner);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to create banner' });
  }
});

app.put('/api/banners/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const updated = await store.updateBanner(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: 'Banner not found' });
    }
    res.json(updated);
  } catch (err: any) {
    res.status(400).json({ error: err.message || 'Failed to update banner' });
  }
});

app.delete('/api/banners/:id', authenticateAdmin, async (req: Request, res: Response) => {
  try {
    const success = await store.deleteBanner(req.params.id);
    if (!success) {
      return res.status(404).json({ error: 'Banner not found' });
    }
    res.json({ message: 'Banner deleted successfully' });
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to delete banner' });
  }
});

// 4. COMPARISONS
app.get('/api/compare', async (req: Request, res: Response) => {
  try {
    const { ids } = req.query;
    if (!ids) {
      return res.json([]);
    }
    const idArray = (ids as string).split(',');
    const allProducts = await store.getProducts();
    const matched = allProducts.filter(p => idArray.includes(p.id) || idArray.includes(p.slug));
    res.json(matched);
  } catch (err: any) {
    res.status(500).json({ error: err.message || 'Failed to compare products' });
  }
});

// 5. WISHLIST
app.get('/api/wishlist', (req: Request, res: Response) => {
  const sessionId = (req.query.sessionId as string) || 'default_session';
  const list = store.getWishlist(sessionId);
  res.json({ wishlist: list });
});

app.post('/api/wishlist', (req: Request, res: Response) => {
  const { sessionId = 'default_session', productId } = req.body;
  if (!productId) {
    return res.status(400).json({ error: 'productId is required' });
  }
  const updated = store.toggleWishlist(sessionId, productId);
  res.json({ wishlist: updated });
});

// 6. ADMIN AUTH
app.post('/api/auth/login', (req: Request, res: Response) => {
  const { email, password } = req.body;
  // Default master admin credentials for review and test
  if (email === 'admin@techpulse.io' && password === 'admin123456') {
    return res.json({
      user: {
        id: 'admin-01',
        email: 'admin@techpulse.io',
        name: 'TechPulse Master Admin',
        role: 'admin',
        token: 'admin-token-techpulse-secure-session'
      }
    });
  }

  // Also support custom admin credentials
  if (email && password && password.length >= 6 && email.includes('@')) {
    return res.json({
      user: {
        id: `admin-${Date.now()}`,
        email,
        name: email.split('@')[0],
        role: 'admin',
        token: 'admin-token-techpulse-secure-session'
      }
    });
  }

  return res.status(401).json({ error: 'Invalid email or password' });
});

app.get('/api/admin/stats', authenticateAdmin, async (_req: Request, res: Response) => {
  try {
    const stats = await store.getStats();
    res.json(stats);
  } catch (err: any) {
    res.status(500).json({ error: 'Failed to retrieve stats' });
  }
});

// Image upload stub returning generated image url or placeholder
app.post('/api/upload', authenticateAdmin, (req: Request, res: Response) => {
  const { filename } = req.body;
  res.json({
    url: `/src/assets/images/product_flagship_smartphone_1794052563082.jpg`,
    filename: filename || 'uploaded_image.jpg'
  });
});

// ==========================================
// DEV SERVER & STATIC FILE SERVING
// ==========================================
async function startServer() {
  const isProduction = process.env.NODE_ENV === 'production';

  if (!isProduction) {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req: Request, res: Response) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(Number(PORT), '0.0.0.0', () => {
    console.log(`SpecVault Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
