import React, { useState, useRef, useEffect } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet, Animated } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { GameScreen } from './src/screens/GameScreen';
import { GameOverScreen } from './src/screens/GameOverScreen';
import { CompetitiveMultiplayerGameScreen } from './src/screens/CompetitiveMultiplayerGameScreen';
import { MultiplayerGameOverScreen } from './src/screens/MultiplayerGameOverScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';
import { LeaderboardScreen } from './src/screens/LeaderboardScreen';
import { authenticateGameCenter } from './src/services/leaderboardService';

type Screen =
  | 'home'
  | 'game'
  | 'gameOver'
  | 'multiplayerCompetitive'
  | 'multiplayerGameOver'
  | 'settings'
  | 'leaderboard';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [finalScore, setFinalScore] = useState(0);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [timeLimit, setTimeLimit] = useState(1000);
  const [trueButtonOnLeft, setTrueButtonOnLeft] = useState(true);
  const fadeAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    authenticateGameCenter();
  }, []);

  useEffect(() => {
    // Fade in animation when screen changes
    fadeAnim.setValue(0);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      useNativeDriver: true,
    }).start();
  }, [currentScreen]);

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
    setCurrentScreen('multiplayerCompetitive');
  };

  const handleMultiplayerGameOver = (p1Score: number, p2Score: number) => {
    setPlayer1Score(p1Score);
    setPlayer2Score(p2Score);
    setCurrentScreen('multiplayerGameOver');
  };

  const handleMultiplayerPlayAgain = () => {
    setCurrentScreen('multiplayerCompetitive');
  };

  const handleSettings = () => {
    setCurrentScreen('settings');
  };

  const handleTimeLimitChange = (newTimeLimit: number) => {
    setTimeLimit(newTimeLimit);
  };

  const handleButtonLayoutChange = (trueOnLeft: boolean) => {
    setTrueButtonOnLeft(trueOnLeft);
  };

  const handleLeaderboard = () => {
    setCurrentScreen('leaderboard');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            onStartGame={handleStartGame}
            onMultiplayer={handleMultiplayer}
            onSettings={handleSettings}
            onLeaderboard={handleLeaderboard}
          />
        );
      case 'game':
        return <GameScreen onGameOver={handleGameOver} timeLimit={timeLimit} trueButtonOnLeft={trueButtonOnLeft} />;
      case 'gameOver':
        return (
          <GameOverScreen
            score={finalScore}
            onPlayAgain={handlePlayAgain}
            onBackToMenu={handleBackToMenu}
          />
        );
      case 'multiplayerCompetitive':
        return (
          <CompetitiveMultiplayerGameScreen
            onGameOver={handleMultiplayerGameOver}
            timeLimit={timeLimit}
            trueButtonOnLeft={trueButtonOnLeft}
          />
        );
      case 'multiplayerGameOver':
        return (
          <MultiplayerGameOverScreen
            player1Score={player1Score}
            player2Score={player2Score}
            onPlayAgain={handleMultiplayerPlayAgain}
            onBackToMenu={handleBackToMenu}
          />
        );
      case 'settings':
        return (
          <SettingsScreen
            currentTimeLimit={timeLimit}
            onTimeLimitChange={handleTimeLimitChange}
            trueButtonOnLeft={trueButtonOnLeft}
            onButtonLayoutChange={handleButtonLayoutChange}
            onBack={handleBackToMenu}
          />
        );
      case 'leaderboard':
        return <LeaderboardScreen onBack={handleBackToMenu} />;
      default:
        return (
          <HomeScreen
            onStartGame={handleStartGame}
            onMultiplayer={handleMultiplayer}
            onSettings={handleSettings}
            onLeaderboard={handleLeaderboard}
          />
        );
    }
  };

  return (
    <View style={styles.outerContainer}>
      <View style={styles.container}>
        <StatusBar style="light" />
        <Animated.View style={[styles.screenContainer, { opacity: fadeAnim }]}>
          {renderScreen()}
        </Animated.View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#1a1a2e',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 800,
    backgroundColor: '#1a1a2e',
  },
  screenContainer: {
    flex: 1,
  },
});
