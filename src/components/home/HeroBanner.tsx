import React, { useState, useEffect, useRef } from 'react';
import { OfferBanner } from '../../types';
import { useApp } from '../../context/AppContext';
import { formatINR } from '../../utils/format';
import { ChevronLeft, ChevronRight, ShoppingBag, ExternalLink, ArrowRight } from 'lucide-react';

interface HeroBannerProps {
  banners: OfferBanner[];
}

export const HeroBanner: React.FC<HeroBannerProps> = ({ banners }) => {
  const { navigate } = useApp();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const activeBanners = banners.length > 0 ? banners : [];
  const currentBanner = activeBanners[currentIndex];

  useEffect(() => {
    if (activeBanners.length <= 1 || isPaused) return;

    timerRef.current = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
    }, 5500);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [activeBanners.length, isPaused]);

  if (!currentBanner) return null;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? activeBanners.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % activeBanners.length);
  };

  return (
    <div 
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      className="relative w-full rounded-2xl overflow-hidden bg-gradient-to-br from-slate-100 via-blue-50/40 to-slate-100 dark:bg-radial dark:from-slate-800 dark:to-slate-950 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800 shadow-xl dark:shadow-2xl transition-all"
    >
      {/* Decorative ambient glow */}
      <div className="absolute top-0 right-1/4 -z-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/15 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 -z-0 w-96 h-96 bg-indigo-500/5 dark:bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Banner Grid */}
      <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 items-center min-h-[420px] lg:min-h-[460px] p-6 sm:p-10 lg:p-12 gap-8">
        
        {/* Left Side: Copy, Pricing in INR, CTA */}
        <div className="lg:col-span-6 xl:col-span-7 flex flex-col justify-center space-y-5">
          
          <div className="inline-flex items-center gap-2">
            <span className="text-[11px] font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400 bg-blue-100/90 dark:bg-blue-950/80 border border-blue-200 dark:border-blue-800/80 px-2.5 py-1 rounded-md">
              {currentBanner.badge}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 capitalize font-medium">
              Verified Hardware Deal
            </span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-white leading-[1.15] text-balance">
            {currentBanner.title}
          </h2>

          <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-xl leading-relaxed">
            {currentBanner.subtitle}
          </p>

          {/* Pricing Highlight in INR */}
          <div className="flex items-baseline gap-3 pt-1">
            <span className="text-xs text-slate-500 dark:text-slate-400 uppercase tracking-wider font-semibold">
              Special Offer
            </span>
            <span className="text-3xl sm:text-4xl font-extrabold font-mono tabular-nums text-slate-900 dark:text-white">
              {formatINR(currentBanner.price)}
            </span>
            {currentBanner.originalPrice && (
              <span className="text-base line-through text-slate-400 dark:text-slate-500 font-mono tabular-nums">
                {formatINR(currentBanner.originalPrice)}
              </span>
            )}
            {currentBanner.originalPrice && (
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-100 dark:bg-emerald-950/80 border border-emerald-300 dark:border-emerald-800/80 px-2.5 py-0.5 rounded-md">
                Save {formatINR(currentBanner.originalPrice - currentBanner.price)}
              </span>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="pt-2 flex flex-wrap items-center gap-3">
            <a
              href={currentBanner.ctaLink}
              target="_blank"
              rel="noopener noreferrer"
              className="py-3 px-6 text-sm font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-xl transition-all shadow-lg hover:shadow-blue-500/25 flex items-center gap-2 group"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>{currentBanner.ctaText}</span>
              <ExternalLink className="w-4 h-4 text-blue-200 group-hover:translate-x-0.5 transition-transform" />
            </a>

            <button
              onClick={() => navigate(currentBanner.category === 'mobiles' ? 'mobiles' : 'laptops')}
              className="py-3 px-5 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white bg-white hover:bg-slate-50 dark:bg-slate-800/80 dark:hover:bg-slate-700/80 border border-slate-300 dark:border-slate-700 rounded-xl transition-all shadow-xs flex items-center gap-2"
            >
              <span>Explore Category</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

        {/* Right Side: High-End Hardware Image Slider */}
        <div className="lg:col-span-6 xl:col-span-5 flex items-center justify-center relative">
          <div className="relative w-full max-w-lg aspect-16/10 flex items-center justify-center p-4">
            <img
              key={currentBanner.id}
              src={currentBanner.image}
              alt={currentBanner.title}
              className="w-full h-full object-contain filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.25)] dark:drop-shadow-[0_20px_35px_rgba(0,0,0,0.65)] transition-all duration-500 transform hover:scale-105"
            />
          </div>
        </div>

      </div>

      {/* Slide Navigation Controls */}
      {activeBanners.length > 1 && (
        <>
          <button
            onClick={handlePrev}
            aria-label="Previous Offer Slide"
            className="absolute left-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-900 dark:text-white/80 dark:hover:text-white backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-md transition-colors"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <button
            onClick={handleNext}
            aria-label="Next Offer Slide"
            className="absolute right-3 top-1/2 -translate-y-1/2 z-20 p-2.5 rounded-full bg-white/90 hover:bg-white text-slate-800 dark:bg-slate-900/60 dark:hover:bg-slate-900 dark:text-white/80 dark:hover:text-white backdrop-blur-md border border-slate-200 dark:border-slate-700 shadow-md transition-colors"
          >
            <ChevronRight className="w-5 h-5" />
          </button>

          {/* Dots Indicator */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2">
            {activeBanners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Jump to slide ${idx + 1}`}
                className={`h-2 transition-all rounded-full ${
                  currentIndex === idx 
                    ? 'w-8 bg-blue-600 dark:bg-blue-500' 
                    : 'w-2 bg-slate-300 hover:bg-slate-400 dark:bg-slate-600 dark:hover:bg-slate-400'
                }`}
              />
            ))}
          </div>
        </>
      )}

    </div>
  );
};
