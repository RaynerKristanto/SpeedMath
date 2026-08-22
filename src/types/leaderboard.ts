import type { TranslationKey } from '../i18n/translations';

export interface LeaderboardEntry {
  username: string;
  score: number;
  timestamp: number; // Unix timestamp
  rank?: number; // Calculated client-side
}

export interface ValidationResult {
  valid: boolean;
  errorKey?: TranslationKey;
}
