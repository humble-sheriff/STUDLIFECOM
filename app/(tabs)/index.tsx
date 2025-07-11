import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';

const { width } = Dimensions.get('window');

interface DashboardCard {
  title: string;
  value: string;
  subtitle: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  trend?: 'up' | 'down' | 'neutral';
}

interface QuickAction {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  color: string;
  onPress: () => void;
}

interface Achievement {
  title: string;
  description: string;
  icon: keyof typeof Ionicons.glyphMap;
  date: string;
}

export default function Dashboard() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [nextClass, setNextClass] = useState('Mathematics - 2:00 PM');
  const [studyStreak, setStudyStreak] = useState(7);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const dashboardCards: DashboardCard[] = [
    {
      title: 'Current GPA',
      value: '3.7',
      subtitle: '+0.2 this semester',
      icon: 'trending-up',
      color: '#228B22',
      trend: 'up',
    },
    {
      title: 'Budget Status',
      value: 'KSh 12,500',
      subtitle: '68% remaining',
      icon: 'wallet',
      color: '#FFD700',
    },
    {
      title: 'Study Streak',
      value: `${studyStreak} days`,
      subtitle: 'Keep it up!',
      icon: 'flame',
      color: '#BB0000',
    },
    {
      title: 'Assignments',
      value: '3 due',
      subtitle: 'Next: Tomorrow',
      icon: 'document-text',
      color: '#87CEEB',
    },
  ];

  const quickActions: QuickAction[] = [
    {
      title: 'AI Tutor',
      icon: 'chatbubble-ellipses',
      color: '#BB0000',
      onPress: () => console.log('AI Tutor'),
    },
    {
      title: 'Add Task',
      icon: 'add-circle',
      color: '#228B22',
      onPress: () => console.log('Add Task'),
    },
    {
      title: 'Study Timer',
      icon: 'timer',
      color: '#FFD700',
      onPress: () => console.log('Study Timer'),
    },
    {
      title: 'Campus Map',
      icon: 'map',
      color: '#87CEEB',
      onPress: () => console.log('Campus Map'),
    },
  ];

  const recentAchievements: Achievement[] = [
    {
      title: 'Study Streak Master',
      description: 'Completed 7 consecutive study days',
      icon: 'trophy',
      date: 'Today',
    },
    {
      title: 'Budget Saver',
      description: 'Stayed under budget this week',
      icon: 'medal',
      date: 'Yesterday',
    },
    {
      title: 'Assignment Ace',
      description: 'Submitted all assignments on time',
      icon: 'checkmark-circle',
      date: '2 days ago',
    },
  ];

  const getGreeting = () => {
    const hour = currentTime.getHours();
    if (hour < 12) return 'Good Morning';
    if (hour < 17) return 'Good Afternoon';
    return 'Good Evening';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header */}
        <LinearGradient
          colors={['#BB0000', '#FF6B6B']}
          style={styles.header}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <View style={styles.headerContent}>
            <View>
              <Text style={styles.greeting}>{getGreeting()}, John!</Text>
              <Text style={styles.university}>University of Nairobi</Text>
            </View>
            <TouchableOpacity style={styles.profileButton}>
              <Ionicons name="person-circle" size={40} color="#fff" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.nextClassCard}>
            <BlurView intensity={20} style={styles.blurCard}>
              <View style={styles.nextClassContent}>
                <Ionicons name="time" size={20} color="#fff" />
                <Text style={styles.nextClassText}>Next: {nextClass}</Text>
              </View>
            </BlurView>
          </View>
        </LinearGradient>

        {/* Dashboard Cards */}
        <View style={styles.cardsContainer}>
          <Text style={styles.sectionTitle}>Overview</Text>
          <View style={styles.cardsGrid}>
            {dashboardCards.map((card, index) => (
              <TouchableOpacity key={index} style={styles.dashboardCard}>
                <View style={styles.cardHeader}>
                  <View style={[styles.iconContainer, { backgroundColor: card.color + '20' }]}>
                    <Ionicons name={card.icon} size={24} color={card.color} />
                  </View>
                  {card.trend && (
                    <Ionicons
                      name={card.trend === 'up' ? 'trending-up' : 'trending-down'}
                      size={16}
                      color={card.trend === 'up' ? '#228B22' : '#BB0000'}
                    />
                  )}
                </View>
                <Text style={styles.cardValue}>{card.value}</Text>
                <Text style={styles.cardTitle}>{card.title}</Text>
                <Text style={styles.cardSubtitle}>{card.subtitle}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            {quickActions.map((action, index) => (
              <TouchableOpacity
                key={index}
                style={styles.quickActionButton}
                onPress={action.onPress}>
                <View style={[styles.quickActionIcon, { backgroundColor: action.color }]}>
                  <Ionicons name={action.icon} size={24} color="#fff" />
                </View>
                <Text style={styles.quickActionText}>{action.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Recent Achievements */}
        <View style={styles.achievementsContainer}>
          <Text style={styles.sectionTitle}>Recent Achievements</Text>
          {recentAchievements.map((achievement, index) => (
            <View key={index} style={styles.achievementCard}>
              <View style={styles.achievementIcon}>
                <Ionicons name={achievement.icon} size={24} color="#FFD700" />
              </View>
              <View style={styles.achievementContent}>
                <Text style={styles.achievementTitle}>{achievement.title}</Text>
                <Text style={styles.achievementDescription}>{achievement.description}</Text>
                <Text style={styles.achievementDate}>{achievement.date}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Today's Schedule Preview */}
        <View style={styles.schedulePreview}>
          <Text style={styles.sectionTitle}>Today's Schedule</Text>
          <View style={styles.scheduleItem}>
            <View style={styles.scheduleTime}>
              <Text style={styles.scheduleTimeText}>2:00 PM</Text>
            </View>
            <View style={styles.scheduleDetails}>
              <Text style={styles.scheduleTitle}>Mathematics</Text>
              <Text style={styles.scheduleLocation}>Room 204, Science Block</Text>
            </View>
          </View>
          <View style={styles.scheduleItem}>
            <View style={styles.scheduleTime}>
              <Text style={styles.scheduleTimeText}>4:00 PM</Text>
            </View>
            <View style={styles.scheduleDetails}>
              <Text style={styles.scheduleTitle}>Computer Science Lab</Text>
              <Text style={styles.scheduleLocation}>Lab 3, IT Building</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingTop: 20,
    paddingBottom: 30,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
  },
  university: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  profileButton: {
    padding: 5,
  },
  nextClassCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  blurCard: {
    padding: 15,
  },
  nextClassContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  nextClassText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 10,
  },
  cardsContainer: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 15,
  },
  cardsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  dashboardCard: {
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
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 5,
  },
  cardTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666',
    marginBottom: 2,
  },
  cardSubtitle: {
    fontSize: 12,
    color: '#999',
  },
  quickActionsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  quickActionButton: {
    alignItems: 'center',
    width: (width - 60) / 4,
  },
  quickActionIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  quickActionText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#36454F',
    textAlign: 'center',
  },
  achievementsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  achievementCard: {
    flexDirection: 'row',
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
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFD700' + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  achievementDate: {
    fontSize: 12,
    color: '#999',
  },
  schedulePreview: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  scheduleItem: {
    flexDirection: 'row',
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
  scheduleTime: {
    width: 80,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#BB0000' + '10',
    borderRadius: 8,
    marginRight: 15,
  },
  scheduleTimeText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#BB0000',
  },
  scheduleDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  scheduleTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 2,
  },
  scheduleLocation: {
    fontSize: 14,
    color: '#666',
  },
});