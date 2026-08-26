import { BadgeCheck, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface ProgramSectionProps {
  onMeetCoaches: () => void;
  onExploreFacilities: () => void;
}

export function ProgramSection({ onMeetCoaches, onExploreFacilities }: ProgramSectionProps) {
  return (
    <section className="w-full py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header Tag */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF671C] animate-pulse" />
            <span className="font-tech text-xs uppercase font-black tracking-widest text-[#FF671C]">
              ATHLETIC PROGRAMS & INFRASTRUCTURE
            </span>
          </div>

          <h2 className="font-sport text-3xl sm:text-5xl lg:text-7xl font-black uppercase italic text-[#0c1017] leading-[0.92] mb-8 sm:mb-12 max-w-4xl tracking-tight">
            ELEVATE YOUR PERFORMANCE WITH WORLD-CLASS FEATURED DOMAINS
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Pro Coach Card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.52, delay: 0.06, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className="bg-[#0c1017] text-white rounded-3xl p-6 sm:p-8 border border-black/10 flex flex-col justify-between min-h-[400px] sm:min-h-[440px] shadow-sm hover:shadow-2xl transition-all duration-300 relative overflow-hidden group"
          >
            {/* High-Resolution Coach & Athlete Background Image */}
            <img
              src="https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=85"
              alt="Granger Pro Coach Experts"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108 opacity-40"
            />
            {/* Multi-layer Dark Gradient for optimal contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-[#0c1017] via-[#0c1017]/80 to-black/60" />
            <div className="absolute top-0 right-0 w-48 h-48 bg-[#FF671C]/20 rounded-full blur-3xl group-hover:bg-[#FF671C]/35 transition-colors pointer-events-none" />

            <div className="flex justify-between items-start mb-auto relative z-10">
              <span className="font-tech text-xs font-black uppercase tracking-widest text-[#FF671C] bg-white/10 backdrop-blur-md px-3 py-1.5 rounded-lg border border-white/15">
                PRO COACHING
              </span>
              <BadgeCheck className="w-6 h-6 text-[#FF671C] drop-shadow-xs" />
            </div>

            <div className="relative z-10 pt-12">
              <h3 className="font-sport text-3xl sm:text-4xl font-black uppercase italic mb-2 text-white leading-tight group-hover:text-[#FF671C] transition-colors">
                THE COACH EXPERTS
              </h3>
              <p className="text-sm text-white/80 mb-6 leading-relaxed font-sans">
                Train directly with Olympians, NBA draft mentors, and doctorate sports physiologists tailored to your kinetic goals.
              </p>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                onClick={onMeetCoaches}
                className="font-tech bg-white hover:bg-[#FF671C] text-[#0c1017] hover:text-white rounded-xl px-6 py-3.5 text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-md cursor-pointer animate-shine"
              >
                <span>MEET COACHES</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>

          {/* Large Campus Image Card with Glassmorphism */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.12 }}
            transition={{ duration: 0.52, delay: 0.14, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            onClick={onExploreFacilities}
            className="lg:col-span-2 rounded-3xl border border-[#E2E8F0] relative overflow-hidden min-h-[380px] sm:min-h-[440px] flex flex-col justify-end p-4 sm:p-6 md:p-10 shadow-sm hover:shadow-2xl cursor-pointer group bg-[#0c1017] transition-all duration-300"
          >
            {/* High-Resolution Facilities Campus Image */}
            <img
              src="https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1600&q=85"
              alt="Granger 45,000 Sq Ft Sports Campus"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
            />
            {/* Gradient protection */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/15" />

            {/* Glassmorphic info box */}
            <div className="relative z-10 bg-black/65 backdrop-blur-md rounded-2xl p-4 sm:p-6 border border-white/20 w-full max-w-lg shadow-xl transition-transform duration-300 group-hover:translate-y-[-4px]">
              <div className="flex items-center gap-2 mb-1">
                <Sparkles className="w-4 h-4 sm:w-5 sm:h-5 text-[#FF671C] animate-pulse" />
                <h3 className="font-sport text-2xl sm:text-3xl font-black uppercase italic text-white">45,000 SQ FT CAMPUS</h3>
              </div>
              <p className="text-xs sm:text-sm text-white/85 mb-4 leading-relaxed font-sans">
                FIBA-regulation hardwood courts, Roland clay tennis stadiums, and medical-grade hydro-recovery plunge suites.
              </p>
              <div className="flex items-center gap-2.5 font-tech">
                <span className="px-3 py-1 bg-white/20 rounded-md text-[11px] font-black uppercase text-white backdrop-blur-sm border border-white/20">
                  ALL-ACCESS PASS
                </span>
                <span className="px-3 py-1 bg-[#FF671C] rounded-md text-[11px] font-black uppercase text-white shadow-xs">
                  COMPLIMENTARY TOUR
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

