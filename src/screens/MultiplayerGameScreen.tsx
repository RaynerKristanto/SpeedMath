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

interface MultiplayerGameScreenProps {
  onGameOver: (player1Score: number, player2Score: number) => void;
  timeLimit: number;
}

export const MultiplayerGameScreen: React.FC<MultiplayerGameScreenProps> = ({
  onGameOver,
  timeLimit,
}) => {
  const [equation, setEquation] = useState<Equation>(generateEquation());
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [timeLeft, setTimeLeft] = useState(timeLimit);
  const [isFirstQuestion, setIsFirstQuestion] = useState(true);
  const [gameActive, setGameActive] = useState(true);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const progressAnim = useRef(new Animated.Value(1)).current;

  // Start timer animation
  useEffect(() => {
    if (!gameActive) return;

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
        handleGameOver();
      }
    }, 10);

    return () => {
      if (timerRef.current) {
        clearInterval(timerRef.current);
      }
    };
  }, [equation, isFirstQuestion, gameActive, timeLimit]);

  const handleGameOver = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setGameActive(false);
    onGameOver(player1Score, player2Score);
  };

  const handleAnswer = (player: 1 | 2, userAnswer: boolean) => {
    if (!gameActive) return;

    if (timerRef.current) {
      clearInterval(timerRef.current);
    }

    // Check if answer is correct
    if (userAnswer === equation.isCorrect) {
      // Correct! Update score and generate new equation
      let totalScore = player1Score + player2Score;
      if (player === 1) {
        setPlayer1Score(player1Score + 1);
        totalScore = player1Score + 1 + player2Score;
      } else {
        setPlayer2Score(player2Score + 1);
        totalScore = player1Score + player2Score + 1;
      }
      setIsFirstQuestion(false);
      setEquation(generateEquation(totalScore));
      setTimeLeft(timeLimit);
    } else {
      // Wrong answer - game over
      handleGameOver();
    }
  };

  const progressWidth = progressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
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

      {/* Player 2 (Top Half - Rotated 180°) */}
      <View style={[styles.playerContainer, styles.rotated]}>
        <View style={styles.scoreContainer}>
          <Text style={styles.playerLabel}>Player 2</Text>
          <Text style={styles.scoreValue}>{player2Score}</Text>
        </View>

        <View style={styles.equationContainer}>
          <Text style={styles.equation}>
            {equation.left} {equation.operator} {equation.right} = {equation.result}
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.trueButton]}
            onPress={() => handleAnswer(2, true)}
            activeOpacity={0.7}
            disabled={!gameActive}
          >
            <Text style={styles.buttonText}>TRUE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.falseButton]}
            onPress={() => handleAnswer(2, false)}
            activeOpacity={0.7}
            disabled={!gameActive}
          >
            <Text style={styles.buttonText}>FALSE</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Divider Line */}
      <View style={styles.divider} />

      {/* Player 1 (Bottom Half) */}
      <View style={styles.playerContainer}>
        <View style={styles.scoreContainer}>
          <Text style={styles.playerLabel}>Player 1</Text>
          <Text style={styles.scoreValue}>{player1Score}</Text>
        </View>

        <View style={styles.equationContainer}>
          <Text style={styles.equation}>
            {equation.left} {equation.operator} {equation.right} = {equation.result}
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.button, styles.trueButton]}
            onPress={() => handleAnswer(1, true)}
            activeOpacity={0.7}
            disabled={!gameActive}
          >
            <Text style={styles.buttonText}>TRUE</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.falseButton]}
            onPress={() => handleAnswer(1, false)}
            activeOpacity={0.7}
            disabled={!gameActive}
          >
            <Text style={styles.buttonText}>FALSE</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  timerBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 6,
    backgroundColor: '#333',
    zIndex: 10,
  },
  timerBar: {
    height: '100%',
  },
  playerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  rotated: {
    transform: [{ rotate: '180deg' }],
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  playerLabel: {
    fontSize: 16,
    color: '#aaa',
    fontWeight: '600',
  },
  scoreValue: {
    fontSize: 36,
    color: '#fff',
    fontWeight: 'bold',
  },
  equationContainer: {
    backgroundColor: '#16213e',
    padding: 25,
    borderRadius: 15,
    marginBottom: 30,
    minWidth: width * 0.75,
    alignItems: 'center',
  },
  equation: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 15,
  },
  button: {
    paddingVertical: 15,
    paddingHorizontal: 35,
    borderRadius: 12,
    minWidth: 110,
    alignItems: 'center',
  },
  trueButton: {
    backgroundColor: '#4CAF50',
  },
  falseButton: {
    backgroundColor: '#f44336',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  divider: {
    height: 2,
    backgroundColor: '#ffeb3b',
    width: '100%',
  },
});
