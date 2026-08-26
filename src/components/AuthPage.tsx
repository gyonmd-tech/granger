import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  ShieldCheck,
  Flame,
  ArrowRight,
  Lock,
  Mail,
  User,
  Activity,
  QrCode,
  Sparkles,
  CheckCircle2,
  KeyRound,
  X,
  Phone,
  Eye,
  EyeOff,
} from 'lucide-react';
import { UserProfile } from '../types';

interface AuthPageProps {
  onLoginSuccess: (user: UserProfile) => void;
  onNavigateHome: () => void;
}

export function AuthPage({ onLoginSuccess, onNavigateHome }: AuthPageProps) {
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPasswordOpen, setForgotPasswordOpen] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpCode, setOtpCode] = useState(['', '', '', '', '', '']);
  const [otpVerified, setOtpVerified] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: 'Alex Granger',
    email: 'alex.granger@athletics.io',
    password: '••••••••••••',
    role: 'Athlete' as UserProfile['role'],
    membershipTier: 'Pro Athlete' as UserProfile['membershipTier'],
    primarySport: 'Basketball' as UserProfile['primarySport'],
    phone: '+1 (858) 492-7700',
  });

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const authenticatedUser: UserProfile = {
        id: 'usr_granger_' + Math.floor(1000 + Math.random() * 9000),
        name: formData.name || 'Alex Granger',
        email: formData.email,
        role: formData.role,
        membershipTier: formData.membershipTier,
        avatar:
          formData.role === 'Pro Coach'
            ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
            : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
        campusPoints: 1450,
        qrToken: 'GR-' + Math.random().toString(36).substring(2, 9).toUpperCase(),
        joinedDate: 'MARCH 2026',
        phone: formData.phone,
        emergencyContact: 'Dr. Arthur Granger (+1 858-555-0199)',
        primarySport: formData.primarySport,
        readinessScore: 88,
      };

      onLoginSuccess(authenticatedUser);
    }, 1000);
  };

  const handleOtpChange = (index: number, val: string) => {
    if (val.length > 1) val = val.slice(-1);
    const newCode = [...otpCode];
    newCode[index] = val;
    setOtpCode(newCode);

    if (val && index < 5) {
      const nextInput = document.getElementById(`otp-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleVerifyOtp = () => {
    setOtpVerified(true);
    setTimeout(() => {
      setForgotPasswordOpen(false);
      setOtpSent(false);
      setOtpVerified(false);
      setOtpCode(['', '', '', '', '', '']);
    }, 1800);
  };

  return (
    <div className="w-full min-h-screen bg-[#F0F2F5] pt-24 pb-20 px-4 sm:px-6 lg:px-8 flex flex-col justify-center items-center relative overflow-hidden">
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[#FF671C]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#00a0e7]/5 rounded-full blur-3xl pointer-events-none" />

      {/* Main Container */}
      <div className="max-w-6xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-center z-10">
        {/* Left Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-10 md:p-12 border border-[#E2E8F0] shadow-xl"
        >
          {/* Header & Logo */}
          <div className="flex items-center justify-between pb-6 border-b border-[#E2E8F0] mb-6">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF671C] animate-pulse" />
                <span className="font-tech text-xs font-black uppercase tracking-widest text-[#FF671C]">
                  CAMPUS GATEWAY ACCESS
                </span>
              </div>
              <h1 className="font-sport text-3xl sm:text-4xl font-black italic uppercase text-[#0c1017] tracking-tight">
                {authMode === 'login' ? 'ATHLETE SIGN IN' : 'JOIN GRANGER ACADEMY'}
              </h1>
            </div>

            <button
              onClick={onNavigateHome}
              className="font-tech text-xs font-bold text-[#64748B] hover:text-[#0c1017] uppercase tracking-wider transition-colors cursor-pointer hidden sm:block"
            >
              ← RETURN HOME
            </button>
          </div>

          {/* Mode Tabs */}
          <div className="grid grid-cols-2 p-1.5 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0] mb-6 font-tech">
            <button
              type="button"
              onClick={() => setAuthMode('login')}
              className={`py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                authMode === 'login'
                  ? 'bg-[#0c1017] text-white shadow-xs'
                  : 'text-[#64748B] hover:text-[#0c1017]'
              }`}
            >
              MEMBER LOGIN
            </button>
            <button
              type="button"
              onClick={() => setAuthMode('register')}
              className={`py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                authMode === 'register'
                  ? 'bg-[#0c1017] text-white shadow-xs'
                  : 'text-[#64748B] hover:text-[#0c1017]'
              }`}
            >
              CREATE ATHLETE ID
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4 font-sans">
            {authMode === 'register' && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: 'auto' }}
                exit={{ opacity: 0, height: 0 }}
                className="space-y-4"
              >
                <div>
                  <label className="block font-tech text-xs font-bold text-[#0c1017] uppercase tracking-wider mb-1.5">
                    Full Legal Name
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="e.g. Alex Granger"
                      className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#FF671C] focus:bg-white text-[#0c1017] transition-all font-sans font-medium"
                    />
                  </div>
                </div>

                {/* Role & Sport Selectors */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block font-tech text-xs font-bold text-[#0c1017] uppercase tracking-wider mb-1.5">
                      Account Role
                    </label>
                    <select
                      value={formData.role}
                      onChange={(e) =>
                        setFormData({ ...formData, role: e.target.value as UserProfile['role'] })
                      }
                      className="w-full px-3 py-2.5 text-xs font-bold font-tech bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#FF671C] focus:bg-white text-[#0c1017] transition-all cursor-pointer"
                    >
                      <option value="Athlete">ATHLETE / MEMBER</option>
                      <option value="Pro Coach">OLYMPIC COACH</option>
                      <option value="Referee / Official">REFEREE / OFFICIAL</option>
                      <option value="Campus Director">CAMPUS DIRECTOR</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-tech text-xs font-bold text-[#0c1017] uppercase tracking-wider mb-1.5">
                      Discipline
                    </label>
                    <select
                      value={formData.primarySport}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          primarySport: e.target.value as UserProfile['primarySport'],
                        })
                      }
                      className="w-full px-3 py-2.5 text-xs font-bold font-tech bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#FF671C] focus:bg-white text-[#0c1017] transition-all cursor-pointer"
                    >
                      <option value="Basketball">BASKETBALL (HARDWOOD)</option>
                      <option value="Tennis">TENNIS (ROLAND CLAY)</option>
                      <option value="Functional Training">FUNCTIONAL TRAINING</option>
                      <option value="Track & Field">TRACK & ENDURANCE</option>
                    </select>
                  </div>

                  <div>
                    <label className="block font-tech text-xs font-bold text-[#0c1017] uppercase tracking-wider mb-1.5">
                      Tier Level
                    </label>
                    <select
                      value={formData.membershipTier}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          membershipTier: e.target.value as UserProfile['membershipTier'],
                        })
                      }
                      className="w-full px-3 py-2.5 text-xs font-bold font-tech bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#FF671C] focus:bg-white text-[#0c1017] transition-all cursor-pointer"
                    >
                      <option value="Standard Member">STANDARD</option>
                      <option value="Pro Athlete">PRO ATHLETE</option>
                      <option value="Olympic Elite">OLYMPIC ELITE</option>
                    </select>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Email Field */}
            <div>
              <label className="block font-tech text-xs font-bold text-[#0c1017] uppercase tracking-wider mb-1.5">
                Email Address
              </label>
              <div className="relative">
                <Mail className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="name@athletics.com"
                  className="w-full pl-10 pr-4 py-2.5 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#FF671C] focus:bg-white text-[#0c1017] transition-all font-sans font-medium"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <div className="flex items-center justify-between mb-1.5">
                <label className="block font-tech text-xs font-bold text-[#0c1017] uppercase tracking-wider">
                  Password
                </label>
                {authMode === 'login' && (
                  <button
                    type="button"
                    onClick={() => setForgotPasswordOpen(true)}
                    className="font-tech text-[11px] font-bold text-[#FF671C] hover:underline uppercase cursor-pointer"
                  >
                    FORGOT PASSCODE?
                  </button>
                )}
              </div>
              <div className="relative">
                <Lock className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••••••"
                  className="w-full pl-10 pr-10 py-2.5 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#FF671C] focus:bg-white text-[#0c1017] transition-all font-sans font-medium"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3.5 top-1/2 -translate-y-1/2 text-[#94A3B8] hover:text-[#0c1017] cursor-pointer"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <motion.button
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.98 }}
              disabled={isLoading}
              type="submit"
              className="font-tech w-full bg-[#FF671C] hover:bg-[#e05615] text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 shadow-md hover:shadow-lg flex items-center justify-center gap-2 cursor-pointer mt-2"
            >
              {isLoading ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <>
                  <span>
                    {authMode === 'login' ? 'AUTHENTICATE & ENTER PORTAL' : 'INITIALIZE ATHLETE ACCOUNT'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </motion.button>
          </form>

          {/* Social Sign-In Divider */}
          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#E2E8F0]" />
            </div>
            <span className="relative bg-white px-3 font-tech text-[10px] font-bold text-[#94A3B8] uppercase tracking-wider">
              OR CONNECT VIA ATHLETE PASSPORT
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => {
                setFormData({
                  ...formData,
                  name: 'Google Athlete User',
                  email: 'athlete.connect@gmail.com',
                });
                handleSubmit({ preventDefault: () => {} } as any);
              }}
              className="font-tech flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-white text-xs font-bold text-[#0c1017] transition-all hover:shadow-xs cursor-pointer uppercase"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                />
              </svg>
              <span>GOOGLE</span>
            </button>

            <button
              type="button"
              onClick={() => {
                setFormData({
                  ...formData,
                  name: 'Apple Athlete User',
                  email: 'athlete.apple@icloud.com',
                });
                handleSubmit({ preventDefault: () => {} } as any);
              }}
              className="font-tech flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-white text-xs font-bold text-[#0c1017] transition-all hover:shadow-xs cursor-pointer uppercase"
            >
              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.37c.62-.75 1.04-1.8 0.93-2.85-.9.04-1.98.6-2.62 1.35-.57.65-.07 1.73-.95 2.76.99.08 2.02-.51 2.64-1.26z" />
              </svg>
              <span>APPLE ID</span>
            </button>
          </div>
        </motion.div>

        {/* Right Live Interactive Digital ID Card Preview */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="lg:col-span-5 flex flex-col items-center justify-center"
        >
          {/* Holographic Digital Athlete ID Card */}
          <div className="w-full max-w-sm bg-gradient-to-br from-[#0c1017] via-[#1a2333] to-[#0c1017] p-6 rounded-3xl text-white shadow-2xl border border-white/20 relative overflow-hidden animate-holo">
            {/* Ambient Badge Flare */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#FF671C]/25 rounded-full blur-2xl pointer-events-none" />

            {/* Card Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-2">
                <Flame className="w-5 h-5 text-[#FF671C]" />
                <span className="font-sport text-xl font-black italic tracking-tight">/ GRANGER</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="font-tech text-[10px] font-black uppercase tracking-wider bg-[#FF671C] text-white px-2 py-0.5 rounded">
                  {formData.role.toUpperCase()}
                </span>
                <span className="font-tech text-[9px] font-bold uppercase tracking-wider bg-white/10 text-white/90 px-1.5 py-0.5 rounded border border-white/10">
                  {formData.membershipTier}
                </span>
              </div>
            </div>

            {/* Athlete Profile Info */}
            <div className="py-6 flex items-center gap-4 relative z-10">
              <div className="w-16 h-16 rounded-2xl bg-white/10 border border-white/20 p-1 flex-shrink-0 flex items-center justify-center overflow-hidden shadow-md">
                <img
                  src={
                    formData.role === 'Pro Coach'
                      ? 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'
                      : 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80'
                  }
                  alt="Athlete preview"
                  className="w-full h-full object-cover rounded-xl"
                />
              </div>

              <div>
                <span className="font-tech text-[10px] text-[#94A3B8] font-bold uppercase tracking-wider block">
                  DIGITAL ATHLETE PASSPORT
                </span>
                <p className="font-sport text-2xl font-black italic tracking-wide uppercase text-white leading-tight line-clamp-1">
                  {formData.name || 'ALEX GRANGER'}
                </p>
                <p className="font-tech text-[11px] text-[#00a0e7] font-bold uppercase mt-0.5">
                  {formData.primarySport} SPECIALIST
                </p>
                <p className="text-[10px] text-white/60 font-mono mt-0.5 line-clamp-1">
                  {formData.email || 'athlete@granger.io'}
                </p>
              </div>
            </div>

            {/* Rotating QR Entry Pass Simulation */}
            <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center justify-between relative z-10 backdrop-blur-xs">
              <div>
                <p className="font-tech text-[10px] font-bold uppercase text-[#94A3B8]">
                  GATE ACCESS TOKEN
                </p>
                <p className="font-tech text-xs font-black text-[#FF671C] uppercase tracking-widest mt-0.5">
                  GR-SAN-DIEGO-2026
                </p>
                <span className="text-[9px] text-[#64748B] flex items-center gap-1 mt-1 font-tech">
                  <Activity className="w-2.5 h-2.5 text-emerald-400" />
                  SENSOR TELEMETRY ACTIVE
                </span>
              </div>

              <div className="w-12 h-12 bg-white rounded-xl p-1 flex items-center justify-center shadow-inner">
                <QrCode className="w-full h-full text-[#0c1017]" />
              </div>
            </div>

            {/* Card Footer */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-[10px] font-tech text-[#94A3B8] uppercase">
              <span>FIBA & USATT ACCREDITED</span>
              <span>SAN DIEGO HQ</span>
            </div>
          </div>

          <div className="mt-4 flex items-center gap-2 text-xs font-tech text-[#64748B] font-bold uppercase text-center">
            <ShieldCheck className="w-4 h-4 text-[#16A34A]" />
            <span>256-BIT BIOMETRIC ENCRYPTION</span>
          </div>
        </motion.div>

      </div>

      {/* Forgot Password OTP Modal */}
      <AnimatePresence>
        {forgotPasswordOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setForgotPasswordOpen(false)}
              className="absolute inset-0 bg-black/65 backdrop-blur-sm"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#E2E8F0] z-10 text-[#0c1017]"
            >
              <button
                onClick={() => setForgotPasswordOpen(false)}
                className="absolute top-5 right-5 p-2 text-[#64748B] hover:text-[#0c1017] rounded-full hover:bg-gray-100 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {otpVerified ? (
                <div className="py-8 text-center flex flex-col items-center">
                  <div className="w-16 h-16 bg-[#16A34A]/10 text-[#16A34A] rounded-full flex items-center justify-center mb-3">
                    <CheckCircle2 className="w-8 h-8" />
                  </div>
                  <h3 className="font-sport text-2xl font-black italic uppercase text-[#0c1017]">
                    PASSPORT RESET AUTHORIZED
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1 font-sans">
                    Temporary access code dispatched to your registered phone.
                  </p>
                </div>
              ) : !otpSent ? (
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-[#FF671C]/10 text-[#FF671C] flex items-center justify-center mb-3">
                    <KeyRound className="w-6 h-6" />
                  </div>
                  <h3 className="font-sport text-2xl font-black italic uppercase text-[#0c1017]">
                    RESET ATHLETE PASSCODE
                  </h3>
                  <p className="text-xs text-[#64748B] mt-1 mb-4 font-sans leading-relaxed">
                    Enter your email to receive a 6-digit cryptographic verification OTP.
                  </p>

                  <input
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-2.5 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#FF671C] mb-4 text-[#0c1017]"
                    placeholder="name@athletics.com"
                  />

                  <button
                    onClick={() => setOtpSent(true)}
                    className="font-tech w-full bg-[#FF671C] hover:bg-[#e05615] text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer"
                  >
                    DISPATCH VERIFICATION OTP
                  </button>
                </div>
              ) : (
                <div>
                  <h3 className="font-sport text-2xl font-black italic uppercase text-[#0c1017] mb-1">
                    ENTER 6-DIGIT OTP
                  </h3>
                  <p className="text-xs text-[#64748B] mb-4 font-sans">
                    Sent to <strong className="text-[#0c1017]">{formData.email}</strong>.
                  </p>

                  <div className="grid grid-cols-6 gap-2 mb-5">
                    {otpCode.map((digit, i) => (
                      <input
                        key={i}
                        id={`otp-input-${i}`}
                        type="text"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(i, e.target.value)}
                        className="w-full h-12 text-center text-lg font-black font-sport bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#FF671C] focus:bg-white text-[#0c1017]"
                      />
                    ))}
                  </div>

                  <button
                    onClick={handleVerifyOtp}
                    className="font-tech w-full bg-[#0c1017] hover:bg-[#FF671C] text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer transition-colors"
                  >
                    VERIFY & RESTORE ACCESS
                  </button>
                </div>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
