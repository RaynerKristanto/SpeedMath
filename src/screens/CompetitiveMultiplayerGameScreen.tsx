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

const { width } = Dimensions.get('window');

interface CompetitiveMultiplayerGameScreenProps {
  onGameOver: (player1Score: number, player2Score: number) => void;
  timeLimit: number;
  trueButtonOnLeft: boolean;
}

export const CompetitiveMultiplayerGameScreen: React.FC<
  CompetitiveMultiplayerGameScreenProps
> = ({ onGameOver, timeLimit, trueButtonOnLeft }) => {
  // Initial shared equation (difficulty 0)
  const initialEquation = generateEquation(0);

  // Player 1 state
  const [p1Equation, setP1Equation] = useState<Equation>(initialEquation);
  const [p1Score, setP1Score] = useState(0);
  const [p1TimeLeft, setP1TimeLeft] = useState(timeLimit);
  const [p1IsFirstQuestion, setP1IsFirstQuestion] = useState(true);
  const [p1Active, setP1Active] = useState(true);
  const p1TimerRef = useRef<NodeJS.Timeout | null>(null);
  const p1ProgressAnim = useRef(new Animated.Value(1)).current;

  // Player 2 state
  const [p2Equation, setP2Equation] = useState<Equation>(initialEquation);
  const [p2Score, setP2Score] = useState(0);
  const [p2TimeLeft, setP2TimeLeft] = useState(timeLimit);
  const [p2IsFirstQuestion, setP2IsFirstQuestion] = useState(true);
  const [p2Active, setP2Active] = useState(true);
  const p2TimerRef = useRef<NodeJS.Timeout | null>(null);
  const p2ProgressAnim = useRef(new Animated.Value(1)).current;

  // Player 1 timer
  useEffect(() => {
    if (!p1Active) return;

    if (p1IsFirstQuestion) {
      p1ProgressAnim.setValue(1);
      return;
    }

    p1ProgressAnim.setValue(1);
    Animated.timing(p1ProgressAnim, {
      toValue: 0,
      duration: timeLimit,
      useNativeDriver: false,
    }).start();

    const startTime = Date.now();
    p1TimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, timeLimit - elapsed);
      setP1TimeLeft(remaining);

      if (remaining <= 0) {
        handlePlayerLose(1);
      }
    }, 10);

    return () => {
      if (p1TimerRef.current) {
        clearInterval(p1TimerRef.current);
      }
    };
  }, [p1Equation, p1IsFirstQuestion, p1Active, timeLimit]);

  // Player 2 timer
  useEffect(() => {
    if (!p2Active) return;

    if (p2IsFirstQuestion) {
      p2ProgressAnim.setValue(1);
      return;
    }

    p2ProgressAnim.setValue(1);
    Animated.timing(p2ProgressAnim, {
      toValue: 0,
      duration: timeLimit,
      useNativeDriver: false,
    }).start();

    const startTime = Date.now();
    p2TimerRef.current = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const remaining = Math.max(0, timeLimit - elapsed);
      setP2TimeLeft(remaining);

      if (remaining <= 0) {
        handlePlayerLose(2);
      }
    }, 10);

    return () => {
      if (p2TimerRef.current) {
        clearInterval(p2TimerRef.current);
      }
    };
  }, [p2Equation, p2IsFirstQuestion, p2Active, timeLimit]);

  // Check if both players are out
  useEffect(() => {
    if (!p1Active && !p2Active) {
      onGameOver(p1Score, p2Score);
    }
  }, [p1Active, p2Active]);

  const handlePlayerLose = (player: 1 | 2) => {
    if (player === 1) {
      if (p1TimerRef.current) {
        clearInterval(p1TimerRef.current);
      }
      setP1Active(false);
      // If both players are out, trigger game over
      if (!p2Active) {
        onGameOver(p1Score, p2Score);
      }
    } else {
      if (p2TimerRef.current) {
        clearInterval(p2TimerRef.current);
      }
      setP2Active(false);
      // If both players are out, trigger game over
      if (!p1Active) {
        onGameOver(p1Score, p2Score);
      }
    }
  };

  const handleAnswer = (player: 1 | 2, userAnswer: boolean) => {
    if (player === 1) {
      if (!p1Active) return;
      if (p1TimerRef.current) {
        clearInterval(p1TimerRef.current);
      }

      if (userAnswer === p1Equation.isCorrect) {
        // Correct answer - update score and generate new equation for player 1 only
        const newP1Score = p1Score + 1;
        setP1Score(newP1Score);
        setP1IsFirstQuestion(false);
        setP1Equation(generateEquation(newP1Score));
        setP1TimeLeft(timeLimit);
      } else {
        // Wrong answer - eliminate player 1
        handlePlayerLose(1);
      }
    } else {
      if (!p2Active) return;
      if (p2TimerRef.current) {
        clearInterval(p2TimerRef.current);
      }

      if (userAnswer === p2Equation.isCorrect) {
        // Correct answer - update score and generate new equation for player 2 only
        const newP2Score = p2Score + 1;
        setP2Score(newP2Score);
        setP2IsFirstQuestion(false);
        setP2Equation(generateEquation(newP2Score));
        setP2TimeLeft(timeLimit);
      } else {
        // Wrong answer - eliminate player 2
        handlePlayerLose(2);
      }
    }
  };

  const p1ProgressWidth = p1ProgressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  const p2ProgressWidth = p2ProgressAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0%', '100%'],
  });

  return (
    <View style={styles.container}>
      {/* Player 2 (Top Half - Rotated 180°) */}
      <View style={[styles.playerContainer, styles.rotated]}>
        {/* Timer Progress Bar for P2 */}
        <View style={styles.timerBarContainer}>
          {p2Active ? (
            <Animated.View
              style={[
                styles.timerBar,
                {
                  width: p2ProgressWidth,
                  backgroundColor: p2TimeLeft < timeLimit * 0.3 ? '#ff4444' : '#4CAF50',
                },
              ]}
            />
          ) : (
            <View style={[styles.timerBar, styles.timerBarInactive]} />
          )}
        </View>

        <View style={styles.scoreContainer}>
          <Text style={styles.playerLabel}>
            Player 2 {!p2Active && '(OUT)'}
          </Text>
          <Text style={[styles.scoreValue, !p2Active && styles.inactiveScore]}>
            {p2Score}
          </Text>
        </View>

        <View
          style={[
            styles.equationContainer,
            !p2Active && styles.equationContainerInactive,
          ]}
        >
          <Text style={styles.equation}>
            {p2Active ? (
              <>
                {p2Equation.left} {p2Equation.operator} {p2Equation.right} ={' '}
                {p2Equation.result}
              </>
            ) : (
              'ELIMINATED'
            )}
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          {trueButtonOnLeft ? (
            <>
              <TouchableOpacity
                style={[styles.button, styles.trueButton, !p2Active && styles.buttonDisabled]}
                onPress={() => handleAnswer(2, true)}
                activeOpacity={0.7}
                disabled={!p2Active}
              >
                <Text style={styles.buttonText}>TRUE</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.falseButton, !p2Active && styles.buttonDisabled]}
                onPress={() => handleAnswer(2, false)}
                activeOpacity={0.7}
                disabled={!p2Active}
              >
                <Text style={styles.buttonText}>FALSE</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={[styles.button, styles.falseButton, !p2Active && styles.buttonDisabled]}
                onPress={() => handleAnswer(2, false)}
                activeOpacity={0.7}
                disabled={!p2Active}
              >
                <Text style={styles.buttonText}>FALSE</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.trueButton, !p2Active && styles.buttonDisabled]}
                onPress={() => handleAnswer(2, true)}
                activeOpacity={0.7}
                disabled={!p2Active}
              >
                <Text style={styles.buttonText}>TRUE</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </View>

      {/* Divider Line */}
      <View style={styles.divider} />

      {/* Player 1 (Bottom Half) */}
      <View style={styles.playerContainer}>
        {/* Timer Progress Bar for P1 */}
        <View style={styles.timerBarContainer}>
          {p1Active ? (
            <Animated.View
              style={[
                styles.timerBar,
                {
                  width: p1ProgressWidth,
                  backgroundColor: p1TimeLeft < timeLimit * 0.3 ? '#ff4444' : '#4CAF50',
                },
              ]}
            />
          ) : (
            <View style={[styles.timerBar, styles.timerBarInactive]} />
          )}
        </View>

        <View style={styles.scoreContainer}>
          <Text style={styles.playerLabel}>
            Player 1 {!p1Active && '(OUT)'}
          </Text>
          <Text style={[styles.scoreValue, !p1Active && styles.inactiveScore]}>
            {p1Score}
          </Text>
        </View>

        <View
          style={[
            styles.equationContainer,
            !p1Active && styles.equationContainerInactive,
          ]}
        >
          <Text style={styles.equation}>
            {p1Active ? (
              <>
                {p1Equation.left} {p1Equation.operator} {p1Equation.right} ={' '}
                {p1Equation.result}
              </>
            ) : (
              'ELIMINATED'
            )}
          </Text>
        </View>

        <View style={styles.buttonsContainer}>
          {trueButtonOnLeft ? (
            <>
              <TouchableOpacity
                style={[styles.button, styles.trueButton, !p1Active && styles.buttonDisabled]}
                onPress={() => handleAnswer(1, true)}
                activeOpacity={0.7}
                disabled={!p1Active}
              >
                <Text style={styles.buttonText}>TRUE</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.falseButton, !p1Active && styles.buttonDisabled]}
                onPress={() => handleAnswer(1, false)}
                activeOpacity={0.7}
                disabled={!p1Active}
              >
                <Text style={styles.buttonText}>FALSE</Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <TouchableOpacity
                style={[styles.button, styles.falseButton, !p1Active && styles.buttonDisabled]}
                onPress={() => handleAnswer(1, false)}
                activeOpacity={0.7}
                disabled={!p1Active}
              >
                <Text style={styles.buttonText}>FALSE</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, styles.trueButton, !p1Active && styles.buttonDisabled]}
                onPress={() => handleAnswer(1, true)}
                activeOpacity={0.7}
                disabled={!p1Active}
              >
                <Text style={styles.buttonText}>TRUE</Text>
              </TouchableOpacity>
            </>
          )}
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
  playerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
  },
  rotated: {
    transform: [{ rotate: '180deg' }],
  },
  timerBarContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: 4,
    backgroundColor: '#333',
  },
  timerBar: {
    height: '100%',
  },
  timerBarInactive: {
    width: '100%',
    backgroundColor: '#555',
  },
  scoreContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  playerLabel: {
    fontSize: 14,
    color: '#aaa',
    fontWeight: '600',
  },
  scoreValue: {
    fontSize: 32,
    color: '#fff',
    fontWeight: 'bold',
  },
  inactiveScore: {
    color: '#666',
  },
  equationContainer: {
    backgroundColor: '#16213e',
    padding: 20,
    borderRadius: 15,
    marginBottom: 25,
    minWidth: width * 0.75,
    alignItems: 'center',
  },
  equationContainerInactive: {
    backgroundColor: '#2a2a3e',
  },
  equation: {
    fontSize: 28,
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 15,
    maxWidth: 800,
  },
  button: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 12,
    minWidth: 100,
    alignItems: 'center',
  },
  trueButton: {
    backgroundColor: '#4CAF50',
  },
  falseButton: {
    backgroundColor: '#f44336',
  },
  buttonDisabled: {
    opacity: 0.3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  divider: {
    height: 2,
    backgroundColor: '#ffeb3b',
    width: '100%',
  },
});
