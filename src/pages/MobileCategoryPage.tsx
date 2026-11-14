import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/common/ProductCard';
import { formatINR } from '../utils/format';
import { Filter, X, RotateCcw, Smartphone, ChevronDown, Check, Sparkles } from 'lucide-react';

export const MobileCategoryPage: React.FC = () => {
  const { products } = useApp();
  
  // Mobile drawer filter toggle
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Filter states
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState<number>(160000);
  const [pricePreset, setPricePreset] = useState<'all' | 'under25k' | 'under50k' | 'under75k' | 'under100k' | 'above100k'>('all');
  const [selectedRams, setSelectedRams] = useState<string[]>([]);
  const [selectedStorages, setSelectedStorages] = useState<string[]>([]);
  const [selectedCameras, setSelectedCameras] = useState<string[]>([]);
  const [selectedBatteries, setSelectedBatteries] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'popular' | 'latest' | 'price-asc' | 'price-desc'>('latest');

  // Filter options
  const brandOptions = ['Apple', 'Samsung', 'Google', 'OnePlus', 'Xiaomi', 'Asus', 'Sony', 'Vivo'];
  const ramOptions = ['8GB', '12GB', '16GB', '24GB'];
  const storageOptions = ['128GB', '256GB', '512GB', '1TB'];
  const cameraOptions = ['200MP', '50MP', '48MP'];
  const batteryOptions = ['5000 mAh', '6000 mAh', '7000 mAh', '8000 mAh & Above'];

  const toggleArrayFilter = (arr: string[], setArr: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    setArr(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);
  };

  const handlePresetChange = (preset: 'all' | 'under25k' | 'under50k' | 'under75k' | 'under100k' | 'above100k') => {
    setPricePreset(preset);
    if (preset === 'all') setPriceMax(160000);
    else if (preset === 'under25k') setPriceMax(25000);
    else if (preset === 'under50k') setPriceMax(50000);
    else if (preset === 'under75k') setPriceMax(75000);
    else if (preset === 'under100k') setPriceMax(100000);
    else if (preset === 'above100k') setPriceMax(160000);
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setPriceMax(160000);
    setPricePreset('all');
    setSelectedRams([]);
    setSelectedStorages([]);
    setSelectedCameras([]);
    setSelectedBatteries([]);
    setSortBy('latest');
  };

  const activeFiltersCount = 
    selectedBrands.length + 
    (pricePreset !== 'all' || priceMax < 160000 ? 1 : 0) + 
    selectedRams.length + 
    selectedStorages.length + 
    selectedCameras.length + 
    selectedBatteries.length;

  const hasActiveFilters = activeFiltersCount > 0;

  // Filter and sort mobile products
  const allMobiles = useMemo(() => products.filter(p => p.category === 'mobiles'), [products]);

  const filteredMobiles = useMemo(() => {
    let list = [...allMobiles];

    // Price
    if (pricePreset === 'under25k') {
      list = list.filter(p => p.price <= 25000);
    } else if (pricePreset === 'under50k') {
      list = list.filter(p => p.price <= 50000);
    } else if (pricePreset === 'under75k') {
      list = list.filter(p => p.price <= 75000);
    } else if (pricePreset === 'under100k') {
      list = list.filter(p => p.price <= 100000);
    } else if (pricePreset === 'above100k') {
      list = list.filter(p => p.price >= 100000);
    } else {
      list = list.filter(p => p.price <= priceMax);
    }

    // Brands
    if (selectedBrands.length > 0) {
      list = list.filter(p => selectedBrands.includes(p.brand));
    }

    // Specs
    list = list.filter(p => {
      const specs = p.specs as any;
      if (selectedRams.length > 0 && !selectedRams.some(r => specs.ram?.includes(r))) return false;
      if (selectedStorages.length > 0 && !selectedStorages.some(s => specs.storage?.includes(s))) return false;
      if (selectedCameras.length > 0 && !selectedCameras.some(c => specs.camera?.includes(c))) return false;
      if (selectedBatteries.length > 0) {
        const capacity = parseInt(specs.battery?.replace(/[^0-9]/g, '') || '0');
        const matches = selectedBatteries.some(b => {
          if (b === '5000 mAh' && capacity >= 4500 && capacity < 6000) return true;
          if (b === '6000 mAh' && capacity >= 6000 && capacity < 7000) return true;
          if (b === '7000 mAh' && capacity >= 7000 && capacity < 8000) return true;
          if (b.includes('8000') && capacity >= 8000) return true;
          return false;
        });
        if (!matches) return false;
      }
      return true;
    });

    // Sorting
    if (sortBy === 'price-asc') {
      list.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      list.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'popular') {
      list.sort((a, b) => b.rating * b.reviewsCount - a.rating * a.reviewsCount);
    } else if (sortBy === 'latest') {
      list.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    }

    return list;
  }, [allMobiles, priceMax, pricePreset, selectedBrands, selectedRams, selectedStorages, selectedCameras, selectedBatteries, sortBy]);

  // Sidebar filter component
  const FilterContent = (
    <div className="space-y-6 text-xs">
      
      {/* Header with active count & reset */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <Filter className="w-4 h-4 text-blue-600" />
          <span>Refine Search</span>
          {activeFiltersCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-blue-600 text-white flex items-center justify-center text-[10px] font-mono">
              {activeFiltersCount}
            </span>
          )}
        </div>
        {hasActiveFilters && (
          <button
            onClick={resetFilters}
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <RotateCcw className="w-3 h-3" />
            <span>Reset All</span>
          </button>
        )}
      </div>

      {/* Quick Budget / Price Presets */}
      <div>
        <h4 className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Budget Range
        </h4>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { id: 'all', label: 'All Budgets' },
            { id: 'under25k', label: 'Under ₹25K' },
            { id: 'under50k', label: 'Under ₹50K' },
            { id: 'under75k', label: 'Under ₹75K' },
            { id: 'under100k', label: 'Under ₹1 Lakh' },
            { id: 'above100k', label: 'Above ₹1 Lakh' },
          ].map(p => (
            <button
              key={p.id}
              onClick={() => handlePresetChange(p.id as any)}
              className={`py-1.5 px-2 rounded-lg border text-center font-medium transition-all ${
                pricePreset === p.id
                  ? 'bg-blue-600 border-blue-600 text-white font-bold shadow-xs'
                  : 'bg-white dark:bg-slate-800/90 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
              }`}
            >
              {p.label}
            </button>
          ))}
        </div>

        {/* Max Price Slider (INR) */}
        {pricePreset === 'all' && (
          <div className="mt-3 pt-3 border-t border-slate-100 dark:border-slate-800">
            <div className="flex items-center justify-between text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
              <span>Max Price</span>
              <span className="font-mono text-blue-600 dark:text-blue-400 tabular-nums font-bold">
                {formatINR(priceMax)}
              </span>
            </div>
            <input
              type="range"
              min="15000"
              max="160000"
              step="5000"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>₹15,000</span>
              <span>₹1,60,000</span>
            </div>
          </div>
        )}
      </div>

      {/* Clean Brand Selector */}
      <div>
        <h4 className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Brand
        </h4>
        <div className="grid grid-cols-2 gap-1.5">
          {brandOptions.map(brand => {
            const isSelected = selectedBrands.includes(brand);
            return (
              <button
                key={brand}
                onClick={() => toggleArrayFilter(selectedBrands, setSelectedBrands, brand)}
                className={`py-1.5 px-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-700 dark:text-blue-300 font-bold'
                    : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                }`}
              >
                <span>{brand}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* RAM (Memory) */}
      <div>
        <h4 className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          RAM (Memory)
        </h4>
        <div className="grid grid-cols-4 gap-1">
          {ramOptions.map(ram => (
            <button
              key={ram}
              onClick={() => toggleArrayFilter(selectedRams, setSelectedRams, ram)}
              className={`py-1.5 text-center font-mono rounded-lg border transition-all ${
                selectedRams.includes(ram)
                  ? 'bg-blue-600 border-blue-600 text-white font-bold'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
              }`}
            >
              {ram}
            </button>
          ))}
        </div>
      </div>

      {/* Storage (Internal) */}
      <div>
        <h4 className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Storage
        </h4>
        <div className="grid grid-cols-4 gap-1">
          {storageOptions.map(storage => (
            <button
              key={storage}
              onClick={() => toggleArrayFilter(selectedStorages, setSelectedStorages, storage)}
              className={`py-1.5 text-center font-mono rounded-lg border transition-all ${
                selectedStorages.includes(storage)
                  ? 'bg-blue-600 border-blue-600 text-white font-bold'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
              }`}
            >
              {storage}
            </button>
          ))}
        </div>
      </div>

      {/* Camera Resolution */}
      <div>
        <h4 className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Camera
        </h4>
        <div className="grid grid-cols-3 gap-1.5">
          {cameraOptions.map(cam => (
            <button
              key={cam}
              onClick={() => toggleArrayFilter(selectedCameras, setSelectedCameras, cam)}
              className={`py-1.5 px-2 text-center rounded-lg border font-medium transition-all ${
                selectedCameras.includes(cam)
                  ? 'bg-blue-600 border-blue-600 text-white font-bold'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
              }`}
            >
              {cam}
            </button>
          ))}
        </div>
      </div>

      {/* Battery Capacity */}
      <div>
        <h4 className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Battery Capacity
        </h4>
        <div className="grid grid-cols-2 gap-1.5">
          {batteryOptions.map(bat => (
            <button
              key={bat}
              onClick={() => toggleArrayFilter(selectedBatteries, setSelectedBatteries, bat)}
              className={`py-1.5 px-2 text-center rounded-lg border font-medium transition-all ${
                selectedBatteries.includes(bat)
                  ? 'bg-blue-600 border-blue-600 text-white font-bold'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
              }`}
            >
              {bat}
            </button>
          ))}
        </div>
      </div>

    </div>
  );

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        
        {/* Page Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              <Smartphone className="w-4 h-4" />
              <span>Flagship Smart Devices</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
              Mobile Catalog
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Showing {filteredMobiles.length} of {allMobiles.length} mobiles matching your criteria.
            </p>
          </div>

          {/* Sort Controls & Mobile Filter Button */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setFilterDrawerOpen(true)}
              className="lg:hidden flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg shadow-xs"
            >
              <Filter className="w-4 h-4 text-blue-600" />
              <span>Filters {activeFiltersCount > 0 && `(${activeFiltersCount})`}</span>
            </button>

            {/* Sorting Dropdown */}
            <div className="relative flex items-center gap-2">
              <span className="text-xs text-slate-500 hidden sm:inline">Sort:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-3 pr-8 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 shadow-xs cursor-pointer"
                >
                  <option value="latest">Latest Launches</option>
                  <option value="popular">Most Popular</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Active Filter Chips Bar */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 mt-4 pt-2">
            <span className="text-[11px] text-slate-400 font-medium">Applied:</span>
            {selectedBrands.map(b => (
              <button
                key={b}
                onClick={() => toggleArrayFilter(selectedBrands, setSelectedBrands, b)}
                className="inline-flex items-center gap-1 text-[11px] bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800"
              >
                <span>{b}</span>
                <X className="w-3 h-3" />
              </button>
            ))}
            {pricePreset !== 'all' && (
              <button
                onClick={() => handlePresetChange('all')}
                className="inline-flex items-center gap-1 text-[11px] bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800"
              >
                <span>
                  {pricePreset === 'under25k'
                    ? 'Under ₹25K'
                    : pricePreset === 'under50k'
                    ? 'Under ₹50K'
                    : pricePreset === 'under75k'
                    ? 'Under ₹75K'
                    : pricePreset === 'under100k'
                    ? 'Under ₹1 Lakh'
                    : 'Above ₹1 Lakh'}
                </span>
                <X className="w-3 h-3" />
              </button>
            )}
            {selectedBatteries.map(bat => (
              <button
                key={bat}
                onClick={() => toggleArrayFilter(selectedBatteries, setSelectedBatteries, bat)}
                className="inline-flex items-center gap-1 text-[11px] bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800"
              >
                <span>{bat}</span>
                <X className="w-3 h-3" />
              </button>
            ))}
            {selectedRams.map(r => (
              <button
                key={r}
                onClick={() => toggleArrayFilter(selectedRams, setSelectedRams, r)}
                className="inline-flex items-center gap-1 text-[11px] bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800"
              >
                <span>{r} RAM</span>
                <X className="w-3 h-3" />
              </button>
            ))}
            {selectedStorages.map(s => (
              <button
                key={s}
                onClick={() => toggleArrayFilter(selectedStorages, setSelectedStorages, s)}
                className="inline-flex items-center gap-1 text-[11px] bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800"
              >
                <span>{s} Storage</span>
                <X className="w-3 h-3" />
              </button>
            ))}
            <button
              onClick={resetFilters}
              className="text-[11px] text-red-500 hover:underline font-medium ml-1"
            >
              Clear All
            </button>
          </div>
        )}

        {/* 2-Column: Left Filters + Right 3-per-row Desktop Product Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 mt-6">
          
          {/* Desktop Left Sidebar Filters */}
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-32 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              {FilterContent}
            </div>
          </aside>

          {/* Right Product Grid: 3 cards per row on desktop */}
          <section className="lg:col-span-3">
            {filteredMobiles.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredMobiles.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
                <Smartphone className="w-12 h-12 mx-auto text-slate-400" />
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                  No mobile devices matched your filters
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your budget range or selecting fewer brand and specification filters.
                </p>
                <button
                  onClick={resetFilters}
                  className="mt-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold rounded-lg"
                >
                  Reset All Filters
                </button>
              </div>
            )}
          </section>

        </div>
      </div>

      {/* Mobile Drawer Filter Dialog */}
      {filterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-xs">
          <div className="relative w-4/5 max-w-sm bg-white dark:bg-slate-900 h-full p-6 overflow-y-auto shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="text-base font-bold text-slate-900 dark:text-white">Filter Mobiles</span>
              <button
                onClick={() => setFilterDrawerOpen(false)}
                className="p-1 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {FilterContent}
            <div className="pt-4 border-t border-slate-200 dark:border-slate-800">
              <button
                onClick={() => setFilterDrawerOpen(false)}
                className="w-full py-2.5 bg-blue-600 text-white text-xs font-bold rounded-lg shadow-sm"
              >
                Show Results ({filteredMobiles.length})
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
