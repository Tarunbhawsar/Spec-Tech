import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Layers, CheckCircle2, ShieldCheck } from 'lucide-react';

export const Footer: React.FC = () => {
  const { navigate } = useApp();
  const [modalTitle, setModalTitle] = useState<string | null>(null);
  const [modalContent, setModalContent] = useState<string | null>(null);

  const openModal = (title: string, content: string) => {
    setModalTitle(title);
    setModalContent(content);
  };

  const closeModal = () => {
    setModalTitle(null);
    setModalContent(null);
  };

  return (
    <footer className="w-full bg-slate-900 text-slate-400 border-t border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
        
        {/* Brand & Quick Nav */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white">
              <Layers className="w-4 h-4" />
            </div>
            <span className="text-lg font-bold tracking-tight text-white">
              SPEC<span className="text-blue-500">VAULT</span>
            </span>
            <span className="text-xs text-slate-500 hidden md:inline ml-2 pl-2 border-l border-slate-800">
              Tech Reviews &amp; Product Comparison
            </span>
          </div>

          {/* Clean Navigation Links */}
          <nav className="flex flex-wrap items-center justify-center gap-x-5 gap-y-2 text-xs font-medium">
            <button onClick={() => navigate('home')} className="hover:text-white transition-colors">
              Home
            </button>
            <button onClick={() => navigate('mobiles')} className="hover:text-white transition-colors">
              Mobiles
            </button>
            <button onClick={() => navigate('laptops')} className="hover:text-white transition-colors">
              Laptops
            </button>
            <button onClick={() => navigate('compare')} className="hover:text-white transition-colors">
              Compare
            </button>
            <button onClick={() => navigate('blog')} className="hover:text-white transition-colors">
              Blog
            </button>
            <button 
              onClick={() => openModal('About SpecVault', 'SpecVault provides unbiased hardware reviews, silicon benchmarks, and side-by-side technical product comparisons for tech enthusiasts and buyers.')} 
              className="hover:text-white transition-colors"
            >
              About
            </button>
            <button 
              onClick={() => openModal('Privacy Policy', 'We value your privacy. Cookie identifiers are used exclusively for user preferences like light/dark theme and saved device comparisons.')} 
              className="hover:text-white transition-colors"
            >
              Privacy
            </button>
            <button 
              onClick={() => openModal('Affiliate Disclosure', 'SpecVault participates in affiliate marketing programs including Amazon and direct retailer partners. When you purchase through our links, we may earn an affiliate commission at zero extra cost to you.')} 
              className="hover:text-white transition-colors"
            >
              Affiliate Disclosure
            </button>
          </nav>
        </div>

        {/* Affiliate Disclosure & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div className="flex items-center gap-1.5 text-center sm:text-left">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span>
              <strong>Affiliate Notice:</strong> We may earn commissions on qualifying purchases from verified merchant partners.
            </span>
          </div>

          <div>
            &copy; {new Date().getFullYear()} SpecVault. All rights reserved.
          </div>
        </div>

      </div>

      {/* Info Modal */}
      {modalTitle && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl max-w-md w-full p-6 text-slate-300 space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-500" />
                <span>{modalTitle}</span>
              </h3>
              <button 
                onClick={closeModal}
                className="text-slate-400 hover:text-white text-xs px-2 py-1"
              >
                Close
              </button>
            </div>
            <p className="text-xs text-slate-300 leading-relaxed">
              {modalContent}
            </p>
            <div className="pt-2 text-right">
              <button 
                onClick={closeModal}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};
