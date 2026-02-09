import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface MultiplayerGameOverScreenProps {
  player1Score: number;
  player2Score: number;
  onPlayAgain: () => void;
  onBackToMenu: () => void;
}

export const MultiplayerGameOverScreen: React.FC<
  MultiplayerGameOverScreenProps
> = ({ player1Score, player2Score, onPlayAgain, onBackToMenu }) => {
  const getWinner = () => {
    if (player1Score > player2Score) return 'Player 1 Wins!';
    if (player2Score > player1Score) return 'Player 2 Wins!';
    return "It's a Tie!";
  };

  const getWinnerColor = () => {
    if (player1Score === player2Score) return '#ffeb3b';
    return '#4CAF50';
  };

  return (
    <View style={styles.container}>
      <View style={styles.scoresContainer}>
        <View style={styles.playerScoreBox}>
          <Text style={styles.playerLabel}>Player 1</Text>
          <Text
            style={[
              styles.scoreValue,
              player1Score > player2Score && styles.winnerScore,
            ]}
          >
            {player1Score}
          </Text>
        </View>

        <Text style={styles.vs}>VS</Text>

        <View style={styles.playerScoreBox}>
          <Text style={styles.playerLabel}>Player 2</Text>
          <Text
            style={[
              styles.scoreValue,
              player2Score > player1Score && styles.winnerScore,
            ]}
          >
            {player2Score}
          </Text>
        </View>
      </View>

      <Text style={[styles.winnerText, { color: getWinnerColor() }]}>
        {getWinner()}
      </Text>

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
    fontSize: 42,
    fontWeight: 'bold',
    color: '#ff4444',
    marginBottom: 40,
  },
  scoresContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 800,
    marginBottom: 40,
  },
  playerScoreBox: {
    backgroundColor: '#16213e',
    padding: 25,
    borderRadius: 15,
    alignItems: 'center',
    minWidth: 120,
  },
  playerLabel: {
    fontSize: 16,
    color: '#aaa',
    marginBottom: 10,
  },
  scoreValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#fff',
  },
  winnerScore: {
    color: '#4CAF50',
  },
  vs: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#aaa',
  },
  winnerText: {
    fontSize: 32,
    fontWeight: 'bold',
    marginBottom: 50,
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
