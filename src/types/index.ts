export type ProductCategory = 'mobiles' | 'laptops';

export interface MobileSpecs {
  ram: string;
  storage: string;
  processor: string;
  display: string;
  camera: string;
  battery: string;
  os: string;
  connectivity?: string;
  dimensions?: string;
  weight?: string;
  displaySize?: string;
  refreshRate?: string;
  chargingSpeed?: string;
  sim?: string;
}

export interface LaptopSpecs {
  ram: string;
  storage: string;
  processor: string;
  graphics: string;
  display: string;
  displaySize: string;
  refreshRate: string;
  laptopType: 'Ultrabook' | 'Gaming' | 'Business' | 'Creator';
  battery: string;
  os: string;
  connectivity?: string;
  weight?: string;
  ports?: string;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  brand: string;
  category: ProductCategory;
  price: number;
  originalPrice?: number;
  currency: string;
  rating: number;
  reviewsCount: number;
  isLatest: boolean;
  isPopular: boolean;
  isFeatured?: boolean;
  affiliateUrl: string;
  affiliateVendor: 'Amazon' | 'Best Buy' | 'Official Store' | 'B&H Photo';
  shortDescription: string;
  description: string;
  highlights: string[];
  pros: string[];
  cons: string[];
  images: string[];
  specs: MobileSpecs | LaptopSpecs;
  createdAt: string;
}

export interface BlogCategory {
  id: string;
  name: string;
  slug: string;
}

export interface BlogTableOfContentsItem {
  id: string;
  title: string;
  level: number;
}

export interface Blog {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  thumbnail: string;
  author: {
    name: string;
    role: string;
    avatar?: string;
  };
  publishedAt: string;
  readTime: string;
  tags: string[];
  tableOfContents?: BlogTableOfContentsItem[];
  relatedProductIds?: string[];
  status?: 'draft' | 'published';
}

export interface OfferBanner {
  id: string;
  title: string;
  subtitle: string;
  badge: string;
  price: number;
  originalPrice?: number;
  ctaText: string;
  ctaLink: string;
  image: string;
  category: ProductCategory;
  active: boolean;
}

export interface MobileFilters {
  priceMin: number;
  priceMax: number;
  brands: string[];
  rams: string[];
  storages: string[];
  cameras: string[];
  processors: string[];
  batteries: string[];
  displaySizes: string[];
  searchQuery: string;
  sortBy: 'popular' | 'latest' | 'price-asc' | 'price-desc';
}

export interface LaptopFilters {
  priceMin: number;
  priceMax: number;
  brands: string[];
  rams: string[];
  storages: string[];
  processors: string[];
  graphics: string[];
  displaySizes: string[];
  refreshRates: string[];
  laptopTypes: string[];
  searchQuery: string;
  sortBy: 'popular' | 'latest' | 'price-asc' | 'price-desc';
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'editor';
  token: string;
}
