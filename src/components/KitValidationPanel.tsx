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
}

export const KitValidationPanel: React.FC<KitValidationPanelProps> = ({
  molecule,
  timeLeft,
  onValidateSuccess,
  disabled = false,
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

  const handleValidate = () => {
    if (disabled) return;

    // Check if all criteria are checked
    const allChecked = 
      checkedItems.spheresVerified && 
      checkedItems.connectorsVerified && 
      checkedItems.geometryVerified && 
      checkedItems.noDanglingBonds;

    if (!allChecked) {
      setValidationError('¡Falta verificar algunos aspectos! Asegúrate de que el equipo haya revisado las 4 condiciones del kit físico.');
      return;
    }

    // Calculate score
    const basePoints = 
      molecule.difficultyLevel === 'facil' ? 500 : 
      molecule.difficultyLevel === 'intermedio' ? 800 : 1200;
    
    // Time bonus: 5 points per remaining second
    const timeBonus = Math.max(0, timeLeft * 5);
    const totalRoundScore = basePoints + timeBonus;

    setSuccessAnimation(true);
    setTimeout(() => {
      onValidateSuccess(totalRoundScore, timeBonus);
      setSuccessAnimation(false);
    }, 600);
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
          <div className="bg-cyan-950/20 border border-cyan-800/30 p-2.5 rounded text-slate-300 text-[11px] leading-relaxed">
            <strong className="text-pide-cyan font-bold block mb-0.5">Tip del Monitor:</strong>
            {molecule.kitFisico.tipsArmado}
          </div>
        </div>

        {/* Physical Kit Inspection Checklist */}
        <div className="space-y-2">
          <span className="text-[11px] uppercase font-mono font-bold text-slate-300 block">
            Validación de Mesa (Monitores USS / Capitán):
          </span>

          <div className="space-y-1.5">
            <button
              onClick={() => toggleCheck('spheresVerified')}
              className={`w-full p-2.5 rounded-lg border text-left flex items-center gap-2.5 transition-all ${
                checkedItems.spheresVerified 
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200' 
                  : 'bg-oled-panel border-oled-border text-slate-300 hover:border-slate-500'
              }`}
            >
              {checkedItems.spheresVerified ? (
                <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Square className="w-4 h-4 text-slate-500 shrink-0" />
              )}
              <span>Conteo exacto de esferas CPK utilizadas</span>
            </button>

            <button
              onClick={() => toggleCheck('connectorsVerified')}
              className={`w-full p-2.5 rounded-lg border text-left flex items-center gap-2.5 transition-all ${
                checkedItems.connectorsVerified 
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200' 
                  : 'bg-oled-panel border-oled-border text-slate-300 hover:border-slate-500'
              }`}
            >
              {checkedItems.connectorsVerified ? (
                <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Square className="w-4 h-4 text-slate-500 shrink-0" />
              )}
              <span>Conectores correctos (rígidos en simples, flexibles en dobles)</span>
            </button>

            <button
              onClick={() => toggleCheck('geometryVerified')}
              className={`w-full p-2.5 rounded-lg border text-left flex items-center gap-2.5 transition-all ${
                checkedItems.geometryVerified 
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200' 
                  : 'bg-oled-panel border-oled-border text-slate-300 hover:border-slate-500'
              }`}
            >
              {checkedItems.geometryVerified ? (
                <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Square className="w-4 h-4 text-slate-500 shrink-0" />
              )}
              <span>Geometría espacial 3D coincide con el modelo digital</span>
            </button>

            <button
              onClick={() => toggleCheck('noDanglingBonds')}
              className={`w-full p-2.5 rounded-lg border text-left flex items-center gap-2.5 transition-all ${
                checkedItems.noDanglingBonds 
                  ? 'bg-emerald-950/30 border-emerald-500/50 text-emerald-200' 
                  : 'bg-oled-panel border-oled-border text-slate-300 hover:border-slate-500'
              }`}
            >
              {checkedItems.noDanglingBonds ? (
                <CheckSquare className="w-4 h-4 text-emerald-400 shrink-0" />
              ) : (
                <Square className="w-4 h-4 text-slate-500 shrink-0" />
              )}
              <span>Sin orificios vacíos indebidos o enlaces flotantes</span>
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
              : 'bg-gradient-to-r from-cyan-400 via-cyan-500 to-blue-500 hover:from-cyan-300 hover:to-blue-400 text-black font-extrabold shadow-[0_0_20px_rgba(93,225,229,0.4)]'
          }`}
        >
          <Send className="w-4 h-4" />
          <span>Validar Ensamblado de Ronda</span>
        </button>
      </div>
    </div>
  );
};
