import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity,
  Calendar,
  Package,
  QrCode,
  ShieldCheck,
  Flame,
  Award,
  Zap,
  TrendingUp,
  Clock,
  MapPin,
  RefreshCw,
  LogOut,
  ChevronRight,
  Sparkles,
  HeartPulse,
  ShoppingBag,
  Sliders,
  CheckCircle2,
  ExternalLink,
  Lock,
} from 'lucide-react';
import { UserProfile, OrderRecord, BookingRecord } from '../types';
import { TournamentBracket } from './TournamentBracket';

interface DashboardPageProps {
  currentUser: UserProfile;
  orders: OrderRecord[];
  bookings: BookingRecord[];
  onLogout: () => void;
  onNavigateShop: () => void;
  onNavigateEvents: () => void;
  onBookNewSession: () => void;
}

export function DashboardPage({
  currentUser,
  orders,
  bookings,
  onLogout,
  onNavigateShop,
  onNavigateEvents,
  onBookNewSession,
}: DashboardPageProps) {
  const [activeTab, setActiveTab] = useState<
    'overview' | 'bookings' | 'orders' | 'telemetry' | 'settings'
  >('overview');

  const [qrCountdown, setQrCountdown] = useState(45);
  const [qrPassToken, setQrPassToken] = useState(currentUser.qrToken);
  const [selectedBookingPass, setSelectedBookingPass] = useState<BookingRecord | null>(null);

  // Rotating QR code token effect (mimicking secure time-based rotating QR)
  useEffect(() => {
    const timer = setInterval(() => {
      setQrCountdown((prev) => {
        if (prev <= 1) {
          setQrPassToken('GR-' + Math.random().toString(36).substring(2, 9).toUpperCase());
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="w-full min-h-screen bg-[#F0F2F5] pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full space-y-8">
        {/* ========================================================================= */}
        {/* 1. ATHLETE DIGITAL PASSPORT & TOP PROFILE MASTHEAD */}
        {/* ========================================================================= */}
        <div className="bg-gradient-to-r from-[#0c1017] via-[#161f2e] to-[#0c1017] rounded-3xl p-6 sm:p-10 text-white shadow-xl border border-white/10 relative overflow-hidden">
          {/* Ambient Glows */}
          <div className="absolute -top-10 right-1/4 w-80 h-80 bg-[#FF671C]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 right-10 w-80 h-80 bg-[#00a0e7]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            {/* Athlete Info */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5">
              <div className="relative">
                <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-3xl bg-white/10 p-1 border border-white/20 overflow-hidden shadow-xl">
                  <img
                    src={currentUser.avatar}
                    alt={currentUser.name}
                    className="w-full h-full object-cover rounded-2xl"
                  />
                </div>
                <span className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#16A34A] border-2 border-[#0c1017] rounded-full" />
              </div>

              <div>
                <div className="flex flex-wrap items-center gap-2 mb-1.5 font-tech">
                  <span className="bg-[#FF671C] text-white px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase tracking-wider">
                    {currentUser.membershipTier}
                  </span>
                  <span className="bg-white/10 border border-white/10 text-white px-2.5 py-0.5 rounded-md text-[10px] font-bold uppercase tracking-wider">
                    {currentUser.role.toUpperCase()}
                  </span>
                  <span className="text-xs text-white/50">•</span>
                  <span className="text-xs text-[#00a0e7] font-bold uppercase">
                    MEMBER SINCE {currentUser.joinedDate}
                  </span>
                </div>

                <h1 className="font-sport text-3xl sm:text-4xl md:text-5xl font-black italic uppercase tracking-tight text-white leading-tight">
                  {currentUser.name}
                </h1>

                <p className="text-xs sm:text-sm text-white/70 font-sans mt-0.5">
                  Primary Discipline: <strong className="text-white font-tech uppercase">{currentUser.primarySport}</strong> • ID: <span className="font-mono text-[#94A3B8]">{currentUser.id}</span>
                </p>
              </div>
            </div>

            {/* Rotating QR Gate Pass */}
            <div className="bg-white/10 backdrop-blur-md p-4 sm:p-5 rounded-2xl border border-white/15 flex items-center justify-between sm:justify-start gap-4 flex-shrink-0">
              <div className="w-16 h-16 bg-white p-1.5 rounded-xl flex items-center justify-center shadow-md">
                <QrCode className="w-full h-full text-[#0c1017]" />
              </div>

              <div className="font-tech">
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                  <span className="text-[10px] font-bold text-white/70 uppercase">LIVE GATE PASS</span>
                </div>
                <p className="font-mono text-sm font-black text-[#FF671C] uppercase tracking-wider mt-0.5">
                  {qrPassToken}
                </p>
                <div className="flex items-center gap-1 text-[10px] text-white/60 mt-1">
                  <RefreshCw className="w-3 h-3 animate-spin text-white/40" />
                  <span>Refreshes in {qrCountdown}s</span>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Metrics Bar in Banner */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/10 font-tech">
            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-[10px] text-white/60 uppercase">CAMPUS POINTS</span>
              <p className="font-sport text-2xl font-black italic text-[#FF671C]">{currentUser.campusPoints} PTS</p>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-[10px] text-white/60 uppercase">RECOVERY READINESS</span>
              <p className="font-sport text-2xl font-black italic text-emerald-400">{currentUser.readinessScore}% (PRIME)</p>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-[10px] text-white/60 uppercase">CONFIRMED SESSIONS</span>
              <p className="font-sport text-2xl font-black italic text-white">{bookings.length} SESSIONS</p>
            </div>
            <div className="bg-white/5 p-3 rounded-xl border border-white/5">
              <span className="text-[10px] text-white/60 uppercase">EQUIPMENT ORDERS</span>
              <p className="font-sport text-2xl font-black italic text-[#00a0e7]">{orders.length} ORDERS</p>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* 2. TAB CONTROLS */}
        {/* ========================================================================= */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 touch-scroll no-scrollbar font-tech">
          {[
            { id: 'overview', label: 'OVERVIEW & BIOMETRICS', icon: Activity },
            { id: 'bookings', label: `COURT PASSES (${bookings.length})`, icon: Calendar },
            { id: 'orders', label: `PRO SHOP ORDERS (${orders.length})`, icon: Package },
            { id: 'telemetry', label: 'KINEMATIC TELEMETRY', icon: TrendingUp },
            { id: 'settings', label: 'LOCKER SETTINGS', icon: Sliders },
          ].map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-4 py-2.5 rounded-2xl text-xs font-black uppercase tracking-wider flex items-center gap-2 whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'bg-[#0c1017] text-white shadow-md'
                    : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0c1017]'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-[#FF671C]' : 'text-[#64748B]'}`} />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </div>

        {/* ========================================================================= */}
        {/* 3. TAB 1: OVERVIEW & BIOMETRICS */}
        {/* ========================================================================= */}
        {activeTab === 'overview' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            {/* Bento Performance Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Card 1: AI Recovery Score */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-tech text-xs font-black uppercase tracking-widest text-[#16A34A] bg-[#16A34A]/10 px-2.5 py-0.5 rounded-md">
                      AI RECOVERY ENGINE
                    </span>
                    <HeartPulse className="w-5 h-5 text-[#16A34A]" />
                  </div>
                  <h3 className="font-sport text-2xl font-black italic uppercase text-[#0c1017]">
                    NEUROMUSCULAR READINESS
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1 font-sans">
                    Based on HRV, sleep telemetry, and court training load over 48h.
                  </p>
                </div>

                <div className="my-6">
                  <div className="flex items-baseline justify-between font-sport text-4xl font-black italic mb-2">
                    <span className="text-[#0c1017]">{currentUser.readinessScore}%</span>
                    <span className="text-xs font-tech text-[#16A34A]">OPTIMAL CADENCE</span>
                  </div>
                  <div className="w-full bg-[#E2E8F0] h-3 rounded-full overflow-hidden">
                    <div
                      className="bg-gradient-to-r from-[#16A34A] to-emerald-400 h-full rounded-full"
                      style={{ width: `${currentUser.readinessScore}%` }}
                    />
                  </div>
                </div>

                <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0] text-xs font-tech text-[#475569]">
                  <strong className="text-[#0c1017]">AI PRESCRIPTION:</strong> Cleared for high-cadence Hardwood plyometrics or 90min clay tennis match.
                </div>
              </div>

              {/* Card 2: Next Upcoming Session */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-tech text-xs font-black uppercase tracking-widest text-[#FF671C] bg-[#FF671C]/10 px-2.5 py-0.5 rounded-md">
                      UPCOMING RESERVATION
                    </span>
                    <Calendar className="w-5 h-5 text-[#FF671C]" />
                  </div>
                  <h3 className="font-sport text-2xl font-black italic uppercase text-[#0c1017]">
                    ROLAND CLAY TENNIS STADIUM
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1 font-sans">
                    Court #02 • San Diego Campus HQ
                  </p>
                </div>

                <div className="my-5 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] font-tech space-y-1.5">
                  <div className="flex items-center gap-2 text-xs text-[#0c1017] font-bold">
                    <Clock className="w-4 h-4 text-[#FF671C]" />
                    <span>TODAY • 04:30 PM - 06:00 PM EST</span>
                  </div>
                  <div className="flex items-center gap-2 text-xs text-[#64748B]">
                    <MapPin className="w-4 h-4 text-[#00a0e7]" />
                    <span>Gate 4B Smart Turnstile Access</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setActiveTab('bookings')}
                  className="font-tech w-full bg-[#0c1017] hover:bg-[#FF671C] text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer"
                >
                  VIEW SESSION ENTRY PASS
                </button>
              </div>

              {/* Card 3: Quick Pro Shop & Booking Actions */}
              <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E8F0] shadow-xs flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-tech text-xs font-black uppercase tracking-widest text-[#00a0e7] bg-[#00a0e7]/10 px-2.5 py-0.5 rounded-md">
                      QUICK ACTIONS
                    </span>
                    <Sparkles className="w-5 h-5 text-[#00a0e7]" />
                  </div>
                  <h3 className="font-sport text-2xl font-black italic uppercase text-[#0c1017]">
                    CAMPUS CONCIERGE
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1 font-sans">
                    Instant reservations and gear orders.
                  </p>
                </div>

                <div className="space-y-2.5 my-4 font-tech">
                  <button
                    type="button"
                    onClick={onBookNewSession}
                    className="w-full bg-[#F8FAFC] hover:bg-[#FF671C] hover:text-white text-[#0c1017] p-3 rounded-xl border border-[#E2E8F0] text-xs font-black uppercase flex items-center justify-between transition-all cursor-pointer"
                  >
                    <span>+ BOOK ARENA / TRAINER SESSION</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={onNavigateShop}
                    className="w-full bg-[#F8FAFC] hover:bg-[#00a0e7] hover:text-white text-[#0c1017] p-3 rounded-xl border border-[#E2E8F0] text-xs font-black uppercase flex items-center justify-between transition-all cursor-pointer"
                  >
                    <span>EXPLORE PRO SHOP REQUISITION</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                  <button
                    type="button"
                    onClick={onNavigateEvents}
                    className="w-full bg-[#F8FAFC] hover:bg-[#0c1017] hover:text-white text-[#0c1017] p-3 rounded-xl border border-[#E2E8F0] text-xs font-black uppercase flex items-center justify-between transition-all cursor-pointer"
                  >
                    <span>REGISTER FOR CIRCUIT TOURNAMENT</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>

                <div className="text-[11px] text-[#94A3B8] font-tech text-center">
                  24/7 ATHLETE ASSISTANCE DESK ACTIVE
                </div>
              </div>
            </div>

            {/* Live Campus Championship Bracket Widget */}
            <div className="pt-4">
              <TournamentBracket />
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* 4. TAB 2: COURT & COACH BOOKINGS */}
        {/* ========================================================================= */}
        {activeTab === 'bookings' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0] mb-6">
                <div>
                  <h3 className="font-sport text-3xl font-black italic uppercase text-[#0c1017]">
                    ACTIVE COURT & COACH PASSES ({bookings.length})
                  </h3>
                  <p className="text-xs text-[#64748B] font-sans">
                    Present your digital pass QR code at the arena gate turnstile.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onBookNewSession}
                  className="font-tech bg-[#FF671C] hover:bg-[#e05615] text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 shadow-sm cursor-pointer"
                >
                  <span>+ BOOK ANOTHER SESSION</span>
                </button>
              </div>

              {bookings.length === 0 ? (
                <div className="text-center py-16">
                  <Calendar className="w-12 h-12 text-[#CBD5E1] mx-auto mb-3" />
                  <p className="font-sport text-2xl font-black italic uppercase text-[#0c1017]">NO SESSIONS SCHEDULED</p>
                  <p className="text-xs text-[#64748B] mt-1 font-sans">Reserve your hardwood court, clay court, or coach pass!</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {bookings.map((b) => (
                    <div
                      key={b.id}
                      className="bg-[#F8FAFC] rounded-2xl p-5 border border-[#E2E8F0] hover:border-[#FF671C]/40 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between mb-2 font-tech">
                          <span className="bg-[#FF671C]/10 text-[#FF671C] px-2.5 py-0.5 rounded text-[10px] font-black uppercase">
                            {b.category}
                          </span>
                          <span className="text-xs font-bold text-[#16A34A] bg-[#16A34A]/10 px-2 py-0.5 rounded">
                            {b.status.toUpperCase()}
                          </span>
                        </div>

                        <h4 className="font-sport text-2xl font-black italic uppercase text-[#0c1017]">
                          {b.facilityName}
                        </h4>
                        {b.coachName && (
                          <p className="text-xs font-tech font-bold text-[#64748B] uppercase">
                            INSTRUCTOR: {b.coachName}
                          </p>
                        )}

                        <div className="grid grid-cols-2 gap-2 my-4 text-xs font-tech">
                          <div className="bg-white p-2.5 rounded-xl border border-[#E2E8F0]">
                            <span className="text-[10px] text-[#94A3B8] uppercase block">DATE</span>
                            <strong className="text-[#0c1017]">{b.date}</strong>
                          </div>
                          <div className="bg-white p-2.5 rounded-xl border border-[#E2E8F0]">
                            <span className="text-[10px] text-[#94A3B8] uppercase block">TIME SLOT</span>
                            <strong className="text-[#0c1017]">{b.timeSlot}</strong>
                          </div>
                        </div>
                      </div>

                      <div className="pt-3 border-t border-[#E2E8F0] flex items-center justify-between font-tech">
                        <span className="font-sport text-xl font-black italic text-[#FF671C]">{b.price}</span>
                        <button
                          type="button"
                          onClick={() => setSelectedBookingPass(b)}
                          className="bg-[#0c1017] hover:bg-[#FF671C] text-white px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer transition-colors"
                        >
                          SHOW GATE QR PASS
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* 5. TAB 3: ORDER HISTORY & SMART LOCKER */}
        {/* ========================================================================= */}
        {activeTab === 'orders' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0] mb-6">
                <div>
                  <h3 className="font-sport text-3xl font-black italic uppercase text-[#0c1017]">
                    EQUIPMENT & APPAREL ORDERS ({orders.length})
                  </h3>
                  <p className="text-xs text-[#64748B] font-sans">
                    Track your orders, campus locker pickups, and digital invoices.
                  </p>
                </div>

                <button
                  type="button"
                  onClick={onNavigateShop}
                  className="font-tech bg-[#0c1017] hover:bg-[#FF671C] text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer"
                >
                  SHOP NEW COLLECTION
                </button>
              </div>

              {orders.length === 0 ? (
                <div className="text-center py-16">
                  <Package className="w-12 h-12 text-[#CBD5E1] mx-auto mb-3" />
                  <p className="font-sport text-2xl font-black italic uppercase text-[#0c1017]">NO ACTIVE ORDERS</p>
                  <p className="text-xs text-[#64748B] mt-1 font-sans">Order pro equipment from the Granger Pro Shop!</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {orders.map((o) => (
                    <div
                      key={o.id}
                      className="bg-[#F8FAFC] rounded-2xl p-6 border border-[#E2E8F0] space-y-4 font-tech"
                    >
                      <div className="flex flex-wrap items-center justify-between gap-2 pb-3 border-b border-[#E2E8F0]">
                        <div>
                          <span className="text-[10px] text-[#94A3B8] font-bold uppercase">ORDER NUMBER</span>
                          <p className="text-base font-black text-[#0c1017]">{o.id}</p>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#94A3B8] font-bold uppercase">ORDER DATE</span>
                          <p className="text-xs font-bold text-[#64748B]">{o.date}</p>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#94A3B8] font-bold uppercase">DELIVERY DESTINATION</span>
                          <p className="text-xs font-bold text-[#0c1017] line-clamp-1">{o.shippingAddress}</p>
                        </div>
                        <div>
                          <span className="text-[10px] text-[#94A3B8] font-bold uppercase">STATUS</span>
                          <span className="bg-[#16A34A]/10 text-[#16A34A] px-2.5 py-0.5 rounded text-[10px] font-black uppercase block mt-0.5">
                            {o.status}
                          </span>
                        </div>
                      </div>

                      <div className="space-y-3">
                        {o.items.map((item, idx) => (
                          <div key={idx} className="flex items-center justify-between text-xs font-sans">
                            <div className="flex items-center gap-3">
                              <img
                                src={item.image}
                                alt={item.name}
                                className="w-12 h-12 rounded-xl object-cover border border-[#E2E8F0]"
                              />
                              <div>
                                <p className="font-bold text-[#0c1017]">{item.name}</p>
                                <span className="text-[#64748B] font-tech text-[11px]">
                                  {item.category} • Qty: {item.quantity} {item.size && `• Size: ${item.size}`}
                                </span>
                              </div>
                            </div>
                            <span className="font-sport text-lg font-black italic text-[#0c1017]">
                              ${item.price * item.quantity}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="pt-3 border-t border-[#E2E8F0] flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 text-xs font-tech">
                        <div className="text-[#64748B]">
                          <span>TRACKING: </span>
                          <span className="font-bold text-[#0c1017]">{o.trackingNumber}</span>
                          <span className="mx-2">•</span>
                          <span>PAYMENT: {o.paymentMethod}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          <span className="font-bold text-[#0c1017]">TOTAL:</span>
                          <span className="font-sport text-2xl font-black italic text-[#FF671C]">
                            ${o.totalAmount.toFixed(2)}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* 6. TAB 4: TELEMETRY SENSOR FEED */}
        {/* ========================================================================= */}
        {activeTab === 'telemetry' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
          >
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs space-y-6">
              <div className="flex items-center justify-between pb-6 border-b border-[#E2E8F0]">
                <div>
                  <h3 className="font-sport text-3xl font-black italic uppercase text-[#0c1017]">
                    KINEMATIC FORCE PLATE & OPTICAL SENSOR TELEMETRY
                  </h3>
                  <p className="text-xs text-[#64748B] font-sans">
                    Real-time calibrated biomechanics data from San Diego Arena Sensor Array #04.
                  </p>
                </div>
                <span className="font-tech text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-md border border-emerald-200">
                  SENSORS ONLINE
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-tech">
                <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-[#E2E8F0]">
                  <span className="text-[10px] text-[#94A3B8] uppercase block">MAX VERTICAL TAKEOFF</span>
                  <p className="font-sport text-4xl font-black italic text-[#FF671C] my-1">34.2 IN</p>
                  <span className="text-xs text-[#16A34A] font-bold">+1.8 in vs last month baseline</span>
                </div>

                <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-[#E2E8F0]">
                  <span className="text-[10px] text-[#94A3B8] uppercase block">DECELERATION LOAD</span>
                  <p className="font-sport text-4xl font-black italic text-[#00a0e7] my-1">4.2 G</p>
                  <span className="text-xs text-[#16A34A] font-bold">50/50 bilateral symmetry (Balanced)</span>
                </div>

                <div className="bg-[#F8FAFC] p-5 rounded-2xl border border-[#E2E8F0]">
                  <span className="text-[10px] text-[#94A3B8] uppercase block">AEROBIC THRESHOLD</span>
                  <p className="font-sport text-4xl font-black italic text-[#0c1017] my-1">178 BPM</p>
                  <span className="text-xs text-[#16A34A] font-bold">Zone 4 stamina index optimal</span>
                </div>
              </div>
            </div>
          </motion.div>
        )}

        {/* ========================================================================= */}
        {/* 7. TAB 5: SETTINGS & ATHLETE PREFERENCES */}
        {/* ========================================================================= */}
        {activeTab === 'settings' && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-6"
          >
            {/* Left: Profile & Credentials Form */}
            <div className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs space-y-5">
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                <h3 className="font-sport text-3xl font-black italic uppercase text-[#0c1017]">
                  PASSPORT PROFILE & CREDENTIALS
                </h3>
                <span className="font-tech text-[10px] font-bold bg-[#FF671C]/10 text-[#FF671C] px-2.5 py-1 rounded-md">
                  ENCRYPTED 256-BIT
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 font-sans text-xs">
                <div>
                  <label className="block font-tech text-xs font-bold text-[#0c1017] uppercase mb-1">Athlete Full Name</label>
                  <input
                    type="text"
                    defaultValue={currentUser.name}
                    className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#0c1017] focus:outline-none focus:border-[#FF671C]"
                  />
                </div>
                <div>
                  <label className="block font-tech text-xs font-bold text-[#0c1017] uppercase mb-1">Email Address</label>
                  <input
                    type="email"
                    defaultValue={currentUser.email}
                    className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#0c1017] focus:outline-none focus:border-[#FF671C]"
                  />
                </div>
                <div>
                  <label className="block font-tech text-xs font-bold text-[#0c1017] uppercase mb-1">Registered Phone</label>
                  <input
                    type="text"
                    defaultValue={currentUser.phone}
                    className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#0c1017] focus:outline-none focus:border-[#FF671C]"
                  />
                </div>
                <div>
                  <label className="block font-tech text-xs font-bold text-[#0c1017] uppercase mb-1">Primary Discipline</label>
                  <input
                    type="text"
                    defaultValue={currentUser.primarySport}
                    className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#0c1017] focus:outline-none focus:border-[#FF671C]"
                  />
                </div>
              </div>

              <div>
                <label className="block font-tech text-xs font-bold text-[#0c1017] uppercase mb-1">Emergency Sports Physician Contact</label>
                <input
                  type="text"
                  defaultValue={currentUser.emergencyContact}
                  className="w-full px-4 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-sm font-medium text-[#0c1017] focus:outline-none focus:border-[#FF671C]"
                />
              </div>

              <div className="pt-4 flex items-center gap-3 font-tech">
                <button
                  type="button"
                  onClick={() => alert('Athlete profile and biometric credentials saved successfully!')}
                  className="bg-[#FF671C] hover:bg-[#e05615] text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md cursor-pointer"
                >
                  SAVE PASSPORT SETTINGS
                </button>
              </div>
            </div>

            {/* Right: Telemetry Privacy & Sign Out */}
            <div className="lg:col-span-5 space-y-6">
              <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs space-y-4">
                <h4 className="font-sport text-2xl font-black italic uppercase text-[#0c1017]">
                  TELEMETRY & PRIVACY
                </h4>

                <div className="space-y-3 font-tech text-xs">
                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <div>
                      <p className="font-bold text-[#0c1017]">Arena Jumbotron Broadcast</p>
                      <span className="text-[10px] text-[#64748B]">Show live score during matches</span>
                    </div>
                    <input type="checkbox" defaultChecked className="accent-[#FF671C] w-4 h-4 cursor-pointer" />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <div>
                      <p className="font-bold text-[#0c1017]">Kinematic Force Plate Sync</p>
                      <span className="text-[10px] text-[#64748B]">Real-time cloud backup</span>
                    </div>
                    <input type="checkbox" defaultChecked className="accent-[#FF671C] w-4 h-4 cursor-pointer" />
                  </div>

                  <div className="flex items-center justify-between p-3 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0]">
                    <div>
                      <p className="font-bold text-[#0c1017]">Campus Locker Notifications</p>
                      <span className="text-[10px] text-[#64748B]">SMS when orders are ready</span>
                    </div>
                    <input type="checkbox" defaultChecked className="accent-[#FF671C] w-4 h-4 cursor-pointer" />
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-6 border border-red-100 shadow-xs">
                <h4 className="font-sport text-xl font-black italic uppercase text-red-600 mb-2">
                  SECURITY & SESSION
                </h4>
                <p className="text-xs text-[#64748B] mb-4 font-sans">
                  Signing out terminates your current active gate token and biometric connection.
                </p>
                <button
                  type="button"
                  onClick={onLogout}
                  className="font-tech w-full bg-red-600 hover:bg-red-700 text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-colors cursor-pointer shadow-sm"
                >
                  <LogOut className="w-4 h-4" />
                  <span>SIGN OUT OF ATHLETE PASSPORT</span>
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </div>

      {/* Booking Pass Detail Modal */}
      <AnimatePresence>
        {selectedBookingPass && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedBookingPass(null)}
              className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-sm w-full shadow-2xl border border-[#E2E8F0] z-10 text-center font-tech"
            >
              <span className="text-[10px] font-black uppercase tracking-wider bg-[#FF671C] text-white px-2.5 py-0.5 rounded">
                DIGITAL ENTRY PASS
              </span>
              <h3 className="font-sport text-2xl font-black italic uppercase text-[#0c1017] mt-2">
                {selectedBookingPass.facilityName}
              </h3>
              <p className="text-xs text-[#64748B] mt-0.5">
                {selectedBookingPass.date} • {selectedBookingPass.timeSlot}
              </p>

              <div className="w-44 h-44 bg-white p-3 rounded-2xl border-2 border-dashed border-[#FF671C] mx-auto my-5 flex items-center justify-center shadow-inner">
                <QrCode className="w-full h-full text-[#0c1017]" />
              </div>

              <p className="text-xs font-bold text-[#0c1017] font-mono tracking-widest">{selectedBookingPass.qrPassCode}</p>
              <p className="text-[11px] text-[#64748B] mt-1 font-sans">Present at arena entrance optical scanner.</p>

              <button
                type="button"
                onClick={() => setSelectedBookingPass(null)}
                className="mt-6 w-full bg-[#0c1017] text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer"
              >
                CLOSE PASS
              </button>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
