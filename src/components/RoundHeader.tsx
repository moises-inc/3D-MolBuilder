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
  Award,
  Tv,
  QrCode
} from 'lucide-react';
import { MoleculeData } from '../types/chemistry';
import { TeamScore } from '../types/game';
import { ConnectionStatus } from '../utils/socketSync';

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
  syncStatus?: ConnectionStatus;
  connectedCount?: number;
  onSwitchToProjector?: () => void;
  onOpenSyncQR?: () => void;
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
  syncStatus = 'offline',
  connectedCount = 1,
  onSwitchToProjector,
  onOpenSyncQR,
}) => {
  const maxTime = currentMolecule.timeLimitSeconds || 45;
  const progressPercent = Math.max(0, Math.min(100, (timeLeft / maxTime) * 100));

  // Determine timer color (Kiosk High-Contrast)
  const isUrgent = timeLeft <= 15;
  const isWarning = timeLeft > 15 && timeLeft <= 25;

  const timerColorClass = isUrgent
    ? 'text-red-400 animate-pulse'
    : isWarning
    ? 'text-amber-300'
    : 'text-emerald-400';

  const timerBarClass = isUrgent
    ? 'bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.8)]'
    : isWarning
    ? 'bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.6)]'
    : 'bg-emerald-400 shadow-[0_0_10px_rgba(56,239,125,0.7)]';

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <header className="w-full bg-gradient-to-r from-[#060b1e] via-[#0f1d40] to-[#060b1e] border-b border-emerald-500/40 shadow-lg sticky top-0 z-30 px-3 sm:px-5 py-2">
      <div className="max-w-7xl mx-auto flex items-center justify-between gap-2 sm:gap-4 flex-wrap">
        
        {/* Brand & Round Selector */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          <div className="flex items-center gap-2">
            <img 
              src="/assets/uss_shield.png" 
              alt="Universidad San Sebastián" 
              className="h-8 sm:h-9 w-auto object-contain drop-shadow-[0_0_8px_rgba(212,175,55,0.4)] select-none"
            />
            <span className="font-mono text-sm sm:text-base font-black tracking-wide text-emerald-400 select-none hidden sm:inline">
              3D MolBuilder
            </span>
          </div>

          <div className="h-5 w-px bg-slate-700/60 hidden md:block" />

          {/* Molecule Carousel Navigation */}
          <div className="flex items-center gap-1 bg-black/50 p-1 rounded-xl border border-emerald-500/30">
            <button
              onClick={() => onSelectIndex(Math.max(0, currentIndex - 1))}
              disabled={currentIndex === 0}
              className="p-1 text-slate-400 hover:text-emerald-300 disabled:opacity-20 transition-colors"
              title="Molécula anterior"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <div className="px-2 text-center min-w-[100px] sm:min-w-[130px]">
              <span className="text-[10px] uppercase font-mono text-emerald-400/80 font-bold block">
                Ronda {currentIndex + 1}/{totalMolecules}
              </span>
              <span className="text-xs font-black text-white truncate max-w-[110px] sm:max-w-[140px] block">
                {currentMolecule.name}
              </span>
            </div>
            <button
              onClick={() => onSelectIndex(Math.min(totalMolecules - 1, currentIndex + 1))}
              disabled={currentIndex === totalMolecules - 1}
              className="p-1 text-slate-400 hover:text-emerald-300 disabled:opacity-20 transition-colors"
              title="Siguiente molécula"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Center: Countdown Timer (Despejado & Legible Kiosk) */}
        <div className="flex items-center gap-2 sm:gap-3 bg-black/60 px-3 py-1 rounded-xl border border-emerald-500/40 shadow-inner">
          <div className="flex items-center gap-1.5">
            <Timer className={`w-4 h-4 ${timerColorClass}`} />
            <span className={`text-lg sm:text-xl font-mono font-black tracking-wider ${timerColorClass}`}>
              {formatTime(timeLeft)}
            </span>
          </div>

          {/* Mini progress bar */}
          <div className="w-16 sm:w-20 h-1.5 bg-slate-800 rounded-full overflow-hidden border border-slate-700/50 hidden md:block">
            <div
              className={`h-full transition-all duration-300 ${timerBarClass}`}
              style={{ width: `${progressPercent}%` }}
            />
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={onToggleTimer}
              className={`px-2 py-1 rounded-lg font-black transition-all text-xs flex items-center gap-1 shadow-sm ${
                timerActive
                  ? 'bg-amber-500/30 text-amber-300 border border-amber-500/60 hover:bg-amber-500/40'
                  : 'bg-emerald-500 text-black border border-emerald-300 hover:bg-emerald-400 shadow-[0_0_10px_rgba(56,239,125,0.4)]'
              }`}
              title={timerActive ? 'Pausar Tiempo' : 'Iniciar Tiempo de Ronda'}
            >
              {timerActive ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-black" />}
              <span className="hidden sm:inline">{timerActive ? 'Pausar' : 'Iniciar'}</span>
            </button>

            <button
              onClick={onResetTimer}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              title="Reiniciar cronómetro"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Right: Team Selection, Score & Controls */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Unified Team Selector + Score Badge */}
          <div className="flex items-center bg-black/60 rounded-xl border border-emerald-500/40 overflow-hidden shadow-sm">
            <div className="flex items-center gap-1.5 px-2.5 py-1">
              <Users className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <select
                value={activeTeam.id}
                onChange={(e) => onSelectTeam(e.target.value)}
                className="bg-transparent text-xs font-bold text-white focus:outline-none cursor-pointer pr-1"
                title="Seleccionar Equipo Activo"
              >
                {teams.map((t) => (
                  <option key={t.id} value={t.id} className="bg-slate-900 text-white">
                    {t.name}
                  </option>
                ))}
              </select>
            </div>
            
            <div className="bg-emerald-500/20 border-l border-emerald-500/40 px-2.5 py-1 flex items-center gap-1">
              <Trophy className="w-3.5 h-3.5 text-yellow-400" />
              <span className="text-xs font-mono font-black text-yellow-300">
                {activeTeam.score} pts
              </span>
            </div>
          </div>

          {/* Leaderboard Button */}
          <button
            onClick={onOpenLeaderboard}
            className="p-2 rounded-xl bg-black/60 border border-emerald-500/40 text-emerald-300 hover:text-white hover:bg-emerald-500/20 hover:border-emerald-400 transition-all shadow-sm"
            title="Ver Tabla de Posiciones"
          >
            <Award className="w-4 h-4 text-emerald-400" />
          </button>

          {/* Quick QR fallback */}
          {onOpenSyncQR && (
            <button
              onClick={onOpenSyncQR}
              className="p-2 rounded-xl bg-black/60 border border-amber-500/40 text-amber-300 hover:text-white hover:bg-amber-500/20 transition-all"
              title="Código QR y Respaldo de Ronda"
            >
              <QrCode className="w-4 h-4" />
            </button>
          )}

          {/* Switch to Projector */}
          {onSwitchToProjector && (
            <button
              onClick={onSwitchToProjector}
              className="p-2 rounded-xl bg-black/60 border border-cyan-500/40 text-cyan-300 hover:text-white hover:bg-cyan-500/20 transition-all hidden lg:flex items-center gap-1 text-xs font-bold"
              title="Modo Proyector Central"
            >
              <Tv className="w-4 h-4" />
            </button>
          )}

          {/* LAN Connection Status */}
          <button 
            type="button"
            onClick={onOpenSettings}
            className="flex items-center gap-1.5 px-2 py-1.5 rounded-xl bg-black/60 border border-slate-700 text-[11px] font-mono hover:border-slate-500 transition-all"
            title={
              syncStatus === 'connected' 
                ? `Conectado a Red LAN (${connectedCount} dispositivos) — Clic para configuración` 
                : syncStatus === 'connecting'
                ? 'Conectando a Red LAN...'
                : 'Modo Offline — Clic para conectar'
            }
          >
            <span 
              className={`w-2 h-2 rounded-full ${
                syncStatus === 'connected' 
                  ? 'bg-emerald-400 shadow-[0_0_8px_#38ef7d] animate-pulse' 
                  : syncStatus === 'connecting'
                  ? 'bg-cyan-400 shadow-[0_0_8px_#5de1e5] animate-ping'
                  : 'bg-amber-400 shadow-[0_0_8px_#efb65f]'
              }`} 
            />
            <span className="text-slate-300 hidden xl:inline">
              {syncStatus === 'connected' ? 'LAN' : 'Local'}
            </span>
          </button>

          {/* Settings Button */}
          <button
            onClick={onOpenSettings}
            className="p-2 rounded-xl bg-black/60 border border-slate-700 text-slate-300 hover:text-white hover:border-slate-500 transition-all"
            title="Configuración de Red y Equipos"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>

      </div>
    </header>
  );
};
