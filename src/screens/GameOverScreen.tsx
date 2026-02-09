import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, ScrollView } from 'react-native';
import { UsernameModal } from '../components/UsernameModal';
import { submitScore, isGameCenterAuthenticated, fetchPlayerBestScore } from '../services/leaderboardService';
import { LastEquation, GameEndReason } from './GameScreen';

interface GameOverScreenProps {
  score: number;
  timeLimit: number;
  lastEquation: LastEquation | null;
  endReason: GameEndReason;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  score,
  timeLimit,
  lastEquation,
  endReason,
  onPlayAgain,
  onBackToMenu,
}) => {
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');
  const [bestScore, setBestScore] = useState<number | null>(null);

  const useGameCenter = Platform.OS === 'ios' && isGameCenterAuthenticated();

  useEffect(() => {
    if (useGameCenter) {
      submitScore(score, undefined, timeLimit).then((result) => {
        if (result.success) {
          setSubmitSuccess(true);
        } else {
          setSubmitError(result.error || 'Failed to submit score');
        }
      });
      fetchPlayerBestScore(timeLimit).then((result) => {
        setBestScore(result.score);
      });
    }
  }, []);

  const handleSubmitScore = async (username: string) => {
    setIsSubmitting(true);
    setSubmitError('');

    const result = await submitScore(score, username, timeLimit);

    setIsSubmitting(false);

    if (result.success) {
      setSubmitSuccess(true);
      setShowUsernameModal(false);
    } else {
      setSubmitError(result.error || 'Failed to submit score');
    }
  };

  const handleShowModal = () => {
    setShowUsernameModal(true);
    setSubmitSuccess(false);
    setSubmitError('');
  };
  const grade = score >= 300 ? 'S+++' : score >= 200 ? 'S++' : score >= 100 ? 'S' : score >= 40 ? 'A' : score >= 20 ? 'B' : score >= 10 ? 'C' : 'F';
  const gradeColor = score >= 200 ? '#FF2D55' : score >= 100 ? '#AF52DE' : score >= 40 ? '#FFD700' : score >= 20 ? '#4CAF50' : score >= 10 ? '#2196F3' : '#ff4444';

  const [message] = useState(() => {
    const pick = (msgs: string[]) => msgs[Math.floor(Math.random() * msgs.length)];

    if (score >= 300) return pick([
      "Take my\uD83D\uDCB0 and don't go any higher",
    ]);
    if (score >= 200) return pick([
      "\uD83E\uDD2F someone check this run",
      "You are \uD83E\uDD16",
    ]);
    if (score >= 100) return pick([
      "top 1% behavior",
      "you're built different",
      "main character moment",
      "clip this",
    ]);
    if (score >= 40) return pick([
      "certified solid run",
      "Good but not top tier",
      "You're locked in",
      "this is above above average",
    ]);
    if (score >= 20) return pick([
      "respectable performance",
      "not bad at all actually",
      "lowkey solid",
      "not cracked, but capable",
    ]);
    if (score >= 10) return pick([
      "nothing to screenshot",
      "Mid",
      "you weren't guessing the whole time",
      "this could go somewhere",
      "a few neurons connected",
    ]);
    return pick([
      "Numbers are hard. It's okay.",
      "We'll keep this a secret from your friends",
      "the equation watching you answer: \uD83D\uDC41\uFE0F\uD83D\uDC44\uD83D\uDC41\uFE0F",
      "Even my grandma can get 10",
      "the scoreboard is judging silently",
      "you got this next run trust",
      "As good as my monkey!",
    ]);
  });

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.gradeSection}>
        <View style={[styles.gradeBadge, { backgroundColor: gradeColor, shadowColor: gradeColor }]}>
          <Text style={styles.gradeText}>{grade}</Text>
        </View>
        <Text style={styles.message}>{message}</Text>
      </View>

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>Final Score</Text>
        <Text style={styles.scoreValue}>{score}</Text>
        {bestScore !== null && (
          <Text style={styles.bestScoreText}>Best: {bestScore}</Text>
        )}
      </View>

      {lastEquation && (
        <View style={styles.lastEquationContainer}>
          <Text style={styles.endReasonText}>
            {endReason === 'timeout' ? '⏱️ Time ran out' : '❌ Wrong answer'}
          </Text>
          <Text style={styles.lastEquationText}>
            {lastEquation.left} {lastEquation.operator} {lastEquation.right} = {lastEquation.result}
          </Text>
          <Text style={styles.correctAnswerText}>
            {lastEquation.isCorrect ? 'This was TRUE' : 'This was FALSE'}
          </Text>
        </View>
      )}

      <View style={styles.buttonsContainer}>
        {!submitSuccess && !useGameCenter && (
          <TouchableOpacity
            style={[styles.button, styles.submitButton]}
            onPress={handleShowModal}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonText}>📝 Submit to Local Leaderboard</Text>
          </TouchableOpacity>
        )}

        {submitSuccess && !useGameCenter && (
          <View style={styles.successContainer}>
            <Text style={styles.successText}>✅ Score submitted!</Text>
          </View>
        )}

        {submitError && !useGameCenter && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{submitError}</Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.button, styles.playAgainButton]}
          onPress={onPlayAgain}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Play Again</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.menuButton]}
          onPress={onBackToMenu}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Main Menu</Text>
        </TouchableOpacity>
      </View>

      {!useGameCenter && (
        <UsernameModal
          visible={showUsernameModal}
          score={score}
          onSubmit={handleSubmitScore}
          onCancel={() => setShowUsernameModal(false)}
          isSubmitting={isSubmitting}
        />
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#1a1a2e',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  scoreContainer: {
    backgroundColor: '#16213e',
    padding: 30,
    borderRadius: 20,
    marginBottom: 40,
    alignItems: 'center',
    minWidth: 280,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  scoreLabel: {
    fontSize: 20,
    color: '#aaa',
    marginBottom: 10,
  },
  scoreValue: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#fff',
  },
  bestScoreText: {
    fontSize: 16,
    color: '#aaa',
    marginTop: 8,
  },
  gradeBadge: {
    paddingVertical: 14,
    paddingHorizontal: 36,
    borderRadius: 16,
    marginBottom: 16,
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.7,
    shadowRadius: 20,
    elevation: 10,
  },
  gradeText: {
    fontSize: 52,
    fontWeight: 'bold',
    color: '#fff',
    letterSpacing: 3,
  },
  gradeSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  message: {
    fontSize: 16,
    color: '#aaa',
    fontWeight: '600',
    textAlign: 'center',
  },
  lastEquationContainer: {
    backgroundColor: '#16213e',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 30,
    minWidth: 280,
  },
  endReasonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff8a65',
    marginBottom: 8,
  },
  lastEquationText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  correctAnswerText: {
    fontSize: 14,
    color: '#aaa',
  },
  buttonsContainer: {
    width: '100%',
    maxWidth: 800,
    gap: 15,
    alignSelf: 'center',
  },
  button: {
    paddingVertical: 18,
    paddingHorizontal: 40,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 6,
    elevation: 5,
  },
  submitButton: {
    backgroundColor: '#FFA500',
  },
  playAgainButton: {
    backgroundColor: '#4CAF50',
  },
  menuButton: {
    backgroundColor: '#555',
  },
  buttonDisabled: {
    opacity: 0.5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
  successContainer: {
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  successText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  errorContainer: {
    backgroundColor: '#ff4444',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  errorText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});
