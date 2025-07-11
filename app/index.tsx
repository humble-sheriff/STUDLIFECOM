import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withTiming, 
  withRepeat, 
  withSequence 
} from 'react-native-reanimated';

const { width, height } = Dimensions.get('window');

export default function LandingPage() {
  const logoScale = useSharedValue(0.8);
  const fadeIn = useSharedValue(0);

  useEffect(() => {
    // Animate logo entrance
    logoScale.value = withSequence(
      withTiming(1.1, { duration: 800 }),
      withTiming(1, { duration: 400 })
    );
    
    // Fade in content
    fadeIn.value = withTiming(1, { duration: 1000 });
  }, []);

  const logoAnimatedStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: logoScale.value }],
    };
  });

  const contentAnimatedStyle = useAnimatedStyle(() => {
    return {
      opacity: fadeIn.value,
    };
  });

  const features = [
    {
      icon: 'school',
      title: 'AI Study Assistant',
      description: 'Get personalized help with your coursework',
      color: '#BB0000',
    },
    {
      icon: 'wallet',
      title: 'Smart Budgeting',
      description: 'Track expenses and find scholarships',
      color: '#228B22',
    },
    {
      icon: 'people',
      title: 'Campus Community',
      description: 'Connect with classmates and study groups',
      color: '#FFD700',
    },
    {
      icon: 'analytics',
      title: 'Progress Tracking',
      description: 'Monitor your academic journey',
      color: '#87CEEB',
    },
  ];

  return (
    <SafeAreaView style={styles.container}>
      {/* Hero Section */}
      <LinearGradient
        colors={['#BB0000', '#FF6B6B', '#FFD700']}
        style={styles.heroSection}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        
        <Animated.View style={[styles.logoContainer, logoAnimatedStyle]}>
          <View style={styles.logoBackground}>
            <Ionicons name="school" size={60} color="#fff" />
          </View>
        </Animated.View>

        <Animated.View style={[styles.heroContent, contentAnimatedStyle]}>
          <Text style={styles.heroTitle}>StudentLife AI</Text>
          <Text style={styles.heroSubtitle}>Kenya Edition</Text>
          <Text style={styles.heroDescription}>
            Your AI-powered campus companion for academic excellence, 
            financial wellness, and social connection
          </Text>
        </Animated.View>

        {/* Floating Elements */}
        <View style={styles.floatingElements}>
          <View style={[styles.floatingIcon, { top: 100, right: 30 }]}>
            <Ionicons name="book" size={20} color="#fff" />
          </View>
          <View style={[styles.floatingIcon, { top: 200, left: 40 }]}>
            <Ionicons name="calculator" size={18} color="#fff" />
          </View>
          <View style={[styles.floatingIcon, { bottom: 150, right: 50 }]}>
            <Ionicons name="people" size={22} color="#fff" />
          </View>
        </View>
      </LinearGradient>

      {/* Features Section */}
      <Animated.View style={[styles.featuresSection, contentAnimatedStyle]}>
        <Text style={styles.featuresTitle}>Everything you need to succeed</Text>
        
        <View style={styles.featuresGrid}>
          {features.map((feature, index) => (
            <View key={index} style={styles.featureCard}>
              <View style={[styles.featureIcon, { backgroundColor: feature.color + '20' }]}>
                <Ionicons name={feature.icon as any} size={28} color={feature.color} />
              </View>
              <Text style={styles.featureTitle}>{feature.title}</Text>
              <Text style={styles.featureDescription}>{feature.description}</Text>
            </View>
          ))}
        </View>

        {/* Testimonial */}
        <View style={styles.testimonialCard}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2' }}
            style={styles.testimonialAvatar}
          />
          <View style={styles.testimonialContent}>
            <Text style={styles.testimonialText}>
              "StudentLife AI helped me improve my GPA by 0.5 points and saved me KSh 5,000 on textbooks!"
            </Text>
            <Text style={styles.testimonialAuthor}>- Sarah W., University of Nairobi</Text>
          </View>
        </View>

        {/* University Partnerships */}
        <View style={styles.partnershipsSection}>
          <Text style={styles.partnershipsTitle}>Trusted by students at</Text>
          <View style={styles.universityLogos}>
            <View style={styles.universityLogo}>
              <Text style={styles.universityText}>UoN</Text>
            </View>
            <View style={styles.universityLogo}>
              <Text style={styles.universityText}>KU</Text>
            </View>
            <View style={styles.universityLogo}>
              <Text style={styles.universityText}>JKUAT</Text>
            </View>
            <View style={styles.universityLogo}>
              <Text style={styles.universityText}>Moi</Text>
            </View>
          </View>
        </View>
      </Animated.View>

      {/* Action Buttons */}
      <Animated.View style={[styles.actionSection, contentAnimatedStyle]}>
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => router.push('/auth/signup')}>
          <LinearGradient
            colors={['#BB0000', '#FF6B6B']}
            style={styles.primaryGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>
            <Text style={styles.primaryButtonText}>Start Your Journey</Text>
            <Ionicons name="arrow-forward" size={20} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.secondaryButton}
          onPress={() => router.push('/auth/login')}>
          <Text style={styles.secondaryButtonText}>Already have an account? Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.demoButton}
          onPress={() => router.replace('/(tabs)')}>
          <Ionicons name="play-circle" size={20} color="#BB0000" />
          <Text style={styles.demoButtonText}>See How It Works</Text>
        </TouchableOpacity>
      </Animated.View>

      {/* Language Selector */}
      <View style={styles.languageSelector}>
        <TouchableOpacity style={styles.languageButton}>
          <Ionicons name="language" size={16} color="#666" />
          <Text style={styles.languageText}>English</Text>
        </TouchableOpacity>
        <Text style={styles.languageDivider}>|</Text>
        <TouchableOpacity style={styles.languageButton}>
          <Text style={styles.languageText}>Kiswahili</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  heroSection: {
    height: height * 0.5,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    position: 'relative',
  },
  logoContainer: {
    marginBottom: 30,
  },
  logoBackground: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  heroContent: {
    alignItems: 'center',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginBottom: 5,
  },
  heroSubtitle: {
    fontSize: 18,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 20,
  },
  heroDescription: {
    fontSize: 16,
    color: '#fff',
    textAlign: 'center',
    lineHeight: 24,
    opacity: 0.9,
    maxWidth: 300,
  },
  floatingElements: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
  floatingIcon: {
    position: 'absolute',
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  featuresSection: {
    flex: 1,
    padding: 20,
  },
  featuresTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#36454F',
    textAlign: 'center',
    marginBottom: 25,
  },
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  featureCard: {
    width: (width - 50) / 2,
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  featureIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
    textAlign: 'center',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
    lineHeight: 18,
  },
  testimonialCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  testimonialAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  testimonialContent: {
    flex: 1,
  },
  testimonialText: {
    fontSize: 14,
    color: '#36454F',
    fontStyle: 'italic',
    lineHeight: 20,
    marginBottom: 8,
  },
  testimonialAuthor: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  partnershipsSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  partnershipsTitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 15,
  },
  universityLogos: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  universityLogo: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  universityText: {
    fontSize: 10,
    fontWeight: 'bold',
    color: '#666',
  },
  actionSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  primaryButton: {
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
  primaryGradient: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 18,
    paddingHorizontal: 30,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  secondaryButton: {
    alignItems: 'center',
    paddingVertical: 15,
    marginBottom: 10,
  },
  secondaryButtonText: {
    fontSize: 16,
    color: '#666',
    textDecorationLine: 'underline',
  },
  demoButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 12,
  },
  demoButtonText: {
    fontSize: 16,
    color: '#BB0000',
    fontWeight: '600',
    marginLeft: 8,
  },
  languageSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  languageButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  languageText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 5,
  },
  languageDivider: {
    fontSize: 14,
    color: '#ccc',
    marginHorizontal: 10,
  },
});