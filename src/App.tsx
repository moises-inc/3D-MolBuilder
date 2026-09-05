import React, { useState, useEffect, useRef, useCallback } from 'react';
import { MOLECULES_DATASET, CPK_COLORS } from './data/moleculesDataset';
import { Atom3D, MoleculeData } from './types/chemistry';
import { TeamScore } from './types/game';
import { MolecularViewer3D } from './components/MolecularViewer3D';
import { RoundHeader } from './components/RoundHeader';
import { MoleculeInfoCard } from './components/MoleculeInfoCard';
import { KitValidationPanel } from './components/KitValidationPanel';
import { RoundTrophyModal } from './components/RoundTrophyModal';
import { LeaderboardModal } from './components/LeaderboardModal';
import { SettingsModal } from './components/SettingsModal';
import { sounds } from './utils/soundEffects';
import { Atom, Award, Info, Sparkles } from 'lucide-react';

const INITIAL_TEAMS: TeamScore[] = [
  {
    id: 'team-alfa',
    name: 'Equipo Alfa — 3° Medio',
    score: 0,
    completedMolecules: [],
    color: '#5de1e5',
  },
  {
    id: 'team-beta',
    name: 'Equipo Beta — 4° Medio',
    score: 0,
    completedMolecules: [],
    color: '#efb65f',
  },
  {
    id: 'team-gamma',
    name: 'Equipo Gamma — QyF Invitados',
    score: 0,
    completedMolecules: [],
    color: '#38ef7d',
  },
];

export const App: React.FC = () => {
  // Molecule state
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const currentMolecule: MoleculeData = MOLECULES_DATASET[currentIndex];
  const [selectedAtom, setSelectedAtom] = useState<Atom3D | null>(null);

  // Teams state
  const [teams, setTeams] = useState<TeamScore[]>(INITIAL_TEAMS);
  const [activeTeamId, setActiveTeamId] = useState<string>(INITIAL_TEAMS[0].id);
  const activeTeam = teams.find((t) => t.id === activeTeamId) || teams[0];

  // Timer state
  const [timeLeft, setTimeLeft] = useState<number>(currentMolecule.timeLimitSeconds);
  const [timerActive, setTimerActive] = useState<boolean>(false);
  const timerRef = useRef<number | null>(null);

  // Trivia state for current round
  const [triviaAnswered, setTriviaAnswered] = useState<boolean>(false);
  const [triviaBonusEarned, setTriviaBonusEarned] = useState<number>(0);

  // Modals state
  const [showTrophyModal, setShowTrophyModal] = useState<boolean>(false);
  const [showLeaderboardModal, setShowLeaderboardModal] = useState<boolean>(false);
  const [showSettingsModal, setShowSettingsModal] = useState<boolean>(false);
  const [lastRoundScore, setLastRoundScore] = useState<{ total: number; time: number; trivia: number }>({
    total: 0,
    time: 0,
    trivia: 0,
  });

  // Reset timer whenever molecule changes
  useEffect(() => {
    setTimeLeft(currentMolecule.timeLimitSeconds);
    setTimerActive(false);
    setTriviaAnswered(false);
    setTriviaBonusEarned(0);
    setSelectedAtom(null);
  }, [currentIndex, currentMolecule]);

  // Countdown timer effect
  useEffect(() => {
    if (timerActive && timeLeft > 0) {
      timerRef.current = window.setInterval(() => {
        setTimeLeft((prev) => {
          if (prev <= 1) {
            setTimerActive(false);
            return 0;
          }
          if (prev <= 5) {
            sounds.playTick();
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [timerActive, timeLeft]);

  const handleToggleTimer = useCallback(() => {
    setTimerActive((prev) => !prev);
  }, []);

  const handleResetTimer = useCallback(() => {
    setTimerActive(false);
    setTimeLeft(currentMolecule.timeLimitSeconds);
  }, [currentMolecule.timeLimitSeconds]);

  // Handle trivia answer
  const handleTriviaAnswered = (isCorrect: boolean) => {
    setTriviaAnswered(true);
    if (isCorrect) {
      sounds.playTriviaCorrect();
      const bonus = 100;
      setTriviaBonusEarned(bonus);
      // Award trivia bonus immediately to active team
      setTeams((prev) =>
        prev.map((t) => (t.id === activeTeamId ? { ...t, score: t.score + bonus } : t))
      );
    }
  };

  // Handle successful physical kit validation
  const handleValidateSuccess = (roundScore: number, timeBonus: number) => {
    sounds.playSuccess();
    setTimerActive(false);

    const totalEarned = roundScore + triviaBonusEarned;

    // Update active team score and completed molecules
    setTeams((prev) =>
      prev.map((t) => {
        if (t.id === activeTeamId) {
          const completed = t.completedMolecules.includes(currentMolecule.id)
            ? t.completedMolecules
            : [...t.completedMolecules, currentMolecule.id];
          return {
            ...t,
            score: t.score + roundScore,
            completedMolecules: completed,
          };
        }
        return t;
      })
    );

    setLastRoundScore({
      total: totalEarned,
      time: timeBonus,
      trivia: triviaBonusEarned,
    });
    setShowTrophyModal(true);
  };

  const handleNextRound = () => {
    setShowTrophyModal(false);
    if (currentIndex < MOLECULES_DATASET.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleResetTournament = () => {
    setTeams((prev) =>
      prev.map((t) => ({
        ...t,
        score: 0,
        completedMolecules: [],
      }))
    );
    setCurrentIndex(0);
    setTimeLeft(MOLECULES_DATASET[0].timeLimitSeconds);
    setTimerActive(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-black text-slate-100 selection:bg-cyan-500 selection:text-black">
      {/* Top Header */}
      <RoundHeader
        currentMolecule={currentMolecule}
        currentIndex={currentIndex}
        totalMolecules={MOLECULES_DATASET.length}
        onSelectIndex={setCurrentIndex}
        timeLeft={timeLeft}
        timerActive={timerActive}
        onToggleTimer={handleToggleTimer}
        onResetTimer={handleResetTimer}
        activeTeam={activeTeam}
        teams={teams}
        onSelectTeam={setActiveTeamId}
        onOpenSettings={() => setShowSettingsModal(true)}
        onOpenLeaderboard={() => setShowLeaderboardModal(true)}
      />

      {/* Main Workspace */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-3 md:p-4 grid grid-cols-1 lg:grid-cols-12 gap-3.5">
        {/* Left / Center: 3D Molecular Stage (7 cols on lg) */}
        <section className="lg:col-span-7 flex flex-col gap-3 min-h-[440px] lg:min-h-[580px]">
          <div className="flex-1 relative rounded-xl overflow-hidden shadow-2xl">
            <MolecularViewer3D
              molecule={currentMolecule}
              onSelectAtom={setSelectedAtom}
              selectedAtom={selectedAtom}
            />
          </div>

          {/* Bottom CPK Legend & Shortcut Strip */}
          <div className="bg-oled-card p-3 rounded-xl border border-oled-border flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase font-mono text-slate-400 font-bold">
                Código CPK:
              </span>
              <div className="flex items-center gap-2">
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#262626] border border-white/40" />
                  <span className="text-slate-300 text-[11px]">Carbono (C)</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-white border border-slate-400" />
                  <span className="text-slate-300 text-[11px]">Hidrógeno (H)</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#EF4444]" />
                  <span className="text-slate-300 text-[11px]">Oxígeno (O)</span>
                </span>
                <span className="flex items-center gap-1">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#3B82F6]" />
                  <span className="text-slate-300 text-[11px]">Nitrógeno (N)</span>
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 font-mono">
              <Sparkles className="w-3.5 h-3.5 text-pide-cyan" />
              <span>Rotar: Arrastre | Zoom: Rueda | Clic: Info Átomo</span>
            </div>
          </div>
        </section>

        {/* Right: Molecule Didactic Card & Kit Validation (5 cols on lg) */}
        <section className="lg:col-span-5 flex flex-col gap-3 min-h-[580px]">
          {/* Top Half: Molecule Educational Info & Trivia */}
          <div className="flex-1 min-h-[300px]">
            <MoleculeInfoCard
              molecule={currentMolecule}
              onTriviaAnswered={handleTriviaAnswered}
              triviaAnswered={triviaAnswered}
            />
          </div>

          {/* Bottom Half: Physical Kit Assembly Checklist & Validation */}
          <div className="h-[290px]">
            <KitValidationPanel
              molecule={currentMolecule}
              timeLeft={timeLeft}
              onValidateSuccess={handleValidateSuccess}
              disabled={false}
            />
          </div>
        </section>
      </main>

      {/* Bottom Fast Selector Carousel Bar */}
      <nav className="w-full bg-black/95 border-t border-oled-border px-4 py-2">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 overflow-x-auto py-1">
          <span className="text-[10px] uppercase font-mono text-slate-400 font-bold shrink-0 hidden sm:inline">
            Compuestos:
          </span>
          <div className="flex items-center gap-2 overflow-x-auto">
            {MOLECULES_DATASET.map((mol, idx) => {
              const isSelected = idx === currentIndex;
              const isCompleted = activeTeam.completedMolecules.includes(mol.id);

              return (
                <button
                  key={mol.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`px-3 py-1.5 rounded-lg border text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                    isSelected
                      ? 'bg-cyan-500/20 border-cyan-400 text-cyan-300 shadow-[0_0_12px_rgba(93,225,229,0.3)]'
                      : 'bg-oled-panel border-oled-border text-slate-400 hover:text-white hover:border-slate-600'
                  }`}
                >
                  <span className="font-mono text-[10px] text-slate-500 font-bold">
                    0{idx + 1}
                  </span>
                  <span>{mol.name}</span>
                  <span className="text-[10px] font-mono text-slate-400">({mol.formula})</span>
                  {isCompleted && (
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-sm" />
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* Modals */}
      <RoundTrophyModal
        isOpen={showTrophyModal}
        onClose={() => setShowTrophyModal(false)}
        onNextRound={handleNextRound}
        molecule={currentMolecule}
        team={activeTeam}
        scoreEarned={lastRoundScore.total}
        timeBonus={lastRoundScore.time}
        triviaBonus={lastRoundScore.trivia}
        teams={teams}
        hasNextRound={currentIndex < MOLECULES_DATASET.length - 1}
      />

      <LeaderboardModal
        isOpen={showLeaderboardModal}
        onClose={() => setShowLeaderboardModal(false)}
        teams={teams}
      />

      <SettingsModal
        isOpen={showSettingsModal}
        onClose={() => setShowSettingsModal(false)}
        teams={teams}
        onUpdateTeams={setTeams}
        onResetTournament={handleResetTournament}
      />
    </div>
  );
};

export default App;
