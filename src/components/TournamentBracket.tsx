import { useState } from 'react';
import { motion } from 'motion/react';
import { Trophy, Activity, Flame, Shield, Radio, Sparkles, CheckCircle2, ChevronRight } from 'lucide-react';
import { TournamentMatch } from '../types';

const INITIAL_MATCHES: TournamentMatch[] = [
  // Quarterfinals
  {
    id: 'qf-1',
    round: 'Quarterfinals',
    teamA: { name: 'PACIFIC COAST ELITE', seed: 1, score: 88 },
    teamB: { name: 'SAN DIEGO TITANS', seed: 8, score: 74 },
    court: 'HARDWOOD ARENA 01',
    time: 'COMPLETED',
    status: 'Completed',
    winner: 'A',
  },
  {
    id: 'qf-2',
    round: 'Quarterfinals',
    teamA: { name: 'LA BREA KINEMATICS', seed: 4, score: 82 },
    teamB: { name: 'PALM SPRINGS HEAT', seed: 5, score: 79 },
    court: 'HARDWOOD ARENA 02',
    time: 'COMPLETED',
    status: 'Completed',
    winner: 'A',
  },
  {
    id: 'qf-3',
    round: 'Quarterfinals',
    teamA: { name: 'MISSION BAY THUNDER', seed: 2, score: 94 },
    teamB: { name: 'CORONADO SURGE', seed: 7, score: 81 },
    court: 'HARDWOOD ARENA 01',
    time: 'COMPLETED',
    status: 'Completed',
    winner: 'A',
  },
  {
    id: 'qf-4',
    round: 'Quarterfinals',
    teamA: { name: 'GRANGER SELECT SQUAD', seed: 3, score: 91 },
    teamB: { name: 'ORANGE COUNTY FORCE', seed: 6, score: 86 },
    court: 'HARDWOOD ARENA 02',
    time: 'COMPLETED',
    status: 'Completed',
    winner: 'A',
  },

  // Semifinals
  {
    id: 'sf-1',
    round: 'Semifinals',
    teamA: { name: 'PACIFIC COAST ELITE', seed: 1, score: 96 },
    teamB: { name: 'LA BREA KINEMATICS', seed: 4, score: 92 },
    court: 'MAIN STADIUM ARENA',
    time: 'COMPLETED',
    status: 'Completed',
    winner: 'A',
  },
  {
    id: 'sf-2',
    round: 'Semifinals',
    teamA: { name: 'MISSION BAY THUNDER', seed: 2, score: 89 },
    teamB: { name: 'GRANGER SELECT SQUAD', seed: 3, score: 95 },
    court: 'MAIN STADIUM ARENA',
    time: 'COMPLETED',
    status: 'Completed',
    winner: 'B',
  },

  // Championship Final
  {
    id: 'final',
    round: 'Championship Final',
    teamA: { name: 'PACIFIC COAST ELITE', seed: 1, score: 104 },
    teamB: { name: 'GRANGER SELECT SQUAD', seed: 3, score: 102 },
    court: 'GRANGER PRIME STADIUM COURT',
    time: 'LIVE • Q4 01:24',
    status: 'Live',
  },
];

export function TournamentBracket() {
  const [matches, setMatches] = useState<TournamentMatch[]>(INITIAL_MATCHES);
  const [selectedMatch, setSelectedMatch] = useState<TournamentMatch>(
    INITIAL_MATCHES.find((m) => m.id === 'final') || INITIAL_MATCHES[0]
  );

  const [liveSimRunning, setLiveSimRunning] = useState(false);

  // Live Score Simulation Handler
  const handleSimulatePoint = (team: 'A' | 'B', points: number) => {
    setMatches((prev) =>
      prev.map((m) => {
        if (m.id === selectedMatch.id) {
          const updated = {
            ...m,
            teamA: team === 'A' ? { ...m.teamA, score: m.teamA.score + points } : m.teamA,
            teamB: team === 'B' ? { ...m.teamB, score: m.teamB.score + points } : m.teamB,
          };
          setSelectedMatch(updated);
          return updated;
        }
        return m;
      })
    );
  };

  const qfMatches = matches.filter((m) => m.round === 'Quarterfinals');
  const sfMatches = matches.filter((m) => m.round === 'Semifinals');
  const finalMatch = matches.find((m) => m.round === 'Championship Final');

  return (
    <div className="space-y-8">
      {/* 1. ARENA LIVE SCOREBOARD HEADER (Real-Time Arena Broadcast Simulation) */}
      {finalMatch && (
        <div className="bg-gradient-to-r from-[#0c1017] via-[#1a2333] to-[#0c1017] rounded-3xl p-6 sm:p-8 text-white shadow-2xl border border-white/15 relative overflow-hidden">
          {/* Ambient Floodlight Flare */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-40 bg-[#FF671C]/20 rounded-full blur-3xl pointer-events-none" />

          <div className="flex items-center justify-between pb-4 border-b border-white/10 relative z-10 mb-6 font-tech">
            <div className="flex items-center gap-2">
              <span className="w-2.5 h-2.5 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-black uppercase tracking-widest text-red-400">
                ARENA BROADCAST FEED
              </span>
              <span className="text-white/40">•</span>
              <span className="text-xs font-bold text-white/70 uppercase">
                {finalMatch.court}
              </span>
            </div>

            <span className="bg-white/10 px-3 py-1 rounded-md text-xs font-mono font-bold text-white tracking-widest border border-white/10">
              {finalMatch.time}
            </span>
          </div>

          {/* Scoreboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center relative z-10">
            {/* Team A */}
            <div className="md:col-span-5 text-center md:text-left">
              <span className="font-tech text-xs font-bold text-white/60 uppercase">SEED #{finalMatch.teamA.seed}</span>
              <h3 className="font-sport text-2xl sm:text-3xl lg:text-4xl font-black uppercase italic tracking-tight text-white mt-0.5">
                {finalMatch.teamA.name}
              </h3>
              <p className="font-tech text-xs text-[#00a0e7] font-bold mt-1">FIBA CERTIFIED ROSTER</p>
            </div>

            {/* Live Center Scores */}
            <div className="md:col-span-2 text-center bg-white/5 py-4 px-6 rounded-2xl border border-white/10">
              <div className="font-sport text-5xl sm:text-6xl font-black italic tracking-tighter text-[#FF671C] flex items-center justify-center gap-3">
                <span>{finalMatch.teamA.score}</span>
                <span className="text-white/30 text-3xl font-light">-</span>
                <span>{finalMatch.teamB.score}</span>
              </div>
              <span className="font-tech text-[10px] text-emerald-400 font-bold uppercase tracking-widest block mt-1">
                {finalMatch.status.toUpperCase()}
              </span>
            </div>

            {/* Team B */}
            <div className="md:col-span-5 text-center md:text-right">
              <span className="font-tech text-xs font-bold text-white/60 uppercase">SEED #{finalMatch.teamB.seed}</span>
              <h3 className="font-sport text-2xl sm:text-3xl lg:text-4xl font-black uppercase italic tracking-tight text-white mt-0.5">
                {finalMatch.teamB.name}
              </h3>
              <p className="font-tech text-xs text-[#FF671C] font-bold mt-1">HOST CAMPUS TITANS</p>
            </div>
          </div>

          {/* Referee Instant Point Scoring Simulation Bar */}
          <div className="mt-6 pt-5 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs font-tech">
            <span className="text-white/70 font-bold uppercase">REFEREE DESK SIMULATOR:</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleSimulatePoint('A', 2)}
                className="bg-white/10 hover:bg-[#FF671C] text-white px-3 py-1.5 rounded-lg font-black transition-colors cursor-pointer"
              >
                +2 PTS (TEAM A)
              </button>
              <button
                type="button"
                onClick={() => handleSimulatePoint('A', 3)}
                className="bg-white/10 hover:bg-[#FF671C] text-white px-3 py-1.5 rounded-lg font-black transition-colors cursor-pointer"
              >
                +3 PTS (TEAM A)
              </button>
              <span className="text-white/30">|</span>
              <button
                type="button"
                onClick={() => handleSimulatePoint('B', 2)}
                className="bg-white/10 hover:bg-[#00a0e7] text-white px-3 py-1.5 rounded-lg font-black transition-colors cursor-pointer"
              >
                +2 PTS (TEAM B)
              </button>
              <button
                type="button"
                onClick={() => handleSimulatePoint('B', 3)}
                className="bg-white/10 hover:bg-[#00a0e7] text-white px-3 py-1.5 rounded-lg font-black transition-colors cursor-pointer"
              >
                +3 PTS (TEAM B)
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 2. INTERACTIVE TOURNAMENT BRACKET TREE */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-[#E2E8F0] shadow-xs">
        <div className="flex items-center justify-between pb-6 border-b border-[#E2E8F0] mb-6 font-tech">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Trophy className="w-4 h-4 text-[#FF671C]" />
              <span className="text-xs font-black uppercase tracking-widest text-[#FF671C]">
                CHAMPIONSHIP CIRCUIT BRACKET
              </span>
            </div>
            <h2 className="font-sport text-3xl font-black italic uppercase text-[#0c1017]">
              2026 INVITATIONAL ELIMINATION TREE
            </h2>
          </div>

          <span className="text-xs text-[#64748B] font-bold uppercase hidden sm:block">
            SINGLE ELIMINATION (8 TEAMS)
          </span>
        </div>

        {/* Bracket Grid Container */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
          {/* Round 1: Quarterfinals */}
          <div className="space-y-4 font-tech">
            <div className="flex items-center gap-2 text-xs font-black text-[#64748B] uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#0c1017]" />
              <span>QUARTERFINALS (ROUND OF 8)</span>
            </div>

            {qfMatches.map((m) => (
              <div
                key={m.id}
                onClick={() => setSelectedMatch(m)}
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer ${
                  selectedMatch.id === m.id
                    ? 'border-[#FF671C] bg-[#FF671C]/5 shadow-sm'
                    : 'border-[#E2E8F0] bg-[#F8FAFC] hover:bg-white'
                }`}
              >
                <div className="flex justify-between items-center text-[10px] text-[#94A3B8] font-bold uppercase mb-1">
                  <span>{m.court}</span>
                  <span className="text-emerald-600">{m.time}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-[#0c1017]">
                  <span className={m.winner === 'A' ? 'font-black text-[#0c1017]' : 'text-[#64748B]'}>
                    #{m.teamA.seed} {m.teamA.name}
                  </span>
                  <span className="font-sport text-base font-black italic">{m.teamA.score}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-[#0c1017] pt-1">
                  <span className={m.winner === 'B' ? 'font-black text-[#0c1017]' : 'text-[#64748B]'}>
                    #{m.teamB.seed} {m.teamB.name}
                  </span>
                  <span className="font-sport text-base font-black italic">{m.teamB.score}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Round 2: Semifinals */}
          <div className="space-y-6 font-tech">
            <div className="flex items-center gap-2 text-xs font-black text-[#00a0e7] uppercase tracking-wider mb-2">
              <span className="w-2 h-2 rounded-full bg-[#00a0e7]" />
              <span>SEMIFINALS (FINAL FOUR)</span>
            </div>

            {sfMatches.map((m) => (
              <div
                key={m.id}
                onClick={() => setSelectedMatch(m)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                  selectedMatch.id === m.id
                    ? 'border-[#00a0e7] bg-[#00a0e7]/5 shadow-sm'
                    : 'border-[#E2E8F0] bg-[#F8FAFC] hover:bg-white'
                }`}
              >
                <div className="flex justify-between items-center text-[10px] text-[#94A3B8] font-bold uppercase mb-1.5">
                  <span>{m.court}</span>
                  <span className="text-emerald-600 font-black">{m.time}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-[#0c1017]">
                  <span className={m.winner === 'A' ? 'font-black text-[#0c1017]' : 'text-[#64748B]'}>
                    #{m.teamA.seed} {m.teamA.name}
                  </span>
                  <span className="font-sport text-lg font-black italic text-[#FF671C]">{m.teamA.score}</span>
                </div>
                <div className="flex justify-between items-center text-xs font-bold text-[#0c1017] pt-1.5">
                  <span className={m.winner === 'B' ? 'font-black text-[#0c1017]' : 'text-[#64748B]'}>
                    #{m.teamB.seed} {m.teamB.name}
                  </span>
                  <span className="font-sport text-lg font-black italic text-[#FF671C]">{m.teamB.score}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Round 3: Championship Final */}
          {finalMatch && (
            <div className="space-y-4 font-tech">
              <div className="flex items-center gap-2 text-xs font-black text-[#FF671C] uppercase tracking-wider mb-2">
                <Trophy className="w-3.5 h-3.5 text-[#FF671C]" />
                <span>CHAMPIONSHIP FINAL</span>
              </div>

              <div
                onClick={() => setSelectedMatch(finalMatch)}
                className="p-5 rounded-3xl border-2 border-[#FF671C] bg-[#FF671C]/5 shadow-lg space-y-3 cursor-pointer"
              >
                <div className="flex justify-between items-center text-xs font-black text-[#FF671C] uppercase">
                  <span>🏆 GOLD MEDAL MATCH</span>
                  <span className="animate-pulse">{finalMatch.time}</span>
                </div>

                <div className="p-3 bg-white rounded-xl border border-[#E2E8F0] space-y-2">
                  <div className="flex justify-between items-center text-xs font-black text-[#0c1017]">
                    <span>#{finalMatch.teamA.seed} {finalMatch.teamA.name}</span>
                    <span className="font-sport text-2xl font-black italic text-[#FF671C]">{finalMatch.teamA.score}</span>
                  </div>
                  <div className="flex justify-between items-center text-xs font-black text-[#0c1017] pt-1 border-t border-[#E2E8F0]">
                    <span>#{finalMatch.teamB.seed} {finalMatch.teamB.name}</span>
                    <span className="font-sport text-2xl font-black italic text-[#FF671C]">{finalMatch.teamB.score}</span>
                  </div>
                </div>

                <p className="text-[11px] text-[#64748B] text-center font-sans">
                  Winner receives $10,000 Championship Purse + Gold Ring Accreditation.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
