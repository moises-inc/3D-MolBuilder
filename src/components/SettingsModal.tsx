import React, { useState } from 'react';
import { Settings, X, Plus, Trash2, RotateCcw, Check, Monitor, Tv, Wifi, WifiOff, Users } from 'lucide-react';
import { TeamScore } from '../types/game';
import { ClientRole, ConnectionStatus } from '../utils/socketSync';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
  teams: TeamScore[];
  onUpdateTeams: (teams: TeamScore[]) => void;
  onResetTournament: () => void;
  currentRole?: ClientRole;
  onSelectRole?: (role: ClientRole) => void;
  syncStatus?: ConnectionStatus;
  connectedCount?: number;
}

export const SettingsModal: React.FC<SettingsModalProps> = ({
  isOpen,
  onClose,
  teams,
  onUpdateTeams,
  onResetTournament,
  currentRole = 'station',
  onSelectRole,
  syncStatus = 'offline',
  connectedCount = 1,
}) => {
  const [newTeamName, setNewTeamName] = useState('');

  if (!isOpen) return null;

  const handleAddTeam = () => {
    if (!newTeamName.trim()) return;
    const newTeam: TeamScore = {
      id: `team-${Date.now()}`,
      name: newTeamName.trim(),
      score: 0,
      completedMolecules: [],
      color: '#5de1e5',
    };
    onUpdateTeams([...teams, newTeam]);
    setNewTeamName('');
  };

  const handleRemoveTeam = (id: string) => {
    if (teams.length <= 1) return; // keep at least 1 team
    onUpdateTeams(teams.filter((t) => t.id !== id));
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-lg bg-oled-card border border-oled-border rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-oled-border flex items-center justify-between bg-oled-panel">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-slate-300" />
            <h3 className="font-bold text-white text-base">Configuración de Torneo & Equipos</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5 max-h-[65vh] overflow-y-auto text-xs">
          {/* Screen Role Selector */}
          <div className="p-3.5 bg-oled-panel rounded-xl border border-oled-border space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5">
                <Monitor className="w-3.5 h-3.5 text-pide-cyan" />
                <span>Rol de Pantalla de este Dispositivo:</span>
              </h4>
              <div className="flex items-center gap-1.5 text-[11px] font-mono">
                <span className={`w-2 h-2 rounded-full ${syncStatus === 'connected' ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`} />
                <span className="text-slate-300">{syncStatus === 'connected' ? `LAN (${connectedCount} disp.)` : 'Offline / QR'}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => onSelectRole && onSelectRole('station')}
                className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                  currentRole === 'station'
                    ? 'bg-cyan-950/40 border-pide-cyan text-white shadow-lg shadow-cyan-500/10'
                    : 'bg-black/40 border-oled-border text-slate-400 hover:text-white'
                }`}
              >
                <Monitor className="w-4 h-4 text-pide-cyan shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-xs text-white">Estación de Mesa</div>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                    Visor 3D, kit físico y trivia para estudiantes en competencia.
                  </p>
                </div>
              </button>

              <button
                type="button"
                onClick={() => onSelectRole && onSelectRole('master')}
                className={`p-3 rounded-xl border text-left flex items-start gap-2.5 transition-all ${
                  currentRole === 'master'
                    ? 'bg-amber-950/40 border-uss-gold text-white shadow-lg shadow-amber-500/10'
                    : 'bg-black/40 border-oled-border text-slate-400 hover:text-white'
                }`}
              >
                <Tv className="w-4 h-4 text-uss-goldBright shrink-0 mt-0.5" />
                <div>
                  <div className="font-bold text-xs text-white">Proyector Principal</div>
                  <p className="text-[10px] text-slate-400 mt-0.5 leading-snug">
                    Marcador central gigante, podio en vivo y ticker para la audiencia.
                  </p>
                </div>
              </button>
            </div>
          </div>

          {/* Team management section */}
          <div>
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-2 font-mono">
              Equipos Escolares Participantes:
            </h4>

            <div className="space-y-2 mb-3">
              {teams.map((t) => (
                <div 
                  key={t.id}
                  className="flex items-center justify-between p-2.5 bg-oled-panel rounded-lg border border-oled-border"
                >
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-cyan-400" />
                    <span className="font-semibold text-white">{t.name}</span>
                    <span className="font-mono text-slate-400 text-[11px]">({t.score} pts)</span>
                  </div>
                  {teams.length > 1 && (
                    <button
                      onClick={() => handleRemoveTeam(t.id)}
                      className="text-slate-500 hover:text-red-400 p-1 transition-colors"
                      title="Eliminar equipo"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Add Team Input */}
            <div className="flex gap-2">
              <input
                type="text"
                placeholder="Nombre del nuevo equipo (ej: Grupo 3 - Liceo B)"
                value={newTeamName}
                onChange={(e) => setNewTeamName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleAddTeam()}
                className="flex-1 bg-oled-panel border border-oled-border rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-400"
              />
              <button
                onClick={handleAddTeam}
                className="px-3 py-2 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg flex items-center gap-1 transition-colors shrink-0"
              >
                <Plus className="w-4 h-4" />
                <span>Agregar</span>
              </button>
            </div>
          </div>

          {/* Reset tournament */}
          <div className="pt-4 border-t border-oled-border">
            <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] mb-1 font-mono">
              Zona de Peligro / Reinicio:
            </h4>
            <p className="text-slate-400 text-[11px] mb-3">
              Reinicia los puntajes y moléculas completadas de todos los equipos para una nueva partida o ronda de feria.
            </p>
            <button
              onClick={() => {
                if (window.confirm('¿Seguro que deseas reiniciar todos los puntajes del torneo?')) {
                  onResetTournament();
                  onClose();
                }
              }}
              className="py-2 px-3 bg-red-950/40 hover:bg-red-900/50 text-red-300 border border-red-800/40 rounded-lg flex items-center gap-1.5 transition-colors font-semibold"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reiniciar Torneo Escolar</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-oled-border bg-oled-panel flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg transition-colors"
          >
            Guardar y Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
