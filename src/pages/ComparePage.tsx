import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Product } from '../types';
import { formatINR } from '../utils/format';
import { 
  Layers, 
  X, 
  Plus, 
  ShoppingBag, 
  ExternalLink, 
  Search, 
  Eye, 
  Sparkles,
  TrendingDown,
  Cpu,
  Monitor,
  Battery,
  Camera,
  ShieldCheck,
  Check
} from 'lucide-react';

export const ComparePage: React.FC = () => {
  const { 
    compareList, 
    toggleCompare, 
    removeFromCompare, 
    clearCompare, 
    products, 
    navigate 
  } = useApp();

  const [highlightDifferences, setHighlightDifferences] = useState(true);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [modalSearch, setModalSearch] = useState('');
  const [modalCategory, setModalCategory] = useState<'all' | 'mobiles' | 'laptops'>('all');

  // Selected products strictly from user's comparison list
  const selectedProducts: Product[] = compareList
    .map(id => products.find(p => p.id === id))
    .filter(Boolean) as Product[];

  // Filter available products to add in modal
  const availableToAdd = products
    .filter(p => !compareList.includes(p.id))
    .filter(p => {
      if (modalCategory !== 'all' && p.category !== modalCategory) return false;
      if (!modalSearch.trim()) return true;
      const q = modalSearch.toLowerCase();
      return p.name.toLowerCase().includes(q) || p.brand.toLowerCase().includes(q);
    });

  // Helper functions for numeric spec comparison
  const getBatteryNumber = (p: Product): number => {
    const batStr = (p.specs as any).battery || '';
    const match = batStr.match(/(\d+)\s*mAh/i);
    return match ? parseInt(match[1], 10) : 0;
  };

  const getRamNumber = (p: Product): number => {
    const ramStr = (p.specs as any).ram || '';
    const match = ramStr.match(/(\d+)\s*GB/i);
    return match ? parseInt(match[1], 10) : 0;
  };

  const getCameraMP = (p: Product): number => {
    const camStr = (p.specs as any).camera || '';
    const match = camStr.match(/(\d+)\s*MP/i);
    return match ? parseInt(match[1], 10) : 0;
  };

  const minPrice = selectedProducts.length > 1 ? Math.min(...selectedProducts.map(p => p.price)) : 0;
  const maxBattery = selectedProducts.length > 1 ? Math.max(...selectedProducts.map(p => getBatteryNumber(p))) : 0;
  const maxRam = selectedProducts.length > 1 ? Math.max(...selectedProducts.map(p => getRamNumber(p))) : 0;
  const maxCamera = selectedProducts.length > 1 ? Math.max(...selectedProducts.map(p => getCameraMP(p))) : 0;

  // Categorized Specification Structure
  const specSections = [
    {
      title: 'Pricing & Value',
      icon: <TrendingDown className="w-4 h-4 text-emerald-500" />,
      rows: [
        {
          key: 'price',
          label: 'Current Price',
          getValue: (p: Product) => formatINR(p.price),
          getAdvantage: (p: Product) => {
            if (selectedProducts.length > 1 && p.price === minPrice && minPrice > 0) {
              return 'Best Price';
            }
            return null;
          }
        },
        {
          key: 'originalPrice',
          label: 'Original MRP',
          getValue: (p: Product) => p.originalPrice ? formatINR(p.originalPrice) : '—',
          getAdvantage: () => null
        },
        {
          key: 'brand',
          label: 'Brand / Manufacturer',
          getValue: (p: Product) => p.brand,
          getAdvantage: () => null
        }
      ]
    },
    {
      title: 'Silicon & Performance',
      icon: <Cpu className="w-4 h-4 text-blue-500" />,
      rows: [
        {
          key: 'processor',
          label: 'Processor / Chipset',
          getValue: (p: Product) => (p.specs as any).processor || '—',
          getAdvantage: () => null
        },
        {
          key: 'ram',
          label: 'RAM (Memory)',
          getValue: (p: Product) => (p.specs as any).ram || '—',
          getAdvantage: (p: Product) => {
            const ram = getRamNumber(p);
            if (selectedProducts.length > 1 && ram === maxRam && maxRam > 0 && selectedProducts.some(o => getRamNumber(o) < maxRam)) {
              return 'Higher RAM';
            }
            return null;
          }
        },
        {
          key: 'storage',
          label: 'Storage (Internal / SSD)',
          getValue: (p: Product) => (p.specs as any).storage || '—',
          getAdvantage: () => null
        },
        {
          key: 'graphics',
          label: 'Graphics / GPU',
          getValue: (p: Product) => (p.specs as any).graphics || (p.category === 'mobiles' ? 'Integrated High-Performance GPU' : 'Integrated Architecture'),
          getAdvantage: () => null
        },
        {
          key: 'os',
          label: 'Operating System',
          getValue: (p: Product) => (p.specs as any).os || '—',
          getAdvantage: () => null
        }
      ]
    },
    {
      title: 'Display & Visuals',
      icon: <Monitor className="w-4 h-4 text-purple-500" />,
      rows: [
        {
          key: 'display',
          label: 'Display Technology',
          getValue: (p: Product) => (p.specs as any).display || '—',
          getAdvantage: () => null
        },
        {
          key: 'refreshRate',
          label: 'Refresh Rate',
          getValue: (p: Product) => (p.specs as any).refreshRate || '120Hz',
          getAdvantage: () => null
        }
      ]
    },
    {
      title: 'Battery & Power',
      icon: <Battery className="w-4 h-4 text-amber-500" />,
      rows: [
        {
          key: 'battery',
          label: 'Battery Capacity',
          getValue: (p: Product) => (p.specs as any).battery || '—',
          getAdvantage: (p: Product) => {
            const bat = getBatteryNumber(p);
            if (selectedProducts.length > 1 && bat === maxBattery && maxBattery > 0 && selectedProducts.some(o => getBatteryNumber(o) < maxBattery)) {
              return 'Battery Winner';
            }
            return null;
          }
        },
        {
          key: 'charging',
          label: 'Charging Speed',
          getValue: (p: Product) => (p.specs as any).chargingSpeed || 'Fast Charge Supported',
          getAdvantage: () => null
        }
      ]
    },
    {
      title: 'Camera & Optics',
      icon: <Camera className="w-4 h-4 text-rose-500" />,
      rows: [
        {
          key: 'camera',
          label: 'Primary Camera Setup',
          getValue: (p: Product) => (p.specs as any).camera || (p.category === 'laptops' ? 'Integrated Full HD 1080p Studio Webcam' : '—'),
          getAdvantage: (p: Product) => {
            const cam = getCameraMP(p);
            if (selectedProducts.length > 1 && cam === maxCamera && maxCamera > 50) {
              return `${cam}MP Sensor`;
            }
            return null;
          }
        }
      ]
    },
    {
      title: 'Build & Connectivity',
      icon: <ShieldCheck className="w-4 h-4 text-teal-500" />,
      rows: [
        {
          key: 'weight',
          label: 'Chassis Weight',
          getValue: (p: Product) => (p.specs as any).weight || '—',
          getAdvantage: () => null
        },
        {
          key: 'connectivity',
          label: 'Connectivity & Ports',
          getValue: (p: Product) => (p.specs as any).connectivity || (p.specs as any).ports || 'Wi-Fi 7, Bluetooth 5.4, USB-C',
          getAdvantage: () => null
        }
      ]
    }
  ];

  // Check if a row differs across selected products
  const isRowDifferent = (getValue: (p: Product) => string) => {
    if (selectedProducts.length <= 1) return false;
    const firstVal = getValue(selectedProducts[0]).toLowerCase().trim();
    return selectedProducts.some(p => getValue(p).toLowerCase().trim() !== firstVal);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        
        {/* Simple Original Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-200 dark:border-slate-800 gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wider">
              <Layers className="w-4 h-4" />
              <span>Side-by-Side Analysis Engine</span>
            </div>
            <h1 className="text-3xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
              Product Comparison Matrix
            </h1>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Select 2 to 4 devices to contrast silicon specs, battery endurance, and verified market prices.
            </p>
          </div>

          {/* Action Bar: Toggle highlight, Clear, Add */}
          <div className="flex flex-wrap items-center gap-3">
            {selectedProducts.length > 1 && (
              <label className="flex items-center gap-2 text-xs font-semibold text-slate-700 dark:text-slate-300 bg-white dark:bg-slate-900 px-3 py-2 rounded-lg border border-slate-200 dark:border-slate-800 shadow-xs cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={highlightDifferences}
                  onChange={(e) => setHighlightDifferences(e.target.checked)}
                  className="rounded text-blue-600 focus:ring-blue-500 w-3.5 h-3.5"
                />
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>Highlight Differences</span>
              </label>
            )}

            {selectedProducts.length < 4 && (
              <button
                onClick={() => setAddModalOpen(true)}
                className="px-3.5 py-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-xs flex items-center gap-1.5 transition-colors"
              >
                <Plus className="w-4 h-4" />
                <span>Add Device ({selectedProducts.length}/4)</span>
              </button>
            )}

            {selectedProducts.length > 0 && (
              <button
                onClick={clearCompare}
                className="px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-red-500 rounded-lg border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>
        </div>

        {/* COMPARISON CONTENT */}
        {selectedProducts.length > 0 ? (
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-xs overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs text-left border-collapse min-w-[720px]">
                
                {/* Product Card Headers */}
                <thead>
                  <tr className="border-b-2 border-slate-200 dark:border-slate-800 bg-slate-50/70 dark:bg-slate-950/50">
                    <th className="p-4 sm:p-6 w-1/4 min-w-[180px] align-top text-xs font-bold uppercase tracking-wider text-slate-400 border-r border-slate-200 dark:border-slate-800">
                      Product Overview
                    </th>
                    {selectedProducts.map((p) => (
                      <th 
                        key={p.id} 
                        className="p-4 sm:p-6 w-1/4 min-w-[220px] align-top relative border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900"
                      >
                        <button
                          onClick={() => removeFromCompare(p.id)}
                          title="Remove device"
                          className="absolute top-4 right-4 p-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-950 transition-colors"
                        >
                          <X className="w-3.5 h-3.5" />
                        </button>

                        <div className="flex flex-col items-center text-center space-y-3">
                          <div className="w-32 h-32 p-2 bg-slate-50 dark:bg-slate-800 rounded-xl border border-slate-100 dark:border-slate-700/80 flex items-center justify-center">
                            <img
                              src={p.images[0]}
                              alt={p.name}
                              className="w-full h-full object-contain"
                            />
                          </div>

                          <div>
                            <span className="text-[10px] uppercase font-bold text-blue-600 dark:text-blue-400 tracking-wider">
                              {p.brand}
                            </span>
                            <h3 className="text-sm font-bold text-slate-900 dark:text-white line-clamp-2 mt-0.5 min-h-[38px]">
                              {p.name}
                            </h3>
                            <div className="text-base font-extrabold font-mono tabular-nums text-slate-900 dark:text-white mt-1">
                              {formatINR(p.price)}
                            </div>
                          </div>

                          <div className="w-full space-y-2 pt-1">
                            <a
                              href={p.affiliateUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="w-full py-2 px-3 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center justify-center gap-1.5 shadow-xs"
                            >
                              <ShoppingBag className="w-3.5 h-3.5" />
                              <span>Buy on {p.affiliateVendor}</span>
                              <ExternalLink className="w-3 h-3 text-blue-200" />
                            </a>

                            <button
                              onClick={() => navigate('product-detail', { productId: p.id })}
                              className="w-full py-1.5 px-3 text-[11px] font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors flex items-center justify-center gap-1"
                            >
                              <Eye className="w-3 h-3" />
                              <span>View Full Details</span>
                            </button>
                          </div>
                        </div>
                      </th>
                    ))}
                    {selectedProducts.length < 4 && (
                      <th className="p-4 sm:p-6 w-1/4 min-w-[200px] align-middle text-center bg-slate-50/30 dark:bg-slate-950/20">
                        <button
                          onClick={() => setAddModalOpen(true)}
                          className="mx-auto flex flex-col items-center justify-center p-6 border-2 border-dashed border-slate-300 dark:border-slate-700 rounded-xl text-slate-400 hover:text-blue-500 hover:border-blue-500 transition-colors w-full max-w-[180px] group cursor-pointer"
                        >
                          <Plus className="w-6 h-6 mb-1 group-hover:scale-110 transition-transform" />
                          <span className="text-xs font-semibold">Add Product</span>
                        </button>
                      </th>
                    )}
                  </tr>
                </thead>

                {/* Categorized Specification Rows */}
                <tbody>
                  {specSections.map((section) => (
                    <React.Fragment key={section.title}>
                      
                      {/* Category Header Row */}
                      <tr className="bg-slate-100/90 dark:bg-slate-800/90 border-t border-b border-slate-200 dark:border-slate-700/80">
                        <td
                          colSpan={selectedProducts.length + (selectedProducts.length < 4 ? 2 : 1)}
                          className="py-2.5 px-4 sm:px-6 text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200"
                        >
                          <div className="flex items-center gap-2">
                            {section.icon}
                            <span>{section.title}</span>
                          </div>
                        </td>
                      </tr>

                      {/* Spec Rows */}
                      {section.rows.map((row) => {
                        const isDiff = highlightDifferences && isRowDifferent(row.getValue);
                        
                        return (
                          <tr 
                            key={row.key} 
                            className={`border-b border-slate-100 dark:border-slate-800/80 transition-colors ${
                              isDiff 
                                ? 'bg-amber-50/40 dark:bg-amber-950/15' 
                                : 'hover:bg-slate-50/50 dark:hover:bg-slate-800/40'
                            }`}
                          >
                            {/* Label */}
                            <td className="py-3 px-4 sm:px-6 font-bold text-slate-600 dark:text-slate-400 border-r border-slate-200 dark:border-slate-800">
                              <div className="flex items-center gap-1.5">
                                {isDiff && <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0" />}
                                <span>{row.label}</span>
                              </div>
                            </td>

                            {/* Product Values */}
                            {selectedProducts.map((p) => {
                              const val = row.getValue(p);
                              const adv = row.getAdvantage(p);

                              return (
                                <td 
                                  key={p.id} 
                                  className={`py-3 px-4 sm:px-6 font-medium text-slate-800 dark:text-slate-200 border-r border-slate-200 dark:border-slate-800 ${
                                    adv ? 'bg-emerald-50/40 dark:bg-emerald-950/20' : ''
                                  }`}
                                >
                                  <div className="space-y-1">
                                    <div className={adv ? 'font-bold text-emerald-900 dark:text-emerald-200' : ''}>
                                      {val}
                                    </div>
                                    {adv && (
                                      <span className="inline-block text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 dark:bg-emerald-950/80 dark:text-emerald-300">
                                        ✓ {adv}
                                      </span>
                                    )}
                                  </div>
                                </td>
                              );
                            })}

                            {/* Empty column if less than 4 */}
                            {selectedProducts.length < 4 && (
                              <td className="py-3 px-4 sm:px-6 bg-slate-50/20 dark:bg-slate-950/10" />
                            )}
                          </tr>
                        );
                      })}

                    </React.Fragment>
                  ))}
                </tbody>

              </table>
            </div>
          </div>
        ) : (
          <div className="py-20 text-center bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 p-8 space-y-4 shadow-xs">
            <Layers className="w-12 h-12 mx-auto text-blue-500" />
            <h3 className="text-lg font-bold text-slate-900 dark:text-white">
              No devices currently in comparison
            </h3>
            <p className="text-xs text-slate-500 max-w-md mx-auto">
              Add devices from the catalog or click "Select Devices" below to compare full silicon architectures, cameras, and prices side-by-side.
            </p>
            <button
              onClick={() => setAddModalOpen(true)}
              className="px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-sm"
            >
              Select Devices to Compare
            </button>
          </div>
        )}

      </div>

      {/* SEARCH & ADD PRODUCT MODAL */}
      {addModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs">
          <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 max-w-lg w-full max-h-[85vh] flex flex-col shadow-2xl overflow-hidden">
            
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                  <Plus className="w-4 h-4 text-blue-500" />
                  <span>Add Product to Comparison</span>
                </h3>
                <p className="text-[11px] text-slate-500">
                  Select a mobile or laptop to add to the side-by-side matrix.
                </p>
              </div>
              <button
                onClick={() => setAddModalOpen(false)}
                className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Search Input & Category Filter */}
            <div className="p-4 border-b border-slate-100 dark:border-slate-800 space-y-2.5">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search mobiles, laptops by name or brand..."
                  value={modalSearch}
                  onChange={(e) => setModalSearch(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 text-xs bg-slate-100 dark:bg-slate-800 rounded-lg border border-transparent focus:outline-none focus:border-blue-500"
                  autoFocus
                />
              </div>

              <div className="flex gap-1.5">
                {(['all', 'mobiles', 'laptops'] as const).map(cat => (
                  <button
                    key={cat}
                    onClick={() => setModalCategory(cat)}
                    className={`py-1 px-3 text-[11px] rounded-lg font-semibold capitalize transition-colors ${
                      modalCategory === cat
                        ? 'bg-blue-600 text-white'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* Available Products List */}
            <div className="p-4 flex-1 overflow-y-auto space-y-2">
              {availableToAdd.length > 0 ? (
                availableToAdd.map((p) => (
                  <div
                    key={p.id}
                    className="flex items-center justify-between p-2.5 rounded-xl hover:bg-blue-50/50 dark:hover:bg-slate-800 border border-slate-100 dark:border-slate-800 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <img
                        src={p.images[0]}
                        alt={p.name}
                        className="w-11 h-11 object-contain rounded-lg bg-white dark:bg-slate-950 p-1 border border-slate-100 dark:border-slate-800"
                      />
                      <div>
                        <div className="text-xs font-bold text-slate-900 dark:text-white line-clamp-1">
                          {p.name}
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {p.brand} · <span className="font-mono tabular-nums font-semibold text-slate-800 dark:text-slate-200">{formatINR(p.price)}</span>
                        </div>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        toggleCompare(p.id);
                        if (compareList.length + 1 >= 4) {
                          setAddModalOpen(false);
                        }
                      }}
                      className="px-3.5 py-1.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors flex items-center gap-1 shadow-xs"
                    >
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add</span>
                    </button>
                  </div>
                ))
              ) : (
                <div className="text-center py-8 text-xs text-slate-400">
                  No devices available matching your search.
                </div>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
