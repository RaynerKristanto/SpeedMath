import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';

import { NO_TIME_LIMIT } from '../types/game';

const { width } = Dimensions.get('window');

interface SettingsScreenProps {
  currentTimeLimit: number;
  onTimeLimitChange: (timeLimit: number) => void;
  trueButtonOnLeft: boolean;
  onButtonLayoutChange: (trueOnLeft: boolean) => void;
  onBack: () => void;
}

export const SettingsScreen: React.FC<SettingsScreenProps> = ({
  currentTimeLimit,
  onTimeLimitChange,
  trueButtonOnLeft,
  onButtonLayoutChange,
  onBack,
}) => {

  const timeLimitOptions = Array.from({ length: 10 }, (_, i) => ({
    label: `${i + 1}s`,
    value: (i + 1) * 1000,
  }));

  const buttonLayoutOptions = [
    { label: 'True on Left', value: true },
    { label: 'True on Right', value: false },
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
    timeGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
      marginBottom: 12,
    },
    timeChip: {
      flexGrow: 1,
      flexBasis: 60,
      backgroundColor: '#16213e',
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      borderWidth: 2,
      borderColor: 'transparent',
    },
    timeChipSelected: {
      borderColor: '#4CAF50',
    },
    timeChipText: {
      fontSize: 18,
      color: '#fff',
      fontWeight: '600',
    },
    timeChipTextSelected: {
      color: '#4CAF50',
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
        <Text style={styles.title}>Settings</Text>

        <View style={styles.section}>
        <Text style={styles.sectionTitle}>Time Per Question</Text>
        <Text style={styles.sectionDescription}>
          How long players have to answer each question
        </Text>

        <View style={styles.timeGrid}>
          {timeLimitOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.timeChip,
                currentTimeLimit === option.value && styles.timeChipSelected,
              ]}
              onPress={() => onTimeLimitChange(option.value)}
              activeOpacity={0.7}
            >
              <Text
                style={[
                  styles.timeChipText,
                  currentTimeLimit === option.value && styles.timeChipTextSelected,
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity
          style={[
            styles.optionButton,
            currentTimeLimit === NO_TIME_LIMIT && styles.optionButtonSelected,
          ]}
          onPress={() => onTimeLimitChange(NO_TIME_LIMIT)}
          activeOpacity={0.7}
        >
          <Text
            style={[
              styles.optionText,
              currentTimeLimit === NO_TIME_LIMIT && styles.optionTextSelected,
            ]}
          >
            No Time Limit
          </Text>
          {currentTimeLimit === NO_TIME_LIMIT && (
            <View style={styles.checkmark}>
              <Text style={styles.checkmarkText}>✓</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Button Layout</Text>
        <Text style={styles.sectionDescription}>
          Position of True and False buttons
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

      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
        activeOpacity={0.8}
      >
        <Text style={styles.backButtonText}>Back to Menu</Text>
      </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};
