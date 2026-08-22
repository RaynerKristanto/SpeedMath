import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { AnimatedGradientBackground } from '../components/AnimatedGradientBackground';
import { useTranslation } from '../i18n/LanguageContext';
import { NO_TIME_LIMIT } from '../types/game';

interface HomeScreenProps {
  onStartGame: () => void;
  onMultiplayer: () => void;
  onSettings: () => void;
  onLeaderboard: () => void;
  timeLimit: number;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  onStartGame,
  onMultiplayer,
  onSettings,
  onLeaderboard,
  timeLimit,
}) => {
  const { t } = useTranslation();
  const seconds = timeLimit / 1000;
  const timeRule =
    timeLimit === NO_TIME_LIMIT
      ? t('ruleNoTimeLimit')
      : seconds === 1
        ? t('ruleAnswerWithinOne')
        : t('ruleAnswerWithin', { seconds });
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
          <Text style={styles.title}>{t('appTitle')}</Text>
          <Text style={styles.subtitle}>{t('appSubtitle')}</Text>
        </View>

        <View style={styles.menuContainer}>
          <TouchableOpacity
            style={[styles.button, styles.playButton]}
            onPress={onStartGame}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonIcon}>🎮</Text>
            <Text style={styles.buttonText}>{t('playSolo')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.multiplayerButton]}
            onPress={onMultiplayer}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonIcon}>👥</Text>
            <Text style={styles.buttonText}>{t('localTwoPlayer')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.leaderboardButton]}
            onPress={onLeaderboard}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonIcon}>🏆</Text>
            <Text style={styles.buttonText}>{t('leaderboard')}</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.button, styles.settingsButton]}
            onPress={onSettings}
            activeOpacity={0.8}
          >
            <Text style={styles.buttonIcon}>⚙️</Text>
            <Text style={styles.buttonText}>{t('settings')}</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>{timeRule}</Text>
          <Text style={styles.infoText}>{t('ruleScoring')}</Text>
          <Text style={styles.infoText}>{t('ruleMistake')}</Text>
        </View>
      </ScrollView>
    </AnimatedGradientBackground>
  );
};
