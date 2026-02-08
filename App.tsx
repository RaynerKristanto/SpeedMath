import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { View, StyleSheet } from 'react-native';
import { HomeScreen } from './src/screens/HomeScreen';
import { GameScreen } from './src/screens/GameScreen';
import { GameOverScreen } from './src/screens/GameOverScreen';
import { MultiplayerModeSelectScreen } from './src/screens/MultiplayerModeSelectScreen';
import { MultiplayerGameScreen } from './src/screens/MultiplayerGameScreen';
import { CompetitiveMultiplayerGameScreen } from './src/screens/CompetitiveMultiplayerGameScreen';
import { MultiplayerGameOverScreen } from './src/screens/MultiplayerGameOverScreen';
import { SettingsScreen } from './src/screens/SettingsScreen';

type Screen =
  | 'home'
  | 'game'
  | 'gameOver'
  | 'multiplayerModeSelect'
  | 'multiplayerCoop'
  | 'multiplayerCompetitive'
  | 'multiplayerGameOver'
  | 'settings';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [finalScore, setFinalScore] = useState(0);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [lastMultiplayerMode, setLastMultiplayerMode] = useState<
    'multiplayerCoop' | 'multiplayerCompetitive'
  >('multiplayerCoop');
  const [timeLimit, setTimeLimit] = useState(1000);

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
    setCurrentScreen('multiplayerModeSelect');
  };

  const handleSelectCoOp = () => {
    setLastMultiplayerMode('multiplayerCoop');
    setCurrentScreen('multiplayerCoop');
  };

  const handleSelectCompetitive = () => {
    setLastMultiplayerMode('multiplayerCompetitive');
    setCurrentScreen('multiplayerCompetitive');
  };

  const handleMultiplayerGameOver = (p1Score: number, p2Score: number) => {
    setPlayer1Score(p1Score);
    setPlayer2Score(p2Score);
    setCurrentScreen('multiplayerGameOver');
  };

  const handleMultiplayerPlayAgain = () => {
    setCurrentScreen(lastMultiplayerMode);
  };

  const handleSettings = () => {
    setCurrentScreen('settings');
  };

  const handleTimeLimitChange = (newTimeLimit: number) => {
    setTimeLimit(newTimeLimit);
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen
            onStartGame={handleStartGame}
            onMultiplayer={handleMultiplayer}
            onSettings={handleSettings}
          />
        );
      case 'game':
        return <GameScreen onGameOver={handleGameOver} timeLimit={timeLimit} />;
      case 'gameOver':
        return (
          <GameOverScreen
            score={finalScore}
            onPlayAgain={handlePlayAgain}
            onBackToMenu={handleBackToMenu}
          />
        );
      case 'multiplayerModeSelect':
        return (
          <MultiplayerModeSelectScreen
            onSelectCoOp={handleSelectCoOp}
            onSelectCompetitive={handleSelectCompetitive}
            onBack={handleBackToMenu}
          />
        );
      case 'multiplayerCoop':
        return (
          <MultiplayerGameScreen
            onGameOver={handleMultiplayerGameOver}
            timeLimit={timeLimit}
          />
        );
      case 'multiplayerCompetitive':
        return (
          <CompetitiveMultiplayerGameScreen
            onGameOver={handleMultiplayerGameOver}
            timeLimit={timeLimit}
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
            onBack={handleBackToMenu}
          />
        );
      default:
        return (
          <HomeScreen
            onStartGame={handleStartGame}
            onMultiplayer={handleMultiplayer}
            onSettings={handleSettings}
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
