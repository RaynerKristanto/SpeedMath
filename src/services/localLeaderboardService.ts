import AsyncStorage from '@react-native-async-storage/async-storage';
import { LeaderboardEntry, ValidationResult } from '../types/leaderboard';

const LEADERBOARD_KEY = '@speed_math_leaderboard';
const MAX_ENTRIES = 10;

/**
 * Validate username
 * Must be 3-20 characters, alphanumeric + spaces and underscores only
 */
export const validateUsername = (username: string): ValidationResult => {
  const trimmed = username.trim();

  if (trimmed.length < 3) {
    return {
      valid: false,
      error: 'Username must be at least 3 characters',
    };
  }

  if (trimmed.length > 20) {
    return {
      valid: false,
      error: 'Username must be 20 characters or less',
    };
  }

  // Allow alphanumeric, spaces, and underscores only
  const validPattern = /^[a-zA-Z0-9_ ]+$/;
  if (!validPattern.test(trimmed)) {
    return {
      valid: false,
      error: 'Username can only contain letters, numbers, spaces, and underscores',
    };
  }

  return { valid: true };
};

/**
 * Get all leaderboard entries from local storage
 * Returns top 10 scores sorted by score descending
 */
export const getLeaderboard = async (): Promise<LeaderboardEntry[]> => {
  try {
    const data = await AsyncStorage.getItem(LEADERBOARD_KEY);

    if (!data) {
      return [];
    }

    const entries: LeaderboardEntry[] = JSON.parse(data);

    // Sort by score descending, then by timestamp descending
    const sorted = entries.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return b.timestamp - a.timestamp;
    });

    // Add rank to each entry
    return sorted.map((entry, index) => ({
      ...entry,
      rank: index + 1,
    }));
  } catch (error) {
    console.error('Error reading leaderboard:', error);
    return [];
  }
};

/**
 * Submit a new score to the leaderboard
 * Only keeps top 10 scores
 */
export const submitScore = async (
  username: string,
  score: number
): Promise<{ success: boolean; error?: string }> => {
  try {
    // Validate username
    const validation = validateUsername(username);
    if (!validation.valid) {
      return {
        success: false,
        error: validation.error,
      };
    }

    // Validate score
    if (score < 0) {
      return {
        success: false,
        error: 'Invalid score',
      };
    }

    // Get existing leaderboard
    const existingEntries = await getLeaderboard();

    // Create new entry
    const newEntry: LeaderboardEntry = {
      username: username.trim(),
      score,
      timestamp: Date.now(),
    };

    // Add new entry to list
    const allEntries = [...existingEntries, newEntry];

    // Sort by score descending, then by timestamp descending
    const sorted = allEntries.sort((a, b) => {
      if (b.score !== a.score) {
        return b.score - a.score;
      }
      return b.timestamp - a.timestamp;
    });

    // Keep only top 10
    const top10 = sorted.slice(0, MAX_ENTRIES);

    // Save back to storage
    await AsyncStorage.setItem(LEADERBOARD_KEY, JSON.stringify(top10));

    return { success: true };
  } catch (error) {
    console.error('Error submitting score:', error);
    return {
      success: false,
      error: 'Failed to save score. Please try again.',
    };
  }
};

/**
 * Clear all leaderboard data (for testing/reset)
 */
export const clearLeaderboard = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(LEADERBOARD_KEY);
  } catch (error) {
    console.error('Error clearing leaderboard:', error);
  }
};

/**
 * Check if a score would make it to the top 10
 */
export const wouldMakeLeaderboard = async (score: number): Promise<boolean> => {
  try {
    const entries = await getLeaderboard();

    // If less than 10 entries, always makes it
    if (entries.length < MAX_ENTRIES) {
      return true;
    }

    // Check if score is higher than the lowest score
    const lowestScore = entries[entries.length - 1].score;
    return score > lowestScore;
  } catch (error) {
    console.error('Error checking leaderboard:', error);
    return false;
  }
};
