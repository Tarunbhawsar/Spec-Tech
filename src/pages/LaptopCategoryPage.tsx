import React, { useState, useMemo } from 'react';
import { useApp } from '../context/AppContext';
import { ProductCard } from '../components/common/ProductCard';
import { formatINR } from '../utils/format';
import { Filter, X, RotateCcw, Laptop, ChevronDown, Check } from 'lucide-react';

export const LaptopCategoryPage: React.FC = () => {
  const { products } = useApp();

  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  // Filter states
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [priceMax, setPriceMax] = useState<number>(360000);
  const [pricePreset, setPricePreset] = useState<'all' | 'under150k' | '150kto250k' | 'above250k'>('all');
  const [selectedRams, setSelectedRams] = useState<string[]>([]);
  const [selectedStorages, setSelectedStorages] = useState<string[]>([]);
  const [selectedGraphics, setSelectedGraphics] = useState<string[]>([]);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedRefreshRates, setSelectedRefreshRates] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<'popular' | 'latest' | 'price-asc' | 'price-desc'>('latest');

  const brandOptions = ['Apple', 'Dell', 'Asus', 'Lenovo', 'Razer', 'HP', 'Microsoft', 'Acer'];
  const typeOptions = ['Gaming', 'Ultrabook', 'Creator', 'Business'];
  const ramOptions = ['16GB', '32GB', '48GB'];
  const storageOptions = ['512GB', '1TB', '2TB'];
  const graphicsOptions = ['RTX 4090', 'RTX 4080', 'RTX 4070', 'Apple 40-core', 'Intel Arc'];
  const refreshRateOptions = ['90Hz', '120Hz', '240Hz'];

  const toggleArrayFilter = (arr: string[], setArr: React.Dispatch<React.SetStateAction<string[]>>, val: string) => {
    setArr(prev => prev.includes(val) ? prev.filter(x => x !== val) : [...prev, val]);
  };

  const handlePresetChange = (preset: 'all' | 'under150k' | '150kto250k' | 'above250k') => {
    setPricePreset(preset);
    if (preset === 'all') setPriceMax(360000);
    else if (preset === 'under150k') setPriceMax(150000);
    else if (preset === '150kto250k') setPriceMax(250000);
    else if (preset === 'above250k') setPriceMax(360000);
  };

  const resetFilters = () => {
    setSelectedBrands([]);
    setPriceMax(360000);
    setPricePreset('all');
    setSelectedRams([]);
    setSelectedStorages([]);
    setSelectedGraphics([]);
    setSelectedTypes([]);
    setSelectedRefreshRates([]);
    setSortBy('latest');
  };

  const activeFiltersCount = 
    selectedBrands.length + 
    (pricePreset !== 'all' || priceMax < 360000 ? 1 : 0) + 
    selectedRams.length + 
    selectedStorages.length + 
    selectedGraphics.length + 
    selectedTypes.length + 
    selectedRefreshRates.length;

  const hasActiveFilters = activeFiltersCount > 0;

  const allLaptops = useMemo(() => products.filter(p => p.category === 'laptops'), [products]);

  const filteredLaptops = useMemo(() => {
    let list = [...allLaptops];

    if (pricePreset === 'under150k') {
      list = list.filter(p => p.price <= 150000);
    } else if (pricePreset === '150kto250k') {
      list = list.filter(p => p.price >= 150000 && p.price <= 250000);
    } else if (pricePreset === 'above250k') {
      list = list.filter(p => p.price >= 250000);
    } else {
      list = list.filter(p => p.price <= priceMax);
    }

    if (selectedBrands.length > 0) {
      list = list.filter(p => selectedBrands.includes(p.brand));
    }

    list = list.filter(p => {
      const specs = p.specs as any;
      if (selectedRams.length > 0 && !selectedRams.some(r => specs.ram?.includes(r))) return false;
      if (selectedStorages.length > 0 && !selectedStorages.some(s => specs.storage?.includes(s))) return false;
      if (selectedGraphics.length > 0 && !selectedGraphics.some(gpu => specs.graphics?.includes(gpu))) return false;
      if (selectedTypes.length > 0 && !selectedTypes.includes(specs.laptopType)) return false;
      if (selectedRefreshRates.length > 0 && !selectedRefreshRates.some(hz => specs.refreshRate?.includes(hz))) return false;
      return true;
    });

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
  }, [allLaptops, priceMax, pricePreset, selectedBrands, selectedRams, selectedStorages, selectedGraphics, selectedTypes, selectedRefreshRates, sortBy]);

  const FilterContent = (
    <div className="space-y-6 text-xs">
      
      {/* Header */}
      <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
        <div className="flex items-center gap-2 font-bold text-slate-900 dark:text-white">
          <Filter className="w-4 h-4 text-blue-600" />
          <span>Refine Laptops</span>
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

      {/* Quick Budget Presets in INR */}
      <div>
        <h4 className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Budget Tier
        </h4>
        <div className="grid grid-cols-2 gap-1.5">
          {[
            { id: 'all', label: 'All Budgets' },
            { id: 'under150k', label: 'Under ₹1.5L' },
            { id: '150kto250k', label: '₹1.5L – ₹2.5L' },
            { id: 'above250k', label: 'Above ₹2.5L' },
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
              min="70000"
              max="360000"
              step="10000"
              value={priceMax}
              onChange={(e) => setPriceMax(Number(e.target.value))}
              className="w-full accent-blue-600 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] text-slate-400 mt-1 font-mono">
              <span>₹70,000</span>
              <span>₹3,60,000</span>
            </div>
          </div>
        )}
      </div>

      {/* Laptop Form Factor / Type */}
      <div>
        <h4 className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Category / Use-Case
        </h4>
        <div className="grid grid-cols-2 gap-1.5">
          {typeOptions.map(t => (
            <button
              key={t}
              onClick={() => toggleArrayFilter(selectedTypes, setSelectedTypes, t)}
              className={`py-1.5 px-2 rounded-lg border text-center font-medium transition-all ${
                selectedTypes.includes(t)
                  ? 'bg-blue-600 border-blue-600 text-white font-bold'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Brand Selection */}
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
          Memory (RAM)
        </h4>
        <div className="grid grid-cols-3 gap-1.5">
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

      {/* Storage SSD */}
      <div>
        <h4 className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          SSD Storage
        </h4>
        <div className="grid grid-cols-3 gap-1.5">
          {storageOptions.map(s => (
            <button
              key={s}
              onClick={() => toggleArrayFilter(selectedStorages, setSelectedStorages, s)}
              className={`py-1.5 text-center font-mono rounded-lg border transition-all ${
                selectedStorages.includes(s)
                  ? 'bg-blue-600 border-blue-600 text-white font-bold'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
              }`}
            >
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Graphics Card */}
      <div>
        <h4 className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Graphics (GPU)
        </h4>
        <div className="space-y-1.5">
          {graphicsOptions.map(gpu => {
            const isSelected = selectedGraphics.includes(gpu);
            return (
              <button
                key={gpu}
                onClick={() => toggleArrayFilter(selectedGraphics, setSelectedGraphics, gpu)}
                className={`w-full py-1.5 px-2.5 rounded-lg border text-left flex items-center justify-between transition-all ${
                  isSelected
                    ? 'bg-blue-50 dark:bg-blue-950/40 border-blue-500 text-blue-700 dark:text-blue-300 font-bold'
                    : 'bg-white dark:bg-slate-800/80 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
                }`}
              >
                <span>{gpu}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />}
              </button>
            );
          })}
        </div>
      </div>

      {/* Display Refresh */}
      <div>
        <h4 className="font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-2">
          Display Refresh Rate
        </h4>
        <div className="grid grid-cols-3 gap-1.5">
          {refreshRateOptions.map(hz => (
            <button
              key={hz}
              onClick={() => toggleArrayFilter(selectedRefreshRates, setSelectedRefreshRates, hz)}
              className={`py-1.5 text-center font-mono rounded-lg border transition-all ${
                selectedRefreshRates.includes(hz)
                  ? 'bg-blue-600 border-blue-600 text-white font-bold'
                  : 'bg-white dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-700 dark:text-slate-300 hover:border-slate-400'
              }`}
            >
              {hz}
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
              <Laptop className="w-4 h-4" />
              <span>Ultrabooks &amp; Workstations</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
              Laptop Catalog
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Showing {filteredLaptops.length} of {allLaptops.length} performance laptops.
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

            {/* Sorting */}
            <div className="relative flex items-center gap-2">
              <span className="text-xs text-slate-500 hidden sm:inline">Sort:</span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="appearance-none bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg pl-3 pr-8 py-2 text-xs font-semibold text-slate-800 dark:text-slate-200 focus:outline-none focus:border-blue-500 shadow-xs cursor-pointer"
                >
                  <option value="latest">Latest Hardware</option>
                  <option value="popular">Top Rated</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
                <ChevronDown className="absolute right-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        {/* Active Filter Chips */}
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
                <span>{pricePreset === 'under150k' ? 'Under ₹1.5L' : pricePreset === '150kto250k' ? '₹1.5L – ₹2.5L' : 'Above ₹2.5L'}</span>
                <X className="w-3 h-3" />
              </button>
            )}
            {selectedTypes.map(t => (
              <button
                key={t}
                onClick={() => toggleArrayFilter(selectedTypes, setSelectedTypes, t)}
                className="inline-flex items-center gap-1 text-[11px] bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800"
              >
                <span>{t}</span>
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
            {selectedGraphics.map(g => (
              <button
                key={g}
                onClick={() => toggleArrayFilter(selectedGraphics, setSelectedGraphics, g)}
                className="inline-flex items-center gap-1 text-[11px] bg-blue-50 dark:bg-blue-950/50 text-blue-700 dark:text-blue-300 px-2 py-0.5 rounded-md border border-blue-200 dark:border-blue-800"
              >
                <span>{g}</span>
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
          
          <aside className="hidden lg:block lg:col-span-1">
            <div className="sticky top-32 p-5 bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs">
              {FilterContent}
            </div>
          </aside>

          <section className="lg:col-span-3">
            {filteredLaptops.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredLaptops.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            ) : (
              <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-3">
                <Laptop className="w-12 h-12 mx-auto text-slate-400" />
                <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">
                  No laptops matched your active filters
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Try adjusting your budget tier or clearing specific GPU or RAM requirements.
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

      {/* Mobile Drawer */}
      {filterDrawerOpen && (
        <div className="fixed inset-0 z-50 flex lg:hidden bg-black/60 backdrop-blur-xs">
          <div className="relative w-4/5 max-w-sm bg-white dark:bg-slate-900 h-full p-6 overflow-y-auto shadow-2xl space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
              <span className="text-base font-bold text-slate-900 dark:text-white">Filter Laptops</span>
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
                Show Results ({filteredLaptops.length})
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
