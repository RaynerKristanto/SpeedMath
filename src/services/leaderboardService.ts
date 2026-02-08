import { Platform } from 'react-native';
import GameCenter from '../../modules/expo-game-center';
import type { AuthResult, SubmitResult } from '../../modules/expo-game-center';
import * as localLeaderboard from './localLeaderboardService';
import type { LeaderboardEntry } from '../types/leaderboard';

const GAME_CENTER_LEADERBOARD_ID = 'scores';

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
  username?: string
): Promise<{ success: boolean; error?: string }> => {
  if (isGameCenterAvailable() && isGameCenterAuthenticated()) {
    try {
      const result: SubmitResult = await GameCenter!.submitScore(
        score,
        GAME_CENTER_LEADERBOARD_ID
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

export const showNativeLeaderboard = async (): Promise<boolean> => {
  if (isGameCenterAvailable() && isGameCenterAuthenticated()) {
    try {
      await GameCenter!.showLeaderboard(GAME_CENTER_LEADERBOARD_ID);
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
