import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Dimensions,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import Card from '@/components/ui/Card';

const { width } = Dimensions.get('window');

interface MoodEntry {
  id: string;
  mood: number;
  date: Date;
  note?: string;
  triggers?: string[];
}

interface MoodStats {
  average: number;
  trend: 'up' | 'down' | 'stable';
  streakDays: number;
}

export default function MoodTracker() {
  const [selectedMood, setSelectedMood] = useState<number | null>(null);
  const [moodHistory, setMoodHistory] = useState<MoodEntry[]>([]);
  const [currentNote, setCurrentNote] = useState('');
  const [stats, setStats] = useState<MoodStats>({
    average: 3.5,
    trend: 'up',
    streakDays: 7,
  });

  const moodOptions = [
    { value: 1, emoji: '😢', label: 'Very Sad', color: '#DC3545' },
    { value: 2, emoji: '😔', label: 'Sad', color: '#FD7E14' },
    { value: 3, emoji: '😐', label: 'Neutral', color: '#FFC107' },
    { value: 4, emoji: '😊', label: 'Happy', color: '#28A745' },
    { value: 5, emoji: '😄', label: 'Very Happy', color: '#20C997' },
  ];

  const commonTriggers = [
    'Exams', 'Assignments', 'Social Events', 'Family', 'Health',
    'Weather', 'Sleep', 'Exercise', 'Friends', 'Money'
  ];

  const crisisResources = [
    {
      title: 'Campus Counseling',
      phone: '+254-20-123-4567',
      description: 'Professional counseling services',
      available: '24/7',
    },
    {
      title: 'Kenya Crisis Helpline',
      phone: '1199',
      description: 'National mental health support',
      available: '24/7',
    },
    {
      title: 'Befrienders Kenya',
      phone: '+254-722-178-177',
      description: 'Emotional support and suicide prevention',
      available: '24/7',
    },
  ];

  useEffect(() => {
    // Load mood history
    loadMoodHistory();
  }, []);

  const loadMoodHistory = () => {
    // Simulate loading mood history
    const mockHistory: MoodEntry[] = [
      { id: '1', mood: 4, date: new Date(Date.now() - 86400000), note: 'Good day at university' },
      { id: '2', mood: 3, date: new Date(Date.now() - 172800000), note: 'Stressful exam' },
      { id: '3', mood: 5, date: new Date(Date.now() - 259200000), note: 'Great weekend with friends' },
    ];
    setMoodHistory(mockHistory);
  };

  const saveMoodEntry = () => {
    if (selectedMood === null) {
      Alert.alert('Please select a mood', 'Choose how you\'re feeling today');
      return;
    }

    const newEntry: MoodEntry = {
      id: Date.now().toString(),
      mood: selectedMood,
      date: new Date(),
      note: currentNote,
    };

    setMoodHistory(prev => [newEntry, ...prev]);
    setSelectedMood(null);
    setCurrentNote('');
    
    // Check for crisis intervention
    if (selectedMood <= 2) {
      showCrisisSupport();
    } else {
      Alert.alert('Mood Saved', 'Thank you for tracking your mood today!');
    }
  };

  const showCrisisSupport = () => {
    Alert.alert(
      'We\'re here to help',
      'It looks like you\'re having a difficult time. Would you like to access support resources?',
      [
        { text: 'Not now', style: 'cancel' },
        { text: 'Get Support', onPress: () => showSupportResources() },
      ]
    );
  };

  const showSupportResources = () => {
    Alert.alert(
      'Crisis Support Resources',
      crisisResources.map(resource => 
        `${resource.title}\n${resource.phone}\n${resource.description}\nAvailable: ${resource.available}\n`
      ).join('\n'),
      [
        { text: 'Call Campus Counseling', onPress: () => callSupport(crisisResources[0].phone) },
        { text: 'Call Crisis Helpline', onPress: () => callSupport(crisisResources[1].phone) },
        { text: 'Close' },
      ]
    );
  };

  const callSupport = (phoneNumber: string) => {
    Alert.alert('Calling Support', `Calling ${phoneNumber}...`);
    // In a real app, this would use Linking.openURL(`tel:${phoneNumber}`)
  };

  const getMoodColor = (mood: number) => {
    const moodOption = moodOptions.find(option => option.value === mood);
    return moodOption?.color || '#666';
  };

  const getMoodEmoji = (mood: number) => {
    const moodOption = moodOptions.find(option => option.value === mood);
    return moodOption?.emoji || '😐';
  };

  const renderMoodSelector = () => (
    <Card style={styles.selectorCard}>
      <Text style={styles.selectorTitle}>How are you feeling today?</Text>
      <View style={styles.moodOptions}>
        {moodOptions.map((option) => (
          <TouchableOpacity
            key={option.value}
            style={[
              styles.moodOption,
              selectedMood === option.value && styles.selectedMoodOption,
              { borderColor: option.color }
            ]}
            onPress={() => setSelectedMood(option.value)}>
            <Text style={styles.moodEmoji}>{option.emoji}</Text>
            <Text style={[styles.moodLabel, { color: option.color }]}>
              {option.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <TouchableOpacity style={styles.saveButton} onPress={saveMoodEntry}>
        <LinearGradient
          colors={['#6B46C1', '#8B5CF6']}
          style={styles.saveGradient}>
          <Text style={styles.saveButtonText}>Save Mood</Text>
        </LinearGradient>
      </TouchableOpacity>
    </Card>
  );

  const renderMoodStats = () => (
    <Card style={styles.statsCard}>
      <Text style={styles.statsTitle}>Your Mood Insights</Text>
      
      <View style={styles.statsGrid}>
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.average.toFixed(1)}</Text>
          <Text style={styles.statLabel}>Average Mood</Text>
        </View>
        
        <View style={styles.statItem}>
          <View style={styles.trendContainer}>
            <Ionicons 
              name={stats.trend === 'up' ? 'trending-up' : stats.trend === 'down' ? 'trending-down' : 'remove'} 
              size={24} 
              color={stats.trend === 'up' ? '#28A745' : stats.trend === 'down' ? '#DC3545' : '#FFC107'} 
            />
          </View>
          <Text style={styles.statLabel}>Trend</Text>
        </View>
        
        <View style={styles.statItem}>
          <Text style={styles.statValue}>{stats.streakDays}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
      </View>
    </Card>
  );

  const renderMoodHistory = () => (
    <Card style={styles.historyCard}>
      <Text style={styles.historyTitle}>Recent Entries</Text>
      
      {moodHistory.slice(0, 5).map((entry) => (
        <View key={entry.id} style={styles.historyItem}>
          <View style={styles.historyLeft}>
            <Text style={styles.historyEmoji}>{getMoodEmoji(entry.mood)}</Text>
            <View style={styles.historyInfo}>
              <Text style={styles.historyDate}>
                {entry.date.toLocaleDateString()}
              </Text>
              {entry.note && (
                <Text style={styles.historyNote}>{entry.note}</Text>
              )}
            </View>
          </View>
          <View style={[styles.moodIndicator, { backgroundColor: getMoodColor(entry.mood) }]} />
        </View>
      ))}
    </Card>
  );

  const renderSupportResources = () => (
    <Card style={styles.supportCard}>
      <Text style={styles.supportTitle}>Support Resources</Text>
      
      {crisisResources.map((resource, index) => (
        <TouchableOpacity 
          key={index} 
          style={styles.resourceItem}
          onPress={() => callSupport(resource.phone)}>
          <View style={styles.resourceIcon}>
            <Ionicons name="call" size={20} color="#28A745" />
          </View>
          <View style={styles.resourceInfo}>
            <Text style={styles.resourceTitle}>{resource.title}</Text>
            <Text style={styles.resourcePhone}>{resource.phone}</Text>
            <Text style={styles.resourceDesc}>{resource.description}</Text>
          </View>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
      ))}
    </Card>
  );

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {renderMoodSelector()}
      {renderMoodStats()}
      {renderMoodHistory()}
      {renderSupportResources()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  selectorCard: {
    marginBottom: 20,
    padding: 20,
  },
  selectorTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#36454F',
    textAlign: 'center',
    marginBottom: 20,
  },
  moodOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  moodOption: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'transparent',
    minWidth: 60,
  },
  selectedMoodOption: {
    backgroundColor: '#f8f9fa',
  },
  moodEmoji: {
    fontSize: 24,
    marginBottom: 5,
  },
  moodLabel: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  saveButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  saveGradient: {
    paddingVertical: 15,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  statsCard: {
    marginBottom: 20,
    padding: 20,
  },
  statsTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 15,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statItem: {
    alignItems: 'center',
  },
  statValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 5,
  },
  statLabel: {
    fontSize: 12,
    color: '#666',
  },
  trendContainer: {
    marginBottom: 5,
  },
  historyCard: {
    marginBottom: 20,
    padding: 20,
  },
  historyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 15,
  },
  historyItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  historyLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  historyEmoji: {
    fontSize: 20,
    marginRight: 12,
  },
  historyInfo: {
    flex: 1,
  },
  historyDate: {
    fontSize: 14,
    fontWeight: '600',
    color: '#36454F',
  },
  historyNote: {
    fontSize: 12,
    color: '#666',
    marginTop: 2,
  },
  moodIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  supportCard: {
    marginBottom: 20,
    padding: 20,
  },
  supportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 15,
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  resourceIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#28A745' + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  resourceInfo: {
    flex: 1,
  },
  resourceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
  },
  resourcePhone: {
    fontSize: 14,
    color: '#28A745',
    fontWeight: '600',
  },
  resourceDesc: {
    fontSize: 12,
    color: '#666',
  },
});