import { useState } from 'react';
import { BarChart3, MoreHorizontal } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { TrackingTab } from '../types';

interface TrackingSectionProps {
  onViewDashboard: () => void;
}

export function TrackingSection({ onViewDashboard }: TrackingSectionProps) {
  const [activeTab, setActiveTab] = useState<TrackingTab>('Activity');
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const tabData = {
    Activity: {
      metricName: 'CALORIES BURNED',
      value: '2,780',
      unit: 'Cal',
      path: 'M 0 130 C 50 130, 80 80, 120 90 C 160 100, 200 40, 250 60 C 300 80, 350 20, 400 30',
      points: [
        { cx: 120, cy: 90, label: 'Wed', value: '1,850 Cal' },
        { cx: 250, cy: 60, label: 'Fri', value: '2,320 Cal' },
        { cx: 400, cy: 30, label: 'Sun', value: '2,780 Cal' },
      ],
      legends: [
        { label: 'Workout', color: 'bg-[#FF671C]' },
        { label: 'Running', color: 'bg-[#00a0e7]' },
        { label: 'Walking', color: 'bg-gray-300' },
      ],
    },
    Diet: {
      metricName: 'TARGET INTAKE',
      value: '2,150',
      unit: 'kcal',
      path: 'M 0 90 C 60 70, 100 110, 150 85 C 200 60, 280 95, 320 50 C 360 40, 380 45, 400 40',
      points: [
        { cx: 150, cy: 85, label: 'Wed', value: '2,050 kcal' },
        { cx: 320, cy: 50, label: 'Fri', value: '2,100 kcal' },
        { cx: 400, cy: 40, label: 'Sun', value: '2,150 kcal' },
      ],
      legends: [
        { label: 'Proteins', color: 'bg-[#FF671C]' },
        { label: 'Carbs', color: 'bg-[#00a0e7]' },
        { label: 'Healthy Fats', color: 'bg-gray-300' },
      ],
    },
    Sleep: {
      metricName: 'RECOVERY SCORE',
      value: '8.4',
      unit: 'hrs',
      path: 'M 0 110 C 70 120, 110 60, 160 55 C 210 50, 260 90, 310 40 C 350 35, 380 30, 400 25',
      points: [
        { cx: 160, cy: 55, label: 'Wed', value: '7.8 hrs' },
        { cx: 310, cy: 40, label: 'Fri', value: '8.2 hrs' },
        { cx: 400, cy: 25, label: 'Sun', value: '8.4 hrs' },
      ],
      legends: [
        { label: 'Deep Sleep', color: 'bg-[#FF671C]' },
        { label: 'REM Sleep', color: 'bg-[#00a0e7]' },
        { label: 'Light Sleep', color: 'bg-gray-300' },
      ],
    },
  };

  const current = tabData[activeTab];

  return (
    <section className="w-full py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#F0F2F5] overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col lg:flex-row gap-10 lg:gap-16 items-center">
        {/* Left Column with Viewport Reveal */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
          className="lg:w-1/2 flex flex-col items-start w-full"
        >
          <div className="flex items-center gap-2 mb-3 sm:mb-4">
            <div className="w-2.5 h-2.5 rounded-full bg-[#FF671C] animate-pulse" />
            <span className="font-tech text-xs uppercase font-black tracking-widest text-[#FF671C]">
              BIOMETRIC TELEMETRY & TRACKING
            </span>
          </div>

          <h2 className="font-sport text-3xl sm:text-5xl lg:text-7xl font-black uppercase italic text-[#0c1017] leading-[0.92] mb-4 sm:mb-6 tracking-tight">
            STAY MOTIVATED WITH ACTIVE REAL-TIME TELEMETRY
          </h2>

          <p className="text-sm sm:text-base text-[#64748B] max-w-lg mb-6 sm:mb-8 leading-relaxed font-sans">
            Monitor force production, heart rate variability, and metabolic expenditure in real-time with our intuitive data telemetry suite.
          </p>

          <motion.button
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            onClick={onViewDashboard}
            className="font-tech bg-[#FF671C] hover:bg-[#e05615] text-white rounded-xl px-6 sm:px-7 py-3.5 text-xs font-black uppercase tracking-wider flex items-center gap-2.5 transition-all shadow-md cursor-pointer animate-shine"
          >
            <span>VIEW LIVE TELEMETRY</span>
            <BarChart3 className="w-4 h-4" />
          </motion.button>
        </motion.div>

        {/* Right Column: Chart Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.52, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="lg:w-1/2 w-full"
        >
          <div className="bg-white rounded-3xl border border-[#E2E8F0] p-4 sm:p-6 md:p-8 shadow-sm hover:shadow-xl transition-shadow duration-300">
            {/* Top Filter Buttons with Sliding layoutId indicator */}
            <div className="flex justify-between items-center mb-6 sm:mb-8">
              <div className="flex items-center gap-1 p-1 bg-[#F8FAFC] rounded-2xl border border-[#E2E8F0]">
                {(['Activity', 'Diet', 'Sleep'] as TrackingTab[]).map((tab) => {
                  const isSelected = activeTab === tab;
                  return (
                    <button
                      key={tab}
                      onClick={() => setActiveTab(tab)}
                      className={`font-tech px-3 sm:px-4 py-1.5 sm:py-2 rounded-xl text-[11px] sm:text-xs font-black uppercase tracking-wider transition-colors duration-200 relative cursor-pointer ${
                        isSelected ? 'text-white' : 'text-[#64748B] hover:text-[#0c1017]'
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          layoutId="trackingTabIndicator"
                          className="absolute inset-0 bg-[#FF671C] rounded-xl shadow-xs -z-10"
                          transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                        />
                      )}
                      <span>{tab}</span>
                    </button>
                  );
                })}
              </div>

              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={onViewDashboard}
                title="Options"
                className="p-2 text-[#64748B] hover:text-[#0c1017] hover:bg-[#F8FAFC] rounded-xl transition-colors cursor-pointer border border-[#E2E8F0]"
              >
                <MoreHorizontal className="w-5 h-5" />
              </motion.button>
            </div>

            {/* Metric Display with AnimatePresence */}
            <div className="mb-6">
              <span className="font-tech text-xs font-black text-[#64748B] uppercase tracking-wider">
                {current.metricName}
              </span>
              <div className="flex items-baseline gap-2 mt-1">
                <AnimatePresence mode="wait">
                  <motion.span
                    key={activeTab + current.value}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                    className="font-sport text-5xl sm:text-6xl font-black italic tracking-tighter text-[#0c1017]"
                  >
                    {current.value}
                  </motion.span>
                </AnimatePresence>
                <span className="font-tech text-sm font-bold text-[#FF671C] uppercase">
                  {current.unit}
                </span>
              </div>
            </div>

            {/* Interactive SVG Chart */}
            <div className="relative h-44 w-full pt-4">
              <svg
                viewBox="0 0 400 160"
                className="w-full h-full overflow-visible"
                preserveAspectRatio="none"
              >
                {/* Horizontal Grid lines */}
                <line x1="0" y1="40" x2="400" y2="40" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="90" x2="400" y2="90" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />
                <line x1="0" y1="140" x2="400" y2="140" stroke="#E2E8F0" strokeWidth="1" strokeDasharray="4 4" />

                {/* Animated Line Path */}
                <motion.path
                  key={activeTab}
                  d={current.path}
                  fill="none"
                  stroke="#FF671C"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  initial={{ pathLength: 0, opacity: 0 }}
                  animate={{ pathLength: 1, opacity: 1 }}
                  transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                />

                {/* Interactive Nodes with Tooltip */}
                {current.points.map((pt, idx) => (
                  <g key={idx}>
                    <circle
                      cx={pt.cx}
                      cy={pt.cy}
                      r="6"
                      fill="#FFFFFF"
                      stroke="#FF671C"
                      strokeWidth="3.5"
                      className="cursor-pointer transition-transform duration-200 hover:scale-150"
                      onMouseEnter={() => setHoveredPoint(idx)}
                      onMouseLeave={() => setHoveredPoint(null)}
                    />
                    {hoveredPoint === idx && (
                      <g>
                        <rect
                          x={pt.cx - 35}
                          y={pt.cy - 35}
                          width="70"
                          height="24"
                          rx="6"
                          fill="#0c1017"
                        />
                        <text
                          x={pt.cx}
                          y={pt.cy - 19}
                          textAnchor="middle"
                          fill="#ffffff"
                          fontSize="11"
                          fontFamily="sans-serif"
                          fontWeight="bold"
                        >
                          {pt.value}
                        </text>
                      </g>
                    )}
                  </g>
                ))}
              </svg>
            </div>

            {/* Days of week axis */}
            <div className="flex justify-between text-xs text-[#64748B] font-tech font-bold uppercase mt-3 pt-2 border-t border-[#E2E8F0]">
              <span>MON</span>
              <span>TUE</span>
              <span>WED</span>
              <span>THU</span>
              <span>FRI</span>
              <span>SAT</span>
              <span>SUN</span>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap items-center gap-6 mt-6 pt-4 border-t border-[#E2E8F0]">
              {current.legends.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className={`w-3 h-3 rounded-full ${item.color}`} />
                  <span className="font-tech text-xs font-bold text-[#64748B] uppercase">{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

