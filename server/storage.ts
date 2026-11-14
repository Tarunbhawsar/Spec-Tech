import { Product, Blog, OfferBanner } from '../src/types';
import { INITIAL_PRODUCTS, INITIAL_BLOGS, INITIAL_OFFER_BANNERS } from '../src/data/mockData';
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY;

export const supabaseServer: SupabaseClient | null = (supabaseUrl && supabaseKey)
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// Persistent in-memory data store for the backend
class DataStore {
  private products: Product[] = [...INITIAL_PRODUCTS];
  private blogs: Blog[] = [...INITIAL_BLOGS];
  private banners: OfferBanner[] = [...INITIAL_OFFER_BANNERS];
  private wishlists: Record<string, string[]> = {}; // sessionId -> productIds[]

  // PRODUCTS
  async getProducts(params?: { category?: string; brand?: string; latest?: boolean; popular?: boolean; search?: string }): Promise<Product[]> {
    if (supabaseServer) {
      try {
        let query = supabaseServer.from('products').select('*, product_specifications(*), product_images(*)');
        if (params?.category) query = query.eq('category_type', params.category);
        if (params?.brand) query = query.ilike('brand_name', `%${params.brand}%`);
        if (params?.latest) query = query.eq('is_latest', true);
        if (params?.popular) query = query.eq('is_popular', true);
        const { data, error } = await query;
        if (!error && data && data.length > 0) {
          return data.map((item: any) => ({
            id: item.id,
            name: item.name,
            slug: item.slug,
            brand: item.brand_name,
            category: item.category_type,
            price: Number(item.price),
            originalPrice: item.original_price ? Number(item.original_price) : undefined,
            currency: item.currency || 'INR',
            rating: Number(item.rating) || 4.8,
            reviewsCount: item.reviews_count || 100,
            isLatest: Boolean(item.is_latest),
            isPopular: Boolean(item.is_popular),
            isFeatured: Boolean(item.is_featured),
            affiliateUrl: item.affiliate_url,
            affiliateVendor: item.affiliate_vendor || 'Amazon',
            shortDescription: item.short_description,
            description: item.description,
            highlights: item.highlights || [],
            pros: item.pros || [],
            cons: item.cons || [],
            images: item.product_images?.map((img: any) => img.image_url) || [],
            specs: item.product_specifications?.[0] || {},
            createdAt: item.created_at
          }));
        }
      } catch (err) {
        console.warn('Supabase query error, falling back to local store:', err);
      }
    }

    let result = [...this.products];
    if (params?.category) {
      result = result.filter(p => p.category === params.category);
    }
    if (params?.brand) {
      result = result.filter(p => p.brand.toLowerCase() === params.brand?.toLowerCase());
    }
    if (params?.latest) {
      result = result.filter(p => p.isLatest);
    }
    if (params?.popular) {
      result = result.filter(p => p.isPopular);
    }
    if (params?.search) {
      const q = params.search.toLowerCase();
      result = result.filter(p => p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q));
    }
    return result;
  }

  async getProductById(idOrSlug: string): Promise<Product | null> {
    const list = await this.getProducts();
    const item = list.find(p => p.id === idOrSlug || p.slug === idOrSlug);
    return item || null;
  }

  async createProduct(product: Omit<Product, 'id' | 'createdAt'>): Promise<Product> {
    const newProduct: Product = {
      ...product,
      id: `prod-${Date.now()}`,
      createdAt: new Date().toISOString()
    };
    this.products.unshift(newProduct);
    return newProduct;
  }

  async updateProduct(id: string, updates: Partial<Product>): Promise<Product | null> {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return null;
    this.products[index] = { ...this.products[index], ...updates };
    return this.products[index];
  }

  async deleteProduct(id: string): Promise<boolean> {
    const prevLen = this.products.length;
    this.products = this.products.filter(p => p.id !== id);
    return this.products.length < prevLen;
  }

  // BLOGS
  async getBlogs(category?: string): Promise<Blog[]> {
    let result = [...this.blogs];
    if (category && category !== 'All Categories') {
      result = result.filter(b => b.category.toLowerCase() === category.toLowerCase());
    }
    return result;
  }

  async getBlogBySlug(slug: string): Promise<Blog | null> {
    return this.blogs.find(b => b.slug === slug || b.id === slug) || null;
  }

  async createBlog(blog: Omit<Blog, 'id' | 'publishedAt'>): Promise<Blog> {
    const newBlog: Blog = {
      ...blog,
      id: `blog-${Date.now()}`,
      publishedAt: new Date().toISOString().split('T')[0],
      status: blog.status || 'published'
    };
    this.blogs.unshift(newBlog);
    return newBlog;
  }

  async updateBlog(id: string, updates: Partial<Blog>): Promise<Blog | null> {
    const index = this.blogs.findIndex(b => b.id === id);
    if (index === -1) return null;
    this.blogs[index] = { ...this.blogs[index], ...updates };
    return this.blogs[index];
  }

  async deleteBlog(id: string): Promise<boolean> {
    const prevLen = this.blogs.length;
    this.blogs = this.blogs.filter(b => b.id !== id);
    return this.blogs.length < prevLen;
  }

  // BANNERS
  async getBanners(): Promise<OfferBanner[]> {
    return this.banners.filter(b => b.active);
  }

  async getAllBanners(): Promise<OfferBanner[]> {
    return this.banners;
  }

  async createBanner(banner: Omit<OfferBanner, 'id'>): Promise<OfferBanner> {
    const newBanner: OfferBanner = {
      ...banner,
      id: `banner-${Date.now()}`
    };
    this.banners.push(newBanner);
    return newBanner;
  }

  async updateBanner(id: string, updates: Partial<OfferBanner>): Promise<OfferBanner | null> {
    const index = this.banners.findIndex(b => b.id === id);
    if (index === -1) return null;
    this.banners[index] = { ...this.banners[index], ...updates };
    return this.banners[index];
  }

  async deleteBanner(id: string): Promise<boolean> {
    const prevLen = this.banners.length;
    this.banners = this.banners.filter(b => b.id !== id);
    return this.banners.length < prevLen;
  }

  // WISHLIST
  getWishlist(sessionId: string): string[] {
    return this.wishlists[sessionId] || [];
  }

  toggleWishlist(sessionId: string, productId: string): string[] {
    if (!this.wishlists[sessionId]) {
      this.wishlists[sessionId] = [];
    }
    const exists = this.wishlists[sessionId].includes(productId);
    if (exists) {
      this.wishlists[sessionId] = this.wishlists[sessionId].filter(id => id !== productId);
    } else {
      this.wishlists[sessionId].push(productId);
    }
    return this.wishlists[sessionId];
  }

  // STATS
  async getStats() {
    const mobiles = this.products.filter(p => p.category === 'mobiles').length;
    const laptops = this.products.filter(p => p.category === 'laptops').length;
    return {
      totalProducts: this.products.length,
      totalMobiles: mobiles,
      totalLaptops: laptops,
      totalBlogs: this.blogs.length,
      totalCategories: 2,
      totalBrands: Array.from(new Set(this.products.map(p => p.brand))).length
    };
  }
}

export const store = new DataStore();
