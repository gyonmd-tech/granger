import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Calendar as CalendarIcon,
  Clock,
  MapPin,
  ShieldCheck,
  QrCode,
  CheckCircle2,
  Check,
  Building2,
  Zap,
  Users,
  Search,
  Filter,
  Flame,
  ArrowUpRight,
  ChevronRight,
} from 'lucide-react';
import { BookingRecord, UserProfile } from '../types';

interface FacilityOption {
  id: string;
  name: string;
  category: BookingRecord['category'];
  courtNumber: string;
  priceNum: number;
  priceStr: string;
  image: string;
  badge: string;
  sport: string;
  capacity: string;
  surface: string;
  features: string[];
}

const FACILITIES: FacilityOption[] = [
  {
    id: 'hardwood-01',
    name: 'Hardwood Championship Arena (Main Court)',
    category: 'Hardwood Court',
    sport: 'Basketball',
    courtNumber: 'HARDWOOD COURT #01',
    priceNum: 120,
    priceStr: '$120 / hr',
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1200&q=85',
    badge: 'FIBA LEVEL 1',
    capacity: '10 Players (Full Court)',
    surface: 'Junckers Solid Beech Hardwood',
    features: ['Integrated 24s Shot Clocks', 'In-Floor Telemetry Sensors', 'Pro Breakaway Rims'],
  },
  {
    id: 'clay-02',
    name: 'Roland Clay Tennis Stadium (Court #02)',
    category: 'Roland Clay Tennis',
    sport: 'Tennis',
    courtNumber: 'RED CLAY #02',
    priceNum: 99,
    priceStr: '$99 / hr',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1200&q=85',
    badge: 'ITF GOLD CERTIFIED',
    capacity: '4 Players (Singles/Doubles)',
    surface: 'European Crushed Brick Red Clay',
    features: ['Optical Ball Velocity Radar', '2000 Lux LED Floodlights', 'Daily Hydro-Rolled Clay'],
  },
  {
    id: 'cryo-03',
    name: 'Hydro-Cryo Contrast Plunge Suite (48°F & 104°F)',
    category: 'Hydro Recovery',
    sport: 'Recovery',
    courtNumber: 'RECOVERY SUITE #03',
    priceNum: 65,
    priceStr: '$65 / hr',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1200&q=85',
    badge: 'COLD THERMAL SUITE',
    capacity: 'Private Suite (1-2 Athletes)',
    surface: 'Dual Ozonated Thermal Plunges',
    features: ['Cryo Ice Plunge (48°F)', 'Thermal Hot Bath (104°F)', 'Far-Infrared Sauna Halo'],
  },
  {
    id: 'biomech-04',
    name: 'Vald Biomechanics & Force Plate Studio',
    category: 'Biomechanics Lab',
    sport: 'Sports Science',
    courtNumber: 'TELEMETRY STUDIO #04',
    priceNum: 110,
    priceStr: '$110 / hr',
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1200&q=85',
    badge: 'FORCE DECKS LAB',
    capacity: '1-on-1 with Sports Scientist',
    surface: 'Dual Force Plate Platform',
    features: ['240FPS High-Speed Motion Capture', 'Kinematic Asymmetry Analysis', 'Instant PDF Biometric Report'],
  },
];

const CALENDAR_DATES = [
  { id: '2026-02-26', dayName: 'TODAY', dateNum: '26', month: 'FEB', fullLabel: 'TODAY, FEB 26, 2026' },
  { id: '2026-02-27', dayName: 'FRI', dateNum: '27', month: 'FEB', fullLabel: 'FRIDAY, FEB 27, 2026' },
  { id: '2026-02-28', dayName: 'SAT', dateNum: '28', month: 'FEB', fullLabel: 'SATURDAY, FEB 28, 2026' },
  { id: '2026-03-01', dayName: 'SUN', dateNum: '01', month: 'MAR', fullLabel: 'SUNDAY, MAR 01, 2026' },
  { id: '2026-03-02', dayName: 'MON', dateNum: '02', month: 'MAR', fullLabel: 'MONDAY, MAR 02, 2026' },
  { id: '2026-03-03', dayName: 'TUE', dateNum: '03', month: 'MAR', fullLabel: 'TUESDAY, MAR 03, 2026' },
  { id: '2026-03-04', dayName: 'WED', dateNum: '04', month: 'MAR', fullLabel: 'WEDNESDAY, MAR 04, 2026' },
];

const TIME_SLOTS = [
  { time: '07:00 AM - 08:30 AM', period: 'Morning Session', status: 'Available', isPeak: false, availableSpots: 4 },
  { time: '08:30 AM - 10:00 AM', period: 'Morning Session', status: 'Available', isPeak: false, availableSpots: 3 },
  { time: '10:00 AM - 11:30 AM', period: 'Morning Session', status: 'Available', isPeak: false, availableSpots: 2 },
  { time: '12:00 PM - 01:30 PM', period: 'Afternoon Session', status: 'Peak Hours', isPeak: true, availableSpots: 1 },
  { time: '02:00 PM - 03:30 PM', period: 'Afternoon Session', status: 'Available', isPeak: false, availableSpots: 3 },
  { time: '04:00 PM - 05:30 PM', period: 'Prime Time', status: 'Peak Hours', isPeak: true, availableSpots: 1 },
  { time: '05:30 PM - 07:00 PM', period: 'Prime Time', status: 'Peak Hours', isPeak: true, availableSpots: 2 },
  { time: '07:00 PM - 08:30 PM', period: 'Evening Session', status: 'Available', isPeak: false, availableSpots: 4 },
  { time: '08:30 PM - 10:00 PM', period: 'Evening Session', status: 'Available', isPeak: false, availableSpots: 5 },
];

const ADDONS = [
  { id: 'ball-pack', name: 'Official Match Ball Pack (FIBA / ITF)', price: 15, tag: 'EQUIPMENT' },
  { id: 'coach-15', name: '1-on-1 Pro Coach Calibration (15 Mins)', price: 35, tag: 'COACHING' },
  { id: 'shake-pack', name: 'Post-Match Hyper-Recovery Smoothie Pack', price: 12, tag: 'NUTRITION' },
  { id: 'racket-string', name: 'VIP Locker & Pro Towel Bundle', price: 20, tag: 'AMENITY' },
];

interface BookingPageProps {
  currentUser: UserProfile | null;
  onBookingConfirmed: (newBooking: BookingRecord) => void;
  onNavigateDashboard: () => void;
}

export function BookingPage({
  currentUser,
  onBookingConfirmed,
  onNavigateDashboard,
}: BookingPageProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedFacility, setSelectedFacility] = useState<FacilityOption>(FACILITIES[0]);
  const [selectedDateObj, setSelectedDateObj] = useState(CALENDAR_DATES[0]);
  const [selectedSlot, setSelectedSlot] = useState<string>(TIME_SLOTS[1].time);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(['ball-pack']);
  const [confirmedPass, setConfirmedPass] = useState<BookingRecord | null>(null);

  const categories = ['All', 'Hardwood Court', 'Roland Clay Tennis', 'Hydro Recovery', 'Biomechanics Lab'];

  const filteredFacilities =
    selectedCategory === 'All'
      ? FACILITIES
      : FACILITIES.filter((f) => f.category === selectedCategory);

  const toggleAddon = (id: string) => {
    setSelectedAddons((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const calculateAddonSum = () => {
    return selectedAddons.reduce((acc, id) => {
      const addon = ADDONS.find((a) => a.id === id);
      return acc + (addon ? addon.price : 0);
    }, 0);
  };

  const calculateTotal = () => {
    return selectedFacility.priceNum + calculateAddonSum();
  };

  const handleConfirmReservation = () => {
    const newBooking: BookingRecord = {
      id: 'BK-' + Math.random().toString(36).substring(2, 8).toUpperCase(),
      facilityName: selectedFacility.name,
      category: selectedFacility.category,
      coachName: selectedAddons.includes('coach-15') ? 'Coach Marcus Sterling (FIBA Certified)' : undefined,
      date: selectedDateObj.fullLabel,
      timeSlot: selectedSlot,
      courtNumber: selectedFacility.courtNumber,
      status: 'Confirmed',
      price: `$${calculateTotal()}`,
      qrPassCode: `PASS-${selectedFacility.courtNumber.replace(/\s+/g, '-').toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`,
    };

    onBookingConfirmed(newBooking);
    setConfirmedPass(newBooking);
  };

  return (
    <div className="w-full bg-[#F0F2F5] min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full space-y-6">
        
        {/* ========================================================================= */}
        {/* 1. PROFESSIONAL VENUE COMMAND HEADER & DATE STRIP */}
        {/* ========================================================================= */}
        <section className="bg-[#0c1017] rounded-3xl p-6 sm:p-8 text-white border border-white/10 shadow-xl relative overflow-hidden">
          {/* Subtle Ambient Laser Glow */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#FF4D00]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-1/3 w-64 h-64 bg-[#00E5FF]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6 pb-6 border-b border-white/15">
            <div>
              <div className="flex items-center gap-2 mb-2 font-tech">
                <span className="font-tech text-xs font-black uppercase tracking-widest text-[#FF4D00] bg-[#FF4D00]/15 px-2.5 py-0.5 rounded border border-[#FF4D00]/30 flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-[#FF4D00] animate-ping" />
                  <span>LIVE FACILITY DISPATCH</span>
                </span>
                <span className="text-white/40">•</span>
                <span className="text-xs font-bold text-[#94A3B8] uppercase">
                  SAN DIEGO CAMPUS (45,000 SQ FT)
                </span>
              </div>

              <h1 className="font-sport text-3xl sm:text-5xl lg:text-6xl font-black uppercase italic tracking-tight text-white leading-none">
                COURT & ARENA RESERVATION TERMINAL
              </h1>
            </div>

            {/* Live Facility Counters */}
            <div className="flex items-center gap-3 font-tech text-xs flex-shrink-0">
              <div className="bg-[#131922] px-4 py-2.5 rounded-2xl border border-white/15 flex items-center gap-3">
                <div className="w-2.5 h-2.5 rounded-full bg-[#16A34A] animate-pulse" />
                <div>
                  <p className="text-[10px] text-[#94A3B8] font-bold uppercase">LIVE AVAILABILITY</p>
                  <p className="text-sm font-black text-white">4 ARENAS ONLINE</p>
                </div>
              </div>

              <div className="bg-[#131922] px-4 py-2.5 rounded-2xl border border-white/15 flex items-center gap-3 hidden sm:flex">
                <ShieldCheck className="w-5 h-5 text-[#FF4D00]" />
                <div>
                  <p className="text-[10px] text-[#94A3B8] font-bold uppercase">ACCESS METHOD</p>
                  <p className="text-sm font-black text-white">INSTANT QR TURNSTILE</p>
                </div>
              </div>
            </div>
          </div>

          {/* 7-Day Interactive Date Strip */}
          <div className="pt-6">
            <div className="flex items-center justify-between mb-3 font-tech">
              <span className="text-xs font-black uppercase tracking-wider text-[#94A3B8] flex items-center gap-1.5">
                <CalendarIcon className="w-3.5 h-3.5 text-[#FF4D00]" />
                <span>SELECT RESERVATION DATE:</span>
              </span>
              <span className="text-xs font-bold text-[#00E5FF] uppercase">
                {selectedDateObj.fullLabel}
              </span>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-7 gap-2.5 font-tech">
              {CALENDAR_DATES.map((d) => {
                const isSelected = selectedDateObj.id === d.id;
                return (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setSelectedDateObj(d)}
                    className={`p-3 rounded-2xl border-2 transition-all cursor-pointer flex flex-col items-center justify-center text-center ${
                      isSelected
                        ? 'bg-[#FF4D00] text-white border-[#FF4D00] shadow-[0_0_18px_rgba(255,77,0,0.5)] scale-[1.02]'
                        : 'bg-[#131922] text-[#94A3B8] hover:text-white hover:bg-[#1c2430] border-white/10'
                    }`}
                  >
                    <span className="text-[10px] font-black uppercase tracking-wider opacity-90">
                      {d.dayName}
                    </span>
                    <span className="font-sport text-2xl font-black italic text-white my-0.5">
                      {d.dateNum}
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-widest">
                      {d.month}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. MAIN 2-COLUMN BOOKING MATRIX */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          
          {/* LEFT 8 COLUMNS: ARENA SELECTION, TIME SLOTS & ADD-ONS */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Arena / Facility Selectors */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E8F0] shadow-xs space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[#E2E8F0]">
                <div>
                  <h2 className="font-sport text-2xl font-black italic uppercase text-[#0c1017]">
                    AVAILABLE FACILITIES & COURTS
                  </h2>
                  <p className="text-xs text-[#64748B] font-sans">
                    Choose your target court, clay stadium, or sports science recovery suite.
                  </p>
                </div>

                {/* Category Filter Tabs */}
                <div className="flex items-center gap-1.5 overflow-x-auto pb-1 font-tech scrollbar-none">
                  {categories.map((cat) => {
                    const isActive = selectedCategory === cat;
                    return (
                      <button
                        key={cat}
                        type="button"
                        onClick={() => setSelectedCategory(cat)}
                        className={`px-3 py-1.5 rounded-xl text-xs font-black uppercase transition-all whitespace-nowrap cursor-pointer ${
                          isActive
                            ? 'bg-[#0c1017] text-white shadow-xs'
                            : 'bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] hover:text-[#0c1017]'
                        }`}
                      >
                        {cat === 'All' ? 'ALL' : cat.split(' ')[0]}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Facility Cards Grid (2x2) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {filteredFacilities.map((f) => {
                  const isSelected = selectedFacility.id === f.id;
                  return (
                    <div
                      key={f.id}
                      onClick={() => setSelectedFacility(f)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex flex-col justify-between relative overflow-hidden group ${
                        isSelected
                          ? 'border-[#FF4D00] bg-[#FF4D00]/5 shadow-md ring-2 ring-[#FF4D00]/20'
                          : 'border-[#E2E8F0] bg-[#F8FAFC] hover:border-[#CBD5E1] hover:bg-white'
                      }`}
                    >
                      <div className="h-40 rounded-xl overflow-hidden mb-3 relative bg-gray-100">
                        <img
                          src={f.image}
                          alt={f.name}
                          className="w-full h-full object-cover group-hover:scale-106 transition-transform duration-500"
                        />
                        <span className="absolute top-2.5 left-2.5 font-tech text-[10px] font-black uppercase tracking-wider bg-black/85 text-white px-2.5 py-0.5 rounded-md backdrop-blur-xs border border-white/15">
                          {f.badge}
                        </span>
                        <span className="absolute bottom-2.5 right-2.5 font-sport text-lg font-black italic bg-[#FF4D00] text-white px-2.5 py-0.5 rounded-md shadow-md">
                          {f.priceStr}
                        </span>
                      </div>

                      <div className="space-y-1.5">
                        <div className="flex justify-between items-center font-tech">
                          <span className="text-[11px] font-black text-[#00A0E7] uppercase tracking-wider">
                            {f.courtNumber}
                          </span>
                          <span className="text-[10px] font-bold text-[#64748B] uppercase">
                            {f.capacity}
                          </span>
                        </div>

                        <h3 className="font-sport text-xl font-black italic uppercase text-[#0c1017] leading-tight">
                          {f.name}
                        </h3>

                        <div className="pt-1 flex flex-wrap gap-1 font-tech">
                          {f.features.slice(0, 2).map((feat, i) => (
                            <span
                              key={i}
                              className="text-[9px] bg-white border border-[#E2E8F0] px-2 py-0.5 rounded text-[#475569] font-bold uppercase"
                            >
                              {feat}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Time Slot Matrix */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E8F0] shadow-xs space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0]">
                <div>
                  <h2 className="font-sport text-2xl font-black italic uppercase text-[#0c1017]">
                    SCHEDULE & HOURLY TIME SLOTS
                  </h2>
                  <p className="text-xs text-[#64748B] font-sans">
                    Select your preferred match or training block for {selectedDateObj.dayName} ({selectedDateObj.month} {selectedDateObj.dateNum}).
                  </p>
                </div>
                <span className="font-tech text-xs font-bold text-[#16A34A] bg-[#16A34A]/10 px-2.5 py-1 rounded-md hidden sm:inline-block">
                  ● INSTANT CONFIRMATION
                </span>
              </div>

              {/* Slot Cards Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-tech">
                {TIME_SLOTS.map((s) => {
                  const isSelected = selectedSlot === s.time;
                  return (
                    <button
                      key={s.time}
                      type="button"
                      onClick={() => setSelectedSlot(s.time)}
                      className={`p-3.5 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between ${
                        isSelected
                          ? 'bg-[#0c1017] text-white border-[#0c1017] shadow-lg scale-[1.01]'
                          : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-white text-[#0c1017]'
                      }`}
                    >
                      <div>
                        <span className={`text-[10px] font-black uppercase tracking-wider block ${isSelected ? 'text-[#FF4D00]' : 'text-[#64748B]'}`}>
                          {s.period}
                        </span>
                        <span className="text-xs font-black block mt-0.5">{s.time}</span>
                      </div>

                      <div className="flex items-center justify-between mt-2 pt-2 border-t border-black/10">
                        <span
                          className={`text-[9px] font-black uppercase ${
                            isSelected
                              ? 'text-[#00E5FF]'
                              : s.isPeak
                              ? 'text-amber-600'
                              : 'text-emerald-600'
                          }`}
                        >
                          {s.status}
                        </span>
                        <span className={`text-[9px] font-bold ${isSelected ? 'text-white/60' : 'text-[#94A3B8]'}`}>
                          {s.availableSpots} SPOTS
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Performance Add-ons */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-[#E2E8F0] shadow-xs space-y-4">
              <div className="pb-3 border-b border-[#E2E8F0]">
                <h2 className="font-sport text-2xl font-black italic uppercase text-[#0c1017]">
                  PRO EQUIPMENT & COACHING ADD-ONS
                </h2>
                <p className="text-xs text-[#64748B] font-sans">
                  Attach official match balls, recovery supplements, or professional coaching support.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-tech">
                {ADDONS.map((a) => {
                  const isChecked = selectedAddons.includes(a.id);
                  return (
                    <div
                      key={a.id}
                      onClick={() => toggleAddon(a.id)}
                      className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? 'bg-[#FF4D00]/5 border-[#FF4D00] shadow-xs'
                          : 'bg-[#F8FAFC] border-[#E2E8F0] hover:border-[#CBD5E1] hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div
                          className={`w-5 h-5 rounded-md flex items-center justify-center border-2 ${
                            isChecked
                              ? 'bg-[#FF4D00] border-[#FF4D00] text-white'
                              : 'bg-white border-[#CBD5E1]'
                          }`}
                        >
                          {isChecked && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                        </div>
                        <div>
                          <span className="text-xs font-black text-[#0c1017] block leading-tight">
                            {a.name}
                          </span>
                          <span className="text-[9px] font-bold text-[#64748B] uppercase">
                            {a.tag}
                          </span>
                        </div>
                      </div>
                      <span className="font-sport text-lg font-black italic text-[#FF4D00] flex-shrink-0 ml-2">
                        +${a.price}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* RIGHT 4 COLUMNS: REAL-TIME RESERVATION DOCK & CHECKOUT */}
          <div className="lg:col-span-4 sticky top-24 space-y-4">
            <div className="bg-[#0c1017] text-white rounded-3xl p-6 sm:p-7 shadow-2xl border-2 border-white/15 space-y-5 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF4D00]/25 rounded-full blur-2xl pointer-events-none" />

              {/* Card Header */}
              <div className="pb-4 border-b border-white/15 relative z-10 font-tech">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FF4D00] bg-[#FF4D00]/15 px-2.5 py-0.5 rounded border border-[#FF4D00]/30">
                    RESERVATION SUMMARY
                  </span>
                  <span className="text-[10px] font-bold text-[#16A34A] flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#16A34A] animate-ping" />
                    <span>SLOT LOCKED</span>
                  </span>
                </div>
                <h3 className="font-sport text-2xl font-black italic uppercase text-white mt-2 leading-tight">
                  {selectedFacility.name}
                </h3>
              </div>

              {/* Line Items */}
              <div className="space-y-3 font-tech text-xs relative z-10">
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-[#94A3B8]">DATE:</span>
                  <strong className="text-white font-black">{selectedDateObj.dayName}, {selectedDateObj.month} {selectedDateObj.dateNum}, 2026</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-[#94A3B8]">TIME SLOT:</span>
                  <strong className="text-[#00E5FF] font-black">{selectedSlot}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-[#94A3B8]">COURT LOCATION:</span>
                  <strong className="text-white font-bold">{selectedFacility.courtNumber}</strong>
                </div>
                <div className="flex justify-between py-1.5 border-b border-white/10">
                  <span className="text-[#94A3B8]">BASE FACILITY RATE:</span>
                  <span className="text-white font-sport text-base font-black italic">{selectedFacility.priceStr}</span>
                </div>

                {selectedAddons.length > 0 && (
                  <div className="py-2 border-b border-white/10 space-y-1.5">
                    <span className="text-[10px] text-[#94A3B8] font-bold uppercase block">ATTACHED ADD-ONS:</span>
                    {selectedAddons.map((id) => {
                      const a = ADDONS.find((item) => item.id === id);
                      return (
                        <div key={id} className="flex justify-between text-[11px] text-white/90">
                          <span>• {a?.name}</span>
                          <span className="text-[#FF4D00] font-black">+${a?.price}</span>
                        </div>
                      );
                    })}
                  </div>
                )}

                {/* Athlete Passport Information */}
                {currentUser && (
                  <div className="p-3 bg-[#131922] rounded-xl border border-white/10 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <img
                        src={currentUser.avatar}
                        alt={currentUser.name}
                        className="w-6 h-6 rounded-md object-cover border border-[#FF4D00]"
                      />
                      <span className="text-[11px] text-white font-black uppercase">{currentUser.name}</span>
                    </div>
                    <span className="text-[9px] text-[#FF4D00] font-black uppercase">
                      {currentUser.membershipTier}
                    </span>
                  </div>
                )}

                {/* Total */}
                <div className="pt-2 flex justify-between items-baseline font-sport text-3xl font-black italic">
                  <span className="text-white">TOTAL CHARGE:</span>
                  <span className="text-[#FF4D00] drop-shadow-md">${calculateTotal()}</span>
                </div>
              </div>

              {/* Confirm Reservation Action */}
              <button
                type="button"
                onClick={handleConfirmReservation}
                className="font-tech w-full bg-gradient-to-r from-[#FF4D00] via-[#FF600A] to-[#E03A00] hover:from-[#e03a00] hover:to-[#b82e00] text-white py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer shadow-[0_0_20px_rgba(255,77,0,0.55)] flex items-center justify-center gap-2 animate-shine relative z-10 border border-white/20 active:scale-98"
              >
                <QrCode className="w-4 h-4" />
                <span>CONFIRM & ISSUE DIGITAL PASS</span>
              </button>

              <div className="flex items-center gap-2 text-[10px] font-tech text-[#94A3B8] justify-center text-center">
                <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" />
                <span>RFID TURNSTILE GATE CODE GENERATED INSTANTLY</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 3. CONFIRMED DIGITAL PASS MODAL */}
      {/* ========================================================================= */}
      <AnimatePresence>
        {confirmedPass && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setConfirmedPass(null)}
              className="absolute inset-0 bg-black/80 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 15 }}
              className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl border border-[#E2E8F0] z-10 text-center font-tech space-y-4"
            >
              <div className="w-14 h-14 bg-[#16A34A]/10 text-[#16A34A] rounded-2xl flex items-center justify-center mx-auto shadow-inner border border-[#16A34A]/20">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <span className="text-[10px] font-black uppercase tracking-widest bg-[#16A34A]/10 text-[#16A34A] px-3 py-1 rounded-md border border-[#16A34A]/20 inline-block">
                PASS ISSUED & ACTIVE
              </span>

              <h3 className="font-sport text-3xl font-black italic uppercase text-[#0c1017]">
                {confirmedPass.facilityName}
              </h3>

              <p className="text-xs text-[#64748B]">
                {confirmedPass.date} • {confirmedPass.timeSlot}
              </p>

              {/* QR Code Pass */}
              <div className="w-48 h-48 bg-white p-3 rounded-2xl border-2 border-dashed border-[#FF4D00] mx-auto my-3 flex items-center justify-center shadow-inner">
                <QrCode className="w-full h-full text-[#0c1017]" />
              </div>

              <div className="bg-[#F8FAFC] p-3 rounded-xl border border-[#E2E8F0] text-xs">
                <span className="text-[#94A3B8] block text-[10px] font-bold uppercase">RFID TURNSTILE PASSCODE</span>
                <strong className="text-[#0c1017] font-mono tracking-widest text-sm font-black">{confirmedPass.qrPassCode}</strong>
              </div>

              <div className="flex flex-col gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => {
                    setConfirmedPass(null);
                    onNavigateDashboard();
                  }}
                  className="w-full bg-[#0c1017] hover:bg-[#FF4D00] text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer shadow-md"
                >
                  VIEW IN ATHLETE DASHBOARD
                </button>

                <button
                  type="button"
                  onClick={() => setConfirmedPass(null)}
                  className="w-full py-2.5 text-xs text-[#64748B] hover:text-[#0c1017] font-bold uppercase cursor-pointer"
                >
                  CLOSE
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
