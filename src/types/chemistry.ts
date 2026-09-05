/**
 * PIDE VcM 3D MolBuilder — Chemistry & 3D Molecular Types
 * Universidad San Sebastián (USS) - Vinculación con el Medio
 */

export type ElementSymbol = 'C' | 'H' | 'O' | 'N' | 'Cl' | 'S';
export type Hybridization = 'sp3' | 'sp2' | 'sp' | 's' | 'none';
export type DifficultyLevel = 'facil' | 'intermedio' | 'avanzado';
export type Polarity = 'polar' | 'apolar';
export type BondOrder = 1 | 2 | 3;

export interface Atom3D {
  id: string;
  element: ElementSymbol;
  symbol: string;
  x: number;
  y: number;
  z: number;
  color: string;
  radius: number;
  hybridization: Hybridization;
  label?: string;
}

export interface Bond3D {
  id: string;
  from: number; // Index in atoms array
  to: number;   // Index in atoms array
  order: BondOrder;
}

export interface EducationalDidacticCard {
  descripcionCientifica: string;
  datosCuriosos: string[];
  usosVidaCotidiana: string[];
  geometriaMolecular: string;
  polaridad: Polarity;
  justificacionPolaridad: string;
}

export interface PhysicalKitRequirements {
  esferas: Partial<Record<ElementSymbol, number>>;
  conectores: {
    cortosRigidos: number;
    largosFlexibles: number;
  };
  descripcionConectores: string;
  tipsArmado: string;
}

export interface TriviaQuestion {
  pregunta: string;
  opciones: [string, string, string, string];
  respuestaCorrecta: 0 | 1 | 2 | 3;
  explicacion: string;
}

export interface MoleculeData {
  id: string;
  name: string;
  iupacName: string;
  formula: string;
  molarMass: number; // g/mol
  classification: string;
  difficultyLevel: DifficultyLevel;
  timeLimitSeconds: number;
  atoms: Atom3D[];
  bonds: Bond3D[];
  didactica: EducationalDidacticCard;
  kitFisico: PhysicalKitRequirements;
  trivia: TriviaQuestion;
}
