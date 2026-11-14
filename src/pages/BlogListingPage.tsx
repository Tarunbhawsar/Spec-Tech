import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { BLOG_CATEGORIES } from '../data/mockData';
import { BookOpen, Calendar, Clock, ArrowRight, Tag } from 'lucide-react';

export const BlogListingPage: React.FC = () => {
  const { blogs, navigate } = useApp();
  const [selectedCategory, setSelectedCategory] = useState<string>('All Categories');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredBlogs = useMemo(() => {
    let list = [...blogs];
    if (selectedCategory !== 'All Categories') {
      list = list.filter(b => b.category.toLowerCase() === selectedCategory.toLowerCase());
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      list = list.filter(b => b.title.toLowerCase().includes(q) || b.excerpt.toLowerCase().includes(q));
    }
    return list;
  }, [blogs, selectedCategory, searchQuery]);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Header */}
        <div className="pb-6 border-b border-slate-200 dark:border-slate-800 space-y-2">
          <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
            <BookOpen className="w-4 h-4" />
            <span>Tech Insights &amp; Hardware Lab</span>
          </div>
          <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white">
            Technology Reviews &amp; Buying Guides
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 max-w-2xl">
            In-depth architectural analysis, display comparisons, battery benchmark run-downs, and unbiased recommendations.
          </p>
        </div>

        {/* 2-Column: Left Sidebar Categories + Right 3-per-row Blog Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-8">
          
          {/* Left Sidebar */}
          <aside className="lg:col-span-1 space-y-6">
            <div className="p-5 bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 shadow-xs space-y-4">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                Filter by Category
              </h3>
              <div className="flex flex-col gap-1">
                {BLOG_CATEGORIES.map((cat) => {
                  const isSelected = selectedCategory === cat;
                  const count = cat === 'All Categories' 
                    ? blogs.length 
                    : blogs.filter(b => b.category.toLowerCase() === cat.toLowerCase()).length;

                  return (
                    <button
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={`flex items-center justify-between px-3 py-2 text-xs rounded-lg font-medium transition-colors text-left ${
                        isSelected
                          ? 'bg-blue-600 text-white font-bold'
                          : 'text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                      }`}
                    >
                      <span>{cat}</span>
                      <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded ${isSelected ? 'bg-blue-700 text-white' : 'text-slate-400'}`}>
                        {count}
                      </span>
                    </button>
                  );
                })}
              </div>

              {/* Search Within Articles */}
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <input
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full px-3 py-2 text-xs bg-slate-50 dark:bg-slate-800 rounded-lg border border-slate-200 dark:border-slate-700 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </aside>

          {/* Right Blog Listing: 3 cards per row on desktop */}
          <section className="lg:col-span-3">
            {filteredBlogs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredBlogs.map((blog) => (
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
                        {/* Clean unboxed metadata with separators */}
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

                        <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                          {blog.title}
                        </h3>

                        <p className="mt-2 text-xs text-slate-600 dark:text-slate-300 line-clamp-3 leading-relaxed">
                          {blog.excerpt}
                        </p>
                      </div>

                      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-semibold text-blue-600 dark:text-blue-400">
                        <span>Read More</span>
                        <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
                <BookOpen className="w-12 h-12 mx-auto text-slate-400" />
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                  No articles found in this category
                </h3>
                <button
                  onClick={() => { setSelectedCategory('All Categories'); setSearchQuery(''); }}
                  className="px-4 py-2 bg-blue-600 text-white text-xs font-semibold rounded-lg"
                >
                  View All Categories
                </button>
              </div>
            )}
          </section>

        </div>
      </div>
    </div>
  );
};
