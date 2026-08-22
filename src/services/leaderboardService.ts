import { Platform } from 'react-native';
import GameCenter from '../../modules/expo-game-center';
import type { AuthResult, SubmitResult } from '../../modules/expo-game-center';
import * as localLeaderboard from './localLeaderboardService';
import type { LeaderboardEntry } from '../types/leaderboard';

const LEADERBOARD_IDS: Record<number, string> = {
  1000: 'scores',
  2000: 'scores_2s',
};

const getLeaderboardID = (timeLimit?: number): string | null => {
  if (timeLimit === undefined) return 'scores';
  return LEADERBOARD_IDS[timeLimit] ?? null;
};

/** Game Center only has boards for the 1s and 2s modes. */
export const isLeaderboardSupported = (timeLimit?: number): boolean =>
  getLeaderboardID(timeLimit) !== null;

const isGameCenterAvailable = (): boolean => {
  return Platform.OS === 'ios' && GameCenter != null;
};

export const authenticateGameCenter = async (): Promise<AuthResult | null> => {
  if (!isGameCenterAvailable()) return null;
  try {
    return await GameCenter!.authenticate();
  } catch (error) {
    console.warn('Game Center auth failed:', error);
    return null;
  }
};

export const isGameCenterAuthenticated = (): boolean => {
  if (!isGameCenterAvailable()) return false;
  try {
    return GameCenter!.isAuthenticated();
  } catch {
    return false;
  }
};

export const getPlayerAlias = (): string | null => {
  if (!isGameCenterAvailable()) return null;
  try {
    return GameCenter!.getPlayerAlias();
  } catch {
    return null;
  }
};

export const submitScore = async (
  score: number,
  username?: string,
  timeLimit?: number
): Promise<{ success: boolean; error?: string }> => {
  if (isGameCenterAvailable() && isGameCenterAuthenticated()) {
    const leaderboardID = getLeaderboardID(timeLimit);
    if (!leaderboardID) {
      return { success: false, error: 'No leaderboard for this time limit' };
    }
    try {
      const result: SubmitResult = await GameCenter!.submitScore(
        score,
        leaderboardID
      );
      return { success: result.success, error: result.error ?? undefined };
    } catch (error: any) {
      return {
        success: false,
        error: error.message || 'Failed to submit to Game Center',
      };
    }
  }

  if (!username) {
    return { success: false, error: 'Username required for local leaderboard' };
  }
  return localLeaderboard.submitScore(username, score);
};

export const fetchPlayerBestScore = async (
  timeLimit?: number
): Promise<{ score: number | null; rank: number | null }> => {
  if (isGameCenterAvailable() && isGameCenterAuthenticated()) {
    const leaderboardID = getLeaderboardID(timeLimit);
    if (!leaderboardID) {
      return { score: null, rank: null };
    }
    try {
      const result = await GameCenter!.fetchPlayerBestScore(leaderboardID);
      return { score: result.score, rank: result.rank };
    } catch {
      return { score: null, rank: null };
    }
  }
  return { score: null, rank: null };
};

export const showNativeLeaderboard = async (timeLimit?: number): Promise<boolean> => {
  if (isGameCenterAvailable() && isGameCenterAuthenticated()) {
    const leaderboardID = getLeaderboardID(timeLimit);
    if (!leaderboardID) {
      return false;
    }
    try {
      await GameCenter!.showLeaderboard(leaderboardID);
      return true;
    } catch (error) {
      console.warn('Failed to show Game Center leaderboard:', error);
      return false;
    }
  }
  return false;
};

export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  return localLeaderboard.getLeaderboard();
};

export const wouldMakeLeaderboard = async (
  score: number
): Promise<boolean> => {
  if (isGameCenterAvailable() && isGameCenterAuthenticated()) {
    return true;
  }
  return localLeaderboard.wouldMakeLeaderboard(score);
};

export { validateUsername } from './localLeaderboardService';
