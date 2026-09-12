import React, { useState } from 'react';
import { 
  Sparkles, 
  Lightbulb, 
  Layers, 
  HelpCircle, 
  CheckCircle2, 
  XCircle, 
  Atom, 
  Scale, 
  Compass, 
  Zap,
  BookOpen
} from 'lucide-react';
import { MoleculeData } from '../types/chemistry';

interface MoleculeInfoCardProps {
  molecule: MoleculeData;
  onTriviaAnswered?: (isCorrect: boolean) => void;
  triviaAnswered?: boolean;
}

export const MoleculeInfoCard: React.FC<MoleculeInfoCardProps> = ({
  molecule,
  onTriviaAnswered,
  triviaAnswered = false,
}) => {
  const [activeTab, setActiveTab] = useState<'didactic' | 'trivia'>('didactic');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [triviaSubmitted, setTriviaSubmitted] = useState<boolean>(false);

  // Reset trivia local selection on molecule change
  React.useEffect(() => {
    setSelectedOption(null);
    setTriviaSubmitted(false);
  }, [molecule.id]);

  // Difficulty badge colors
  const difficultyConfig = {
    facil: { label: 'Nivel Fácil', bg: 'bg-emerald-500/20', text: 'text-emerald-300', border: 'border-emerald-500/40' },
    intermedio: { label: 'Nivel Intermedio', bg: 'bg-amber-500/20', text: 'text-amber-300', border: 'border-amber-500/40' },
    avanzado: { label: 'Nivel Avanzado', bg: 'bg-purple-500/20', text: 'text-purple-300', border: 'border-purple-500/40' },
  }[molecule.difficultyLevel];

  const handleSelectOption = (index: number) => {
    if (triviaSubmitted || triviaAnswered) return;
    setSelectedOption(index);
    setTriviaSubmitted(true);
    const isCorrect = index === molecule.trivia.respuestaCorrecta;
    if (onTriviaAnswered) {
      onTriviaAnswered(isCorrect);
    }
  };

  return (
    <div className="flex flex-col h-full bg-oled-card rounded-xl border border-oled-border overflow-hidden">
      {/* Molecule Header Info */}
      <div className="p-4 sm:p-5 border-b border-oled-border bg-gradient-to-r from-oled-panel to-oled-card">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2.5 flex-wrap">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
                {molecule.name}
              </h2>
              <span className={`px-2.5 py-1 text-xs font-bold rounded-full border ${difficultyConfig.bg} ${difficultyConfig.text} ${difficultyConfig.border}`}>
                {difficultyConfig.label}
              </span>
            </div>
            <p className="text-xs sm:text-sm text-slate-400 font-mono mt-1">
              Nombre IUPAC: <span className="text-slate-200 font-medium">{molecule.iupacName}</span>
            </p>
          </div>

          <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center border-t sm:border-t-0 border-oled-border/60 pt-2 sm:pt-0">
            <span className="text-2xl sm:text-3xl font-mono font-black text-pide-cyan tracking-wider">
              {molecule.formula}
            </span>
            <div className="flex items-center gap-1.5 text-xs font-mono text-slate-300 mt-0.5">
              <Scale className="w-3.5 h-3.5 text-slate-400" />
              <span>Masa Molar: <strong>{molecule.molarMass.toFixed(2)} g/mol</strong></span>
            </div>
          </div>
        </div>

        {/* Badges strip */}
        <div className="flex flex-wrap items-center gap-2 mt-3.5">
          <span className="px-2.5 py-1 bg-slate-800 text-slate-200 text-xs rounded border border-slate-700 font-medium">
            {molecule.classification}
          </span>
          <span className="px-2.5 py-1 bg-cyan-950/70 text-pide-cyan text-xs font-semibold rounded border border-cyan-700/50 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5" />
            <span>Geometría: {molecule.didactica.geometriaMolecular}</span>
          </span>
          <span className={`px-2.5 py-1 text-xs font-semibold rounded border flex items-center gap-1.5 ${
            molecule.didactica.polaridad === 'polar'
              ? 'bg-amber-950/50 text-amber-300 border-amber-700/50'
              : 'bg-blue-950/50 text-blue-300 border-blue-700/50'
          }`}>
            <Zap className="w-3.5 h-3.5" />
            <span>{molecule.didactica.polaridad === 'polar' ? 'Polar (μ > 0 D)' : 'Apolar (μ = 0 D)'}</span>
          </span>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="flex border-b border-oled-border bg-oled-panel text-xs sm:text-sm">
        <button
          onClick={() => setActiveTab('didactic')}
          className={`flex-1 py-3 px-4 font-bold flex items-center justify-center gap-2 border-b-2 transition-all ${
            activeTab === 'didactic'
              ? 'border-pide-cyan text-pide-cyan bg-cyan-950/25 shadow-inner'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <BookOpen className="w-4 h-4" />
          <span>Ficha Didáctica & Estructura</span>
        </button>

        <button
          onClick={() => setActiveTab('trivia')}
          className={`flex-1 py-3 px-4 font-bold flex items-center justify-center gap-2 border-b-2 transition-all relative ${
            activeTab === 'trivia'
              ? 'border-pide-amber text-pide-amber bg-amber-950/25 shadow-inner'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <HelpCircle className="w-4 h-4 text-pide-amber" />
          <span>Desafío Trivia USS (+100 pts)</span>
          {triviaAnswered && (
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          )}
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 p-4 sm:p-5 overflow-y-auto space-y-5 text-slate-200 leading-relaxed">
        {activeTab === 'didactic' && (
          <div className="space-y-5">
            {/* Fundamento Químico & Geometría RPECV */}
            <div className="bg-oled-panel p-4 rounded-xl border border-oled-border space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-pide-cyan uppercase tracking-wider">
                <Atom className="w-4 h-4" />
                <span>Estructura Química Fundamental & Modelo RPECV</span>
              </div>
              <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                {molecule.didactica.descripcionCientifica}
              </p>

              {/* RPECV & Polarity Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2">
                <div className="bg-black/60 p-3 rounded-lg border border-oled-border">
                  <span className="text-[11px] text-slate-400 uppercase font-mono block">
                    Geometría Molecular (RPECV):
                  </span>
                  <p className="text-sm sm:text-base font-bold text-white mt-1">
                    {molecule.didactica.geometriaMolecular}
                  </p>
                </div>
                <div className="bg-black/60 p-3 rounded-lg border border-oled-border">
                  <span className="text-[11px] text-slate-400 uppercase font-mono block">
                    Polaridad & Momento Dipolar:
                  </span>
                  <p className="text-sm sm:text-base font-bold text-pide-amber mt-1 capitalize">
                    {molecule.didactica.polaridad === 'polar' ? 'Molécula Polar (μ > 0 D)' : 'Molécula Apolar (μ = 0 D)'}
                  </p>
                </div>
              </div>

              {/* Justificación Polaridad */}
              <div className="bg-black/40 p-3 rounded-lg border border-oled-border/70 text-xs sm:text-sm">
                <span className="text-slate-400 font-mono text-[11px] uppercase block mb-1">
                  Justificación de Polaridad:
                </span>
                <p className="text-slate-300">
                  {molecule.didactica.justificacionPolaridad}
                </p>
              </div>
            </div>

            {/* Curiosidades Científicas (¿Sabías que...?) */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-pide-cyan uppercase tracking-wider mb-2.5">
                <Sparkles className="w-4 h-4" />
                <span>¿Sabías que...? (Curiosidades Científicas)</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                {molecule.didactica.datosCuriosos.map((dato, i) => (
                  <div key={i} className="flex items-start gap-3 bg-oled-panel p-3.5 rounded-xl border border-oled-border">
                    <span className="font-mono font-bold text-pide-cyan text-sm bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-800/40 shrink-0">
                      0{i + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                      {dato}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Usos en la Vida Cotidiana & Industria */}
            <div>
              <div className="flex items-center gap-2 text-xs font-bold text-pide-amber uppercase tracking-wider mb-2.5">
                <Layers className="w-4 h-4" />
                <span>Usos en la Vida Cotidiana & Industria Chilena</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {molecule.didactica.usosVidaCotidiana.map((uso, i) => (
                  <div key={i} className="flex items-center gap-2.5 text-xs sm:text-sm text-slate-200 bg-oled-panel px-3.5 py-2.5 rounded-lg border border-oled-border">
                    <span className="w-2 h-2 rounded-full bg-pide-amber shrink-0" />
                    <span>{uso}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick jump to Trivia button */}
            <div className="pt-2">
              <button
                onClick={() => setActiveTab('trivia')}
                className="w-full py-3 px-4 rounded-xl bg-gradient-to-r from-amber-950/60 to-yellow-950/60 border border-amber-600/50 hover:border-amber-400 text-amber-200 hover:text-amber-100 flex items-center justify-between transition-all"
              >
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-4 h-4 text-pide-amber" />
                  <span className="font-bold text-xs sm:text-sm">¿Listo para el desafío? Responde la Trivia USS de esta ronda</span>
                </div>
                <span className="font-mono font-bold text-xs bg-amber-500/20 px-2.5 py-1 rounded text-amber-300 border border-amber-500/40">
                  +100 PUNTOS
                </span>
              </button>
            </div>
          </div>
        )}

        {activeTab === 'trivia' && (
          <div className="space-y-4">
            <div className="bg-uss-blue/40 border border-uss-gold/50 p-4 sm:p-5 rounded-xl shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-mono uppercase font-bold text-uss-goldBright flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4" />
                  Desafío Escolar USS VcM
                </span>
                <span className="text-xs font-mono bg-uss-gold/20 text-uss-gold px-2.5 py-1 rounded-full font-extrabold border border-uss-gold/40">
                  +100 PUNTOS EXTRA
                </span>
              </div>
              <p className="text-sm sm:text-base font-bold text-white leading-snug mt-1">
                {molecule.trivia.pregunta}
              </p>
            </div>

            {/* Opciones */}
            <div className="space-y-2.5">
              {molecule.trivia.opciones.map((opcion, index) => {
                const isSelected = selectedOption === index;
                const isCorrect = index === molecule.trivia.respuestaCorrecta;
                const showFeedback = triviaSubmitted || triviaAnswered;

                let buttonClass = 'border-oled-border bg-oled-panel text-slate-200 hover:border-cyan-500 hover:bg-slate-900';

                if (showFeedback) {
                  if (isCorrect) {
                    buttonClass = 'border-emerald-500 bg-emerald-950/60 text-emerald-100 font-semibold shadow-[0_0_15px_rgba(56,239,125,0.25)]';
                  } else if (isSelected && !isCorrect) {
                    buttonClass = 'border-red-500 bg-red-950/60 text-red-200';
                  } else {
                    buttonClass = 'border-oled-border bg-oled-panel/30 text-slate-500 opacity-50';
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleSelectOption(index)}
                    disabled={triviaSubmitted || triviaAnswered}
                    className={`w-full text-left p-3.5 sm:p-4 rounded-xl border text-xs sm:text-sm flex items-start gap-3 transition-all ${buttonClass}`}
                  >
                    <span className="font-mono font-bold text-xs sm:text-sm px-2.5 py-1 rounded bg-black/60 border border-white/20 shrink-0">
                      {['A', 'B', 'C', 'D'][index]}
                    </span>
                    <span className="flex-1 mt-0.5 leading-relaxed">{opcion}</span>
                    {showFeedback && isCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {showFeedback && isSelected && !isCorrect && (
                      <XCircle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explicación científica tras responder */}
            {(triviaSubmitted || triviaAnswered) && (
              <div className="p-4 bg-oled-panel rounded-xl border border-cyan-500/40 text-xs sm:text-sm space-y-2 animate-fade-in shadow-xl">
                <div className="flex items-center gap-2 font-bold text-pide-cyan text-xs sm:text-sm uppercase tracking-wider">
                  <Lightbulb className="w-4 h-4" />
                  <span>Explicación Científica (Docentes USS):</span>
                </div>
                <p className="text-slate-200 leading-relaxed">
                  {molecule.trivia.explicacion}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
