import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Modal,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface MoodEntry {
  date: string;
  mood: number;
  note?: string;
}

interface WellnessMetric {
  title: string;
  value: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  trend: 'up' | 'down' | 'neutral';
}

export default function WellnessTracker() {
  const [showMoodModal, setShowMoodModal] = useState(false);
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [showMeditationModal, setShowMeditationModal] = useState(false);

  const wellnessMetrics: WellnessMetric[] = [
    {
      title: 'Sleep Quality',
      value: '7.2/10',
      icon: 'moon',
      color: '#4A90E2',
      trend: 'up',
    },
    {
      title: 'Stress Level',
      value: 'Moderate',
      icon: 'pulse',
      color: '#FFD700',
      trend: 'neutral',
    },
    {
      title: 'Energy Level',
      value: 'High',
      icon: 'battery-charging',
      color: '#228B22',
      trend: 'up',
    },
    {
      title: 'Focus Score',
      value: '85%',
      icon: 'eye',
      color: '#BB0000',
      trend: 'up',
    },
  ];

  const moodEmojis = [
    { emoji: '😢', label: 'Very Sad', value: 1 },
    { emoji: '😔', label: 'Sad', value: 2 },
    { emoji: '😐', label: 'Neutral', value: 3 },
    { emoji: '😊', label: 'Happy', value: 4 },
    { emoji: '😄', label: 'Very Happy', value: 5 },
  ];

  const meditationSessions = [
    {
      title: 'Morning Mindfulness',
      duration: '10 min',
      description: 'Start your day with clarity and focus',
      icon: 'sunny',
      color: '#FFD700',
    },
    {
      title: 'Study Break Relaxation',
      duration: '5 min',
      description: 'Quick reset between study sessions',
      icon: 'book',
      color: '#4A90E2',
    },
    {
      title: 'Evening Wind Down',
      duration: '15 min',
      description: 'Prepare for restful sleep',
      icon: 'moon',
      color: '#6B46C1',
    },
    {
      title: 'Stress Relief',
      duration: '8 min',
      description: 'Release tension and anxiety',
      icon: 'heart',
      color: '#EF4444',
    },
  ];

  const supportResources = [
    {
      title: 'Campus Counseling',
      description: 'Professional mental health support',
      icon: 'people',
      color: '#228B22',
      action: 'Book Appointment',
    },
    {
      title: 'Crisis Hotline',
      description: '24/7 emergency support',
      icon: 'call',
      color: '#BB0000',
      action: 'Call Now',
    },
    {
      title: 'Peer Support Groups',
      description: 'Connect with fellow students',
      icon: 'chatbubbles',
      color: '#4A90E2',
      action: 'Join Group',
    },
    {
      title: 'Self-Help Resources',
      description: 'Articles and coping strategies',
      icon: 'library',
      color: '#FFD700',
      action: 'Browse',
    },
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return 'trending-up';
      case 'down': return 'trending-down';
      default: return 'remove';
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up': return '#228B22';
      case 'down': return '#BB0000';
      default: return '#666';
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* Header */}
      <LinearGradient
        colors={['#6B46C1', '#8B5CF6']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <Text style={styles.headerTitle}>Mental Wellness</Text>
        <Text style={styles.headerSubtitle}>Take care of your mind and body</Text>
      </LinearGradient>

      {/* Quick Mood Check */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>How are you feeling today?</Text>
        <TouchableOpacity 
          style={styles.moodCheckCard}
          onPress={() => setShowMoodModal(true)}>
          <View style={styles.moodCheckContent}>
            <Text style={styles.moodCheckEmoji}>😊</Text>
            <View style={styles.moodCheckText}>
              <Text style={styles.moodCheckTitle}>Daily Mood Check</Text>
              <Text style={styles.moodCheckDesc}>Tap to record your mood</Text>
            </View>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Wellness Metrics */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Wellness Overview</Text>
        <View style={styles.metricsGrid}>
          {wellnessMetrics.map((metric, index) => (
            <View key={index} style={styles.metricCard}>
              <View style={styles.metricHeader}>
                <View style={[styles.metricIcon, { backgroundColor: metric.color + '20' }]}>
                  <Ionicons name={metric.icon} size={20} color={metric.color} />
                </View>
                <Ionicons 
                  name={getTrendIcon(metric.trend)} 
                  size={16} 
                  color={getTrendColor(metric.trend)} 
                />
              </View>
              <Text style={styles.metricValue}>{metric.value}</Text>
              <Text style={styles.metricTitle}>{metric.title}</Text>
            </View>
          ))}
        </View>
      </View>

      {/* Meditation & Mindfulness */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Meditation & Mindfulness</Text>
          <TouchableOpacity 
            style={styles.sectionAction}
            onPress={() => setShowMeditationModal(true)}>
            <Text style={styles.sectionActionText}>View All</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          {meditationSessions.map((session, index) => (
            <TouchableOpacity key={index} style={styles.meditationCard}>
              <LinearGradient
                colors={[session.color, session.color + 'CC']}
                style={styles.meditationGradient}
                start={{ x: 0, y: 0 }}
                end={{ x: 1, y: 1 }}>
                <Ionicons name={session.icon} size={32} color="#fff" />
                <Text style={styles.meditationTitle}>{session.title}</Text>
                <Text style={styles.meditationDuration}>{session.duration}</Text>
                <Text style={styles.meditationDesc}>{session.description}</Text>
              </LinearGradient>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Support Resources */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support Resources</Text>
        {supportResources.map((resource, index) => (
          <TouchableOpacity key={index} style={styles.resourceCard}>
            <View style={[styles.resourceIcon, { backgroundColor: resource.color + '20' }]}>
              <Ionicons name={resource.icon} size={24} color={resource.color} />
            </View>
            <View style={styles.resourceContent}>
              <Text style={styles.resourceTitle}>{resource.title}</Text>
              <Text style={styles.resourceDesc}>{resource.description}</Text>
            </View>
            <TouchableOpacity style={[styles.resourceAction, { backgroundColor: resource.color }]}>
              <Text style={styles.resourceActionText}>{resource.action}</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
      </View>

      {/* Mood Tracking Modal */}
      <Modal
        visible={showMoodModal}
        animationType="slide"
        presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowMoodModal(false)}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>How are you feeling?</Text>
            <TouchableOpacity>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.moodModalContent}>
            <Text style={styles.moodQuestion}>Select your current mood:</Text>
            <View style={styles.moodOptions}>
              {moodEmojis.map((mood) => (
                <TouchableOpacity
                  key={mood.value}
                  style={[
                    styles.moodOption,
                    selectedMood === mood.value && styles.selectedMoodOption
                  ]}
                  onPress={() => setSelectedMood(mood.value)}>
                  <Text style={styles.moodEmoji}>{mood.emoji}</Text>
                  <Text style={styles.moodLabel}>{mood.label}</Text>
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.moodNoteSection}>
              <Text style={styles.moodNoteLabel}>Add a note (optional):</Text>
              <View style={styles.moodNoteInput}>
                <Text style={styles.moodNotePlaceholder}>
                  What's contributing to your mood today?
                </Text>
              </View>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Meditation Modal */}
      <Modal
        visible={showMeditationModal}
        animationType="slide"
        presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowMeditationModal(false)}>
              <Text style={styles.cancelButton}>Close</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Meditation Sessions</Text>
            <View style={styles.placeholder} />
          </View>
          
          <ScrollView style={styles.meditationModalContent}>
            {meditationSessions.map((session, index) => (
              <TouchableOpacity key={index} style={styles.fullMeditationCard}>
                <View style={[styles.fullMeditationIcon, { backgroundColor: session.color + '20' }]}>
                  <Ionicons name={session.icon} size={32} color={session.color} />
                </View>
                <View style={styles.fullMeditationContent}>
                  <Text style={styles.fullMeditationTitle}>{session.title}</Text>
                  <Text style={styles.fullMeditationDesc}>{session.description}</Text>
                  <Text style={styles.fullMeditationDuration}>{session.duration}</Text>
                </View>
                <TouchableOpacity style={[styles.playButton, { backgroundColor: session.color }]}>
                  <Ionicons name="play" size={20} color="#fff" />
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </SafeAreaView>
      </Modal>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    padding: 30,
    paddingTop: 60,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  section: {
    padding: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#36454F',
  },
  sectionAction: {
    padding: 5,
  },
  sectionActionText: {
    fontSize: 14,
    color: '#6B46C1',
    fontWeight: '600',
  },
  moodCheckCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  moodCheckContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  moodCheckEmoji: {
    fontSize: 40,
    marginRight: 15,
  },
  moodCheckText: {
    flex: 1,
  },
  moodCheckTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 4,
  },
  moodCheckDesc: {
    fontSize: 14,
    color: '#666',
  },
  metricsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  metricCard: {
    width: (width - 50) / 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  metricIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  metricValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 4,
  },
  metricTitle: {
    fontSize: 12,
    color: '#666',
  },
  meditationCard: {
    width: 200,
    marginRight: 15,
    borderRadius: 16,
    overflow: 'hidden',
  },
  meditationGradient: {
    padding: 20,
    height: 160,
    justifyContent: 'center',
    alignItems: 'center',
  },
  meditationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
    textAlign: 'center',
    marginTop: 10,
    marginBottom: 5,
  },
  meditationDuration: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    marginBottom: 8,
  },
  meditationDesc: {
    fontSize: 12,
    color: '#fff',
    opacity: 0.8,
    textAlign: 'center',
  },
  resourceCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resourceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  resourceContent: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 4,
  },
  resourceDesc: {
    fontSize: 14,
    color: '#666',
  },
  resourceAction: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  resourceActionText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  modal: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#36454F',
  },
  cancelButton: {
    fontSize: 16,
    color: '#666',
  },
  saveButton: {
    fontSize: 16,
    color: '#6B46C1',
    fontWeight: 'bold',
  },
  placeholder: {
    width: 60,
  },
  moodModalContent: {
    flex: 1,
    padding: 20,
  },
  moodQuestion: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#36454F',
    textAlign: 'center',
    marginBottom: 30,
  },
  moodOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 40,
  },
  moodOption: {
    alignItems: 'center',
    padding: 15,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  selectedMoodOption: {
    backgroundColor: '#6B46C1' + '20',
    borderWidth: 2,
    borderColor: '#6B46C1',
  },
  moodEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  moodLabel: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  moodNoteSection: {
    marginTop: 20,
  },
  moodNoteLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 10,
  },
  moodNoteInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    minHeight: 100,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  moodNotePlaceholder: {
    fontSize: 16,
    color: '#999',
  },
  meditationModalContent: {
    flex: 1,
    padding: 20,
  },
  fullMeditationCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  fullMeditationIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  fullMeditationContent: {
    flex: 1,
  },
  fullMeditationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 4,
  },
  fullMeditationDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  fullMeditationDuration: {
    fontSize: 12,
    color: '#999',
  },
  playButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});