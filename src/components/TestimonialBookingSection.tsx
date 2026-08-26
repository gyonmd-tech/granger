import { useState, useEffect } from 'react';
import { Star, ShieldCheck, Flame, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface TestimonialBookingSectionProps {
  onBookNow: () => void;
}

interface TestimonialItem {
  id: string;
  name: string;
  role: string;
  avatar: string;
  quote: string;
  rating: number;
  highlight: string;
}

const TESTIMONIALS: TestimonialItem[] = [
  {
    id: '1',
    name: 'BENEDETA CHAN',
    role: 'COMPETITIVE RACQUET MEMBER • SAN DIEGO',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5Kk4BuVQuQ90rhw435IEJe6Ifa12t_BvLPxYfgqDFKaRMeGkc3Be63EYvPbxoVTP67sEpkWE2OtqO627VhoGlTd-fV3JOr1JYFwiW9r-DNtJ428a_sTrHD_lOzNR19UcczLvLwm2MygI0TXSXaclXR7Pv0sHsjNL_qPXEAsf_teXZxY1e71cQ5mhODopn0-gsqo8eCC9hAf3oVW4YZUV8HuyLRnEZ78t2A985Ltc1dnpfnERmdYY9_A',
    quote: 'THE TELEMETRY KEEPS ME ON TRACK, AND THE OLYMPIC COACHES PUSH ME TO TRANSCEND MY LIMITS. IT\'S THE ULTIMATE MIX OF ATHLETIC DISCIPLINE AND VIBRANT COMMUNITY.',
    rating: 5,
    highlight: 'RACQUET TELEMETRY',
  },
  {
    id: '2',
    name: 'MARCUS STERLING',
    role: 'PRO HARDWOOD ATHLETE • LOS ANGELES',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    quote: 'THE BIOMECHANIC FORCE PLATES AND SHOT CALIBRATION ELEVATED MY RELEASE ARC TO CHAMPIONSHIP ACCURACY. GRANGER IS IN A LEAGUE OF ITS OWN.',
    rating: 5,
    highlight: 'FORCE PLATE ANALYSIS',
  },
  {
    id: '3',
    name: 'MAYA THORNE',
    role: 'OLYMPIC SPRINT COACH • PARIS DIVISION',
    avatar: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80',
    quote: 'WE FUSE CELLULAR CRYO-RECOVERY WITH HIGH-VELOCITY TRACK SPRINT LABS. OUR ALUMNI HAVE SECURED MULTIPLE PODIUM FINISHES ON THE WORLD STAGE.',
    rating: 5,
    highlight: 'OLYMPIC CONDITIONING',
  },
];

export function TestimonialBookingSection({ onBookNow }: TestimonialBookingSectionProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [isPaused]);

  const current = TESTIMONIALS[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  return (
    <section className="w-full py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#F0F2F5] overflow-hidden">
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        {/* Left Column: Testimonial Carousel */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="flex flex-col gap-5 sm:gap-6 relative"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF671C] animate-pulse" />
              <span className="font-tech text-xs font-black uppercase tracking-widest text-[#FF671C]">
                ATHLETE DISPATCH • 0{currentIndex + 1} / 0{TESTIMONIALS.length}
              </span>
            </div>

            {/* Prev/Next Carousel Arrows */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handlePrev}
                aria-label="Previous testimonial"
                className="w-9 h-9 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#FF671C] text-[#0c1017] hover:text-[#FF671C] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-90"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={handleNext}
                aria-label="Next testimonial"
                className="w-9 h-9 rounded-xl bg-white border border-[#E2E8F0] hover:border-[#FF671C] text-[#0c1017] hover:text-[#FF671C] flex items-center justify-center transition-all cursor-pointer shadow-xs active:scale-90"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className="space-y-5"
            >
              {/* Star Rating & Highlight Badge */}
              <div className="flex items-center gap-3">
                <div className="flex gap-1 text-[#FF671C]">
                  {[...Array(current.rating)].map((_, idx) => (
                    <Star key={idx} className="w-4 h-4 sm:w-5 sm:h-5 fill-[#FF671C] text-[#FF671C]" />
                  ))}
                </div>
                <span className="font-tech text-[10px] font-black uppercase tracking-wider bg-[#FF671C]/10 text-[#FF671C] px-2.5 py-0.5 rounded-md border border-[#FF671C]/20">
                  {current.highlight}
                </span>
              </div>

              {/* Quote with Bold Sport Display */}
              <blockquote className="font-sport text-2xl sm:text-4xl md:text-5xl font-black uppercase italic text-[#0c1017] leading-[0.98] tracking-tight min-h-[120px] sm:min-h-[140px]">
                "{current.quote}"
              </blockquote>

              {/* User Info */}
              <div className="flex items-center gap-3 sm:gap-4 mt-2">
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-gray-200 flex-shrink-0">
                  <img
                    src={current.avatar}
                    alt={current.name}
                    loading="lazy"
                    decoding="async"
                    referrerPolicy="no-referrer"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <p className="font-sport text-xl sm:text-2xl font-black italic uppercase text-[#0c1017]">{current.name}</p>
                  <p className="font-tech text-[10px] sm:text-xs font-bold text-[#64748B] uppercase tracking-wider">
                    {current.role}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Carousel Dots */}
          <div className="flex items-center gap-2 pt-2">
            {TESTIMONIALS.map((t, idx) => (
              <button
                key={t.id}
                onClick={() => setCurrentIndex(idx)}
                aria-label={`Go to slide ${idx + 1}`}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  currentIndex === idx ? 'w-8 bg-[#FF671C]' : 'w-2 bg-[#CBD5E1] hover:bg-[#94A3B8]'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Right Column: Trainer Booking Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.52, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          whileHover={{ y: -6 }}
          className="relative rounded-3xl overflow-hidden border border-[#E2E8F0] min-h-[420px] sm:min-h-[460px] flex flex-col justify-between p-5 sm:p-7 md:p-9 shadow-md hover:shadow-2xl transition-all duration-300 group bg-[#0c1017]"
        >
          {/* Background image with subtle zoom on hover */}
          <img
            src="https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1400&q=85"
            alt="Granger Professional Coaching Session"
            loading="lazy"
            decoding="async"
            referrerPolicy="no-referrer"
            className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
          />
          {/* Multi-layer Gradient Overlay for crisp text and badge contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/55 to-black/35" />

          {/* Top Header with Badges in Flow */}
          <div className="relative z-10 flex flex-wrap items-center justify-between gap-2 sm:gap-3">
            <span className="font-tech bg-white/95 backdrop-blur-md px-3 py-1.5 rounded-xl text-[11px] sm:text-xs font-black uppercase text-[#0c1017] shadow-sm border border-white/40 flex items-center gap-1.5">
              <Flame className="w-3.5 h-3.5 text-[#FF671C]" />
              <span>PROFESSIONAL COACH SESSION</span>
            </span>

            <span className="font-sport bg-[#FF671C] text-white px-3.5 py-1 sm:px-4 sm:py-1.5 rounded-xl font-black italic text-xl sm:text-2xl shadow-lg flex items-baseline gap-1 animate-pulse">
              $99 <span className="font-tech text-[10px] sm:text-xs font-bold uppercase not-italic opacity-90">/ SESSION</span>
            </span>
          </div>

          {/* Bottom CTA content in Flow */}
          <div className="relative z-10 mt-auto pt-10 sm:pt-16">
            <div className="flex items-center gap-2 mb-2 font-tech text-xs font-bold text-white/80 uppercase tracking-wider">
              <ShieldCheck className="w-4 h-4 text-[#FF671C]" />
              <span>1-ON-1 MASTER CLINIC • BIOMECHANIC FEEDBACK</span>
            </div>
            <h3 className="font-sport text-3xl sm:text-4xl md:text-5xl font-black italic uppercase text-white mb-2 sm:mb-3 leading-none tracking-tight">
              SINGLE COACHING PASS
            </h3>
            <p className="text-white/85 text-xs sm:text-sm mb-5 sm:mb-6 max-w-md font-sans leading-relaxed">
              Unlock targeted shot calibration, agility diagnostics, and tactical breakdown with Granger's elite master coaches.
            </p>
            <motion.button
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={onBookNow}
              className="font-tech bg-[#FF671C] hover:bg-white text-white hover:text-[#0c1017] rounded-xl px-6 sm:px-8 py-3.5 text-xs font-black uppercase tracking-widest transition-all duration-200 shadow-lg cursor-pointer inline-flex items-center gap-2 animate-shine w-full sm:w-auto justify-center"
            >
              <span>BOOK PASS NOW</span>
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


