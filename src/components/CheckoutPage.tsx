import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShoppingBag,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Truck,
  MapPin,
  CreditCard,
  QrCode,
  ShieldCheck,
  Building2,
  Copy,
  Check,
  Tag,
  Download,
  Package,
  Calendar,
  Lock,
} from 'lucide-react';
import { OrderItem, OrderRecord, UserProfile } from '../types';

interface CheckoutPageProps {
  cart: OrderItem[];
  currentUser: UserProfile | null;
  onOrderCompleted: (order: OrderRecord) => void;
  onNavigateShop: () => void;
  onNavigateDashboard: () => void;
}

export function CheckoutPage({
  cart,
  currentUser,
  onOrderCompleted,
  onNavigateShop,
  onNavigateDashboard,
}: CheckoutPageProps) {
  const [currentStep, setCurrentStep] = useState<1 | 2 | 3 | 4>(1);

  // Promo Code State
  const [promoCode, setPromoCode] = useState('');
  const [discountPercent, setDiscountPercent] = useState(0);
  const [promoError, setPromoError] = useState('');
  const [promoSuccess, setPromoSuccess] = useState('');

  // Shipping Form State
  const [shippingMethod, setShippingMethod] = useState<
    'Home Express Delivery' | 'Campus Smart Locker Pickup'
  >('Home Express Delivery');

  const [addressData, setAddressData] = useState({
    fullName: currentUser?.name || 'Alex Granger',
    email: currentUser?.email || 'alex.granger@athletics.io',
    phone: currentUser?.phone || '+1 (858) 492-7700',
    streetAddress: '4820 Performance Parkway, Suite 400',
    city: 'San Diego',
    state: 'California',
    zipCode: '92121',
    country: 'United States',
    lockerLocation: 'San Diego Campus HQ - Bay Locker #14',
  });

  // Payment Method State
  const [paymentMethod, setPaymentMethod] = useState<
    'Credit Card' | 'Instant QRIS' | 'Bank Virtual Account' | 'Apple Pay'
  >('Credit Card');

  const [cardData, setCardData] = useState({
    cardNumber: '4532 •••• •••• 8890',
    cardHolder: currentUser?.name || 'ALEX GRANGER',
    expiry: '08/28',
    cvv: '942',
  });
  const [isFlipped, setIsFlipped] = useState(false);
  const [copiedVA, setCopiedVA] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Confirmed Order Data State
  const [confirmedOrder, setConfirmedOrder] = useState<OrderRecord | null>(null);

  // Calculations
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const discountAmount = subtotal * (discountPercent / 100);
  const shippingFee = subtotal >= 75 || shippingMethod === 'Campus Smart Locker Pickup' ? 0 : 9.99;
  const taxAmount = (subtotal - discountAmount) * 0.075;
  const totalAmount = Math.max(0, subtotal - discountAmount + shippingFee + taxAmount);

  const handleApplyPromo = (e: React.FormEvent) => {
    e.preventDefault();
    if (promoCode.trim().toUpperCase() === 'GRANGER2026' || promoCode.trim().toUpperCase() === 'OLYMPIC') {
      setDiscountPercent(15);
      setPromoSuccess('15% ATHLETE DISCOUNT APPLIED!');
      setPromoError('');
    } else {
      setDiscountPercent(0);
      setPromoError('INVALID VOUCHER CODE');
      setPromoSuccess('');
    }
  };

  const handleProceedPayment = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessingPayment(true);

    setTimeout(() => {
      setIsProcessingPayment(false);
      const newOrder: OrderRecord = {
        id: 'GR-ORD-' + Math.floor(10000 + Math.random() * 90000),
        date: new Date().toLocaleDateString('en-US', {
          month: 'short',
          day: 'numeric',
          year: 'numeric',
        }),
        items: cart,
        totalAmount,
        shippingMethod,
        shippingAddress:
          shippingMethod === 'Home Express Delivery'
            ? `${addressData.streetAddress}, ${addressData.city}, ${addressData.state} ${addressData.zipCode}`
            : addressData.lockerLocation,
        paymentMethod,
        status: 'Processing',
        trackingNumber: 'TRK-' + Math.random().toString(36).substring(2, 10).toUpperCase(),
        estimatedDelivery:
          shippingMethod === 'Campus Smart Locker Pickup'
            ? 'Today at 04:00 PM'
            : '2-3 Business Days (Express)',
      };

      setConfirmedOrder(newOrder);
      onOrderCompleted(newOrder);
      setCurrentStep(4);
    }, 1500);
  };

  return (
    <div className="w-full min-h-screen bg-[#F0F2F5] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Step Indicator Header */}
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <span className="font-tech text-xs font-black uppercase tracking-widest text-[#FF671C] bg-[#FF671C]/10 px-2.5 py-0.5 rounded-md border border-[#FF671C]/20">
                  GRANGER PRO CHECKOUT
                </span>
                <span className="text-xs text-[#94A3B8]">•</span>
                <span className="font-tech text-xs font-bold text-[#64748B] uppercase">
                  ENCRYPTED 256-BIT GATEWAY
                </span>
              </div>
              <h1 className="font-sport text-3xl sm:text-4xl font-black uppercase italic tracking-tight text-[#0c1017]">
                {currentStep === 1 && '1. REVIEW ATHLETE BAG'}
                {currentStep === 2 && '2. SHIPPING & SMART LOCKER'}
                {currentStep === 3 && '3. PAYMENT PROTOCOL'}
                {currentStep === 4 && '4. ORDER CONFIRMED & RECEIPT'}
              </h1>
            </div>

            {/* Stepper Dots / Bars */}
            <div className="flex items-center gap-2 font-tech">
              {[1, 2, 3, 4].map((step) => (
                <div
                  key={step}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    currentStep === step
                      ? 'bg-[#0c1017] text-white shadow-xs'
                      : currentStep > step
                      ? 'bg-[#16A34A]/10 text-[#16A34A] border border-[#16A34A]/30'
                      : 'bg-[#F8FAFC] border border-[#E2E8F0] text-[#94A3B8]'
                  }`}
                >
                  <span>0{step}</span>
                  {currentStep > step && <Check className="w-3.5 h-3.5 text-[#16A34A]" />}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Empty Cart Notice */}
        {cart.length === 0 && currentStep !== 4 ? (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-white rounded-3xl p-10 sm:p-16 border border-[#E2E8F0] shadow-xl text-center max-w-xl mx-auto space-y-6"
          >
            <div className="w-20 h-20 bg-[#FF671C]/10 text-[#FF671C] rounded-3xl flex items-center justify-center mx-auto shadow-inner">
              <ShoppingBag className="w-10 h-10" />
            </div>
            <div>
              <h2 className="font-sport text-3xl sm:text-4xl font-black italic uppercase text-[#0c1017]">
                YOUR ATHLETE BAG IS EMPTY
              </h2>
              <p className="text-[#64748B] text-xs sm:text-sm mt-2 font-sans max-w-sm mx-auto">
                Explore our official FIBA-accredited hardwood equipment, training apparel, and cellular recovery nutrition matrix.
              </p>
            </div>
            <button
              type="button"
              onClick={onNavigateShop}
              className="font-tech bg-[#FF671C] hover:bg-[#e05615] text-white px-8 py-3.5 rounded-2xl text-xs font-black uppercase tracking-widest transition-all shadow-md cursor-pointer animate-shine inline-flex items-center gap-2"
            >
              <ShoppingBag className="w-4 h-4" />
              <span>EXPLORE PRO SHOP COLLECTION</span>
            </button>
          </motion.div>
        ) : (
          <>
            {/* Multi-Step Body */}
            {currentStep === 4 && confirmedOrder ? (

          /* ========================================================================= */
          /* STEP 4: ORDER CONFIRMED & DIGITAL RECEIPT */
          /* ========================================================================= */
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-[#E2E8F0] shadow-xl text-center max-w-3xl mx-auto"
          >
            <div className="w-20 h-20 bg-[#16A34A]/10 text-[#16A34A] rounded-full flex items-center justify-center mx-auto mb-5 shadow-inner">
              <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
            </div>

            <span className="font-tech text-xs font-black uppercase tracking-widest text-[#16A34A] bg-[#16A34A]/10 px-3 py-1 rounded-md">
              PAYMENT AUTHORIZED & VERIFIED
            </span>

            <h2 className="font-sport text-4xl sm:text-5xl font-black italic uppercase text-[#0c1017] mt-3 mb-2">
              GEAR ORDER TRANSMITTED
            </h2>
            <p className="text-[#64748B] text-sm max-w-md mx-auto mb-8 font-sans">
              Your equipment order has been confirmed. Confirmation copy and real-time pass dispatched to{' '}
              <strong className="text-[#0c1017]">{addressData.email}</strong>.
            </p>

            {/* Receipt Summary Card */}
            <div className="bg-[#F8FAFC] rounded-2xl p-6 border border-[#E2E8F0] text-left mb-8 font-tech space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2 pb-4 border-b border-[#E2E8F0]">
                <div>
                  <span className="text-[10px] text-[#94A3B8] font-bold uppercase">ORDER REFERENCE</span>
                  <p className="text-lg font-black text-[#0c1017]">{confirmedOrder.id}</p>
                </div>
                <div>
                  <span className="text-[10px] text-[#94A3B8] font-bold uppercase">TRACKING CODE</span>
                  <p className="text-sm font-black text-[#FF671C]">{confirmedOrder.trackingNumber}</p>
                </div>
                <div>
                  <span className="text-[10px] text-[#94A3B8] font-bold uppercase">ESTIMATED FULFILLMENT</span>
                  <p className="text-xs font-black text-[#16A34A]">{confirmedOrder.estimatedDelivery}</p>
                </div>
              </div>

              {/* Items List in Receipt */}
              <div className="space-y-3">
                {confirmedOrder.items.map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-3">
                      <img src={item.image} alt={item.name} className="w-10 h-10 object-cover rounded-lg border border-black/5" />
                      <div>
                        <p className="font-bold text-[#0c1017] uppercase">{item.name}</p>
                        <span className="text-[#64748B]">QTY: {item.quantity} • ${item.price.toFixed(2)} EACH</span>
                      </div>
                    </div>
                    <span className="font-bold text-[#0c1017]">${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 border-t border-[#E2E8F0] flex justify-between items-baseline font-sport text-2xl font-black italic">
                <span className="text-[#0c1017]">TOTAL PAID</span>
                <span className="text-[#FF671C]">${confirmedOrder.totalAmount.toFixed(2)}</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 font-tech">
              <button
                type="button"
                onClick={onNavigateDashboard}
                className="w-full sm:w-auto bg-[#0c1017] hover:bg-[#FF671C] text-white px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer"
              >
                <Package className="w-4 h-4" />
                <span>TRACK IN ATHLETE DIGITAL LOCKER</span>
              </button>
              <button
                type="button"
                onClick={onNavigateShop}
                className="w-full sm:w-auto bg-white hover:bg-[#F8FAFC] text-[#0c1017] border border-[#E2E8F0] px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer"
              >
                CONTINUE BROWSING SHOP
              </button>
            </div>
          </motion.div>
        ) : (
          /* ========================================================================= */
          /* STEP 1, 2, 3: CHECKOUT WORKFLOW GRID */
          /* ========================================================================= */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Main Form Container */}
            <div className="lg:col-span-7 space-y-6">
              {/* STEP 1: BAG REVIEW */}
              {currentStep === 1 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs space-y-4"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                    <h3 className="font-sport text-2xl font-black italic uppercase text-[#0c1017]">
                      SELECTED GEAR ({cart.length} ITEMS)
                    </h3>
                    <button
                      type="button"
                      onClick={onNavigateShop}
                      className="font-tech text-xs font-bold text-[#FF671C] hover:underline uppercase"
                    >
                      + ADD MORE ITEMS
                    </button>
                  </div>

                  {cart.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingBag className="w-12 h-12 text-[#CBD5E1] mx-auto mb-3" />
                      <p className="font-sport text-2xl font-black italic uppercase text-[#0c1017]">YOUR BAG IS EMPTY</p>
                      <button
                        onClick={onNavigateShop}
                        className="mt-4 font-tech bg-[#FF671C] text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase"
                      >
                        EXPLORE PRO SHOP
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-3 divide-y divide-[#F1F5F9]">
                      {cart.map((item, idx) => (
                        <div key={idx} className="pt-3 flex items-center justify-between gap-4">
                          <div className="flex items-center gap-3">
                            <img
                              src={item.image}
                              alt={item.name}
                              className="w-16 h-16 object-cover rounded-xl border border-black/5 bg-[#F8FAFC]"
                            />
                            <div>
                              <p className="font-tech text-xs font-black uppercase text-[#0c1017]">{item.name}</p>
                              <span className="text-[11px] text-[#64748B] font-tech block">{item.category} • {item.sport}</span>
                              <span className="font-sport text-lg font-black italic text-[#FF671C]">${item.price.toFixed(2)}</span>
                            </div>
                          </div>

                          <span className="font-tech text-xs font-bold text-[#0c1017] bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-1.5 rounded-lg">
                            QTY: {item.quantity}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}

                  {cart.length > 0 && (
                    <div className="pt-4 border-t border-[#E2E8F0] flex justify-end">
                      <button
                        type="button"
                        onClick={() => setCurrentStep(2)}
                        className="font-tech bg-[#FF671C] hover:bg-[#e05615] text-white px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-md transition-all cursor-pointer w-full sm:w-auto justify-center"
                      >
                        <span>PROCEED TO SHIPPING DETAILS</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}
                </motion.div>
              )}

              {/* STEP 2: SHIPPING / CAMPUS LOCKER */}
              {currentStep === 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs space-y-6"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                    <h3 className="font-sport text-2xl font-black italic uppercase text-[#0c1017]">
                      DELIVERY PROTOCOL
                    </h3>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(1)}
                      className="font-tech text-xs font-bold text-[#64748B] hover:text-[#0c1017] uppercase flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> BACK TO BAG
                    </button>
                  </div>

                  {/* Delivery Option Selector */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-tech">
                    <button
                      type="button"
                      onClick={() => setShippingMethod('Home Express Delivery')}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        shippingMethod === 'Home Express Delivery'
                          ? 'bg-[#0c1017] text-white border-[#0c1017] shadow-md'
                          : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0c1017] hover:bg-white'
                      }`}
                    >
                      <Truck className={`w-5 h-5 mb-2 ${shippingMethod === 'Home Express Delivery' ? 'text-[#FF671C]' : 'text-[#64748B]'}`} />
                      <p className="text-xs font-black uppercase">HOME EXPRESS COURIER</p>
                      <p className={`text-[11px] mt-1 ${shippingMethod === 'Home Express Delivery' ? 'text-white/70' : 'text-[#64748B]'}`}>
                        2-3 business days doorstep express delivery.
                      </p>
                    </button>

                    <button
                      type="button"
                      onClick={() => setShippingMethod('Campus Smart Locker Pickup')}
                      className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${
                        shippingMethod === 'Campus Smart Locker Pickup'
                          ? 'bg-[#0c1017] text-white border-[#0c1017] shadow-md'
                          : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0c1017] hover:bg-white'
                      }`}
                    >
                      <Building2 className={`w-5 h-5 mb-2 ${shippingMethod === 'Campus Smart Locker Pickup' ? 'text-[#00a0e7]' : 'text-[#64748B]'}`} />
                      <p className="text-xs font-black uppercase">CAMPUS SMART LOCKER</p>
                      <p className={`text-[11px] mt-1 ${shippingMethod === 'Campus Smart Locker Pickup' ? 'text-white/70' : 'text-[#64748B]'}`}>
                        Instant PIN access at San Diego / Paris campus.
                      </p>
                    </button>
                  </div>

                  {/* Form fields */}
                  <form
                    onSubmit={(e) => {
                      e.preventDefault();
                      setCurrentStep(3);
                    }}
                    className="space-y-4 font-sans text-xs"
                  >
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block font-tech text-xs font-bold text-[#0c1017] uppercase mb-1">Athlete Name</label>
                        <input
                          type="text"
                          required
                          value={addressData.fullName}
                          onChange={(e) => setAddressData({ ...addressData, fullName: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#FF671C] text-sm"
                        />
                      </div>
                      <div>
                        <label className="block font-tech text-xs font-bold text-[#0c1017] uppercase mb-1">Contact Phone</label>
                        <input
                          type="tel"
                          required
                          value={addressData.phone}
                          onChange={(e) => setAddressData({ ...addressData, phone: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#FF671C] text-sm"
                        />
                      </div>
                    </div>

                    {shippingMethod === 'Home Express Delivery' ? (
                      <>
                        <div>
                          <label className="block font-tech text-xs font-bold text-[#0c1017] uppercase mb-1">Street Address</label>
                          <input
                            type="text"
                            required
                            value={addressData.streetAddress}
                            onChange={(e) => setAddressData({ ...addressData, streetAddress: e.target.value })}
                            className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#FF671C] text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-3">
                          <div>
                            <label className="block font-tech text-xs font-bold text-[#0c1017] uppercase mb-1">City</label>
                            <input
                              type="text"
                              required
                              value={addressData.city}
                              onChange={(e) => setAddressData({ ...addressData, city: e.target.value })}
                              className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#FF671C] text-sm"
                            />
                          </div>
                          <div>
                            <label className="block font-tech text-xs font-bold text-[#0c1017] uppercase mb-1">State / Province</label>
                            <input
                              type="text"
                              required
                              value={addressData.state}
                              onChange={(e) => setAddressData({ ...addressData, state: e.target.value })}
                              className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#FF671C] text-sm"
                            />
                          </div>
                          <div>
                            <label className="block font-tech text-xs font-bold text-[#0c1017] uppercase mb-1">ZIP Code</label>
                            <input
                              type="text"
                              required
                              value={addressData.zipCode}
                              onChange={(e) => setAddressData({ ...addressData, zipCode: e.target.value })}
                              className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#FF671C] text-sm"
                            />
                          </div>
                        </div>
                      </>
                    ) : (
                      <div>
                        <label className="block font-tech text-xs font-bold text-[#0c1017] uppercase mb-1">Choose Campus Smart Locker</label>
                        <select
                          value={addressData.lockerLocation}
                          onChange={(e) => setAddressData({ ...addressData, lockerLocation: e.target.value })}
                          className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#FF671C] text-sm font-tech font-bold"
                        >
                          <option>San Diego Campus HQ - Bay Locker #14 (Hardwood Arena)</option>
                          <option>San Diego Campus HQ - Hydro Pool Locker #08</option>
                          <option>Paris France Campus - Clay Stadium Locker #03</option>
                        </select>
                      </div>
                    )}

                    <div className="pt-4 border-t border-[#E2E8F0] flex justify-end">
                      <button
                        type="submit"
                        className="font-tech bg-[#FF671C] hover:bg-[#e05615] text-white px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-md transition-all cursor-pointer w-full sm:w-auto justify-center"
                      >
                        <span>PROCEED TO PAYMENT</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}

              {/* STEP 3: PAYMENT METHOD */}
              {currentStep === 3 && (
                <motion.div
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs space-y-6"
                >
                  <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                    <h3 className="font-sport text-2xl font-black italic uppercase text-[#0c1017]">
                      PAYMENT SELECTION
                    </h3>
                    <button
                      type="button"
                      onClick={() => setCurrentStep(2)}
                      className="font-tech text-xs font-bold text-[#64748B] hover:text-[#0c1017] uppercase flex items-center gap-1"
                    >
                      <ArrowLeft className="w-3.5 h-3.5" /> BACK TO SHIPPING
                    </button>
                  </div>

                  {/* Payment Options Tabs */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 font-tech">
                    {(
                      [
                        { id: 'Credit Card', label: 'CREDIT CARD' },
                        { id: 'Instant QRIS', label: 'QRIS SCAN' },
                        { id: 'Bank Virtual Account', label: 'VIRTUAL ACC' },
                        { id: 'Apple Pay', label: 'APPLE PAY' },
                      ] as const
                    ).map((m) => (
                      <button
                        key={m.id}
                        type="button"
                        onClick={() => setPaymentMethod(m.id)}
                        className={`p-3 rounded-xl border text-xs font-black uppercase transition-all cursor-pointer ${
                          paymentMethod === m.id
                            ? 'bg-[#0c1017] text-white border-[#0c1017] shadow-xs'
                            : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#64748B] hover:text-[#0c1017]'
                        }`}
                      >
                        {m.label}
                      </button>
                    ))}
                  </div>

                  {/* Payment Details Body */}
                  {paymentMethod === 'Credit Card' && (
                    <div className="space-y-6">
                      {/* Holographic 3D Flip Card Preview */}
                      <div className="w-full max-w-sm mx-auto h-48 rounded-2xl bg-gradient-to-tr from-[#0c1017] via-[#1e293b] to-[#0c1017] p-5 text-white shadow-xl border border-white/20 relative flex flex-col justify-between overflow-hidden">
                        <div className="flex justify-between items-center">
                          <span className="font-sport text-xl font-black italic text-[#FF671C]">/ GRANGER PRO PASS</span>
                          <CreditCard className="w-6 h-6 text-white/80" />
                        </div>
                        <div>
                          <p className="font-tech text-lg tracking-widest font-mono">{cardData.cardNumber}</p>
                          <div className="flex justify-between items-end mt-3 text-[10px] font-tech text-white/70">
                            <div>
                              <span>CARD HOLDER</span>
                              <p className="font-bold text-white uppercase text-xs">{cardData.cardHolder}</p>
                            </div>
                            <div>
                              <span>EXPIRES</span>
                              <p className="font-bold text-white text-xs">{cardData.expiry}</p>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Inputs */}
                      <form onSubmit={handleProceedPayment} className="space-y-3 font-sans text-xs">
                        <div>
                          <label className="block font-tech text-xs font-bold text-[#0c1017] uppercase mb-1">Card Number</label>
                          <input
                            type="text"
                            required
                            value={cardData.cardNumber}
                            onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                            className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#FF671C] font-mono text-sm"
                          />
                        </div>
                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <label className="block font-tech text-xs font-bold text-[#0c1017] uppercase mb-1">Expiry Date</label>
                            <input
                              type="text"
                              required
                              value={cardData.expiry}
                              onChange={(e) => setCardData({ ...cardData, expiry: e.target.value })}
                              placeholder="MM/YY"
                              className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#FF671C] text-sm"
                            />
                          </div>
                          <div>
                            <label className="block font-tech text-xs font-bold text-[#0c1017] uppercase mb-1">Security CVV</label>
                            <input
                              type="password"
                              maxLength={4}
                              required
                              value={cardData.cvv}
                              onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                              placeholder="•••"
                              className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#FF671C] text-sm"
                            />
                          </div>
                        </div>

                        <button
                          disabled={isProcessingPayment}
                          type="submit"
                          className="font-tech w-full bg-[#FF671C] hover:bg-[#e05615] text-white py-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-md transition-all cursor-pointer mt-4"
                        >
                          {isProcessingPayment ? (
                            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          ) : (
                            <>
                              <Lock className="w-4 h-4" />
                              <span>AUTHORIZE & PAY (${totalAmount.toFixed(2)})</span>
                            </>
                          )}
                        </button>
                      </form>
                    </div>
                  )}

                  {/* QRIS Mode */}
                  {paymentMethod === 'Instant QRIS' && (
                    <div className="p-6 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] text-center space-y-4 font-tech">
                      <div className="w-48 h-48 bg-white p-3 rounded-2xl border border-[#E2E8F0] mx-auto flex items-center justify-center shadow-md">
                        <QrCode className="w-full h-full text-[#0c1017]" />
                      </div>
                      <p className="text-xs font-bold text-[#0c1017] uppercase">
                        SCAN VIA BCA, MANDIRI, GOPAY, OVO, SHOPEEPAY, OR DANA
                      </p>
                      <p className="text-[11px] text-[#64748B]">QRIS ID: 00020101021126580014ID.CO.GRANGER.WWW</p>

                      <button
                        onClick={handleProceedPayment}
                        className="font-tech bg-[#16A34A] hover:bg-[#15803D] text-white px-8 py-3 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer"
                      >
                        SIMULATE QR SCAN COMPLETE
                      </button>
                    </div>
                  )}

                  {/* Virtual Account Mode */}
                  {paymentMethod === 'Bank Virtual Account' && (
                    <div className="p-6 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] space-y-4 font-tech">
                      <div className="flex items-center justify-between p-4 bg-white rounded-xl border border-[#E2E8F0]">
                        <div>
                          <span className="text-[10px] text-[#64748B] font-bold uppercase">MANDIRI / BCA VIRTUAL ACCOUNT</span>
                          <p className="font-sport text-xl font-black italic text-[#0c1017]">8809 1928 4729 001</p>
                        </div>
                        <button
                          type="button"
                          onClick={() => {
                            setCopiedVA(true);
                            setTimeout(() => setCopiedVA(false), 2000);
                          }}
                          className="px-3 py-1.5 rounded-lg border border-[#E2E8F0] text-xs font-bold flex items-center gap-1.5 hover:bg-[#F8FAFC] cursor-pointer"
                        >
                          {copiedVA ? <Check className="w-3.5 h-3.5 text-[#16A34A]" /> : <Copy className="w-3.5 h-3.5" />}
                          <span>{copiedVA ? 'COPIED' : 'COPY'}</span>
                        </button>
                      </div>

                      <button
                        onClick={handleProceedPayment}
                        className="font-tech w-full bg-[#0c1017] hover:bg-[#FF671C] text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer transition-colors"
                      >
                        CONFIRM VIRTUAL ACCOUNT TRANSFER
                      </button>
                    </div>
                  )}

                  {/* Apple Pay Mode */}
                  {paymentMethod === 'Apple Pay' && (
                    <div className="p-8 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] text-center space-y-4 font-tech">
                      <p className="text-xs font-bold text-[#0c1017] uppercase">INSTANT 1-TOUCH APPLE PAY AUTHORIZATION</p>
                      <button
                        onClick={handleProceedPayment}
                        className="w-full max-w-sm mx-auto bg-black text-white py-4 rounded-xl font-black text-sm flex items-center justify-center gap-2 hover:bg-neutral-800 transition-all cursor-pointer"
                      >
                        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                          <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.98.6-2.62 1.35-.57.65-.07 1.73-.95 2.76.99.08 2.02-.51 2.64-1.26z" />
                        </svg>
                        <span>PAY WITH APPLE PAY</span>
                      </button>
                    </div>
                  )}
                </motion.div>
              )}
            </div>

            {/* Right Sticky Order Summary Card */}
            <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs space-y-6 sticky top-28">
              <h3 className="font-sport text-2xl font-black italic uppercase text-[#0c1017] pb-3 border-b border-[#E2E8F0]">
                ORDER BILLING SUMMARY
              </h3>

              {/* Promo Code Input */}
              <form onSubmit={handleApplyPromo} className="flex gap-2 font-tech">
                <input
                  type="text"
                  placeholder="PROMO CODE (TRY: GRANGER2026)"
                  value={promoCode}
                  onChange={(e) => setPromoCode(e.target.value)}
                  className="flex-grow bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl px-3 py-2 text-xs font-bold uppercase text-[#0c1017] focus:outline-none focus:border-[#FF671C]"
                />
                <button
                  type="submit"
                  className="bg-[#0c1017] hover:bg-[#FF671C] text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
                >
                  APPLY
                </button>
              </form>
              {promoSuccess && <p className="font-tech text-xs font-bold text-[#16A34A]">{promoSuccess}</p>}
              {promoError && <p className="font-tech text-xs font-bold text-red-500">{promoError}</p>}

              {/* Cost Rows */}
              <div className="space-y-2.5 font-tech text-xs text-[#64748B] pt-2 border-t border-[#E2E8F0]">
                <div className="flex justify-between">
                  <span>ITEM SUBTOTAL</span>
                  <span className="font-bold text-[#0c1017]">${subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-[#16A34A] font-bold">
                    <span>PROMO CODE (15% OFF)</span>
                    <span>-${discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span>DELIVERY FEE</span>
                  <span className="font-bold text-[#0c1017]">
                    {shippingFee === 0 ? 'FREE' : `$${shippingFee.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>ESTIMATED TAX (7.5%)</span>
                  <span className="font-bold text-[#0c1017]">${taxAmount.toFixed(2)}</span>
                </div>

                <div className="pt-4 border-t border-[#E2E8F0] flex justify-between items-baseline font-sport text-3xl font-black italic text-[#0c1017]">
                  <span>FINAL TOTAL</span>
                  <span className="text-[#FF671C]">${totalAmount.toFixed(2)}</span>
                </div>
              </div>

              <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0] flex items-center gap-2.5 text-xs text-[#64748B] font-tech font-bold uppercase">
                <ShieldCheck className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                <span>30-DAY MONEY-BACK & SIZE EXCHANGE GUARANTEE</span>
              </div>
            </div>
          </div>
        )}
          </>
        )}
      </div>
    </div>
  );
}
