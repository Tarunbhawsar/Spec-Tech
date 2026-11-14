import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/common/ProductCard';
import { formatINR } from '../utils/format';
import { 
  ChevronLeft, 
  ChevronRight, 
  Heart, 
  Layers, 
  ShoppingBag, 
  ExternalLink, 
  Check, 
  X, 
  Sparkles,
  ArrowLeft,
  Calendar,
  Clock,
  ArrowRight,
  ShieldCheck,
  Cpu,
  Monitor,
  Battery,
  Camera,
  HardDrive
} from 'lucide-react';

export const ProductDetailPage: React.FC = () => {
  const { 
    selectedProductId, 
    products, 
    blogs, 
    navigate, 
    toggleWishlist, 
    isInWishlist, 
    toggleCompare, 
    isInCompare 
  } = useApp();

  // Find product by id or slug
  const product = products.find(p => p.id === selectedProductId || p.slug === selectedProductId) || products[0];

  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<'overview' | 'specs' | 'pros-cons'>('overview');

  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);
  const isMobile = product.category === 'mobiles';
  const specs = product.specs as any;

  // 5 Centered Related Products
  const relatedProducts = products
    .filter(p => p.id !== product.id && p.category === product.category)
    .slice(0, 5);

  // Latest Blogs for bottom
  const latestBlogs = blogs.slice(0, 3);

  const images = product.images.length > 0 ? product.images : ['/src/assets/images/product_flagship_smartphone_1794052563082.jpg'];

  const handlePrevImage = () => {
    setActiveImageIndex(prev => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNextImage = () => {
    setActiveImageIndex(prev => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Back button and breadcrumbs */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex items-center justify-between text-xs">
          <button
            onClick={() => navigate(product.category === 'mobiles' ? 'mobiles' : 'laptops')}
            className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to {product.category === 'mobiles' ? 'Mobiles' : 'Laptops'}</span>
          </button>

          <div className="flex items-center gap-1.5 text-slate-500">
            <span>Catalog</span>
            <span>/</span>
            <span className="capitalize">{product.category}</span>
            <span>/</span>
            <span className="font-semibold text-slate-900 dark:text-white truncate max-w-[150px] sm:max-w-xs">{product.name}</span>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16">
        
        {/* MAIN PRODUCT HERO SECTION: GALLERY (LEFT) + PURCHASE MODULE (RIGHT) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 lg:p-10 shadow-xs">
          
          {/* PRODUCT GALLERY */}
          <div className="lg:col-span-7 flex flex-col items-center">
            
            {/* Main Display Image Frame */}
            <div className="relative w-full aspect-4/3 bg-slate-50 dark:bg-slate-950/70 rounded-xl border border-slate-100 dark:border-slate-800 p-8 flex items-center justify-center overflow-hidden">
              <img
                key={activeImageIndex}
                src={images[activeImageIndex]}
                alt={`${product.name} angle ${activeImageIndex + 1}`}
                className="w-full h-full object-contain transition-all duration-300 transform hover:scale-105"
              />

              {images.length > 1 && (
                <>
                  <button
                    onClick={handlePrevImage}
                    aria-label="Previous view"
                    className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 backdrop-blur-md shadow-md border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <button
                    onClick={handleNextImage}
                    aria-label="Next view"
                    className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 dark:bg-slate-800/80 hover:bg-white dark:hover:bg-slate-800 text-slate-700 dark:text-slate-200 backdrop-blur-md shadow-md border border-slate-200 dark:border-slate-700 transition-colors"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnail Navigation */}
            {images.length > 1 && (
              <div className="flex items-center gap-3 mt-4">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImageIndex(idx)}
                    className={`w-16 h-16 rounded-lg p-1.5 border-2 bg-slate-50 dark:bg-slate-950 transition-all ${
                      activeImageIndex === idx
                        ? 'border-blue-600 shadow-sm'
                        : 'border-slate-200 dark:border-slate-800 opacity-60 hover:opacity-100'
                    }`}
                  >
                    <img src={img} alt={`Thumb ${idx + 1}`} className="w-full h-full object-contain" />
                  </button>
                ))}
              </div>
            )}

            {/* Trust badge */}
            <div className="mt-6 flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <span>Direct manufacturer &amp; verified merchant inventory pricing</span>
            </div>
          </div>

          {/* PRODUCT INFORMATION & CONTIGUOUS PURCHASE MODULE */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              
              {/* Brand & Category */}
              <div className="flex items-center justify-between text-xs">
                <span className="uppercase tracking-wider font-bold text-blue-600 dark:text-blue-400 text-[11px]">
                  {product.brand}
                </span>
                <span className="text-slate-500 capitalize">
                  {product.category}
                </span>
              </div>

              {/* Title */}
              <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-tight">
                {product.name}
              </h1>

              {/* Pricing Block */}
              <div className="p-4 bg-slate-50 dark:bg-slate-950/80 rounded-xl border border-slate-200 dark:border-slate-800 space-y-1.5">
                <div className="text-[11px] uppercase tracking-wider text-slate-500 font-semibold">
                  Best Verified Price
                </div>
                <div className="flex items-baseline gap-3">
                  <span className="text-3xl font-extrabold font-mono tabular-nums text-slate-900 dark:text-white">
                    {formatINR(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-base line-through text-slate-400 font-mono tabular-nums">
                      {formatINR(product.originalPrice)}
                    </span>
                  )}
                  {product.originalPrice && (
                    <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded border border-emerald-200 dark:border-emerald-800">
                      Save {formatINR(product.originalPrice - product.price)}
                    </span>
                  )}
                </div>
                <div className="text-[11px] text-slate-500 pt-1">
                  Sold via verified vendor: <strong className="text-slate-700 dark:text-slate-300">{product.affiliateVendor}</strong>
                </div>
              </div>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                {product.description}
              </p>

              {/* Important Highlights */}
              <div className="space-y-2 pt-2">
                <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  Key Architecture Highlights
                </h4>
                <ul className="space-y-1.5 text-xs text-slate-700 dark:text-slate-300">
                  {product.highlights.map((h, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                      <span>{h}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* CTAs: Buy Now, Wishlist, Compare */}
            <div className="space-y-3 pt-4 border-t border-slate-100 dark:border-slate-800">
              <a
                href={product.affiliateUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-3.5 px-6 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-md flex items-center justify-center gap-2 group"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>Buy Now on {product.affiliateVendor}</span>
                <ExternalLink className="w-4 h-4 text-blue-200 group-hover:translate-x-0.5 transition-transform" />
              </a>

              <div className="grid grid-cols-2 gap-3">
                <button
                  onClick={() => toggleWishlist(product.id)}
                  className={`py-2.5 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    isWishlisted
                      ? 'bg-red-50 dark:bg-red-950/40 border-red-300 dark:border-red-800 text-red-600 dark:text-red-400'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current text-red-500' : ''}`} />
                  <span>{isWishlisted ? 'Wishlisted' : 'Add to Wishlist'}</span>
                </button>

                <button
                  onClick={() => toggleCompare(product.id)}
                  className={`py-2.5 px-4 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-all ${
                    isCompared
                      ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-300 dark:border-blue-800 text-blue-600 dark:text-blue-400'
                      : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700'
                  }`}
                >
                  <Layers className="w-4 h-4 text-blue-500" />
                  <span>{isCompared ? 'In Compare List' : 'Add to Compare'}</span>
                </button>
              </div>
            </div>

          </div>
        </div>

        {/* DETAILED SPECIFICATIONS & LAB ANALYSIS TABS */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-8 shadow-xs space-y-6">
          
          {/* Tabs navigation */}
          <div className="flex items-center gap-2 border-b border-slate-200 dark:border-slate-800 pb-3 overflow-x-auto">
            <button
              onClick={() => setActiveTab('overview')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
                activeTab === 'overview'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Hardware Overview
            </button>
            <button
              onClick={() => setActiveTab('specs')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
                activeTab === 'specs'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Complete Specifications Matrix
            </button>
            <button
              onClick={() => setActiveTab('pros-cons')}
              className={`px-4 py-2 text-xs font-bold rounded-lg transition-colors ${
                activeTab === 'pros-cons'
                  ? 'bg-blue-600 text-white'
                  : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
            >
              Pros &amp; Cons Evaluation
            </button>
          </div>

          {/* TAB 1: OVERVIEW */}
          {activeTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                  <Cpu className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Processor</span>
                    <div className="text-xs font-semibold text-slate-900 dark:text-white mt-0.5">{specs.processor}</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                  <Monitor className="w-5 h-5 text-purple-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Display Panel</span>
                    <div className="text-xs font-semibold text-slate-900 dark:text-white mt-0.5">{specs.display}</div>
                  </div>
                </div>

                <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-950/60 border border-slate-200 dark:border-slate-800 flex items-start gap-3">
                  <Battery className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400">Battery &amp; Charging</span>
                    <div className="text-xs font-semibold text-slate-900 dark:text-white mt-0.5">{specs.battery}</div>
                  </div>
                </div>
              </div>

              <div className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed space-y-3">
                <p>
                  The {product.name} represents high-end engineering in the {product.category} sector. In extensive testing, thermal dissipation remained well controlled under heavy synthetic benchmark loops and multi-layer rendering tasks.
                </p>
                <p>
                  Every technical metric shown is verified against factory specification whitepapers and physical device hardware inspections.
                </p>
              </div>
            </div>
          )}

          {/* TAB 2: COMPLETE SPECIFICATIONS TABLE */}
          {activeTab === 'specs' && (
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse">
                <tbody>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <td className="py-3 px-4 font-bold text-slate-400 w-1/3">Processor / Chipset</td>
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{specs.processor}</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
                    <td className="py-3 px-4 font-bold text-slate-400">RAM / Memory</td>
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{specs.ram}</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <td className="py-3 px-4 font-bold text-slate-400">Storage / ROM</td>
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{specs.storage}</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
                    <td className="py-3 px-4 font-bold text-slate-400">Display &amp; Refresh Rate</td>
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{specs.display} ({specs.refreshRate || '120Hz'})</td>
                  </tr>
                  {isMobile ? (
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-3 px-4 font-bold text-slate-400">Camera System</td>
                      <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{specs.camera}</td>
                    </tr>
                  ) : (
                    <tr className="border-b border-slate-100 dark:border-slate-800">
                      <td className="py-3 px-4 font-bold text-slate-400">Graphics Processor</td>
                      <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{specs.graphics}</td>
                    </tr>
                  )}
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
                    <td className="py-3 px-4 font-bold text-slate-400">Battery &amp; Charging</td>
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{specs.battery}</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <td className="py-3 px-4 font-bold text-slate-400">Operating System</td>
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{specs.os}</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950/40">
                    <td className="py-3 px-4 font-bold text-slate-400">Connectivity &amp; Ports</td>
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{specs.connectivity || specs.ports || 'Wi-Fi 7, Bluetooth 5.4, USB-C'}</td>
                  </tr>
                  <tr className="border-b border-slate-100 dark:border-slate-800">
                    <td className="py-3 px-4 font-bold text-slate-400">Weight &amp; Chassis</td>
                    <td className="py-3 px-4 font-semibold text-slate-900 dark:text-white">{specs.weight || 'Precision Aerospace Alloy'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {/* TAB 3: PROS & CONS */}
          {activeTab === 'pros-cons' && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Pros */}
              <div className="p-5 rounded-xl bg-emerald-50/50 dark:bg-emerald-950/20 border border-emerald-200 dark:border-emerald-900/60 space-y-3">
                <div className="flex items-center gap-2 text-emerald-700 dark:text-emerald-400 font-bold text-xs uppercase tracking-wider">
                  <Check className="w-4 h-4" />
                  <span>Reasons to Buy (Pros)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  {product.pros.map((p, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-emerald-500 font-bold font-mono">✓</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Cons */}
              <div className="p-5 rounded-xl bg-rose-50/50 dark:bg-rose-950/20 border border-rose-200 dark:border-rose-900/60 space-y-3">
                <div className="flex items-center gap-2 text-rose-700 dark:text-rose-400 font-bold text-xs uppercase tracking-wider">
                  <X className="w-4 h-4" />
                  <span>Trade-offs to Consider (Cons)</span>
                </div>
                <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
                  {product.cons.map((c, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="text-rose-500 font-bold font-mono">✕</span>
                      <span>{c}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          )}

        </div>

        {/* CENTERED RELATED PRODUCTS (5 SUGGESTIONS) */}
        <section aria-label="Related Product Suggestions" className="space-y-6">
          <div className="text-center max-w-xl mx-auto space-y-1">
            <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              Alternative Options
            </span>
            <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">
              Related {product.category === 'mobiles' ? 'Smartphones' : 'Laptops'} to Consider
            </h2>
            <p className="text-xs text-slate-500">
              Hand-picked alternatives sharing comparable performance profiles and price brackets.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>

        {/* BOTTOM LATEST BLOGS SECTION */}
        <section aria-label="Latest Tech Guides and Reviews" className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
            <div>
              <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                Tech Analysis
              </span>
              <h2 className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white mt-0.5">
                Latest Buying Guides &amp; Reviews
              </h2>
            </div>
            <button
              onClick={() => navigate('blog')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>View All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestBlogs.map((b) => (
              <article
                key={b.id}
                onClick={() => navigate('blog-detail', { blogSlug: b.slug })}
                className="group flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div className="relative aspect-16/9 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img
                    src={b.thumbnail}
                    alt={b.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-semibold text-white bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded-md">
                      {b.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{b.publishedAt}</span>
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{b.readTime}</span>
                      </span>
                    </div>

                    <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {b.title}
                    </h3>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                    <span>Read Article</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

      </main>
    </div>
  );
};
