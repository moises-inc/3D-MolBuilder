import React, { useState, useEffect } from 'react';
import { 
  Settings, 
  X, 
  Plus, 
  Trash2, 
  RotateCcw, 
  Check, 
  Monitor, 
  Tv, 
  Wifi, 
  WifiOff, 
  Users,
  Globe,
  RefreshCw,
  AlertTriangle,
  Radio,
  CheckCircle2
} from 'lucide-react';
import { TeamScore } from '../types/game';
import { ClientRole, ConnectionStatus, NetworkDiagnostics, socketSync } from '../utils/socketSync';

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
  const [diagnostics, setDiagnostics] = useState<NetworkDiagnostics>(() => socketSync.getDiagnostics());
  const [customIpInput, setCustomIpInput] = useState('');
  const [isSavedNotice, setIsSavedNotice] = useState(false);

  useEffect(() => {
    if (!isOpen) return;
    setDiagnostics(socketSync.getDiagnostics());
    const unsub = socketSync.onDiagnosticsChange((diag) => {
      setDiagnostics(diag);
      if (!customIpInput && diag.activeUrl) {
        setCustomIpInput(diag.activeUrl);
      }
    });
    return unsub;
  }, [isOpen]);

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

  const handleConnectCustomIp = () => {
    if (!customIpInput.trim()) return;
    socketSync.setCustomServer(customIpInput.trim());
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2500);
  };

  const handleResetToAuto = () => {
    socketSync.resetToAutoServer();
    setCustomIpInput('');
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2500);
  };

  const handleQuickConnect = (ip: string) => {
    const target = `http://${ip}:5173`;
    setCustomIpInput(target);
    socketSync.setCustomServer(target);
    setIsSavedNotice(true);
    setTimeout(() => setIsSavedNotice(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-xl bg-oled-card border border-oled-border rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-oled-border flex items-center justify-between bg-oled-panel">
          <div className="flex items-center gap-2">
            <Settings className="w-5 h-5 text-slate-300" />
            <h3 className="font-bold text-white text-base">Configuración de Red & Torneo</h3>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-5 space-y-5 max-h-[70vh] overflow-y-auto text-xs">
          {/* Screen Role Selector */}
          <div className="p-3.5 bg-oled-panel rounded-xl border border-oled-border space-y-2.5">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5">
                <Monitor className="w-3.5 h-3.5 text-pide-cyan" />
                <span>Rol de Pantalla de este Dispositivo:</span>
              </h4>
              <div className="flex items-center gap-1.5 text-[11px] font-mono">
                <span className={`w-2 h-2 rounded-full ${
                  diagnostics.status === 'connected' 
                    ? 'bg-emerald-400 animate-pulse' 
                    : diagnostics.status === 'connecting'
                    ? 'bg-cyan-400 animate-ping'
                    : 'bg-amber-400'
                }`} />
                <span className="text-slate-300">
                  {diagnostics.status === 'connected' 
                    ? `LAN (${diagnostics.connectedCount} disp.)` 
                    : diagnostics.status === 'connecting'
                    ? 'Conectando...'
                    : 'Offline / QR'}
                </span>
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

          {/* Network LAN Synchronization & Server IP Setup */}
          <div className="p-3.5 bg-oled-panel rounded-xl border border-oled-border space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-bold text-slate-200 uppercase tracking-wider text-[11px] font-mono flex items-center gap-1.5">
                <Globe className="w-3.5 h-3.5 text-pide-cyan" />
                <span>Sincronización Multidispositivo & Red Wi-Fi:</span>
              </h4>
              <button
                onClick={() => socketSync.reconnect()}
                className="text-[10px] font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 bg-cyan-950/40 border border-cyan-800/40 px-2 py-0.5 rounded-md transition-colors"
                title="Reconectar socket"
              >
                <RefreshCw className="w-3 h-3" />
                <span>Reintentar Enlace</span>
              </button>
            </div>

            {/* Connection Status Badge & Details */}
            <div className={`p-2.5 rounded-lg border flex items-center justify-between ${
              diagnostics.status === 'connected'
                ? 'bg-emerald-950/30 border-emerald-500/40 text-emerald-300'
                : diagnostics.status === 'connecting'
                ? 'bg-cyan-950/30 border-cyan-500/40 text-cyan-300'
                : 'bg-amber-950/30 border-amber-500/40 text-amber-300'
            }`}>
              <div className="flex items-center gap-2">
                {diagnostics.status === 'connected' ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : diagnostics.status === 'connecting' ? (
                  <RefreshCw className="w-4 h-4 text-cyan-400 shrink-0 animate-spin" />
                ) : (
                  <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
                )}
                <div>
                  <div className="font-bold text-xs">
                    {diagnostics.status === 'connected'
                      ? 'Conectado a Red LAN en Tiempo Real'
                      : diagnostics.status === 'connecting'
                      ? 'Conectando al Servidor...'
                      : 'Modo Offline / Respaldo QR Activo'}
                  </div>
                  <div className="text-[10px] text-slate-400 font-mono mt-0.5 truncate max-w-sm">
                    Servidor: <span className="text-white">{diagnostics.activeUrl || 'Auto-detectando'}</span>
                    {diagnostics.isCustomServer && <span className="ml-1 text-amber-400">(Manual)</span>}
                  </div>
                </div>
              </div>
              <div className="text-right">
                <span className="font-mono text-xs font-bold block">{diagnostics.connectedCount}</span>
                <span className="text-[9px] uppercase tracking-wider text-slate-400 block">Conectados</span>
              </div>
            </div>

            {/* Error banner if lastError exists */}
            {diagnostics.lastError && diagnostics.status === 'offline' && (
              <div className="p-2.5 bg-red-950/40 border border-red-500/40 rounded-lg text-red-200 flex items-start gap-2">
                <AlertTriangle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                <div className="space-y-1 text-[11px]">
                  <p className="font-bold text-red-300">No se pudo conectar al servidor LAN</p>
                  <p className="text-[10px] text-slate-300">Detalle: {diagnostics.lastError}</p>
                  <ul className="list-disc list-inside text-[10px] text-slate-400 space-y-0.5">
                    <li>Verifica que ambas laptops estén en la misma red Wi-Fi o zona portátil.</li>
                    <li>Verifica la IP del PC central (debe ser accesible en el puerto 5173 o 3001).</li>
                    <li>Si la red Wi-Fi tiene aislamiento de clientes (AP Isolation), usa la zona Wi-Fi del teléfono.</li>
                  </ul>
                </div>
              </div>
            )}

            {/* Custom Server URL input */}
            <div className="space-y-1.5">
              <label className="text-[10px] uppercase font-mono text-slate-400 font-bold block">
                Dirección IP / Servidor del PC Central (Proyector):
              </label>
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="ej: 192.168.1.50 o 192.168.1.50:5173"
                  value={customIpInput}
                  onChange={(e) => setCustomIpInput(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleConnectCustomIp()}
                  className="flex-1 bg-black/60 border border-oled-border rounded-lg px-3 py-1.5 text-xs text-white placeholder-slate-500 font-mono focus:outline-none focus:border-cyan-400"
                />
                <button
                  onClick={handleConnectCustomIp}
                  className="px-3 py-1.5 bg-cyan-500 hover:bg-cyan-400 text-black font-bold rounded-lg transition-colors shrink-0"
                >
                  Conectar
                </button>
                {diagnostics.isCustomServer && (
                  <button
                    onClick={handleResetToAuto}
                    className="px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg transition-colors shrink-0 text-[10px] font-mono"
                    title="Restaurar a auto-detección del origen"
                  >
                    Auto
                  </button>
                )}
              </div>
              {isSavedNotice && (
                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                  <Check className="w-3 h-3" /> Configuración de red actualizada
                </span>
              )}
            </div>

            {/* Detected IPs Quick Selector */}
            {diagnostics.detectedIps.length > 0 && (
              <div className="pt-2 border-t border-oled-border/60">
                <span className="text-[10px] uppercase font-mono text-slate-400 block mb-1.5">
                  IPs detectadas en el Servidor (haz clic para conectar):
                </span>
                <div className="flex flex-wrap gap-1.5">
                  {diagnostics.detectedIps.map((ip) => (
                    <button
                      key={ip}
                      type="button"
                      onClick={() => handleQuickConnect(ip)}
                      className="px-2 py-1 bg-cyan-950/40 hover:bg-cyan-900/60 border border-cyan-800/60 text-cyan-300 rounded-md text-[10px] font-mono transition-colors"
                    >
                      {ip}:5173
                    </button>
                  ))}
                </div>
              </div>
            )}
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
