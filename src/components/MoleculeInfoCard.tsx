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
  BookOpen,
  ChevronDown,
  ChevronUp
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
  const [isCollapsed, setIsCollapsed] = useState<boolean>(false);
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
  }[molecule.difficultyLevel] || { label: 'Nivel Estándar', bg: 'bg-blue-500/20', text: 'text-blue-300', border: 'border-blue-500/40' };

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
    <div className="flex flex-col bg-oled-card rounded-xl border border-oled-border overflow-hidden shadow-2xl transition-all">
      {/* Compact Header */}
      <div className="p-3.5 sm:p-4 border-b border-oled-border bg-gradient-to-r from-zinc-950 via-zinc-900 to-zinc-950 flex items-center justify-between gap-3">
        <div className="flex items-center gap-3 flex-wrap">
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight">
              {molecule.name}
            </h2>
            <span className={`px-2.5 py-0.5 text-xs font-bold rounded-full border ${difficultyConfig.bg} ${difficultyConfig.text} ${difficultyConfig.border}`}>
              {difficultyConfig.label}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-slate-400 border-l border-zinc-800 pl-3">
            <span>Nombre IUPAC: <strong className="text-slate-200">{molecule.iupacName}</strong></span>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-3">
            <span className="text-xl sm:text-2xl font-mono font-black text-orange-400 tracking-wider">
              {molecule.formula}
            </span>
            <div className="hidden md:flex items-center gap-1.5 text-xs font-mono text-slate-300">
              <Scale className="w-3.5 h-3.5 text-slate-400" />
              <span>{molecule.molarMass.toFixed(2)} g/mol</span>
            </div>
          </div>

          {/* Toggle Collapse Button */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-zinc-700 text-slate-300 hover:text-white border border-zinc-700 transition-all flex items-center gap-1 text-xs font-mono"
            title={isCollapsed ? 'Expandir Ficha Didáctica' : 'Plegar Ficha Didáctica'}
          >
            {isCollapsed ? (
              <>
                <span>Expandir Ficha</span>
                <ChevronDown className="w-4 h-4 text-orange-400" />
              </>
            ) : (
              <>
                <span>Plegar</span>
                <ChevronUp className="w-4 h-4 text-orange-400" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Badges strip (Always visible) */}
      <div className="px-4 py-2 bg-zinc-950/60 border-b border-oled-border/60 flex flex-wrap items-center gap-2 text-xs">
        <span className="px-2.5 py-0.5 bg-zinc-800 text-slate-200 rounded border border-zinc-700 font-medium text-[11px]">
          {molecule.classification}
        </span>
        <span className="px-2.5 py-0.5 bg-orange-950/40 text-orange-300 text-[11px] font-semibold rounded border border-orange-500/30 flex items-center gap-1.5">
          <Compass className="w-3.5 h-3.5 text-orange-400" />
          <span>Geometría: {molecule.didactica.geometriaMolecular}</span>
        </span>
        <span className={`px-2.5 py-0.5 text-[11px] font-semibold rounded border flex items-center gap-1.5 ${
          molecule.didactica.polaridad === 'polar'
            ? 'bg-amber-950/50 text-amber-300 border-amber-500/40'
            : 'bg-zinc-800/60 text-zinc-300 border-zinc-700/50'
        }`}>
          <Zap className="w-3.5 h-3.5" />
          <span>{molecule.didactica.polaridad === 'polar' ? 'Polar (μ > 0 D)' : 'Apolar (μ = 0 D)'}</span>
        </span>
      </div>

      {/* Collapsible Content */}
      {!isCollapsed && (
        <>
          {/* Navigation Tabs */}
          <div className="flex border-b border-oled-border bg-zinc-950 text-xs sm:text-sm">
            <button
              onClick={() => setActiveTab('didactic')}
              className={`flex-1 py-2.5 px-4 font-bold flex items-center justify-center gap-2 border-b-2 transition-all ${
                activeTab === 'didactic'
                  ? 'border-orange-500 text-orange-400 bg-orange-950/20 shadow-inner'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <BookOpen className="w-4 h-4 text-orange-400" />
              <span>Ficha Didáctica & Estructura</span>
            </button>

            <button
              onClick={() => setActiveTab('trivia')}
              className={`flex-1 py-2.5 px-4 font-bold flex items-center justify-center gap-2 border-b-2 transition-all relative ${
                activeTab === 'trivia'
                  ? 'border-orange-500 text-orange-400 bg-orange-950/20 shadow-inner'
                  : 'border-transparent text-slate-400 hover:text-slate-200'
              }`}
            >
              <HelpCircle className="w-4 h-4 text-orange-400" />
              <span>Desafío Trivia USS (+100 pts)</span>
              {triviaAnswered && (
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              )}
            </button>
          </div>

          {/* Tab Contents - Expanded Didactic Flow */}
          <div className="p-4 sm:p-5 space-y-5 text-slate-200 leading-relaxed text-sm sm:text-base">
            {activeTab === 'didactic' && (
              <div className="space-y-5">
                {/* Fundamento Químico & Geometría RPECV */}
                <div className="bg-zinc-950/80 p-4 sm:p-5 rounded-xl border border-oled-border space-y-3.5">
                  <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-orange-400 uppercase tracking-wider">
                    <Atom className="w-5 h-5 text-orange-400 shrink-0" />
                    <span>Estructura Química Fundamental & Modelo RPECV</span>
                  </div>
                  <p className="text-sm sm:text-base text-slate-200 leading-relaxed">
                    {molecule.didactica.descripcionCientifica}
                  </p>

                  {/* RPECV & Polarity Grid */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
                    <div className="bg-black/60 p-3 rounded-lg border border-oled-border">
                      <span className="text-[11px] text-slate-400 uppercase font-mono block">
                        Geometría Molecular (RPECV):
                      </span>
                      <p className="text-sm sm:text-base font-bold text-white mt-0.5">
                        {molecule.didactica.geometriaMolecular}
                      </p>
                    </div>
                    <div className="bg-black/60 p-3 rounded-lg border border-oled-border">
                      <span className="text-[11px] text-slate-400 uppercase font-mono block">
                        Polaridad & Momento Dipolar:
                      </span>
                      <p className="text-sm sm:text-base font-bold text-amber-400 mt-0.5">
                        {molecule.didactica.polaridad === 'polar' ? 'Molécula Polar (μ > 0 D)' : 'Molécula Apolar (μ = 0 D)'}
                      </p>
                    </div>
                  </div>

                  {/* Justificación Polaridad */}
                  <div className="bg-black/40 p-3 rounded-lg border border-oled-border/70 text-xs sm:text-sm">
                    <span className="text-slate-400 font-mono text-[11px] uppercase block mb-1">
                      Justificación de Polaridad:
                    </span>
                    <p className="text-slate-300 leading-relaxed">
                      {molecule.didactica.justificacionPolaridad}
                    </p>
                  </div>
                </div>

                {/* Curiosidades Científicas (¿Sabías que...?) */}
                <div>
                  <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-orange-400 uppercase tracking-wider mb-3">
                    <Sparkles className="w-4 h-4 text-orange-400 shrink-0" />
                    <span>¿Sabías que...? (Curiosidades Científicas)</span>
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {molecule.didactica.datosCuriosos.map((dato, i) => (
                      <div key={i} className="flex items-start gap-3 bg-zinc-950/80 p-4 sm:p-4.5 rounded-xl border border-oled-border">
                        <span className="font-mono font-bold text-orange-400 text-xs sm:text-sm bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40 shrink-0 mt-0.5">
                          0{i + 1}
                        </span>
                        <p className="text-sm text-slate-200 leading-relaxed">
                          {dato}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Usos en la Vida Cotidiana & Industria */}
                <div>
                  <div className="flex items-center gap-2.5 text-base sm:text-lg font-bold text-amber-400 uppercase tracking-wider mb-3">
                    <Layers className="w-4 h-4 text-amber-400 shrink-0" />
                    <span>Usos en la Vida Cotidiana & Industria Chilena</span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {molecule.didactica.usosVidaCotidiana.map((uso, i) => (
                      <div key={i} className="flex items-center gap-2.5 text-sm text-slate-200 bg-zinc-950/80 p-4 sm:p-4.5 rounded-lg border border-oled-border">
                        <span className="w-2 h-2 rounded-full bg-amber-400 shrink-0" />
                        <span className="leading-snug">{uso}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Quick jump to Trivia button */}
                <div className="pt-1">
                  <button
                    onClick={() => setActiveTab('trivia')}
                    className="w-full py-2.5 px-3.5 rounded-xl bg-gradient-to-r from-amber-950/60 to-orange-950/60 border border-amber-600/50 hover:border-amber-400 text-amber-200 hover:text-amber-100 flex items-center justify-between transition-all"
                  >
                    <div className="flex items-center gap-2">
                      <HelpCircle className="w-4 h-4 text-amber-400" />
                      <span className="font-bold text-xs">¿Listo para el desafío? Responde la Trivia USS de esta ronda</span>
                    </div>
                    <span className="font-mono font-bold text-[11px] bg-amber-500/20 px-2 py-0.5 rounded text-amber-300 border border-amber-500/40">
                      +100 PUNTOS
                    </span>
                  </button>
                </div>
              </div>
            )}

            {activeTab === 'trivia' && (
              <div className="space-y-3">
                <div className="bg-zinc-950/90 border border-amber-500/40 p-3.5 rounded-xl shadow-lg">
                  <div className="flex items-center justify-between mb-1.5">
                    <span className="text-[11px] font-mono uppercase font-bold text-amber-400 flex items-center gap-1.5">
                      <Sparkles className="w-3.5 h-3.5" />
                      Desafío Escolar USS VcM
                    </span>
                    <span className="text-[11px] font-mono bg-amber-500/20 text-amber-300 px-2 py-0.5 rounded-full font-extrabold border border-amber-500/40">
                      +100 PUNTOS EXTRA
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm font-bold text-white leading-snug">
                    {molecule.trivia.pregunta}
                  </p>
                </div>

                {/* Opciones */}
                <div className="space-y-2">
                  {molecule.trivia.opciones.map((opcion, index) => {
                    const isSelected = selectedOption === index;
                    const isCorrect = index === molecule.trivia.respuestaCorrecta;
                    const showFeedback = triviaSubmitted || triviaAnswered;

                    let buttonClass = 'border-oled-border bg-zinc-950/80 text-slate-200 hover:border-orange-500 hover:bg-zinc-900';

                    if (showFeedback) {
                      if (isCorrect) {
                        buttonClass = 'border-emerald-500 bg-emerald-950/60 text-emerald-100 font-semibold shadow-[0_0_15px_rgba(56,239,125,0.25)]';
                      } else if (isSelected && !isCorrect) {
                        buttonClass = 'border-red-500 bg-red-950/60 text-red-200';
                      } else {
                        buttonClass = 'border-oled-border bg-zinc-950/30 text-slate-500 opacity-50';
                      }
                    }

                    return (
                      <button
                        key={index}
                        onClick={() => handleSelectOption(index)}
                        disabled={triviaSubmitted || triviaAnswered}
                        className={`w-full text-left p-3 rounded-xl border text-xs flex items-start gap-2.5 transition-all ${buttonClass}`}
                      >
                        <span className="font-mono font-bold text-xs px-2 py-0.5 rounded bg-black/60 border border-white/20 shrink-0">
                          {['A', 'B', 'C', 'D'][index]}
                        </span>
                        <span className="flex-1 mt-0.5 leading-relaxed">{opcion}</span>
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

                {/* Explicación científica tras responder */}
                {(triviaSubmitted || triviaAnswered) && (
                  <div className="p-3 bg-zinc-950/90 rounded-xl border border-orange-500/40 text-xs space-y-1.5 animate-fade-in shadow-xl">
                    <div className="flex items-center gap-2 font-bold text-orange-400 uppercase tracking-wider">
                      <Lightbulb className="w-3.5 h-3.5" />
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
        </>
      )}
    </div>
  );
};
