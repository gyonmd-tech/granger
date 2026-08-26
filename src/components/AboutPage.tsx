import { useState } from 'react';
import {
  Activity,
  HeartPulse,
  ShieldCheck,
  Users,
  Building,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Leaf,
  Calendar,
  Trophy,
  Target,
  Zap,
  MapPin,
  Clock,
  Compass,
  Award,
  ChevronRight,
  Quote,
  Flame,
  Gauge,
  Dumbbell,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface AboutPageProps {
  onOpenGetInTouch: () => void;
  onBookTour: () => void;
}

export function AboutPage({ onOpenGetInTouch, onBookTour }: AboutPageProps) {
  const [activeFacility, setActiveFacility] = useState<'arena' | 'clay' | 'recovery' | 'lab' | 'fuel'>('arena');
  const [selectedCoachCategory, setSelectedCoachCategory] = useState<'All' | 'Basketball' | 'Tennis' | 'Science' | 'Nutrition'>('All');
  const [activePrinciple, setActivePrinciple] = useState<number>(0);

  const stats = [
    { value: '1997', label: 'ESTABLISHED', sub: '28+ Years of Athletic Craft', tag: 'EST.' },
    { value: '45,000', label: 'SQUARE FEET', sub: 'Multi-Sport Performance Campus', tag: 'AREA' },
    { value: '18,500+', label: 'ATHLETES TRAINED', sub: 'Youth to Olympians & Pros', tag: 'ALUMNI' },
    { value: '99.4%', label: 'RETENTION RATE', sub: 'Member Dedication & Loyalty', tag: 'SCORE' },
  ];

  const principles = [
    {
      number: '01',
      title: 'Biometric Kinematics & Kinetic Flow',
      headline: 'We measure what matters so you dominate without joint injury.',
      desc: 'Traditional training pushes past physical warning signs. At Granger, force plates, high-speed 240fps video telemetry, and real-time heart rate variability guide every rep, shot arc, and court sprint.',
      icon: Activity,
      accent: '#FF671C',
      tag: 'BIOMECHANICS',
      benefits: ['Real-time Vald force plate jump takeoff & landing telemetry', 'Joint deceleration & landing angle kinetic analysis', 'Individualized aerobic heart rate zone calibration'],
    },
    {
      number: '02',
      title: 'Cellular Cryo & Thermal Protocols',
      headline: 'Recovery is active biological engineering, not passive resting.',
      desc: 'Our Hydro-Recovery Wing pairs 48°F cold contrast plunge pools with Finnish cedar dry saunas and medical-grade hyperbaric chambers to accelerate lymphatic drainage and reduce muscular inflammation by up to 45%.',
      icon: HeartPulse,
      accent: '#00a0e7',
      tag: 'RESTORATION',
      benefits: ['48°F ozone cryo plunge & 104°F mineral thermal pools', 'Full-spectrum infrared heat therapy & cellular renewal', 'Normatec dynamic pneumatic compression lounges'],
    },
    {
      number: '03',
      title: 'Master Pedigree Coaching Roster',
      headline: 'Trained directly by champions, Olympians, and doctorate physiologists.',
      desc: 'Every Granger mentor has competed at the highest collegiate, international, or Olympic tier. We fuse competitive grit with sports science to develop confident, resilient athletes across all generations.',
      icon: ShieldCheck,
      accent: '#0e3b61',
      tag: 'MENTORSHIP',
      benefits: ['1-on-1 personalized kinematic drill plans & video feedback', 'Tactical matchplay analysis & competitive film breakdown', 'Mental resilience & clutch fourth-quarter pressure conditioning'],
    },
    {
      number: '04',
      title: 'Sportainment & High-Energy Culture',
      headline: 'Championship-tier grit meets refined lifestyle and vibrant community.',
      desc: 'Granger bridges the gap between intense court competition and refined social lifestyle. From weekend mixed doubles tournaments with live DJ acoustic sets to post-workout chef protein bowls, our campus is your home.',
      icon: Users,
      accent: '#E65100',
      tag: 'COMMUNITY',
      benefits: ['Weekend member tournaments & Friday night lights mixer', 'Organic courtside fuel bar with chef recovery recipes', 'Community mentorship for next-generation youth athletes'],
    },
  ];

  const facilities = {
    arena: {
      name: 'The Grand Hardwood Arena',
      category: 'Basketball & Indoor Performance',
      specs: '16,000 SQ FT • 2 FIBA / NBA REGULATION COURTS • 40FT CEILINGS',
      desc: 'Precision-laid North American hard maple flooring fitted with dual-stage elastomeric subfloor cushioning to absorb 60% of joint impact during heavy jump drills. Outfitted with calibrated glass backboards, automated Dr. Dish rebounding systems, and overhead 4K tracking cameras.',
      highlights: [
        'Robbins Bio-Channel shock-absorbent maple subfloor',
        'Overhead 4K multi-angle kinematic review monitors',
        'Sound-isolated acoustic baffles & tournament scoreboards',
        'Dr. Dish automated programmable shooting machines',
      ],
      image: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?auto=format&fit=crop&w=1600&q=85',
    },
    clay: {
      name: 'The Roland Clay Stadium',
      category: 'Tennis & Racquet Sports',
      specs: '3 CHAMPIONSHIP CLAY COURTS • 1000-LUX SHADOWLESS LIGHTING',
      desc: 'Authentic imported European crushed red clay providing balanced sliding friction, true bounce arcs, and significant knee relief over hard courts. Designed for competitive tournament play, slide mechanics mastery, and tactical baseline footwork.',
      highlights: [
        'Triple-filtered subsurface irrigation for perfect moisture control',
        'Professional tournament umpire towers & courtside grandstands',
        'High-speed automated ball machines with programmable spin & speed',
        'Weatherproof sheltered viewing terrace with fresh espresso bar',
      ],
      image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=1600&q=85',
    },
    recovery: {
      name: 'Hydro-Recovery & Thermal Suite',
      category: 'Regeneration & Longevity',
      specs: '6,500 SQ FT • CONTRAST PLUNGE POOLS • INFRARED & FINNISH SAUNAS',
      desc: 'A medical-grade restorative oasis engineered for rapid lactate clearing and nervous system equilibrium. Transition seamlessly from a 48°F ice immersion plunge to a 104°F magnesium-rich thermal spring to cut DOMS by 40%.',
      highlights: [
        'Ozone-purified chilled contrast plunge pools (48°F / 8.8°C)',
        'Natural Finnish cedar saunas with volcanic mineral stones',
        'Zero-gravity acoustic meditation loungers with red light therapy',
        'Certified physical therapists and sports massage suites on-site',
      ],
      image: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?auto=format&fit=crop&w=1600&q=85',
    },
    lab: {
      name: 'Biomechanics & Agility Lab',
      category: 'Sports Science & Diagnostics',
      specs: 'VALD FORCEDECKS • 240FPS VIDEO CAPTURE • KEISER PNEUMATICS',
      desc: 'Where data meets athletic intuition. Our biomechanics suite measures ground reaction force, bilateral leg symmetry, sprint velocity, and rotational torque to build customized training algorithms for athletes.',
      highlights: [
        'Dual Vald ForceDecks for jump takeoff & landing symmetry',
        'Keiser pneumatic resistance equipment for explosive power',
        'Optojump optical laser timing gates for agility testing',
        'VO2 Max metabolic metabolic cart & blood lactate testing',
      ],
      image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=85',
    },
    fuel: {
      name: 'The Granger Fuel Bar & Organic Café',
      category: 'Nutrition & Social Lounge',
      specs: '100% ORGANIC • GRASS-FED WHEY • ADAPTOGENIC ESPRESSO BAR',
      desc: 'Clean, microfiltered, nutrient-dense nutrition crafted by sports dietitians. Designed to replenish glycogen, promote rapid cellular repair, and provide a welcoming atmosphere for community post-game conversations.',
      highlights: [
        'Cold-pressed juices with zero added sugars or preservatives',
        'New Zealand grass-fed whey and organic sprouted plant proteins',
        'House-brewed adaptogenic cold brew and matcha elixirs',
        'Courtside app ordering with instant locker delivery',
      ],
      image: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=1600&q=85',
    },
  };

  const coaches = [
    {
      name: 'Marcus Vance',
      role: 'HEAD OF BASKETBALL & KINEMATICS',
      category: 'Basketball',
      experience: '16 YRS PRO COACHING • FORMER EUROLEAGUE GUARD',
      bio: 'Trained over 22 NBA draft picks with a focus on shot mechanics, floor spacing, and decision-making under defensive pressure.',
      specialty: 'Shot Arc Calibration & Deceleration Footwork',
      image: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=1000&q=85',
      badge: 'NBA & EUROLEAGUE SPECIALIST',
    },
    {
      name: 'Elena Rostova',
      role: 'DIRECTOR OF TENNIS & COURT STRATEGY',
      category: 'Tennis',
      experience: '14 YRS PRO COACHING • FORMER TOP-100 WTA',
      bio: 'Clay court specialist renowned for deep baseline stamina drills, topspin trajectory control, and tactical mental toughness.',
      specialty: 'Slide Mechanics, Serve Velocity & Match Tactics',
      image: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=1000&q=85',
      badge: 'WTA TOUR VETERAN',
    },
    {
      name: 'Dr. Sarah Lin, PhD, CSCS',
      role: 'CHIEF OF SPORTS SCIENCE & PHYSIOLOGY',
      category: 'Science',
      experience: '12 YRS SPORTS SCIENCE • OLYMPIC TEAM CONSULTANT',
      bio: 'Published author in neuromuscular fatigue and HRV recovery protocols. Oversees all biomarker tracking and custom training programs.',
      specialty: 'VO2 Max Conditioning & HRV Autonomic Recovery',
      image: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=1000&q=85',
      badge: 'PHD SPORTS PHYSIOLOGY',
    },
    {
      name: 'Jamal Sterling',
      role: 'DIRECTOR OF EXPLOSIVE POWER & AGILITY',
      category: 'Basketball',
      experience: '11 YRS STRENGTH & CONDITIONING • MASTER CSCS',
      bio: 'Master of reactive plyometrics, vertical jump optimization, and posterior chain injury prevention across competitive sports.',
      specialty: 'Vertical Velocity & First-Step Quickness',
      image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=1000&q=85',
      badge: 'ELITE PERFORMANCE COACH',
    },
    {
      name: 'Maya Thorne, MS, RD',
      role: 'EXECUTIVE WELLNESS & NUTRITION DIRECTOR',
      category: 'Nutrition',
      experience: '9 YRS CLINICAL NUTRITION • SPORTS DIETETICS SPECIALIST',
      bio: 'Designs customized meal protocols, post-match glycogen replenishment timing, and anti-inflammatory supplementation for members.',
      specialty: 'Metabolic Optimization & Recovery Nutrition',
      image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=1000&q=85',
      badge: 'CLINICAL SPORTS DIETITIAN',
    },
    {
      name: 'Henri Duval',
      role: 'HEAD OF RACQUET PERFORMANCE & PADEL',
      category: 'Tennis',
      experience: '13 YRS RACQUET SPECIALIST • FRENCH TENNIS FEDERATION',
      bio: 'Specializes in modern racquet dynamics, rotational hip power, and explosive lateral defense for tennis and padel athletes.',
      specialty: 'Rotational Power & Net Dominance',
      image: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=1000&q=85',
      badge: 'ITF LEVEL 3 MASTER',
    },
  ];

  const milestones = [
    {
      year: '1997',
      title: 'FOUNDED IN CALIFORNIA',
      desc: 'Granger opens its first single-court athletic laboratory with pioneering video telemetry for collegiate athletes.',
    },
    {
      year: '2006',
      title: 'BIOMETRIC REVOLUTION',
      desc: 'Installed first-generation force plate floor sensors and cold-contrast plunge recovery systems.',
    },
    {
      year: '2015',
      title: 'ROLAND CLAY STADIUM',
      desc: 'Constructed three championship European clay courts and expanded hydro-recovery wing to 6,500 sq ft.',
    },
    {
      year: '2023',
      title: 'SPORTAINMENT ERA',
      desc: 'Launched real-time activity telemetry app, member tournament circuits, and zero-carbon solar campus grid.',
    },
    {
      year: 'TODAY',
      title: 'GLOBAL BENCHMARK',
      desc: 'Over 18,500 active athletes, world-renowned coaching staff, and unmatched sports performance culture.',
    },
  ];

  const filteredCoaches = selectedCoachCategory === 'All'
    ? coaches
    : coaches.filter((c) => c.category === selectedCoachCategory);

  const activeFacData = facilities[activeFacility];

  return (
    <div className="w-full bg-[#F0F2F5] text-[#0c1017] min-h-screen pt-24 pb-20 font-sans">
      {/* ========================================================================= */}
      {/* 1. ATHLETIC HEADER & BRAND MASTHEAD */}
      {/* ========================================================================= */}
      <section className="w-full px-4 sm:px-6 lg:px-8 pt-4 pb-8 sm:pb-12">
        <div className="max-w-7xl mx-auto w-full">
          <div className="border-b border-[#E2E8F0] pb-6 sm:pb-10">
            <div className="flex flex-wrap items-center gap-2.5 sm:gap-3 mb-3 sm:mb-4">
              <span className="font-tech bg-[#0c1017] text-[#FF671C] text-[11px] sm:text-xs font-black px-3 py-1 rounded-md uppercase tracking-widest border border-white/10 flex items-center gap-1.5 shadow-2xs">
                <Flame className="w-3.5 h-3.5 text-[#FF671C]" />
                <span>ABOUT GRANGER</span>
              </span>
              <span className="font-tech text-[11px] sm:text-xs font-bold text-[#64748B] uppercase tracking-widest flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-[#FF671C]" />
                <span>EST. 1997 • SAN DIEGO, CALIFORNIA</span>
              </span>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 sm:gap-8 items-end">
              <div className="lg:col-span-8">
                <h1 className="font-sport text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black uppercase italic tracking-tight text-[#0c1017] leading-[0.92]">
                  WHERE ATHLETIC HERITAGE MEETS HUMAN OPTIMIZATION.
                </h1>
                <p className="text-sm sm:text-base md:text-lg text-[#4A5568] mt-4 sm:mt-5 max-w-3xl leading-relaxed font-sans">
                  For over 28 years, Granger has engineered the ultimate intersection of championship athletic training, biomechanics telemetry, and restorative longevity. We believe peak performance is unlocked through scientific craft, joint preservation, and an electric community.
                </p>
              </div>

              <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col items-stretch sm:items-center lg:items-end gap-3">
                <button
                  type="button"
                  onClick={onBookTour}
                  className="font-tech bg-[#FF671C] hover:bg-[#e05615] text-white px-6 sm:px-7 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2.5 shadow-md hover:shadow-lg transition-all active:scale-95 cursor-pointer w-full sm:w-auto"
                >
                  <Building className="w-4 h-4" />
                  <span>BOOK CAMPUS TOUR</span>
                </button>
                <button
                  type="button"
                  onClick={onOpenGetInTouch}
                  className="font-tech bg-white hover:bg-gray-100 text-[#0c1017] border border-[#E2E8F0] px-6 sm:px-7 py-3 rounded-xl text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs w-full sm:w-auto"
                >
                  <span>INQUIRE WITH DIRECTOR</span>
                  <ArrowRight className="w-3.5 h-3.5 text-[#FF671C]" />
                </button>
              </div>
            </div>

            {/* Athletic Performance Stats Grid with Motion Hover */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-6 mt-8 sm:mt-10 pt-6 sm:pt-8 border-t border-[#E2E8F0]">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.15 }}
                  transition={{ duration: 0.45, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -4 }}
                  className="bg-white p-3.5 sm:p-5 rounded-2xl border border-[#E2E8F0] shadow-2xs hover:border-[#FF671C]/50 hover:shadow-md transition-all cursor-default"
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-tech text-[9px] sm:text-[10px] font-black text-[#FF671C] bg-[#FF671C]/10 px-1.5 sm:px-2 py-0.5 rounded uppercase tracking-wider">
                      {stat.tag}
                    </span>
                  </div>
                  <p className="font-sport text-3xl sm:text-4xl md:text-5xl font-black italic tracking-tighter text-[#0c1017]">
                    {stat.value}
                  </p>
                  <p className="font-tech text-[11px] sm:text-xs font-bold text-[#0c1017] uppercase tracking-wider mt-0.5">
                    {stat.label}
                  </p>
                  <p className="text-[10px] sm:text-[11px] text-[#64748B] mt-0.5 font-medium">
                    {stat.sub}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. THE STORY / FOUNDING ETHOS SECTION */}
      {/* ========================================================================= */}
      <section className="w-full px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto w-full bg-white rounded-3xl p-8 sm:p-12 border border-[#E2E8F0] shadow-xs">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            {/* Left Story narrative */}
            <div className="lg:col-span-7 space-y-5">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF671C]" />
                <span className="font-tech text-xs font-black uppercase tracking-widest text-[#FF671C]">
                  THE ORIGIN STORY
                </span>
              </div>

              <h2 className="font-sport text-3xl sm:text-4xl md:text-5xl font-black uppercase italic text-[#0c1017] leading-[0.98] tracking-tight">
                BUILT BY ATHLETES WHO REFUSED TO ACCEPT THAT PHYSICAL DECLINE WAS INEVITABLE.
              </h2>

              <p className="text-sm sm:text-base text-[#4A5568] leading-relaxed">
                In 1997, our founders—a former collegiate decathlete and an orthopedic sports physician—witnessed firsthand how traditional athletics burned out promising careers through brute overtraining and neglected recovery.
              </p>

              <p className="text-sm sm:text-base text-[#4A5568] leading-relaxed">
                They established Granger as an antidote: a private sanctuary where biometric tracking, joint-cushioning surfaces, contrast thermal therapy, and Olympic mentorship work in complete harmony. Today, Granger serves as both an incubator for aspiring champions and a daily performance retreat for dedicated members.
              </p>

              <div className="pt-2 flex flex-wrap items-center gap-6 font-tech text-xs font-bold text-[#0c1017]">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>BIOMETRIC SENSOR PROTOCOLS</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>ZERO SINGLE-USE PLASTICS</span>
                </div>
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-[#16A34A]" />
                  <span>OLYMPIAN & PRO COACHES</span>
                </div>
              </div>
            </div>

            {/* Right Visual / Quote Card */}
            <div className="lg:col-span-5 relative">
              <div className="relative rounded-2xl overflow-hidden shadow-md border border-[#E2E8F0]">
                <img
                  src="https://images.unsplash.com/photo-1517649763962-0c623266ddc0?auto=format&fit=crop&w=1200&q=85"
                  alt="Granger Campus Athlete"
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-80 sm:h-96 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6 text-white">
                  <Quote className="w-8 h-8 text-[#FF671C] mb-2 opacity-90" />
                  <p className="font-sport text-xl sm:text-2xl font-black uppercase italic tracking-wide leading-tight">
                    "TRUE ATHLETIC EXCELLENCE ISN'T MEASURED JUST BY HOW HARD YOU PUSH TODAY, BUT BY HOW EXPLOSIVE AND PAIN-FREE YOU MOVE TWENTY YEARS FROM NOW."
                  </p>
                  <div className="mt-4 pt-3 border-t border-white/20 flex items-center justify-between">
                    <div>
                      <p className="font-tech font-bold text-xs uppercase tracking-wider text-white">ARTHUR & DIANE GRANGER</p>
                      <p className="font-tech text-[10px] text-white/70">FOUNDERS & PERFORMANCE DIRECTORS</p>
                    </div>
                    <span className="font-tech text-[10px] bg-[#FF671C] text-white px-2.5 py-0.5 rounded font-black uppercase">
                      EST. 1997
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 3. THE 4 FOUNDATIONAL PILLARS (Interactive Sports Deep-Dive) */}
      {/* ========================================================================= */}
      <section className="w-full px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#00a0e7]" />
                <span className="font-tech text-xs font-black uppercase tracking-widest text-[#00a0e7]">
                  THE GRANGER METHODOLOGY
                </span>
              </div>
              <h2 className="font-sport text-3xl sm:text-4xl md:text-5xl font-black uppercase italic text-[#0c1017] tracking-tight leading-[0.95]">
                FOUR PILLARS OF ATHLETIC LONGEVITY
              </h2>
            </div>
            <p className="text-xs sm:text-sm text-[#64748B] max-w-md font-sans">
              Explore how our integrated sports science protocols maximize explosive power, joint longevity, and metabolic endurance.
            </p>
          </div>

          {/* Pillar Navigation Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            {principles.map((p, idx) => {
              const Icon = p.icon;
              const isSelected = activePrinciple === idx;
              return (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActivePrinciple(idx)}
                  className={`text-left p-6 rounded-2xl border transition-all cursor-pointer relative overflow-hidden flex flex-col justify-between min-h-[190px] ${
                    isSelected
                      ? 'bg-[#0c1017] text-white border-[#0c1017] shadow-md transform -translate-y-1'
                      : 'bg-white text-[#0c1017] border-[#E2E8F0] hover:border-[#CBD5E1] shadow-2xs hover:bg-[#F8FAFC]'
                  }`}
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className={`font-sport text-2xl font-black italic ${isSelected ? 'text-[#FF671C]' : 'text-[#64748B]'}`}>
                        {p.number}
                      </span>
                      <div
                        className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                          isSelected ? 'bg-white/10 text-white' : 'bg-gray-100 text-[#0c1017]'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                      </div>
                    </div>
                    <h3 className="font-sport text-xl sm:text-2xl font-black uppercase italic leading-tight">
                      {p.title}
                    </h3>
                  </div>

                  <div className="pt-3 flex items-center gap-1.5 font-tech text-xs font-bold uppercase">
                    <span className={isSelected ? 'text-[#FF671C]' : 'text-[#64748B]'}>
                      {isSelected ? 'ACTIVE DISCIPLINE' : 'EXPLORE PROTOCOL'}
                    </span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </div>
                </button>
              );
            })}
          </div>

          {/* Active Principle Detailed Feature Card */}
          <AnimatePresence mode="wait">
            {principles[activePrinciple] && (
              <motion.div
                key={activePrinciple}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25 }}
                className="bg-white rounded-3xl p-8 sm:p-10 border border-[#E2E8F0] shadow-xs"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex items-center gap-2">
                      <span
                        className="font-tech px-3 py-1 rounded-md text-[11px] font-black uppercase tracking-wider text-white"
                        style={{ backgroundColor: principles[activePrinciple].accent }}
                      >
                        PILLAR {principles[activePrinciple].number} • {principles[activePrinciple].tag}
                      </span>
                      <span className="font-tech text-xs font-bold text-[#64748B] uppercase tracking-wider">
                        ATHLETIC PROTOCOL
                      </span>
                    </div>

                    <h3 className="font-sport text-2xl sm:text-3xl md:text-4xl font-black uppercase italic text-[#0c1017] leading-tight">
                      {principles[activePrinciple].headline}
                    </h3>

                    <p className="text-sm text-[#4A5568] leading-relaxed">
                      {principles[activePrinciple].desc}
                    </p>

                    <div className="space-y-2.5 pt-2">
                      <p className="font-tech text-xs font-black uppercase tracking-wider text-[#0c1017]">
                        TRAINING CALIBRATION ADVANTAGES:
                      </p>
                      {principles[activePrinciple].benefits.map((b, i) => (
                        <div key={i} className="flex items-center gap-2 text-xs sm:text-sm text-[#4A5568]">
                          <CheckCircle2 className="w-4 h-4 text-[#16A34A] flex-shrink-0" />
                          <span>{b}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="lg:col-span-5 bg-[#F8FAFC] rounded-2xl p-6 border border-[#E2E8F0] space-y-4">
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold"
                        style={{ backgroundColor: principles[activePrinciple].accent }}
                      >
                        <Sparkles className="w-6 h-6" />
                      </div>
                      <div>
                        <p className="font-sport text-xl font-black uppercase italic text-[#0c1017]">SPORTS MEDICINE ACCREDITED</p>
                        <p className="font-tech text-[11px] text-[#64748B] uppercase">CALIBRATED WITH PEER-REVIEWED PHYSIOLOGY</p>
                      </div>
                    </div>

                    <div className="p-4 bg-white rounded-xl border border-[#E2E8F0] text-xs text-[#4A5568]">
                      <p className="font-tech font-black text-[#0c1017] uppercase mb-1">COACH DASHBOARD INTEGRATION:</p>
                      Our entire coaching and medical staff coordinates via live biomechanics dashboards to adjust intensity based on your neuromuscular readiness score.
                    </div>

                    <button
                      type="button"
                      onClick={onBookTour}
                      className="font-tech w-full bg-[#0c1017] hover:bg-[#FF671C] text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all duration-200 shadow-xs cursor-pointer"
                    >
                      EXPERIENCE AT GRANGER CAMPUS
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 4. THE WORLD-CLASS CAMPUS & MASTER FACILITIES */}
      {/* ========================================================================= */}
      <section className="w-full px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto w-full bg-white rounded-3xl p-8 sm:p-12 border border-[#E2E8F0] shadow-xs">
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-8 pb-6 border-b border-[#E2E8F0]">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#FF671C]" />
                <span className="font-tech text-xs font-black uppercase tracking-widest text-[#FF671C]">
                  CAMPUS INFRASTRUCTURE
                </span>
              </div>
              <h2 className="font-sport text-3xl sm:text-4xl md:text-5xl font-black uppercase italic text-[#0c1017] tracking-tight leading-[0.95]">
                MASTER FACILITY BLUEPRINT
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1 font-sans">
                45,000 square feet of purposefully engineered court, recovery, and scientific infrastructure.
              </p>
            </div>

            {/* Facility Switcher Tabs with Sliding Indicator */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {(
                [
                  { id: 'arena', label: 'HARDWOOD ARENA' },
                  { id: 'clay', label: 'CLAY STADIUM' },
                  { id: 'recovery', label: 'HYDRO RECOVERY' },
                  { id: 'lab', label: 'BIOMECHANICS LAB' },
                  { id: 'fuel', label: 'FUEL BAR' },
                ] as const
              ).map((tab) => {
                const isActive = activeFacility === tab.id;
                return (
                  <button
                    key={tab.id}
                    type="button"
                    onClick={() => setActiveFacility(tab.id)}
                    className={`font-tech px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-colors relative cursor-pointer whitespace-nowrap ${
                      isActive
                        ? 'text-white'
                        : 'bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] hover:text-[#0c1017]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="aboutFacilityIndicator"
                        className="absolute inset-0 bg-[#0c1017] rounded-xl shadow-xs -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Facility Display with AnimatePresence */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeFacility}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
              className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
              <div className="lg:col-span-7 relative h-72 sm:h-[420px] rounded-2xl overflow-hidden shadow-md border border-[#E2E8F0] group">
                <img
                  src={activeFacData.image}
                  alt={activeFacData.name}
                  loading="lazy"
                  decoding="async"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-108"
                />
                <div className="absolute top-4 left-4">
                  <span className="font-tech bg-black/80 backdrop-blur-md text-white text-[11px] font-black px-3.5 py-1.5 rounded-lg border border-white/20 uppercase tracking-wider">
                    {activeFacData.category}
                  </span>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-5">
                <div>
                  <p className="font-tech text-xs font-black text-[#FF671C] uppercase tracking-wider mb-1">
                    {activeFacData.specs}
                  </p>
                  <h3 className="font-sport text-3xl sm:text-4xl font-black uppercase italic text-[#0c1017] tracking-tight">
                    {activeFacData.name}
                  </h3>
                </div>

                <p className="text-xs sm:text-sm text-[#4A5568] leading-relaxed font-sans">
                  {activeFacData.desc}
                </p>

                <div className="space-y-2 pt-1">
                  <p className="font-tech text-xs font-black uppercase tracking-wider text-[#0c1017]">
                    INFRASTRUCTURE SPECIFICATIONS:
                  </p>
                  {activeFacData.highlights.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2 text-xs text-[#4A5568]">
                      <CheckCircle2 className="w-4 h-4 text-[#FF671C] flex-shrink-0 mt-0.5" />
                      <span>{item}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 flex items-center gap-3">
                  <motion.button
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                    type="button"
                    onClick={onBookTour}
                    className="font-tech bg-[#0c1017] hover:bg-[#FF671C] text-white px-6 py-3.5 rounded-xl text-xs font-black uppercase tracking-wider flex items-center gap-2 transition-all shadow-xs cursor-pointer animate-shine"
                  >
                    <Building className="w-3.5 h-3.5 text-[#FF671C]" />
                    <span>RESERVE PRIVATE WALKTHROUGH</span>
                  </motion.button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. MASTER COACHING ROSTER & MEDICAL ADVISORY */}
      {/* ========================================================================= */}
      <section className="w-full px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2.5 h-2.5 rounded-full bg-[#16A34A]" />
                <span className="font-tech text-xs font-black uppercase tracking-widest text-[#16A34A]">
                  LEADERSHIP & MENTORSHIP
                </span>
              </div>
              <h2 className="font-sport text-3xl sm:text-4xl md:text-5xl font-black uppercase italic text-[#0c1017] tracking-tight leading-[0.95]">
                MEET THE GRANGER MASTERS
              </h2>
              <p className="text-xs sm:text-sm text-[#64748B] mt-1 font-sans">
                Former professional tour players, Olympian mentors, and doctoral sports scientists.
              </p>
            </div>

            {/* Category Filter Pills with Sliding Indicator */}
            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
              {(['All', 'Basketball', 'Tennis', 'Science', 'Nutrition'] as const).map((cat) => {
                const isActive = selectedCoachCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCoachCategory(cat)}
                    className={`font-tech px-4 py-1.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors relative cursor-pointer ${
                      isActive
                        ? 'text-white'
                        : 'bg-white border border-[#E2E8F0] text-[#64748B] hover:text-[#0c1017]'
                    }`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="coachCategoryIndicator"
                        className="absolute inset-0 bg-[#FF671C] rounded-xl shadow-2xs -z-10"
                        transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                      />
                    )}
                    <span>{cat}</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Coach Cards Grid with Motion (4 Columns) */}
          <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            <AnimatePresence>
              {filteredCoaches.map((coach, idx) => (
                <motion.div
                  layout="position"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                  whileHover={{ y: -6 }}
                  key={coach.name}
                  className="bg-white rounded-3xl border border-[#E2E8F0] overflow-hidden shadow-2xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="relative h-64 overflow-hidden bg-gray-100">
                      <img
                        src={coach.image}
                        alt={coach.name}
                        loading="lazy"
                        decoding="async"
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
                      />
                      <div className="absolute top-3 right-3 px-3 py-1 rounded-lg bg-black/80 backdrop-blur-md text-white font-tech text-[10px] font-black uppercase tracking-wider border border-white/20">
                        {coach.badge}
                      </div>
                    </div>

                    <div className="p-6">
                      <span className="font-tech text-[11px] font-black uppercase tracking-widest text-[#FF671C]">
                        {coach.role}
                      </span>
                      <h3 className="font-sport text-2xl sm:text-3xl font-black uppercase italic text-[#0c1017] mt-1 tracking-tight">
                        {coach.name}
                      </h3>
                      <p className="font-tech text-[11px] text-[#64748B] font-bold mt-0.5 uppercase">
                        {coach.experience}
                      </p>

                      <p className="text-xs text-[#4A5568] mt-3 leading-relaxed font-sans">
                        {coach.bio}
                      </p>
                    </div>
                  </div>

                  <div className="px-6 pb-6 pt-3 border-t border-[#F1F5F9] bg-[#FAFAFA]">
                    <p className="font-tech text-[10px] font-black uppercase tracking-wider text-[#94A3B8]">
                      CORE SPECIALIZATION:
                    </p>
                    <p className="font-tech text-xs font-black uppercase text-[#0c1017] mt-0.5">
                      {coach.specialty}
                    </p>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 6. CHRONOLOGICAL TIMELINE / HERITAGE */}
      {/* ========================================================================= */}
      <section className="w-full px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto w-full bg-[#0c1017] text-white rounded-3xl p-8 sm:p-12 border border-black/10">
          <div className="max-w-3xl mb-10">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF671C]" />
              <span className="font-tech text-xs font-black uppercase tracking-widest text-[#FF671C]">
                HISTORIC MILESTONES
              </span>
            </div>
            <h2 className="font-sport text-3xl sm:text-4xl md:text-5xl font-black uppercase italic leading-[0.95] tracking-tight">
              TWENTY-EIGHT YEARS OF CONSTANT ATHLETIC INNOVATION
            </h2>
            <p className="text-xs sm:text-sm text-white/70 mt-2 font-sans">
              From our humble single-court research bay to Southern California's premier athletic destination.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {milestones.map((m, idx) => (
              <div key={idx} className="relative flex flex-col justify-between border-t-2 border-[#FF671C] pt-4">
                <div>
                  <span className="font-sport text-4xl sm:text-5xl font-black italic tracking-tighter text-[#FF671C] block mb-1">
                    {m.year}
                  </span>
                  <h4 className="font-sport text-lg sm:text-xl font-black uppercase italic text-white mb-2 leading-snug">
                    {m.title}
                  </h4>
                  <p className="text-xs text-white/70 leading-relaxed font-sans">
                    {m.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 7. ENVIRONMENTAL & COMMUNITY STANDARDS */}
      {/* ========================================================================= */}
      <section className="w-full px-4 sm:px-6 lg:px-8 mb-16">
        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white p-8 rounded-3xl border border-[#E2E8F0] shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
              <Leaf className="w-6 h-6" />
            </div>
            <h3 className="font-sport text-2xl font-black uppercase italic text-[#0c1017]">
              100% SOLAR-POWERED LIGHTING
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-sans">
              Every stadium floodlight, climate-controlled recovery suite, and digital scoreboard runs entirely on our rooftop solar generation grid with commercial battery storage.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#E2E8F0] shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#00a0e7] flex items-center justify-center">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="font-sport text-2xl font-black uppercase italic text-[#0c1017]">
              ITF GOLD & FIBA CERTIFIED
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-sans">
              Our courts undergo bi-annual acoustic, friction, and shock-absorption inspections to adhere strictly to international tournament standards.
            </p>
          </div>

          <div className="bg-white p-8 rounded-3xl border border-[#E2E8F0] shadow-2xs space-y-3">
            <div className="w-12 h-12 rounded-2xl bg-orange-50 text-[#FF671C] flex items-center justify-center">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="font-sport text-2xl font-black uppercase italic text-[#0c1017]">
              YOUTH ACADEMY SCHOLARSHIPS
            </h3>
            <p className="text-xs text-[#64748B] leading-relaxed font-sans">
              5% of all Granger membership fees directly fund fully accredited year-round athletic training and academic tutoring scholarships for underprivileged youth athletes.
            </p>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 8. INVITATION & PRE-FOOTER CTA */}
      {/* ========================================================================= */}
      <section className="w-full px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto w-full bg-gradient-to-r from-[#0c1017] to-[#152336] text-white rounded-3xl p-8 sm:p-12 border border-black/10 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 max-w-xl">
            <span className="font-tech bg-[#FF671C] text-white text-[10px] font-black px-3 py-1 rounded-md uppercase tracking-widest inline-block">
              SCHEDULE YOUR VISIT
            </span>
            <h2 className="font-sport text-3xl sm:text-4xl md:text-5xl font-black uppercase italic leading-[0.95] tracking-tight">
              READY TO EXPERIENCE THE GRANGER STANDARD IN PERSON?
            </h2>
            <p className="text-xs sm:text-sm text-white/75 leading-relaxed font-sans">
              Walk through the hardwood arenas, test the clay courts, and consult with our performance directors. Tours are complimentary by appointment.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto flex-shrink-0">
            <button
              type="button"
              onClick={onBookTour}
              className="font-tech w-full sm:w-auto bg-[#FF671C] hover:bg-[#e05615] text-white px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all duration-200 shadow-md cursor-pointer text-center"
            >
              BOOK COMPLIMENTARY TOUR
            </button>
            <button
              type="button"
              onClick={onOpenGetInTouch}
              className="font-tech w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white border border-white/20 px-8 py-3.5 rounded-xl text-xs font-black uppercase tracking-widest transition-all cursor-pointer text-center"
            >
              CONTACT DIRECTOR
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
