import { useState, useEffect, useRef } from 'react';
import {
  Settings,
  Menu,
  X,
  Flame,
  Activity,
  Cpu,
  Trophy,
  ShoppingBag,
  Calendar,
  Info,
  User,
  ChevronDown,
  ChevronRight,
  Shield,
  LogOut,
  LayoutDashboard,
  KeyRound,
  Sparkles,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { UserProfile } from '../types';

interface NavbarProps {
  activeNav: string;
  currentUser: UserProfile | null;
  onSelectNav: (nav: string) => void;
  onOpenGetInTouch: () => void;
  onOpenSettings: () => void;
  onNavigateAuth: () => void;
  onNavigateDashboard: () => void;
  onLogout?: () => void;
}

interface NavItemConfig {
  name: string;
  icon: typeof Activity;
  badge?: {
    text: string;
    type: 'live' | 'ai';
  };
}

export function Navbar({
  activeNav,
  currentUser,
  onSelectNav,
  onOpenGetInTouch,
  onOpenSettings,
  onNavigateAuth,
  onNavigateDashboard,
  onLogout,
}: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accountMenuOpen, setAccountMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const accountMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrolled = window.scrollY > 20;
          setIsScrolled((prev) => (prev !== scrolled ? scrolled : prev));
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close account dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        accountMenuRef.current &&
        !accountMenuRef.current.contains(event.target as Node)
      ) {
        setAccountMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navItems: NavItemConfig[] = [
    { name: 'Program', icon: Activity },
    { name: 'Lab', icon: Cpu, badge: { text: 'AI', type: 'ai' } },
    { name: 'Booking', icon: Calendar },
    { name: 'Arena Hub', icon: Trophy, badge: { text: 'LIVE', type: 'live' } },
    { name: 'Product', icon: ShoppingBag },
    { name: 'Events', icon: Shield },
    { name: 'About', icon: Info },
  ];

  return (
    <header className="fixed top-0 left-0 w-full z-50 transition-all duration-300">
      {/* ------------------------------------------------------------------------- */}
      {/* MAIN UNIFIED ATHLETIC COMMAND BAR */}
      {/* ------------------------------------------------------------------------- */}
      <nav
        className={`w-full transition-all duration-300 relative border-b ${
          isScrolled
            ? 'bg-[#05070B]/98 backdrop-blur-2xl py-2.5 sm:py-3 border-white/20 shadow-[0_10px_30px_rgba(0,0,0,0.9)]'
            : 'bg-[#06090E]/95 backdrop-blur-xl py-3.5 sm:py-4 border-white/15 shadow-[0_4px_20px_rgba(0,0,0,0.6)]'
        }`}
      >
        {/* Dynamic High-Voltage Laser Accent Line on Top & Bottom */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#FF4D00] to-transparent opacity-90" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF4D00]/60 to-transparent" />

        <div className="w-full px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 flex items-center justify-between gap-3 lg:gap-6">
          
          {/* ========================================================================= */}
          {/* ZONE 1: BOLD ATHLETIC BRAND LOCKUP (Kiri) */}
          {/* ========================================================================= */}
          <div className="flex items-center gap-3 sm:gap-4 flex-shrink-0">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => onSelectNav('Program')}
              className="flex items-center gap-2.5 sm:gap-3 group cursor-pointer text-left focus:outline-none"
              aria-label="Granger Home"
            >
              {/* Aggressive Championship Shield Icon */}
              <div className="relative">
                <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-gradient-to-br from-[#FF4D00] via-[#FF6A00] to-[#D63A00] flex items-center justify-center shadow-[0_0_20px_rgba(255,77,0,0.5)] border-2 border-white/30 group-hover:shadow-[0_0_28px_rgba(255,77,0,0.8)] group-hover:scale-105 transition-all duration-300">
                  <span className="font-sport text-2xl sm:text-3xl font-black italic text-white leading-none tracking-tighter drop-shadow-md">
                    G
                  </span>
                </div>
                {/* Micro speed slash accent */}
                <div className="absolute -bottom-1 -right-1 w-3.5 h-3.5 bg-[#00E5FF] rounded-md flex items-center justify-center shadow-xs border border-black text-[8px] font-black text-black">
                  ⚡
                </div>
              </div>

              {/* Brand Typography with High-Impact Contrast */}
              <div className="flex flex-col">
                <div className="flex items-center gap-1.5">
                  <span className="font-sport text-2xl sm:text-3xl lg:text-4xl font-black italic uppercase tracking-tighter text-white group-hover:text-[#FF4D00] transition-colors leading-none drop-shadow-sm">
                    GRANGER
                  </span>
                  <span className="font-tech text-[10px] font-black text-black bg-[#FF4D00] px-1.5 py-0.5 rounded-sm uppercase tracking-widest leading-none shadow-xs">
                    PRO
                  </span>
                </div>
                <div className="flex items-center gap-2 mt-0.5">
                  <span className="font-tech text-[9px] font-black text-[#94A3B8] uppercase tracking-widest leading-none hidden sm:block">
                    HUMAN PERFORMANCE LAB
                  </span>
                  <span className="inline-flex items-center gap-1 text-[9px] font-tech font-bold text-[#16A34A] bg-[#16A34A]/10 px-1.5 py-0.2 rounded border border-[#16A34A]/30">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-ping" />
                    <span>ONLINE</span>
                  </span>
                </div>
              </div>
            </motion.button>
          </div>

          {/* ========================================================================= */}
          {/* ZONE 2: HIGH-CONTRAST STRUCTURED NAVIGATION MATRIX (Tengah) */}
          {/* ========================================================================= */}
          <div className="hidden lg:flex items-center bg-[#090D14] p-1.5 rounded-2xl border-2 border-white/15 shadow-[inset_0_2px_8px_rgba(0,0,0,0.8)] relative">
            {navItems.map((item) => {
              const isActive = activeNav === item.name;
              const Icon = item.icon;

              return (
                <button
                  key={item.name}
                  type="button"
                  onClick={() => onSelectNav(item.name)}
                  className={`font-tech text-xs uppercase tracking-wider px-3.5 xl:px-4 py-2.5 rounded-xl flex items-center gap-2 relative cursor-pointer font-black transition-all duration-200 select-none ${
                    isActive
                      ? 'text-white drop-shadow-sm'
                      : 'text-[#8E9CAE] hover:text-white hover:bg-white/5'
                  }`}
                >
                  {/* High-Power Active Tab Indicator */}
                  {isActive && (
                    <motion.div
                      layoutId="strongNavbarActiveTab"
                      className="absolute inset-0 bg-gradient-to-r from-[#FF4D00] via-[#FF5E14] to-[#E03E00] rounded-xl shadow-[0_0_20px_rgba(255,77,0,0.55)] border border-white/30 -z-10"
                      transition={{ type: 'spring', stiffness: 440, damping: 32 }}
                    />
                  )}

                  <Icon
                    className={`w-4 h-4 transition-colors ${
                      isActive ? 'text-white' : 'text-[#64748B]'
                    }`}
                  />
                  <span>{item.name}</span>

                  {/* High-Energy Glow Badges */}
                  {item.badge && (
                    <span
                      className={`text-[9px] px-1.5 py-0.5 rounded font-black uppercase tracking-wider flex items-center gap-1 shadow-xs ${
                        item.badge.type === 'live'
                          ? isActive
                            ? 'bg-black/50 text-white border border-white/30'
                            : 'bg-[#FF4D00] text-white shadow-[0_0_10px_rgba(255,77,0,0.8)]'
                          : isActive
                          ? 'bg-black/50 text-[#00E5FF] border border-[#00E5FF]/40'
                          : 'bg-[#00E5FF] text-black font-black shadow-[0_0_10px_rgba(0,229,255,0.7)]'
                      }`}
                    >
                      {item.badge.type === 'live' && (
                        <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping" />
                      )}
                      <span>{item.badge.text}</span>
                    </span>
                  )}
                </button>
              );
            })}
          </div>

          {/* ========================================================================= */}
          {/* ZONE 3: COMMAND HUB & CLEAN ACCOUNT PROFILE (Kanan) */}
          {/* ========================================================================= */}
          <div className="flex items-center gap-2.5 sm:gap-3 flex-shrink-0">
            
            {/* Clean, Non-Crowded Athlete Account Trigger + Dropdown */}
            {currentUser ? (
              <div className="relative" ref={accountMenuRef}>
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={() => setAccountMenuOpen(!accountMenuOpen)}
                  title="Open Account Menu"
                  className={`flex items-center gap-2 p-1.5 sm:px-2.5 sm:py-1.5 rounded-xl text-white transition-all cursor-pointer border-2 ${
                    accountMenuOpen || activeNav === 'Dashboard' || activeNav === 'Auth'
                      ? 'bg-[#FF4D00]/20 border-[#FF4D00] shadow-[0_0_15px_rgba(255,77,0,0.4)]'
                      : 'bg-[#090D14] hover:bg-[#111722] border-white/15'
                  }`}
                >
                  <div className="relative">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg object-cover border border-[#FF4D00]"
                    />
                    <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-[#16A34A] border-2 border-[#06090E]" />
                  </div>

                  <div className="text-left font-tech hidden sm:flex items-center gap-1.5">
                    <span className="text-xs font-black uppercase tracking-wider text-white">
                      {currentUser.name.split(' ')[0]}
                    </span>
                    <ChevronDown
                      className={`w-3.5 h-3.5 text-[#94A3B8] transition-transform duration-200 ${
                        accountMenuOpen ? 'rotate-180 text-[#FF4D00]' : ''
                      }`}
                    />
                  </div>
                </motion.button>

                {/* Sleek Athlete Account Dropdown Popover */}
                <AnimatePresence>
                  {accountMenuOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.18, ease: 'easeOut' }}
                      className="absolute right-0 mt-2 w-72 bg-[#090D14] rounded-2xl border-2 border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.9)] p-4 text-white z-50 font-tech backdrop-blur-2xl"
                    >
                      {/* Athlete Identity Header */}
                      <div className="flex items-center gap-3 pb-3.5 border-b border-white/15">
                        <img
                          src={currentUser.avatar}
                          alt={currentUser.name}
                          className="w-11 h-11 rounded-xl object-cover border-2 border-[#FF4D00]"
                        />
                        <div className="flex flex-col">
                          <div className="flex items-center gap-1.5">
                            <h4 className="font-sport text-base font-black italic uppercase text-white leading-tight">
                              {currentUser.name}
                            </h4>
                          </div>
                          <p className="text-[11px] text-[#94A3B8] truncate max-w-[150px]">
                            {currentUser.email}
                          </p>
                          <div className="flex items-center gap-1.5 mt-1">
                            <span className="text-[9px] bg-[#FF4D00] text-white px-1.5 py-0.2 rounded font-black uppercase">
                              {currentUser.membershipTier}
                            </span>
                            <span className="text-[9px] text-[#00E5FF] font-black">
                              {currentUser.readinessScore}% READY
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Menu Actions */}
                      <div className="py-2.5 flex flex-col gap-1 text-xs">
                        {/* 1. Athlete Dashboard */}
                        <button
                          type="button"
                          onClick={() => {
                            onNavigateDashboard();
                            setAccountMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl font-bold uppercase transition-all cursor-pointer ${
                            activeNav === 'Dashboard'
                              ? 'bg-[#FF4D00] text-white shadow-md'
                              : 'text-white/90 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <LayoutDashboard className="w-4 h-4 text-[#FF4D00]" />
                            <span>ATHLETE DASHBOARD</span>
                          </div>
                          <ChevronRight className="w-3.5 h-3.5 text-white/50" />
                        </button>

                        {/* 2. Direct Auth & Sign In Page */}
                        <button
                          type="button"
                          onClick={() => {
                            onNavigateAuth();
                            setAccountMenuOpen(false);
                          }}
                          className={`w-full flex items-center justify-between p-2.5 rounded-xl font-bold uppercase transition-all cursor-pointer ${
                            activeNav === 'Auth'
                              ? 'bg-[#FF4D00] text-white shadow-md'
                              : 'text-white/90 hover:bg-white/10 hover:text-white'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <KeyRound className="w-4 h-4 text-[#00E5FF]" />
                            <span>AUTH / LOGIN & REGISTER</span>
                          </div>
                          <span className="text-[9px] bg-white/10 text-[#00E5FF] px-1.5 py-0.5 rounded font-black">
                            PAGE
                          </span>
                        </button>

                        {/* 3. Calibration Settings */}
                        <button
                          type="button"
                          onClick={() => {
                            onOpenSettings();
                            setAccountMenuOpen(false);
                          }}
                          className="w-full flex items-center justify-between p-2.5 rounded-xl font-bold uppercase text-white/90 hover:bg-white/10 hover:text-white transition-all cursor-pointer"
                        >
                          <div className="flex items-center gap-2.5">
                            <Settings className="w-4 h-4 text-[#94A3B8]" />
                            <span>CALIBRATION SETTINGS</span>
                          </div>
                          <span className="text-[9px] text-[#94A3B8]">MODAL</span>
                        </button>
                      </div>

                      {/* Divider & Sign Out */}
                      <div className="pt-2 border-t border-white/15">
                        <button
                          type="button"
                          onClick={() => {
                            if (onLogout) onLogout();
                            onNavigateAuth();
                            setAccountMenuOpen(false);
                          }}
                          className="w-full flex items-center justify-between p-2 rounded-xl text-xs font-black uppercase text-red-400 hover:bg-red-500/15 transition-colors cursor-pointer"
                        >
                          <div className="flex items-center gap-2">
                            <LogOut className="w-3.5 h-3.5 text-red-400" />
                            <span>SIGN OUT / SWITCH</span>
                          </div>
                          <span className="text-[10px] text-red-400/70 font-mono">AUTH</span>
                        </button>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ) : (
              /* Direct Auth / Sign In Button (When Logged Out) */
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={onNavigateAuth}
                className={`font-tech text-xs uppercase tracking-wider font-black px-4 py-2 sm:py-2.5 rounded-xl border-2 transition-all cursor-pointer flex items-center gap-2 shadow-sm ${
                  activeNav === 'Auth'
                    ? 'bg-[#FF4D00] text-white border-[#FF4D00] shadow-[0_0_16px_rgba(255,77,0,0.6)]'
                    : 'text-white bg-[#090D14] hover:bg-[#121824] border-white/20 hover:border-white/40'
                }`}
              >
                <User className="w-4 h-4 text-[#FF4D00]" />
                <span>AUTH / SIGN IN</span>
              </motion.button>
            )}

            {/* Quick Calibration Settings Button */}
            <motion.button
              whileHover={{ scale: 1.08, rotate: 45 }}
              whileTap={{ scale: 0.92 }}
              onClick={onOpenSettings}
              title="Telemetry Settings & Calibration"
              className="p-2 sm:p-2.5 text-[#94A3B8] hover:text-white hover:bg-white/10 transition-colors rounded-xl cursor-pointer border-2 border-white/15 bg-[#090D14] hidden sm:flex items-center justify-center hover:border-white/30"
              aria-label="Settings"
            >
              <Settings className="w-4 h-4" />
            </motion.button>

            {/* High-Voltage Primary CTA: GET IN TOUCH */}
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onOpenGetInTouch}
              className="font-tech text-xs uppercase tracking-widest font-black text-white bg-gradient-to-r from-[#FF4D00] via-[#FF600A] to-[#E03A00] hover:from-[#e03a00] hover:to-[#b82e00] px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl transition-all shadow-[0_0_20px_rgba(255,77,0,0.5)] hover:shadow-[0_0_28px_rgba(255,77,0,0.8)] border-2 border-white/30 hidden md:flex items-center gap-2 cursor-pointer animate-shine"
            >
              <Flame className="w-4 h-4 fill-white text-white" />
              <span>GET IN TOUCH</span>
            </motion.button>

            {/* Mobile menu toggle */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2.5 text-white lg:hidden bg-[#090D14] hover:bg-white/10 rounded-xl cursor-pointer border-2 border-white/20"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </motion.button>
          </div>
        </div>
      </nav>

      {/* ------------------------------------------------------------------------- */}
      {/* HIGH-IMPACT SPORTY MOBILE DRAWER */}
      {/* ------------------------------------------------------------------------- */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden bg-[#05070B]/98 border-b-2 border-[#FF4D00]/50 px-5 py-6 flex flex-col gap-3.5 overflow-hidden backdrop-blur-2xl shadow-[0_20px_50px_rgba(0,0,0,0.95)]"
          >
            {/* Drawer Status Strip */}
            <div className="flex items-center justify-between pb-3 border-b border-white/15 font-tech">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF4D00] animate-ping" />
                <span className="text-xs font-black uppercase text-white tracking-widest">
                  ATHLETIC MATRIX
                </span>
              </div>
              <span className="text-[10px] text-black bg-[#FF4D00] px-2 py-0.5 rounded font-black uppercase">
                SAN DIEGO CAMPUS
              </span>
            </div>

            {/* Navigation Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
              {navItems.map((item, idx) => {
                const isActive = activeNav === item.name;
                const Icon = item.icon;

                return (
                  <motion.button
                    key={item.name}
                    initial={{ opacity: 0, x: -12 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: idx * 0.035 }}
                    onClick={() => {
                      onSelectNav(item.name);
                      setMobileMenuOpen(false);
                    }}
                    className={`font-tech text-left py-3.5 px-4 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-between cursor-pointer transition-all border-2 ${
                      isActive
                        ? 'bg-gradient-to-r from-[#FF4D00] to-[#E03A00] text-white border-white/30 shadow-[0_0_18px_rgba(255,77,0,0.5)]'
                        : 'bg-[#090D14] text-[#94A3B8] hover:text-white hover:bg-white/10 border-white/15'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#FF4D00]'}`} />
                      <span className="text-sm">{item.name}</span>
                    </div>

                    <div className="flex items-center gap-1.5">
                      {item.badge && (
                        <span className="bg-black/50 border border-white/20 text-white text-[9px] px-2 py-0.5 rounded font-black uppercase">
                          {item.badge.text}
                        </span>
                      )}
                      <ChevronRight className={`w-4 h-4 ${isActive ? 'text-white' : 'text-[#64748B]'}`} />
                    </div>
                  </motion.button>
                );
              })}
            </div>

            {/* User & Direct Auth Links in Mobile */}
            <div className="pt-3 border-t border-white/15 flex flex-col gap-2.5 font-tech text-xs">
              {/* Direct Auth / Login Link */}
              <button
                type="button"
                onClick={() => {
                  onNavigateAuth();
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between py-3 px-4 rounded-xl border-2 font-black uppercase transition-all ${
                  activeNav === 'Auth'
                    ? 'bg-[#FF4D00] text-white border-[#FF4D00] shadow-md'
                    : 'bg-[#090D14] hover:bg-[#FF4D00] border-white/15 text-white group'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <KeyRound className="w-4 h-4 text-[#00E5FF]" />
                  <span>ATHLETE AUTH / LOGIN & REGISTER</span>
                </div>
                <span className="text-[10px] text-black bg-[#00E5FF] px-2 py-0.5 rounded font-black">
                  AUTH
                </span>
              </button>

              {/* Dashboard Link if Logged In */}
              {currentUser && (
                <button
                  type="button"
                  onClick={() => {
                    onNavigateDashboard();
                    setMobileMenuOpen(false);
                  }}
                  className={`w-full flex items-center justify-between py-3 px-4 rounded-xl border-2 font-bold uppercase transition-all ${
                    activeNav === 'Dashboard'
                      ? 'bg-[#FF4D00] text-white border-[#FF4D00]'
                      : 'bg-[#090D14] hover:bg-white/10 border-white/15 text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <img
                      src={currentUser.avatar}
                      alt={currentUser.name}
                      className="w-8 h-8 rounded-lg object-cover border-2 border-[#FF4D00]"
                    />
                    <div className="text-left">
                      <p className="text-xs font-black uppercase leading-tight text-white">
                        {currentUser.name}
                      </p>
                      <p className="text-[10px] text-[#FF4D00] font-bold">
                        {currentUser.membershipTier} • {currentUser.readinessScore}% READY
                      </p>
                    </div>
                  </div>
                  <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" />
                </button>
              )}

              <button
                type="button"
                onClick={() => {
                  onOpenSettings();
                  setMobileMenuOpen(false);
                }}
                className="flex items-center justify-between py-2.5 px-4 rounded-xl bg-[#090D14] hover:bg-white/10 text-[#94A3B8] hover:text-white border-2 border-white/10 transition-colors"
              >
                <div className="flex items-center gap-2">
                  <Settings className="w-4 h-4 text-[#FF4D00]" />
                  <span>CALIBRATION & TELEMETRY SETTINGS</span>
                </div>
                <span className="text-[10px] text-[#64748B]">v2.4</span>
              </button>
            </div>

            {/* Primary Action Button */}
            <motion.button
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              onClick={() => {
                onOpenGetInTouch();
                setMobileMenuOpen(false);
              }}
              className="font-tech text-center py-3.5 rounded-xl text-xs font-black uppercase tracking-widest bg-gradient-to-r from-[#FF4D00] via-[#FF600A] to-[#E03A00] text-white shadow-[0_0_20px_rgba(255,77,0,0.6)] mt-2 flex items-center justify-center gap-2 active:scale-98 border-2 border-white/30"
            >
              <Flame className="w-4 h-4 fill-white" />
              <span>GET IN TOUCH WITH PERFORMANCE DIRECTOR</span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
