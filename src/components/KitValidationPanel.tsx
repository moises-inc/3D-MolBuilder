import React, { useState } from 'react';
import { 
  CheckCircle2, 
  AlertCircle, 
  Box, 
  CheckSquare, 
  Square, 
  Sparkles, 
  HelpCircle, 
  Send,
  RotateCcw,
  Zap
} from 'lucide-react';
import { ElementSymbol, MoleculeData } from '../types/chemistry';
import { CPK_COLORS } from '../data/moleculesDataset';

interface KitValidationPanelProps {
  molecule: MoleculeData;
  timeLeft: number;
  onValidateSuccess: (scoreEarned: number, timeBonus: number) => void;
  disabled?: boolean;
  isAlreadyCompleted?: boolean;
}

export const KitValidationPanel: React.FC<KitValidationPanelProps> = ({
  molecule,
  timeLeft,
  onValidateSuccess,
  disabled = false,
  isAlreadyCompleted = false,
}) => {
  // Checklist items tracked by student team / monitor
  const [checkedItems, setCheckedItems] = useState<{
    spheresVerified: boolean;
    connectorsVerified: boolean;
    geometryVerified: boolean;
    noDanglingBonds: boolean;
  }>({
    spheresVerified: false,
    connectorsVerified: false,
    geometryVerified: false,
    noDanglingBonds: false,
  });

  const [validationError, setValidationError] = useState<string | null>(null);
  const [successAnimation, setSuccessAnimation] = useState<boolean>(false);

  // Reset checklist and error whenever active molecule changes
  React.useEffect(() => {
    setCheckedItems({
      spheresVerified: false,
      connectorsVerified: false,
      geometryVerified: false,
      noDanglingBonds: false,
    });
    setValidationError(null);
  }, [molecule.id]);

  const toggleCheck = (key: keyof typeof checkedItems) => {
    if (disabled) return;
    setCheckedItems((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
    setValidationError(null);
  };

  const handleResetChecklist = () => {
    setCheckedItems({
      spheresVerified: false,
      connectorsVerified: false,
      geometryVerified: false,
      noDanglingBonds: false,
    });
    setValidationError(null);
  };

  // Rescaled base points: Fácil = 100, Intermedio = 125, Avanzado = 150
  const basePoints = 
    molecule.difficultyLevel === 'facil' ? 100 : 
    molecule.difficultyLevel === 'intermedio' ? 125 : 150;

  // Each verified item grants 25% of the round's base score
  const checkedCount = [
    checkedItems.spheresVerified,
    checkedItems.connectorsVerified,
    checkedItems.geometryVerified,
    checkedItems.noDanglingBonds,
  ].filter(Boolean).length;

  const pointsPerItem = Math.round(basePoints * 0.25);
  const partialBaseScore = Math.round((checkedCount / 4) * basePoints);

  // Speed bonus: +1 to +25 based on remaining time
  const rawSpeedBonus = timeLeft > 0
    ? Math.max(1, Math.min(25, Math.round((timeLeft / molecule.timeLimitSeconds) * 25)))
    : 0;

  const effectiveSpeedBonus = checkedCount === 4
    ? rawSpeedBonus
    : Math.round(rawSpeedBonus * (checkedCount / 4));

  const currentTotalPotential = partialBaseScore + effectiveSpeedBonus;

  const handleValidate = () => {
    if (disabled) return;

    if (checkedCount === 0) {
      setValidationError('¡Debes verificar al menos 1 condición del kit físico antes de validar!');
      return;
    }

    setSuccessAnimation(true);
    setTimeout(() => {
      onValidateSuccess(currentTotalPotential, effectiveSpeedBonus);
      setSuccessAnimation(false);
    }, 500);
  };

  // Element CPK badge info
  const elementLabels: Record<ElementSymbol, { name: string; textColor: string }> = {
    C: { name: 'Carbono (Negro)', textColor: 'text-slate-300' },
    H: { name: 'Hidrógeno (Blanco)', textColor: 'text-white' },
    O: { name: 'Oxígeno (Rojo)', textColor: 'text-red-400' },
    N: { name: 'Nitrógeno (Azul)', textColor: 'text-blue-400' },
    Cl: { name: 'Cloro (Verde)', textColor: 'text-emerald-400' },
    S: { name: 'Azufre (Amarillo)', textColor: 'text-amber-400' },
  };

  return (
    <div className="flex flex-col flex-1 min-h-[380px] h-full bg-oled-card rounded-xl border border-oled-border overflow-hidden">
      {/* Panel Header */}
      <div className="p-3.5 border-b border-oled-border bg-gradient-to-r from-oled-panel to-oled-card flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Box className="w-4 h-4 text-uss-goldBright" />
          <h3 className="text-sm font-bold text-white tracking-tight">Kit Físico & Validación</h3>
        </div>
        <button
          onClick={handleResetChecklist}
          className="text-slate-400 hover:text-white p-1 rounded transition-colors text-[11px] flex items-center gap-1"
          title="Reiniciar lista de verificación"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Limpiar</span>
        </button>
      </div>

      {/* Content */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-xs">
        {/* Already completed badge */}
        {isAlreadyCompleted && (
          <div className="p-3 bg-emerald-950/40 border border-emerald-500/50 rounded-lg flex items-center justify-between text-emerald-200 animate-fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span className="font-semibold text-xs">Molécula ya validada por este equipo</span>
            </div>
            <span className="text-[10px] font-mono uppercase bg-emerald-900/60 px-2 py-0.5 rounded text-emerald-300 border border-emerald-700/50 font-bold">
              Completada
            </span>
          </div>
        )}

        {/* Required Spheres & Connectors Card */}
        <div className="bg-oled-panel p-3.5 rounded-lg border border-oled-border space-y-3">
          <div className="text-[11px] uppercase font-mono font-bold text-pide-cyan flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Piezas Requeridas en la Mesa:</span>
          </div>

          {/* Spheres list */}
          <div className="grid grid-cols-2 gap-2">
            {Object.entries(molecule.kitFisico.esferas).map(([elem, count]) => {
              const symbol = elem as ElementSymbol;
              const color = CPK_COLORS[symbol] || '#888888';
              const labelInfo = elementLabels[symbol] || { name: elem, textColor: 'text-white' };

              return (
                <div 
                  key={elem}
                  className="flex items-center justify-between p-2 rounded bg-black/60 border border-oled-border/80"
                >
                  <div className="flex items-center gap-2">
                    <span 
                      className="w-3.5 h-3.5 rounded-full border border-white/40 shadow-sm"
                      style={{ backgroundColor: color }}
                    />
                    <span className={`text-xs font-semibold ${labelInfo.textColor}`}>
                      {labelInfo.name}
                    </span>
                  </div>
                  <span className="font-mono font-bold text-xs bg-slate-800 px-2 py-0.5 rounded text-white border border-slate-700">
                    x{count}
                  </span>
                </div>
              );
            })}
          </div>

          {/* Connectors breakdown */}
          <div className="pt-2 border-t border-oled-border/60">
            <span className="text-[10px] text-slate-400 font-mono uppercase block mb-1.5">
              Conectores de Enlace:
            </span>
            <div className="flex flex-wrap gap-2">
              <span className="bg-slate-900 border border-slate-700 px-2.5 py-1 rounded text-slate-200 text-xs flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-slate-400" />
                <span>Simples (Cortos): <strong className="text-white font-mono">{molecule.kitFisico.conectores.cortosRigidos}</strong></span>
              </span>
              {molecule.kitFisico.conectores.largosFlexibles > 0 && (
                <span className="bg-amber-950/40 border border-amber-800/40 px-2.5 py-1 rounded text-amber-200 text-xs flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse" />
                  <span>Dobles (Flexibles): <strong className="text-white font-mono">{molecule.kitFisico.conectores.largosFlexibles}</strong></span>
                </span>
              )}
            </div>
          </div>

          {/* Tips Armado */}
          <div className="bg-orange-950/20 border border-orange-500/30 p-2.5 rounded text-slate-300 text-[11px] leading-relaxed">
            <strong className="text-orange-400 font-bold block mb-0.5">Tip del Monitor:</strong>
            {molecule.kitFisico.tipsArmado}
          </div>
        </div>

        {/* Real-Time Partial Score Widget */}
        <div className="bg-black/80 p-3 rounded-lg border border-orange-500/30 flex items-center justify-between shadow-sm">
          <div className="flex flex-col">
            <span className="text-[10px] uppercase font-mono text-slate-400">Puntaje parcial acumulado:</span>
            <div className="flex items-baseline gap-1.5 mt-0.5">
              <span className="text-base font-mono font-extrabold text-pide-cyan text-orange-400">
                {partialBaseScore}
              </span>
              <span className="text-xs text-slate-400 font-mono">/ {basePoints} pts base</span>
              {effectiveSpeedBonus > 0 && (
                <span className="text-xs font-mono font-bold text-amber-400 flex items-center gap-0.5 ml-1">
                  <Zap className="w-3 h-3 inline" />+{effectiveSpeedBonus} vel
                </span>
              )}
            </div>
          </div>
          <div className="text-right">
            <span className="text-[10px] font-mono text-slate-400 block">Total ronda:</span>
            <span className="text-sm font-mono font-bold text-emerald-400">
              {currentTotalPotential} pts
            </span>
          </div>
        </div>

        {/* Physical Kit Inspection Checklist */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[11px] uppercase font-mono font-bold text-slate-300 block">
              Validación de Mesa ({checkedCount}/4 ítems):
            </span>
            <span className="text-[10px] font-mono text-orange-400/90 font-bold">
              {pointsPerItem} pts c/u (25%)
            </span>
          </div>

          <div className="space-y-1.5">
            <button
              onClick={() => toggleCheck('spheresVerified')}
              className={`w-full p-2.5 rounded-lg border text-left flex items-center gap-2.5 transition-all ${
                checkedItems.spheresVerified 
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200' 
                  : 'bg-oled-panel border-orange-500/30 text-slate-300 hover:border-orange-500/60'
              }`}
            >
              {checkedItems.spheresVerified ? (
                <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Square className="w-4 h-4 text-slate-500 shrink-0" />
              )}
              <span className="flex-1">Conteo exacto de esferas CPK utilizadas</span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/60 text-orange-400 border border-orange-500/30 shrink-0">
                +{pointsPerItem} pts
              </span>
            </button>

            <button
              onClick={() => toggleCheck('connectorsVerified')}
              className={`w-full p-2.5 rounded-lg border text-left flex items-center gap-2.5 transition-all ${
                checkedItems.connectorsVerified 
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200' 
                  : 'bg-oled-panel border-orange-500/30 text-slate-300 hover:border-orange-500/60'
              }`}
            >
              {checkedItems.connectorsVerified ? (
                <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Square className="w-4 h-4 text-slate-500 shrink-0" />
              )}
              <span className="flex-1">Conectores correctos (rígidos en simples, flexibles en dobles)</span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/60 text-orange-400 border border-orange-500/30 shrink-0">
                +{pointsPerItem} pts
              </span>
            </button>

            <button
              onClick={() => toggleCheck('geometryVerified')}
              className={`w-full p-2.5 rounded-lg border text-left flex items-center gap-2.5 transition-all ${
                checkedItems.geometryVerified 
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200' 
                  : 'bg-oled-panel border-orange-500/30 text-slate-300 hover:border-orange-500/60'
              }`}
            >
              {checkedItems.geometryVerified ? (
                <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Square className="w-4 h-4 text-slate-500 shrink-0" />
              )}
              <span className="flex-1">Geometría espacial 3D coincide con el modelo digital</span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/60 text-orange-400 border border-orange-500/30 shrink-0">
                +{pointsPerItem} pts
              </span>
            </button>

            <button
              onClick={() => toggleCheck('noDanglingBonds')}
              className={`w-full p-2.5 rounded-lg border text-left flex items-center gap-2.5 transition-all ${
                checkedItems.noDanglingBonds 
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200' 
                  : 'bg-oled-panel border-orange-500/30 text-slate-300 hover:border-orange-500/60'
              }`}
            >
              {checkedItems.noDanglingBonds ? (
                <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Square className="w-4 h-4 text-slate-500 shrink-0" />
              )}
              <span className="flex-1">Sin orificios vacíos indebidos o enlaces flotantes</span>
              <span className="font-mono text-[10px] px-1.5 py-0.5 rounded bg-black/60 text-orange-400 border border-orange-500/30 shrink-0">
                +{pointsPerItem} pts
              </span>
            </button>
          </div>
        </div>

        {/* Error message */}
        {validationError && (
          <div className="p-3 bg-red-950/40 border border-red-500/40 rounded-lg flex items-start gap-2 text-red-200 animate-shake">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <p className="text-[11px] leading-tight">{validationError}</p>
          </div>
        )}
      </div>

      {/* Validate Button in Footer */}
      <div className="p-3.5 border-t border-oled-border bg-oled-panel">
        <button
          onClick={handleValidate}
          disabled={disabled}
          className={`w-full py-3 rounded-lg font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-2 transition-all shadow-lg ${
            disabled
              ? 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
              : successAnimation
              ? 'bg-emerald-400 text-black scale-[0.98]'
              : checkedCount === 4
              ? 'bg-gradient-to-r from-orange-500 via-amber-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-black font-extrabold shadow-[0_0_20px_rgba(249,115,22,0.4)]'
              : checkedCount > 0
              ? 'bg-gradient-to-r from-orange-500 to-amber-600 hover:from-orange-400 hover:to-amber-500 text-black font-bold'
              : 'bg-zinc-800 text-zinc-400 hover:text-white border border-zinc-700'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>
            {checkedCount === 4
              ? `Validar Ensamblado Completo (${currentTotalPotential} pts)`
              : checkedCount > 0
              ? `Validar Puntaje Parcial (${currentTotalPotential} pts)`
              : 'Validar Ensamblado de Ronda'}
          </span>
        </button>
      </div>
    </div>
  );
};
