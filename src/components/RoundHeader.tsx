import React from 'react';
import { 
  Timer, 
  Play, 
  Pause, 
  RotateCcw, 
  Trophy, 
  Users, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Flame,
  Award
} from 'lucide-react';
import { MoleculeData } from '../types/chemistry';
import { TeamScore } from '../types/game';

interface RoundHeaderProps {
  currentMolecule: MoleculeData;
  currentIndex: number;
  totalMolecules: number;
  onSelectIndex: (index: number) => void;
  timeLeft: number;
  timerActive: boolean;
  onToggleTimer: () => void;
  onResetTimer: () => void;
  activeTeam: TeamScore;
  teams: TeamScore[];
  onSelectTeam: (teamId: string) => void;
  onOpenSettings: () => void;
  onOpenLeaderboard: () => void;
}

export const RoundHeader: React.FC<RoundHeaderProps> = ({
  currentMolecule,
  currentIndex,
  totalMolecules,
  onSelectIndex,
  timeLeft,
  timerActive,
  onToggleTimer,
  onResetTimer,
  activeTeam,
  teams,
  onSelectTeam,
  onOpenSettings,
  onOpenLeaderboard,
}) => {
  const maxTime = currentMolecule.timeLimitSeconds;
  const progressPercent = Math.max(0, Math.min(100, (timeLeft / maxTime) * 100));

  // Determine timer color
  const isUrgent = timeLeft <= 15;
  const isWarning = timeLeft > 15 && timeLeft <= 30;

  const timerColorClass = isUrgent
    ? 'text-red-400 animate-pulse'
    : isWarning
    ? 'text-amber-400'
    : 'text-cyan-400';

  const timerBarClass = isUrgent
    ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]'
    : isWarning
    ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)]'
    : 'bg-cyan-400 shadow-[0_0_10px_rgba(93,225,229,0.6)]';

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <header className="w-full bg-black/90 backdrop-blur-md border-b border-oled-border sticky top-0 z-30 px-4 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3">
        {/* Brand & Round Selector */}
        <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-start">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-lg bg-uss-blue border border-uss-gold/60 flex items-center justify-center font-bold text-uss-gold shadow-md">
              USS
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold text-slate-100 tracking-wide uppercase">PIDE VcM</span>
                <span className="text-[10px] px-1.5 py-0.2 bg-uss-gold/20 text-uss-goldBright font-mono font-bold rounded border border-uss-gold/30">
                  3D MolBuilder
                </span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono">Feria Escolar de Química</p>
            </div>
          </div>

          <div className="h-6 w-px bg-oled-border hidden md:block" />

          {/* Molecule navigation carousel */}
          <div className="flex items-center gap-1 bg-oled-panel p-1 rounded-lg border border-oled-border">
            <button
              onClick={() => onSelectIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
              title="Molécula anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="px-2 text-center min-w-[120px]">
              <div className="text-[10px] uppercase font-mono text-slate-400">
                Ronda {currentIndex + 1} de {totalMolecules}
              </div>
              <div className="text-xs font-bold text-white truncate max-w-[140px]">
                {currentMolecule.name}
              </div>
            </div>
            <button
              onClick={() => onSelectIndex(Math.min(totalMolecules - 1, currentIndex + 1))}
              disabled={currentIndex === totalMolecules - 1}
              className="p-1 text-slate-400 hover:text-white disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
              title="Siguiente molécula"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center: Interactive Countdown Timer */}
        <div className="flex items-center gap-3 bg-oled-panel px-4 py-1.5 rounded-xl border border-oled-border w-full md:w-auto justify-center">
          <div className="flex items-center gap-2">
            <Timer className={`w-4 h-4 ${timerColorClass}`} />
            <span className={`text-xl font-mono font-bold tracking-wider ${timerColorClass}`}>
              {formatTime(timeLeft)}
            </span>
          </div>

          {/* Mini progress bar */}
          <div className="w-24 h-2 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50 hidden sm:block">
            <div
              className={`h-full transition-all duration-300 ${timerBarClass}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center gap-1 ml-1">
            <button
              onClick={onToggleTimer}
              className={`p-1.5 rounded-md font-bold transition-all text-xs flex items-center gap-1 ${
                timerActive
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 hover:bg-emerald-500/30'
              }`}
              title={timerActive ? 'Pausar Tiempo' : 'Iniciar Tiempo de Ronda'}
            >
              {timerActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
              <span>{timerActive ? 'Pausar' : 'Iniciar'}</span>
            </button>

            <button
              onClick={onResetTimer}
              className="p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Reiniciar cronómetro"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Active Team & Score Controls */}
        <div className="flex items-center gap-2 w-full md:w-auto justify-between md:justify-end">
          {/* Team Selector Dropdown */}
          <div className="flex items-center gap-1.5 bg-oled-panel px-2.5 py-1 rounded-lg border border-oled-border">
            <Users className="w-3.5 h-3.5 text-slate-400" />
            <select
              value={activeTeam.id}
              onChange={(e) => onSelectTeam(e.target.value)}
              className="bg-transparent text-xs font-semibold text-white focus:outline-none cursor-pointer"
            >
              {teams.map((t) => (
                <option key={t.id} value={t.id} className="bg-slate-900 text-white">
                  {t.name} ({t.score} pts)
                </option>
              ))}
            </select>
          </div>

          {/* Current Team Score Badge */}
          <div className="flex items-center gap-1.5 bg-uss-blue/40 border border-uss-gold/40 px-3 py-1 rounded-lg">
            <Trophy className="w-3.5 h-3.5 text-uss-goldBright" />
            <span className="text-xs font-mono font-bold text-uss-goldBright">
              {activeTeam.score} pts
            </span>
          </div>

          {/* Leaderboard Button */}
          <button
            onClick={onOpenLeaderboard}
            className="p-1.5 rounded-lg bg-oled-panel border border-oled-border text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
            title="Ver Tabla de Posiciones"
          >
            <Award className="w-4 h-4 text-pide-cyan" />
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="p-1.5 rounded-lg bg-oled-panel border border-oled-border text-slate-300 hover:text-white hover:border-slate-500 transition-colors"
            title="Configuración de Rondas y Equipos"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};
