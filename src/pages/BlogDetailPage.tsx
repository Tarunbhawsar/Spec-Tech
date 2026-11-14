import React from 'react';
import { useApp } from '../context/AppContext';
import { ArrowLeft, Calendar, Clock, User, Share2, BookOpen, ArrowRight } from 'lucide-react';

export const BlogDetailPage: React.FC = () => {
  const { selectedBlogSlug, blogs, navigate, showToast } = useApp();

  const blog = blogs.find(b => b.slug === selectedBlogSlug || b.id === selectedBlogSlug) || blogs[0];
  
  // Related blogs
  const relatedBlogs = blogs
    .filter(b => b.id !== blog.id)
    .slice(0, 3);

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      showToast('Article URL copied to clipboard');
    } else {
      showToast('Share link ready');
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      
      {/* Top back bar */}
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-3 flex items-center justify-between text-xs">
          <button
            onClick={() => navigate('blog')}
            className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>Share Article</span>
          </button>
        </div>
      </div>

      <article className="max-w-4xl mx-auto px-4 sm:px-6 py-10 space-y-10">
        
        {/* Article Header */}
        <header className="space-y-4">
          <div className="inline-flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 bg-blue-50 dark:bg-blue-950/60 px-2.5 py-1 rounded-md">
              {blog.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.2] text-balance">
            {blog.title}
          </h1>

          {/* Author & Publication Metadata */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-b border-slate-200 dark:border-slate-800 py-3 text-xs text-slate-600 dark:text-slate-400">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center font-bold text-slate-700 dark:text-slate-300">
                {blog.author.name.charAt(0)}
              </div>
              <div>
                <div className="font-bold text-slate-900 dark:text-white">{blog.author.name}</div>
                <div className="text-[11px] text-slate-500">{blog.author.role}</div>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-slate-400" />
                <span>{blog.publishedAt}</span>
              </span>
              <span>·</span>
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-slate-400" />
                <span>{blog.readTime}</span>
              </span>
            </div>
          </div>
        </header>

        {/* Featured Thumbnail */}
        <div className="relative aspect-16/9 rounded-2xl overflow-hidden bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-md">
          <img
            src={blog.thumbnail}
            alt={blog.title}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
        </div>

        {/* Table of Contents if available */}
        {blog.tableOfContents && blog.tableOfContents.length > 0 && (
          <nav aria-label="Table of Contents" className="p-5 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-2.5">
            <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-blue-500" />
              <span>In This Hardware Guide</span>
            </h4>
            <ul className="space-y-1.5 text-xs">
              {blog.tableOfContents.map((item, idx) => (
                <li key={item.id} className="text-slate-600 dark:text-slate-300 hover:text-blue-600 dark:hover:text-blue-400">
                  <a href={`#${item.id}`} className="hover:underline flex items-center gap-2">
                    <span className="font-mono text-slate-400 text-[10px]">0{idx + 1}.</span>
                    <span>{item.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}

        {/* Article Body */}
        <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-6 sm:p-10 shadow-xs">
          <div className="prose prose-slate dark:prose-invert max-w-none text-slate-800 dark:text-slate-200 text-sm sm:text-base leading-relaxed space-y-6">
            {blog.content.split('\n\n').map((paragraph, index) => {
              const text = paragraph.trim();
              if (!text) return null;

              if (text.startsWith('# ')) {
                return (
                  <h1 key={index} className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white pt-4 pb-2 border-b border-slate-200 dark:border-slate-800">
                    {text.replace('# ', '')}
                  </h1>
                );
              }
              if (text.startsWith('## ')) {
                const title = text.replace('## ', '');
                const id = title.toLowerCase().replace(/[^a-z0-9]/g, '-');
                return (
                  <h2 key={index} id={id} className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white pt-6 pb-2">
                    {title}
                  </h2>
                );
              }
              if (text.startsWith('### ')) {
                return (
                  <h3 key={index} className="text-lg font-bold text-slate-900 dark:text-white pt-4">
                    {text.replace('### ', '')}
                  </h3>
                );
              }
              if (text.startsWith('|')) {
                // Simple Table rendering
                const rows = text.split('\n').filter(r => r.trim() && !r.includes('---'));
                return (
                  <div key={index} className="overflow-x-auto my-6">
                    <table className="w-full text-xs text-left border-collapse border border-slate-200 dark:border-slate-800">
                      <tbody>
                        {rows.map((row, rIdx) => {
                          const cols = row.split('|').filter(c => c.trim().length > 0);
                          const isHeader = rIdx === 0;
                          return (
                            <tr key={rIdx} className={isHeader ? 'bg-slate-100 dark:bg-slate-800 font-bold' : 'border-t border-slate-200 dark:border-slate-800'}>
                              {cols.map((col, cIdx) => (
                                <td key={cIdx} className="py-2 px-3">
                                  {col.trim()}
                                </td>
                              ))}
                            </tr>
                          );
                        })}
                      </tbody>
                    </table>
                  </div>
                );
              }
              if (text.startsWith('- ')) {
                const items = text.split('\n').map(i => i.replace('- ', '').trim());
                return (
                  <ul key={index} className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                    {items.map((it, iIdx) => (
                      <li key={iIdx}>{it}</li>
                    ))}
                  </ul>
                );
              }

              return (
                <p key={index} className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                  {text}
                </p>
              );
            })}
          </div>

          {/* Tags */}
          {blog.tags && blog.tags.length > 0 && (
            <div className="mt-8 pt-6 border-t border-slate-200 dark:border-slate-800 flex flex-wrap items-center gap-2">
              <span className="text-xs font-semibold text-slate-500">Topics:</span>
              {blog.tags.map(tag => (
                <span key={tag} className="text-xs text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-1 rounded-md">
                  #{tag}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* RELATED BLOGS */}
        <section aria-label="Related Tech Articles" className="pt-8 border-t border-slate-200 dark:border-slate-800 space-y-6">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Related Tech Guides
            </h3>
            <button
              onClick={() => navigate('blog')}
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              <span>All Articles</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {relatedBlogs.map(b => (
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
                </div>
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <div>
                    <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400">
                      {b.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white line-clamp-2 mt-1 group-hover:text-blue-600 transition-colors">
                      {b.title}
                    </h4>
                  </div>
                  <div className="mt-3 pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 flex items-center justify-between">
                    <span>{b.readTime}</span>
                    <span className="font-semibold text-blue-600 dark:text-blue-400">Read</span>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

      </article>
    </div>
  );
};
