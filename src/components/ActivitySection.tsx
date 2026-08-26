import { useState } from 'react';
import { Minus, Plus, Check, ArrowRight, Calendar, Zap, UtensilsCrossed, Shirt } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ActivitySectionProps {
  onJoinNow: () => void;
}

export function ActivitySection({ onJoinNow }: ActivitySectionProps) {
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const [boostCount, setBoostCount] = useState(86);
  const [isBoosted, setIsBoosted] = useState(false);

  const toggleAccordion = (key: string) => {
    setOpenAccordion(openAccordion === key ? null : key);
  };

  const handleBoost = () => {
    setIsBoosted(true);
    setBoostCount((prev) => (prev >= 100 ? 86 : prev + 2));
    setTimeout(() => setIsBoosted(false), 500);
  };

  const columnVariants = {
    hidden: { opacity: 0, y: 18 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.08,
        duration: 0.52,
        ease: [0.22, 1, 0.36, 1],
      },
    }),
  };

  return (
    <section className="w-full py-14 sm:py-20 md:py-24 px-4 sm:px-6 lg:px-8 bg-[#F0F2F5]">
      <div className="max-w-7xl mx-auto w-full">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          
          {/* ========================================================================= */}
          {/* COLUMN 1: Header, Tags, Accordions */}
          {/* ========================================================================= */}
          <motion.div
            custom={0}
            variants={columnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            className="flex flex-col justify-between gap-6 sm:gap-8 min-h-[auto] sm:min-h-[520px] lg:min-h-[580px]"
          >
            <div>
              {/* Tag "THE BENEFIT" */}
              <div className="flex items-center gap-2 mb-3.5 sm:mb-4">
                <span className="w-2 h-2 rounded-full bg-[#FF671C] animate-pulse" />
                <span className="font-tech text-[11px] font-black uppercase tracking-widest text-[#64748B]">
                  THE BENEFIT
                </span>
              </div>

              {/* Sport Title with 3D Apple Icon */}
              <h2 className="font-sport text-4xl sm:text-5xl lg:text-6xl font-black italic uppercase text-[#0c1017] leading-[0.92] tracking-tight">
                EXPLORE{' '}
                <motion.span
                  whileHover={{ rotate: 15, scale: 1.15 }}
                  className="inline-flex items-center justify-center align-middle mx-0.5 cursor-pointer"
                >
                  <img
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuACt437eODtNeegLu39Z2kVLGJggow29vg9ZBY4lQFt41WYt2uZr3DSSdEKx4AXzGSSf35DByMjiSkxOkPR7-o7o6MnpvJinelNw_31nwfE9j0xYHk0I8C6CS0M6wapM_YXtEhB_I5CtkD7K99bcjeRC5eHPxwBRDIxIl_8NKokc3V7EQfR29fWtvx6fAkoaVKG2miNR48RMqHpycV-loBHnqhnNg24eq1QzzdGNtuBv4MNHl3-TZVDKw"
                    alt="Sport & Nutrition 3D Icon"
                    referrerPolicy="no-referrer"
                    className="w-9 h-9 sm:w-10 sm:h-10 object-contain drop-shadow-xs"
                  />
                </motion.span>{' '}
                OUR
                <br />
                FLEXIBLE ACTIVITY.
              </h2>

              {/* Chips / Pills */}
              <div className="flex flex-wrap items-center gap-2.5 mt-5 sm:mt-6 font-tech">
                <motion.span
                  whileHover={{ scale: 1.04, y: -2 }}
                  className="px-3.5 py-1.5 rounded-xl border border-[#E2E8F0] bg-white text-xs font-bold text-[#0c1017] flex items-center gap-1.5 shadow-2xs hover:border-[#FF671C] transition-colors cursor-default uppercase"
                >
                  <UtensilsCrossed className="w-3.5 h-3.5 text-[#FF671C]" />
                  <span>Eating After the Game</span>
                </motion.span>
                <motion.span
                  whileHover={{ scale: 1.04, y: -2 }}
                  className="px-3.5 py-1.5 rounded-xl border border-[#E2E8F0] bg-white text-xs font-bold text-[#0c1017] flex items-center gap-1.5 shadow-2xs hover:border-[#00a0e7] transition-colors cursor-default uppercase"
                >
                  <Shirt className="w-3.5 h-3.5 text-[#00a0e7]" />
                  <span>Game Jersey</span>
                </motion.span>
              </div>
            </div>

            {/* Accordion Stack */}
            <div className="flex flex-col gap-3.5 mt-auto">
              {/* Accordion 1: Connections */}
              <div className="border border-[#E2E8F0] bg-white rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-md transition-shadow duration-300">
                <button
                  type="button"
                  onClick={() => toggleAccordion('connections')}
                  className="w-full flex justify-between items-center text-left cursor-pointer focus:outline-none group"
                >
                  <h3 className="font-sport text-2xl font-black italic uppercase text-[#0c1017] group-hover:text-[#FF671C] transition-colors tracking-tight">
                    CONNECTIONS & COMMUNITY
                  </h3>
                  <motion.span
                    animate={{ rotate: openAccordion === 'connections' ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[#0c1017] p-1 flex items-center justify-center bg-gray-100 rounded-full"
                  >
                    {openAccordion === 'connections' ? (
                      <Minus className="w-4 h-4 stroke-[3] text-[#FF671C]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[3]" />
                    )}
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openAccordion === 'connections' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed pt-3 font-sans">
                        Built to connect — with teammates, master coaches, and the kinetic momentum that elevates your everyday performance.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Accordion 2: Sport Package */}
              <div className="border border-[#E2E8F0] bg-white rounded-2xl p-5 sm:p-6 shadow-2xs hover:shadow-md transition-shadow duration-300">
                <button
                  type="button"
                  onClick={() => toggleAccordion('sport-package')}
                  className="w-full flex justify-between items-center text-left cursor-pointer focus:outline-none group"
                >
                  <h3 className="font-sport text-2xl font-black italic uppercase text-[#0c1017] group-hover:text-[#FF671C] transition-colors tracking-tight">
                    SPORT PERFORMANCE PASS
                  </h3>
                  <motion.span
                    animate={{ rotate: openAccordion === 'sport-package' ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="text-[#0c1017] p-1 flex items-center justify-center bg-gray-100 rounded-full"
                  >
                    {openAccordion === 'sport-package' ? (
                      <Minus className="w-4 h-4 stroke-[3] text-[#FF671C]" />
                    ) : (
                      <Plus className="w-4 h-4 stroke-[3]" />
                    )}
                  </motion.span>
                </button>
                <AnimatePresence>
                  {openAccordion === 'sport-package' && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.26, ease: [0.16, 1, 0.3, 1] }}
                      className="overflow-hidden"
                    >
                      <p className="text-xs sm:text-sm text-[#64748B] leading-relaxed pt-3 font-sans">
                        Tailored multi-sport access bundles including clay and hardwood court reservations, locker priority, and telemetry consultations.
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* COLUMN 2: Visionary Precision Play Card */}
          {/* ========================================================================= */}
          <motion.div
            custom={1}
            variants={columnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            whileHover={{ y: -6 }}
            className="border border-[#E2E8F0] bg-white rounded-3xl p-6 sm:p-8 lg:p-10 flex flex-col justify-between min-h-[auto] sm:min-h-[520px] lg:min-h-[580px] shadow-2xs hover:shadow-xl transition-all duration-300 relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-[#FF671C]/5 rounded-full blur-2xl group-hover:bg-[#FF671C]/15 transition-colors pointer-events-none" />
            
            {/* Top Info */}
            <div>
              <div className="flex items-center gap-1.5">
                <span className="w-4 h-4 rounded-full bg-[#FF671C] flex items-center justify-center text-white shadow-xs">
                  <Check className="w-2.5 h-2.5 stroke-[3]" />
                </span>
                <span className="font-tech text-[11px] font-black uppercase tracking-widest text-[#64748B]">
                  EST. 1997 • CALIBRATED
                </span>
              </div>
              <p className="text-xs sm:text-sm text-[#64748B] mt-4 sm:mt-6 max-w-[270px] leading-relaxed font-sans">
                Dynamic features designed to move with you — fast, flexible, and built for championship action.
              </p>
            </div>

            {/* Bottom Title & Button */}
            <div className="mt-8 pt-4">
              <h3 className="font-sport text-3xl sm:text-4xl lg:text-5xl font-black italic uppercase text-[#0c1017] mb-5 sm:mb-6 leading-[0.92] tracking-tight group-hover:text-[#FF671C] transition-colors">
                VISIONARY
                <br />
                PRECISION PLAY
              </h3>
              <motion.button
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
                type="button"
                onClick={onJoinNow}
                className="font-tech bg-[#FF671C] hover:bg-[#e05615] text-white rounded-xl px-5 sm:px-6 py-3.5 text-xs font-black uppercase tracking-wider flex justify-between items-center w-full max-w-full sm:max-w-[220px] transition-all shadow-md cursor-pointer animate-shine"
              >
                <span>JOIN MEMBERSHIP</span>
                <ArrowRight className="w-4 h-4" />
              </motion.button>
            </div>
          </motion.div>

          {/* ========================================================================= */}
          {/* COLUMN 3: Tennis Outdoor Portrait Card */}
          {/* ========================================================================= */}
          <motion.div
            custom={2}
            variants={columnVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.12 }}
            whileHover={{ y: -6 }}
            className="border border-[#E2E8F0] rounded-3xl overflow-hidden relative min-h-[460px] sm:min-h-[520px] lg:min-h-[580px] flex flex-col justify-between p-5 sm:p-7 shadow-2xs hover:shadow-xl transition-all duration-300 group bg-[#0c1017]"
          >
            {/* Orange Clay Tennis Court Background Image */}
            <img
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuD5NwkQUAx4Jt1GRp4T-wtBmVGGe4-xd1P04Hcg7GkkODo2uk-QvaYx-ieW1E861g0-EJX-Lcq7JyGaEKBEBhxPM5_t7xPQIofPhboQZDPECQgGiULui6-o9O8dWIwSt0RvwJQx0Uen7AOzghBfDTuyJ7-ZlbL9epuSy6LP3lxIggZxhUDhI9a15z8VhJ8IzhzCJD0ARRbUU-HNsVnKDmFyT7ZwX-Ex4T2d9yHjbixuiU4-9V6mECI4mQ"
              alt="Granger Orange Clay Outdoor Tennis Court"
              loading="lazy"
              decoding="async"
              referrerPolicy="no-referrer"
              className="absolute inset-0 w-full h-full object-cover object-center transition-transform duration-700 group-hover:scale-108"
            />
            {/* Subtle Gradient */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />

            {/* Top Right: February Sale Badge */}
            <div className="relative z-10 self-end">
              <span className="font-tech px-3 py-1.5 rounded-xl bg-white/95 backdrop-blur-md text-[11px] sm:text-xs font-black text-[#0c1017] flex items-center gap-1.5 shadow-md border border-white/60 uppercase">
                <Calendar className="w-3.5 h-3.5 text-[#FF671C]" />
                <span>SEASON SALE</span>
              </span>
            </div>

            {/* Bottom: Floating Stats Card with Glassmorphism */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="relative z-10 bg-white/95 backdrop-blur-md rounded-2xl p-4 sm:p-5 border border-white/40 shadow-xl w-full sm:max-w-[290px] mx-auto sm:ml-auto"
            >
              <p className="font-tech text-xs font-bold text-[#64748B] mb-1 uppercase">TENNIS OUTDOOR CAPACITY</p>
              
              <div className="flex items-baseline gap-1.5 mb-2.5">
                <span className="font-sport text-4xl font-black italic text-[#0c1017] leading-none">
                  {boostCount}%
                </span>
                <span className="font-tech text-xs font-bold text-[#64748B] uppercase">ENROLLED</span>
              </div>

              {/* Progress Bar */}
              <div className="w-full h-2.5 bg-[#E2E8F0] rounded-full overflow-hidden mb-3 p-0.5">
                <motion.div
                  className="h-full bg-[#FF671C] rounded-full"
                  animate={{ width: `${boostCount}%` }}
                  transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                />
              </div>

              {/* Boost Button */}
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                onClick={handleBoost}
                className={`font-tech w-full bg-[#0c1017] hover:bg-[#FF671C] text-white rounded-xl py-2.5 px-3 text-xs font-black uppercase tracking-wider flex justify-center items-center gap-1.5 transition-all shadow-sm cursor-pointer ${
                  isBoosted ? 'bg-[#FF671C] ring-4 ring-[#FF671C]/30' : ''
                }`}
              >
                <Zap className={`w-3.5 h-3.5 fill-white text-white ${isBoosted ? 'animate-bounce' : ''}`} />
                <span>{isBoosted ? 'CALIBRATED!' : 'BOOST OCCUPANCY'}</span>
              </motion.button>
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}

