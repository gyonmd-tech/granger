import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Activity,
  Zap,
  Gauge,
  Sparkles,
  Flame,
  ArrowRight,
  TrendingUp,
  RefreshCw,
  Sliders,
  ShieldCheck,
  Award,
  Play,
  RotateCcw,
  Target,
} from 'lucide-react';
import { CourtZoneTelemetry } from '../types';

const BASKETBALL_ZONES: CourtZoneTelemetry[] = [
  {
    id: 'paint',
    name: 'Restricted Paint & Rim Finishing',
    zone: 'Inside Key',
    accuracy: 68.4,
    arcAngle: 42.1,
    velocity: 5.8,
    attempts: 120,
    made: 82,
    status: 'Elite',
    color: '#FF671C',
  },
  {
    id: 'free-throw',
    name: 'Free Throw Line & Elbow Mid-Range',
    zone: 'Mid-Range',
    accuracy: 84.2,
    arcAngle: 48.6,
    velocity: 6.4,
    attempts: 95,
    made: 80,
    status: 'Elite',
    color: '#16A34A',
  },
  {
    id: 'corner-3-right',
    name: 'Right Corner 3-Point Deep Arc',
    zone: 'Corner Arc',
    accuracy: 45.8,
    arcAngle: 46.2,
    velocity: 7.2,
    attempts: 72,
    made: 33,
    status: 'Optimal',
    color: '#00a0e7',
  },
  {
    id: 'top-3',
    name: 'Top of Key Above-the-Break 3PT',
    zone: 'Deep 3-Point',
    accuracy: 41.5,
    arcAngle: 50.4,
    velocity: 7.9,
    attempts: 110,
    made: 46,
    status: 'Optimal',
    color: '#00a0e7',
  },
  {
    id: 'corner-3-left',
    name: 'Left Corner 3-Point Baseline',
    zone: 'Corner Arc',
    accuracy: 38.2,
    arcAngle: 45.0,
    velocity: 7.1,
    attempts: 55,
    made: 21,
    status: 'Calibrating',
    color: '#EAB308',
  },
];

const TENNIS_ZONES: CourtZoneTelemetry[] = [
  {
    id: 'baseline-rally',
    name: 'Heavy Topspin Baseline Cross-Court',
    zone: 'Deep Baseline',
    accuracy: 78.5,
    arcAngle: 18.4,
    velocity: 118.2,
    attempts: 140,
    made: 110,
    status: 'Elite',
    color: '#FF671C',
  },
  {
    id: 'service-box-t',
    name: 'First Serve Down the T (Flat & Slice)',
    zone: 'Center Service',
    accuracy: 64.0,
    arcAngle: 12.8,
    velocity: 188.5,
    attempts: 80,
    made: 51,
    status: 'Elite',
    color: '#16A34A',
  },
  {
    id: 'short-angle',
    name: 'Inside-Out Forehand Sharp Angle',
    zone: 'Mid-Court',
    accuracy: 71.2,
    arcAngle: 22.0,
    velocity: 105.0,
    attempts: 65,
    made: 46,
    status: 'Optimal',
    color: '#00a0e7',
  },
  {
    id: 'net-volley',
    name: 'Punch Net Volley & Drop Shot',
    zone: 'Forecourt Net',
    accuracy: 82.0,
    arcAngle: 8.5,
    velocity: 65.4,
    attempts: 50,
    made: 41,
    status: 'Elite',
    color: '#16A34A',
  },
];

interface LabPageProps {
  onBookLabSession?: () => void;
  onNavigateHome?: () => void;
}

export function LabPage({ onBookLabSession }: LabPageProps) {
  const [selectedSport, setSelectedSport] = useState<'Basketball' | 'Tennis'>('Basketball');
  const [activeZone, setActiveZone] = useState<CourtZoneTelemetry>(BASKETBALL_ZONES[0]);

  // Jump Analyzer State
  const [jumpMode, setJumpMode] = useState<'Max Vertical' | 'Repeated Plyo' | 'Fatigue State'>('Max Vertical');
  const [isSimulatingJump, setIsSimulatingJump] = useState(false);
  const [jumpApex, setJumpApex] = useState(34.6);
  const [decelerationG, setDecelerationG] = useState(4.2);

  // AI Readiness Calibrator State
  const [sleepHours, setSleepHours] = useState(8.2);
  const [hrvValue, setHrvValue] = useState(78);
  const [trainingLoadTSS, setTrainingLoadTSS] = useState(140);

  // Calculate dynamic readiness score
  const calculatedReadiness = Math.min(
    100,
    Math.max(
      35,
      Math.round(
        (sleepHours / 8.5) * 40 +
          (hrvValue / 85) * 40 -
          (trainingLoadTSS / 300) * 20
      )
    )
  );

  const zones = selectedSport === 'Basketball' ? BASKETBALL_ZONES : TENNIS_ZONES;

  const handleSportChange = (sport: 'Basketball' | 'Tennis') => {
    setSelectedSport(sport);
    setActiveZone(sport === 'Basketball' ? BASKETBALL_ZONES[0] : TENNIS_ZONES[0]);
  };

  const handleTriggerJumpSimulation = () => {
    setIsSimulatingJump(true);
    setTimeout(() => {
      const variation = (Math.random() * 2 - 1).toFixed(1);
      const newApex = parseFloat((jumpMode === 'Max Vertical' ? 34.6 : jumpMode === 'Repeated Plyo' ? 31.8 : 28.4).toFixed(1)) + parseFloat(variation);
      setJumpApex(parseFloat(newApex.toFixed(1)));
      setDecelerationG(parseFloat((3.8 + Math.random() * 0.8).toFixed(1)));
      setIsSimulatingJump(false);
    }, 1000);
  };

  return (
    <div className="w-full bg-[#F0F2F5] min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full space-y-8">
        {/* ========================================================================= */}
        {/* 1. EDITORIAL HEADER & SENSOR STATUS */}
        {/* ========================================================================= */}
        <section className="bg-gradient-to-r from-[#0c1017] via-[#161f2e] to-[#0c1017] rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-white/15 relative overflow-hidden">
          <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#FF671C]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 right-10 w-80 h-80 bg-[#00a0e7]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-2.5 font-tech">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
                <span className="text-xs font-black uppercase tracking-widest text-[#FF671C] bg-[#FF671C]/10 px-3 py-1 rounded-md border border-[#FF671C]/20">
                  VALD FORCE PLATES & 240FPS OPTICAL ARRAY
                </span>
                <span className="text-white/40">•</span>
                <span className="text-xs font-bold text-white/70 uppercase">
                  CALIBRATION LAB #04
                </span>
              </div>

              <h1 className="font-sport text-4xl sm:text-6xl lg:text-7xl font-black uppercase italic tracking-tight text-white leading-[0.92]">
                KINEMATIC BIOMECHANICS & TELEMETRY STUDIO.
              </h1>

              <p className="text-white/80 text-xs sm:text-base mt-3 font-sans max-w-2xl leading-relaxed">
                Experience real-time shot trajectory modeling, dual-force plate jump kinetics, and individualized neuromuscular readiness calculation tuned by Granger sports scientists.
              </p>
            </div>

            {onBookLabSession && (
              <button
                type="button"
                onClick={onBookLabSession}
                className="font-tech bg-[#FF671C] hover:bg-[#e05615] text-white px-6 py-4 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center justify-center gap-2 shadow-xl hover:shadow-2xl transition-all cursor-pointer animate-shine flex-shrink-0"
              >
                <Sparkles className="w-4 h-4" />
                <span>BOOK 1-ON-1 LAB EVALUATION</span>
              </button>
            )}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 2. COURT HEATMAP & SHOT ARC SIMULATOR */}
        {/* ========================================================================= */}
        <section className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#E2E8F0] shadow-xs space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-[#E2E8F0]">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Target className="w-4 h-4 text-[#FF671C]" />
                <span className="font-tech text-xs font-black uppercase tracking-widest text-[#FF671C]">
                  TELEMETRY SHOT CHART SIMULATION
                </span>
              </div>
              <h2 className="font-sport text-3xl sm:text-4xl font-black italic uppercase text-[#0c1017]">
                INTERACTIVE COURT KINEMATICS
              </h2>
            </div>

            {/* Sport Switcher */}
            <div className="flex items-center gap-2 bg-[#F8FAFC] p-1.5 rounded-2xl border border-[#E2E8F0] font-tech">
              <button
                type="button"
                onClick={() => handleSportChange('Basketball')}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  selectedSport === 'Basketball'
                    ? 'bg-[#0c1017] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#0c1017]'
                }`}
              >
                🏀 HARDWOOD BASKETBALL
              </button>
              <button
                type="button"
                onClick={() => handleSportChange('Tennis')}
                className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
                  selectedSport === 'Tennis'
                    ? 'bg-[#0c1017] text-white shadow-xs'
                    : 'text-[#64748B] hover:text-[#0c1017]'
                }`}
              >
                🎾 ROLAND CLAY TENNIS
              </button>
            </div>
          </div>

          {/* Interactive Layout: Left Visual Court SVG, Right Zone Telemetry Card */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Visual SVG Court representation */}
            <div className="lg:col-span-7 bg-[#0c1017] rounded-3xl p-6 sm:p-8 border border-black/10 relative overflow-hidden shadow-inner flex flex-col items-center justify-center min-h-[380px] sm:min-h-[440px]">
              {/* Floor Texture & Court Lines */}
              <div className="w-full max-w-md aspect-[4/3] relative rounded-2xl border-2 border-white/20 p-4 flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#141d2b] to-[#0c1017]">
                {/* Court Boundary Graphics */}
                {selectedSport === 'Basketball' ? (
                  <>
                    {/* 3PT Arc */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-64 border-2 border-dashed border-white/30 rounded-b-full pointer-events-none" />
                    {/* Key Paint */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-44 border-2 border-white/40 bg-white/5 pointer-events-none" />
                    {/* Rim / Hoop */}
                    <div className="absolute top-6 left-1/2 -translate-x-1/2 w-8 h-8 rounded-full border-2 border-[#FF671C] flex items-center justify-center">
                      <div className="w-2 h-2 rounded-full bg-[#FF671C]" />
                    </div>
                  </>
                ) : (
                  <>
                    {/* Tennis Net */}
                    <div className="absolute top-1/2 left-0 right-0 h-1 bg-white/60 border-t border-b border-black/40 pointer-events-none" />
                    {/* Service Boxes */}
                    <div className="absolute inset-x-8 top-12 bottom-12 border-2 border-white/30 pointer-events-none grid grid-cols-2 grid-rows-2" />
                  </>
                )}

                {/* Hotspot Interactive Markers on Court */}
                <div className="relative z-10 w-full h-full flex flex-col justify-between">
                  <div className="flex justify-around items-center pt-2">
                    {zones.slice(0, 3).map((z) => (
                      <motion.button
                        key={z.id}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveZone(z)}
                        className={`px-3 py-2 rounded-xl text-xs font-tech font-black uppercase transition-all cursor-pointer flex items-center gap-1.5 shadow-lg ${
                          activeZone.id === z.id
                            ? 'bg-[#FF671C] text-white ring-4 ring-[#FF671C]/40'
                            : 'bg-black/60 text-white/80 border border-white/20 hover:bg-white/20'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        <span>{z.zone}</span>
                      </motion.button>
                    ))}
                  </div>

                  <div className="flex justify-around items-center pb-2">
                    {zones.slice(3).map((z) => (
                      <motion.button
                        key={z.id}
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => setActiveZone(z)}
                        className={`px-3 py-2 rounded-xl text-xs font-tech font-black uppercase transition-all cursor-pointer flex items-center gap-1.5 shadow-lg ${
                          activeZone.id === z.id
                            ? 'bg-[#FF671C] text-white ring-4 ring-[#FF671C]/40'
                            : 'bg-black/60 text-white/80 border border-white/20 hover:bg-white/20'
                        }`}
                      >
                        <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                        <span>{z.zone}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>

              <span className="font-tech text-[10px] text-white/60 uppercase tracking-widest mt-4">
                Click any zone marker to inspect live release kinematics & accuracy.
              </span>
            </div>

            {/* Right Telemetry Readout */}
            <div className="lg:col-span-5 space-y-5">
              <div className="flex items-center justify-between font-tech">
                <span className="text-xs font-black uppercase tracking-wider bg-[#FF671C]/10 text-[#FF671C] px-3 py-1 rounded-lg border border-[#FF671C]/20">
                  {activeZone.status.toUpperCase()} ZONE
                </span>
                <span className="text-xs font-bold text-[#64748B]">
                  {activeZone.made} / {activeZone.attempts} CONVERTED
                </span>
              </div>

              <h3 className="font-sport text-3xl font-black italic uppercase text-[#0c1017] leading-tight">
                {activeZone.name}
              </h3>

              {/* Metric Highlights */}
              <div className="grid grid-cols-2 gap-3 font-tech">
                <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0]">
                  <span className="text-[10px] text-[#94A3B8] uppercase block">ZONE ACCURACY</span>
                  <p className="font-sport text-4xl font-black italic text-[#FF671C] mt-1">{activeZone.accuracy}%</p>
                  <span className="text-[10px] text-emerald-600 font-bold">+4.2% vs Campus Benchmark</span>
                </div>

                <div className="bg-[#F8FAFC] p-4 rounded-2xl border border-[#E2E8F0]">
                  <span className="text-[10px] text-[#94A3B8] uppercase block">
                    {selectedSport === 'Basketball' ? 'OPTIMAL ARC ANGLE' : 'NET CLEARANCE ANGLE'}
                  </span>
                  <p className="font-sport text-4xl font-black italic text-[#00a0e7] mt-1">{activeZone.arcAngle}°</p>
                  <span className="text-[10px] text-[#00a0e7] font-bold">Standard 48.0° - 52.0°</span>
                </div>
              </div>

              <div className="bg-[#0c1017] text-white p-5 rounded-2xl border border-black/10 font-tech text-xs space-y-2">
                <div className="flex items-center gap-2 text-[#FF671C] font-black uppercase">
                  <Sparkles className="w-4 h-4" />
                  <span>BIOMECHANIC PRESCRIPTION</span>
                </div>
                <p className="font-sans text-xs text-white/80 leading-relaxed">
                  {selectedSport === 'Basketball'
                    ? 'Maintain high release elbow alignment. Focus on consistent wrist snap deceleration to minimize lateral ball rotation drift.'
                    : 'Engage kinetic chain through hips and core coil. Ensure follow-through extends fully across opposite shoulder for maximum topspin RPM.'}
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* 3. FORCE PLATE JUMP & DECELERATION ANALYZER + AI READINESS */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Force Plate Jump Simulator */}
          <section className="lg:col-span-7 bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs space-y-6 flex flex-col justify-between">
            <div>
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Zap className="w-4 h-4 text-[#FF671C]" />
                    <span className="font-tech text-xs font-black uppercase tracking-widest text-[#FF671C]">
                      VALD DUAL FORCE PLATE
                    </span>
                  </div>
                  <h3 className="font-sport text-3xl font-black italic uppercase text-[#0c1017]">
                    GROUND REACTION FORCE CURVE (GRF)
                  </h3>
                </div>

                {/* Mode Selector */}
                <select
                  value={jumpMode}
                  onChange={(e) => setJumpMode(e.target.value as any)}
                  className="font-tech text-xs font-bold bg-[#F8FAFC] border border-[#E2E8F0] px-3 py-2 rounded-xl text-[#0c1017] cursor-pointer"
                >
                  <option value="Max Vertical">MAX VERTICAL</option>
                  <option value="Repeated Plyo">REPEATED PLYO</option>
                  <option value="Fatigue State">FATIGUE STATE</option>
                </select>
              </div>

              {/* Kinetic Animated Waveform Visualizer */}
              <div className="bg-[#0c1017] rounded-2xl p-5 my-5 text-white font-tech relative overflow-hidden">
                <div className="flex justify-between items-center text-xs pb-3 border-b border-white/10">
                  <span className="text-[#94A3B8]">FORCE (NEWTONS) VS TIME (MS)</span>
                  <span className="text-emerald-400 font-bold">BILATERAL SYMMETRY: 50.1% L / 49.9% R</span>
                </div>

                {/* Wave Curve SVG */}
                <div className="py-6 flex items-center justify-center">
                  <svg viewBox="0 0 500 120" className="w-full h-24 stroke-current">
                    <path
                      d="M 0 90 Q 60 90 90 100 Q 130 115 160 30 Q 190 -10 220 70 Q 250 110 320 110 Q 380 110 420 40 Q 460 -5 500 90"
                      fill="none"
                      stroke="#FF671C"
                      strokeWidth="3.5"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 0 90 Q 60 90 90 100 Q 130 115 160 35 Q 190 -5 220 75 Q 250 110 320 110 Q 380 110 420 45 Q 460 0 500 90"
                      fill="none"
                      stroke="#00a0e7"
                      strokeWidth="2"
                      strokeDasharray="4 4"
                      className="opacity-70"
                    />
                  </svg>
                </div>

                <div className="flex justify-between items-center text-[10px] text-[#94A3B8]">
                  <span>ECCENTRIC BRAKING</span>
                  <span>CONCENTRIC PROPULSION</span>
                  <span>FLIGHT APEX</span>
                  <span>IMPACT DECELERATION</span>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 font-tech">
                <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0]">
                  <span className="text-[10px] text-[#94A3B8] uppercase block">TAKEOFF APEX</span>
                  <p className="font-sport text-3xl font-black italic text-[#FF671C] mt-0.5">{jumpApex} IN</p>
                </div>
                <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0]">
                  <span className="text-[10px] text-[#94A3B8] uppercase block">DECELERATION LOAD</span>
                  <p className="font-sport text-3xl font-black italic text-[#00a0e7] mt-0.5">{decelerationG} G</p>
                </div>
                <div className="bg-[#F8FAFC] p-3.5 rounded-xl border border-[#E2E8F0] col-span-2 sm:col-span-1">
                  <span className="text-[10px] text-[#94A3B8] uppercase block">FORCE TRANSMISSION</span>
                  <p className="font-sport text-3xl font-black italic text-emerald-600 mt-0.5">99.4%</p>
                </div>
              </div>
            </div>

            <button
              type="button"
              disabled={isSimulatingJump}
              onClick={handleTriggerJumpSimulation}
              className="font-tech w-full bg-[#0c1017] hover:bg-[#FF671C] text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-md mt-4"
            >
              {isSimulatingJump ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>CAPTURING SENSOR FORCES...</span>
                </>
              ) : (
                <>
                  <Play className="w-4 h-4 fill-current" />
                  <span>SIMULATE FORCE-PLATE JUMP REP</span>
                </>
              )}
            </button>
          </section>

          {/* AI Readiness Calibrator */}
          <section className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs space-y-5 flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Gauge className="w-4 h-4 text-[#FF671C]" />
                <span className="font-tech text-xs font-black uppercase tracking-widest text-[#FF671C]">
                  ALGORITHM V4.2
                </span>
              </div>
              <h3 className="font-sport text-3xl font-black italic uppercase text-[#0c1017]">
                AI READINESS ENGINE
              </h3>
              <p className="text-xs text-[#64748B] font-sans mt-0.5">
                Adjust bio-parameters to calculate your optimal neuromuscular workload.
              </p>

              {/* Gauge Score Circle */}
              <div className="p-6 my-4 rounded-3xl bg-[#0c1017] text-white text-center flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-t from-[#FF671C]/15 to-transparent pointer-events-none" />
                <span className="font-tech text-[10px] text-[#94A3B8] font-bold uppercase tracking-widest">
                  COMPUTED READINESS SCORE
                </span>
                <p className="font-sport text-6xl font-black italic text-[#FF671C] my-1">
                  {calculatedReadiness}%
                </p>
                <span className="font-tech text-xs font-black uppercase tracking-wider text-emerald-400 bg-white/10 px-3 py-1 rounded-full border border-white/10">
                  {calculatedReadiness >= 80 ? 'PRIME CADENCE • HIGH LOAD' : calculatedReadiness >= 60 ? 'MODERATE INTENSITY' : 'RECOVERY / CRYO REQUIRED'}
                </span>
              </div>

              {/* Range Sliders */}
              <div className="space-y-4 font-tech text-xs">
                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-[#0c1017]">SLEEP RECOVERY</span>
                    <span className="text-[#FF671C]">{sleepHours} Hours</span>
                  </div>
                  <input
                    type="range"
                    min={4}
                    max={10}
                    step={0.1}
                    value={sleepHours}
                    onChange={(e) => setSleepHours(parseFloat(e.target.value))}
                    className="w-full accent-[#FF671C] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-[#0c1017]">HEART RATE VARIABILITY (HRV)</span>
                    <span className="text-[#00a0e7]">{hrvValue} ms</span>
                  </div>
                  <input
                    type="range"
                    min={30}
                    max={120}
                    step={1}
                    value={hrvValue}
                    onChange={(e) => setHrvValue(parseInt(e.target.value))}
                    className="w-full accent-[#00a0e7] cursor-pointer"
                  />
                </div>

                <div>
                  <div className="flex justify-between font-bold mb-1">
                    <span className="text-[#0c1017]">48H TRAINING LOAD (TSS)</span>
                    <span className="text-[#16A34A]">{trainingLoadTSS} TSS</span>
                  </div>
                  <input
                    type="range"
                    min={50}
                    max={350}
                    step={10}
                    value={trainingLoadTSS}
                    onChange={(e) => setTrainingLoadTSS(parseInt(e.target.value))}
                    className="w-full accent-[#16A34A] cursor-pointer"
                  />
                </div>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-[#F8FAFC] border border-[#E2E8F0] font-sans text-xs text-[#475569]">
              <strong className="text-[#0c1017] font-tech">AI RECOVERY DIRECTIVE: </strong>
              {calculatedReadiness >= 80
                ? 'Cleared for maximum anaerobic intervals, heavy plyometrics, or full matchplay tournament sets.'
                : 'Prioritize contrast hydrotherapy (48°F / 104°F) and mobility drills before high-velocity court sprints.'}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
