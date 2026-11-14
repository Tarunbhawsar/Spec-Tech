import { Product, Blog, OfferBanner } from '../types';

export const INITIAL_OFFER_BANNERS: OfferBanner[] = [
  {
    id: 'banner-titan-phone',
    title: 'Titanium Pro 16 Max',
    subtitle: 'Next-Gen 3nm Architecture. Aerospace Grade Titanium with 5x Periscope Zoom & All-Day Battery.',
    badge: 'Limited Flagship Deal',
    price: 134900,
    originalPrice: 144900,
    ctaText: 'Claim Amazon Prime Deal',
    ctaLink: 'https://amazon.com/dp/B0BDHW8WVE?tag=techpulse-aff-20',
    image: '/src/assets/images/hero_flagship_phone_1794052561714.jpg',
    category: 'mobiles',
    active: true,
  },
  {
    id: 'banner-aero-laptop',
    title: 'AeroBook Studio 16 Pro',
    subtitle: 'NVIDIA RTX 4080 Graphics paired with Intel Core Ultra 9. Stunning 3.2K 165Hz Mini-LED Canvas.',
    badge: 'Creator Choice Award',
    price: 219900,
    originalPrice: 249900,
    ctaText: 'Get Best Buy Exclusive',
    ctaLink: 'https://bestbuy.com/site/aerobook-pro-16?ref=techpulse-aff',
    image: '/src/assets/images/hero_creator_laptop_1794052562533.jpg',
    category: 'laptops',
    active: true,
  },
  {
    id: 'banner-obsidian-ultra',
    title: 'Galaxy Obsidian S24 Ultra',
    subtitle: 'Titanium frame with integrated S-Pen, 200MP quad-telephoto AI camera and anti-reflective display.',
    badge: 'Top Selling Mobile',
    price: 119999,
    originalPrice: 134999,
    ctaText: 'Buy on Official Store',
    ctaLink: 'https://samsung.com/galaxy-s24-ultra?ref=techpulse-aff',
    image: '/src/assets/images/product_flagship_smartphone_1794052563082.jpg',
    category: 'mobiles',
    active: true,
  }
];

export const INITIAL_PRODUCTS: Product[] = [
  // --- MOBILES (LATEST & POPULAR) ---
  {
    id: 'mob-iphone-16-pro-max',
    name: 'Apple iPhone 16 Pro Max',
    slug: 'apple-iphone-16-pro-max',
    brand: 'Apple',
    category: 'mobiles',
    price: 144900,
    originalPrice: 154900,
    currency: 'INR',
    rating: 4.9,
    reviewsCount: 1420,
    isLatest: true,
    isPopular: true,
    isFeatured: true,
    affiliateUrl: 'https://amazon.com/dp/B0BDHW8WVE?tag=specvault-aff-20',
    affiliateVendor: 'Amazon',
    shortDescription: 'Grade 5 titanium design, A18 Pro chip with 6-core GPU, and Camera Control button.',
    description: 'The iPhone 16 Pro Max features a stunning Grade 5 titanium design with thinner borders, a larger 6.9-inch Super Retina XDR display, and the revolutionary Camera Control button for instant access to photographic tools. Powered by the industry-leading A18 Pro chip built on second-generation 3nm technology.',
    highlights: [
      'A18 Pro chip with hardware ray tracing & 16-core Neural Engine',
      '48MP Fusion camera with faster quad-pixel sensor and 4K 120 fps Dolby Vision',
      'New Camera Control button with haptic feedback & sliding gestures',
      'Class-leading 33 hours video playback battery longevity',
      'Ultra-thin titanium borders and tougher Ceramic Shield glass'
    ],
    pros: [
      'Best-in-class videography with 4K120fps Dolby Vision',
      'Phenomenal battery endurance spanning nearly 2 days',
      'A18 Pro delivers unmatched sustained CPU efficiency',
      'Premium lightweight Grade 5 titanium construction'
    ],
    cons: [
      '30W charging speed still lags behind Android competitors',
      '6.9-inch form factor can feel bulky in smaller hands',
      'Camera Control button requires a small learning curve'
    ],
    images: [
      '/src/assets/images/product_flagship_smartphone_1794052563082.jpg',
      '/src/assets/images/hero_flagship_phone_1794052561714.jpg'
    ],
    specs: {
      ram: '8GB',
      storage: '256GB / 512GB / 1TB',
      processor: 'Apple A18 Pro (3nm)',
      display: '6.9" Super Retina XDR OLED (2868 x 1320)',
      displaySize: '6.9"',
      refreshRate: '120Hz ProMotion',
      camera: '48MP Main + 48MP Ultrawide + 12MP 5x Telephoto',
      battery: '4685 mAh (30W wired, 25W MagSafe)',
      chargingSpeed: '30W Wired / 25W MagSafe',
      os: 'iOS 18 (with Apple Intelligence)',
      connectivity: '5G Sub-6/mmWave, Wi-Fi 7, Bluetooth 5.3, USB-C 3.2 Gen 2',
      dimensions: '163 x 77.6 x 8.25 mm',
      weight: '227 g',
      sim: 'Dual eSIM / Nano-SIM'
    },
    createdAt: '2026-09-20T08:00:00Z'
  },
  {
    id: 'mob-samsung-s24-ultra',
    name: 'Samsung Galaxy S24 Ultra',
    slug: 'samsung-galaxy-s24-ultra',
    brand: 'Samsung',
    category: 'mobiles',
    price: 121999,
    originalPrice: 134999,
    currency: 'INR',
    rating: 4.8,
    reviewsCount: 1980,
    isLatest: true,
    isPopular: true,
    isFeatured: true,
    affiliateUrl: 'https://amazon.com/dp/B0CS5X6B3Y?tag=specvault-aff-20',
    affiliateVendor: 'Amazon',
    shortDescription: 'Titanium chassis, 200MP Quad Tele system, integrated S-Pen, and Galaxy AI.',
    description: 'Galaxy S24 Ultra redefines productivity and mobile photography with its flat Dynamic AMOLED 2X display, Corning Gorilla Armor glass with 75% reduced reflections, and Snapdragon 8 Gen 3 for Galaxy.',
    highlights: [
      'Corning Gorilla Armor significantly cuts glare and scratches',
      '200MP primary sensor with 50MP 5x optical periscope zoom',
      'Built-in S-Pen with latency down to 2.8ms',
      'Galaxy AI suite (Live Translate, Circle to Search, Note Assist)',
      '7 years of guaranteed Android OS & security upgrades'
    ],
    pros: [
      'Industry-best anti-reflective display glass',
      'Unrivaled zoom versatility from 3x to 100x Space Zoom',
      'Convenient built-in S-Pen for notes and precision sketch',
      'Superb 7-year software upgrade commitment'
    ],
    cons: [
      'Boxy ergonomic corners can dig into palms',
      'Image processing occasionally over-sharpens portraits'
    ],
    images: [
      '/src/assets/images/hero_flagship_phone_1794052561714.jpg',
      '/src/assets/images/product_flagship_smartphone_1794052563082.jpg'
    ],
    specs: {
      ram: '12GB',
      storage: '256GB / 512GB / 1TB',
      processor: 'Snapdragon 8 Gen 3 for Galaxy (4nm)',
      display: '6.8" Dynamic AMOLED 2X (3120 x 1440)',
      displaySize: '6.8"',
      refreshRate: '120Hz LTPO',
      camera: '200MP Main + 50MP 5x Tele + 10MP 3x Tele + 12MP Ultrawide',
      battery: '5000 mAh (45W wired, 15W wireless)',
      chargingSpeed: '45W Wired / 15W Wireless',
      os: 'Android 15 with One UI 7.0',
      connectivity: '5G, Wi-Fi 7, Bluetooth 5.3, UWB, USB-C 3.2',
      dimensions: '162.3 x 79 x 8.6 mm',
      weight: '232 g',
      sim: 'Dual SIM (Nano + eSIM)'
    },
    createdAt: '2026-08-15T10:00:00Z'
  },
  {
    id: 'mob-pixel-9-pro-xl',
    name: 'Google Pixel 9 Pro XL',
    slug: 'google-pixel-9-pro-xl',
    brand: 'Google',
    category: 'mobiles',
    price: 109999,
    originalPrice: 124999,
    currency: 'INR',
    rating: 4.7,
    reviewsCount: 840,
    isLatest: true,
    isPopular: false,
    isFeatured: false,
    affiliateUrl: 'https://bestbuy.com/site/pixel-9-pro-xl?ref=specvault-aff',
    affiliateVendor: 'Best Buy',
    shortDescription: 'Tensor G4 processor, 16GB RAM for on-device Gemini Live, and iconic camera bar.',
    description: 'Google Pixel 9 Pro XL delivers Google’s most refined hardware yet with polished metal rails, silky matte back glass, and an upgraded Super Actua display peaking at 3000 nits.',
    highlights: [
      'Tensor G4 with 16GB RAM designed specifically for Gemini Nano',
      'Class-leading still photography skin tones and night sight',
      'Pixel Studio and Add Me photography modes',
      'Vapor chamber cooling for steady thermal performance'
    ],
    pros: [
      'Cleanest Android experience with zero bloatware',
      'Superb point-and-shoot camera consistency',
      'Blazing fast biometric ultrasonic fingerprint scanner'
    ],
    cons: [
      'Peak 3D gaming fps is lower than Snapdragon 8 Gen 3',
      'Relatively steep price jump over predecessor'
    ],
    images: [
      '/src/assets/images/product_flagship_smartphone_1794052563082.jpg',
      '/src/assets/images/hero_flagship_phone_1794052561714.jpg'
    ],
    specs: {
      ram: '16GB',
      storage: '128GB / 256GB / 512GB / 1TB',
      processor: 'Google Tensor G4 (4nm)',
      display: '6.8" Super Actua LTPO OLED (2992 x 1344)',
      displaySize: '6.8"',
      refreshRate: '120Hz LTPO',
      camera: '50MP Main + 48MP Ultrawide + 48MP 5x Telephoto',
      battery: '5060 mAh (37W fast wired, 23W wireless)',
      chargingSpeed: '37W Wired / 23W Wireless',
      os: 'Android 15 (Pure Pixel Experience)',
      connectivity: '5G, Wi-Fi 7, Bluetooth 5.3, Satellite SOS, USB-C 3.2',
      dimensions: '162.8 x 76.6 x 8.5 mm',
      weight: '221 g',
      sim: 'Nano-SIM + eSIM'
    },
    createdAt: '2026-08-28T09:00:00Z'
  },
  {
    id: 'mob-oneplus-12',
    name: 'OnePlus 12 Flagship',
    slug: 'oneplus-12-flagship',
    brand: 'OnePlus',
    category: 'mobiles',
    price: 64999,
    originalPrice: 69999,
    currency: 'INR',
    rating: 4.8,
    reviewsCount: 1120,
    isLatest: true,
    isPopular: false,
    isFeatured: false,
    affiliateUrl: 'https://amazon.com/dp/B0CQPF64Z8?tag=specvault-aff-20',
    affiliateVendor: 'Amazon',
    shortDescription: 'Snapdragon 8 Gen 3, Hasselblad 4th Gen cameras, and lightning 100W SuperVOOC.',
    description: 'The OnePlus 12 combines raw flagship performance with unbelievable value: 5400mAh battery, 100W wired charging (reaches 100% in 26 minutes), and 50W wireless AirVOOC.',
    highlights: [
      'Hyper-fast 100W SuperVOOC included in retail package',
      'Massive 5400 mAh dual-cell silicon-carbon battery',
      'DisplayMate A+ 2K ProXDR display with Aqua Touch wet-finger tech',
      'Dual Cryo-velocity VC thermal cooling architecture'
    ],
    pros: [
      'Fastest charging flagship in its price bracket',
      'Aqua Touch works flawlessly in heavy rain and with wet hands',
      'Excellent Hasselblad color tuning and portrait tones'
    ],
    cons: [
      'Curved screen edges can pick up accidental palm touches',
      'Only IP65 water resistance rating (not full submersion IP68)'
    ],
    images: [
      '/src/assets/images/hero_flagship_phone_1794052561714.jpg',
      '/src/assets/images/product_flagship_smartphone_1794052563082.jpg'
    ],
    specs: {
      ram: '16GB',
      storage: '256GB / 512GB',
      processor: 'Snapdragon 8 Gen 3 (4nm)',
      display: '6.82" 2K ProXDR AMOLED (3168 x 1440)',
      displaySize: '6.82"',
      refreshRate: '120Hz LTPO',
      camera: '50MP Sony LYT-808 + 64MP 3x Periscope + 48MP Ultrawide',
      battery: '5400 mAh (100W wired, 50W wireless)',
      chargingSpeed: '100W Wired / 50W Wireless',
      os: 'OxygenOS 15 based on Android 15',
      connectivity: '5G, Wi-Fi 7, Bluetooth 5.4, IR Blaster, USB-C 3.2',
      dimensions: '164.3 x 75.8 x 9.15 mm',
      weight: '220 g',
      sim: 'Dual Nano-SIM'
    },
    createdAt: '2026-07-10T12:00:00Z'
  },
  {
    id: 'mob-xiaomi-14-ultra',
    name: 'Xiaomi 14 Ultra Photography',
    slug: 'xiaomi-14-ultra-photography',
    brand: 'Xiaomi',
    category: 'mobiles',
    price: 99999,
    originalPrice: 119999,
    currency: 'INR',
    rating: 4.8,
    reviewsCount: 650,
    isLatest: false,
    isPopular: true,
    isFeatured: false,
    affiliateUrl: 'https://amazon.com/dp/B0CX21C8S2?tag=specvault-aff-20',
    affiliateVendor: 'Amazon',
    shortDescription: 'Quad 50MP Leica cameras, 1-inch LYT-900 sensor with stepless variable aperture.',
    description: 'Engineered as a handheld camera powerhouse, the Xiaomi 14 Ultra features an all-star optical system co-developed with Leica and dual telephoto periscope lenses.',
    highlights: [
      '1-inch Sony LYT-900 sensor with variable f/1.63 - f/4.0 mechanical iris',
      'Quad 50MP Leica optics spanning 12mm to 120mm focal lengths',
      'Xiaomi Shield Glass with 10x drop resistance'
    ],
    pros: [
      'Unrivaled optical depth of field for portrait shots',
      'Physical aperture control delivers authentic sunstars and bokeh'
    ],
    cons: [
      'Noticeably heavy camera bump makes phone top-heavy'
    ],
    images: [
      '/src/assets/images/product_flagship_smartphone_1794052563082.jpg',
      '/src/assets/images/hero_flagship_phone_1794052561714.jpg'
    ],
    specs: {
      ram: '16GB',
      storage: '512GB',
      processor: 'Snapdragon 8 Gen 3 (4nm)',
      display: '6.73" C8 AMOLED (3200 x 1440)',
      displaySize: '6.73"',
      refreshRate: '120Hz LTPO',
      camera: '50MP 1-inch + 50MP 3.2x Tele + 50MP 5x Periscope + 50MP Ultrawide',
      battery: '5000 mAh (90W wired, 80W wireless)',
      chargingSpeed: '90W Wired / 80W Wireless',
      os: 'Xiaomi HyperOS (Android 14/15)',
      connectivity: '5G, Wi-Fi 7, Bluetooth 5.4, USB-C 3.2 Gen 2',
      dimensions: '161.4 x 75.3 x 9.2 mm',
      weight: '224 g',
      sim: 'Dual Nano-SIM'
    },
    createdAt: '2026-05-15T11:00:00Z'
  },
  {
    id: 'mob-asus-rog-8-pro',
    name: 'ASUS ROG Phone 8 Pro',
    slug: 'asus-rog-phone-8-pro',
    brand: 'Asus',
    category: 'mobiles',
    price: 94999,
    originalPrice: 104999,
    currency: 'INR',
    rating: 4.7,
    reviewsCount: 430,
    isLatest: false,
    isPopular: true,
    isFeatured: false,
    affiliateUrl: 'https://amazon.com/dp/B0CRVT927W?tag=specvault-aff-20',
    affiliateVendor: 'Amazon',
    shortDescription: '165Hz AMOLED, 24GB LPDDR5X RAM, AniMe Vision LED matrix, and AirTrigger buttons.',
    description: 'The definitive gaming smartphone, upgraded into a slim daily driver with IP68 water resistance, gimbal-stabilized telephoto camera, and ultrasonic touch triggers.',
    highlights: [
      'Ultra-fluid 165Hz Samsung E6 AMOLED display',
      'AniMe Vision programmable 341 mini-LED rear matrix',
      'Ultrasonic shoulder triggers for console-grade mobile gaming'
    ],
    pros: [
      'Unbeatable sustained gaming framerates with zero throttling',
      'Side-mounted secondary USB-C port for unhindered horizontal grip'
    ],
    cons: [
      'Camera quality is decent but behind dedicated camera flagships'
    ],
    images: [
      '/src/assets/images/hero_flagship_phone_1794052561714.jpg',
      '/src/assets/images/product_flagship_smartphone_1794052563082.jpg'
    ],
    specs: {
      ram: '24GB',
      storage: '1TB UFS 4.0',
      processor: 'Snapdragon 8 Gen 3 (4nm)',
      display: '6.78" FHD+ Flexible AMOLED (2400 x 1080)',
      displaySize: '6.78"',
      refreshRate: '165Hz AMOLED',
      camera: '50MP Gimbal Main + 32MP 3x Tele + 13MP Ultrawide',
      battery: '5500 mAh (65W HyperCharge, 15W Qi)',
      chargingSpeed: '65W Wired / 15W Wireless',
      os: 'ROG UI based on Android 15',
      connectivity: 'Dual USB-C, 3.5mm Headphone Jack, Wi-Fi 7, 5G',
      dimensions: '163.8 x 76.8 x 8.9 mm',
      weight: '225 g',
      sim: 'Dual Nano-SIM'
    },
    createdAt: '2026-06-02T14:00:00Z'
  },
  {
    id: 'mob-sony-xperia-1-vi',
    name: 'Sony Xperia 1 VI',
    slug: 'sony-xperia-1-vi',
    brand: 'Sony',
    category: 'mobiles',
    price: 114999,
    originalPrice: 124999,
    currency: 'INR',
    rating: 4.6,
    reviewsCount: 310,
    isLatest: false,
    isPopular: false,
    isFeatured: false,
    affiliateUrl: 'https://bhphotovideo.com/c/product/sony-xperia-1-vi?ref=specvault',
    affiliateVendor: 'B&H Photo',
    shortDescription: 'Continuous 85-170mm true optical zoom, 3.5mm audiophile jack, MicroSD expansion.',
    description: 'Designed for professional videographers, creators, and audiophiles. Features true mechanical continuous optical zoom, dedicated 2-stage shutter button, and BRAVIA display tuning.',
    highlights: [
      'Continuous optical zoom between 85mm and 170mm focal lengths',
      'High-resolution wired audio with dedicated 3.5mm DAC output',
      'MicroSD card slot supporting up to 1.5TB expanded storage'
    ],
    pros: [
      'Rare flagship offering both headphone jack and microSD slot',
      'Natural Sony Alpha color science'
    ],
    cons: [
      'Switched from 4K panel to FHD+ resolution'
    ],
    images: [
      '/src/assets/images/product_flagship_smartphone_1794052563082.jpg',
      '/src/assets/images/hero_flagship_phone_1794052561714.jpg'
    ],
    specs: {
      ram: '12GB',
      storage: '256GB / 512GB (microSD expandable)',
      processor: 'Snapdragon 8 Gen 3 (4nm)',
      display: '6.5" LTPO OLED (2340 x 1080) with Sunlight Vision',
      displaySize: '6.5"',
      refreshRate: '120Hz LTPO',
      camera: '48MP Main + 12MP 85-170mm Continuous Optical Zoom + 12MP Ultrawide',
      battery: '5000 mAh (30W wired, 15W Qi)',
      chargingSpeed: '30W Wired / 15W Wireless',
      os: 'Android 15',
      connectivity: '3.5mm Audio Jack, MicroSD slot, Wi-Fi 7, USB-C 3.2',
      dimensions: '162 x 74 x 8.2 mm',
      weight: '192 g',
      sim: 'Nano-SIM + eSIM'
    },
    createdAt: '2026-06-25T13:00:00Z'
  },
  {
    id: 'mob-vivo-x100-pro',
    name: 'Vivo X100 Pro Zeiss APO',
    slug: 'vivo-x100-pro-zeiss-apo',
    brand: 'Vivo',
    category: 'mobiles',
    price: 89999,
    originalPrice: 96999,
    currency: 'INR',
    rating: 4.8,
    reviewsCount: 520,
    isLatest: false,
    isPopular: false,
    isFeatured: false,
    affiliateUrl: 'https://amazon.com/dp/B0CN5R4Y1T?tag=specvault-aff-20',
    affiliateVendor: 'Amazon',
    shortDescription: 'Zeiss APO floating periscope, MediaTek Dimensity 9300, and 100W FlashCharge.',
    description: 'Renowned for world-class mobile telephoto portrait photography with certified Zeiss APO color correction and Vivo V3 imaging chip.',
    highlights: [
      'Zeiss APO telephoto eliminates chromatic aberration in telephoto macro',
      'All-big-core MediaTek Dimensity 9300 architecture',
      '5400 mAh BlueOcean battery with 100W FlashCharge'
    ],
    pros: [
      'Astonishing telephoto macro photography capability',
      'Rapid 100W charging reaches full in ~29 minutes'
    ],
    cons: [
      'Funtouch OS UI has some bloatware apps pre-installed'
    ],
    images: [
      '/src/assets/images/hero_flagship_phone_1794052561714.jpg',
      '/src/assets/images/product_flagship_smartphone_1794052563082.jpg'
    ],
    specs: {
      ram: '16GB',
      storage: '512GB',
      processor: 'MediaTek Dimensity 9300 (4nm)',
      display: '6.78" 8T LTPO AMOLED (2800 x 1260)',
      displaySize: '6.78"',
      refreshRate: '120Hz LTPO',
      camera: '50MP 1-inch + 50MP Zeiss APO Tele + 50MP Ultrawide',
      battery: '5400 mAh (100W wired, 50W wireless)',
      chargingSpeed: '100W Wired / 50W Wireless',
      os: 'Funtouch OS 14 (Android 14/15)',
      connectivity: '5G, Wi-Fi 7, Bluetooth 5.4, USB-C 3.2 Gen 1',
      dimensions: '164.1 x 75.3 x 8.9 mm',
      weight: '225 g',
      sim: 'Dual Nano-SIM'
    },
    createdAt: '2026-05-20T10:00:00Z'
  },
  {
    id: 'mob-samsung-galaxy-m35',
    name: 'Samsung Galaxy M35 5G (6000mAh)',
    slug: 'samsung-galaxy-m35-5g',
    brand: 'Samsung',
    category: 'mobiles',
    price: 19999,
    originalPrice: 24999,
    currency: 'INR',
    rating: 4.6,
    reviewsCount: 2840,
    isLatest: true,
    isPopular: true,
    isFeatured: false,
    affiliateUrl: 'https://amazon.com/dp/B0D5VNZ19Y?tag=specvault-aff-20',
    affiliateVendor: 'Amazon',
    shortDescription: 'Monstrous 6000 mAh battery, 120Hz Super AMOLED display, and 50MP No Shake OIS camera.',
    description: 'The definitive endurance champion under ₹25K. Boasting a massive 6000 mAh battery, vivid 120Hz Super AMOLED screen, and vapor cooling chamber.',
    highlights: [
      'Massive 6000 mAh multi-day battery endurance',
      '6.6" 120Hz FHD+ Super AMOLED with Gorilla Glass Victus+',
      '50MP OIS camera with 4K recording front and back'
    ],
    pros: [
      'Unstoppable 2+ day battery endurance on heavy usage',
      'Brilliant 120Hz Super AMOLED display in budget segment',
      'Guaranteed 4 OS updates and 5 years security patches'
    ],
    cons: [
      '25W charger is sold separately in retail box',
      'Slightly thicker chassis due to 6000mAh cell'
    ],
    images: [
      '/src/assets/images/product_flagship_smartphone_1794052563082.jpg',
      '/src/assets/images/hero_flagship_phone_1794052561714.jpg'
    ],
    specs: {
      ram: '8GB',
      storage: '128GB / 256GB',
      processor: 'Exynos 1380 (5nm Octa-Core)',
      display: '6.6" Super AMOLED 120Hz (2340 x 1080)',
      displaySize: '6.6"',
      refreshRate: '120Hz AMOLED',
      camera: '50MP OIS Main + 8MP Ultrawide + 2MP Macro',
      battery: '6000 mAh (25W Fast Charge)',
      chargingSpeed: '25W Fast Charge',
      os: 'One UI 6.1 based on Android 14/15',
      connectivity: '5G, Wi-Fi 6, Bluetooth 5.3, NFC, USB-C 2.0',
      dimensions: '162.3 x 78.6 x 9.1 mm',
      weight: '222 g',
      sim: 'Dual SIM'
    },
    createdAt: '2026-07-15T09:00:00Z'
  },
  {
    id: 'mob-oneplus-12r',
    name: 'OnePlus 12R Performance Edition',
    slug: 'oneplus-12r-5g',
    brand: 'OnePlus',
    category: 'mobiles',
    price: 39999,
    originalPrice: 42999,
    currency: 'INR',
    rating: 4.8,
    reviewsCount: 3100,
    isLatest: true,
    isPopular: true,
    isFeatured: true,
    affiliateUrl: 'https://amazon.com/dp/B0CQPN291V?tag=specvault-aff-20',
    affiliateVendor: 'Amazon',
    shortDescription: 'Snapdragon 8 Gen 2 flagship silicon, 5500 mAh battery with 100W SuperVOOC charger in-box.',
    description: 'Flagship tier gaming and fluid display for under ₹50K. Combines Snapdragon 8 Gen 2, 4th Gen LTPO ProXDR screen, and 100W flash charging.',
    highlights: [
      'Snapdragon 8 Gen 2 processor with 16GB LPDDR5X RAM',
      'Hyper-fast 100W SuperVOOC power adapter included in box',
      '4th Generation 1-120Hz LTPO ProXDR curved display'
    ],
    pros: [
      'Top gaming framerates at half the flagship price',
      'Ultra fast 0 to 100% charging in just 26 minutes'
    ],
    cons: [
      'Secondary 2MP macro camera is average'
    ],
    images: [
      '/src/assets/images/hero_flagship_phone_1794052561714.jpg',
      '/src/assets/images/product_flagship_smartphone_1794052563082.jpg'
    ],
    specs: {
      ram: '16GB',
      storage: '256GB UFS 3.1',
      processor: 'Snapdragon 8 Gen 2 (4nm)',
      display: '6.78" ProXDR LTPO AMOLED (2780 x 1264)',
      displaySize: '6.78"',
      refreshRate: '120Hz LTPO',
      camera: '50MP Sony IMX890 OIS + 8MP Ultrawide + 2MP Macro',
      battery: '5500 mAh (100W SuperVOOC)',
      chargingSpeed: '100W SuperVOOC',
      os: 'OxygenOS 15 (Android 15)',
      connectivity: '5G, Wi-Fi 7, Bluetooth 5.3, IR Blaster, NFC',
      dimensions: '163.3 x 75.3 x 8.8 mm',
      weight: '207 g',
      sim: 'Dual Nano-SIM'
    },
    createdAt: '2026-06-10T12:00:00Z'
  },
  {
    id: 'mob-pova-7000',
    name: 'Pova Power 7000 Mega Edition',
    slug: 'pova-power-7000-mega-edition',
    brand: 'Xiaomi',
    category: 'mobiles',
    price: 15999,
    originalPrice: 19999,
    currency: 'INR',
    rating: 4.5,
    reviewsCount: 1620,
    isLatest: false,
    isPopular: false,
    isFeatured: false,
    affiliateUrl: 'https://amazon.com/dp/B0D1234567?tag=specvault-aff-20',
    affiliateVendor: 'Amazon',
    shortDescription: 'Giant 7000 mAh battery, 120Hz 6.78" display, and 33W fast charging.',
    description: 'Designed for delivery partners, outdoor professionals, and long gamers. Houses a certified 7000 mAh high-density battery that delivers up to 3 days of battery life.',
    highlights: [
      '7000 mAh High-Density battery with 1% Super Power Saving mode',
      '6.78" FHD+ 120Hz smooth gaming display',
      'Reverse wired charging to charge other phones like a power bank'
    ],
    pros: [
      'Genuine 3-day battery backup on single charge',
      'Acts as a portable power bank for other accessories'
    ],
    cons: [
      'Slightly heavier 230g build'
    ],
    images: [
      '/src/assets/images/product_flagship_smartphone_1794052563082.jpg',
      '/src/assets/images/hero_flagship_phone_1794052561714.jpg'
    ],
    specs: {
      ram: '8GB',
      storage: '128GB',
      processor: 'MediaTek Helio G99 Ultimate',
      display: '6.78" FHD+ 120Hz (2460 x 1080)',
      displaySize: '6.78"',
      refreshRate: '120Hz IPS',
      camera: '50MP AI Dual Camera with Quad Flash',
      battery: '7000 mAh (33W Fast Charge)',
      chargingSpeed: '33W Fast Charge',
      os: 'HiOS 14 based on Android 14',
      connectivity: '4G LTE, Dual-Band Wi-Fi, Bluetooth 5.2, USB-C',
      dimensions: '168.6 x 76.6 x 9.2 mm',
      weight: '230 g',
      sim: 'Dual Nano-SIM + MicroSD'
    },
    createdAt: '2026-04-10T10:00:00Z'
  },
  {
    id: 'mob-titan-armor-8500',
    name: 'Titan Armor 8500 Extreme Endurance',
    slug: 'titan-armor-8500-extreme',
    brand: 'Asus',
    category: 'mobiles',
    price: 34999,
    originalPrice: 39999,
    currency: 'INR',
    rating: 4.7,
    reviewsCount: 780,
    isLatest: false,
    isPopular: false,
    isFeatured: false,
    affiliateUrl: 'https://amazon.com/dp/B0D9876543?tag=specvault-aff-20',
    affiliateVendor: 'Amazon',
    shortDescription: 'Industrial 8500 mAh battery, Dimensity 8050 processor, and 66W HyperCharge.',
    description: 'An extreme endurance workhorse built with an industry-leading 8500 mAh battery cell, military MIL-STD-810H durability, and thermal vapor dissipation.',
    highlights: [
      'Monstrous 8500 mAh capacity delivering over 95 hours audio & 28 hours video',
      '66W HyperCharge reaches 50% in 35 minutes',
      'Military Grade MIL-STD-810H drop and water resistance'
    ],
    pros: [
      'Massive 8500 mAh cell with zero battery anxiety',
      'Sturdy titanium-alloy protective bumpers'
    ],
    cons: [
      'Heavy 265g rugged chassis'
    ],
    images: [
      '/src/assets/images/hero_flagship_phone_1794052561714.jpg',
      '/src/assets/images/product_flagship_smartphone_1794052563082.jpg'
    ],
    specs: {
      ram: '12GB',
      storage: '256GB UFS 3.1',
      processor: 'MediaTek Dimensity 8050 5G (6nm)',
      display: '6.78" 120Hz AMOLED with Gorilla Glass Victus',
      displaySize: '6.78"',
      refreshRate: '120Hz AMOLED',
      camera: '64MP Main + 24MP Night Vision IR + 16MP Ultrawide',
      battery: '8500 mAh (66W HyperCharge)',
      chargingSpeed: '66W HyperCharge',
      os: 'Android 15',
      connectivity: '5G, Wi-Fi 6, Bluetooth 5.3, NFC, OTG Reverse Charging',
      dimensions: '172 x 82 x 13.5 mm',
      weight: '265 g',
      sim: 'Dual Nano-SIM'
    },
    createdAt: '2026-03-25T11:00:00Z'
  },

  // --- LAPTOPS (LATEST & POPULAR) ---
  {
    id: 'lap-macbook-pro-16-m3-max',
    name: 'Apple MacBook Pro 16" M3 Max',
    slug: 'apple-macbook-pro-16-m3-max',
    brand: 'Apple',
    category: 'laptops',
    price: 349900,
    originalPrice: 379900,
    currency: 'INR',
    rating: 4.9,
    reviewsCount: 1640,
    isLatest: true,
    isPopular: true,
    isFeatured: true,
    affiliateUrl: 'https://amazon.com/dp/B0CM5M4L19?tag=specvault-aff-20',
    affiliateVendor: 'Amazon',
    shortDescription: '16-core CPU, 40-core GPU, 48GB unified memory, and 22-hour battery stamina.',
    description: 'The pinnacle of portable creator performance. Apple M3 Max delivers groundbreaking speed for 8K video timelines, complex 3D rendering, and LLM inference while maintaining up to 22 hours on battery power.',
    highlights: [
      'M3 Max 16-core CPU and 40-core GPU with Dynamic Caching',
      '16.2" Liquid Retina XDR display with 1600 nits peak brightness and 120Hz ProMotion',
      'Studio-quality 6-speaker sound system with force-cancelling woofers',
      'Silent operation under general productivity and fast MagSafe 3 charging'
    ],
    pros: [
      'Identical high performance whether plugged into wall or running on battery',
      'Unsurpassed battery longevity in the 16-inch creator class',
      'Best laptop display and speaker audio on the market'
    ],
    cons: [
      'Expensive initial price and non-upgradeable unified RAM/SSD',
      'Triple-A PC gaming library is still limited compared to Windows'
    ],
    images: [
      '/src/assets/images/hero_creator_laptop_1794052562533.jpg',
      '/src/assets/images/product_ultrabook_laptop_1794052562918.jpg'
    ],
    specs: {
      ram: '48GB Unified Memory',
      storage: '1TB NVMe SSD (up to 8TB)',
      processor: 'Apple M3 Max (16-core CPU, 40-core GPU)',
      graphics: 'Apple 40-core Integrated GPU with Hardware Ray Tracing',
      display: '16.2" Liquid Retina XDR (3456 x 2234)',
      displaySize: '16.2"',
      refreshRate: '120Hz ProMotion',
      laptopType: 'Creator',
      battery: '100Wh (up to 22 hours, 140W USB-C MagSafe)',
      os: 'macOS Sonoma / Sequoia',
      connectivity: 'Wi-Fi 6E, Bluetooth 5.3',
      weight: '2.16 kg (4.8 lbs)',
      ports: '3x Thunderbolt 4, HDMI 2.1, SDXC card slot, MagSafe 3, 3.5mm headphone'
    },
    createdAt: '2026-09-01T08:00:00Z'
  },
  {
    id: 'lap-dell-xps-16',
    name: 'Dell XPS 16 (9640)',
    slug: 'dell-xps-16-9640',
    brand: 'Dell',
    category: 'laptops',
    price: 249990,
    originalPrice: 279990,
    currency: 'INR',
    rating: 4.7,
    reviewsCount: 880,
    isLatest: true,
    isPopular: true,
    isFeatured: true,
    affiliateUrl: 'https://bestbuy.com/site/dell-xps-16?ref=specvault-aff',
    affiliateVendor: 'Best Buy',
    shortDescription: 'Intel Core Ultra 9, NVIDIA RTX 4070, 4K+ OLED InfinityEdge touch screen.',
    description: 'Crafted from CNC machined aluminum and Gorilla Glass 3, the Dell XPS 16 merges futuristic seamless glass haptic touchpad with raw creative graphics horsepower.',
    highlights: [
      'Intel Core Ultra 9 185H with dedicated Intel AI Boost NPU',
      'NVIDIA GeForce RTX 4070 Laptop GPU with Studio drivers',
      'Optional 4K+ 3840x2400 OLED InfinityEdge touch display',
      'Zero-lattice keyboard with invisible seamless glass haptic touchpad'
    ],
    pros: [
      'Stunning minimalist design and edge-to-edge OLED vibrancy',
      'Exceptional quad-speaker array with Waves MaxxAudio'
    ],
    cons: [
      'Capacitive touch function row lacks physical key travel',
      'Requires USB-C dongles for legacy USB-A or HDMI'
    ],
    images: [
      '/src/assets/images/product_ultrabook_laptop_1794052562918.jpg',
      '/src/assets/images/hero_creator_laptop_1794052562533.jpg'
    ],
    specs: {
      ram: '32GB LPDDR5X (7467 MT/s)',
      storage: '1TB PCIe 4.0 NVMe SSD',
      processor: 'Intel Core Ultra 9 185H (16 cores, up to 5.1 GHz)',
      graphics: 'NVIDIA GeForce RTX 4070 (8GB GDDR6, 60W TGP)',
      display: '16.3" 4K+ (3840 x 2400) OLED Touch 90Hz',
      displaySize: '16.3"',
      refreshRate: '90Hz OLED',
      laptopType: 'Creator',
      battery: '99.5Wh (130W USB-C GaN adapter)',
      os: 'Windows 11 Pro',
      connectivity: 'Intel Killer Wi-Fi 7, Bluetooth 5.4',
      weight: '2.13 kg (4.7 lbs)',
      ports: '3x Thunderbolt 4, MicroSD v6.0 slot, 3.5mm combo jack'
    },
    createdAt: '2026-08-10T10:00:00Z'
  },
  {
    id: 'lap-rog-zephyrus-g16',
    name: 'ASUS ROG Zephyrus G16 OLED',
    slug: 'asus-rog-zephyrus-g16-oled',
    brand: 'Asus',
    category: 'laptops',
    price: 219990,
    originalPrice: 249990,
    currency: 'INR',
    rating: 4.9,
    reviewsCount: 1250,
    isLatest: true,
    isPopular: false,
    isFeatured: false,
    affiliateUrl: 'https://amazon.com/dp/B0CS5X6B3G?tag=specvault-aff-20',
    affiliateVendor: 'Amazon',
    shortDescription: 'Intel Core Ultra 9, RTX 4080 GPU, 240Hz ROG Nebula OLED, CNC aluminum chassis.',
    description: 'The Zephyrus G16 sets the standard for ultra-slim gaming and creator laptops: only 1.49cm thin with Slash Lighting lid bar, vapor chamber cooling, and 240Hz G-Sync OLED display.',
    highlights: [
      '2.5K 240Hz ROG Nebula OLED display with 0.2ms response time',
      'NVIDIA GeForce RTX 4080 (12GB GDDR6, 115W TGP with Dynamic Boost)',
      'Slash Lighting customizable diagonal matrix on aluminum CNC lid',
      'Ultra-thin 1.49 cm profile weighing under 1.85 kg'
    ],
    pros: [
      'Best gaming display in existence with true blacks and 240Hz speed',
      'Incredibly slim and lightweight for an RTX 4080 machine',
      'Generous port selection including full-size SD card slot'
    ],
    cons: [
      'RAM is soldered and not user-upgradeable',
      'Fans get audible under intense cyber-overdrive gaming'
    ],
    images: [
      '/src/assets/images/hero_creator_laptop_1794052562533.jpg',
      '/src/assets/images/product_ultrabook_laptop_1794052562918.jpg'
    ],
    specs: {
      ram: '32GB LPDDR5X (7467 MHz)',
      storage: '1TB PCIe 4.0 NVMe M.2 SSD (2x M.2 slots)',
      processor: 'Intel Core Ultra 9 185H (16 cores, 22 threads)',
      graphics: 'NVIDIA GeForce RTX 4080 (12GB GDDR6)',
      display: '16.0" 2.5K (2560 x 1600) OLED 240Hz 0.2ms',
      displaySize: '16.0"',
      refreshRate: '240Hz OLED',
      laptopType: 'Gaming',
      battery: '90Wh (240W slim adapter, 100W USB-C PD)',
      os: 'Windows 11 Home / Pro',
      connectivity: 'Wi-Fi 7, Bluetooth 5.4',
      weight: '1.85 kg (4.08 lbs)',
      ports: '1x Thunderbolt 4, 1x USB-C 3.2, 2x USB-A 3.2, HDMI 2.1, SD Card Reader'
    },
    createdAt: '2026-07-22T14:00:00Z'
  },
  {
    id: 'lap-thinkpad-x1-carbon-gen-12',
    name: 'Lenovo ThinkPad X1 Carbon Gen 12',
    slug: 'lenovo-thinkpad-x1-carbon-gen-12',
    brand: 'Lenovo',
    category: 'laptops',
    price: 179990,
    originalPrice: 199990,
    currency: 'INR',
    rating: 4.8,
    reviewsCount: 710,
    isLatest: true,
    isPopular: false,
    isFeatured: false,
    affiliateUrl: 'https://amazon.com/dp/B0CN5R4Y1L?tag=specvault-aff-20',
    affiliateVendor: 'Amazon',
    shortDescription: 'Featherlight carbon fiber 1.09 kg chassis, Intel Core Ultra 7, 2.8K 120Hz OLED.',
    description: 'The gold standard business ultrabook. Featuring legendary ThinkPad tactile keyboard comfort, tactile TrackPoint, Communication Bar with dual microphones, and MIL-SPEC durability.',
    highlights: [
      'Incredible lightweight 1.09 kg carbon fiber and magnesium chassis',
      'Optional 2.8K (2880 x 1800) 120Hz OLED with HDR True Black 500',
      'Dual fans with rear exhaust for whisper-quiet thermal efficiency',
      'Tactile markings on keyboard for enhanced accessibility'
    ],
    pros: [
      'Unsurpassed typing comfort on ergonomic keycaps',
      'Uncompromising durability with MIL-STD-810H certifications',
      'Excellent port selection with dual USB-A and dual Thunderbolt 4'
    ],
    cons: [
      'Integrated Intel Arc graphics not built for heavy 4K gaming'
    ],
    images: [
      '/src/assets/images/product_ultrabook_laptop_1794052562918.jpg',
      '/src/assets/images/hero_creator_laptop_1794052562533.jpg'
    ],
    specs: {
      ram: '32GB LPDDR5X (6400 MHz)',
      storage: '1TB PCIe 4.0 NVMe SSD (user-swappable)',
      processor: 'Intel Core Ultra 7 155H (16 cores)',
      graphics: 'Intel Arc Graphics (Integrated)',
      display: '14.0" 2.8K (2880 x 1800) OLED 120Hz Antiglare',
      displaySize: '14.0"',
      refreshRate: '120Hz OLED',
      laptopType: 'Business',
      battery: '57Wh (65W USB-C Rapid Charge, up to 15 hours)',
      os: 'Windows 11 Pro',
      connectivity: 'Wi-Fi 7, Bluetooth 5.3, optional 5G Sub-6',
      weight: '1.09 kg (2.4 lbs)',
      ports: '2x Thunderbolt 4, 2x USB-A 3.2 Gen 1, HDMI 2.1, 3.5mm combo'
    },
    createdAt: '2026-08-05T09:00:00Z'
  },
  {
    id: 'lap-razer-blade-16',
    name: 'Razer Blade 16 Dual-Mode Mini-LED',
    slug: 'razer-blade-16-dual-mode',
    brand: 'Razer',
    category: 'laptops',
    price: 329990,
    originalPrice: 359990,
    currency: 'INR',
    rating: 4.8,
    reviewsCount: 940,
    isLatest: false,
    isPopular: true,
    isFeatured: false,
    affiliateUrl: 'https://amazon.com/dp/B0BS6V512X?tag=specvault-aff-20',
    affiliateVendor: 'Amazon',
    shortDescription: 'Intel Core i9-14900HX, RTX 4090 GPU, world-first Dual-Mode 4K 120Hz / FHD 240Hz display.',
    description: 'An absolute desktop-replacement titan in a sleek anodized black aluminum CNC chassis. Seamlessly switch between creator 4K 120Hz mode and competitive eSports FHD+ 240Hz mode on the fly.',
    highlights: [
      'Dual-Mode Mini-LED display switches between UHD+ 120Hz and FHD+ 240Hz',
      'NVIDIA GeForce RTX 4090 (16GB GDDR6, full 175W maximum TGP)',
      'Patented vacuum-sealed copper vapor chamber cooling system',
      'Per-key Razer Chroma RGB keyboard with anti-ghosting'
    ],
    pros: [
      'Maximum gaming fps possible in a portable 16-inch chassis',
      'Innovative Dual-Mode display caters to both creators and high-fps gamers'
    ],
    cons: [
      'Large 330W GaN power brick required for full wattage',
      'Substantial battery drain under high performance mode'
    ],
    images: [
      '/src/assets/images/hero_creator_laptop_1794052562533.jpg',
      '/src/assets/images/product_ultrabook_laptop_1794052562918.jpg'
    ],
    specs: {
      ram: '32GB DDR5 (5600 MHz, upgradable to 64GB)',
      storage: '2TB PCIe 4.0 NVMe SSD (upgradable to 8TB)',
      processor: 'Intel Core i9-14900HX (24 cores, 32 threads, up to 5.8 GHz)',
      graphics: 'NVIDIA GeForce RTX 4090 (16GB GDDR6, 175W TGP)',
      display: '16.0" Dual-Mode Mini-LED (4K 120Hz / FHD+ 240Hz, 1000 nits)',
      displaySize: '16.0"',
      refreshRate: '240Hz Mini-LED',
      laptopType: 'Gaming',
      battery: '95.2Wh (330W GaN adapter)',
      os: 'Windows 11 Home',
      connectivity: 'Wi-Fi 7, Bluetooth 5.4',
      weight: '2.45 kg (5.4 lbs)',
      ports: '1x Thunderbolt 4, 1x USB-C 3.2, 3x USB-A 3.2, HDMI 2.1, UHS-II SD reader'
    },
    createdAt: '2026-06-18T15:00:00Z'
  },
  {
    id: 'lap-hp-spectre-x360-14',
    name: 'HP Spectre x360 14 (2-in-1)',
    slug: 'hp-spectre-x360-14',
    brand: 'HP',
    category: 'laptops',
    price: 144990,
    originalPrice: 164990,
    currency: 'INR',
    rating: 4.8,
    reviewsCount: 1040,
    isLatest: false,
    isPopular: true,
    isFeatured: false,
    affiliateUrl: 'https://bestbuy.com/site/hp-spectre-x360-14?ref=specvault-aff',
    affiliateVendor: 'Best Buy',
    shortDescription: 'Intel Core Ultra 7, 2.8K OLED touch with 360-degree hinge, tilt pen included.',
    description: 'Transform effortlessly between sleek ultrabook, tent presentation mode, and digital drawing tablet with the gem-cut aerospace aluminum HP Spectre x360.',
    highlights: [
      'Flexible 360-degree geared hinge with magnetic stylus docking',
      '2.8K (2880 x 1800) OLED display with 120Hz variable refresh rate',
      '9MP AI webcam with automatic framing and physical privacy shutter'
    ],
    pros: [
      'Versatile 2-in-1 convertible design with premium pen included in box',
      'Best-in-class webcam quality among all Windows laptops'
    ],
    cons: [
      'Slightly heavier than standard clamshell ultrabooks'
    ],
    images: [
      '/src/assets/images/product_ultrabook_laptop_1794052562918.jpg',
      '/src/assets/images/hero_creator_laptop_1794052562533.jpg'
    ],
    specs: {
      ram: '32GB LPDDR5X (7467 MHz)',
      storage: '1TB PCIe 4.0 NVMe SSD',
      processor: 'Intel Core Ultra 7 155H (16 cores)',
      graphics: 'Intel Arc Graphics',
      display: '14.0" 2.8K (2880 x 1800) OLED Touch 120Hz',
      displaySize: '14.0"',
      refreshRate: '120Hz OLED',
      laptopType: 'Ultrabook',
      battery: '68Wh (65W USB-C GaN charger)',
      os: 'Windows 11 Home',
      connectivity: 'Wi-Fi 7, Bluetooth 5.4',
      weight: '1.44 kg (3.17 lbs)',
      ports: '2x Thunderbolt 4, 1x USB-A 10Gbps, 3.5mm audio'
    },
    createdAt: '2026-05-30T10:00:00Z'
  },
  {
    id: 'lap-surface-laptop-studio-2',
    name: 'Microsoft Surface Laptop Studio 2',
    slug: 'microsoft-surface-laptop-studio-2',
    brand: 'Microsoft',
    category: 'laptops',
    price: 224990,
    originalPrice: 249990,
    currency: 'INR',
    rating: 4.6,
    reviewsCount: 520,
    isLatest: false,
    isPopular: false,
    isFeatured: false,
    affiliateUrl: 'https://amazon.com/dp/B0CCZ34V6B?tag=specvault-aff-20',
    affiliateVendor: 'Amazon',
    shortDescription: 'Dynamic woven hinge, NVIDIA RTX 4060, PixelSense Flow 120Hz touch screen.',
    description: 'A revolutionary design featuring a cantilevered dual-pivot hinge that transitions from laptop to stage angle to digital drafting canvas with zero effort.',
    highlights: [
      'Unique Dynamic Woven Hinge with 3 distinct operational modes',
      '14.4" PixelSense Flow touchscreen with Slim Pen 2 haptic feedback',
      'Dedicated Intel Movidius VPU AI accelerator'
    ],
    pros: [
      'Unsurpassed digital illustration experience with haptic pen friction',
      'Solid graphics capability for 3D modeling and rendering'
    ],
    cons: [
      'Thick stepped chassis design'
    ],
    images: [
      '/src/assets/images/hero_creator_laptop_1794052562533.jpg',
      '/src/assets/images/product_ultrabook_laptop_1794052562918.jpg'
    ],
    specs: {
      ram: '32GB LPDDR5X',
      storage: '1TB Gen 4 SSD',
      processor: 'Intel Core i7-13700H (14 cores)',
      graphics: 'NVIDIA GeForce RTX 4060 (8GB GDDR6, 80W TGP)',
      display: '14.4" PixelSense Flow (2400 x 1600) 120Hz Touch',
      displaySize: '14.4"',
      refreshRate: '120Hz OLED',
      laptopType: 'Creator',
      battery: '80Wh (120W Surface Power Supply)',
      os: 'Windows 11 Pro',
      connectivity: 'Wi-Fi 6E, Bluetooth 5.3',
      weight: '1.98 kg (4.37 lbs)',
      ports: '2x USB-C with Thunderbolt 4, 1x USB-A 3.1, MicroSD reader, Surface Connect'
    },
    createdAt: '2026-04-12T11:00:00Z'
  },
  {
    id: 'lap-acer-swift-go-14',
    name: 'Acer Swift Go 14 OLED',
    slug: 'acer-swift-go-14-oled',
    brand: 'Acer',
    category: 'laptops',
    price: 74990,
    originalPrice: 84990,
    currency: 'INR',
    rating: 4.7,
    reviewsCount: 1100,
    isLatest: false,
    isPopular: false,
    isFeatured: false,
    affiliateUrl: 'https://amazon.com/dp/B0CN5R4Y1A?tag=specvault-aff-20',
    affiliateVendor: 'Amazon',
    shortDescription: 'AMD Ryzen 7 8845HS with Ryzen AI, 2.8K 90Hz OLED, ultra-slim 1.32 kg unibody.',
    description: 'The definitive budget-friendly OLED ultrabook with snappy AMD Zen 4 multi-core performance, brilliant 100% DCI-P3 color accuracy, and dual-fan cooling.',
    highlights: [
      'Brilliant 2.8K 90Hz OLED with 500 nits peak HDR brightness',
      'AMD Ryzen 7 8845HS processor with Radeon 780M graphics',
      'TwinAir dual copper heat-pipe cooling system'
    ],
    pros: [
      'Unbeatable value for an ultra-sharp OLED display',
      'Excellent day-to-day speed and silent cooling on battery'
    ],
    cons: [
      'Audio speakers produce modest bass response'
    ],
    images: [
      '/src/assets/images/product_ultrabook_laptop_1794052562918.jpg',
      '/src/assets/images/hero_creator_laptop_1794052562533.jpg'
    ],
    specs: {
      ram: '16GB LPDDR5X',
      storage: '512GB PCIe 4.0 SSD',
      processor: 'AMD Ryzen 7 8845HS (8 cores, 16 threads, up to 5.1 GHz)',
      graphics: 'AMD Radeon 780M (Integrated)',
      display: '14.0" 2.8K (2880 x 1800) OLED 90Hz',
      displaySize: '14.0"',
      refreshRate: '90Hz OLED',
      laptopType: 'Ultrabook',
      battery: '65Wh (100W USB-C fast charger)',
      os: 'Windows 11 Home',
      connectivity: 'Wi-Fi 6E, Bluetooth 5.3',
      weight: '1.32 kg (2.9 lbs)',
      ports: '2x USB-C 4.0, 2x USB-A 3.2, HDMI 2.1, MicroSD card reader'
    },
    createdAt: '2026-05-02T16:00:00Z'
  }
];

export const INITIAL_BLOGS: Blog[] = [
  {
    id: 'blog-3nm-snapdragon-vs-a18',
    title: 'Snapdragon 8 Gen 4 vs Apple A18 Pro: The 3nm Architecture Faceoff',
    slug: 'snapdragon-8-gen-4-vs-apple-a18-pro-3nm-faceoff',
    excerpt: 'Deep-dive silicon analysis comparing TSMC N3E node efficiency, custom Oryon CPU clusters, and hardware-accelerated ray tracing benchmarks.',
    content: `
# Snapdragon 8 Gen 4 vs Apple A18 Pro: Silicon Architecture Deep Dive

The high-end smartphone silicon landscape is undergoing its most radical transformation in a decade. With both Qualcomm and Apple leveraging TSMC's second-generation 3-nanometer (N3E) process node, the battle for mobile supremacy is no longer won merely by clock frequency—it is dictated by micro-architectural IPC, branch prediction efficiency, and dedicated neural execution units.

## The Micro-Architecture Shift

Qualcomm has officially phased out ARM Cortex stock designs in favor of its in-house **Oryon CPU cores**, originally engineered by the Nuvia team. Meanwhile, Apple has doubled down on wider execution pipelines in the **A18 Pro**, widening decode channels to 8 instructions per clock cycle.

### Key Benchmark Metrics

| Metric | Apple A18 Pro | Snapdragon 8 Gen 4 / Elite |
| :--- | :--- | :--- |
| **Fabrication Process** | TSMC 3nm (N3E) | TSMC 3nm (N3E) |
| **CPU Configuration** | 2 Performance + 4 Efficiency | 2 Prime (4.32GHz) + 6 Performance |
| **Single-Core Geekbench 6** | 3,420 | 3,180 |
| **Multi-Core Geekbench 6** | 8,750 | 10,240 |
| **NPU TOPS (Int8)** | 35 TOPS | 45 TOPS |
| **Peak Package Power** | 8.2 Watts | 11.5 Watts |

## GPU and Thermal Realities

When examining sustained gaming workloads, Apple's 6-core GPU delivers exceptional ray-traced lighting stability with dynamic caching. However, Qualcomm's sliced Adreno GPU architecture leverages a dedicated 12MB high-speed memory slab that dramatically reduces DRAM bus traffic.

## Verdict for Flagship Buyers

If your priority is unmatched single-core burst responsiveness, battery endurance during video playback, and ProRes video encoding, the **iPhone 16 Pro Max powered by the A18 Pro** remains unrivaled. If you demand maximum multi-threaded throughput and sustained emulation or high-fps gaming, the **Snapdragon 8 Gen 3/4 ecosystem** holds the crown.
    `,
    category: 'Latest Technology',
    thumbnail: '/src/assets/images/hero_flagship_phone_1794052561714.jpg',
    author: {
      name: 'Dr. Marcus Vance',
      role: 'Chief Semiconductor Analyst',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80'
    },
    publishedAt: '2026-10-18',
    readTime: '6 min read',
    tags: ['Processors', 'Qualcomm', 'Apple', 'Mobile Tech', 'Benchmarks'],
    tableOfContents: [
      { id: 'micro-architecture', title: 'The Micro-Architecture Shift', level: 2 },
      { id: 'benchmarks', title: 'Key Benchmark Metrics', level: 2 },
      { id: 'gpu-thermal', title: 'GPU and Thermal Realities', level: 2 },
      { id: 'verdict', title: 'Verdict for Flagship Buyers', level: 2 }
    ],
    relatedProductIds: ['mob-iphone-16-pro-max', 'mob-samsung-s24-ultra', 'mob-oneplus-12'],
    status: 'published'
  },
  {
    id: 'blog-laptop-buying-guide-2026',
    title: 'The Ultimate Laptop Buying Guide: OLED vs Mini-LED vs IPS Displays',
    slug: 'ultimate-laptop-buying-guide-oled-mini-led-ips',
    excerpt: 'Everything you need to know before investing in a high-end laptop display: peak nit brightness, color fidelity, PWM flicker, and battery trade-offs.',
    content: `
# The Ultimate Laptop Buying Guide: OLED vs Mini-LED vs IPS Displays

Choosing a modern laptop display in 2026 is no longer just about deciding between 1080p and 4K. Today, the fundamental display backlighting technology influences everything from battery run-time to outdoor legibility and color grading accuracy.

## 1. OLED (Organic Light Emitting Diode)

OLED panels feature per-pixel emissive lighting. Because individual black pixels are completely powered off, the static contrast ratio is effectively infinite ($1,000,000:1$).

- **Pros**: Inky true blacks, instantaneous 0.2ms pixel response times, razor-thin panel thickness.
- **Cons**: Lower full-screen sustained brightness ($400$–$500$ nits), potential risk of cumulative static burn-in, higher power consumption on white backgrounds.
- **Ideal For**: Movie watching, graphic designers working on dark mode UI, and night-time coders.

## 2. Mini-LED (FALD: Full Array Local Dimming)

Mini-LED utilizes thousands of miniature phosphor diodes clustered into 1,000 to 2,500 independent dimming zones beneath an LCD substrate (as seen on the MacBook Pro Liquid Retina XDR and Razer Blade 16).

- **Pros**: Breathtaking HDR peak luminance (1,000 to 1,600 nits), zero burn-in risk, outstanding battery efficiency when displaying bright documents.
- **Cons**: Slight halo or blooming artifacts around small bright objects against dark fields, heavier and thicker lid lid assemblies.
- **Ideal For**: Outdoor creators, video colorists mastering HDR content, and high-wattage gamers.

## 3. High-Refresh IPS LCD

The mature, reliable workhorse of the computing industry.

- **Pros**: Budget-friendly, reliable PWM-free DC dimming, outstanding battery conservation at high refresh rates.
- **Cons**: Muted contrast ($1,200:1$), backlight bleed in dark rooms.

## Final Recommendation Matrix

| Use Case | Recommended Tech | Top Model Example |
| :--- | :--- | :--- |
| **Creative Color Grading** | Mini-LED | MacBook Pro 16" M3 Max |
| **Competitive Esports** | 240Hz OLED | ROG Zephyrus G16 |
| **Corporate Productivity** | Low-Power IPS / Anti-Glare OLED | ThinkPad X1 Carbon Gen 12 |
| **Budget Value** | 2.8K 90Hz OLED | Acer Swift Go 14 |
    `,
    category: 'Buying Guides',
    thumbnail: '/src/assets/images/hero_creator_laptop_1794052562533.jpg',
    author: {
      name: 'Elena Rostova',
      role: 'Display Hardware Editor',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80'
    },
    publishedAt: '2026-10-04',
    readTime: '7 min read',
    tags: ['Laptops', 'Displays', 'OLED', 'Mini-LED', 'Buying Guide'],
    tableOfContents: [
      { id: 'oled', title: '1. OLED (Organic Light Emitting Diode)', level: 2 },
      { id: 'mini-led', title: '2. Mini-LED (Full Array Local Dimming)', level: 2 },
      { id: 'ips', title: '3. High-Refresh IPS LCD', level: 2 },
      { id: 'matrix', title: 'Final Recommendation Matrix', level: 2 }
    ],
    relatedProductIds: ['lap-macbook-pro-16-m3-max', 'lap-dell-xps-16', 'lap-rog-zephyrus-g16'],
    status: 'published'
  },
  {
    id: 'blog-iphone-16-pro-camera-review',
    title: 'iPhone 16 Pro In-Depth Camera Review: Is The 5x Tetraprism Worth It?',
    slug: 'iphone-16-pro-camera-review-tetraprism',
    excerpt: 'We tested the 48MP Fusion sensor, new 48MP ultrawide macro capabilities, and dedicated Camera Control button across 1,200 sample captures.',
    content: `
# iPhone 16 Pro In-Depth Camera Review: Real-World Testing

With the iPhone 16 Pro, Apple has unified the telephoto optical system between both the standard Pro and the Pro Max. Both models now feature the folded tetraprism design offering 5x optical reach (120mm equivalent). But how does it perform against dedicated Android zoom beasts?

## The 48MP Ultrawide Upgrade

The single biggest leap this generation isn't the zoom—it's the **48MP Ultra Wide sensor**. Previous generations struggled with corner softness and low-light noise in macro shots. The new quad-pixel sensor aggregates light dramatically better, producing tack-sharp closeups with natural falloff.

## 4K 120 FPS Dolby Vision: A Filmmaker's Dream

Cinematographers will appreciate the addition of **4K 120 fps recording in ProRes and Dolby Vision**. You can now capture smooth cinematic slow-motion in full HDR, and adjust playback speed directly in the Photos app after the shoot (down to 60, 30, or 24 fps).

## The Physical Camera Control Button

Located on the lower right flank, this capacitive sapphire crystal key responds to:
1. **Light Press**: Locks focus or activates exposure/zoom slider menus.
2. **Double Light Press**: Cycles through focal styles, depth, and tone controls.
3. **Full Click**: Instantly snaps the shot or starts video capture.

While it feels futuristic, muscle memory takes several days to acclimate, especially when taking horizontal landscape photos with two hands.
    `,
    category: 'Mobile Reviews',
    thumbnail: '/src/assets/images/product_flagship_smartphone_1794052563082.jpg',
    author: {
      name: 'Julian Sterling',
      role: 'Principal Photography Reviewer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80'
    },
    publishedAt: '2026-09-28',
    readTime: '5 min read',
    tags: ['Cameras', 'Apple', 'iPhone', 'Mobile Reviews'],
    tableOfContents: [
      { id: 'ultrawide', title: 'The 48MP Ultrawide Upgrade', level: 2 },
      { id: 'video', title: '4K 120 FPS Dolby Vision', level: 2 },
      { id: 'camera-control', title: 'The Physical Camera Control Button', level: 2 }
    ],
    relatedProductIds: ['mob-iphone-16-pro-max', 'mob-samsung-s24-ultra', 'mob-xiaomi-14-ultra'],
    status: 'published'
  },
  {
    id: 'blog-npu-ai-laptops-guide',
    title: 'Top 5 AI Laptops Powered by NPU Processors: Complete Benchmark',
    slug: 'top-ai-laptops-npu-benchmark-comparison',
    excerpt: 'Testing local on-device LLMs, Whisper transcription speed, and Copilot+ PC features on Intel Core Ultra, AMD Ryzen AI, and Qualcomm Snapdragon X.',
    content: `
# Top 5 AI Laptops Powered by Dedicated NPU Processors

With Microsoft officially designating 40+ NPU TOPS as the minimum benchmark for native Copilot+ features, PC processors have gained dedicated neural engines. We put Intel Core Ultra, AMD Ryzen 8040/AI 300, and Apple Silicon to the test.

## What Does an NPU Actually Do for You?

Unlike raw graphics cards that draw 100+ watts, NPUs run persistent background AI tasks drawing less than 2.5 watts:
- Real-time video background blur and studio eye-contact correction
- Instant offline audio transcription and live translation
- Local generative diffusion models and semantic file retrieval without cloud latency.
    `,
    category: 'Laptop Reviews',
    thumbnail: '/src/assets/images/product_ultrabook_laptop_1794052562918.jpg',
    author: {
      name: 'Elena Rostova',
      role: 'Display & Computing Editor',
      avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=160&q=80'
    },
    publishedAt: '2026-09-12',
    readTime: '6 min read',
    tags: ['AI', 'NPU', 'Laptops', 'Intel Core Ultra', 'AMD'],
    tableOfContents: [
      { id: 'what-npu-does', title: 'What Does an NPU Actually Do for You?', level: 2 }
    ],
    relatedProductIds: ['lap-dell-xps-16', 'lap-thinkpad-x1-carbon-gen-12', 'lap-acer-swift-go-14'],
    status: 'published'
  },
  {
    id: 'blog-phone-battery-real-world',
    title: 'How to Choose the Best Smartphone Battery: Milliamps vs Real-World SoT',
    slug: 'smartphone-battery-guide-mah-vs-screen-on-time',
    excerpt: 'Why a 4,685 mAh iPhone often outlasts a 5,500 mAh Android phone: display efficiency, silicon voltage curves, and standby background processes explained.',
    content: `
# Understanding Smartphone Battery Life: Milliamps vs Screen-on Time

A common misconception among smartphone buyers is that bigger battery numbers directly equal longer run-times. We analyze why silicon efficiency, display LTPO backplanes, and OS scheduling dictate true longevity.
    `,
    category: 'How To',
    thumbnail: '/src/assets/images/hero_flagship_phone_1794052561714.jpg',
    author: {
      name: 'Dr. Marcus Vance',
      role: 'Chief Semiconductor Analyst',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&q=80'
    },
    publishedAt: '2026-08-30',
    readTime: '4 min read',
    tags: ['Battery', 'Guides', 'Smartphones', 'Hardware'],
    tableOfContents: [],
    relatedProductIds: ['mob-oneplus-12', 'mob-iphone-16-pro-max', 'mob-asus-rog-8-pro'],
    status: 'published'
  },
  {
    id: 'blog-zephyrus-g16-long-term',
    title: 'ASUS ROG Zephyrus G16 Long-Term Review: The King of Portable Gaming',
    slug: 'asus-rog-zephyrus-g16-long-term-review',
    excerpt: 'After 3 months of daily engineering and 4K gaming, here is how the CNC chassis, 240Hz OLED, and RTX 4080 thermal system hold up.',
    content: `
# ASUS ROG Zephyrus G16 Long-Term Review

The gaming laptop market has historically forced buyers to choose between thick, heavy bricks with great thermal headroom, or skinny ultrabooks that sound like jet engines and throttle immediately. The 2026 Zephyrus G16 strikes the elusive balance.
    `,
    category: 'Laptop Reviews',
    thumbnail: '/src/assets/images/hero_creator_laptop_1794052562533.jpg',
    author: {
      name: 'Julian Sterling',
      role: 'Principal Reviewer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80'
    },
    publishedAt: '2026-08-14',
    readTime: '5 min read',
    tags: ['Gaming', 'Asus ROG', 'OLED', 'Reviews'],
    tableOfContents: [],
    relatedProductIds: ['lap-rog-zephyrus-g16', 'lap-razer-blade-16', 'lap-dell-xps-16'],
    status: 'published'
  }
];

export const BLOG_CATEGORIES = [
  'All Categories',
  'AI',
  'How To',
  'Latest Technology',
  'Mobile Reviews',
  'Laptop Reviews',
  'Buying Guides',
  'Technology News'
];

export const BRANDS = [
  'Apple',
  'Samsung',
  'Google',
  'Dell',
  'Asus',
  'Lenovo',
  'OnePlus',
  'Xiaomi',
  'Razer',
  'HP',
  'Sony',
  'Microsoft',
  'Acer',
  'Vivo'
];
