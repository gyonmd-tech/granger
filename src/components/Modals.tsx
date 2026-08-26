import React, { useState } from 'react';
import { X, Check, Calendar, Clock, Sparkles, Activity, ShieldCheck, Flame } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

// 1. Get In Touch Modal
export function GetInTouchModal({ isOpen, onClose }: ModalProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '', goal: 'High Performance Training' });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      onClose();
    }, 2200);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative bg-white rounded-3xl p-5 sm:p-7 md:p-8 max-w-lg w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E2E8F0] z-10 text-[#0c1017] transform-gpu"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-[#64748B] hover:text-[#0c1017] rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-10 sm:py-12 text-center flex flex-col items-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="w-16 h-16 bg-[#FF671C]/10 text-[#FF671C] rounded-full flex items-center justify-center mb-4 shadow-inner"
                >
                  <Check className="w-8 h-8 stroke-[3]" />
                </motion.div>
                <h3 className="font-sport text-3xl font-black italic uppercase text-[#0c1017] mb-2">MESSAGE TRANSMITTED</h3>
                <p className="text-[#64748B] text-sm font-sans max-w-xs">
                  Our sports performance director will contact you within 24 hours.
                </p>
              </motion.div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#FF671C] animate-pulse" />
                  <span className="font-tech text-xs font-black uppercase tracking-widest text-[#FF671C]">DIRECT INQUIRY</span>
                </div>
                <h3 className="font-sport text-2xl sm:text-3xl font-black italic uppercase text-[#0c1017] mb-1">
                  CONSULT WITH GRANGER
                </h3>
                <p className="text-xs sm:text-sm text-[#64748B] mb-5 sm:mb-6 font-sans">
                  Personalized athletic regimens, facility memberships, and youth academy onboarding.
                </p>

                <form onSubmit={handleSubmit} className="space-y-3.5 sm:space-y-4 font-sans">
                  <div>
                    <label className="block font-tech text-xs font-bold text-[#0c1017] uppercase tracking-wider mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Alex Granger"
                      className="w-full px-4 py-2.5 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#FF671C] focus:bg-white text-[#0c1017] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-tech text-xs font-bold text-[#0c1017] uppercase tracking-wider mb-1">
                      Email Address
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="alex@granger.com"
                      className="w-full px-4 py-2.5 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#FF671C] focus:bg-white text-[#0c1017] transition-all"
                    />
                  </div>
                  <div>
                    <label className="block font-tech text-xs font-bold text-[#0c1017] uppercase tracking-wider mb-1">
                      Athletic Objective
                    </label>
                    <select
                      value={formData.goal}
                      onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
                      className="w-full px-4 py-2.5 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#FF671C] focus:bg-white text-[#0c1017] transition-all"
                    >
                      <option>High Performance Training & Kinematics</option>
                      <option>Tennis Court & Recovery Facility Access</option>
                      <option>Youth Sports Academy Consultation</option>
                      <option>Nutrition & Telemetry Tracker Integration</option>
                    </select>
                  </div>
                  <div>
                    <label className="block font-tech text-xs font-bold text-[#0c1017] uppercase tracking-wider mb-1">
                      Message / Goals
                    </label>
                    <textarea
                      rows={3}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Detail your sports focus or training history..."
                      className="w-full px-4 py-2.5 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#FF671C] focus:bg-white text-[#0c1017] transition-all resize-none"
                    />
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="font-tech w-full bg-[#FF671C] hover:bg-[#e05615] text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all shadow-md mt-2 cursor-pointer animate-shine"
                  >
                    TRANSMIT INQUIRY
                  </motion.button>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// 2. Booking Modal
export function BookingModal({
  isOpen,
  onClose,
  title = 'Single Session with Professional Trainer',
  price = '$99',
}: ModalProps & { title?: string; price?: string }) {
  const [booked, setBooked] = useState(false);
  const [date, setDate] = useState('2026-03-01');
  const [time, setTime] = useState('10:00 AM');

  const handleBooking = (e: React.FormEvent) => {
    e.preventDefault();
    setBooked(true);
    setTimeout(() => {
      setBooked(false);
      onClose();
    }, 2400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative bg-white rounded-3xl p-5 sm:p-7 md:p-8 max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-[#E2E8F0] z-10 text-[#0c1017] transform-gpu"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-[#64748B] hover:text-[#0c1017] rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </motion.button>

            {booked ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="py-8 sm:py-10 text-center flex flex-col items-center"
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 15 }}
                  className="w-16 h-16 bg-[#16A34A]/10 text-[#16A34A] rounded-full flex items-center justify-center mb-4 shadow-inner"
                >
                  <ShieldCheck className="w-8 h-8 stroke-[2.5]" />
                </motion.div>
                <h3 className="font-sport text-3xl font-black italic uppercase text-[#0c1017] mb-2">SESSION CONFIRMED</h3>
                <p className="text-[#64748B] text-xs sm:text-sm font-sans max-w-xs">
                  Your reservation for <span className="font-bold text-[#0c1017]">{time}</span> on{' '}
                  <span className="font-bold text-[#0c1017]">{date}</span> has been confirmed. Pass added to your digital locker.
                </p>
              </motion.div>
            ) : (
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <span className="font-tech bg-[#FF671C] text-white text-[10px] px-2.5 py-0.5 rounded font-black uppercase shadow-xs">
                    PRO PASS
                  </span>
                </div>
                <h3 className="font-sport text-2xl sm:text-3xl font-black uppercase italic text-[#0c1017] mb-1">{title}</h3>
                <div className="flex items-baseline gap-2 mb-5 sm:mb-6">
                  <span className="font-sport text-3xl font-black italic text-[#FF671C]">{price}</span>
                  <span className="font-tech text-xs text-[#64748B] font-bold uppercase">COURT FEE & HYDRATION INCLUDED</span>
                </div>

                <form onSubmit={handleBooking} className="space-y-3.5 sm:space-y-4 font-sans">
                  <div>
                    <label className="block font-tech text-xs font-bold text-[#0c1017] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-[#FF671C]" /> Select Date
                    </label>
                    <input
                      type="date"
                      value={date}
                      onChange={(e) => setDate(e.target.value)}
                      className="w-full px-4 py-2.5 text-sm bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl focus:outline-none focus:border-[#FF671C] focus:bg-white text-[#0c1017] transition-all"
                    />
                  </div>

                  <div>
                    <label className="block font-tech text-xs font-bold text-[#0c1017] uppercase tracking-wider mb-1.5 flex items-center gap-1.5">
                      <Clock className="w-3.5 h-3.5 text-[#FF671C]" /> Time Slot
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {['08:00 AM', '10:00 AM', '02:00 PM', '04:30 PM', '06:00 PM', '07:30 PM'].map((slot) => (
                        <motion.button
                          whileHover={{ scale: 1.03 }}
                          whileTap={{ scale: 0.95 }}
                          key={slot}
                          type="button"
                          onClick={() => setTime(slot)}
                          className={`font-tech py-2 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                            time === slot
                              ? 'bg-[#0c1017] text-white border-[#0c1017] shadow-sm'
                              : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0c1017] hover:bg-gray-100'
                          }`}
                        >
                          {slot}
                        </motion.button>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.97 }}
                      type="submit"
                      className="font-tech w-full bg-[#FF671C] hover:bg-[#e05615] text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 shadow-md cursor-pointer animate-shine"
                    >
                      CONFIRM RESERVATION ({price})
                    </motion.button>
                  </div>
                </form>
              </div>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// 3. Detailed Dashboard Modal
export function DashboardModal({ isOpen, onClose }: ModalProps) {
  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative bg-white rounded-3xl p-5 sm:p-7 md:p-8 max-w-2xl w-full shadow-2xl border border-[#E2E8F0] z-10 max-h-[90vh] overflow-y-auto text-[#0c1017] transform-gpu"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-[#64748B] hover:text-[#0c1017] rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </motion.button>

            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF671C] animate-pulse" />
              <span className="font-tech text-xs font-black uppercase tracking-widest text-[#FF671C]">LIVE BIOMETRICS</span>
            </div>
            <h3 className="font-sport text-2xl sm:text-3xl md:text-4xl font-black italic uppercase text-[#0c1017] mb-5 sm:mb-6">
              ATHLETE TELEMETRY DASHBOARD
            </h3>

            {/* Quick Metrics Bento */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 sm:gap-4 mb-5 sm:mb-6">
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] hover:border-[#FF671C]/40 transition-colors">
                <p className="font-tech text-xs font-bold text-[#64748B] uppercase">Weekly Active Time</p>
                <p className="font-sport text-3xl font-black italic text-[#0c1017] mt-1">14h 22m</p>
                <span className="font-tech text-[11px] font-bold text-emerald-600">+18% VS LAST WEEK</span>
              </div>
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] hover:border-[#00a0e7]/40 transition-colors">
                <p className="font-tech text-xs font-bold text-[#64748B] uppercase">Avg Heart Rate</p>
                <p className="font-sport text-3xl font-black italic text-[#0c1017] mt-1">138 bpm</p>
                <span className="font-tech text-[11px] font-bold text-[#00a0e7]">ZONE 3 (AEROBIC)</span>
              </div>
              <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0] hover:border-[#FF671C]/40 transition-colors">
                <p className="font-tech text-xs font-bold text-[#64748B] uppercase">Campus Rank</p>
                <p className="font-sport text-3xl font-black italic text-[#0c1017] mt-1">#14</p>
                <span className="font-tech text-[11px] font-bold text-[#FF671C]">TOP 3% SAN DIEGO</span>
              </div>
            </div>

            {/* Daily Breakdown List */}
            <h4 className="font-tech text-xs font-bold text-[#0c1017] uppercase tracking-wider mb-3">
              RECENT TRAINING RECORDS
            </h4>
            <div className="space-y-2.5">
              {[
                { title: 'Roland Clay Tennis Match Rally', duration: '90 min', cal: '680 Cal', intensity: 'High' },
                { title: 'Hardwood High-Intensity Plyometrics', duration: '45 min', cal: '520 Cal', intensity: 'Max' },
                { title: 'Hydro-Recovery Thermal Pool Immersion', duration: '60 min', cal: '240 Cal', intensity: 'Low' },
              ].map((item, idx) => (
                <div key={idx} className="flex justify-between items-center p-3 sm:p-3.5 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] hover:bg-white hover:shadow-xs transition-all">
                  <div>
                    <p className="font-sport text-base sm:text-lg font-bold italic uppercase text-[#0c1017]">{item.title}</p>
                    <p className="font-tech text-[11px] sm:text-xs text-[#64748B]">{item.duration} • INTENSITY: {item.intensity}</p>
                  </div>
                  <span className="font-sport font-black italic text-lg sm:text-xl text-[#FF671C] ml-2">{item.cal}</span>
                </div>
              ))}
            </div>

            <div className="mt-6 sm:mt-8 pt-4 border-t border-[#E2E8F0] flex justify-end">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={onClose}
                className="font-tech bg-[#0c1017] hover:bg-[#FF671C] text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer transition-colors w-full sm:w-auto"
              >
                DISMISS DASHBOARD
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

// 4. Settings Modal
export function SettingsModal({ isOpen, onClose }: ModalProps) {
  const [metricUnit, setMetricUnit] = useState<'metric' | 'imperial'>('metric');
  const [notifications, setNotifications] = useState(true);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/65 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 20 }}
            transition={{ type: 'spring', damping: 25, stiffness: 320 }}
            className="relative bg-white rounded-3xl p-5 sm:p-7 md:p-8 max-w-md w-full shadow-2xl border border-[#E2E8F0] z-10 text-[#0c1017] transform-gpu"
          >
            <motion.button
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-4 right-4 sm:top-6 sm:right-6 p-2 text-[#64748B] hover:text-[#0c1017] rounded-full hover:bg-gray-100 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </motion.button>

            <h3 className="font-sport text-2xl sm:text-3xl font-black italic uppercase text-[#0c1017] mb-5 sm:mb-6">PREFERENCES & TELEMETRY</h3>

            <div className="space-y-6">
              <div>
                <label className="block font-tech text-xs font-bold text-[#0c1017] uppercase tracking-wider mb-2">
                  Measurement Calibration
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    onClick={() => setMetricUnit('metric')}
                    className={`font-tech py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      metricUnit === 'metric' ? 'bg-[#FF671C] text-white border-[#FF671C] shadow-xs' : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0c1017]'
                    }`}
                  >
                    METRIC (KM, KG, CAL)
                  </button>
                  <button
                    onClick={() => setMetricUnit('imperial')}
                    className={`font-tech py-2.5 text-xs font-bold rounded-xl border transition-all cursor-pointer ${
                      metricUnit === 'imperial' ? 'bg-[#FF671C] text-white border-[#FF671C] shadow-xs' : 'bg-[#F8FAFC] border-[#E2E8F0] text-[#0c1017]'
                    }`}
                  >
                    IMPERIAL (MI, LBS, CAL)
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between py-3 border-t border-[#E2E8F0]">
                <div>
                  <p className="font-sport text-lg font-bold italic uppercase text-[#0c1017]">ACTIVITY NOTIFICATIONS</p>
                  <p className="font-tech text-xs text-[#64748B]">DAILY DRILL REMINDERS & TOURNAMENT ALERTS</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                  className="w-5 h-5 accent-[#FF671C] cursor-pointer"
                />
              </div>
            </div>

            <div className="mt-8 pt-4 border-t border-[#E2E8F0] flex justify-end">
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={onClose}
                className="font-tech bg-[#FF671C] hover:bg-[#e05615] text-white px-6 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer shadow-sm animate-shine"
              >
                SAVE PREFERENCES
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

