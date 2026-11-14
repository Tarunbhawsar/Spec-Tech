import React from 'react';
import { ThemeProvider } from './context/ThemeContext';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { CompareDrawer } from './components/common/CompareDrawer';
import { Toast } from './components/common/Toast';

import { HomePage } from './pages/HomePage';
import { MobileCategoryPage } from './pages/MobileCategoryPage';
import { LaptopCategoryPage } from './pages/LaptopCategoryPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { BlogListingPage } from './pages/BlogListingPage';
import { BlogDetailPage } from './pages/BlogDetailPage';
import { ComparePage } from './pages/ComparePage';
import { AdminLoginPage } from './pages/AdminLoginPage';
import { AdminDashboardPage } from './pages/AdminDashboardPage';

const MainLayout: React.FC = () => {
  const { currentPage } = useApp();

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage />;
      case 'mobiles':
        return <MobileCategoryPage />;
      case 'laptops':
        return <LaptopCategoryPage />;
      case 'product-detail':
        return <ProductDetailPage />;
      case 'blog':
        return <BlogListingPage />;
      case 'blog-detail':
        return <BlogDetailPage />;
      case 'compare':
        return <ComparePage />;
      case 'admin-login':
        return <AdminLoginPage />;
      case 'admin-dashboard':
        return <AdminDashboardPage />;
      default:
        return <HomePage />;
    }
  };

  const isAdminView = currentPage === 'admin-dashboard' || currentPage === 'admin-login';

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-200">
      {!isAdminView && <Header />}
      <div className="flex-1">
        {renderPage()}
      </div>
      {!isAdminView && <Footer />}
      <CompareDrawer />
      <Toast />
    </div>
  );
};

export default function App() {
  return (
    <ThemeProvider>
      <AppProvider>
        <MainLayout />
      </AppProvider>
    </ThemeProvider>
  );
}
