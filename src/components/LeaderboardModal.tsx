import React from 'react';
import { Trophy, X, Medal, Award, Users, CheckCircle2 } from 'lucide-react';
import { TeamScore } from '../types/game';

interface LeaderboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  teams: TeamScore[];
}

export const LeaderboardModal: React.FC<LeaderboardModalProps> = ({
  isOpen,
  onClose,
  teams,
}) => {
  if (!isOpen) return null;

  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return <Medal className="w-5 h-5 text-uss-goldBright" />;
      case 1:
        return <Medal className="w-5 h-5 text-slate-300" />;
      case 2:
        return <Medal className="w-5 h-5 text-amber-600" />;
      default:
        return <span className="text-xs font-mono font-bold text-slate-500">#{index + 1}</span>;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-oled-card border border-oled-border rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-oled-border flex items-center justify-between bg-oled-panel">
          <div className="flex items-center gap-2">
            <Trophy className="w-5 h-5 text-uss-goldBright" />
            <h3 className="font-bold text-white text-base">Tabla de Posiciones — Feria VcM</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-2.5 max-h-[60vh] overflow-y-auto">
          {sortedTeams.map((team, index) => (
            <div
              key={team.id}
              className={`p-3 rounded-xl border flex items-center justify-between ${
                index === 0
                  ? 'bg-gradient-to-r from-uss-blue/60 to-oled-panel border-uss-gold/60 text-white'
                  : 'bg-oled-panel border-oled-border text-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-7 flex items-center justify-center">
                  {getRankBadge(index)}
                </div>
                <div>
                  <h4 className="font-bold text-sm text-white">{team.name}</h4>
                  <div className="flex items-center gap-1.5 text-[11px] text-slate-400 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                    <span>{team.completedMolecules.length} moléculas ensambladas</span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <span className="text-base font-mono font-extrabold text-pide-cyan">
                  {team.score}
                </span>
                <span className="text-[10px] text-slate-400 block font-mono uppercase">puntos</span>
              </div>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-oled-border bg-oled-panel text-center">
          <button
            onClick={onClose}
            className="w-full py-2 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg transition-colors"
          >
            Cerrar Tabla
          </button>
        </div>
      </div>
    </div>
  );
};
