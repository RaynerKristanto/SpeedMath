import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { GameScreen } from './src/screens/GameScreen';
import { GameOverScreen } from './src/screens/GameOverScreen';

type Screen = 'home' | 'game' | 'gameOver' | 'multiplayer';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [finalScore, setFinalScore] = useState(0);

  const handleStartGame = () => {
    setCurrentScreen('game');
  };

  const handleGameOver = (score: number) => {
    setFinalScore(score);
    setCurrentScreen('gameOver');
  };

  const handlePlayAgain = () => {
    setCurrentScreen('game');
  };

  const handleBackToMenu = () => {
    setCurrentScreen('home');
  };

  const handleMultiplayer = () => {
    // Placeholder for multiplayer functionality
    alert('Multiplayer coming soon!');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            onStartGame={handleStartGame}
            onMultiplayer={handleMultiplayer}
          />
        );
      case 'game':
        return <GameScreen onGameOver={handleGameOver} />;
      case 'gameOver':
        return (
          <GameOverScreen
            score={finalScore}
            onPlayAgain={handlePlayAgain}
            onBackToMenu={handleBackToMenu}
          />
        );
      default:
        return (
          <HomeScreen
            onStartGame={handleStartGame}
            onMultiplayer={handleMultiplayer}
          />
        );
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      {renderScreen()}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
});
