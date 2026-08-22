import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, ScrollView } from 'react-native';
import { UsernameModal } from '../components/UsernameModal';
import { submitScore, isGameCenterAuthenticated, fetchPlayerBestScore, isLeaderboardSupported } from '../services/leaderboardService';
import { LastEquation, GameEndReason } from './GameScreen';
import { useTranslation } from '../i18n/LanguageContext';
import type { MessageTier, TranslationKey } from '../i18n/translations';

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
  const { t, messagesForTier } = useTranslation();
  const [showUsernameModal, setShowUsernameModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitErrorKey, setSubmitErrorKey] = useState<TranslationKey | null>(null);
  const [bestScore, setBestScore] = useState<number | null>(null);

  const useGameCenter = Platform.OS === 'ios' && isGameCenterAuthenticated();

  useEffect(() => {
    if (useGameCenter && isLeaderboardSupported(timeLimit)) {
      submitScore(score, undefined, timeLimit).then((result) => {
        if (result.success) {
          setSubmitSuccess(true);
        } else {
          setSubmitErrorKey(result.errorKey ?? 'errorSubmitFailed');
        }
      });
      fetchPlayerBestScore(timeLimit).then((result) => {
        setBestScore(result.score);
      });
    }
  }, []);

  const handleSubmitScore = async (username: string) => {
    setIsSubmitting(true);
    setSubmitErrorKey(null);

    const result = await submitScore(score, username, timeLimit);

    setIsSubmitting(false);

    if (result.success) {
      setSubmitSuccess(true);
      setShowUsernameModal(false);
    } else {
      setSubmitErrorKey(result.errorKey ?? 'errorSubmitFailed');
    }
  };

  const handleShowModal = () => {
    setShowUsernameModal(true);
    setSubmitSuccess(false);
    setSubmitErrorKey(null);
  };
  const grade = score >= 300 ? 'S+++' : score >= 200 ? 'S++' : score >= 100 ? 'S' : score >= 40 ? 'A' : score >= 20 ? 'B' : score >= 10 ? 'C' : 'F';
  const gradeColor = score >= 200 ? '#FF2D55' : score >= 100 ? '#AF52DE' : score >= 40 ? '#FFD700' : score >= 20 ? '#4CAF50' : score >= 10 ? '#2196F3' : '#ff4444';

  const messageTier: MessageTier =
    score >= 300 ? 'sPlusPlusPlus'
    : score >= 200 ? 'sPlusPlus'
    : score >= 100 ? 's'
    : score >= 40 ? 'a'
    : score >= 20 ? 'b'
    : score >= 10 ? 'c'
    : 'f';

  const tierMessages = messagesForTier(messageTier);
  const [messageIndex] = useState(() => Math.floor(Math.random() * tierMessages.length));
  const message = tierMessages[messageIndex % tierMessages.length];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.gradeSection}>
        <View style={[styles.gradeBadge, { backgroundColor: gradeColor, shadowColor: gradeColor }]}>
          <Text style={styles.gradeText}>{grade}</Text>
        </View>
        <Text style={styles.message}>{message}</Text>
      </View>

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>{t('finalScore')}</Text>
        <Text style={styles.scoreValue}>{score}</Text>
        {bestScore !== null && (
          <Text style={styles.bestScoreText}>{t('bestScore', { score: bestScore })}</Text>
        )}
      </View>

      {lastEquation && (
        <View style={styles.lastEquationContainer}>
          <Text style={styles.endReasonText}>
            {endReason === 'timeout' ? t('timeRanOut') : t('wrongAnswer')}
          </Text>
          <Text style={styles.lastEquationText}>
            {lastEquation.left} {lastEquation.operator} {lastEquation.right} = {lastEquation.result}
          </Text>
          <Text style={styles.correctAnswerText}>
            {lastEquation.isCorrect ? t('thisWasTrue') : t('thisWasFalse')}
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
            <Text style={styles.buttonText}>{t('submitToLocalLeaderboard')}</Text>
          </TouchableOpacity>
        )}

        {submitSuccess && !useGameCenter && (
          <View style={styles.successContainer}>
            <Text style={styles.successText}>{t('scoreSubmitted')}</Text>
          </View>
        )}

        {submitErrorKey && !useGameCenter && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{t(submitErrorKey)}</Text>
          </View>
        )}

        <TouchableOpacity
          style={[styles.button, styles.playAgainButton]}
          onPress={onPlayAgain}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>{t('playAgain')}</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.menuButton]}
          onPress={onBackToMenu}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>{t('mainMenu')}</Text>
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
