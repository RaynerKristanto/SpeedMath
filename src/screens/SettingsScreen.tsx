import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
  Switch,
} from 'react-native';
import Slider from '@react-native-community/slider';

import { NO_TIME_LIMIT } from '../types/game';
import { useTranslation } from '../i18n/LanguageContext';
import { LANGUAGE_OPTIONS } from '../i18n/translations';

const { width } = Dimensions.get('window');

const MIN_SECONDS = 1;
const MAX_SECONDS = 15;

interface SettingsScreenProps {
  currentTimeLimit: number;
  lastTimedLimit: number;
  onTimeLimitChange: (timeLimit: number) => void;
  trueButtonOnLeft: boolean;
  onButtonLayoutChange: (trueOnLeft: boolean) => void;
  onBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  currentTimeLimit,
  lastTimedLimit,
  onTimeLimitChange,
  trueButtonOnLeft,
  onButtonLayoutChange,
  onBack,
}) => {

  const { t, language, setLanguage } = useTranslation();

  const isUntimed = currentTimeLimit === NO_TIME_LIMIT;

  // While the toggle is on the slider keeps showing the limit we'll restore.
  const seconds = (isUntimed ? lastTimedLimit : currentTimeLimit) / 1000;

  const handleSecondsChange = (value: number) => {
    onTimeLimitChange(value * 1000);
  };

  const handleNoTimeLimitChange = (enabled: boolean) => {
    onTimeLimitChange(enabled ? NO_TIME_LIMIT : lastTimedLimit);
  };

  const buttonLayoutOptions = [
    { label: t('trueOnLeft'), value: true },
    { label: t('trueOnRight'), value: false },
  ];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#1a1a2e',
    },
    scrollContent: {
      flexGrow: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
      minHeight: '100%',
    },
    contentContainer: {
      width: '100%',
      maxWidth: 800,
    },
    title: {
      fontSize: 48,
      fontWeight: 'bold',
      color: '#fff',
      textAlign: 'center',
      marginBottom: 40,
    },
    section: {
      marginBottom: 40,
    },
    sectionTitle: {
      fontSize: 24,
      fontWeight: 'bold',
      color: '#fff',
      marginBottom: 8,
    },
    sectionDescription: {
      fontSize: 16,
      color: '#aaa',
      marginBottom: 20,
    },
    optionsContainer: {
      gap: 12,
    },
    sliderRow: {
      backgroundColor: '#16213e',
      borderRadius: 12,
      paddingVertical: 16,
      paddingHorizontal: 20,
      marginBottom: 12,
    },
    sliderDisabled: {
      opacity: 0.4,
    },
    sliderValue: {
      fontSize: 28,
      fontWeight: 'bold',
      color: '#4CAF50',
      textAlign: 'center',
      marginBottom: 8,
    },
    slider: {
      width: '100%',
      height: 40,
    },
    sliderBounds: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    sliderBoundText: {
      fontSize: 14,
      color: '#aaa',
    },
    toggleRow: {
      backgroundColor: '#16213e',
      padding: 20,
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'transparent',
    },
    optionButton: {
      backgroundColor: '#16213e',
      padding: 20,
      borderRadius: 12,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'transparent',
    },
    optionButtonSelected: {
      backgroundColor: '#16213e',
      borderColor: '#4CAF50',
    },
    optionText: {
      fontSize: 20,
      color: '#fff',
      fontWeight: '600',
    },
    optionTextSelected: {
      color: '#4CAF50',
    },
    checkmark: {
      width: 28,
      height: 28,
      borderRadius: 14,
      backgroundColor: '#4CAF50',
      justifyContent: 'center',
      alignItems: 'center',
    },
    checkmarkText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    backButton: {
      backgroundColor: '#16213e',
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 20,
    },
    backButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={styles.container}>
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.contentContainer}>
        <Text style={styles.title}>{t('settings')}</Text>

        <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('timePerQuestion')}</Text>
        <Text style={styles.sectionDescription}>
          {t('timePerQuestionDescription')}
        </Text>

        <View style={[styles.sliderRow, isUntimed && styles.sliderDisabled]}>
          <Text style={styles.sliderValue}>
            {t('secondsShort', { count: seconds })}
          </Text>
          <Slider
            style={styles.slider}
            minimumValue={MIN_SECONDS}
            maximumValue={MAX_SECONDS}
            step={1}
            value={seconds}
            onValueChange={handleSecondsChange}
            disabled={isUntimed}
            minimumTrackTintColor="#4CAF50"
            maximumTrackTintColor="#2a2a3e"
            thumbTintColor="#4CAF50"
          />
          <View style={styles.sliderBounds}>
            <Text style={styles.sliderBoundText}>
              {t('secondsShort', { count: MIN_SECONDS })}
            </Text>
            <Text style={styles.sliderBoundText}>
              {t('secondsShort', { count: MAX_SECONDS })}
            </Text>
          </View>
        </View>

        <View style={styles.toggleRow}>
          <Text style={styles.optionText}>{t('noTimeLimit')}</Text>
          <Switch
            value={isUntimed}
            onValueChange={handleNoTimeLimitChange}
            trackColor={{ false: '#2a2a3e', true: '#4CAF50' }}
            thumbColor="#fff"
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('buttonLayout')}</Text>
        <Text style={styles.sectionDescription}>
          {t('buttonLayoutDescription')}
        </Text>

        <View style={styles.optionsContainer}>
          {buttonLayoutOptions.map((option) => (
            <TouchableOpacity
              key={option.label}
              style={[
                styles.optionButton,
                trueButtonOnLeft === option.value && styles.optionButtonSelected,
              ]}
              onPress={() => onButtonLayoutChange(option.value)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.optionText,
                  trueButtonOnLeft === option.value && styles.optionTextSelected,
                ]}
              >
                {option.label}
              </Text>
              {trueButtonOnLeft === option.value && (
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>{t('language')}</Text>
        <Text style={styles.sectionDescription}>
          {t('languageDescription')}
        </Text>

        <View style={styles.optionsContainer}>
          {LANGUAGE_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionButton,
                language === option.value && styles.optionButtonSelected,
              ]}
              onPress={() => setLanguage(option.value)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.optionText,
                  language === option.value && styles.optionTextSelected,
                ]}
              >
                {option.label}
              </Text>
              {language === option.value && (
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
        activeOpacity={0.8}
      >
        <Text style={styles.backButtonText}>{t('backToMenu')}</Text>
      </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
