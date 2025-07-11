import React, { useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  StatusBar,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  withSequence,
  withDelay,
  withSpring,
  runOnJS,
  Easing,
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function SplashScreen() {
  const logoScale = useSharedValue(0);
  const logoOpacity = useSharedValue(0);
  const titleOpacity = useSharedValue(0);
  const titleTranslateY = useSharedValue(50);
  const subtitleOpacity = useSharedValue(0);
  const subtitleTranslateY = useSharedValue(30);
  const progressWidth = useSharedValue(0);
  const progressOpacity = useSharedValue(0);
  const backgroundOpacity = useSharedValue(1);

  const navigateToLanding = () => {
    router.replace('/');
  };

  useEffect(() => {
    StatusBar.setHidden(true);
    
    // Start animations sequence
    const startAnimations = () => {
      // Logo animation
      logoOpacity.value = withTiming(1, { duration: 800 });
      logoScale.value = withSequence(
        withTiming(1.2, { duration: 600, easing: Easing.out(Easing.cubic) }),
        withSpring(1, { damping: 8, stiffness: 100 })
      );

      // Title animation
      titleOpacity.value = withDelay(400, withTiming(1, { duration: 800 }));
      titleTranslateY.value = withDelay(400, withSpring(0, { damping: 10, stiffness: 100 }));

      // Subtitle animation
      subtitleOpacity.value = withDelay(800, withTiming(1, { duration: 600 }));
      subtitleTranslateY.value = withDelay(800, withSpring(0, { damping: 10, stiffness: 100 }));

      // Progress bar animation
      progressOpacity.value = withDelay(1200, withTiming(1, { duration: 400 }));
      progressWidth.value = withDelay(1400, withTiming(100, { 
        duration: 2000,
        easing: Easing.out(Easing.cubic)
      }));

      // Navigate after animations complete
      backgroundOpacity.value = withDelay(3800, withTiming(0, { 
        duration: 500 
      }, () => {
        runOnJS(navigateToLanding)();
      }));
    };

    startAnimations();

    return () => {
      StatusBar.setHidden(false);
    };
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: logoOpacity.value,
      transform: [{ scale: logoScale.value }],
    };
  });

  const titleAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: titleOpacity.value,
      transform: [{ translateY: titleTranslateY.value }],
    };
  });

  const subtitleAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: subtitleOpacity.value,
      transform: [{ translateY: subtitleTranslateY.value }],
    };
  });

  const progressAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: progressOpacity.value,
    };
  });

  const progressBarAnimatedStyle = useAnimatedStyle(() => {
    return {
      width: `${progressWidth.value}%`,
    };
  });

  const backgroundAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: backgroundOpacity.value,
    };
  });

  return (
    <Animated.View style={[styles.container, backgroundAnimatedStyle]}>
      <LinearGradient
        colors={['#BB0000', '#FF6B6B', '#FFD700']}
        style={styles.gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        
        {/* Floating particles */}
        <View style={styles.particlesContainer}>
          <View style={[styles.particle, styles.particle1]} />
          <View style={[styles.particle, styles.particle2]} />
          <View style={[styles.particle, styles.particle3]} />
          <View style={[styles.particle, styles.particle4]} />
          <View style={[styles.particle, styles.particle5]} />
        </View>

        {/* Main content */}
        <View style={styles.content}>
          {/* Logo */}
          <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
            <View style={styles.logoBackground}>
              <Ionicons name="school" size={80} color="#fff" />
            </View>
            <View style={styles.logoGlow} />
          </Animated.View>

          {/* Title */}
          <Animated.View style={[styles.titleContainer, titleAnimatedStyle]}>
            <Text style={styles.title}>StudentLife AI</Text>
          </Animated.View>

          {/* Subtitle */}
          <Animated.View style={[styles.subtitleContainer, subtitleAnimatedStyle]}>
            <Text style={styles.subtitle}>Kenya Edition</Text>
            <Text style={styles.tagline}>Your AI-powered campus companion</Text>
          </Animated.View>

          {/* Progress indicator */}
          <Animated.View style={[styles.progressContainer, progressAnimatedStyle]}>
            <View style={styles.progressBar}>
              <Animated.View style={[styles.progressFill, progressBarAnimatedStyle]} />
            </View>
            <Text style={styles.loadingText}>Loading your experience...</Text>
          </Animated.View>
        </View>

        {/* Bottom branding */}
        <View style={styles.bottomBranding}>
          <Text style={styles.brandingText}>Empowering Kenyan Students</Text>
          <View style={styles.brandingDots}>
            <View style={styles.dot} />
            <View style={styles.dot} />
            <View style={styles.dot} />
          </View>
        </View>
      </LinearGradient>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  particlesContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  particle: {
    position: 'absolute',
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  particle1: {
    top: '20%',
    left: '15%',
    animationDelay: '0s',
  },
  particle2: {
    top: '40%',
    right: '20%',
    animationDelay: '1s',
  },
  particle3: {
    top: '60%',
    left: '25%',
    animationDelay: '2s',
  },
  particle4: {
    top: '30%',
    right: '30%',
    animationDelay: '1.5s',
  },
  particle5: {
    top: '70%',
    right: '15%',
    animationDelay: '0.5s',
  },
  content: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  logoContainer: {
    position: 'relative',
    marginBottom: 40,
  },
  logoBackground: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  logoGlow: {
    position: 'absolute',
    width: 160,
    height: 160,
    borderRadius: 80,
    backgroundColor: 'rgba(255,255,255,0.1)',
    top: -10,
    left: -10,
  },
  titleContainer: {
    marginBottom: 20,
  },
  title: {
    fontSize: 42,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 0, height: 2 },
    textShadowRadius: 4,
    letterSpacing: 1,
  },
  subtitleContainer: {
    alignItems: 'center',
    marginBottom: 60,
  },
  subtitle: {
    fontSize: 20,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 8,
    fontWeight: '600',
  },
  tagline: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.8,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  progressContainer: {
    alignItems: 'center',
    width: width * 0.7,
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 2,
    marginBottom: 15,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#fff',
    borderRadius: 2,
    shadowColor: '#fff',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.8,
    shadowRadius: 4,
  },
  loadingText: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
    textAlign: 'center',
  },
  bottomBranding: {
    position: 'absolute',
    bottom: 50,
    alignItems: 'center',
  },
  brandingText: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.7,
    marginBottom: 15,
    fontWeight: '500',
  },
  brandingDots: {
    flexDirection: 'row',
    gap: 8,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: 'rgba(255,255,255,0.5)',
  },
});