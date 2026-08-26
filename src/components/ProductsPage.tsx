import { useState, useMemo, FormEvent } from 'react';
import {
  Search,
  SlidersHorizontal,
  Star,
  ShoppingBag,
  Plus,
  Minus,
  Trash2,
  X,
  Check,
  Zap,
  ArrowRight,
  ShieldCheck,
  Truck,
  RotateCcw,
  Tag,
  Eye,
  Filter,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { ProductItem, CartItem } from '../types';
import { PRODUCTS_DATA } from '../data/productsData';

import { OrderItem } from '../types';

interface ProductsPageProps {
  onBackToHome?: () => void;
  onOpenGetInTouch?: () => void;
  onProceedToCheckout?: (cartItems: OrderItem[]) => void;
}

export function ProductsPage({ onBackToHome, onOpenGetInTouch, onProceedToCheckout }: ProductsPageProps) {
  // State for search and filters
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSport, setSelectedSport] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<'featured' | 'price-asc' | 'price-desc' | 'rating'>('featured');
  const [inStockOnly, setInStockOnly] = useState<boolean>(false);
  const [maxPrice, setMaxPrice] = useState<number>(250);

  // Cart state
  const [cart, setCart] = useState<CartItem[]>([
    {
      product: PRODUCTS_DATA[0],
      quantity: 1,
      selectedSize: 'Official Size 7',
    },
    {
      product: PRODUCTS_DATA[1],
      quantity: 1,
      selectedSize: 'L',
      selectedColor: 'Midnight Navy',
    },
  ]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoMessage, setPromoMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Quick View Modal
  const [quickViewProduct, setQuickViewProduct] = useState<ProductItem | null>(null);
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [itemQty, setItemQty] = useState<number>(1);

  // Checkout Modal
  const [checkoutModalOpen, setCheckoutModalOpen] = useState(false);
  const [orderComplete, setOrderComplete] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [customerAddress, setCustomerAddress] = useState('');

  // Categories list
  const categories = [
    { id: 'All', label: 'All Products' },
    { id: 'Apparel', label: 'Apparel & Jerseys' },
    { id: 'Equipment', label: 'Equipment & Balls' },
    { id: 'Nutrition', label: 'Nutrition & Fuel' },
    { id: 'Passes', label: 'Passes & Memberships' },
  ];

  const sports = ['All', 'Basketball', 'Tennis', 'Training', 'All-Sport'];

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return PRODUCTS_DATA.filter((p) => {
      // Category filter
      if (selectedCategory !== 'All' && p.category !== selectedCategory) {
        return false;
      }
      // Sport filter
      if (selectedSport !== 'All' && p.sport !== selectedSport && p.sport !== 'All-Sport') {
        return false;
      }
      // Search Query
      if (
        searchQuery.trim() !== '' &&
        !p.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !p.category.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      // In stock
      if (inStockOnly && !p.inStock) {
        return false;
      }
      // Price
      if (p.price > maxPrice) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (sortBy === 'price-asc') return a.price - b.price;
      if (sortBy === 'price-desc') return b.price - a.price;
      if (sortBy === 'rating') return b.rating - a.rating;
      return 0;
    });
  }, [selectedCategory, selectedSport, searchQuery, inStockOnly, maxPrice, sortBy]);

  // Cart helper calculations
  const cartTotalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const discountAmount = (subtotal * discountPercent) / 100;
  const shippingFee = subtotal > 75 || subtotal === 0 ? 0 : 9.99;
  const total = Math.max(0, subtotal - discountAmount + shippingFee);

  // Cart operations
  const addToCart = (
    product: ProductItem,
    size?: string,
    color?: string,
    qty = 1
  ) => {
    setCart((prev) => {
      const chosenSize = size || (product.sizes ? product.sizes[0] : undefined);
      const chosenColor =
        color ||
        (product.colors
          ? typeof product.colors[0] === 'string'
            ? product.colors[0]
            : product.colors[0].name
          : undefined);

      const existingIndex = prev.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.selectedSize === chosenSize &&
          item.selectedColor === chosenColor
      );

      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += qty;
        return updated;
      }

      return [
        ...prev,
        {
          product,
          quantity: qty,
          selectedSize: chosenSize,
          selectedColor: chosenColor,
        },
      ];
    });

    setIsCartOpen(true);
  };

  const updateCartQty = (index: number, delta: number) => {
    setCart((prev) => {
      const updated = [...prev];
      const newQty = updated[index].quantity + delta;
      if (newQty <= 0) {
        return updated.filter((_, i) => i !== index);
      }
      updated[index].quantity = newQty;
      return updated;
    });
  };

  const removeFromCart = (index: number) => {
    setCart((prev) => prev.filter((_, i) => i !== index));
  };

  const handleApplyPromo = (e: FormEvent) => {
    e.preventDefault();
    const code = promoCode.trim().toUpperCase();
    if (code === 'GRANGER20' || code === 'FEB2026') {
      setDiscountPercent(20);
      setPromoMessage({ type: 'success', text: '20% discount applied successfully!' });
    } else if (code === 'GRANGER10') {
      setDiscountPercent(10);
      setPromoMessage({ type: 'success', text: '10% discount applied successfully!' });
    } else if (code === 'FREESHIP') {
      setDiscountPercent(0);
      setPromoMessage({ type: 'success', text: 'Free shipping voucher applied!' });
    } else {
      setDiscountPercent(0);
      setPromoMessage({ type: 'error', text: 'Invalid promo code. Try GRANGER20 or FEB2026' });
    }
  };

  const handleOpenQuickView = (product: ProductItem) => {
    setQuickViewProduct(product);
    setSelectedSize(product.sizes ? product.sizes[0] : '');
    setSelectedColor(
      product.colors
        ? typeof product.colors[0] === 'string'
          ? product.colors[0]
          : product.colors[0].name
        : ''
    );
    setItemQty(1);
  };

  const handleProcessCheckout = (e: FormEvent) => {
    e.preventDefault();
    if (!customerName || !customerEmail || !customerAddress) return;
    setOrderComplete(true);
  };

  const resetCheckout = () => {
    setOrderComplete(false);
    setCheckoutModalOpen(false);
    setCart([]);
  };

  return (
    <div className="w-full bg-[#F0F2F5] min-h-screen pt-24 pb-20 transition-colors duration-300">
      {/* ========================================================================= */}
      {/* 1. EDITORIAL HEADER & STORE HERO */}
      {/* ========================================================================= */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pt-4 pb-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 sm:pb-8 border-b border-[#E2E8F0]">
            {/* Left Title & Description */}
            <div className="max-w-2xl">
              <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
                <span className="font-tech text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#FF671C] bg-[#FF671C]/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md border border-[#FF671C]/20">
                  GRANGER PRO SHOP
                </span>
                <span className="text-xs text-[#94A3B8]">•</span>
                <span className="font-tech text-[11px] sm:text-xs font-bold text-[#64748B] uppercase">
                  OFFICIAL 2026 COLLECTION
                </span>
              </div>

              <h1 className="font-sport text-4xl sm:text-6xl md:text-7xl font-black uppercase italic tracking-tight text-[#0c1017] leading-[0.92]">
                EQUIPMENT, APPAREL & NUTRITION.
              </h1>

              <p className="text-[#64748B] text-xs sm:text-base mt-3 sm:mt-4 font-sans leading-relaxed">
                Engineered for match play, high-cadence training, and optimal post-game recovery. Certified gear for the Granger community.
              </p>
            </div>

            {/* Right Floating Bag Action & Quick Trust Line */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 flex-shrink-0">
              <button
                type="button"
                onClick={() => setIsCartOpen(true)}
                className="font-tech bg-[#0c1017] hover:bg-[#FF671C] text-white px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-sm hover:shadow-md transition-all active:scale-95 cursor-pointer w-full sm:w-auto"
              >
                <ShoppingBag className="w-4 h-4" />
                <span>SHOPPING BAG ({cartTotalCount})</span>
                {cartTotalCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-[#FF671C] animate-pulse" />
                )}
              </button>

              <div className="flex items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-tech font-bold text-[#64748B] uppercase">
                <span>FREE SHIPPING OVER $75</span>
                <span>•</span>
                <span>30-DAY RETURNS</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. REFINED FILTER & SEARCH CONTROL BAR */}
      {/* ========================================================================= */}
      <section className="w-full px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
        <div className="max-w-7xl mx-auto w-full bg-white rounded-3xl p-4 sm:p-5 border border-[#E2E8F0] shadow-xs space-y-3.5 sm:space-y-4">
          {/* Top Row: Category Tabs & Result Count */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4 font-tech">
            {/* Category Pills with Sliding Indicator & Horizontal Touch Scroll */}
            <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto pb-1 touch-scroll no-scrollbar">
              {categories.map((cat) => {
                const isActive = selectedCategory === cat.id;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3.5 sm:px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider whitespace-nowrap transition-colors relative cursor-pointer ${
                      isActive
                        ? 'text-white'
                        : 'bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] hover:text-[#0c1017]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="productCategoryIndicator"
                        className="absolute inset-0 bg-[#FF671C] rounded-xl shadow-xs -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Quick in-stock pill */}
            <div className="flex items-center justify-between md:justify-end gap-3 pt-1 md:pt-0">
              <span className="text-xs text-[#94A3B8] font-bold uppercase">
                {filteredProducts.length} PRODUCTS
              </span>
              <motion.button
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={() => setInStockOnly(!inStockOnly)}
                className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 border transition-all cursor-pointer ${
                  inStockOnly
                    ? 'bg-[#FF671C]/10 border-[#FF671C] text-[#FF671C]'
                    : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:text-[#0c1017]'
                }`}
              >
                <Check className={`w-3.5 h-3.5 ${inStockOnly ? 'opacity-100' : 'opacity-30'}`} />
                <span>IN STOCK ONLY</span>
              </motion.button>
            </div>
          </div>

          {/* Bottom Row: Search Bar, Sport Sub-filters, and Sort Dropdown */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-3 border-t border-[#E2E8F0]">
            {/* Search Input Field */}
            <div className="relative flex-grow max-w-full lg:max-w-md">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="SEARCH GEAR, APPAREL, SUPPLEMENTS..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="font-tech w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-10 pr-9 py-2.5 text-xs font-bold text-[#0c1017] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#FF671C] focus:bg-white transition-colors uppercase"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0c1017]"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Sport Filter Pills & Sort Dropdown */}
            <div className="flex flex-wrap items-center gap-2.5 justify-between lg:justify-end font-tech">
              {/* Sport Pills with Horizontal Touch Scroll */}
              <div className="flex items-center gap-1 bg-[#F8FAFC] p-1 rounded-xl border border-[#E2E8F0] overflow-x-auto touch-scroll no-scrollbar max-w-full">
                <span className="text-[10px] font-black text-[#94A3B8] uppercase tracking-wider px-2 hidden sm:inline">
                  SPORT:
                </span>
                {sports.map((sport) => (
                  <button
                    key={sport}
                    onClick={() => setSelectedSport(sport)}
                    className={`px-2.5 sm:px-3 py-1.5 rounded-lg text-xs font-black uppercase tracking-wider whitespace-nowrap transition-all cursor-pointer ${
                      selectedSport === sport
                        ? 'bg-[#0c1017] text-white shadow-2xs'
                        : 'text-[#64748B] hover:text-[#0c1017]'
                    }`}
                  >
                    {sport}
                  </button>
                ))}
              </div>

              {/* Sort Dropdown */}
              <div className="flex items-center gap-2 bg-[#F8FAFC] px-3 py-2 rounded-xl border border-[#E2E8F0]">
                <SlidersHorizontal className="w-3.5 h-3.5 text-[#64748B]" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-transparent text-xs font-black uppercase text-[#0c1017] focus:outline-none cursor-pointer"
                >
                  <option value="featured">FEATURED</option>
                  <option value="price-asc">PRICE: LOW TO HIGH</option>
                  <option value="price-desc">PRICE: HIGH TO LOW</option>
                  <option value="rating">TOP RATED</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. PRODUCT GRID */}
      {/* ========================================================================= */}
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          {filteredProducts.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-12 text-center border border-[#E2E8F0] shadow-2xs max-w-lg mx-auto"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] flex items-center justify-center mx-auto text-[#64748B] mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="font-sport text-2xl font-black italic uppercase text-[#0c1017]">NO PRODUCTS FOUND</h3>
            <p className="text-xs text-[#64748B] mt-2 mb-6 font-sans">
              Try adjusting your category, sport filter, or clear search queries.
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                setSelectedCategory('All');
                setSelectedSport('All');
                setSearchQuery('');
                setInStockOnly(false);
              }}
              className="font-tech bg-[#FF671C] text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer"
            >
              RESET FILTERS
            </motion.button>
          </motion.div>
        ) : (
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 sm:gap-7">
            <AnimatePresence>
              {filteredProducts.map((product) => {
                const discountPercentCalc = product.originalPrice
                  ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
                  : null;

                return (
                  <motion.div
                    layout="position"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -6 }}
                    key={product.id}
                    className="group bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Top Image Container */}
                    <div className="relative w-full h-64 sm:h-72 bg-[#0c1f30]/5 overflow-hidden flex items-center justify-center p-4">
                      <img
                        src={product.image}
                        alt={product.name}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                      />

                      {/* Badge on Image */}
                      {product.badge && (
                        <div className="absolute top-6 left-6 z-10 font-tech">
                          <span className="px-3 py-1 rounded-md bg-[#0c1017]/90 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider shadow-xs border border-white/20">
                            {product.badge}
                          </span>
                        </div>
                      )}

                      {discountPercentCalc && (
                        <div className="absolute top-6 right-6 z-10 font-tech">
                          <span className="px-2.5 py-1 rounded-md bg-[#FF671C] text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                            SAVE {discountPercentCalc}%
                          </span>
                        </div>
                      )}

                      {/* Quick View Hover Button */}
                      <div className="absolute inset-0 bg-black/30 backdrop-blur-2xs opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                        <motion.button
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                          onClick={() => handleOpenQuickView(product)}
                          className="font-tech bg-white text-[#0c1017] hover:bg-[#FF671C] hover:text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider shadow-md flex items-center gap-1.5 transition-all transform translate-y-2 group-hover:translate-y-0 cursor-pointer"
                        >
                          <Eye className="w-3.5 h-3.5" />
                          <span>QUICK VIEW</span>
                        </motion.button>
                      </div>
                    </div>


                  {/* Body Content */}
                  <div className="p-6 flex-grow flex flex-col justify-between">
                    <div>
                      {/* Category & Rating */}
                      <div className="flex items-center justify-between gap-2 mb-2 font-tech">
                        <span className="text-[10px] font-black uppercase tracking-widest text-[#00a0e7]">
                          {product.category} • {product.sport}
                        </span>
                        <div className="flex items-center gap-1 text-[11px] font-bold text-[#0c1017]">
                          <Star className="w-3.5 h-3.5 fill-[#FF671C] text-[#FF671C]" />
                          <span>{product.rating.toFixed(1)}</span>
                          <span className="text-[#94A3B8] font-normal">({product.reviewsCount})</span>
                        </div>
                      </div>

                      {/* Product Name */}
                      <h3 className="font-sport text-2xl font-black italic uppercase text-[#0c1017] leading-tight group-hover:text-[#FF671C] transition-colors">
                        {product.name}
                      </h3>

                      {/* Brief description */}
                      <p className="text-xs text-[#64748B] mt-2.5 line-clamp-2 leading-relaxed font-sans">
                        {product.description}
                      </p>

                      {/* Color swatches preview if exists */}
                      {product.colors && product.colors.length > 0 && (
                        <div className="flex items-center gap-1.5 mt-3.5 font-tech">
                          <span className="text-[10px] text-[#94A3B8] font-bold uppercase mr-1">COLORS:</span>
                          {product.colors.map((c) => (
                            <span
                              key={c.name}
                              title={c.name}
                              style={{ backgroundColor: c.hex }}
                              className="w-3.5 h-3.5 rounded-full border border-black/20 shadow-2xs inline-block"
                            />
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Footer: Price & Add to Bag */}
                    <div className="pt-5 mt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                      <div>
                        <div className="flex items-baseline gap-2">
                          <span className="font-sport text-2xl sm:text-3xl font-black italic text-[#0c1017]">
                            ${product.price}
                          </span>
                          {product.originalPrice && (
                            <span className="font-tech text-xs font-bold text-[#94A3B8] line-through">
                              ${product.originalPrice}
                            </span>
                          )}
                        </div>
                        <span className="font-tech text-[10px] font-black uppercase tracking-wider text-[#16A34A] block mt-0.5">
                          {product.inStock ? '● IN STOCK & READY' : 'PRE-ORDER'}
                        </span>
                      </div>

                      <motion.button
                        whileTap={{ scale: 0.94 }}
                        onClick={() => addToCart(product)}
                        className="font-tech bg-[#0c1017] hover:bg-[#FF671C] text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 transition-all shadow-xs cursor-pointer"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>ADD</span>
                      </motion.button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
            </AnimatePresence>
          </motion.div>
        )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. SHOPPING CART SLIDE-OVER DRAWER */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsCartOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            {/* Slide-over Panel */}
            <div className="fixed inset-y-0 right-0 max-w-full flex pl-0 sm:pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 200 }}
                className="w-screen max-w-full sm:max-w-md bg-white shadow-2xl flex flex-col justify-between pb-safe"
              >
                {/* Drawer Header */}
                <div className="p-6 border-b border-[#E2E8F0] flex items-center justify-between bg-[#F8FAFC]">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-[#FF671C]" />
                    <h2 className="font-sport text-2xl font-black italic uppercase text-[#0c1017]">
                      YOUR BAG ({cartTotalCount})
                    </h2>
                  </div>
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 text-[#64748B] hover:text-[#0c1017] rounded-full hover:bg-black/5"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Free shipping banner */}
                <div className="font-tech bg-[#00a0e7]/10 px-6 py-2.5 border-b border-[#00a0e7]/20 flex items-center gap-2 text-xs text-[#007cb3] font-bold uppercase">
                  <Truck className="w-4 h-4 flex-shrink-0 text-[#00a0e7]" />
                  <span>
                    {subtotal >= 75
                      ? '🎉 UNLOCKED FREE EXPRESS SHIPPING!'
                      : `ADD $${(75 - subtotal).toFixed(2)} MORE FOR FREE SHIPPING`}
                  </span>
                </div>

                {/* Drawer Body - Items List */}
                <div className="flex-grow overflow-y-auto p-6 flex flex-col gap-4">
                  {cart.length === 0 ? (
                    <div className="text-center py-16 flex flex-col items-center justify-center">
                      <ShoppingBag className="w-12 h-12 text-[#CBD5E1] mb-3" />
                      <p className="font-sport text-2xl font-black italic uppercase text-[#0c1017]">YOUR BAG IS EMPTY</p>
                      <p className="text-xs text-[#64748B] mt-1 mb-6 font-sans">
                        Explore our gear and add your favorite sport items!
                      </p>
                      <button
                        onClick={() => setIsCartOpen(false)}
                        className="font-tech bg-[#0c1017] text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider"
                      >
                        START SHOPPING
                      </button>
                    </div>
                  ) : (
                    cart.map((item, idx) => (
                      <div
                        key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}-${idx}`}
                        className="flex gap-4 p-3.5 rounded-2xl border border-[#E2E8F0] bg-[#F8FAFC] relative"
                      >
                        <img
                          src={item.product.image}
                          alt={item.product.name}
                          loading="lazy"
                          decoding="async"
                          referrerPolicy="no-referrer"
                          className="w-20 h-20 object-cover rounded-xl bg-white border border-black/5 flex-shrink-0"
                        />

                        <div className="flex-grow flex flex-col justify-between">
                          <div className="pr-6">
                            <h4 className="font-sport text-lg font-black italic uppercase text-[#0c1017] line-clamp-1">
                              {item.product.name}
                            </h4>
                            <div className="font-tech text-[10px] font-bold text-[#64748B] uppercase flex items-center gap-2 mt-0.5">
                              {item.selectedSize && <span>SIZE: {item.selectedSize}</span>}
                              {item.selectedColor && <span>• {item.selectedColor}</span>}
                            </div>
                            <p className="font-sport text-lg font-black italic text-[#FF671C] mt-1">
                              ${item.product.price}
                            </p>
                          </div>

                          {/* Quantity Controls */}
                          <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/5">
                            <div className="flex items-center gap-2 bg-white border border-[#E2E8F0] rounded-lg px-2 py-0.5 font-tech">
                              <button
                                onClick={() => updateCartQty(idx, -1)}
                                className="text-[#64748B] hover:text-[#0c1017] p-0.5"
                              >
                                <Minus className="w-3 h-3" />
                              </button>
                              <span className="text-xs font-black text-[#0c1017] min-w-[14px] text-center">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateCartQty(idx, 1)}
                                className="text-[#64748B] hover:text-[#0c1017] p-0.5"
                              >
                                <Plus className="w-3 h-3" />
                              </button>
                            </div>

                            <span className="font-sport text-lg font-black italic text-[#0c1017]">
                              ${(item.product.price * item.quantity).toFixed(2)}
                            </span>
                          </div>
                        </div>

                        {/* Remove item */}
                        <button
                          onClick={() => removeFromCart(idx)}
                          className="absolute top-3 right-3 text-[#94A3B8] hover:text-[#EF4444] transition-colors p-1"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    ))
                  )}
                </div>

                {/* Drawer Footer & Checkout */}
                {cart.length > 0 && (
                  <div className="p-6 border-t border-[#E2E8F0] bg-white flex flex-col gap-3.5">
                    {/* Promo Code Form */}
                    <form onSubmit={handleApplyPromo} className="flex gap-2">
                      <div className="relative flex-grow">
                        <Tag className="w-3.5 h-3.5 text-[#94A3B8] absolute left-3 top-1/2 -translate-y-1/2" />
                        <input
                          type="text"
                          placeholder="PROMO CODE (e.g. GRANGER20)"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          className="font-tech w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl pl-8 pr-3 py-2 text-xs font-bold text-[#0c1017] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#FF671C] uppercase"
                        />
                      </div>
                      <button
                        type="submit"
                        className="font-tech bg-[#0c1017] hover:bg-[#FF671C] text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer"
                      >
                        APPLY
                      </button>
                    </form>

                    {promoMessage && (
                      <p
                        className={`font-tech text-xs font-bold uppercase ${
                          promoMessage.type === 'success' ? 'text-[#16A34A]' : 'text-[#EF4444]'
                        }`}
                      >
                        {promoMessage.text}
                      </p>
                    )}

                    {/* Breakdown */}
                    <div className="space-y-1.5 font-tech text-xs text-[#64748B] pt-2 border-t border-black/5 uppercase">
                      <div className="flex justify-between">
                        <span>SUBTOTAL</span>
                        <span className="font-bold text-[#0c1017]">${subtotal.toFixed(2)}</span>
                      </div>
                      {discountAmount > 0 && (
                        <div className="flex justify-between text-[#16A34A] font-bold">
                          <span>DISCOUNT ({discountPercent}%)</span>
                          <span>-${discountAmount.toFixed(2)}</span>
                        </div>
                      )}
                      <div className="flex justify-between">
                        <span>ESTIMATED SHIPPING</span>
                        <span className="font-bold text-[#0c1017]">
                          {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                        </span>
                      </div>
                      <div className="flex justify-between items-center pt-2 border-t border-black/5">
                        <span className="font-tech text-xs font-black uppercase text-[#0c1017]">TOTAL DUE</span>
                        <span className="font-sport text-3xl font-black italic text-[#FF671C]">${total.toFixed(2)}</span>
                      </div>
                    </div>

                    {/* Checkout Button */}
                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        if (onProceedToCheckout) {
                          const orderItems: OrderItem[] = cart.map((c) => ({
                            id: c.product.id,
                            name: c.product.name,
                            price: c.product.price,
                            quantity: c.quantity,
                            image: c.product.image,
                            category: c.product.category,
                            sport: c.product.sport,
                            size: c.selectedSize,
                          }));
                          onProceedToCheckout(orderItems);
                        } else {
                          setCheckoutModalOpen(true);
                        }
                      }}
                      className="font-tech w-full bg-[#FF671C] hover:bg-[#e05615] text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all transform hover:scale-[1.01] active:scale-95 shadow-md cursor-pointer"
                    >
                      <span>PROCEED TO CHECKOUT</span>
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 5. QUICK VIEW DETAIL MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setQuickViewProduct(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 bg-white rounded-3xl max-w-2xl w-full p-5 sm:p-7 md:p-8 shadow-2xl border border-[#E2E8F0] overflow-y-auto max-h-[88vh] flex flex-col md:flex-row gap-5 sm:gap-6"
            >
              <button
                onClick={() => setQuickViewProduct(null)}
                className="absolute top-4 right-4 p-2 text-[#64748B] hover:text-[#0c1017] rounded-full hover:bg-black/5 z-20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* Product Image */}
              <div className="w-full md:w-1/2 h-52 sm:h-64 md:h-auto rounded-2xl overflow-hidden bg-[#F8FAFC] border border-black/5 flex items-center justify-center p-2 flex-shrink-0">
                <img
                  src={quickViewProduct.image}
                  alt={quickViewProduct.name}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              {/* Product Info */}
              <div className="w-full md:w-1/2 flex flex-col justify-between overflow-y-auto">
                <div>
                  <span className="font-tech text-[10px] font-black uppercase tracking-widest text-[#00a0e7]">
                    {quickViewProduct.category} • {quickViewProduct.sport}
                  </span>
                  <h3 className="font-sport text-3xl font-black italic uppercase text-[#0c1017] mt-1 leading-tight">
                    {quickViewProduct.name}
                  </h3>

                  <div className="flex items-center gap-2 mt-2 font-tech">
                    <div className="flex items-center gap-1 text-xs font-bold text-[#0c1017]">
                      <Star className="w-3.5 h-3.5 fill-[#FF671C] text-[#FF671C]" />
                      <span>{quickViewProduct.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-xs text-[#94A3B8]">
                      ({quickViewProduct.reviewsCount} CUSTOMER REVIEWS)
                    </span>
                  </div>

                  <div className="flex items-baseline gap-2 mt-3">
                    <span className="font-sport text-3xl font-black italic text-[#FF671C]">
                      ${quickViewProduct.price}
                    </span>
                    {quickViewProduct.originalPrice && (
                      <span className="font-tech text-xs font-bold text-[#94A3B8] line-through">
                        ${quickViewProduct.originalPrice}
                      </span>
                    )}
                  </div>

                  <p className="text-xs text-[#64748B] mt-3 leading-relaxed font-sans">
                    {quickViewProduct.description}
                  </p>

                  {/* Features list */}
                  <ul className="mt-3 space-y-1">
                    {quickViewProduct.features.map((f, i) => (
                      <li key={i} className="text-xs text-[#475569] flex items-center gap-1.5 font-sans">
                        <Check className="w-3 h-3 text-[#16A34A] flex-shrink-0" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Size Selector if exists */}
                  {quickViewProduct.sizes && (
                    <div className="mt-4">
                      <label className="font-tech text-xs font-black text-[#0c1017] uppercase tracking-wider block mb-1.5">
                        SELECT OPTION / SIZE:
                      </label>
                      <div className="flex flex-wrap gap-1.5 font-tech">
                        {quickViewProduct.sizes.map((s) => (
                          <button
                            key={s}
                            onClick={() => setSelectedSize(s)}
                            className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider border transition-all ${
                              selectedSize === s
                                ? 'bg-[#0c1017] text-white border-[#0c1017]'
                                : 'bg-[#F8FAFC] text-[#4A5568] border-[#E2E8F0] hover:border-black'
                            }`}
                          >
                            {s}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Color Selector if exists */}
                  {quickViewProduct.colors && (
                    <div className="mt-4">
                      <label className="font-tech text-xs font-black text-[#0c1017] uppercase tracking-wider block mb-1.5">
                        SELECT COLOR: {selectedColor}
                      </label>
                      <div className="flex items-center gap-2">
                        {quickViewProduct.colors.map((c) => (
                          <button
                            key={c.name}
                            onClick={() => setSelectedColor(c.name)}
                            style={{ backgroundColor: c.hex }}
                            className={`w-6 h-6 rounded-full border-2 transition-all ${
                              selectedColor === c.name
                                ? 'border-[#FF671C] scale-110 shadow-sm ring-2 ring-[#FF671C]/20'
                                : 'border-black/20'
                            }`}
                            title={c.name}
                          />
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="mt-6 pt-4 border-t border-[#E2E8F0] flex items-center gap-3">
                  <div className="flex items-center gap-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3 py-2 font-tech">
                    <button
                      onClick={() => setItemQty(Math.max(1, itemQty - 1))}
                      className="text-[#64748B] hover:text-[#0c1017]"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="text-xs font-black text-[#0c1017] min-w-[16px] text-center">
                      {itemQty}
                    </span>
                    <button
                      onClick={() => setItemQty(itemQty + 1)}
                      className="text-[#64748B] hover:text-[#0c1017]"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>

                  <button
                    onClick={() => {
                      addToCart(quickViewProduct, selectedSize, selectedColor, itemQty);
                      setQuickViewProduct(null);
                    }}
                    className="font-tech flex-grow bg-[#FF671C] hover:bg-[#e05615] text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>ADD TO BAG • ${(quickViewProduct.price * itemQty).toFixed(2)}</span>
                  </button>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ========================================================================= */}
      {/* 6. CHECKOUT & ORDER COMPLETE MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {checkoutModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setCheckoutModalOpen(false)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl border border-[#E2E8F0]"
            >
              {!orderComplete ? (
                <div>
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="font-sport text-3xl font-black italic uppercase text-[#0c1017]">COMPLETE YOUR ORDER</h3>
                    <button
                      onClick={() => setCheckoutModalOpen(false)}
                      className="p-1.5 text-[#64748B] hover:text-[#0c1017]"
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="bg-[#F8FAFC] rounded-2xl p-4 border border-[#E2E8F0] mb-6 flex justify-between items-center text-xs font-tech">
                    <div>
                      <p className="font-black text-[#0c1017] uppercase">{cartTotalCount} ITEMS IN ORDER</p>
                      <p className="text-[#64748B] mt-0.5 uppercase">EXPRESS 2-3 DAY DELIVERY</p>
                    </div>
                    <span className="font-sport text-2xl font-black italic text-[#FF671C]">${total.toFixed(2)}</span>
                  </div>

                  <form onSubmit={handleProcessCheckout} className="space-y-4 font-tech">
                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-[#0c1017] mb-1">FULL NAME</label>
                      <input
                        type="text"
                        required
                        placeholder="e.g. Alex Henderson"
                        value={customerName}
                        onChange={(e) => setCustomerName(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-xs font-bold text-[#0c1017] focus:outline-none focus:border-[#FF671C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-[#0c1017] mb-1">EMAIL ADDRESS</label>
                      <input
                        type="email"
                        required
                        placeholder="alex@example.com"
                        value={customerEmail}
                        onChange={(e) => setCustomerEmail(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-2.5 text-xs font-bold text-[#0c1017] focus:outline-none focus:border-[#FF671C]"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black uppercase tracking-wider text-[#0c1017] mb-1">SHIPPING ADDRESS</label>
                      <textarea
                        required
                        rows={2}
                        placeholder="Street Address, City, Postal Code"
                        value={customerAddress}
                        onChange={(e) => setCustomerAddress(e.target.value)}
                        className="w-full bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-4 py-2 text-xs font-bold text-[#0c1017] focus:outline-none focus:border-[#FF671C]"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full mt-4 bg-[#FF671C] hover:bg-[#e05615] text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
                    >
                      <Zap className="w-4 h-4 fill-white" />
                      <span>CONFIRM ORDER (${total.toFixed(2)})</span>
                    </button>
                  </form>
                </div>
              ) : (
                <div className="text-center py-6">
                  <div className="w-16 h-16 rounded-full bg-[#16A34A]/10 text-[#16A34A] flex items-center justify-center mx-auto mb-4">
                    <Check className="w-8 h-8 stroke-[3]" />
                  </div>
                  <h3 className="font-sport text-4xl font-black italic uppercase text-[#0c1017]">
                    ORDER CONFIRMED!
                  </h3>
                  <p className="text-xs text-[#64748B] mt-2 max-w-sm mx-auto leading-relaxed font-sans">
                    Thank you, <strong className="text-[#0c1017]">{customerName}</strong>! We have dispatched an invoice and tracking code to <strong className="text-[#0c1017]">{customerEmail}</strong>.
                  </p>
                  <div className="mt-6 pt-6 border-t border-[#E2E8F0]">
                    <button
                      onClick={resetCheckout}
                      className="font-tech bg-[#0c1017] text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-wider hover:bg-[#FF671C] transition-all cursor-pointer"
                    >
                      DONE & BACK TO GEAR
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
