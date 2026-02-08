import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface HomeScreenProps {
  onStartGame: () => void;
  onMultiplayer: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartGame,
  onMultiplayer,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>Speed Math</Text>
        <Text style={styles.subtitle}>Can you beat the clock?</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity
          style={[styles.button, styles.playButton]}
          onPress={onStartGame}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Play Solo</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, styles.multiplayerButton]}
          onPress={onMultiplayer}
          activeOpacity={0.8}
        >
          <Text style={styles.buttonText}>Local 2-Player</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>• Answer within 1 second</Text>
        <Text style={styles.infoText}>• Each correct answer = +1 point</Text>
        <Text style={styles.infoText}>• One mistake = Game Over</Text>
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
  titleContainer: {
    marginBottom: 80,
    alignItems: 'center',
  },
  title: {
    fontSize: 56,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    color: '#aaa',
    fontStyle: 'italic',
  },
  menuContainer: {
    width: '100%',
    gap: 20,
    marginBottom: 60,
  },
  button: {
    paddingVertical: 20,
    paddingHorizontal: 40,
    borderRadius: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  playButton: {
    backgroundColor: '#4CAF50',
  },
  multiplayerButton: {
    backgroundColor: '#2196F3',
  },
  buttonText: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
  },
  infoContainer: {
    marginTop: 40,
    alignItems: 'flex-start',
  },
  infoText: {
    color: '#aaa',
    fontSize: 16,
    marginVertical: 4,
  },
});
