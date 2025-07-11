import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  SafeAreaView,
  Dimensions,
  Modal,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface Course {
  id: string;
  name: string;
  code: string;
  credits: number;
  grade: string;
  progress: number;
  color: string;
}

interface Assignment {
  id: string;
  title: string;
  course: string;
  dueDate: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'high' | 'medium' | 'low';
}

export default function Academics() {
  const [activeTab, setActiveTab] = useState('overview');
  const [showAIChat, setShowAIChat] = useState(false);
  const [chatMessage, setChatMessage] = useState('');

  const courses: Course[] = [
    {
      id: '1',
      name: 'Advanced Mathematics',
      code: 'MATH 301',
      credits: 3,
      grade: 'A-',
      progress: 85,
      color: '#BB0000',
    },
    {
      id: '2',
      name: 'Computer Science',
      code: 'CS 201',
      credits: 4,
      grade: 'B+',
      progress: 78,
      color: '#228B22',
    },
    {
      id: '3',
      name: 'Physics',
      code: 'PHY 202',
      credits: 3,
      grade: 'A',
      progress: 92,
      color: '#FFD700',
    },
    {
      id: '4',
      name: 'English Literature',
      code: 'ENG 101',
      credits: 2,
      grade: 'B',
      progress: 70,
      color: '#87CEEB',
    },
  ];

  const assignments: Assignment[] = [
    {
      id: '1',
      title: 'Calculus Problem Set 5',
      course: 'MATH 301',
      dueDate: 'Tomorrow',
      status: 'pending',
      priority: 'high',
    },
    {
      id: '2',
      title: 'Data Structures Project',
      course: 'CS 201',
      dueDate: 'In 3 days',
      status: 'in-progress',
      priority: 'high',
    },
    {
      id: '3',
      title: 'Physics Lab Report',
      course: 'PHY 202',
      dueDate: 'Next week',
      status: 'pending',
      priority: 'medium',
    },
    {
      id: '4',
      title: 'Essay on Shakespeare',
      course: 'ENG 101',
      dueDate: 'In 5 days',
      status: 'completed',
      priority: 'low',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return '#BB0000';
      case 'medium': return '#FFD700';
      case 'low': return '#228B22';
      default: return '#666';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return 'checkmark-circle';
      case 'in-progress': return 'time';
      case 'pending': return 'ellipse-outline';
      default: return 'ellipse-outline';
    }
  };

  const renderOverview = () => (
    <View style={styles.tabContent}>
      {/* GPA Card */}
      <LinearGradient
        colors={['#228B22', '#32CD32']}
        style={styles.gpaCard}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <View style={styles.gpaContent}>
          <Text style={styles.gpaLabel}>Current GPA</Text>
          <Text style={styles.gpaValue}>3.7</Text>
          <Text style={styles.gpaSubtext}>+0.2 this semester</Text>
        </View>
        <View style={styles.gpaIcon}>
          <Ionicons name="trending-up" size={40} color="#fff" />
        </View>
      </LinearGradient>

      {/* Courses Grid */}
      <Text style={styles.sectionTitle}>Your Courses</Text>
      <View style={styles.coursesGrid}>
        {courses.map((course) => (
          <TouchableOpacity key={course.id} style={styles.courseCard}>
            <View style={[styles.courseHeader, { backgroundColor: course.color + '20' }]}>
              <Text style={styles.courseCode}>{course.code}</Text>
              <Text style={[styles.courseGrade, { color: course.color }]}>{course.grade}</Text>
            </View>
            <Text style={styles.courseName}>{course.name}</Text>
            <Text style={styles.courseCredits}>{course.credits} Credits</Text>
            
            {/* Progress Bar */}
            <View style={styles.progressContainer}>
              <View style={styles.progressBar}>
                <View 
                  style={[
                    styles.progressFill, 
                    { width: `${course.progress}%`, backgroundColor: course.color }
                  ]} 
                />
              </View>
              <Text style={styles.progressText}>{course.progress}%</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderAssignments = () => (
    <View style={styles.tabContent}>
      <View style={styles.assignmentHeader}>
        <Text style={styles.sectionTitle}>Assignments</Text>
        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {assignments.map((assignment) => (
        <View key={assignment.id} style={styles.assignmentCard}>
          <View style={styles.assignmentLeft}>
            <Ionicons 
              name={getStatusIcon(assignment.status)} 
              size={24} 
              color={assignment.status === 'completed' ? '#228B22' : '#666'} 
            />
          </View>
          <View style={styles.assignmentContent}>
            <Text style={styles.assignmentTitle}>{assignment.title}</Text>
            <Text style={styles.assignmentCourse}>{assignment.course}</Text>
            <Text style={styles.assignmentDue}>Due: {assignment.dueDate}</Text>
          </View>
          <View style={styles.assignmentRight}>
            <View style={[styles.priorityBadge, { backgroundColor: getPriorityColor(assignment.priority) }]}>
              <Text style={styles.priorityText}>{assignment.priority.toUpperCase()}</Text>
            </View>
          </View>
        </View>
      ))}
    </View>
  );

  const renderAITutor = () => (
    <View style={styles.tabContent}>
      <View style={styles.aiHeader}>
        <Text style={styles.sectionTitle}>AI Study Assistant</Text>
        <TouchableOpacity 
          style={styles.chatButton}
          onPress={() => setShowAIChat(true)}>
          <Ionicons name="chatbubble-ellipses" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.aiFeatures}>
        <TouchableOpacity style={styles.aiFeatureCard}>
          <Ionicons name="document-text" size={32} color="#BB0000" />
          <Text style={styles.aiFeatureTitle}>Summarize Notes</Text>
          <Text style={styles.aiFeatureDesc}>Get AI-powered summaries of your study materials</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.aiFeatureCard}>
          <Ionicons name="help-circle" size={32} color="#228B22" />
          <Text style={styles.aiFeatureTitle}>Ask Questions</Text>
          <Text style={styles.aiFeatureDesc}>Get instant answers to your academic questions</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.aiFeatureCard}>
          <Ionicons name="school" size={32} color="#FFD700" />
          <Text style={styles.aiFeatureTitle}>Practice Quiz</Text>
          <Text style={styles.aiFeatureDesc}>Generate practice questions for any subject</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.aiFeatureCard}>
          <Ionicons name="analytics" size={32} color="#87CEEB" />
          <Text style={styles.aiFeatureTitle}>Study Analytics</Text>
          <Text style={styles.aiFeatureDesc}>Track your learning progress and patterns</Text>
        </TouchableOpacity>
      </View>

      {/* Recent AI Interactions */}
      <Text style={styles.sectionTitle}>Recent Conversations</Text>
      <View style={styles.recentChats}>
        <TouchableOpacity style={styles.chatItem}>
          <Ionicons name="chatbubble" size={20} color="#BB0000" />
          <Text style={styles.chatText}>Explained calculus derivatives</Text>
          <Text style={styles.chatTime}>2h ago</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.chatItem}>
          <Ionicons name="chatbubble" size={20} color="#228B22" />
          <Text style={styles.chatText}>Generated physics practice quiz</Text>
          <Text style={styles.chatTime}>1d ago</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Academics</Text>
        <TouchableOpacity style={styles.searchButton}>
          <Ionicons name="search" size={24} color="#36454F" />
        </TouchableOpacity>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabNavigation}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'overview' && styles.activeTab]}
          onPress={() => setActiveTab('overview')}>
          <Text style={[styles.tabText, activeTab === 'overview' && styles.activeTabText]}>
            Overview
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'assignments' && styles.activeTab]}
          onPress={() => setActiveTab('assignments')}>
          <Text style={[styles.tabText, activeTab === 'assignments' && styles.activeTabText]}>
            Assignments
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'ai-tutor' && styles.activeTab]}
          onPress={() => setActiveTab('ai-tutor')}>
          <Text style={[styles.tabText, activeTab === 'ai-tutor' && styles.activeTabText]}>
            AI Tutor
          </Text>
        </TouchableOpacity>
      </View>

      {/* Tab Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'assignments' && renderAssignments()}
        {activeTab === 'ai-tutor' && renderAITutor()}
      </ScrollView>

      {/* AI Chat Modal */}
      <Modal
        visible={showAIChat}
        animationType="slide"
        presentationStyle="pageSheet">
        <SafeAreaView style={styles.chatModal}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatTitle}>AI Study Assistant</Text>
            <TouchableOpacity onPress={() => setShowAIChat(false)}>
              <Ionicons name="close" size={24} color="#36454F" />
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.chatMessages}>
            <View style={styles.aiMessage}>
              <Text style={styles.aiMessageText}>
                Hello! I'm your AI study assistant. How can I help you today?
              </Text>
            </View>
          </ScrollView>
          
          <View style={styles.chatInput}>
            <TextInput
              style={styles.messageInput}
              placeholder="Ask me anything about your studies..."
              value={chatMessage}
              onChangeText={setChatMessage}
              multiline
            />
            <TouchableOpacity style={styles.sendButton}>
              <Ionicons name="send" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#36454F',
  },
  searchButton: {
    padding: 8,
  },
  tabNavigation: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#BB0000',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#BB0000',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
  },
  gpaCard: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gpaContent: {
    flex: 1,
  },
  gpaLabel: {
    fontSize: 16,
    color: '#fff',
    opacity: 0.9,
  },
  gpaValue: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
    marginVertical: 5,
  },
  gpaSubtext: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.8,
  },
  gpaIcon: {
    opacity: 0.3,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 15,
  },
  coursesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  courseCard: {
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
  courseHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 8,
    borderRadius: 8,
    marginBottom: 10,
  },
  courseCode: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#36454F',
  },
  courseGrade: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  courseName: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 5,
  },
  courseCredits: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  progressContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  progressBar: {
    flex: 1,
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginRight: 8,
  },
  progressFill: {
    height: '100%',
    borderRadius: 3,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  assignmentHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  addButton: {
    backgroundColor: '#BB0000',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  assignmentCard: {
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
  assignmentLeft: {
    marginRight: 15,
    justifyContent: 'center',
  },
  assignmentContent: {
    flex: 1,
  },
  assignmentTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 2,
  },
  assignmentCourse: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  assignmentDue: {
    fontSize: 12,
    color: '#999',
  },
  assignmentRight: {
    justifyContent: 'center',
  },
  priorityBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  priorityText: {
    fontSize: 10,
    color: '#fff',
    fontWeight: 'bold',
  },
  aiHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  chatButton: {
    backgroundColor: '#BB0000',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  aiFeatures: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 25,
  },
  aiFeatureCard: {
    width: (width - 50) / 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  aiFeatureTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#36454F',
    marginTop: 10,
    marginBottom: 5,
    textAlign: 'center',
  },
  aiFeatureDesc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
  },
  recentChats: {
    marginTop: 10,
  },
  chatItem: {
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
  chatText: {
    flex: 1,
    fontSize: 14,
    color: '#36454F',
    marginLeft: 10,
  },
  chatTime: {
    fontSize: 12,
    color: '#999',
  },
  chatModal: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  chatTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#36454F',
  },
  chatMessages: {
    flex: 1,
    padding: 20,
  },
  aiMessage: {
    backgroundColor: '#BB0000' + '10',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    alignSelf: 'flex-start',
    maxWidth: '80%',
  },
  aiMessageText: {
    fontSize: 14,
    color: '#36454F',
  },
  chatInput: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  messageInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    marginRight: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#BB0000',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
});