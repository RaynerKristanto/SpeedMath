export interface LeaderboardEntry {
  username: string;
  score: number;
  timestamp: number; // Unix timestamp
  rank?: number; // Calculated client-side
}

export interface ValidationResult {
  valid: boolean;
  error?: string;
}
