import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

export const AnimatedGradientBackground: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const anim = useRef(new Animated.Value(0)).current;
  const [pos, setPos] = useState({ startX: 0, startY: 0, endX: 1, endY: 1 });

  useEffect(() => {
    const listener = anim.addListener(({ value }) => {
      const angle = value * Math.PI * 2;
      setPos({
        startX: 0.5 + 0.5 * Math.cos(angle),
        startY: 0.5 + 0.5 * Math.sin(angle),
        endX: 0.5 - 0.5 * Math.cos(angle),
        endY: 0.5 - 0.5 * Math.sin(angle),
      });
    });

    const loop = Animated.loop(
      Animated.timing(anim, {
        toValue: 1,
        duration: 8000,
        useNativeDriver: false,
      })
    );
    loop.start();

    return () => {
      anim.removeListener(listener);
      loop.stop();
    };
  }, []);

  return (
    <LinearGradient
      colors={['#080810', '#4560ab']}
      start={{ x: pos.startX, y: pos.startY }}
      end={{ x: pos.endX, y: pos.endY }}
      style={styles.gradient}
    >
      {children}
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
});
