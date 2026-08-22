export interface Equation {
  left: number;
  operator: '+' | '-' | '*';
  right: number;
  result: number;
  isCorrect: boolean;
}

export interface GameState {
  score: number;
  isPlaying: boolean;
  currentEquation: Equation | null;
  timeLeft: number;
}

export type GameMode = 'single' | 'multiplayer';

/** Sentinel time limit meaning the countdown is disabled. */
export const NO_TIME_LIMIT = 0;
