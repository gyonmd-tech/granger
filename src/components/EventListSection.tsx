import { useState } from 'react';
import { ArrowRight, Calendar, MapPin, Users, Flame, Trophy, Sparkles, ChevronDown } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface EventListSectionProps {
  onSelectEvent: (eventName: string, price?: string) => void;
  onNavigateEvents?: () => void;
}

interface EventItem {
  id: string;
  title: string;
  category: string;
  tag: string;
  date: string;
  location: string;
  price: string;
  spotsLeft: number;
  prizePool?: string;
  description: string;
}

const EVENTS: EventItem[] = [
  {
    id: '1',
    title: 'ONLINE ATHLETIC ENDURANCE CHALLENGE',
    category: 'VIRTUAL',
    tag: 'STAGE 01',
    date: 'MARCH 05, 2026',
    location: 'GLOBAL TELEMETRY STREAM',
    price: '$25 / ENTRY',
    spotsLeft: 42,
    prizePool: '$2,500 GEAR PACK',
    description: 'High-intensity remote heart rate and velocity challenge streamed live with kinematic score tracking.',
  },
  {
    id: '2',
    title: 'YOUTH SPORTS ACADEMY CAMP — 20YO',
    category: 'CAMP',
    tag: 'STAGE 02',
    date: 'MARCH 10-12, 2026',
    location: 'SAN DIEGO MAIN CAMPUS',
    price: '$85 / ATHLETE',
    spotsLeft: 8,
    prizePool: 'ACADEMY SCHOLARSHIPS',
    description: 'Elite youth skills clinic featuring FIBA fundamentals, agility biomechanics, and tactical scrimmage film study.',
  },
  {
    id: '3',
    title: 'ALL-TERRAIN OBSTACLE VELOCITY RACE',
    category: 'OUTDOOR',
    tag: 'STAGE 03',
    date: 'MARCH 21, 2026',
    location: 'OUTDOOR TURF & HILL ARENA',
    price: '$50 / ATHLETE',
    spotsLeft: 14,
    prizePool: '$3,000 + ENGRAVED MEDALS',
    description: '12 functional power obstacle stations testing sprint endurance, sled pushes, and vertical power.',
  },
  {
    id: '4',
    title: 'GRANGER HARDWOOD TOURNAMENT FINALS',
    category: 'CHAMPIONSHIP',
    tag: 'STAGE 04',
    date: 'MARCH 28-29, 2026',
    location: 'INDOOR HARDWOOD ARENA #01',
    price: '$120 / TEAM',
    spotsLeft: 4,
    prizePool: '$10,000 CHAMPIONSHIP PURSE',
    description: 'Premier double-elimination 3x3 basketball championship with electronic shot clocks and referee crews.',
  },
  {
    id: '5',
    title: 'OLYMPIAN & PRO COACH MASTERCLASS',
    category: 'COMMUNITY',
    tag: 'STAGE 05',
    date: 'APRIL 04, 2026',
    location: 'BIOMECHANICS AUDITORIUM',
    price: '$45 / PASS',
    spotsLeft: 12,
    prizePool: 'EXCLUSIVE DIPLOMA & 1-ON-1 CLINIC',
    description: 'Masterclass on cellular cryo-recovery, sprint velocity optimization, and fourth-quarter mental fortitude.',
  },
];

export function EventListSection({ onSelectEvent, onNavigateEvents }: EventListSectionProps) {
  const [expandedEventId, setExpandedEventId] = useState<string | null>(null);

  const toggleExpand = (id: string) => {
    setExpandedEventId(expandedEventId === id ? null : id);
  };

  return (
    <section className="w-full py-16 sm:py-20 md:py-28 px-4 sm:px-6 lg:px-8 bg-[#0c1017] text-white overflow-hidden">
      <div className="max-w-7xl mx-auto w-full">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8 sm:mb-14"
        >
          <div>
            <div className="flex items-center gap-2 mb-3 sm:mb-4">
              <span className="w-2.5 h-2.5 rounded-full bg-[#FF671C] animate-pulse" />
              <span className="font-tech text-xs font-black uppercase tracking-widest text-[#FF671C]">
                COMMUNITY & COMPETITION CIRCUITS
              </span>
            </div>

            <h2 className="font-sport text-3xl sm:text-5xl lg:text-7xl font-black uppercase italic max-w-4xl leading-[0.92] tracking-tight">
              TO WIN OVER SPORTS-MINDED ATHLETES WITH INNOVATION, GRIT, AND PERFORMANCE EXCELLENCE.
            </h2>
          </div>

          {onNavigateEvents && (
            <button
              onClick={onNavigateEvents}
              className="font-tech bg-white/10 hover:bg-[#FF671C] text-white hover:text-white border border-white/15 px-5 py-3 rounded-2xl text-xs font-black uppercase tracking-widest flex items-center gap-2 transition-all cursor-pointer flex-shrink-0 shadow-lg group self-start md:self-auto"
            >
              <span>VIEW FULL 2026 CALENDAR</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
          )}
        </motion.div>

        <div className="flex flex-col border-b border-white/15">
          {EVENTS.map((event, idx) => {
            const isExpanded = expandedEventId === event.id;
            return (
              <motion.div
                key={event.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ duration: 0.42, delay: idx * 0.05, ease: [0.22, 1, 0.36, 1] }}
                className={`border-t border-white/15 transition-all duration-300 ${
                  isExpanded ? 'bg-white/5' : 'hover:bg-white/5'
                }`}
              >
                {/* Main Row Header */}
                <div
                  onClick={() => toggleExpand(event.id)}
                  className="flex justify-between items-center py-4 sm:py-6 px-3 sm:px-4 md:px-8 cursor-pointer group select-none"
                >
                  <div className="flex items-center gap-3 sm:gap-6 pr-2">
                    <span
                      className={`font-tech text-[11px] sm:text-xs font-black px-2 sm:px-2.5 py-0.5 sm:py-1 rounded transition-colors flex-shrink-0 ${
                        isExpanded ? 'bg-[#FF671C] text-white shadow-md' : 'bg-white/10 text-white/70'
                      }`}
                    >
                      {event.tag}
                    </span>
                    <span className="font-sport text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black uppercase italic tracking-tight group-hover:text-[#FF671C] transition-colors">
                      {event.title}
                    </span>
                  </div>

                  <div className="flex items-center gap-3 sm:gap-5">
                    <span className="font-tech text-xs font-black uppercase tracking-wider hidden sm:inline-block text-white/60">
                      {event.category}
                    </span>
                    <span className="font-tech text-xs font-bold text-[#FF671C] hidden lg:inline-block">
                      {event.price}
                    </span>
                    <motion.span
                      animate={{ rotate: isExpanded ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="p-1 rounded-lg bg-white/10 text-white"
                    >
                      <ChevronDown className="w-4 h-4" />
                    </motion.span>
                  </div>
                </div>

                {/* Interactive Collapsible Detail Drawer */}
                <AnimatePresence>
                  {isExpanded && (
                    <motion.div
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="overflow-hidden px-4 sm:px-8 pb-6 font-sans"
                    >
                      <div className="p-5 sm:p-6 bg-[#0c1017] rounded-2xl border border-white/15 grid grid-cols-1 md:grid-cols-12 gap-5 items-center">
                        <div className="md:col-span-8 space-y-3">
                          <p className="text-sm text-white/85 leading-relaxed font-sans">{event.description}</p>
                          <div className="flex flex-wrap items-center gap-3 font-tech text-xs">
                            <span className="flex items-center gap-1.5 text-white/70 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                              <Calendar className="w-3.5 h-3.5 text-[#FF671C]" />
                              <span>{event.date}</span>
                            </span>
                            <span className="flex items-center gap-1.5 text-white/70 bg-white/5 px-3 py-1.5 rounded-lg border border-white/10">
                              <MapPin className="w-3.5 h-3.5 text-[#FF671C]" />
                              <span>{event.location}</span>
                            </span>
                            {event.prizePool && (
                              <span className="flex items-center gap-1.5 text-[#FF671C] bg-[#FF671C]/10 px-3 py-1.5 rounded-lg border border-[#FF671C]/20 font-bold">
                                <Trophy className="w-3.5 h-3.5" />
                                <span>{event.prizePool}</span>
                              </span>
                            )}
                          </div>
                        </div>

                        <div className="md:col-span-4 flex flex-col sm:flex-row md:flex-col items-stretch md:items-end justify-between gap-3 pt-3 md:pt-0 border-t md:border-t-0 border-white/10 font-tech">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                            <span className="text-white/80 font-bold uppercase">{event.spotsLeft} SPOTS REMAINING</span>
                          </div>

                          <div className="flex items-center gap-2 w-full sm:w-auto">
                            <button
                              type="button"
                              onClick={() => onSelectEvent(event.title, event.price)}
                              className="w-full sm:w-auto bg-[#FF671C] hover:bg-[#e05615] text-white px-5 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center justify-center gap-1.5 animate-shine"
                            >
                              <Flame className="w-3.5 h-3.5" />
                              <span>REGISTER PASS</span>
                            </button>

                            {onNavigateEvents && (
                              <button
                                type="button"
                                onClick={onNavigateEvents}
                                className="w-full sm:w-auto bg-white/10 hover:bg-white/20 text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider transition-all cursor-pointer flex items-center justify-center gap-1 border border-white/10"
                              >
                                <span>DETAILS</span>
                                <ArrowRight className="w-3.5 h-3.5" />
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}


