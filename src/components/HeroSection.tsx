import { Flame, ArrowDown, Sparkles, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

interface HeroSectionProps {
  onExplorePrograms?: () => void;
  onJoinOrBook?: () => void;
}

export function HeroSection({ onExplorePrograms, onJoinOrBook }: HeroSectionProps) {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.05,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
    },
  };

  const stats = [
    { value: '18,500+', label: 'ATHLETES TRAINED' },
    { value: '45,000 SQ FT', label: 'CAMPUS ARENA' },
    { value: 'EST. 1997', label: 'OLYMPIC HERITAGE' },
    { value: '99.4%', label: 'READINESS ACCURACY' },
  ];

  return (
    <section className="relative w-full min-h-[95vh] md:min-h-screen pt-28 sm:pt-32 pb-0 flex flex-col justify-between overflow-hidden bg-[#0c1017]">
      {/* High-Resolution Basketball Court & Ball Background with Subtle Zoom In */}
      <motion.div
        initial={{ scale: 1.04, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="absolute inset-0 z-0 pointer-events-none transform-gpu"
      >
        <img
          src="https://lh3.googleusercontent.com/aida-public/AB6AXuCf7hIknXo_egVKdPov309MztqvMFpeau6sVsCdW5nDltaZ8He31KEOj3zZTgvy71pj96JftWUgQ_J9-zJH9m0bDNlEiEsi6chuezp0LBWzvqQCudYEyS1ylwkR_xEVV6Qil2uiKb8-2soCu_pCBUCT9Zdus29luCLi2DCZBZEshKanPhOHnGeq7m4j7TnFJBcwk9DXoInegDv2I8LoLuyVp0hHVMLYj-4a2nfA9-xSxcwDZtFqgytG_Q"
          alt="Granger Landing Basketball Court and Ball"
          loading="eager"
          decoding="async"
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-[65%_center] sm:object-center select-none opacity-90"
        />
        {/* Left darkening gradient for pristine text readability */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c1017]/95 via-[#0c1017]/55 to-transparent" />
        {/* Top subtle navbar shadow gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0c1017]/85 via-transparent to-[#0c1017]/70" />
      </motion.div>

      {/* Main Content Area with Staggered Entrance */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex-grow flex flex-col justify-center pt-6 sm:pt-14 pb-4 px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-3xl lg:max-w-4xl"
        >
          {/* Athletic Tag Badge */}
          <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-3 py-1 sm:px-3.5 sm:py-1.5 rounded-lg bg-black/60 backdrop-blur-md border border-white/15 mb-3 sm:mb-4 shadow-lg">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[#FF671C] opacity-75" />
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[#FF671C]" />
            </span>
            <span className="font-tech text-[11px] sm:text-xs font-black tracking-widest text-[#FF671C] uppercase">
              NEXT-GEN SPORTAINMENT
            </span>
          </motion.div>

          {/* Main Headline with Bold Sport Font */}
          <motion.h1
            variants={itemVariants}
            className="font-sport text-4xl sm:text-6xl md:text-7xl lg:text-[84px] font-black text-white tracking-tight leading-[0.9] sm:leading-[0.88] uppercase italic drop-shadow-md"
          >
            A NEW SPECIES OF<br className="hidden sm:inline" /> SPORTAINMENT.
          </motion.h1>

          {/* Subtitle with Flame Icon */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3 text-white/95 text-xs sm:text-base md:text-lg font-semibold mt-4 sm:mt-6"
          >
            <div className="flex items-center gap-2 bg-[#FF671C]/20 border border-[#FF671C]/30 px-3 py-1.5 sm:px-3.5 sm:py-1.5 rounded-xl backdrop-blur-md shadow-sm">
              <Flame className="w-3.5 h-3.5 sm:w-4 sm:h-4 fill-[#FF671C] text-[#FF671C] animate-pulse flex-shrink-0" />
              <span className="font-tech text-[10px] sm:text-xs font-black uppercase tracking-wider text-white">
                IMPROVE YOUR HEALTH — PERFORMANCE WELL
              </span>
            </div>
          </motion.div>

          {/* Prominent Action CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap items-center gap-3 sm:gap-4 mt-6 sm:mt-8 font-tech"
          >
            <button
              onClick={onExplorePrograms}
              className="bg-[#FF671C] hover:bg-[#e05615] text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2.5 shadow-xl hover:shadow-2xl transition-all cursor-pointer animate-shine group"
            >
              <span>EXPLORE PROGRAMS</span>
              <ArrowDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
            </button>

            <button
              onClick={onJoinOrBook}
              className="bg-white/10 hover:bg-white/20 border border-white/20 backdrop-blur-md text-white px-6 sm:px-8 py-3.5 sm:py-4 rounded-2xl font-black text-xs uppercase tracking-widest flex items-center gap-2.5 shadow-lg transition-all cursor-pointer hover:border-[#FF671C]"
            >
              <Sparkles className="w-4 h-4 text-[#FF671C]" />
              <span>JOIN ATHLETE ACADEMY</span>
            </button>
          </motion.div>

          {/* Live Micro Ticker Stats */}
          <motion.div
            variants={itemVariants}
            className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 mt-8 pt-6 border-t border-white/10 font-tech"
          >
            {stats.map((s) => (
              <div key={s.label} className="bg-black/30 backdrop-blur-xs px-3 py-2 rounded-xl border border-white/5">
                <p className="font-sport text-lg sm:text-xl font-black italic text-white leading-none">{s.value}</p>
                <span className="text-[9px] sm:text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] block mt-1">
                  {s.label}
                </span>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Down Hint */}
      <div className="relative z-10 w-full flex justify-center pb-2 pointer-events-none">
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          className="flex flex-col items-center text-white/50"
        >
          <span className="font-tech text-[9px] uppercase tracking-widest font-bold">SCROLL TO DISCOVER</span>
          <ChevronDown className="w-4 h-4 text-[#FF671C]" />
        </motion.div>
      </div>

      {/* Perfectly Scaled "GRANGER" Typographic Watermark with Ambient Floating Breathing */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 w-full max-w-6xl mx-auto px-4 sm:px-6 md:px-8 flex justify-center items-end overflow-hidden pointer-events-none select-none mt-auto pb-0"
      >
        <svg
          viewBox="0 0 1000 175"
          className="w-full h-auto max-h-[14vh] sm:max-h-[18vh] lg:max-h-[22vh] select-none block animate-float"
          preserveAspectRatio="xMidYMax meet"
          aria-hidden="true"
        >
          <text
            x="500"
            y="155"
            textAnchor="middle"
            fill="rgba(255, 255, 255, 0.35)"
            fontFamily="'Barlow Condensed', 'Plus Jakarta Sans', sans-serif"
            fontStyle="italic"
            fontWeight="900"
            fontSize="190"
            letterSpacing="-0.02em"
            className="select-none"
          >
            GRANGER
          </text>
        </svg>
      </motion.div>
    </section>
  );
}


