import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import {
  Trophy,
  Swords,
  Flame,
  Star,
  ShieldCheck,
  Search,
  Filter,
  ArrowRight,
  CheckCircle2,
  Calendar,
  MapPin,
  Clock,
  Sparkles,
  Award,
  Zap,
} from 'lucide-react';
import { SparringAthlete, UserProfile } from '../types';

const LEADERBOARD_ATHLETES: SparringAthlete[] = [
  {
    id: 'ath-1',
    name: 'Marcus Vance',
    sport: 'Basketball',
    elo: 2240,
    divisionRank: 1,
    tier: 'Olympic Elite',
    winLoss: '28 - 2',
    winStreak: 9,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80',
    preferredCourt: 'Hardwood Arena #01',
    availableSlot: 'Weekdays (05:00 PM)',
    verifiedBadge: true,
    skills: ['Deep Step-Back 3PT', 'Kinematic Floor Vision', '42-Inch Vertical'],
  },
  {
    id: 'ath-2',
    name: 'Benedeta Chan',
    sport: 'Tennis',
    elo: 2185,
    divisionRank: 1,
    tier: 'Olympic Elite',
    winLoss: '24 - 3',
    winStreak: 6,
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuD5Kk4BuVQuQ90rhw435IEJe6Ifa12t_BvLPxYfgqDFKaRMeGkc3Be63EYvPbxoVTP67sEpkWE2OtqO627VhoGlTd-fV3JOr1JYFwiW9r-DNtJ428a_sTrHD_lOzNR19UcczLvLwm2MygI0TXSXaclXR7Pv0sHsjNL_qPXEAsf_teXZxY1e71cQ5mhODopn0-gsqo8eCC9hAf3oVW4YZUV8HuyLRnEZ78t2A985Ltc1dnpfnERmdYY9_A',
    preferredCourt: 'Roland Clay Stadium #02',
    availableSlot: 'Sat & Sun (08:00 AM)',
    verifiedBadge: true,
    skills: ['185km/h First Serve', 'Clay Slide Drop-Shots', 'Zone 4 Stamina'],
  },
  {
    id: 'ath-3',
    name: 'Maya Thorne',
    sport: 'Track & Sprint',
    elo: 2120,
    divisionRank: 1,
    tier: 'Olympic Elite',
    winLoss: '19 - 1',
    winStreak: 7,
    avatar: 'https://images.unsplash.com/photo-1517838277536-f5f99be501cd?auto=format&fit=crop&w=400&q=80',
    preferredCourt: 'Outdoor Velocity Turf',
    availableSlot: 'Tue & Thu (06:30 PM)',
    verifiedBadge: true,
    skills: ['32.4 km/h Velocity', 'Sled Pull Explosiveness', 'Cryo Recovery Master'],
  },
  {
    id: 'ath-4',
    name: 'Jamal Sterling',
    sport: 'Basketball',
    elo: 2090,
    divisionRank: 2,
    tier: 'Pro Athlete',
    winLoss: '22 - 5',
    winStreak: 4,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=400&q=80',
    preferredCourt: 'Hardwood Arena #02',
    availableSlot: 'Mon, Wed, Fri (07:00 PM)',
    verifiedBadge: true,
    skills: ['Pick & Roll Precision', 'Mid-Range Pullup', 'Lockdown Deceleration'],
  },
  {
    id: 'ath-5',
    name: 'Elena Rostova',
    sport: 'Tennis',
    elo: 2040,
    divisionRank: 2,
    tier: 'Pro Athlete',
    winLoss: '18 - 6',
    winStreak: 3,
    avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=400&q=80',
    preferredCourt: 'Roland Clay Stadium #01',
    availableSlot: 'Weekends (04:00 PM)',
    verifiedBadge: true,
    skills: ['Heavy Topspin Forehand', 'Kick Serve Down T', 'Tactical Slice'],
  },
  {
    id: 'ath-6',
    name: 'Darius Cole',
    sport: 'Basketball',
    elo: 1980,
    divisionRank: 3,
    tier: 'Competitive',
    winLoss: '15 - 8',
    winStreak: 2,
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=400&q=80',
    preferredCourt: 'Hardwood Arena #01',
    availableSlot: 'Weekdays (06:00 PM)',
    verifiedBadge: false,
    skills: ['Spot-Up 3PT Specialist', 'Fastbreak Transition', 'High Motor'],
  },
];

interface ArenaHubPageProps {
  currentUser: UserProfile | null;
  onOpenBooking: () => void;
}

export function ArenaHubPage({ currentUser, onOpenBooking }: ArenaHubPageProps) {
  const [activeTab, setActiveTab] = useState<'leaderboard' | 'matchmaking'>('leaderboard');
  const [selectedSport, setSelectedSport] = useState<string>('All');
  const [selectedTier, setSelectedTier] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [challengeModalTarget, setChallengeModalTarget] = useState<SparringAthlete | null>(null);
  const [challengeSuccess, setChallengeSuccess] = useState<string | null>(null);

  const filteredAthletes = LEADERBOARD_ATHLETES.filter((ath) => {
    if (selectedSport !== 'All' && ath.sport !== selectedSport) return false;
    if (selectedTier !== 'All' && ath.tier !== selectedTier) return false;
    if (
      searchQuery.trim() !== '' &&
      !ath.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !ath.skills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()))
    ) {
      return false;
    }
    return true;
  });

  const handleSendChallenge = () => {
    if (!challengeModalTarget) return;
    setChallengeSuccess(
      `Sparring Match Challenge transmitted to ${challengeModalTarget.name}! A notification has been sent to their Athlete Passport.`
    );
    setChallengeModalTarget(null);
    setTimeout(() => setChallengeSuccess(null), 6000);
  };

  return (
    <div className="w-full bg-[#F0F2F5] min-h-screen pt-24 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full space-y-8">
        {/* Header Masthead */}
        <section className="bg-gradient-to-r from-[#0c1017] via-[#161f2e] to-[#0c1017] rounded-3xl p-6 sm:p-10 text-white shadow-2xl border border-white/15 relative overflow-hidden">
          <div className="absolute top-0 right-1/3 w-80 h-80 bg-[#FF671C]/15 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-10 right-10 w-80 h-80 bg-[#00a0e7]/15 rounded-full blur-3xl pointer-events-none" />

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6 relative z-10">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-2.5 font-tech">
                <span className="font-tech text-xs font-black uppercase tracking-widest text-[#FF671C] bg-[#FF671C]/10 px-3 py-1 rounded-md border border-[#FF671C]/20">
                  GRANGER ARENA LEAGUE 2026
                </span>
                <span className="text-white/40">•</span>
                <span className="text-xs font-bold text-white/70 uppercase">
                  SANCTIONED ELO CIRCUIT
                </span>
              </div>

              <h1 className="font-sport text-4xl sm:text-6xl lg:text-7xl font-black uppercase italic tracking-tight text-white leading-[0.92]">
                CAMPUS LEADERBOARDS & SPARRING HUB.
              </h1>

              <p className="text-white/80 text-xs sm:text-base mt-3 font-sans max-w-2xl leading-relaxed">
                Climb the verified campus Elo ladder, discover elite sparring partners for pick-up matches, and test your skills on FIBA hardwood and Roland red clay courts.
              </p>
            </div>

            {/* View Mode Toggle */}
            <div className="flex items-center gap-2 bg-white/10 p-2 rounded-2xl border border-white/15 font-tech backdrop-blur-md flex-shrink-0">
              <button
                type="button"
                onClick={() => setActiveTab('leaderboard')}
                className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'leaderboard'
                    ? 'bg-[#FF671C] text-white shadow-md'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Trophy className="w-4 h-4" />
                <span>ELO LEADERBOARDS</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveTab('matchmaking')}
                className={`px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer flex items-center gap-2 ${
                  activeTab === 'matchmaking'
                    ? 'bg-[#00a0e7] text-white shadow-md'
                    : 'text-white/80 hover:text-white'
                }`}
              >
                <Swords className="w-4 h-4" />
                <span>SPARRING FINDER</span>
              </button>
            </div>
          </div>
        </section>

        {/* Success Alert Banner */}
        <AnimatePresence>
          {challengeSuccess && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="bg-emerald-600 text-white p-4 rounded-2xl font-tech text-xs font-bold uppercase flex items-center justify-between shadow-lg"
            >
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>{challengeSuccess}</span>
              </div>
              <button onClick={() => setChallengeSuccess(null)} className="cursor-pointer">
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Filter Bar */}
        <section className="bg-white rounded-3xl p-4 sm:p-5 border border-[#E2E8F0] shadow-xs space-y-4 font-tech">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            {/* Sport Filter */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 touch-scroll no-scrollbar">
              {['All', 'Basketball', 'Tennis', 'Track & Sprint'].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => setSelectedSport(s)}
                  className={`px-3.5 py-2 rounded-xl text-xs font-black uppercase transition-all cursor-pointer ${
                    selectedSport === s
                      ? 'bg-[#0c1017] text-white shadow-xs'
                      : 'bg-[#F8FAFC] border border-[#E2E8F0] text-[#64748B] hover:text-[#0c1017]'
                  }`}
                >
                  {s === 'All' ? 'ALL DISCIPLINES' : s.toUpperCase()}
                </button>
              ))}
            </div>

            {/* Search Input */}
            <div className="relative min-w-[240px]">
              <Search className="w-4 h-4 text-[#94A3B8] absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search athlete or skill (e.g. 3PT, Topspin)..."
                className="w-full pl-10 pr-4 py-2 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-medium text-[#0c1017] focus:outline-none focus:border-[#FF671C]"
              />
            </div>
          </div>
        </section>

        {/* TAB 1: ELO LEADERBOARD VIEW */}
        {activeTab === 'leaderboard' && (
          <section className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              {filteredAthletes.map((ath, idx) => (
                <motion.div
                  key={ath.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  className="bg-white rounded-3xl p-5 sm:p-6 border border-[#E2E8F0] shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-5 hover:border-[#FF671C]/50 transition-all group"
                >
                  <div className="flex items-center gap-4">
                    {/* Rank Badge */}
                    <div
                      className={`w-12 h-12 rounded-2xl flex items-center justify-center font-sport text-2xl font-black italic shadow-inner ${
                        idx === 0
                          ? 'bg-[#FF671C] text-white'
                          : idx === 1
                          ? 'bg-[#00a0e7] text-white'
                          : idx === 2
                          ? 'bg-amber-400 text-white'
                          : 'bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0]'
                      }`}
                    >
                      #{idx + 1}
                    </div>

                    {/* Avatar */}
                    <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-white shadow-md bg-gray-200 flex-shrink-0">
                      <img src={ath.avatar} alt={ath.name} className="w-full h-full object-cover" />
                    </div>

                    {/* Athlete Details */}
                    <div>
                      <div className="flex items-center gap-2 mb-0.5 font-tech">
                        <span className="text-[10px] font-black uppercase tracking-wider bg-[#FF671C]/10 text-[#FF671C] px-2 py-0.5 rounded">
                          {ath.tier}
                        </span>
                        <span className="text-xs text-[#64748B] font-bold uppercase">{ath.sport}</span>
                        {ath.verifiedBadge && (
                          <ShieldCheck className="w-3.5 h-3.5 text-[#16A34A]" title="FIBA / ITF Verified" />
                        )}
                      </div>

                      <h3 className="font-sport text-2xl sm:text-3xl font-black italic uppercase text-[#0c1017]">
                        {ath.name}
                      </h3>

                      <div className="flex flex-wrap items-center gap-1.5 mt-1 font-tech">
                        {ath.skills.map((s) => (
                          <span
                            key={s}
                            className="bg-[#F8FAFC] text-[#64748B] border border-[#E2E8F0] px-2 py-0.5 rounded text-[10px] font-bold uppercase"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Metrics & Challenge CTA */}
                  <div className="flex items-center justify-between md:justify-end gap-6 pt-3 md:pt-0 border-t md:border-t-0 border-[#E2E8F0] font-tech">
                    <div className="text-left md:text-right">
                      <span className="text-[10px] text-[#94A3B8] uppercase block">CAMPUS ELO</span>
                      <p className="font-sport text-3xl font-black italic text-[#FF671C] leading-none">
                        {ath.elo}
                      </p>
                      <span className="text-[10px] text-emerald-600 font-bold">
                        {ath.winLoss} • STREAK {ath.winStreak}W
                      </span>
                    </div>

                    <button
                      type="button"
                      onClick={() => setChallengeModalTarget(ath)}
                      className="bg-[#0c1017] group-hover:bg-[#FF671C] text-white px-5 py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-colors cursor-pointer flex items-center gap-2 flex-shrink-0"
                    >
                      <Swords className="w-4 h-4" />
                      <span>CHALLENGE MATCH</span>
                    </button>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>
        )}

        {/* TAB 2: SPARRING MATCHMAKING GRID VIEW (4 COLUMNS) */}
        {activeTab === 'matchmaking' && (
          <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredAthletes.map((ath) => (
              <div
                key={ath.id}
                className="bg-white rounded-3xl p-6 border border-[#E2E8F0] shadow-xs flex flex-col justify-between space-y-5"
              >
                <div>
                  <div className="flex items-center justify-between pb-3 border-b border-[#E2E8F0] font-tech text-xs">
                    <span className="bg-[#00a0e7]/10 text-[#00a0e7] px-2.5 py-0.5 rounded-md font-bold uppercase">
                      {ath.sport} • {ath.tier}
                    </span>
                    <span className="font-sport text-xl font-black italic text-[#FF671C]">{ath.elo} ELO</span>
                  </div>

                  <div className="flex items-center gap-4 my-4">
                    <img
                      src={ath.avatar}
                      alt={ath.name}
                      className="w-16 h-16 rounded-2xl object-cover border border-[#E2E8F0] shadow-sm"
                    />
                    <div>
                      <h3 className="font-sport text-2xl font-black italic uppercase text-[#0c1017]">
                        {ath.name}
                      </h3>
                      <p className="font-tech text-xs text-emerald-600 font-bold">{ath.winLoss} Record</p>
                    </div>
                  </div>

                  <div className="space-y-2 font-tech text-xs bg-[#F8FAFC] p-3.5 rounded-2xl border border-[#E2E8F0]">
                    <div className="flex items-center gap-2 text-[#475569]">
                      <MapPin className="w-3.5 h-3.5 text-[#FF671C]" />
                      <span>{ath.preferredCourt}</span>
                    </div>
                    <div className="flex items-center gap-2 text-[#475569]">
                      <Clock className="w-3.5 h-3.5 text-[#00a0e7]" />
                      <span>{ath.availableSlot}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => setChallengeModalTarget(ath)}
                  className="font-tech w-full bg-[#FF671C] hover:bg-[#e05615] text-white py-3 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center justify-center gap-2 animate-shine"
                >
                  <Swords className="w-4 h-4" />
                  <span>PROPOSE SPARRING MATCH</span>
                </button>
              </div>
            ))}
          </section>
        )}
      </div>

      {/* Challenge Match Dialog Modal */}
      <AnimatePresence>
        {challengeModalTarget && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setChallengeModalTarget(null)}
              className="absolute inset-0 bg-black/70 backdrop-blur-md"
            />

            <motion.div
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              className="relative bg-white rounded-3xl p-6 sm:p-8 max-w-lg w-full shadow-2xl border border-[#E2E8F0] z-10 font-tech space-y-5"
            >
              <div className="flex items-center justify-between pb-4 border-b border-[#E2E8F0]">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-widest text-[#FF671C] bg-[#FF671C]/10 px-2.5 py-0.5 rounded">
                    CAMPUS SPARRING PROTOCOL
                  </span>
                  <h3 className="font-sport text-3xl font-black italic uppercase text-[#0c1017] mt-1">
                    CHALLENGE {challengeModalTarget.name}
                  </h3>
                </div>
                <span className="font-sport text-2xl font-black italic text-[#FF671C]">
                  {challengeModalTarget.elo} ELO
                </span>
              </div>

              <div className="space-y-3 text-xs">
                <div>
                  <label className="block font-bold text-[#0c1017] uppercase mb-1">Select Campus Venue</label>
                  <input
                    type="text"
                    readOnly
                    value={challengeModalTarget.preferredCourt}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl font-bold text-[#0c1017]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#0c1017] uppercase mb-1">Proposed Match Time</label>
                  <input
                    type="text"
                    readOnly
                    value={challengeModalTarget.availableSlot}
                    className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl font-bold text-[#0c1017]"
                  />
                </div>

                <div>
                  <label className="block font-bold text-[#0c1017] uppercase mb-1">Match Type</label>
                  <select className="w-full px-3.5 py-2.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl font-bold text-[#0c1017] cursor-pointer">
                    <option>OFFICIAL ELO RANKED MATCH (BEST OF 3)</option>
                    <option>FRIENDLY BIOMECHANIC SCRIMMAGE</option>
                  </select>
                </div>
              </div>

              <div className="pt-3 flex gap-3">
                <button
                  type="button"
                  onClick={handleSendChallenge}
                  className="flex-1 bg-[#FF671C] hover:bg-[#e05615] text-white py-3.5 rounded-xl text-xs font-black uppercase tracking-wider transition-all cursor-pointer shadow-md flex items-center justify-center gap-2"
                >
                  <Swords className="w-4 h-4" />
                  <span>DISPATCH SPARRING INVITATION</span>
                </button>
                <button
                  type="button"
                  onClick={() => setChallengeModalTarget(null)}
                  className="px-5 py-3.5 bg-[#F8FAFC] border border-[#E2E8F0] rounded-xl text-xs font-bold text-[#64748B] hover:text-[#0c1017] cursor-pointer uppercase"
                >
                  CANCEL
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
