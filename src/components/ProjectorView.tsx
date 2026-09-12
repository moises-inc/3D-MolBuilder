import React, { useState, useEffect } from 'react';
import { 
  Trophy, 
  Crown, 
  Award, 
  Sparkles, 
  Activity, 
  QrCode, 
  Monitor, 
  Wifi, 
  WifiOff, 
  CheckCircle2, 
  Users,
  Flame,
  ChevronRight,
  Maximize2,
  Settings,
  Globe,
  Copy,
  Check
} from 'lucide-react';
import { TeamScore } from '../types/game';
import { MOLECULES_DATASET } from '../data/moleculesDataset';
import { ActivityEvent, ConnectionStatus, NetworkDiagnostics, socketSync } from '../utils/socketSync';
import { ShaderBackground } from './ShaderBackground';

interface ProjectorViewProps {
  teams: TeamScore[];
  syncStatus: ConnectionStatus;
  connectedCount: number;
  recentEvents: ActivityEvent[];
  onOpenRedeemModal: () => void;
  onSwitchToStation: () => void;
  onOpenSettings: () => void;
}

export const ProjectorView: React.FC<ProjectorViewProps> = ({
  teams,
  syncStatus,
  connectedCount,
  recentEvents,
  onOpenRedeemModal,
  onSwitchToStation,
  onOpenSettings,
}) => {
  const [diagnostics, setDiagnostics] = useState<NetworkDiagnostics>(() => socketSync.getDiagnostics());
  const [copiedUrl, setCopiedUrl] = useState(false);

  useEffect(() => {
    const unsub = socketSync.onDiagnosticsChange((diag) => {
      setDiagnostics(diag);
    });
    return unsub;
  }, []);
  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  const leaderTeam = sortedTeams[0];
  const totalMolecules = MOLECULES_DATASET.length;

  const totalPointsAwarded = teams.reduce((acc, t) => acc + t.score, 0);
  const totalCompletions = teams.reduce((acc, t) => acc + t.completedMolecules.length, 0);

  const primaryHostIp = diagnostics.detectedIps.length > 0 
    ? diagnostics.detectedIps[0] 
    : (typeof window !== 'undefined' && window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1')
    ? window.location.hostname
    : 'IP-DE-ESTE-PC';
  const activePort = typeof window !== 'undefined' && window.location.port ? window.location.port : '5174';
  const stationConnectUrl = `http://${primaryHostIp}:${activePort}`;

  const handleCopyStationUrl = () => {
    if (typeof navigator !== 'undefined') {
      navigator.clipboard.writeText(stationConnectUrl);
      setCopiedUrl(true);
      setTimeout(() => setCopiedUrl(false), 2000);
    }
  };

  const getRankBadge = (index: number) => {
    switch (index) {
      case 0:
        return (
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-300 via-amber-400 to-amber-600 text-black font-extrabold flex items-center justify-center shadow-[0_0_20px_rgba(251,191,36,0.6)]">
            <Crown className="w-5 h-5 fill-black" />
          </div>
        );
      case 1:
        return (
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-slate-200 via-slate-300 to-slate-400 text-black font-extrabold flex items-center justify-center shadow-[0_0_15px_rgba(226,232,240,0.5)]">
            <Trophy className="w-5 h-5 fill-black" />
          </div>
        );
      case 2:
        return (
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-amber-700 via-amber-800 to-amber-950 text-amber-200 font-extrabold flex items-center justify-center shadow-[0_0_15px_rgba(180,83,9,0.4)]">
            <Award className="w-5 h-5" />
          </div>
        );
      default:
        return (
          <div className="w-9 h-9 rounded-xl bg-slate-800 border border-slate-700 text-slate-300 font-mono font-bold flex items-center justify-center">
            0{index + 1}
          </div>
        );
    }
  };

  return (
    <div className="relative min-h-screen bg-oled text-slate-100 flex flex-col selection:bg-orange-500 selection:text-black">
      <ShaderBackground />
      {/* Projector Top Master Bar */}
      <header className="w-full bg-black/90 backdrop-blur-md border-b border-oled-border sticky top-0 z-30 px-6 py-3">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Brand */}
          <div className="flex items-center gap-3.5">
            <img 
              src="/assets/uss_shield.png" 
              alt="Universidad San Sebastián" 
              className="h-10 w-auto object-contain drop-shadow-[0_0_10px_rgba(212,175,55,0.45)] drop-shadow-[0_2px_8px_rgba(0,32,91,0.7)]"
            />
            <div>
              <div className="flex items-center gap-2">
                <span className="font-mono text-lg font-extrabold text-orange-400 tracking-wider">
                  3D MolBuilder
                </span>
                <span className="text-[10px] px-2 py-0.5 bg-orange-950/60 text-orange-300 font-mono font-bold rounded-full border border-orange-500/50 uppercase">
                  Marcador Central
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono">Feria Escolar de Vinculación con el Medio USS</p>
            </div>
          </div>

          {/* Center: Live LAN Indicator Badge (Clic para abrir configuración de red) */}
          <button 
            type="button"
            onClick={onOpenSettings}
            className="flex items-center gap-3 bg-oled-panel px-4 py-2 rounded-xl border border-oled-border hover:border-slate-500 transition-colors text-left"
            title="Clic para ver detalles de red y configurar IP"
          >
            <div className="flex items-center gap-2">
              <span 
                className={`w-2.5 h-2.5 rounded-full ${
                  syncStatus === 'connected' 
                    ? 'bg-emerald-400 shadow-[0_0_10px_#38ef7d] animate-pulse' 
                    : syncStatus === 'connecting'
                    ? 'bg-cyan-400 shadow-[0_0_10px_#5de1e5] animate-ping'
                    : 'bg-amber-400 shadow-[0_0_10px_#efb65f]'
                }`} 
              />
              <span className="text-xs font-mono font-bold">
                {syncStatus === 'connected' ? 'Red LAN en Vivo' : syncStatus === 'connecting' ? 'Conectando...' : 'Modo Local / QR'}
              </span>
            </div>

            <div className="h-4 w-px bg-oled-border" />

            <div className="flex items-center gap-1.5 text-xs text-slate-400 font-mono">
              <Users className="w-3.5 h-3.5 text-slate-400" />
              <span>{connectedCount} {connectedCount === 1 ? 'dispositivo' : 'dispositivos'}</span>
            </div>
          </button>

          {/* Right Action Controls */}
          <div className="flex items-center gap-2.5">
            {/* Enter Mesa Code (Fallback) */}
            <button
              onClick={onOpenRedeemModal}
              className="px-3.5 py-2 bg-uss-blue/60 hover:bg-uss-blue/90 border border-uss-gold/50 text-uss-goldBright font-bold text-xs rounded-xl flex items-center gap-2 transition-all shadow-md shadow-uss-gold/10"
              title="Ingresar código de mesa o escanear QR"
            >
              <QrCode className="w-4 h-4" />
              <span>Ingresar Código de Mesa</span>
            </button>

            {/* Switch to Station View */}
            <button
              onClick={onSwitchToStation}
              className="px-3.5 py-2 bg-oled-panel hover:bg-slate-800 border border-oled-border text-slate-300 hover:text-white font-semibold text-xs rounded-xl flex items-center gap-2 transition-colors"
              title="Volver a la vista de Estación de Mesa 3D"
            >
              <Monitor className="w-4 h-4 text-pide-cyan" />
              <span>Modo Estación</span>
            </button>

            {/* Settings Button */}
            <button
              onClick={onOpenSettings}
              className="p-2 bg-oled-panel hover:bg-slate-800 border border-oled-border text-slate-300 hover:text-white rounded-xl transition-colors"
              title="Configuración de Red y Torneo"
            >
              <Settings className="w-4 h-4" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Projector Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* LAN Connection Guidance Banner for Mesas */}
        <div className="lg:col-span-12 p-3.5 bg-zinc-950/80 border border-orange-500/30 rounded-2xl flex flex-col sm:flex-row items-center justify-between gap-3 shadow-lg shadow-orange-500/5">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-orange-950/50 border border-orange-500/40 text-orange-400 shrink-0">
              <Globe className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase text-slate-300 font-bold block">
                Conexión Wi-Fi para Laptops y Tablets de Mesas Escolares:
              </span>
              <p className="text-xs text-slate-300 mt-0.5">
                En cualquier navegador de la misma red Wi-Fi ingresa a:{' '}
                <span className="font-mono font-extrabold text-orange-400 bg-black/80 px-2.5 py-1 rounded-lg border border-orange-500/50 text-sm inline-block ml-1">
                  {stationConnectUrl}
                </span>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={handleCopyStationUrl}
              className="px-3 py-1.5 bg-orange-500/20 hover:bg-orange-500/30 border border-orange-500/40 text-orange-300 text-xs font-mono rounded-lg flex items-center gap-1.5 transition-colors"
              title="Copiar URL para mesas"
            >
              {copiedUrl ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedUrl ? '¡Copiado!' : 'Copiar URL'}</span>
            </button>
            <button
              onClick={onOpenSettings}
              className="px-3 py-1.5 bg-zinc-800 hover:bg-zinc-700 border border-zinc-700 text-slate-300 text-xs font-mono rounded-lg transition-colors"
            >
              Ajustes de Red
            </button>
          </div>
        </div>
        {/* Metric Highlights Strip (Top row across lg:col-span-12) */}
        <div className="lg:col-span-12 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-oled-card p-4 rounded-2xl border border-oled-border flex items-center gap-3">
            <div className="p-3 rounded-xl bg-orange-950/40 border border-orange-500/40 text-orange-400">
              <Trophy className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase text-slate-400 block">Puntos Acumulados</span>
              <span className="text-2xl font-mono font-extrabold text-white">{totalPointsAwarded.toLocaleString()}</span>
            </div>
          </div>

          <div className="bg-oled-card p-4 rounded-2xl border border-oled-border flex items-center gap-3">
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-800/40 text-emerald-400">
              <CheckCircle2 className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase text-slate-400 block">Moléculas Validadas</span>
              <span className="text-2xl font-mono font-extrabold text-white">{totalCompletions}</span>
            </div>
          </div>

          <div className="bg-oled-card p-4 rounded-2xl border border-oled-border flex items-center gap-3">
            <div className="p-3 rounded-xl bg-amber-950/40 border border-amber-800/40 text-uss-goldBright">
              <Crown className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase text-slate-400 block">Líder del Torneo</span>
              <span className="text-lg font-bold text-white truncate max-w-[140px] block">
                {leaderTeam?.name.split('—')[0] || 'En Espera'}
              </span>
            </div>
          </div>

          <div className="bg-oled-card p-4 rounded-2xl border border-oled-border flex items-center gap-3">
            <div className="p-3 rounded-xl bg-purple-950/40 border border-purple-800/40 text-purple-400">
              <Flame className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[11px] font-mono uppercase text-slate-400 block">Total Rondas</span>
              <span className="text-2xl font-mono font-extrabold text-white">{totalMolecules}</span>
            </div>
          </div>
        </div>

        {/* Left / Center: Giant Teams Ranking Leaderboard (8 cols on lg) */}
        <section className="lg:col-span-8 flex flex-col gap-4">
          <div className="bg-oled-card rounded-2xl border border-oled-border p-6 shadow-2xl flex-1">
            <div className="flex items-center justify-between mb-5">
              <div className="flex items-center gap-2.5">
                <Trophy className="w-5 h-5 text-uss-goldBright" />
                <h2 className="text-lg font-bold text-white tracking-wide">Clasificación en Tiempo Real</h2>
              </div>
              <span className="text-xs font-mono text-slate-400">
                Actualización instantánea por LAN
              </span>
            </div>

            {/* Teams Rows */}
            <div className="space-y-4">
              {sortedTeams.map((team, idx) => {
                const isLeader = idx === 0;
                const progressPct = Math.min(100, Math.round((team.completedMolecules.length / totalMolecules) * 100));

                return (
                  <div
                    key={team.id}
                    className={`p-4 rounded-xl border transition-all ${
                      isLeader
                        ? 'bg-gradient-to-r from-uss-blue/30 via-oled-panel to-oled-card border-uss-gold/60 shadow-[0_0_25px_rgba(212,175,55,0.2)]'
                        : 'bg-oled-panel border-oled-border'
                    }`}
                  >
                    <div className="flex items-center justify-between gap-4">
                      {/* Rank & Name */}
                      <div className="flex items-center gap-3.5">
                        {getRankBadge(idx)}
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="text-base font-bold text-white tracking-tight">
                              {team.name}
                            </h3>
                            {isLeader && (
                              <span className="text-[10px] px-2 py-0.5 bg-uss-gold/20 text-uss-goldBright font-mono font-bold rounded-full border border-uss-gold/40">
                                1° LUGAR
                              </span>
                            )}
                          </div>
                          <span className="text-xs text-slate-400 font-mono">
                            {team.completedMolecules.length} de {totalMolecules} moléculas resueltas
                          </span>
                        </div>
                      </div>

                      {/* Score Counter */}
                      <div className="text-right">
                        <span className="text-3xl font-mono font-extrabold text-uss-goldBright tracking-wider block">
                          {team.score.toLocaleString()}
                        </span>
                        <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">
                          Puntos
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3.5">
                      <div className="w-full h-2.5 bg-black/60 rounded-full overflow-hidden border border-slate-800">
                        <div
                          className="h-full rounded-full transition-all duration-500"
                          style={{
                            width: `${progressPct}%`,
                            backgroundColor: team.color || '#5de1e5',
                            boxShadow: `0 0 12px ${team.color || '#5de1e5'}80`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Completed Molecule Badges */}
                    {team.completedMolecules.length > 0 && (
                      <div className="mt-3 flex flex-wrap items-center gap-1.5">
                        {team.completedMolecules.map((molId) => {
                          const mol = MOLECULES_DATASET.find((m) => m.id === molId);
                          if (!mol) return null;
                          return (
                            <span
                              key={molId}
                              className="px-2 py-0.5 bg-black/60 border border-oled-border rounded text-[11px] font-mono text-slate-300 flex items-center gap-1"
                            >
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                              <span>{mol.name}</span>
                              <span className="text-slate-500 font-bold">({mol.formula})</span>
                            </span>
                          );
                        })}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Right: Live Activity Ticker & Fallback QR helper (4 cols on lg) */}
        <section className="lg:col-span-4 flex flex-col gap-4">
          {/* Live Activity Ticker */}
          <div className="bg-oled-card rounded-2xl border border-oled-border p-5 shadow-2xl flex-1 flex flex-col">
            <div className="flex items-center justify-between mb-3 border-b border-oled-border pb-3">
              <div className="flex items-center gap-2">
                <Activity className="w-4 h-4 text-pide-cyan animate-pulse" />
                <h3 className="text-sm font-bold text-white tracking-wide">Bitácora de Ronda en Vivo</h3>
              </div>
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
            </div>

            {/* Events List */}
            <div className="flex-1 overflow-y-auto space-y-2.5 max-h-[420px] text-xs">
              {recentEvents.length === 0 ? (
                <div className="text-center py-10 text-slate-500">
                  <Activity className="w-8 h-8 mx-auto mb-2 opacity-40" />
                  <p>Esperando primeras validaciones de las mesas...</p>
                </div>
              ) : (
                recentEvents.map((ev) => (
                  <div
                    key={ev.id}
                    className="p-3 bg-oled-panel border border-oled-border rounded-xl space-y-1 animate-fade-in"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-white">{ev.teamName}</span>
                      <span className="font-mono text-[10px] text-slate-500">{ev.timestamp}</span>
                    </div>
                    <p className="text-slate-300 font-mono text-[11px]">{ev.text}</p>
                  </div>
                ))
              )}
            </div>
          </div>

          {/* Quick instructions box */}
          <div className="bg-oled-panel p-4 rounded-2xl border border-oled-border text-xs space-y-2">
            <div className="flex items-center gap-2 text-pide-cyan font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Instrucciones para Monitores de Auditorio</span>
            </div>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              • Cada mesa con su notebook o tablet acumula puntos automáticamente por la red Wi-Fi/LAN local.
            </p>
            <p className="text-slate-400 text-[11px] leading-relaxed">
              • Si una mesa no tiene señal, haz clic en <strong>"Ingresar Código de Mesa"</strong> arriba para ingresar el código alfanumérico generado en la pantalla del equipo.
            </p>
          </div>
        </section>
      </main>
    </div>
  );
};
