import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';
import { Equation } from '../types/game';
import { generateEquation } from '../utils/equationGenerator';

const { width, height } = Dimensions.get('window');

export type GameEndReason = 'timeout' | 'wrong';

export interface LastEquation {
  left: number;
  operator: string;
  right: number;
  result: number;
  isCorrect: boolean;
}

interface GameScreenProps {
  onGameOver: (finalScore: number, lastEquation: LastEquation, endReason: GameEndReason) => void;
  timeLimit: number;
  trueButtonOnLeft: boolean;
}

export const GameScreen: React.FC<GameScreenProps> = ({ onGameOver, timeLimit, trueButtonOnLeft }) => {
  const [equation, setEquation] = useState<Equation>(generateEquation());
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isFirstQuestion, setIsFirstQuestion] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressAnim = useRef(new Animated.Value(1)).current;

  // Start timer animation
  useEffect(() => {
    // Skip timer for the first question
    if (isFirstQuestion) {
      progressAnim.setValue(1);
      return;
    }

    // Reset animation
    progressAnim.setValue(1);

    // Animate from 1 to 0 over the configured time limit
    Animated.timing(progressAnim, {
      toValue: 0,
      duration: timeLimit,
      useNativeDriver: false,
    }).start();

    // Countdown timer
    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, timeLimit - elapsed);
      setTimeLeft(remaining);

      if (remaining <= 0) {
        handleGameOver('timeout');
      }
    }, 10); // Update every 10ms for smooth progress

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [equation, isFirstQuestion, timeLimit]);

  const handleGameOver = (reason: GameEndReason) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    onGameOver(score, equation, reason);
  };

  const handleAnswer = (userAnswer: boolean) => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Check if answer is correct
    if (userAnswer === equation.isCorrect) {
      // Correct! Generate new equation with increased difficulty
      const newScore = score + 1;
      setScore(newScore);
      setIsFirstQuestion(false); // Start timer for subsequent questions
      setEquation(generateEquation(newScore));
      setTimeLeft(timeLimit);
    } else {
      // Wrong answer - game over
      handleGameOver('wrong');
    }
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* Score */}
      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>Score</Text>
        <Text style={styles.scoreValue}>{score}</Text>
      </View>

      {/* Timer Progress Bar */}
      <View style={styles.timerBarContainer}>
        <Animated.View
          style={[
            styles.timerBar,
            {
              width: progressWidth,
              backgroundColor: timeLeft < timeLimit * 0.3 ? '#ff4444' : '#4CAF50',
            },
          ]}
        />
      </View>

      {/* Equation Display */}
      <View style={styles.equationContainer}>
        <Text style={styles.equation}>
          {equation.left} {equation.operator} {equation.right} = {equation.result}
        </Text>
      </View>

      {/* True/False Buttons */}
      <View style={styles.buttonsContainer}>
        {trueButtonOnLeft ? (
          <>
            <TouchableOpacity
              style={[styles.button, styles.trueButton]}
              onPress={() => handleAnswer(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>TRUE</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.falseButton]}
              onPress={() => handleAnswer(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>FALSE</Text>
            </TouchableOpacity>
          </>
        ) : (
          <>
            <TouchableOpacity
              style={[styles.button, styles.falseButton]}
              onPress={() => handleAnswer(false)}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>FALSE</Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.button, styles.trueButton]}
              onPress={() => handleAnswer(true)}
              activeOpacity={0.7}
            >
              <Text style={styles.buttonText}>TRUE</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scoreContainer: {
    position: 'absolute',
    top: 60,
    alignItems: 'center',
  },
  scoreLabel: {
    fontSize: 18,
    color: '#aaa',
    fontWeight: '600',
  },
  scoreValue: {
    fontSize: 48,
    color: '#fff',
    fontWeight: 'bold',
  },
  timerBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: '#333',
  },
  timerBar: {
    height: '100%',
  },
  equationContainer: {
    backgroundColor: '#16213e',
    padding: 40,
    borderRadius: 20,
    marginBottom: 60,
    minWidth: width * 0.8,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  equation: {
    fontSize: 42,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 20,
    maxWidth: 800,
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 50,
    borderRadius: 15,
    minWidth: 140,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  trueButton: {
    backgroundColor: '#4CAF50',
  },
  falseButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
});
