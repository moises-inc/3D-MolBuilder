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
import { SyncQRModal, SyncQRData } from './components/SyncQRModal';
import { ProjectorView } from './components/ProjectorView';
import { ShaderBackground } from './components/ShaderBackground';
import { socketSync, ClientRole, ConnectionStatus, ActivityEvent } from './utils/socketSync';
import { sounds } from './utils/soundEffects';
import confetti from 'canvas-confetti';
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

  // Multi-Device LAN & Screen Role state
  const [clientRole, setClientRole] = useState<ClientRole>(() => {
    if (typeof window !== 'undefined' && window.location.search.includes('role=master')) {
      return 'master';
    }
    return 'station';
  });
  const [syncStatus, setSyncStatus] = useState<ConnectionStatus>('offline');
  const [connectedCount, setConnectedCount] = useState<number>(1);
  const [recentEvents, setRecentEvents] = useState<ActivityEvent[]>([]);

  // QR / Short Code Fallback modal state
  const [showSyncQRModal, setShowSyncQRModal] = useState<boolean>(false);
  const [qrModalMode, setQrModalMode] = useState<'show' | 'redeem'>('show');
  const [currentQRData, setCurrentQRData] = useState<SyncQRData | null>(null);

  // Initialize Socket.io LAN synchronization
  useEffect(() => {
    socketSync.init(clientRole, activeTeamId);

    const unsubStatus = socketSync.onStatusChange((status, count) => {
      setSyncStatus(status);
      setConnectedCount(count);
    });

    const unsubTournament = socketSync.onTournamentSync((syncedState) => {
      if (syncedState && Array.isArray(syncedState.teams)) {
        setTeams(syncedState.teams);
      }
      if (syncedState?.recentEvents) {
        setRecentEvents(syncedState.recentEvents);
      }
    });

    const unsubVictory = (payload: { teamId: string; moleculeId: string; scoreEarned: number; teamName?: string }) => {
      sounds.playSuccess();
      try {
        confetti({
          particleCount: 160,
          spread: 90,
          origin: { y: 0.6 },
        });
      } catch {
        // Ignore in environments without canvas
      }
    };

    const cleanupVictory = socketSync.onVictory(unsubVictory);

    return () => {
      unsubStatus();
      unsubTournament();
      cleanupVictory();
    };
  }, [clientRole]);

  useEffect(() => {
    socketSync.setRole(clientRole, activeTeamId);
  }, [clientRole, activeTeamId]);

  // Auto-unlock Web Audio API on first user gesture to overcome browser autoplay restrictions
  useEffect(() => {
    const handleFirstGesture = () => {
      sounds.unlockAudio();
    };

    window.addEventListener('click', handleFirstGesture, { once: true });
    window.addEventListener('pointerdown', handleFirstGesture, { once: true });
    window.addEventListener('keydown', handleFirstGesture, { once: true });

    return () => {
      window.removeEventListener('click', handleFirstGesture);
      window.removeEventListener('pointerdown', handleFirstGesture);
      window.removeEventListener('keydown', handleFirstGesture);
    };
  }, []);

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
      // Emit trivia score to LAN server
      socketSync.emitScoreUpdate({
        teamId: activeTeamId,
        scoreDelta: bonus,
        triviaBonus: bonus,
        totalEarned: bonus,
      });
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

    // Emit real-time update to LAN server
    socketSync.emitScoreUpdate({
      teamId: activeTeamId,
      scoreDelta: roundScore,
      completedMoleculeId: currentMolecule.id,
      timeBonus,
      triviaBonus: triviaBonusEarned,
      totalEarned,
    });
    socketSync.emitVictoryFanfare({
      teamId: activeTeamId,
      moleculeId: currentMolecule.id,
      scoreEarned: totalEarned,
      teamName: activeTeam.name,
    });

    // Generate short 6-char fallback code and QR data
    const teamPrefix = activeTeam.id.replace('team-', '').slice(0, 3).toUpperCase() || 'ALF';
    const shortCode = `${teamPrefix}-${totalEarned}`;
    setCurrentQRData({
      teamId: activeTeam.id,
      teamName: activeTeam.name,
      moleculeId: currentMolecule.id,
      moleculeName: currentMolecule.name,
      scoreEarned: totalEarned,
      timeBonus,
      triviaBonus: triviaBonusEarned,
      shortCode,
      timestamp: Date.now(),
    });

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
    socketSync.emitResetTournament();
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

  const handleUpdateTeams = (newTeams: TeamScore[]) => {
    setTeams(newTeams);
    socketSync.emitTournamentSync(newTeams);
  };

  const handleRedeemCode = (payload: { teamId: string; score: number; moleculeId: string; code: string }) => {
    socketSync.emitRedeemCode(payload);
    setTeams((prev) =>
      prev.map((t) => {
        if (t.id === payload.teamId) {
          const completed = payload.moleculeId && !t.completedMolecules.includes(payload.moleculeId)
            ? [...t.completedMolecules, payload.moleculeId]
            : t.completedMolecules;
          return {
            ...t,
            score: t.score + payload.score,
            completedMolecules: completed,
          };
        }
        return t;
      })
    );
    sounds.playSuccess();
    try {
      confetti({
        particleCount: 140,
        spread: 80,
        origin: { y: 0.6 },
      });
    } catch {
      // Ignore
    }
  };

  return (
    <div className="relative flex flex-col min-h-screen bg-oled text-slate-100 selection:bg-orange-500 selection:text-black">
      <ShaderBackground />
      {clientRole === 'master' ? (
        <ProjectorView
          teams={teams}
          syncStatus={syncStatus}
          connectedCount={connectedCount}
          recentEvents={recentEvents}
          onOpenRedeemModal={() => {
            setQrModalMode('redeem');
            setShowSyncQRModal(true);
          }}
          onSwitchToStation={() => setClientRole('station')}
          onOpenSettings={() => setShowSettingsModal(true)}
        />
      ) : (
        <>
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
            syncStatus={syncStatus}
            connectedCount={connectedCount}
            onSwitchToProjector={() => setClientRole('master')}
            onOpenSyncQR={() => {
              setQrModalMode('show');
              setShowSyncQRModal(true);
            }}
          />

          {/* Main Workspace: Two Clear Structural Sections */}
          <main className="flex-1 max-w-7xl w-full mx-auto p-3 md:p-4 flex flex-col gap-4">
            {/* SECCIÓN SUPERIOR DIDÁCTICA (Ficha molecular amplia y corrida) */}
            <section className="w-full">
              <MoleculeInfoCard
                molecule={currentMolecule}
                onTriviaAnswered={handleTriviaAnswered}
                triviaAnswered={triviaAnswered}
              />
            </section>

            {/* SECCIÓN INFERIOR 3D Y ENSAMBLADO (Visor 3D a la izquierda, Validación Kit a la derecha) */}
            <section className="w-full grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch">
              {/* Left Column: 3D Molecular Stage + CPK Legend (7 cols on lg) */}
              <div className="lg:col-span-7 flex flex-col gap-3 min-h-[460px] lg:min-h-[520px]">
                <div className="flex-1 relative rounded-xl overflow-hidden shadow-2xl min-h-[380px]">
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
              </div>

              {/* Right Column: Physical Kit Assembly Checklist & Validation (5 cols on lg) */}
              <div className="lg:col-span-5 flex flex-col min-h-[460px] lg:min-h-[520px]">
                <KitValidationPanel
                  molecule={currentMolecule}
                  timeLeft={timeLeft}
                  onValidateSuccess={handleValidateSuccess}
                  disabled={false}
                  isAlreadyCompleted={activeTeam.completedMolecules.includes(currentMolecule.id)}
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
        </>
      )}

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
        onUpdateTeams={handleUpdateTeams}
        onResetTournament={handleResetTournament}
        currentRole={clientRole}
        onSelectRole={setClientRole}
        syncStatus={syncStatus}
        connectedCount={connectedCount}
      />

      <SyncQRModal
        isOpen={showSyncQRModal}
        onClose={() => setShowSyncQRModal(false)}
        mode={qrModalMode}
        data={currentQRData}
        teams={teams}
        onRedeemCode={handleRedeemCode}
      />
    </div>
  );
};

export default App;
