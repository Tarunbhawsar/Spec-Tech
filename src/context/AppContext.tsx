import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, Blog, AdminUser } from '../types';
import { INITIAL_PRODUCTS, INITIAL_BLOGS } from '../data/mockData';

export type PageRoute = 
  | 'home' 
  | 'mobiles' 
  | 'laptops' 
  | 'blog' 
  | 'blog-detail' 
  | 'product-detail' 
  | 'compare' 
  | 'admin-login' 
  | 'admin-dashboard';

interface AppContextType {
  currentPage: PageRoute;
  selectedProductId: string | null;
  selectedBlogSlug: string | null;
  navigate: (page: PageRoute, params?: { productId?: string; blogSlug?: string }) => void;
  products: Product[];
  blogs: Blog[];
  wishlist: string[];
  compareList: string[];
  toggleWishlist: (productId: string) => void;
  isInWishlist: (productId: string) => boolean;
  toggleCompare: (productId: string) => boolean;
  removeFromCompare: (productId: string) => void;
  isInCompare: (productId: string) => boolean;
  clearCompare: () => void;
  searchOpen: boolean;
  setSearchOpen: (open: boolean) => void;
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  toastMessage: string | null;
  showToast: (msg: string) => void;
  adminUser: AdminUser | null;
  loginAdmin: (user: AdminUser) => void;
  logoutAdmin: () => void;
  refreshProducts: () => Promise<void>;
  refreshBlogs: () => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentPage, setCurrentPage] = useState<PageRoute>('home');
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string | null>(null);

  const [products, setProducts] = useState<Product[]>(INITIAL_PRODUCTS);
  const [blogs, setBlogs] = useState<Blog[]>(INITIAL_BLOGS);

  const [wishlist, setWishlist] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('specvault_wishlist');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [compareList, setCompareList] = useState<string[]>(() => {
    try {
      const saved = localStorage.getItem('specvault_compare');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const [adminUser, setAdminUser] = useState<AdminUser | null>(() => {
    try {
      const saved = localStorage.getItem('specvault_admin_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // Sync wishlist to storage
  useEffect(() => {
    localStorage.setItem('specvault_wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  // Sync compare list to storage
  useEffect(() => {
    localStorage.setItem('specvault_compare', JSON.stringify(compareList));
  }, [compareList]);

  // Sync admin user to storage
  useEffect(() => {
    if (adminUser) {
      localStorage.setItem('specvault_admin_user', JSON.stringify(adminUser));
    } else {
      localStorage.removeItem('specvault_admin_user');
    }
  }, [adminUser]);

  // Fetch from REST API on mount
  const refreshProducts = useCallback(async () => {
    try {
      const res = await fetch('/api/products');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setProducts(data);
        }
      }
    } catch (err) {
      console.warn('Using seeded product store:', err);
    }
  }, []);

  const refreshBlogs = useCallback(async () => {
    try {
      const res = await fetch('/api/blogs');
      if (res.ok) {
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) {
          setBlogs(data);
        }
      }
    } catch (err) {
      console.warn('Using seeded blog store:', err);
    }
  }, []);

  useEffect(() => {
    refreshProducts();
    refreshBlogs();
  }, [refreshProducts, refreshBlogs]);

  const showToast = useCallback((msg: string) => {
    setToastMessage(msg);
    setTimeout(() => {
      setToastMessage(prev => (prev === msg ? null : prev));
    }, 2800);
  }, []);

  const navigate = useCallback((page: PageRoute, params?: { productId?: string; blogSlug?: string }) => {
    if (params?.productId) setSelectedProductId(params.productId);
    if (params?.blogSlug) setSelectedBlogSlug(params.blogSlug);
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const toggleWishlist = useCallback((productId: string) => {
    setWishlist(prev => {
      const exists = prev.includes(productId);
      if (exists) {
        showToast('Removed from Wishlist');
        return prev.filter(id => id !== productId);
      } else {
        showToast('Added to Wishlist');
        return [...prev, productId];
      }
    });
  }, [showToast]);

  const isInWishlist = useCallback((productId: string) => {
    return wishlist.includes(productId);
  }, [wishlist]);

  const toggleCompare = useCallback((productId: string): boolean => {
    if (compareList.includes(productId)) {
      setCompareList(prev => prev.filter(id => id !== productId));
      showToast('Removed from Comparison');
      return false;
    } else {
      if (compareList.length >= 4) {
        showToast('Maximum 4 devices can be compared at once');
        return false;
      }
      setCompareList(prev => [...prev, productId]);
      showToast('Added to Comparison');
      return true;
    }
  }, [compareList, showToast]);

  const removeFromCompare = useCallback((productId: string) => {
    setCompareList(prev => prev.filter(id => id !== productId));
    showToast('Removed from Comparison');
  }, [showToast]);

  const isInCompare = useCallback((productId: string) => {
    return compareList.includes(productId);
  }, [compareList]);

  const clearCompare = useCallback(() => {
    setCompareList([]);
    showToast('Cleared comparison list');
  }, [showToast]);

  const loginAdmin = useCallback((user: AdminUser) => {
    setAdminUser(user);
    showToast(`Welcome back, ${user.name}`);
    navigate('admin-dashboard');
  }, [navigate, showToast]);

  const logoutAdmin = useCallback(() => {
    setAdminUser(null);
    showToast('Signed out of admin dashboard');
    navigate('home');
  }, [navigate, showToast]);

  return (
    <AppContext.Provider
      value={{
        currentPage,
        selectedProductId,
        selectedBlogSlug,
        navigate,
        products,
        blogs,
        wishlist,
        compareList,
        toggleWishlist,
        isInWishlist,
        toggleCompare,
        removeFromCompare,
        isInCompare,
        clearCompare,
        searchOpen,
        setSearchOpen,
        searchQuery,
        setSearchQuery,
        toastMessage,
        showToast,
        adminUser,
        loginAdmin,
        logoutAdmin,
        refreshProducts,
        refreshBlogs,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
