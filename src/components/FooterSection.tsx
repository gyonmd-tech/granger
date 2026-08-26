import { MapPin, Flame, ArrowUpRight } from 'lucide-react';
import { motion } from 'motion/react';

interface FooterSectionProps {
  onNavigate?: (nav: string) => void;
  isMinimal?: boolean;
}

export function FooterSection({ onNavigate, isMinimal = false }: FooterSectionProps) {
  if (isMinimal) {
    return (
      <footer className="w-full bg-[#0c1017] border-t border-white/10 py-6 px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-7xl mx-auto w-full flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-tech text-white/60">
          <div className="flex items-center gap-2">
            <span className="font-sport text-lg font-black italic text-white tracking-tight">/ GRANGER</span>
            <span className="text-white/30">•</span>
            <span>ATHLETIC PERFORMANCE CAMPUS</span>
          </div>
          <div className="flex items-center gap-6">
            <button
              onClick={() => onNavigate?.('Program')}
              className="hover:text-[#FF671C] transition-colors uppercase cursor-pointer"
            >
              Main Campus
            </button>
            <button
              onClick={() => onNavigate?.('Product')}
              className="hover:text-[#FF671C] transition-colors uppercase cursor-pointer"
            >
              Pro Shop
            </button>
            <button
              onClick={() => onNavigate?.('Events')}
              className="hover:text-[#FF671C] transition-colors uppercase cursor-pointer"
            >
              Events
            </button>
          </div>
          <span>© 1997–{new Date().getFullYear()} GRANGER. ALL RIGHTS RESERVED.</span>
        </div>
      </footer>
    );
  }

  return (
    <footer className="w-full bg-[#F0F2F5] border-t border-[#E2E8F0]">
      {/* Pre-footer Banner */}
      <div className="w-full py-14 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 border-b border-[#E2E8F0] bg-white">
        <div className="max-w-7xl mx-auto w-full flex flex-col md:flex-row justify-between items-center gap-8 sm:gap-10">
          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF671C] animate-pulse" />
              <span className="font-tech text-xs font-black uppercase tracking-widest text-[#FF671C]">
                GLOBAL CAMPUS LOCATIONS
              </span>
            </div>
            <h2 className="font-sport text-3xl sm:text-4xl lg:text-6xl font-black uppercase italic text-[#0c1017] leading-[0.92] mb-5 sm:mb-6 tracking-tight">
              WE'RE BUILDING THE FUTURE BENCHMARK OF ATHLETIC WELLNESS.
            </h2>
            <div className="flex flex-wrap gap-2 sm:gap-3 font-tech">
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[11px] sm:text-xs font-black uppercase text-[#0c1017] flex items-center gap-2 shadow-2xs hover:border-[#FF671C] transition-colors">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF671C] flex-shrink-0" />
                SAN DIEGO — CALIFORNIA (CAMPUS HQ)
              </span>
              <span className="px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl border border-[#E2E8F0] bg-[#F8FAFC] text-[11px] sm:text-xs font-black uppercase text-[#0c1017] flex items-center gap-2 shadow-2xs hover:border-[#FF671C] transition-colors">
                <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#FF671C] flex-shrink-0" />
                PARIS — FRANCE (CLAY LAB)
              </span>
            </div>
          </div>

          {/* Athletic Badge */}
          <div className="relative">
            <motion.div
              whileHover={{ rotate: 12, scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => onNavigate?.('About')}
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-3xl bg-[#FF671C] flex flex-col items-center justify-center text-white transform rotate-6 transition-transform duration-300 shadow-xl cursor-pointer"
            >
              <Flame className="w-10 h-10 sm:w-12 sm:h-12 fill-white text-white" />
              <span className="font-tech text-[9px] sm:text-[10px] font-black uppercase tracking-wider mt-1">
                DISCOVER
              </span>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="w-full pt-12 sm:pt-16 md:pt-20 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-8 sm:gap-10 mb-12 sm:mb-16">
            {/* Brand column */}
            <div className="col-span-2">
              <button
                onClick={() => onNavigate?.('Program')}
                className="font-sport text-3xl sm:text-4xl font-black italic uppercase tracking-tighter text-[#0c1017] mb-2 block text-left hover:text-[#FF671C] transition-colors cursor-pointer"
              >
                / GRANGER
              </button>
              <p className="text-[#64748B] max-w-xs text-xs sm:text-sm leading-relaxed font-sans">
                A new species of sportainment. Merging kinematic telemetry, master coaching, and vibrant community since 1997.
              </p>
            </div>

            {/* Navigation */}
            <div className="flex flex-col gap-2 sm:gap-2.5 font-tech">
              <h4 className="font-black text-[#0c1017] uppercase text-xs tracking-widest mb-1">
                CAMPUS PORTAL
              </h4>
              <button
                type="button"
                onClick={() => onNavigate?.('Program')}
                className="text-xs font-bold text-[#64748B] hover:text-[#FF671C] transition-colors uppercase text-left cursor-pointer"
              >
                Program & Campus
              </button>
              <button
                type="button"
                onClick={() => onNavigate?.('Lab')}
                className="text-xs font-bold text-[#64748B] hover:text-[#FF671C] transition-colors uppercase text-left cursor-pointer"
              >
                Kinematics Lab (AI)
              </button>
              <button
                type="button"
                onClick={() => onNavigate?.('Booking')}
                className="text-xs font-bold text-[#64748B] hover:text-[#FF671C] transition-colors uppercase text-left cursor-pointer"
              >
                Court & Pass Booking
              </button>
              <button
                type="button"
                onClick={() => onNavigate?.('Arena Hub')}
                className="text-xs font-bold text-[#64748B] hover:text-[#FF671C] transition-colors uppercase text-left cursor-pointer"
              >
                Arena Hub & Elo Rank
              </button>
              <button
                type="button"
                onClick={() => onNavigate?.('Product')}
                className="text-xs font-bold text-[#64748B] hover:text-[#FF671C] transition-colors uppercase text-left cursor-pointer"
              >
                Pro Shop & Drops
              </button>
              <button
                type="button"
                onClick={() => onNavigate?.('Events')}
                className="text-xs font-bold text-[#64748B] hover:text-[#FF671C] transition-colors uppercase text-left cursor-pointer"
              >
                Tournament Circuits
              </button>
              <button
                type="button"
                onClick={() => onNavigate?.('About')}
                className="text-xs font-bold text-[#64748B] hover:text-[#FF671C] transition-colors uppercase text-left cursor-pointer"
              >
                About & History
              </button>
            </div>

            {/* Social */}
            <div className="flex flex-col gap-2 sm:gap-2.5 font-tech">
              <h4 className="font-black text-[#0c1017] uppercase text-xs tracking-widest mb-1">
                ATHLETE FEED
              </h4>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-[#64748B] hover:text-[#FF671C] transition-colors uppercase flex items-center gap-1"
              >
                <span>X (Twitter)</span>
                <ArrowUpRight className="w-3 h-3 text-[#94A3B8]" />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-[#64748B] hover:text-[#FF671C] transition-colors uppercase flex items-center gap-1"
              >
                <span>Instagram</span>
                <ArrowUpRight className="w-3 h-3 text-[#94A3B8]" />
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noreferrer"
                className="text-xs font-bold text-[#64748B] hover:text-[#FF671C] transition-colors uppercase flex items-center gap-1"
              >
                <span>LinkedIn</span>
                <ArrowUpRight className="w-3 h-3 text-[#94A3B8]" />
              </a>
            </div>

            {/* Legal & Standards */}
            <div className="col-span-2 flex flex-col gap-2 sm:gap-2.5 font-tech">
              <h4 className="font-black text-[#0c1017] uppercase text-xs tracking-widest mb-1">
                STANDARDS & ACCREDITATION
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-2.5">
                <button
                  type="button"
                  onClick={() => onNavigate?.('About')}
                  className="text-xs font-bold text-[#64748B] hover:text-[#FF671C] transition-colors uppercase text-left cursor-pointer"
                >
                  Telemetry Privacy
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate?.('About')}
                  className="text-xs font-bold text-[#64748B] hover:text-[#FF671C] transition-colors uppercase text-left cursor-pointer"
                >
                  Court Regulations
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate?.('About')}
                  className="text-xs font-bold text-[#64748B] hover:text-[#FF671C] transition-colors uppercase text-left cursor-pointer"
                >
                  Facility Certification
                </button>
                <button
                  type="button"
                  onClick={() => onNavigate?.('About')}
                  className="text-xs font-bold text-[#64748B] hover:text-[#FF671C] transition-colors uppercase text-left cursor-pointer"
                >
                  Olympic Coaches Index
                </button>
              </div>
            </div>
          </div>

          <div className="pt-6 sm:pt-8 border-t border-[#E2E8F0] flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4 text-[11px] sm:text-xs font-tech font-bold text-[#64748B] uppercase text-center sm:text-left">
            <span>© 1997–{new Date().getFullYear()} GRANGER ATHLETIC PERFORMANCE CAMPUS. ALL RIGHTS RESERVED.</span>
            <span>SAN DIEGO, CA • PARIS, FR</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

