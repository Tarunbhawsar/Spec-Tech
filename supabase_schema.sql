-- =====================================================================
-- SPECVAULT / TECHPULSE - SUPABASE POSTGRESQL SCHEMA & RLS POLICIES
-- =====================================================================

-- 1. EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  description TEXT,
  icon VARCHAR(50),
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. BRANDS TABLE
CREATE TABLE IF NOT EXISTS brands (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  logo_url TEXT,
  website_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. PRODUCTS TABLE
CREATE TABLE IF NOT EXISTS products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  category_id UUID REFERENCES categories(id) ON DELETE SET NULL,
  category_type VARCHAR(50) NOT NULL DEFAULT 'mobiles', -- 'mobiles' or 'laptops'
  brand_id UUID REFERENCES brands(id) ON DELETE SET NULL,
  brand_name VARCHAR(100) NOT NULL,
  price NUMERIC(10, 2) NOT NULL,
  original_price NUMERIC(10, 2),
  currency VARCHAR(10) DEFAULT 'INR',
  rating NUMERIC(2, 1) DEFAULT 4.8,
  reviews_count INT DEFAULT 0,
  is_latest BOOLEAN DEFAULT false,
  is_popular BOOLEAN DEFAULT false,
  is_featured BOOLEAN DEFAULT false,
  affiliate_url TEXT NOT NULL,
  affiliate_vendor VARCHAR(100) DEFAULT 'Amazon',
  short_description TEXT NOT NULL,
  description TEXT NOT NULL,
  highlights TEXT[],
  pros TEXT[],
  cons TEXT[],
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 5. PRODUCT IMAGES TABLE
CREATE TABLE IF NOT EXISTS product_images (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  alt_text VARCHAR(255),
  is_primary BOOLEAN DEFAULT false,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 6. PRODUCT SPECIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS product_specifications (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE UNIQUE,
  ram VARCHAR(100) NOT NULL,
  storage VARCHAR(100) NOT NULL,
  processor VARCHAR(255) NOT NULL,
  display VARCHAR(255) NOT NULL,
  camera VARCHAR(255), -- for mobiles
  battery VARCHAR(255) NOT NULL,
  graphics VARCHAR(255), -- for laptops
  os VARCHAR(100) NOT NULL,
  connectivity TEXT,
  dimensions TEXT,
  weight VARCHAR(100),
  extra_specs JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 7. BLOG CATEGORIES TABLE
CREATE TABLE IF NOT EXISTS blog_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name VARCHAR(100) NOT NULL,
  slug VARCHAR(100) UNIQUE NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 8. BLOGS TABLE
CREATE TABLE IF NOT EXISTS blogs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  excerpt TEXT NOT NULL,
  content TEXT NOT NULL,
  category VARCHAR(100) NOT NULL,
  category_id UUID REFERENCES blog_categories(id) ON DELETE SET NULL,
  thumbnail TEXT NOT NULL,
  author_name VARCHAR(100) NOT NULL DEFAULT 'TechPulse Editorial',
  author_role VARCHAR(100) DEFAULT 'Senior Hardware Analyst',
  read_time VARCHAR(50) DEFAULT '5 min read',
  status VARCHAR(20) DEFAULT 'published', -- 'draft' or 'published'
  published_at TIMESTAMPTZ DEFAULT NOW(),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 9. OFFER BANNERS TABLE
CREATE TABLE IF NOT EXISTS offer_banners (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  subtitle TEXT NOT NULL,
  badge VARCHAR(100) DEFAULT 'Featured Deal',
  price NUMERIC(10, 2) NOT NULL,
  original_price NUMERIC(10, 2),
  cta_text VARCHAR(100) DEFAULT 'Check Best Price',
  cta_link TEXT NOT NULL,
  image_url TEXT NOT NULL,
  category VARCHAR(50) DEFAULT 'mobiles',
  is_active BOOLEAN DEFAULT true,
  display_order INT DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 10. WISHLISTS & USER SESSIONS
CREATE TABLE IF NOT EXISTS wishlists (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID, -- References auth.users(id) when Supabase Auth is active
  session_id VARCHAR(255),
  product_id UUID REFERENCES products(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, product_id)
);

-- 11. COMPARISONS TABLE
CREATE TABLE IF NOT EXISTS comparisons (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID,
  session_id VARCHAR(255),
  product_ids UUID[] NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =====================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================================

ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE brands ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_images ENABLE ROW LEVEL SECURITY;
ALTER TABLE product_specifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;
ALTER TABLE blog_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE offer_banners ENABLE ROW LEVEL SECURITY;
ALTER TABLE wishlists ENABLE ROW LEVEL SECURITY;
ALTER TABLE comparisons ENABLE ROW LEVEL SECURITY;

-- PUBLIC READ POLICIES (Anyone can view products, banners, blogs, specs, categories, brands)
CREATE POLICY "Allow public read access to categories" ON categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access to brands" ON brands FOR SELECT USING (true);
CREATE POLICY "Allow public read access to products" ON products FOR SELECT USING (true);
CREATE POLICY "Allow public read access to product_images" ON product_images FOR SELECT USING (true);
CREATE POLICY "Allow public read access to product_specifications" ON product_specifications FOR SELECT USING (true);
CREATE POLICY "Allow public read access to published blogs" ON blogs FOR SELECT USING (status = 'published');
CREATE POLICY "Allow public read access to blog_categories" ON blog_categories FOR SELECT USING (true);
CREATE POLICY "Allow public read access to active offer_banners" ON offer_banners FOR SELECT USING (is_active = true);

-- WISHLIST PER-USER ACCESS
CREATE POLICY "Users can manage own wishlist" ON wishlists
  FOR ALL USING (auth.uid() = user_id OR user_id IS NULL);

-- COMPARISONS PER-USER ACCESS
CREATE POLICY "Users can manage own comparisons" ON comparisons
  FOR ALL USING (auth.uid() = user_id OR user_id IS NULL);

-- ADMIN-ONLY MUTATION POLICIES (Admins can insert, update, delete)
CREATE POLICY "Admins can manage products" ON products
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role' OR auth.jwt() ->> 'email' IN ('admin@techpulse.io'));

CREATE POLICY "Admins can manage product images" ON product_images
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role' OR auth.jwt() ->> 'email' IN ('admin@techpulse.io'));

CREATE POLICY "Admins can manage product specifications" ON product_specifications
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role' OR auth.jwt() ->> 'email' IN ('admin@techpulse.io'));

CREATE POLICY "Admins can manage blogs" ON blogs
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role' OR auth.jwt() ->> 'email' IN ('admin@techpulse.io'));

CREATE POLICY "Admins can manage offer_banners" ON offer_banners
  FOR ALL USING (auth.jwt() ->> 'role' = 'service_role' OR auth.jwt() ->> 'email' IN ('admin@techpulse.io'));
