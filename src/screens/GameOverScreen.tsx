import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface GameOverScreenProps {
  score: number;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

export const GameOverScreen: React.FC<GameOverScreenProps> = ({
  score,
  onPlayAgain,
  onBackToMenu,
}) => {
  const getMessage = () => {
    if (score === 0) return 'Better luck next time!';
    if (score < 5) return 'Not bad!';
    if (score < 10) return 'Good job!';
    if (score < 20) return 'Impressive!';
    if (score < 30) return 'Amazing!';
    return 'You are a math genius!';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.gameOverText}>Game Over</Text>

      <View style={styles.scoreContainer}>
        <Text style={styles.scoreLabel}>Final Score</Text>
        <Text style={styles.scoreValue}>{score}</Text>
        <Text style={styles.message}>{getMessage()}</Text>
      </View>

      <View style={styles.buttonsContainer}>
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
  gameOverText: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#ff4444',
    marginBottom: 40,
  },
  scoreContainer: {
    backgroundColor: '#16213e',
    padding: 40,
    borderRadius: 20,
    marginBottom: 60,
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
    marginBottom: 20,
  },
  message: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: '600',
  },
  buttonsContainer: {
    width: '100%',
    gap: 15,
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
  playAgainButton: {
    backgroundColor: '#4CAF50',
  },
  menuButton: {
    backgroundColor: '#555',
  },
  buttonText: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
  },
});
