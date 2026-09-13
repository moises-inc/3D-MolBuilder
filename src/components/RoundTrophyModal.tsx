import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { 
  Trophy, 
  Sparkles, 
  ArrowRight, 
  CheckCircle2, 
  Timer, 
  Award, 
  Users,
  RotateCcw
} from 'lucide-react';
import { MoleculeData } from '../types/chemistry';
import { TeamScore } from '../types/game';

interface RoundTrophyModalProps {
  isOpen: boolean;
  onClose: () => void;
  onNextRound: () => void;
  molecule: MoleculeData;
  team: TeamScore;
  scoreEarned: number;
  timeBonus: number;
  triviaBonus: number;
  teams: TeamScore[];
  hasNextRound: boolean;
}

export const RoundTrophyModal: React.FC<RoundTrophyModalProps> = ({
  isOpen,
  onClose,
  onNextRound,
  molecule,
  team,
  scoreEarned,
  timeBonus,
  triviaBonus,
  teams,
  hasNextRound,
}) => {
  useEffect(() => {
    if (isOpen) {
      // Trigger festive multi-colored confetti
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#5de1e5', '#efb65f', '#38ef7d', '#00205B', '#D4AF37'],
      });

      const timer = setTimeout(() => {
        confetti({
          particleCount: 50,
          angle: 60,
          spread: 55,
          origin: { x: 0 },
          colors: ['#5de1e5', '#D4AF37'],
        });
        confetti({
          particleCount: 50,
          angle: 120,
          spread: 55,
          origin: { x: 1 },
          colors: ['#efb65f', '#38ef7d'],
        });
      }, 350);

      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Sort teams for leaderboard display
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg bg-oled-card border border-cyan-500/50 rounded-2xl shadow-[0_0_50px_rgba(93,225,229,0.25)] overflow-hidden flex flex-col">
        {/* Header Ribbon */}
        <div className="bg-gradient-to-r from-uss-blue via-slate-900 to-uss-blue p-6 text-center border-b border-oled-border relative overflow-hidden">
          <div className="absolute -top-6 -right-6 w-24 h-24 bg-uss-gold/20 rounded-full blur-2xl pointer-events-none" />
          <div className="absolute -bottom-6 -left-6 w-24 h-24 bg-pide-cyan/20 rounded-full blur-2xl pointer-events-none" />

          <div className="w-14 h-14 mx-auto rounded-full bg-uss-gold/20 border-2 border-uss-goldBright flex items-center justify-center shadow-lg mb-3">
            <Trophy className="w-8 h-8 text-uss-goldBright animate-bounce" />
          </div>

          <span className="text-[11px] uppercase font-mono tracking-widest text-uss-goldBright font-bold">
            ¡Ronda Completada con Éxito!
          </span>
          <h2 className="text-2xl font-black text-white mt-1">
            {molecule.name} ({molecule.formula})
          </h2>
          <p className="text-xs text-slate-300 mt-1 font-mono">
            Equipo: <strong className="text-pide-cyan">{team.name}</strong>
          </p>
        </div>

        {/* Score Breakdown Body */}
        <div className="p-6 space-y-4 text-xs">
          {/* Points Breakdown Grid */}
          <div className="grid grid-cols-3 gap-2.5">
            <div className="bg-oled-panel p-3 rounded-xl border border-oled-border text-center">
              <span className="text-[10px] uppercase font-mono text-slate-400 block">Puntos Base</span>
              <span className="text-lg font-mono font-bold text-white mt-1 block">
                +{scoreEarned - timeBonus - triviaBonus}
              </span>
            </div>

            <div className="bg-oled-panel p-3 rounded-xl border border-oled-border text-center">
              <span className="text-[10px] uppercase font-mono text-cyan-400 block">Bono de Tiempo</span>
              <span className="text-lg font-mono font-bold text-pide-cyan mt-1 block">
                +{timeBonus}
              </span>
            </div>

            <div className="bg-oled-panel p-3 rounded-xl border border-oled-border text-center">
              <span className="text-[10px] uppercase font-mono text-amber-400 block">Bono de Trivia</span>
              <span className="text-lg font-mono font-bold text-pide-amber mt-1 block">
                +{triviaBonus}
              </span>
            </div>
          </div>

          {/* Total Earned Highlight */}
          <div className="bg-gradient-to-r from-cyan-950/40 via-oled-panel to-cyan-950/40 border border-cyan-500/40 p-3.5 rounded-xl flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-pide-cyan" />
              <div>
                <span className="text-xs font-bold text-white block">Puntaje Total de la Ronda</span>
                <span className="text-[10px] text-slate-400 font-mono">Sumado a la tabla general</span>
              </div>
            </div>
            <span className="text-2xl font-mono font-extrabold text-pide-cyan">
              +{scoreEarned} pts
            </span>
          </div>

          {/* Mini Leaderboard Preview */}
          <div className="bg-oled-panel p-3.5 rounded-xl border border-oled-border space-y-2">
            <div className="flex items-center justify-between text-[11px] font-bold text-slate-400 uppercase font-mono">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5" />
                <span>Posición de Equipos</span>
              </span>
              <span>Puntaje Total</span>
            </div>

            <div className="space-y-1.5">
              {sortedTeams.map((t, idx) => (
                <div 
                  key={t.id}
                  className={`flex items-center justify-between p-2 rounded-lg text-xs ${
                    t.id === team.id 
                      ? 'bg-cyan-950/50 border border-cyan-500/40 text-white font-bold' 
                      : 'bg-black/40 text-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="w-4 text-center font-mono font-bold text-slate-400">
                      #{idx + 1}
                    </span>
                    <span>{t.name}</span>
                  </div>
                  <span className="font-mono font-bold text-pide-cyan">
                    {t.score} pts
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Actions */}
        <div className="p-4 border-t border-oled-border bg-oled-panel flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex-1 py-2.5 rounded-xl border border-oled-border text-slate-300 hover:text-white hover:bg-white/10 font-semibold text-xs transition-colors"
          >
            Permanecer en la Molécula
          </button>

          {hasNextRound ? (
            <button
              onClick={onNextRound}
              className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg transition-all"
            >
              <span>Siguiente Ronda</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          ) : (
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl bg-uss-gold hover:bg-uss-goldBright text-black font-extrabold text-xs uppercase tracking-wider flex items-center justify-center gap-1.5 shadow-lg transition-all"
            >
              <span>¡Torneo Finalizado!</span>
              <Trophy className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
