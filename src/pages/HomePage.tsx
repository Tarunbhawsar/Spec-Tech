import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { HeroBanner } from '../components/home/HeroBanner';
import { ProductCard } from '../components/common/ProductCard';
import { OfferBanner } from '../types';
import { INITIAL_OFFER_BANNERS } from '../data/mockData';
import { ArrowRight, Smartphone, Laptop, BookOpen, Clock, Calendar, CheckCircle2 } from 'lucide-react';

export const HomePage: React.FC = () => {
  const { products, blogs, navigate } = useApp();
  const [banners, setBanners] = useState<OfferBanner[]>(INITIAL_OFFER_BANNERS);

  // Fetch banners from API
  useEffect(() => {
    fetch('/api/banners')
      .then(res => res.ok ? res.json() : null)
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setBanners(data);
        }
      })
      .catch(() => {});
  }, []);

  // Section B: Exactly 4 Latest Mobiles
  const latestMobiles = products
    .filter(p => p.category === 'mobiles' && p.isLatest)
    .slice(0, 4);

  // Section C: Exactly 4 Popular Mobiles
  const popularMobiles = products
    .filter(p => p.category === 'mobiles' && p.isPopular)
    .slice(0, 4);

  // Section D: Exactly 4 Latest Laptops
  const latestLaptops = products
    .filter(p => p.category === 'laptops' && p.isLatest)
    .slice(0, 4);

  // Section E: Exactly 4 Popular Laptops
  const popularLaptops = products
    .filter(p => p.category === 'laptops' && p.isPopular)
    .slice(0, 4);

  // Section F: Exactly 3 Latest Blogs
  const latestBlogs = blogs.slice(0, 3);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-16 sm:space-y-20">
        
        {/* SECTION A: HERO OFFER BANNER */}
        <section aria-label="Featured Offers">
          <HeroBanner banners={banners} />
        </section>

        {/* SECTION B: LATEST MOBILES (4 CARDS) */}
        <section aria-label="Latest Mobiles">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-slate-200 dark:border-slate-800 gap-2">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                <Smartphone className="w-4 h-4" />
                <span>2026 Flagship Launches</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
                Latest Mobiles
              </h2>
            </div>
            <button
              onClick={() => navigate('mobiles')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 group self-start sm:self-auto"
            >
              <span>View All Mobiles</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestMobiles.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* SECTION C: POPULAR MOBILES (4 CARDS) */}
        <section aria-label="Popular Mobiles">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-slate-200 dark:border-slate-800 gap-2">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Community Favorites</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
                Popular Mobiles
              </h2>
            </div>
            <button
              onClick={() => navigate('mobiles')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 group self-start sm:self-auto"
            >
              <span>Browse All Popular</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularMobiles.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* SECTION D: LATEST LAPTOPS (4 CARDS) */}
        <section aria-label="Latest Laptops">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-slate-200 dark:border-slate-800 gap-2">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                <Laptop className="w-4 h-4" />
                <span>Next-Gen Silicon &amp; OLED</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
                Latest Laptops
              </h2>
            </div>
            <button
              onClick={() => navigate('laptops')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 group self-start sm:self-auto"
            >
              <span>View All Laptops</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {latestLaptops.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* SECTION E: POPULAR LAPTOPS (4 CARDS) */}
        <section aria-label="Popular Laptops">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-slate-200 dark:border-slate-800 gap-2">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-amber-600 dark:text-amber-400 uppercase tracking-wider">
                <CheckCircle2 className="w-4 h-4" />
                <span>Creator &amp; Gaming Picks</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
                Popular Laptops
              </h2>
            </div>
            <button
              onClick={() => navigate('laptops')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 group self-start sm:self-auto"
            >
              <span>Browse All Top Rated</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {popularLaptops.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* SECTION F: LATEST BLOGS (3 CARDS) */}
        <section aria-label="Latest Tech Reviews and Guides">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-6 pb-3 border-b border-slate-200 dark:border-slate-800 gap-2">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>Editorial &amp; Hardware Testing</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-900 dark:text-white mt-1">
                Latest Technology Guides &amp; Reviews
              </h2>
            </div>
            <button
              onClick={() => navigate('blog')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 flex items-center gap-1 group self-start sm:self-auto"
            >
              <span>Explore All Articles</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {latestBlogs.map((blog) => (
              <article
                key={blog.id}
                onClick={() => navigate('blog-detail', { blogSlug: blog.slug })}
                className="group flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all cursor-pointer"
              >
                <div className="relative aspect-16/9 w-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                  <img
                    src={blog.thumbnail}
                    alt={blog.title}
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute top-3 left-3">
                    <span className="text-[11px] font-semibold text-white bg-slate-900/80 backdrop-blur-xs px-2.5 py-1 rounded-md">
                      {blog.category}
                    </span>
                  </div>
                </div>

                <div className="p-5 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Metadata line per anti-slop zero-pill rule */}
                    <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 mb-2">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{blog.publishedAt}</span>
                      </span>
                      <span>·</span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" />
                        <span>{blog.readTime}</span>
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {blog.title}
                    </h3>

                    <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                      {blog.excerpt}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400 group-hover:text-blue-500">
                    <span>Read Full Article</span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
