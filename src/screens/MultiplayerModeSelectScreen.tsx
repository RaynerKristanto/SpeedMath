import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface MultiplayerModeSelectScreenProps {
  onSelectCoOp: () => void;
  onSelectCompetitive: () => void;
  onBack: () => void;
}

export const MultiplayerModeSelectScreen: React.FC<
  MultiplayerModeSelectScreenProps
> = ({ onSelectCoOp, onSelectCompetitive, onBack }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Choose Mode</Text>

      <View style={styles.modesContainer}>
        <TouchableOpacity
          style={[styles.modeCard, styles.coopCard]}
          onPress={onSelectCoOp}
          activeOpacity={0.8}
        >
          <Text style={styles.modeTitle}>Co-op Mode</Text>
          <Text style={styles.modeDescription}>
            • Same equation for both players{'\n'}
            • Work together to get it right{'\n'}
            • Game ends if either player fails
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.modeCard, styles.competitiveCard]}
          onPress={onSelectCompetitive}
          activeOpacity={0.8}
        >
          <Text style={styles.modeTitle}>Competitive Mode</Text>
          <Text style={styles.modeDescription}>
            • Different equations for each player{'\n'}
            • Compete for the highest score{'\n'}
            • If one fails, the other continues
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity
        style={styles.backButton}
        onPress={onBack}
        activeOpacity={0.8}
      >
        <Text style={styles.backButtonText}>← Back</Text>
      </TouchableOpacity>
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
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 50,
  },
  modesContainer: {
    width: '100%',
    gap: 20,
    marginBottom: 40,
  },
  modeCard: {
    padding: 25,
    borderRadius: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  coopCard: {
    backgroundColor: '#2196F3',
  },
  competitiveCard: {
    backgroundColor: '#ff9800',
  },
  modeTitle: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 12,
  },
  modeDescription: {
    fontSize: 15,
    color: '#fff',
    lineHeight: 22,
    opacity: 0.95,
  },
  backButton: {
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 20,
  },
  backButtonText: {
    color: '#aaa',
    fontSize: 18,
  },
});
