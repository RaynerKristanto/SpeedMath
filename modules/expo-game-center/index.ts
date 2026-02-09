import { requireOptionalNativeModule } from 'expo-modules-core';

interface AuthResult {
  isAuthenticated: boolean;
  playerAlias: string | null;
  error: string | null;
}

interface SubmitResult {
  success: boolean;
  error: string | null;
}

interface PlayerScoreResult {
  score: number | null;
  rank: number | null;
  error: string | null;
}

interface ExpoGameCenterModule {
  authenticate(): Promise<AuthResult>;
  isAuthenticated(): boolean;
  getPlayerAlias(): string | null;
  submitScore(score: number, leaderboardID: string): Promise<SubmitResult>;
  fetchPlayerBestScore(leaderboardID: string): Promise<PlayerScoreResult>;
  showLeaderboard(leaderboardID: string): Promise<void>;
}

const GameCenter =
  requireOptionalNativeModule<ExpoGameCenterModule>('ExpoGameCenter');

export default GameCenter;
export type { AuthResult, SubmitResult, PlayerScoreResult };
