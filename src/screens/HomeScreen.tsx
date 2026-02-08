import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AnimatedGradientBackground } from '../components/AnimatedGradientBackground';

interface HomeScreenProps {
  onStartGame: () => void;
  onMultiplayer: () => void;
  onSettings: () => void;
  onLeaderboard: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartGame,
  onMultiplayer,
  onSettings,
  onLeaderboard,
}) => {
  const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
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
      maxWidth: 800,
      gap: 20,
      marginBottom: 60,
      alignSelf: 'center',
    },
    button: {
      paddingVertical: 20,
      paddingHorizontal: 40,
      borderRadius: 15,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 12,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.3,
      shadowRadius: 8,
      elevation: 5,
    },
    buttonIcon: {
      fontSize: 28,
    },
    playButton: {
      backgroundColor: '#4CAF50',
    },
    multiplayerButton: {
      backgroundColor: '#2196F3',
    },
    leaderboardButton: {
      backgroundColor: '#FFA500',
    },
    settingsButton: {
      backgroundColor: '#555',
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

  return (
    <AnimatedGradientBackground>
      <ScrollView contentContainerStyle={styles.container}>
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
            <Text style={styles.buttonIcon}>🎮</Text>
            <Text style={styles.buttonText}>Play Solo</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.multiplayerButton]}
            onPress={onMultiplayer}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonIcon}>👥</Text>
            <Text style={styles.buttonText}>Local 2-Player</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.leaderboardButton]}
            onPress={onLeaderboard}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonIcon}>🏆</Text>
            <Text style={styles.buttonText}>Leaderboard</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.settingsButton]}
            onPress={onSettings}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonIcon}>⚙️</Text>
            <Text style={styles.buttonText}>Settings</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>• Answer within 1 second</Text>
          <Text style={styles.infoText}>• Each correct answer = +1 point</Text>
          <Text style={styles.infoText}>• One mistake = Game Over</Text>
        </View>
      </ScrollView>
    </AnimatedGradientBackground>
  );
};
