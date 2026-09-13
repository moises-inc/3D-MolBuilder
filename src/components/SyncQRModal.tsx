import React, { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { 
  QrCode, 
  X, 
  Copy, 
  Check, 
  ShieldCheck, 
  Sparkles, 
  AlertCircle, 
  Trophy, 
  ArrowRight,
  WifiOff
} from 'lucide-react';
import { TeamScore } from '../types/game';
import { MOLECULES_DATASET } from '../data/moleculesDataset';

export interface SyncQRData {
  teamId: string;
  teamName: string;
  moleculeId: string;
  moleculeName: string;
  scoreEarned: number;
  timeBonus?: number;
  triviaBonus?: number;
  shortCode: string;
  timestamp: number;
}

interface SyncQRModalProps {
  isOpen: boolean;
  onClose: () => void;
  mode: 'show' | 'redeem';
  data?: SyncQRData | null;
  teams?: TeamScore[];
  onRedeemCode?: (payload: { teamId: string; score: number; moleculeId: string; code: string }) => void;
}

export const SyncQRModal: React.FC<SyncQRModalProps> = ({
  isOpen,
  onClose,
  mode,
  data,
  teams = [],
  onRedeemCode,
}) => {
  const [copied, setCopied] = useState(false);
  const [inputCode, setInputCode] = useState('');
  const [selectedTeamId, setSelectedTeamId] = useState(teams[0]?.id || 'team-alfa');
  const [selectedMoleculeId, setSelectedMoleculeId] = useState(MOLECULES_DATASET[0].id);
  const [inputScore, setInputScore] = useState<number>(500);
  const [redeemSuccess, setRedeemSuccess] = useState(false);
  const [redeemError, setRedeemError] = useState<string | null>(null);

  if (!isOpen) return null;

  // Formato del payload JSON para el QR dinámico
  const qrString = data
    ? JSON.stringify({
        v: 'vcm-1',
        t: data.teamId,
        s: data.scoreEarned,
        m: data.moleculeId,
        c: data.shortCode,
        ts: data.timestamp,
      })
    : '';

  const handleCopyCode = () => {
    if (!data?.shortCode) return;
    navigator.clipboard.writeText(data.shortCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleParseAndRedeem = (e: React.FormEvent) => {
    e.preventDefault();
    setRedeemError(null);

    const trimmed = inputCode.trim();
    if (!trimmed) {
      setRedeemError('Por favor, ingresa un código de 6 caracteres o pega el contenido del QR.');
      return;
    }

    // 1. Intentar parsear como JSON de QR
    if (trimmed.startsWith('{') && trimmed.endsWith('}')) {
      try {
        const parsed = JSON.parse(trimmed);
        if (parsed.t && parsed.s) {
          if (onRedeemCode) {
            onRedeemCode({
              teamId: parsed.t,
              score: Number(parsed.s),
              moleculeId: parsed.m || 'ronda',
              code: parsed.c || 'QR-SYNC',
            });
          }
          setRedeemSuccess(true);
          setTimeout(() => {
            setRedeemSuccess(false);
            onClose();
          }, 1500);
          return;
        }
      } catch {
        // Continuar con parseo alfanumérico
      }
    }

    // 2. Parsear formato corto alfanumérico (ej: "ALFA-850", "BET-600", "GAM-1000")
    const match = trimmed.match(/^([A-Za-z0-9]+)[-_]?(\d+)$/i);
    if (match) {
      const prefix = match[1].toLowerCase();
      const points = parseInt(match[2], 10);

      // Mapear prefijo al equipo
      let targetTeam = teams.find((t) =>
        t.id.toLowerCase().includes(prefix) || t.name.toLowerCase().includes(prefix)
      );
      if (!targetTeam) targetTeam = teams.find((t) => t.id === selectedTeamId) || teams[0];

      if (onRedeemCode && targetTeam) {
        onRedeemCode({
          teamId: targetTeam.id,
          score: points,
          moleculeId: selectedMoleculeId,
          code: trimmed.toUpperCase(),
        });
      }
      setRedeemSuccess(true);
      setTimeout(() => {
        setRedeemSuccess(false);
        onClose();
      }, 1500);
      return;
    }

    // 3. Si solo ingresó un puntaje numérico directo
    const numOnly = parseInt(trimmed, 10);
    if (!isNaN(numOnly) && numOnly > 0) {
      if (onRedeemCode) {
        onRedeemCode({
          teamId: selectedTeamId,
          score: numOnly,
          moleculeId: selectedMoleculeId,
          code: `MAN-${numOnly}`,
        });
      }
      setRedeemSuccess(true);
      setTimeout(() => {
        setRedeemSuccess(false);
        onClose();
      }, 1500);
      return;
    }

    setRedeemError('Código no reconocido. Usa el formato TEAM-PUNTOS (ej. ALFA-850) o un número.');
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="w-full max-w-md bg-oled-card border border-oled-border rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-oled-border bg-gradient-to-r from-oled-panel to-oled-card flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 rounded-lg bg-cyan-950/40 border border-cyan-800/40 text-pide-cyan">
              <QrCode className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-sm font-bold text-white tracking-wide">
                {mode === 'show' ? 'Código de Mesa & Respaldo QR' : 'Ingresar Código de Mesa'}
              </h3>
              <p className="text-[11px] text-slate-400 font-mono">
                {mode === 'show' ? 'Modo de Respaldo sin Conexión (Offline)' : 'Acreditación Manual al Marcador'}
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Content */}
        <div className="p-5 flex-1 space-y-4">
          {mode === 'show' && data ? (
            <div className="flex flex-col items-center text-center space-y-4">
              {/* QR Container */}
              <div className="p-3.5 bg-white rounded-xl shadow-lg border border-slate-300 flex items-center justify-center">
                <QRCodeSVG
                  value={qrString}
                  size={190}
                  level="M"
                  includeMargin={false}
                />
              </div>

              {/* Short 6-char Code Badge */}
              <div className="w-full bg-oled-panel p-3 rounded-xl border border-oled-border">
                <span className="text-[10px] uppercase font-mono text-slate-400 font-bold block mb-1">
                  Código Corto de Validación:
                </span>
                <div className="flex items-center justify-center gap-2">
                  <span className="text-2xl font-mono font-extrabold text-uss-goldBright tracking-widest bg-black/60 px-4 py-1.5 rounded-lg border border-uss-gold/40">
                    {data.shortCode}
                  </span>
                  <button
                    onClick={handleCopyCode}
                    className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Copiar código"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Summary info */}
              <div className="w-full bg-black/40 p-3 rounded-lg border border-oled-border text-left text-xs space-y-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Equipo:</span>
                  <span className="text-white font-semibold">{data.teamName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Compuesto:</span>
                  <span className="text-pide-cyan font-mono font-semibold">{data.moleculeName}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Puntaje Total Obtenido:</span>
                  <span className="text-emerald-400 font-mono font-bold">+{data.scoreEarned} pts</span>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[11px] text-slate-400 bg-amber-950/20 border border-amber-900/30 p-2.5 rounded-lg">
                <WifiOff className="w-4 h-4 text-amber-400 shrink-0" />
                <span>
                  Si no hay conexión Wi-Fi, muestra esta pantalla al monitor del proyector para acreditar tus puntos.
                </span>
              </div>
            </div>
          ) : (
            /* Mode Redeem */
            <form onSubmit={handleParseAndRedeem} className="space-y-4">
              <div className="p-3 bg-cyan-950/20 border border-cyan-800/30 rounded-lg text-xs text-slate-300 leading-relaxed">
                Digita el <strong>código corto</strong> de la mesa (ej. <code className="text-pide-cyan font-mono font-bold">ALFA-850</code>, <code className="text-pide-cyan font-mono font-bold">BETA-720</code>) o pega el texto escaneado del código QR para cargar los puntos al proyector.
              </div>

              <div className="space-y-1.5">
                <label className="text-xs font-semibold text-slate-300 block">
                  Código de Mesa o QR:
                </label>
                <input
                  type="text"
                  value={inputCode}
                  onChange={(e) => setInputCode(e.target.value)}
                  placeholder="Ej: ALFA-850 o {json...}"
                  className="w-full px-3.5 py-2.5 bg-black/60 border border-oled-border focus:border-pide-cyan rounded-lg text-white font-mono text-sm tracking-wider uppercase focus:outline-none"
                  autoFocus
                />
              </div>

              {/* Fallback selectors in case code is just numeric */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="text-slate-400 block mb-1">Equipo Destino:</label>
                  <select
                    value={selectedTeamId}
                    onChange={(e) => setSelectedTeamId(e.target.value)}
                    className="w-full p-2 bg-oled-panel border border-oled-border rounded-lg text-white font-semibold focus:outline-none"
                  >
                    {teams.map((t) => (
                      <option key={t.id} value={t.id}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="text-slate-400 block mb-1">Compuesto:</label>
                  <select
                    value={selectedMoleculeId}
                    onChange={(e) => setSelectedMoleculeId(e.target.value)}
                    className="w-full p-2 bg-oled-panel border border-oled-border rounded-lg text-white font-semibold focus:outline-none"
                  >
                    {MOLECULES_DATASET.map((m) => (
                      <option key={m.id} value={m.id}>
                        {m.name} ({m.formula})
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {redeemError && (
                <div className="p-2.5 bg-red-950/40 border border-red-500/40 rounded-lg flex items-center gap-2 text-red-200 text-xs animate-shake">
                  <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
                  <span>{redeemError}</span>
                </div>
              )}

              {redeemSuccess && (
                <div className="p-2.5 bg-emerald-950/40 border border-emerald-500/40 rounded-lg flex items-center gap-2 text-emerald-200 text-xs animate-fade-in">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>¡Puntaje acreditado exitosamente al marcador central!</span>
                </div>
              )}

              <button
                type="submit"
                className="w-full py-2.5 px-4 bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-extrabold text-xs uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
              >
                <span>Acreditar Puntos al Marcador</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="p-3 border-t border-oled-border bg-oled-panel flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs rounded-lg transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
};
