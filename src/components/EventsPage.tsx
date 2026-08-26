import { useState, useMemo } from 'react';
import {
  Calendar as CalendarIcon,
  Trophy,
  MapPin,
  Clock,
  Users,
  Search,
  SlidersHorizontal,
  ArrowRight,
  Sparkles,
  Zap,
  Check,
  X,
  Share2,
  CalendarCheck,
  Shield,
  Medal,
  Flame,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EventsPageProps {
  onSelectEvent: (eventName: string, price?: string) => void;
  onOpenGetInTouch: () => void;
}

export interface EventItem {
  id: string;
  title: string;
  category: 'Tournament' | 'Clinic' | 'Social' | 'Youth';
  sport: 'Basketball' | 'Tennis' | 'Training' | 'All-Sport';
  date: string;
  time: string;
  location: string;
  price: string;
  prizePool?: string;
  spotsLeft: number;
  totalCapacity: number;
  image: string;
  badge?: string;
  description: string;
  rules: string[];
  perks: string[];
  instructor?: string;
}

const EVENTS_DATA: EventItem[] = [
  {
    id: 'granger-3x3-championship',
    title: 'GRANGER ALL-STAR 3X3 BASKETBALL CHAMPIONSHIP',
    category: 'Tournament',
    sport: 'Basketball',
    date: 'MARCH 14-15, 2026',
    time: '09:00 AM - 07:00 PM EST',
    location: 'MAIN INDOOR HARDWOOD ARENA (COURTS 1 & 2)',
    price: '$120 / TEAM',
    prizePool: '$5,000 CASH + MVP TROPHY',
    spotsLeft: 4,
    totalCapacity: 32,
    image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1400&q=85',
    badge: 'MARQUEE EVENT',
    description: 'Double elimination 3x3 championship sanctioned with official FIBA rules, electronic shot clocks, referee crews, and live HD telemetry streaming.',
    rules: [
      '3-4 players per roster (1 substitute)',
      '10-minute games or first to 21 points',
      'Official Wilson composite match balls supplied',
      'Certified referee and scorekeepers provided',
    ],
    perks: [
      'Official Granger reversible tournament jersey for all players',
      'Recovery Hydration & Whey pack at the lounge',
      'High-res photo pack and highlight reel clips',
    ],
    instructor: 'Head Coach Marcus Vance',
  },
  {
    id: 'clay-masters-open',
    title: 'SUNSET CLAY COURT TENNIS MASTERS (SINGLES & DOUBLES)',
    category: 'Tournament',
    sport: 'Tennis',
    date: 'MARCH 21-22, 2026',
    time: '08:30 AM - 06:00 PM EST',
    location: 'GRANGER OUTDOOR ROLAND-CLAY STADIUM',
    price: '$65 / PLAYER',
    prizePool: '$3,500 + GRANGER GEAR PACK',
    spotsLeft: 6,
    totalCapacity: 24,
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1400&q=85',
    badge: 'SELLING FAST',
    description: 'Experience European red clay under tournament-standard floodlights. Open brackets for Men\'s, Women\'s, and Mixed Doubles.',
    rules: [
      'Best of 3 sets (10-point match tiebreak in final set)',
      'ITF tournament regulation felt balls provided per match',
      'Clay court tennis shoes strictly required',
    ],
    perks: [
      'Complimentary racket restringing on-site',
      'Post-match hydrotherapy and cold plunge access',
      'Sunset champagne mixer entry ticket',
    ],
    instructor: 'Director Elena Rostova',
  },
  {
    id: 'breathwork-mobility-workshop',
    title: 'HIGH-PERFORMANCE BREATHWORK & ATHLETIC MOBILITY LAB',
    category: 'Clinic',
    sport: 'Training',
    date: 'MARCH 28, 2026',
    time: '10:00 AM - 01:00 PM EST',
    location: 'MIND-BODY RECOVERY SUITE & OXYGEN LOUNGE',
    price: '$45 / PERSON',
    spotsLeft: 8,
    totalCapacity: 20,
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=1400&q=85',
    badge: 'WELLNESS CLINIC',
    description: 'Master diaphragmatic nervous system regulation, thoracic spine decompression, and active hip mobility to elevate recovery and injury resistance.',
    rules: [
      'Open to all fitness levels and athletes',
      'Please arrive 15 minutes early for baseline HRV screening',
      'Wear comfortable athletic clothing',
    ],
    perks: [
      'Personalized biometric mobility scorecard',
      'Electrolyte hydration pack & smoothie bowl',
      'Take-home 14-day mobility digital protocol',
    ],
    instructor: 'Dr. Sarah Lin (Chief Sports Scientist)',
  },
  {
    id: 'friday-night-shootout',
    title: 'FRIDAY NIGHT LIGHTS: 3-POINT SHOOTOUT & DJ SOCIAL MIXER',
    category: 'Social',
    sport: 'Basketball',
    date: 'APRIL 03, 2026',
    time: '06:30 PM - 10:30 PM EST',
    location: 'GRANGER SKYLINE COURT & CLUB TERRACE',
    price: '$25 / ENTRY',
    prizePool: 'GRANGER VIP 1-YEAR PASS + CASH PRIZE',
    spotsLeft: 14,
    totalCapacity: 50,
    image: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?auto=format&fit=crop&w=1400&q=85',
    badge: 'COMMUNITY NIGHT',
    description: 'Our signature monthly social sportainment evening. Timed 3-point contest, pick-up King of the Court, live vinyl DJ, and gourmet nutrition bar.',
    rules: [
      '60 seconds to shoot 5 racks around the arc',
      'Money ball rack counts for double points',
      'Top 4 shooters advance to championship round under spotlights',
    ],
    perks: [
      '2 Complimentary signature recovery mocktails or craft beverages',
      'Entry into the $1,000 door prize raffle',
      'Granger commemorative wristband',
    ],
    instructor: 'Coach Jamal Sterling & Special Guests',
  },
  {
    id: 'youth-spring-academy',
    title: 'GRANGER JUNIOR ELITE SKILLS CAMP (AGES 10-16)',
    category: 'Youth',
    sport: 'All-Sport',
    date: 'APRIL 10-12, 2026',
    time: '09:00 AM - 03:00 PM DAILY',
    location: 'MULTI-SPORT TRAINING COMPLEX',
    price: '$180 / CAMP',
    spotsLeft: 9,
    totalCapacity: 30,
    image: 'https://images.unsplash.com/photo-1526676037777-05a232554f77?auto=format&fit=crop&w=1400&q=85',
    badge: 'YOUTH ACADEMY',
    description: 'Intensive 3-day development camp focused on footwork, basketball IQ, tennis mechanics, athletic agility, and sportsmanship values.',
    rules: [
      'Divided into two age brackets (Ages 10-12 & 13-16)',
      '1:6 Coach-to-athlete maximum ratio for individual coaching attention',
      'Supervised lunch and hydration breaks included',
    ],
    perks: [
      'Official Granger Youth Academy Jersey & Swag Bag',
      'Comprehensive Coach Evaluation Report & Video Analysis',
      'End-of-camp medal ceremony and parent showcase match',
    ],
    instructor: 'Head Youth Coach David Perez',
  },
  {
    id: 'obstacle-endurance-challenge',
    title: 'GRANGER BEAST: OUTDOOR FUNCTIONAL OBSTACLE VELOCITY COURSE',
    category: 'Tournament',
    sport: 'Training',
    date: 'APRIL 25, 2026',
    time: '07:30 AM - 01:00 PM EST',
    location: 'OUTDOOR TURF ARENA & TRAIL COURSE',
    price: '$50 / ATHLETE',
    prizePool: '$2,000 + CUSTOM ENGRAVED MEDALS',
    spotsLeft: 18,
    totalCapacity: 60,
    image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1400&q=85',
    badge: 'ENDURANCE',
    description: 'Test your raw power, stamina, and agility over 12 functional obstacles including sled pushes, rope climbs, sandbag carries, and agility hurdles.',
    rules: [
      'Timed chip-enabled individual heats every 5 minutes',
      'Penalty burpees for incomplete obstacle attempts',
      'Men\'s, Women\'s, and Masters (40+) division leaderboards',
    ],
    perks: [
      'Custom Granger Finisher Medal & Tech T-Shirt',
      'Post-race cryotherapy session voucher',
      'Live leaderboards and instant finish photo badge',
    ],
    instructor: 'Conditioning Specialist Maya Thorne',
  },
];

import { TournamentBracket } from './TournamentBracket';

export function EventsPage({ onSelectEvent, onOpenGetInTouch }: EventsPageProps) {
  const [viewMode, setViewMode] = useState<'calendar' | 'bracket'>('calendar');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedSport, setSelectedSport] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedEventModal, setSelectedEventModal] = useState<EventItem | null>(null);

  const categories = [
    { id: 'All', label: 'All Circuits' },
    { id: 'Tournament', label: 'Tournaments & Cups' },
    { id: 'Clinic', label: 'Clinics & Labs' },
    { id: 'Social', label: 'Social & Mixers' },
    { id: 'Youth', label: 'Youth Academy' },
  ];

  const sports = ['All', 'Basketball', 'Tennis', 'Training', 'All-Sport'];

  const filteredEvents = useMemo(() => {
    return EVENTS_DATA.filter((event) => {
      if (selectedCategory !== 'All' && event.category !== selectedCategory) {
        return false;
      }
      if (selectedSport !== 'All' && event.sport !== selectedSport && event.sport !== 'All-Sport') {
        return false;
      }
      if (
        searchQuery.trim() !== '' &&
        !event.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !event.description.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !event.location.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      return true;
    });
  }, [selectedCategory, selectedSport, searchQuery]);

  return (
    <div className="w-full bg-[#F0F2F5] min-h-screen pt-24 pb-20">
      {/* 1. EDITORIAL HEADER & MARQUEE ANNOUNCEMENT */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pt-4 pb-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 sm:pb-8 border-b border-[#E2E8F0]">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-2.5 sm:mb-3">
                <span className="font-tech text-[11px] sm:text-xs font-black uppercase tracking-widest text-[#FF671C] bg-[#FF671C]/10 px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-md border border-[#FF671C]/20">
                  OFFICIAL CALENDAR 2026
                </span>
                <span className="text-xs text-[#94A3B8]">•</span>
                <span className="font-tech text-[11px] sm:text-xs font-bold text-[#64748B] uppercase">
                  SANCTIONED LEAGUES & MIXERS
                </span>
              </div>

              <h1 className="font-sport text-4xl sm:text-6xl md:text-7xl font-black uppercase italic tracking-tight text-[#0c1017] leading-[0.92]">
                TOURNAMENTS, CLINICS & SPORTAINMENT EVENTS.
              </h1>

              <p className="text-[#64748B] text-xs sm:text-base mt-3 sm:mt-4 font-sans leading-relaxed">
                Compete under professional arena floodlights, train directly with Olympic coaching staff, or connect with passionate athletes during our curated weekend leagues.
              </p>
            </div>

            {/* Right Action: Host Private Event */}
            <div className="flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3 flex-shrink-0">
              <button
                onClick={onOpenGetInTouch}
                className="font-tech bg-[#FF671C] hover:bg-[#e05615] text-white px-5 py-3 rounded-xl font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer w-full sm:w-auto"
              >
                <Trophy className="w-4 h-4 text-white" />
                <span>HOST A TOURNAMENT / EVENT</span>
              </button>

              <div className="flex items-center justify-center gap-2 sm:gap-3 text-[11px] sm:text-xs font-tech font-bold text-[#64748B] uppercase">
                <span>FIBA & USATT ACCREDITED</span>
                <span>•</span>
                <span>LIVE BROADCAST READY</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* View Switcher Bar */}
      <section className="w-full px-4 sm:px-6 lg:px-8 mb-6">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-center gap-3 bg-white p-2 rounded-2xl border border-[#E2E8F0] shadow-xs font-tech max-w-md">
            <button
              type="button"
              onClick={() => setViewMode('calendar')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                viewMode === 'calendar'
                  ? 'bg-[#0c1017] text-white shadow-xs'
                  : 'text-[#64748B] hover:text-[#0c1017]'
              }`}
            >
              CIRCUITS & CLINICS
            </button>
            <button
              type="button"
              onClick={() => setViewMode('bracket')}
              className={`flex-1 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                viewMode === 'bracket'
                  ? 'bg-[#FF671C] text-white shadow-xs'
                  : 'text-[#64748B] hover:text-[#0c1017]'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>LIVE ARENA BRACKET</span>
            </button>
          </div>
        </div>
      </section>

      {viewMode === 'bracket' ? (
        <section className="w-full px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto w-full">
            <TournamentBracket />
          </div>
        </section>
      ) : (
        <>
          {/* 2. FILTER & SEARCH CONTROL BAR */}
          <section className="w-full px-4 sm:px-6 lg:px-8 mb-6 sm:mb-8">
            <div className="max-w-7xl mx-auto w-full bg-white rounded-3xl p-4 sm:p-5 border border-[#E2E8F0] shadow-xs space-y-3.5 sm:space-y-4 font-tech">
          {/* Top Row: Category Tabs & Result Count */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 sm:gap-4">
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
                        layoutId="eventsCategoryIndicator"
                        className="absolute inset-0 bg-[#FF671C] rounded-xl shadow-xs -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span>{cat.label}</span>
                  </button>
                );
              })}
            </div>

            <div className="text-xs text-[#94A3B8] font-bold uppercase self-end md:self-center">
              {filteredEvents.length} SCHEDULED EVENTS
            </div>
          </div>

          {/* Bottom Row: Search Field & Sport Pills */}
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-3 pt-3 border-t border-[#E2E8F0]">
            {/* Search Input Field */}
            <div className="relative flex-grow max-w-full lg:max-w-md">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="SEARCH TOURNAMENTS, CLINICS, ARENAS..."
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
          </div>
        </div>
      </section>

      {/* 3. EVENT GRID */}
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          {filteredEvents.length === 0 ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="bg-white rounded-3xl p-12 text-center border border-[#E2E8F0] shadow-2xs max-w-lg mx-auto"
            >
              <CalendarIcon className="w-12 h-12 text-[#94A3B8] mx-auto mb-3" />
              <h3 className="font-sport text-2xl font-black italic uppercase text-[#0c1017]">NO EVENTS FOUND</h3>
              <p className="text-xs text-[#64748B] mt-2 mb-6 font-sans">
                Adjust your category or sport filters to explore other scheduled tournaments.
              </p>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={() => {
                  setSelectedCategory('All');
                  setSelectedSport('All');
                  setSearchQuery('');
                }}
                className="font-tech bg-[#FF671C] text-white px-5 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider cursor-pointer"
              >
                RESET FILTERS
              </motion.button>
            </motion.div>
          ) : (
            <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              <AnimatePresence>
                {filteredEvents.map((event) => (
                  <motion.div
                    layout="position"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    whileHover={{ y: -6 }}
                    key={event.id}
                    className="group bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
                  >
                    {/* Top Event Cover Image */}
                    <div className="relative w-full h-56 overflow-hidden bg-black/10">
                      <img
                        src={event.image}
                        alt={event.title}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                      {/* Badges on top */}
                      <div className="absolute top-4 left-4 z-10 flex items-center gap-2 font-tech">
                        {event.badge && (
                          <span className="px-3 py-1 rounded-md bg-[#FF671C] text-white text-[10px] font-black uppercase tracking-wider shadow-xs">
                            {event.badge}
                          </span>
                        )}
                        <span className="px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-white text-[10px] font-black uppercase tracking-wider border border-white/20">
                          {event.sport}
                        </span>
                      </div>

                      {/* Spots left pill */}
                      <div className="absolute top-4 right-4 z-10">
                        <span className="font-tech px-2.5 py-1 rounded-md bg-black/70 backdrop-blur-md text-[#FF671C] text-[10px] font-black tracking-wide border border-white/15 flex items-center gap-1 uppercase">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#FF671C] animate-pulse" />
                          {event.spotsLeft} SPOTS LEFT
                        </span>
                      </div>

                      {/* Date & Time overlay in image bottom */}
                      <div className="absolute bottom-3 left-4 right-4 z-10 text-white flex items-center justify-between text-xs font-tech">
                        <div className="flex items-center gap-1.5 font-bold">
                          <CalendarIcon className="w-3.5 h-3.5 text-[#FF671C]" />
                          <span>{event.date}</span>
                        </div>
                        <div className="flex items-center gap-1 text-white/80 text-[11px]">
                          <Clock className="w-3 h-3" />
                          <span>{event.time.split(' - ')[0]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Event Body Content */}
                    <div className="p-6 flex-grow flex flex-col justify-between">
                      <div>
                        {/* Location */}
                        <div className="flex items-center gap-1.5 text-xs font-tech font-bold text-[#64748B] mb-2 uppercase">
                          <MapPin className="w-3.5 h-3.5 text-[#FF671C] flex-shrink-0" />
                          <span className="line-clamp-1">{event.location}</span>
                        </div>

                        {/* Title */}
                        <h3 className="font-sport text-2xl font-black italic uppercase text-[#0c1017] leading-tight group-hover:text-[#FF671C] transition-colors">
                          {event.title}
                        </h3>

                        {/* Description */}
                        <p className="text-xs text-[#64748B] mt-2.5 line-clamp-2 leading-relaxed font-sans">
                          {event.description}
                        </p>

                        {/* Prize pool / Key feature callout */}
                        {event.prizePool && (
                          <div className="mt-4 p-2.5 rounded-xl bg-[#FF671C]/10 border border-[#FF671C]/20 flex items-center gap-2 font-tech">
                            <Trophy className="w-4 h-4 text-[#FF671C] flex-shrink-0" />
                            <span className="text-xs font-black uppercase text-[#FF671C] line-clamp-1">
                              PRIZE POOL: {event.prizePool}
                            </span>
                          </div>
                        )}
                      </div>

                      {/* Footer Action & Registration */}
                      <div className="pt-5 mt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                        <div>
                          <span className="font-tech text-[10px] font-black uppercase tracking-wider text-[#64748B] block">
                            REGISTRATION FEE
                          </span>
                          <span className="font-sport text-2xl font-black italic text-[#0c1017]">
                            {event.price}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setSelectedEventModal(event)}
                            className="p-2.5 rounded-xl border border-[#E2E8F0] text-[#64748B] hover:text-[#0c1017] hover:border-[#0c1017] transition-all cursor-pointer"
                            title="View Details"
                          >
                            <Shield className="w-4 h-4" />
                          </button>

                          <button
                            onClick={() => onSelectEvent(event.title, event.price)}
                            className="font-tech bg-[#FF671C] hover:bg-[#e05615] text-white px-4 py-2.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-xs active:scale-95 transition-all cursor-pointer"
                          >
                            <span>REGISTER</span>
                            <ArrowRight className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </div>
      </section>
    </>
  )}

      {/* 4. EVENT DETAILS MODAL */}
      <AnimatePresence>
        {selectedEventModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedEventModal(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-xs"
            />

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="relative z-10 bg-white rounded-3xl max-w-2xl w-full p-4 sm:p-6 md:p-8 shadow-2xl border border-[#E2E8F0] overflow-y-auto max-h-[88vh] text-[#0c1017]"
            >
              <button
                onClick={() => setSelectedEventModal(null)}
                className="absolute top-4 right-4 p-2 text-[#64748B] hover:text-[#0c1017] rounded-full hover:bg-black/5 z-20 cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>

              {/* High-Resolution Event Image Banner in Modal */}
              <div className="relative w-full h-40 sm:h-52 md:h-56 rounded-2xl overflow-hidden mb-5 border border-black/5 bg-[#0c1017]">
                <img
                  src={selectedEventModal.image}
                  alt={selectedEventModal.title}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/20" />
                <div className="absolute bottom-3 left-4 right-4 flex items-center justify-between text-white font-tech text-xs">
                  <span className="font-bold bg-[#FF671C] px-2.5 py-1 rounded-md text-[10px] tracking-wider uppercase">
                    {selectedEventModal.prizePool ? selectedEventModal.prizePool : 'SANCTIONED EVENT'}
                  </span>
                  <span className="bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-md text-[10px] uppercase border border-white/20">
                    {selectedEventModal.spotsLeft} SPOTS REMAINING
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2 mb-2 font-tech">
                <span className="px-3 py-1 rounded-md bg-[#FF671C] text-white text-[11px] font-black uppercase tracking-wider">
                  {selectedEventModal.category}
                </span>
                <span className="text-xs text-[#94A3B8]">•</span>
                <span className="text-xs font-bold text-[#00a0e7] uppercase">
                  {selectedEventModal.sport}
                </span>
              </div>

              <h2 className="font-sport text-3xl sm:text-4xl font-black italic uppercase text-[#0c1017] leading-tight">
                {selectedEventModal.title}
              </h2>

              {/* Event Metadata Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 my-4 p-4 rounded-2xl bg-[#F8FAFC] border border-[#E2E8F0] text-xs font-tech">
                <div className="flex items-center gap-2">
                  <CalendarIcon className="w-4 h-4 text-[#FF671C]" />
                  <div>
                    <p className="font-bold text-[#0c1017] uppercase">Date & Schedule</p>
                    <p className="text-[#64748B]">{selectedEventModal.date}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[#00a0e7]" />
                  <div>
                    <p className="font-bold text-[#0c1017] uppercase">Time Slot</p>
                    <p className="text-[#64748B]">{selectedEventModal.time}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2 sm:col-span-2">
                  <MapPin className="w-4 h-4 text-[#16A34A]" />
                  <div>
                    <p className="font-bold text-[#0c1017] uppercase">Venue Location</p>
                    <p className="text-[#64748B]">{selectedEventModal.location}</p>
                  </div>
                </div>
              </div>

              <p className="text-xs sm:text-sm text-[#475569] leading-relaxed mb-4 font-sans">
                {selectedEventModal.description}
              </p>

              {/* Rules & Guidelines */}
              <div className="mb-4">
                <h4 className="font-tech text-xs font-black text-[#0c1017] uppercase tracking-wider mb-2">
                  TOURNAMENT RULES & FORMAT:
                </h4>
                <ul className="space-y-1.5">
                  {selectedEventModal.rules.map((rule, idx) => (
                    <li key={idx} className="text-xs text-[#64748B] flex items-start gap-2 font-sans">
                      <Check className="w-3.5 h-3.5 text-[#16A34A] flex-shrink-0 mt-0.5" />
                      <span>{rule}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Participant Perks */}
              <div className="mb-6">
                <h4 className="font-tech text-xs font-black text-[#0c1017] uppercase tracking-wider mb-2">
                  INCLUDED ATHLETE PERKS:
                </h4>
                <ul className="space-y-1.5">
                  {selectedEventModal.perks.map((perk, idx) => (
                    <li key={idx} className="text-xs text-[#64748B] flex items-start gap-2 font-sans">
                      <Sparkles className="w-3.5 h-3.5 text-[#FF671C] flex-shrink-0 mt-0.5" />
                      <span>{perk}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* CTA footer inside modal */}
              <div className="pt-4 border-t border-[#E2E8F0] flex items-center justify-between">
                <div>
                  <span className="font-tech text-[10px] font-black text-[#64748B] uppercase">ENTRY TICKET</span>
                  <p className="font-sport text-3xl font-black italic text-[#FF671C]">
                    {selectedEventModal.price}
                  </p>
                </div>

                <button
                  onClick={() => {
                    const evt = selectedEventModal;
                    setSelectedEventModal(null);
                    onSelectEvent(evt.title, evt.price);
                  }}
                  className="font-tech bg-[#FF671C] hover:bg-[#e05615] text-white px-6 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 shadow-md transition-all cursor-pointer"
                >
                  <CalendarCheck className="w-4 h-4" />
                  <span>CONFIRM REGISTRATION</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
