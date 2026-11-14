import React, { useState } from 'react';
import { Product } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/format';
import { Heart, Layers, ExternalLink, Cpu, Eye, Check, ShoppingBag, Battery, Sparkles } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  showCompareOption?: boolean;
}

export const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  showCompareOption = true 
}) => {
  const { 
    navigate, 
    toggleWishlist, 
    isInWishlist, 
    toggleCompare, 
    isInCompare 
  } = useApp();

  const [imageError, setImageError] = useState(false);
  const isWishlisted = isInWishlist(product.id);
  const isCompared = isInCompare(product.id);

  const isMobile = product.category === 'mobiles';
  const specs = product.specs as any;

  return (
    <div className="group relative flex flex-col bg-white dark:bg-slate-900 rounded-xl border border-slate-200 dark:border-slate-800 overflow-hidden shadow-xs hover:shadow-xl hover:-translate-y-1 transition-all duration-200">
      
      {/* Top action icons overlay: Wishlist & Compare */}
      <div className="absolute top-3 right-3 z-10 flex flex-col gap-1.5">
        <button
          onClick={(e) => {
            e.stopPropagation();
            toggleWishlist(product.id);
          }}
          aria-label={isWishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          className={`p-2 rounded-full backdrop-blur-md transition-all ${
            isWishlisted
              ? 'bg-red-500 text-white shadow-sm'
              : 'bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-red-500 hover:bg-white dark:hover:bg-slate-800'
          }`}
        >
          <Heart className={`w-4 h-4 ${isWishlisted ? 'fill-current' : ''}`} />
        </button>

        {showCompareOption && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleCompare(product.id);
            }}
            title={isCompared ? 'Remove from comparison' : 'Add to comparison'}
            className={`p-2 rounded-full backdrop-blur-md transition-all ${
              isCompared
                ? 'bg-blue-600 text-white shadow-sm'
                : 'bg-white/80 dark:bg-slate-800/80 text-slate-600 dark:text-slate-300 hover:text-blue-500 hover:bg-white dark:hover:bg-slate-800'
            }`}
          >
            <Layers className="w-4 h-4" />
          </button>
        )}
      </div>

      {/* Subtle Tag if latest or popular */}
      {product.isLatest && (
        <div className="absolute top-3 left-3 z-10">
          <span className="text-[11px] font-semibold text-blue-600 dark:text-blue-400 bg-blue-50/90 dark:bg-blue-950/80 backdrop-blur-xs px-2 py-0.5 rounded-sm">
            Latest 2026
          </span>
        </div>
      )}

      {/* Product Image Area */}
      <div 
        onClick={() => navigate('product-detail', { productId: product.id })}
        className="relative w-full aspect-4/3 bg-slate-50 dark:bg-slate-950/60 p-6 flex items-center justify-center cursor-pointer overflow-hidden"
      >
        {!imageError ? (
          <img
            src={product.images[0]}
            alt={product.name}
            onError={() => setImageError(true)}
            referrerPolicy="no-referrer"
            className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-slate-400 bg-linear-to-br from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-900 rounded-lg p-4 text-center">
            <Sparkles className="w-8 h-8 mb-2 text-blue-500" />
            <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">{product.name}</span>
            <span className="text-[10px] text-slate-400 mt-1">{product.brand}</span>
          </div>
        )}
      </div>

      {/* Card Content */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Brand & Category Kicker */}
          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400 mb-1">
            <span className="uppercase tracking-wider font-semibold text-[11px] text-blue-600 dark:text-blue-400">
              {product.brand}
            </span>
            <span className="capitalize text-[11px]">{product.category}</span>
          </div>

          {/* Product Title */}
          <h3 
            onClick={() => navigate('product-detail', { productId: product.id })}
            className="text-sm sm:text-base font-bold text-slate-900 dark:text-white line-clamp-1 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
          >
            {product.name}
          </h3>

          {/* Price Area */}
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-lg font-bold font-mono tabular-nums text-slate-900 dark:text-white">
              {formatINR(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-xs line-through text-slate-400 font-mono tabular-nums">
                {formatINR(product.originalPrice)}
              </span>
            )}
            {product.originalPrice && (
              <span className="text-[11px] font-semibold text-emerald-600 dark:text-emerald-400">
                Save {formatINR(product.originalPrice - product.price)}
              </span>
            )}
          </div>

          {/* Important Specifications */}
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-1.5 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-1.5 truncate">
              <Cpu className="w-3.5 h-3.5 text-slate-400 shrink-0" />
              <span className="truncate">{specs.processor}</span>
            </div>
            {isMobile ? (
              <>
                <div className="flex items-center gap-1.5 truncate">
                  <span className="font-semibold text-slate-400 text-[10px] shrink-0">RAM/ROM</span>
                  <span className="truncate">{specs.ram} · {specs.storage}</span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <Battery className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                  <span className="truncate">{specs.battery}</span>
                </div>
              </>
            ) : (
              <>
                <div className="flex items-center gap-1.5 truncate">
                  <span className="font-semibold text-slate-400 text-[10px] shrink-0">RAM/SSD</span>
                  <span className="truncate">{specs.ram} · {specs.storage}</span>
                </div>
                <div className="flex items-center gap-1.5 truncate">
                  <span className="font-semibold text-slate-400 text-[10px] shrink-0">GPU</span>
                  <span className="truncate">{specs.graphics}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Action Buttons: View Details & Affiliate Buy Now */}
        <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center gap-2">
          <button
            onClick={() => navigate('product-detail', { productId: product.id })}
            className="flex-1 py-2 px-3 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-slate-100 hover:bg-slate-200 dark:bg-slate-800 dark:hover:bg-slate-700 rounded-lg transition-colors flex items-center justify-center gap-1.5"
          >
            <Eye className="w-3.5 h-3.5" />
            <span>View Details</span>
          </button>

          <a
            href={product.affiliateUrl}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="flex-1 py-2 px-3 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            <span>Buy Now</span>
            <ExternalLink className="w-3 h-3 text-blue-200" />
          </a>
        </div>

      </div>
    </div>
  );
};
