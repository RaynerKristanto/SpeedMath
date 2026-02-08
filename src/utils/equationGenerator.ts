import { Equation } from '../types/game';

const OPERATORS: Array<'+' | '-' | '*'> = ['+', '-', '*'];

/**
 * Generates a random number between min and max (inclusive)
 */
const randomInt = (min: number, max: number): number => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**
 * Calculates the correct result for an equation
 */
const calculateResult = (left: number, operator: '+' | '-' | '*', right: number): number => {
  switch (operator) {
    case '+':
      return left + right;
    case '-':
      return left - right;
    case '*':
      return left * right;
  }
};

/**
 * Generates a random equation with 50% chance of being correct or incorrect
 */
export const generateEquation = (): Equation => {
  const left = randomInt(1, 20);
  const right = randomInt(1, 20);
  const operator = OPERATORS[randomInt(0, OPERATORS.length - 1)];
  const correctResult = calculateResult(left, operator, right);

  // 50% chance of being correct
  const isCorrect = Math.random() < 0.5;

  let displayedResult = correctResult;

  if (!isCorrect) {
    // Generate an incorrect result (off by 1-5)
    const offset = randomInt(1, 5) * (Math.random() < 0.5 ? 1 : -1);
    displayedResult = correctResult + offset;

    // Ensure we don't accidentally make it correct
    if (displayedResult === correctResult) {
      displayedResult += 1;
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
