import { MoleculeData } from './chemistry';

export interface TeamScore {
  id: string;
  name: string;
  school?: string;
  score: number;
  completedMolecules: string[];
  color: string;
}

export type RoundStatus = 'briefing' | 'building' | 'validating' | 'success' | 'timeout';

export interface ValidationFeedback {
  isCorrect: boolean;
  scoreEarned: number;
  sphereErrors: Record<string, { expected: number; actual: number }>;
  bondErrors: {
    singleExpected: number;
    singleActual: number;
    doubleExpected: number;
    doubleActual: number;
  };
  feedbackMessage: string;
  triviaAnsweredCorrect?: boolean;
}

export interface RoundRecord {
  roundNumber: number;
  moleculeId: string;
  moleculeName: string;
  timeSpentSeconds: number;
  scoreEarned: number;
  success: boolean;
  teamId: string;
  timestamp: string;
}
