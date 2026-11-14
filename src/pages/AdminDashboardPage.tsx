import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Product, Blog, OfferBanner, ProductCategory } from '../types';
import { formatINR } from '../utils/format';
import { 
  ShieldCheck, 
  Layers, 
  Smartphone, 
  Laptop, 
  BookOpen, 
  Plus, 
  Trash2, 
  Edit3, 
  Save, 
  X, 
  Check, 
  ExternalLink, 
  LogOut, 
  Sparkles,
  Tag,
  DollarSign,
  TrendingUp,
  Image as ImageIcon
} from 'lucide-react';

export const AdminDashboardPage: React.FC = () => {
  const { 
    adminUser, 
    logoutAdmin, 
    navigate, 
    products, 
    blogs, 
    refreshProducts, 
    refreshBlogs, 
    showToast 
  } = useApp();

  // If user is not admin, redirect to login
  useEffect(() => {
    if (!adminUser) {
      navigate('admin-login');
    }
  }, [adminUser, navigate]);

  const [activeTab, setActiveTab] = useState<'overview' | 'products' | 'blogs' | 'banners'>('overview');
  const [stats, setStats] = useState({
    totalProducts: products.length,
    totalMobiles: products.filter(p => p.category === 'mobiles').length,
    totalLaptops: products.filter(p => p.category === 'laptops').length,
    totalBlogs: blogs.length,
    totalCategories: 2
  });

  // Fetch live stats from API
  useEffect(() => {
    if (!adminUser) return;
    fetch('/api/admin/stats', {
      headers: { Authorization: `Bearer ${adminUser.token}` }
    })
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (data) setStats(data);
      })
      .catch(() => {});
  }, [adminUser, products, blogs]);

  // Product Modal State
  const [productModalOpen, setProductModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [productForm, setProductForm] = useState({
    name: '',
    brand: 'Apple',
    category: 'mobiles' as ProductCategory,
    price: 79999,
    originalPrice: 89999,
    affiliateVendor: 'Amazon' as Product['affiliateVendor'],
    affiliateUrl: '',
    shortDescription: '',
    description: '',
    isLatest: true,
    isPopular: false,
    image: '/src/assets/images/product_flagship_smartphone_1794052563082.jpg',
    processor: '',
    ram: '16GB',
    storage: '256GB',
    camera: '50MP Main',
    graphics: 'NVIDIA RTX 4070',
    display: '6.8" 120Hz OLED',
    battery: '5000 mAh',
    os: 'Android 15'
  });

  // Blog Modal State
  const [blogModalOpen, setBlogModalOpen] = useState(false);
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null);
  const [blogForm, setBlogForm] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Latest Technology',
    authorName: 'TechPulse Analyst',
    authorRole: 'Hardware Specialist',
    thumbnail: '/src/assets/images/hero_flagship_phone_1794052561714.jpg',
    readTime: '5 min read',
    status: 'published' as 'published' | 'draft'
  });

  // Offer Banners State
  const [banners, setBanners] = useState<OfferBanner[]>([]);
  const [bannerModalOpen, setBannerModalOpen] = useState(false);
  const [bannerForm, setBannerForm] = useState({
    title: '',
    subtitle: '',
    badge: 'Limited Flagship Deal',
    price: 1199,
    originalPrice: 1299,
    ctaText: 'Claim Amazon Deal',
    ctaLink: 'https://amazon.com',
    image: '/src/assets/images/hero_flagship_phone_1794052561714.jpg',
    category: 'mobiles' as ProductCategory,
    active: true
  });

  // Load Banners
  const loadBanners = async () => {
    if (!adminUser) return;
    try {
      const res = await fetch('/api/admin/banners', {
        headers: { Authorization: `Bearer ${adminUser.token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setBanners(data);
      }
    } catch {}
  };

  useEffect(() => {
    loadBanners();
  }, [adminUser]);

  // Handle Product Save
  const handleSaveProduct = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUser) return;

    const payload = {
      name: productForm.name,
      slug: productForm.name.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      brand: productForm.brand,
      category: productForm.category,
      price: Number(productForm.price),
      originalPrice: productForm.originalPrice ? Number(productForm.originalPrice) : undefined,
      currency: 'USD',
      rating: 4.8,
      reviewsCount: 150,
      isLatest: productForm.isLatest,
      isPopular: productForm.isPopular,
      affiliateUrl: productForm.affiliateUrl || 'https://amazon.com',
      affiliateVendor: productForm.affiliateVendor,
      shortDescription: productForm.shortDescription,
      description: productForm.description || productForm.shortDescription,
      highlights: ['Laboratory benchmarked', 'Official warranty supported'],
      pros: ['Premium construction', 'Excellent performance efficiency'],
      cons: ['Premium price point'],
      images: [productForm.image],
      specs: productForm.category === 'mobiles' ? {
        ram: productForm.ram,
        storage: productForm.storage,
        processor: productForm.processor,
        display: productForm.display,
        camera: productForm.camera,
        battery: productForm.battery,
        os: productForm.os
      } : {
        ram: productForm.ram,
        storage: productForm.storage,
        processor: productForm.processor,
        graphics: productForm.graphics,
        display: productForm.display,
        displaySize: '16.0"',
        refreshRate: '120Hz',
        laptopType: 'Creator' as const,
        battery: productForm.battery,
        os: productForm.os
      }
    };

    try {
      const url = editingProduct ? `/api/products/${editingProduct.id}` : '/api/products';
      const method = editingProduct ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminUser.token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showToast(editingProduct ? 'Product updated successfully' : 'Product created successfully');
        setProductModalOpen(false);
        setEditingProduct(null);
        await refreshProducts();
      } else {
        throw new Error('Failed to save product');
      }
    } catch (err: any) {
      showToast(err.message || 'Error saving product');
    }
  };

  // Handle Product Delete
  const handleDeleteProduct = async (id: string, name: string) => {
    if (!adminUser) return;
    if (!window.confirm(`Are you sure you want to delete "${name}"?`)) return;

    try {
      const res = await fetch(`/api/products/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminUser.token}` }
      });
      if (res.ok) {
        showToast(`Deleted ${name}`);
        await refreshProducts();
      }
    } catch {
      showToast('Error deleting product');
    }
  };

  // Open Edit Product
  const openEditProduct = (p: Product) => {
    setEditingProduct(p);
    const sp = p.specs as any;
    setProductForm({
      name: p.name,
      brand: p.brand,
      category: p.category,
      price: p.price,
      originalPrice: p.originalPrice || p.price,
      affiliateVendor: p.affiliateVendor,
      affiliateUrl: p.affiliateUrl,
      shortDescription: p.shortDescription,
      description: p.description,
      isLatest: p.isLatest,
      isPopular: p.isPopular,
      image: p.images[0] || '/src/assets/images/product_flagship_smartphone_1794052563082.jpg',
      processor: sp.processor || '',
      ram: sp.ram || '16GB',
      storage: sp.storage || '256GB',
      camera: sp.camera || '50MP Main',
      graphics: sp.graphics || 'NVIDIA RTX 4070',
      display: sp.display || '6.8" 120Hz',
      battery: sp.battery || '5000 mAh',
      os: sp.os || 'Android 15'
    });
    setProductModalOpen(true);
  };

  // Handle Blog Save
  const handleSaveBlog = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUser) return;

    const payload = {
      title: blogForm.title,
      slug: blogForm.title.toLowerCase().replace(/[^a-z0-9]/g, '-'),
      excerpt: blogForm.excerpt,
      content: blogForm.content || `# ${blogForm.title}\n\n${blogForm.excerpt}\n\nDetailed test results incoming.`,
      category: blogForm.category,
      thumbnail: blogForm.thumbnail,
      author: {
        name: blogForm.authorName,
        role: blogForm.authorRole
      },
      readTime: blogForm.readTime,
      tags: ['Hardware', 'Review', blogForm.category],
      status: blogForm.status
    };

    try {
      const url = editingBlog ? `/api/blogs/${editingBlog.id}` : '/api/blogs';
      const method = editingBlog ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminUser.token}`
        },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        showToast(editingBlog ? 'Article updated' : 'Article created');
        setBlogModalOpen(false);
        setEditingBlog(null);
        await refreshBlogs();
      }
    } catch {
      showToast('Error saving article');
    }
  };

  // Handle Blog Delete
  const handleDeleteBlog = async (id: string, title: string) => {
    if (!adminUser) return;
    if (!window.confirm(`Delete article "${title}"?`)) return;

    try {
      const res = await fetch(`/api/blogs/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminUser.token}` }
      });
      if (res.ok) {
        showToast('Article deleted');
        await refreshBlogs();
      }
    } catch {
      showToast('Error deleting article');
    }
  };

  // Handle Banner Save
  const handleSaveBanner = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUser) return;

    try {
      const res = await fetch('/api/banners', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${adminUser.token}`
        },
        body: JSON.stringify(bannerForm)
      });
      if (res.ok) {
        showToast('Offer banner added');
        setBannerModalOpen(false);
        loadBanners();
      }
    } catch {
      showToast('Error adding banner');
    }
  };

  const handleDeleteBanner = async (id: string) => {
    if (!adminUser) return;
    try {
      const res = await fetch(`/api/banners/${id}`, {
        method: 'DELETE',
        headers: { Authorization: `Bearer ${adminUser.token}` }
      });
      if (res.ok) {
        showToast('Banner removed');
        loadBanners();
      }
    } catch {}
  };

  if (!adminUser) return null;

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Admin Top Navigation */}
      <header className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <span className="font-bold text-slate-900 dark:text-white text-sm">
                SpecVault Admin Console
              </span>
              <span className="hidden sm:inline-block ml-2 text-[10px] bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-400 font-semibold px-2 py-0.5 rounded">
                Live REST Server
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs">
            <span className="text-slate-500 hidden sm:inline">
              Logged in as <strong className="text-slate-800 dark:text-slate-200">{adminUser.email}</strong>
            </span>
            <button
              onClick={logoutAdmin}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:text-red-500 hover:border-red-300 transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span>Sign Out</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Navigation Tabs */}
        <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'overview'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <TrendingUp className="w-4 h-4" />
            <span>Overview KPIs</span>
          </button>
          <button
            onClick={() => setActiveTab('products')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'products'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>Products ({products.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('blogs')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'blogs'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <BookOpen className="w-4 h-4" />
            <span>Blogs &amp; Guides ({blogs.length})</span>
          </button>
          <button
            onClick={() => setActiveTab('banners')}
            className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 ${
              activeTab === 'banners'
                ? 'bg-blue-600 text-white'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>Offer Banners ({banners.length})</span>
          </button>
        </div>

        {/* TAB 1: OVERVIEW KPIS */}
        {activeTab === 'overview' && (
          <div className="space-y-8">
            <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Products</span>
                <div className="text-3xl font-extrabold font-mono tabular-nums text-slate-900 dark:text-white mt-1">
                  {stats.totalProducts}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Mobiles</span>
                <div className="text-3xl font-extrabold font-mono tabular-nums text-blue-600 dark:text-blue-400 mt-1">
                  {stats.totalMobiles}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Total Laptops</span>
                <div className="text-3xl font-extrabold font-mono tabular-nums text-purple-600 dark:text-purple-400 mt-1">
                  {stats.totalLaptops}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Published Blogs</span>
                <div className="text-3xl font-extrabold font-mono tabular-nums text-emerald-600 dark:text-emerald-400 mt-1">
                  {stats.totalBlogs}
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xs">
                <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400">Categories</span>
                <div className="text-3xl font-extrabold font-mono tabular-nums text-amber-600 dark:text-amber-400 mt-1">
                  {stats.totalCategories}
                </div>
              </div>
            </div>

            {/* Quick Actions & System Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  Catalog Quick Actions
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => {
                      setEditingProduct(null);
                      setProductForm({
                        name: '',
                        brand: 'Apple',
                        category: 'mobiles',
                        price: 999,
                        originalPrice: 1099,
                        affiliateVendor: 'Amazon',
                        affiliateUrl: '',
                        shortDescription: '',
                        description: '',
                        isLatest: true,
                        isPopular: false,
                        image: '/src/assets/images/product_flagship_smartphone_1794052563082.jpg',
                        processor: 'Apple A18 Pro',
                        ram: '16GB',
                        storage: '256GB',
                        camera: '48MP Triple',
                        graphics: 'Integrated GPU',
                        display: '6.7" 120Hz OLED',
                        battery: '4800 mAh',
                        os: 'iOS 18'
                      });
                      setProductModalOpen(true);
                    }}
                    className="p-3 bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 rounded-xl text-left hover:border-blue-500 transition-colors"
                  >
                    <Smartphone className="w-4 h-4 text-blue-600 mb-1" />
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Add New Device</div>
                    <div className="text-[10px] text-slate-500">Mobiles or Laptops</div>
                  </button>

                  <button
                    onClick={() => {
                      setEditingBlog(null);
                      setBlogForm({
                        title: '',
                        excerpt: '',
                        content: '',
                        category: 'Buying Guides',
                        authorName: 'Senior Reviewer',
                        authorRole: 'Hardware Specialist',
                        thumbnail: '/src/assets/images/hero_creator_laptop_1794052562533.jpg',
                        readTime: '6 min read',
                        status: 'published'
                      });
                      setBlogModalOpen(true);
                    }}
                    className="p-3 bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900/60 rounded-xl text-left hover:border-purple-500 transition-colors"
                  >
                    <BookOpen className="w-4 h-4 text-purple-600 mb-1" />
                    <div className="text-xs font-bold text-slate-900 dark:text-white">Write Tech Guide</div>
                    <div className="text-[10px] text-slate-500">Benchmark deep dives</div>
                  </button>
                </div>
              </div>

              <div className="p-6 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3">
                <h3 className="font-bold text-slate-900 dark:text-white text-sm">
                  Database &amp; Architecture Status
                </h3>
                <div className="text-xs text-slate-600 dark:text-slate-300 space-y-2">
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
                    <span>Database Engine</span>
                    <span className="font-mono text-slate-900 dark:text-white font-semibold">Supabase PostgreSQL Compatible</span>
                  </div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
                    <span>Schema Migration File</span>
                    <span className="font-mono text-blue-600 dark:text-blue-400">/supabase_schema.sql</span>
                  </div>
                  <div className="flex items-center justify-between pb-1.5 border-b border-slate-100 dark:border-slate-800">
                    <span>Row Level Security (RLS)</span>
                    <span className="text-emerald-500 font-semibold flex items-center gap-1">
                      <Check className="w-3.5 h-3.5" /> Enforced
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>Affiliate Partner Tracking</span>
                    <span className="font-mono text-slate-900 dark:text-white">Active (Amazon, Best Buy)</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: PRODUCT MANAGEMENT */}
        {activeTab === 'products' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Product Catalog ({products.length})
                </h2>
                <p className="text-xs text-slate-500">
                  Manage prices, specs, affiliate vendors, and latest/popular flags.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingProduct(null);
                  setProductForm({
                    name: '',
                    brand: 'Apple',
                    category: 'mobiles',
                    price: 999,
                    originalPrice: 1099,
                    affiliateVendor: 'Amazon',
                    affiliateUrl: '',
                    shortDescription: '',
                    description: '',
                    isLatest: true,
                    isPopular: false,
                    image: '/src/assets/images/product_flagship_smartphone_1794052563082.jpg',
                    processor: 'Apple A18 Pro',
                    ram: '16GB',
                    storage: '256GB',
                    camera: '48MP Triple',
                    graphics: 'Integrated GPU',
                    display: '6.7" 120Hz OLED',
                    battery: '4800 mAh',
                    os: 'iOS 18'
                  });
                  setProductModalOpen(true);
                }}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Product</span>
              </button>
            </div>

            <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs">
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left border-collapse">
                  <thead className="bg-slate-50 dark:bg-slate-950/70 border-b border-slate-200 dark:border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                    <tr>
                      <th className="py-3 px-4">Device</th>
                      <th className="py-3 px-4">Category</th>
                      <th className="py-3 px-4">Price</th>
                      <th className="py-3 px-4">Affiliate Vendor</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                    {products.map((p) => (
                      <tr key={p.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                        <td className="py-3 px-4 flex items-center gap-3">
                          <img
                            src={p.images[0]}
                            alt={p.name}
                            className="w-9 h-9 object-contain rounded bg-slate-100 dark:bg-slate-800 p-0.5"
                          />
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">{p.name}</div>
                            <div className="text-[10px] text-slate-400">{p.brand}</div>
                          </div>
                        </td>
                        <td className="py-3 px-4 capitalize">{p.category}</td>
                        <td className="py-3 px-4 font-mono font-bold tabular-nums">
                          {formatINR(p.price)}
                        </td>
                        <td className="py-3 px-4">
                          <span className="font-semibold text-blue-600 dark:text-blue-400">{p.affiliateVendor}</span>
                        </td>
                        <td className="py-3 px-4 space-x-1">
                          {p.isLatest && <span className="text-[10px] bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded font-semibold">Latest</span>}
                          {p.isPopular && <span className="text-[10px] bg-amber-100 dark:bg-amber-950 text-amber-600 dark:text-amber-400 px-1.5 py-0.5 rounded font-semibold">Popular</span>}
                        </td>
                        <td className="py-3 px-4 text-right space-x-2">
                          <button
                            onClick={() => openEditProduct(p)}
                            className="p-1.5 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 rounded-md"
                            title="Edit"
                          >
                            <Edit3 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(p.id, p.name)}
                            className="p-1.5 text-slate-500 hover:text-red-500 rounded-md"
                            title="Delete"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* TAB 3: BLOG MANAGEMENT */}
        {activeTab === 'blogs' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Articles &amp; Buying Guides ({blogs.length})
                </h2>
                <p className="text-xs text-slate-500">
                  Write, edit, and publish hardware benchmark articles and buying guides.
                </p>
              </div>

              <button
                onClick={() => {
                  setEditingBlog(null);
                  setBlogForm({
                    title: '',
                    excerpt: '',
                    content: '',
                    category: 'Latest Technology',
                    authorName: 'TechPulse Analyst',
                    authorRole: 'Hardware Specialist',
                    thumbnail: '/src/assets/images/hero_creator_laptop_1794052562533.jpg',
                    readTime: '5 min read',
                    status: 'published'
                  });
                  setBlogModalOpen(true);
                }}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Create Blog</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {blogs.map((b) => (
                <div key={b.id} className="p-4 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-3 flex flex-col justify-between">
                  <div className="space-y-2">
                    <img src={b.thumbnail} alt={b.title} className="w-full aspect-16/9 object-cover rounded-lg" />
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                      {b.category}
                    </span>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
                      {b.title}
                    </h3>
                    <p className="text-[11px] text-slate-500 line-clamp-2">
                      {b.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <span className="text-slate-400">{b.publishedAt}</span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => {
                          setEditingBlog(b);
                          setBlogForm({
                            title: b.title,
                            excerpt: b.excerpt,
                            content: b.content,
                            category: b.category,
                            authorName: b.author.name,
                            authorRole: b.author.role,
                            thumbnail: b.thumbnail,
                            readTime: b.readTime,
                            status: b.status || 'published'
                          });
                          setBlogModalOpen(true);
                        }}
                        className="p-1 text-slate-500 hover:text-blue-600"
                        title="Edit Article"
                      >
                        <Edit3 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteBlog(b.id, b.title)}
                        className="p-1 text-slate-500 hover:text-red-500"
                        title="Delete Article"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 4: OFFER BANNERS MANAGEMENT */}
        {activeTab === 'banners' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                  Hero Offer Banners
                </h2>
                <p className="text-xs text-slate-500">
                  Featured promotions rotating on the homepage hero slider.
                </p>
              </div>

              <button
                onClick={() => setBannerModalOpen(true)}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5"
              >
                <Plus className="w-4 h-4" />
                <span>Add Banner</span>
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {banners.map((banner) => (
                <div key={banner.id} className="p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 space-y-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                        {banner.badge}
                      </span>
                      <h3 className="text-base font-bold text-slate-900 dark:text-white mt-1">
                        {banner.title}
                      </h3>
                    </div>
                    <button
                      onClick={() => handleDeleteBanner(banner.id)}
                      className="p-1 text-slate-400 hover:text-red-500"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>

                  <p className="text-xs text-slate-500 line-clamp-2">
                    {banner.subtitle}
                  </p>

                  <div className="aspect-16/9 bg-slate-950 rounded-xl overflow-hidden p-3 flex items-center justify-center">
                    <img src={banner.image} alt={banner.title} className="w-full h-full object-contain" />
                  </div>

                  <div className="flex items-center justify-between text-xs pt-2">
                    <span className="font-mono font-bold text-slate-900 dark:text-white">
                      {formatINR(banner.price)}
                    </span>
                    <a href={banner.ctaLink} target="_blank" rel="noreferrer" className="text-blue-500 hover:underline flex items-center gap-1">
                      <span>{banner.ctaText}</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

      </main>

      {/* PRODUCT CREATE/EDIT MODAL */}
      {productModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-2xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {editingProduct ? 'Edit Product' : 'Add New Hardware Product'}
              </h3>
              <button onClick={() => setProductModalOpen(false)} className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveProduct} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Product Name</label>
                  <input
                    type="text"
                    required
                    value={productForm.name}
                    onChange={(e) => setProductForm({ ...productForm, name: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Brand</label>
                  <input
                    type="text"
                    required
                    value={productForm.brand}
                    onChange={(e) => setProductForm({ ...productForm, brand: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    value={productForm.category}
                    onChange={(e) => setProductForm({ ...productForm, category: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                  >
                    <option value="mobiles">Mobiles</option>
                    <option value="laptops">Laptops</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Price (₹ INR)</label>
                  <input
                    type="number"
                    required
                    value={productForm.price}
                    onChange={(e) => setProductForm({ ...productForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Original Price (₹ INR)</label>
                  <input
                    type="number"
                    value={productForm.originalPrice}
                    onChange={(e) => setProductForm({ ...productForm, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Affiliate Vendor</label>
                  <select
                    value={productForm.affiliateVendor}
                    onChange={(e) => setProductForm({ ...productForm, affiliateVendor: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                  >
                    <option value="Amazon">Amazon</option>
                    <option value="Best Buy">Best Buy</option>
                    <option value="Official Store">Official Store</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Affiliate Link URL</label>
                  <input
                    type="url"
                    required
                    value={productForm.affiliateUrl}
                    onChange={(e) => setProductForm({ ...productForm, affiliateUrl: e.target.value })}
                    placeholder="https://amazon.com/dp/..."
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              {/* Specs */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div>
                  <label className="block font-semibold mb-1">Processor</label>
                  <input
                    type="text"
                    value={productForm.processor}
                    onChange={(e) => setProductForm({ ...productForm, processor: e.target.value })}
                    placeholder="Snapdragon 8 Gen 3"
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">RAM</label>
                  <input
                    type="text"
                    value={productForm.ram}
                    onChange={(e) => setProductForm({ ...productForm, ram: e.target.value })}
                    placeholder="16GB"
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Storage</label>
                  <input
                    type="text"
                    value={productForm.storage}
                    onChange={(e) => setProductForm({ ...productForm, storage: e.target.value })}
                    placeholder="512GB"
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                  />
                </div>

                {productForm.category === 'mobiles' ? (
                  <div>
                    <label className="block font-semibold mb-1">Camera Sensor</label>
                    <input
                      type="text"
                      value={productForm.camera}
                      onChange={(e) => setProductForm({ ...productForm, camera: e.target.value })}
                      placeholder="50MP Triple"
                      className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                ) : (
                  <div>
                    <label className="block font-semibold mb-1">Graphics (GPU)</label>
                    <input
                      type="text"
                      value={productForm.graphics}
                      onChange={(e) => setProductForm({ ...productForm, graphics: e.target.value })}
                      placeholder="NVIDIA RTX 4080"
                      className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                    />
                  </div>
                )}

                <div>
                  <label className="block font-semibold mb-1">Battery</label>
                  <input
                    type="text"
                    value={productForm.battery}
                    onChange={(e) => setProductForm({ ...productForm, battery: e.target.value })}
                    placeholder="5000 mAh"
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                  />
                </div>

                <div>
                  <label className="block font-semibold mb-1">Display</label>
                  <input
                    type="text"
                    value={productForm.display}
                    onChange={(e) => setProductForm({ ...productForm, display: e.target.value })}
                    placeholder="6.8-inch OLED 120Hz"
                    className="w-full px-3 py-1.5 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Short Description</label>
                <textarea
                  rows={2}
                  required
                  value={productForm.shortDescription}
                  onChange={(e) => setProductForm({ ...productForm, shortDescription: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isLatest}
                    onChange={(e) => setProductForm({ ...productForm, isLatest: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Mark as Latest Product</span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={productForm.isPopular}
                    onChange={(e) => setProductForm({ ...productForm, isPopular: e.target.checked })}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span>Mark as Popular Product</span>
                </label>
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setProductModalOpen(false)}
                  className="px-4 py-2 border rounded-lg text-slate-700 dark:text-slate-300"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white font-bold rounded-lg shadow-sm"
                >
                  {editingProduct ? 'Save Changes' : 'Create Product'}
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

      {/* BLOG CREATE/EDIT MODAL */}
      {blogModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-xl w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                {editingBlog ? 'Edit Article' : 'Write Tech Article'}
              </h3>
              <button onClick={() => setBlogModalOpen(false)} className="text-slate-400">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSaveBlog} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="block font-semibold mb-1">Title</label>
                <input
                  type="text"
                  required
                  value={blogForm.title}
                  onChange={(e) => setBlogForm({ ...blogForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block font-semibold mb-1">Category</label>
                  <select
                    value={blogForm.category}
                    onChange={(e) => setBlogForm({ ...blogForm, category: e.target.value })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                  >
                    <option value="Latest Technology">Latest Technology</option>
                    <option value="Mobile Reviews">Mobile Reviews</option>
                    <option value="Laptop Reviews">Laptop Reviews</option>
                    <option value="Buying Guides">Buying Guides</option>
                    <option value="AI">AI</option>
                    <option value="How To">How To</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold mb-1">Status</label>
                  <select
                    value={blogForm.status}
                    onChange={(e) => setBlogForm({ ...blogForm, status: e.target.value as any })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                  >
                    <option value="published">Published</option>
                    <option value="draft">Draft</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-semibold mb-1">Short Excerpt</label>
                <textarea
                  rows={2}
                  required
                  value={blogForm.excerpt}
                  onChange={(e) => setBlogForm({ ...blogForm, excerpt: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Full Article Markdown Content</label>
                <textarea
                  rows={6}
                  value={blogForm.content}
                  onChange={(e) => setBlogForm({ ...blogForm, content: e.target.value })}
                  placeholder="## Section Title..."
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 font-mono"
                />
              </div>

              <div className="pt-4 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setBlogModalOpen(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white font-bold rounded-lg"
                >
                  Save Article
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* BANNER CREATE MODAL */}
      {bannerModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-lg w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              Create Hero Offer Banner
            </h3>

            <form onSubmit={handleSaveBanner} className="space-y-3 text-xs">
              <div>
                <label className="block font-semibold mb-1">Banner Title</label>
                <input
                  type="text"
                  required
                  value={bannerForm.title}
                  onChange={(e) => setBannerForm({ ...bannerForm, title: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div>
                <label className="block font-semibold mb-1">Subtitle / Features</label>
                <input
                  type="text"
                  required
                  value={bannerForm.subtitle}
                  onChange={(e) => setBannerForm({ ...bannerForm, subtitle: e.target.value })}
                  className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold mb-1">Offer Price ($)</label>
                  <input
                    type="number"
                    required
                    value={bannerForm.price}
                    onChange={(e) => setBannerForm({ ...bannerForm, price: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                  />
                </div>
                <div>
                  <label className="block font-semibold mb-1">Original Price ($)</label>
                  <input
                    type="number"
                    value={bannerForm.originalPrice}
                    onChange={(e) => setBannerForm({ ...bannerForm, originalPrice: Number(e.target.value) })}
                    className="w-full px-3 py-2 bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700"
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setBannerModalOpen(false)}
                  className="px-4 py-2 border rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-blue-600 text-white font-bold rounded-lg"
                >
                  Save Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
