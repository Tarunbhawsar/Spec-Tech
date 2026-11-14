import React from 'react';
import { useApp } from '../../context/AppContext';
import { Layers, X, ArrowRight } from 'lucide-react';

export const CompareDrawer: React.FC = () => {
  const { compareList, removeFromCompare, clearCompare, navigate, products, currentPage } = useApp();

  if (compareList.length === 0 || currentPage === 'compare') {
    return null;
  }

  const selectedProducts = products.filter(p => compareList.includes(p.id));

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 w-[95%] max-w-3xl bg-slate-900/95 text-white backdrop-blur-md rounded-2xl border border-slate-700/80 shadow-2xl p-3 sm:p-4 transition-all animate-in slide-in-from-bottom duration-200">
      <div className="flex items-center justify-between gap-3">
        
        {/* Left header & items */}
        <div className="flex items-center gap-3 overflow-x-auto py-1 flex-1">
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-slate-300 pr-2 border-r border-slate-700">
            <Layers className="w-4 h-4 text-blue-400" />
            <span>Compare ({compareList.length}/4)</span>
          </div>

          <div className="flex items-center gap-2">
            {selectedProducts.map((p) => (
              <div 
                key={p.id}
                className="relative flex items-center gap-2 bg-slate-800/90 rounded-lg pl-1.5 pr-6 py-1 border border-slate-700 text-xs shrink-0"
              >
                <img 
                  src={p.images[0]} 
                  alt={p.name} 
                  className="w-6 h-6 object-contain rounded bg-slate-900/50 p-0.5" 
                />
                <span className="max-w-[100px] truncate font-medium text-slate-200">
                  {p.name}
                </span>
                <button
                  onClick={() => removeFromCompare(p.id)}
                  className="absolute right-1 text-slate-400 hover:text-white p-0.5"
                  title="Remove"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Right CTA */}
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={clearCompare}
            className="text-xs text-slate-400 hover:text-slate-200 px-2 py-1.5"
          >
            Clear
          </button>
          <button
            onClick={() => navigate('compare')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg transition-colors flex items-center gap-1.5 shadow-md"
          >
            <span>Compare Now</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

      </div>
    </div>
  );
};
