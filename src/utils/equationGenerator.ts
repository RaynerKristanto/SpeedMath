import { Equation } from '../types/game';

/**
 * Generates a random number between min and max (inclusive)
 */
const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Gets the difficulty range based on the current score/question number
 * Starts easy and progressively gets harder
 */
const getDifficultyRange = (difficulty: number = 0): { min: number; max: number } => {
  if (difficulty < 5) {
    // Very easy: 1-5
    return { min: 1, max: 5 };
  } else if (difficulty < 10) {
    // Easy: 1-10
    return { min: 1, max: 10 };
  } else if (difficulty < 15) {
    // Medium: 5-15
    return { min: 5, max: 15 };
  } else if (difficulty < 25) {
    // Hard: 5-25
    return { min: 5, max: 25 };
  } else {
    // Very hard: 10-50
    return { min: 10, max: 49 };
  }
};

/**
 * Generates a random addition equation with 50% chance of being correct or incorrect
 * Difficulty increases based on the provided difficulty level (usually the score)
 */
export const generateEquation = (difficulty: number = 0): Equation => {
  const range = getDifficultyRange(difficulty);
  const left = randomInt(range.min, range.max);
  const right = randomInt(range.min, range.max);
  const operator = '+'; // Only addition
  const correctResult = left + right;

  // 50% chance of being correct
  const isCorrect = Math.random() < 0.5;

  let displayedResult = correctResult;

  if (!isCorrect) {
    // Generate an incorrect result (off by 1-5 for easier, 1-10 for harder)
    const maxOffset = difficulty < 10 ? 3 : difficulty < 25 ? 5 : 10;
    const offset = randomInt(1, maxOffset) * (Math.random() < 0.5 ? 1 : -1);
    displayedResult = correctResult + offset;

    // Ensure we don't accidentally make it correct and keep it positive
    if (displayedResult === correctResult) {
      displayedResult += 1;
    }
    if (displayedResult < 0) {
      displayedResult = correctResult + Math.abs(offset);
    }
  }

  return {
    left,
    operator,
    right,
    result: displayedResult,
    isCorrect,
  };
};
