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
  const [activeTab, setActiveTab] = useState<'curiosities' | 'structure' | 'trivia'>('curiosities');
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [triviaSubmitted, setTriviaSubmitted] = useState<boolean>(false);

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
      <div className="p-4 border-b border-oled-border bg-gradient-to-r from-oled-panel to-oled-card">
        <div className="flex items-start justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-xl font-bold text-white tracking-tight">{molecule.name}</h2>
              <span className={`px-2 py-0.5 text-[10px] font-bold rounded-full border ${difficultyConfig.bg} ${difficultyConfig.text} ${difficultyConfig.border}`}>
                {difficultyConfig.label}
              </span>
            </div>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              IUPAC: <span className="text-slate-200">{molecule.iupacName}</span>
            </p>
          </div>

          <div className="flex flex-col items-end">
            <span className="text-lg font-mono font-bold text-pide-cyan">
              {molecule.formula}
            </span>
            <div className="flex items-center gap-1 text-[11px] font-mono text-slate-400">
              <Scale className="w-3 h-3 text-slate-500" />
              <span>{molecule.molarMass.toFixed(2)} g/mol</span>
            </div>
          </div>
        </div>

        {/* Badges strip */}
        <div className="flex flex-wrap items-center gap-1.5 mt-3">
          <span className="px-2 py-0.5 bg-slate-800 text-slate-300 text-[11px] rounded border border-slate-700">
            {molecule.classification}
          </span>
          <span className="px-2 py-0.5 bg-cyan-950/60 text-pide-cyan text-[11px] font-medium rounded border border-cyan-800/40 flex items-center gap-1">
            <Compass className="w-3 h-3" />
            {molecule.didactica.geometriaMolecular}
          </span>
          <span className={`px-2 py-0.5 text-[11px] font-medium rounded border flex items-center gap-1 ${
            molecule.didactica.polaridad === 'polar'
              ? 'bg-amber-950/40 text-amber-300 border-amber-800/40'
              : 'bg-blue-950/40 text-blue-300 border-blue-800/40'
          }`}>
            <Zap className="w-3 h-3" />
            {molecule.didactica.polaridad === 'polar' ? 'Polar (μ > 0)' : 'Apolar (μ = 0)'}
          </span>
        </div>
      </div>

      {/* Tabs navigation */}
      <div className="flex border-b border-oled-border bg-oled-panel text-xs">
        <button
          onClick={() => setActiveTab('curiosities')}
          className={`flex-1 py-2.5 px-3 font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
            activeTab === 'curiosities'
              ? 'border-pide-cyan text-pide-cyan bg-cyan-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Lightbulb className="w-3.5 h-3.5" />
          <span>Curiosidades & Usos</span>
        </button>

        <button
          onClick={() => setActiveTab('structure')}
          className={`flex-1 py-2.5 px-3 font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
            activeTab === 'structure'
              ? 'border-pide-cyan text-pide-cyan bg-cyan-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <Layers className="w-3.5 h-3.5" />
          <span>Estructura Química</span>
        </button>

        <button
          onClick={() => setActiveTab('trivia')}
          className={`flex-1 py-2.5 px-3 font-semibold flex items-center justify-center gap-1.5 border-b-2 transition-all ${
            activeTab === 'trivia'
              ? 'border-pide-amber text-pide-amber bg-amber-950/20'
              : 'border-transparent text-slate-400 hover:text-slate-200'
          }`}
        >
          <HelpCircle className="w-3.5 h-3.5" />
          <span>Trivia USS (+100)</span>
        </button>
      </div>

      {/* Tab Contents */}
      <div className="flex-1 p-4 overflow-y-auto space-y-4 text-slate-300 text-xs leading-relaxed">
        {activeTab === 'curiosities' && (
          <div className="space-y-4">
            {/* Curiosidades */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-pide-cyan uppercase tracking-wider mb-2">
                <Sparkles className="w-3.5 h-3.5" />
                <span>¿Sabías que...? (Datos Curiosos)</span>
              </div>
              <ul className="space-y-2">
                {molecule.didactica.datosCuriosos.map((dato, i) => (
                  <li key={i} className="flex items-start gap-2 bg-oled-panel p-2.5 rounded-lg border border-oled-border">
                    <span className="font-mono font-bold text-pide-cyan text-xs">0{i + 1}</span>
                    <p className="text-slate-300">{dato}</p>
                  </li>
                ))}
              </ul>
            </div>

            {/* Usos en la Vida Cotidiana */}
            <div>
              <div className="flex items-center gap-1.5 text-xs font-bold text-pide-amber uppercase tracking-wider mb-2">
                <BookOpen className="w-3.5 h-3.5" />
                <span>Usos en la Vida Cotidiana & Industria</span>
              </div>
              <ul className="space-y-1.5">
                {molecule.didactica.usosVidaCotidiana.map((uso, i) => (
                  <li key={i} className="flex items-center gap-2 text-slate-300 bg-oled-panel/60 px-3 py-2 rounded-md border border-oled-border/60">
                    <span className="w-1.5 h-1.5 rounded-full bg-pide-amber" />
                    <span>{uso}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}

        {activeTab === 'structure' && (
          <div className="space-y-4">
            {/* Explicación Científica */}
            <div className="bg-oled-panel p-3.5 rounded-lg border border-oled-border">
              <h4 className="font-bold text-slate-100 text-xs mb-1.5 flex items-center gap-1.5">
                <Atom className="w-3.5 h-3.5 text-pide-cyan" />
                Descripción Química Fundamental
              </h4>
              <p className="text-slate-300 text-xs leading-relaxed">
                {molecule.didactica.descripcionCientifica}
              </p>
            </div>

            {/* Geometría y Polaridad Detalle */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              <div className="bg-oled-panel p-3 rounded-lg border border-oled-border">
                <span className="text-[10px] text-slate-400 uppercase font-mono">Geometría RPECV / VSEPR</span>
                <p className="text-sm font-bold text-white mt-0.5">{molecule.didactica.geometriaMolecular}</p>
              </div>
              <div className="bg-oled-panel p-3 rounded-lg border border-oled-border">
                <span className="text-[10px] text-slate-400 uppercase font-mono">Comportamiento Dipolar</span>
                <p className="text-sm font-bold text-pide-amber mt-0.5 capitalize">{molecule.didactica.polaridad}</p>
              </div>
            </div>

            {/* Justificación Polaridad */}
            <div className="bg-oled-panel/80 p-3 rounded-lg border border-oled-border text-xs">
              <span className="text-slate-400 font-mono text-[10px] uppercase block mb-1">
                Justificación de Polaridad:
              </span>
              <p className="text-slate-300">
                {molecule.didactica.justificacionPolaridad}
              </p>
            </div>
          </div>
        )}

        {activeTab === 'trivia' && (
          <div className="space-y-3">
            <div className="bg-uss-blue/30 border border-uss-gold/40 p-3 rounded-lg">
              <div className="flex items-center justify-between mb-1.5">
                <span className="text-[10px] font-mono uppercase font-bold text-uss-goldBright">
                  Desafío Escolar USS VcM
                </span>
                <span className="text-[10px] font-mono bg-uss-gold/20 text-uss-gold px-1.5 py-0.5 rounded font-bold">
                  +100 PUNTOS
                </span>
              </div>
              <p className="text-xs font-semibold text-white">
                {molecule.trivia.pregunta}
              </p>
            </div>

            {/* Opciones */}
            <div className="space-y-2">
              {molecule.trivia.opciones.map((opcion, index) => {
                const isSelected = selectedOption === index;
                const isCorrect = index === molecule.trivia.respuestaCorrecta;
                const showFeedback = triviaSubmitted || triviaAnswered;

                let buttonClass = 'border-oled-border bg-oled-panel text-slate-300 hover:border-slate-500 hover:bg-slate-900';

                if (showFeedback) {
                  if (isCorrect) {
                    buttonClass = 'border-emerald-500 bg-emerald-950/40 text-emerald-200';
                  } else if (isSelected && !isCorrect) {
                    buttonClass = 'border-red-500 bg-red-950/40 text-red-300';
                  } else {
                    buttonClass = 'border-oled-border bg-oled-panel/40 text-slate-500 opacity-60';
                  }
                }

                return (
                  <button
                    key={index}
                    onClick={() => handleSelectOption(index)}
                    disabled={triviaSubmitted || triviaAnswered}
                    className={`w-full text-left p-2.5 rounded-lg border text-xs flex items-start gap-2.5 transition-all ${buttonClass}`}
                  >
                    <span className="font-mono font-bold text-[11px] px-1.5 py-0.5 rounded bg-black/50 border border-white/10">
                      {['A', 'B', 'C', 'D'][index]}
                    </span>
                    <span className="flex-1 mt-0.5">{opcion}</span>
                    {showFeedback && isCorrect && (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                    )}
                    {showFeedback && isSelected && !isCorrect && (
                      <XCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
                    )}
                  </button>
                );
              })}
            </div>

            {/* Explicación tras responder */}
            {(triviaSubmitted || triviaAnswered) && (
              <div className="p-3 bg-oled-panel rounded-lg border border-cyan-500/30 text-xs space-y-1 animate-fade-in">
                <div className="flex items-center gap-1.5 font-bold text-pide-cyan text-[11px] uppercase">
                  <Lightbulb className="w-3.5 h-3.5" />
                  <span>Explicación Científica:</span>
                </div>
                <p className="text-slate-300 text-xs">
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
