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
