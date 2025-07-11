import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  Modal,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface ScheduleEvent {
  id: string;
  title: string;
  time: string;
  location: string;
  type: 'class' | 'study' | 'exam' | 'event';
  color: string;
  duration: number;
}

interface Task {
  id: string;
  title: string;
  priority: 'high' | 'medium' | 'low';
  completed: boolean;
  estimatedTime: number;
}

export default function Schedule() {
  const [activeView, setActiveView] = useState('today');
  const [showAddEvent, setShowAddEvent] = useState(false);
  const [showPomodoroTimer, setShowPomodoroTimer] = useState(false);
  const [pomodoroTime, setPomodoroTime] = useState(25 * 60); // 25 minutes in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(false);

  const todayEvents: ScheduleEvent[] = [
    {
      id: '1',
      title: 'Mathematics Lecture',
      time: '09:00 AM',
      location: 'Room 204, Science Block',
      type: 'class',
      color: '#BB0000',
      duration: 90,
    },
    {
      id: '2',
      title: 'Study Session - Physics',
      time: '11:00 AM',
      location: 'Library',
      type: 'study',
      color: '#228B22',
      duration: 120,
    },
    {
      id: '3',
      title: 'Computer Science Lab',
      time: '02:00 PM',
      location: 'Lab 3, IT Building',
      type: 'class',
      color: '#FFD700',
      duration: 180,
    },
    {
      id: '4',
      title: 'Group Project Meeting',
      time: '05:00 PM',
      location: 'Student Center',
      type: 'event',
      color: '#87CEEB',
      duration: 60,
    },
  ];

  const tasks: Task[] = [
    {
      id: '1',
      title: 'Complete Calculus Assignment',
      priority: 'high',
      completed: false,
      estimatedTime: 120,
    },
    {
      id: '2',
      title: 'Read Physics Chapter 5',
      priority: 'medium',
      completed: false,
      estimatedTime: 90,
    },
    {
      id: '3',
      title: 'Prepare for CS Lab',
      priority: 'high',
      completed: true,
      estimatedTime: 60,
    },
    {
      id: '4',
      title: 'Review English Notes',
      priority: 'low',
      completed: false,
      estimatedTime: 45,
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'class': return 'school';
      case 'study': return 'book';
      case 'exam': return 'document-text';
      case 'event': return 'calendar';
      default: return 'time';
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const renderTodayView = () => (
    <View style={styles.viewContent}>
      {/* Today's Overview */}
      <LinearGradient
        colors={['#BB0000', '#FF6B6B']}
        style={styles.todayHeader}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <View style={styles.todayHeaderContent}>
          <Text style={styles.todayDate}>Today, March 15</Text>
          <Text style={styles.todayStats}>4 events • 3 tasks pending</Text>
        </View>
        <TouchableOpacity 
          style={styles.pomodoroButton}
          onPress={() => setShowPomodoroTimer(true)}>
          <Ionicons name="timer" size={24} color="#fff" />
        </TouchableOpacity>
      </LinearGradient>

      {/* Timeline */}
      <Text style={styles.sectionTitle}>Today's Schedule</Text>
      <View style={styles.timeline}>
        {todayEvents.map((event, index) => (
          <View key={event.id} style={styles.timelineItem}>
            <View style={styles.timelineLeft}>
              <Text style={styles.timelineTime}>{event.time}</Text>
              <View style={[styles.timelineDot, { backgroundColor: event.color }]} />
              {index < todayEvents.length - 1 && <View style={styles.timelineLine} />}
            </View>
            <TouchableOpacity style={styles.eventCard}>
              <View style={styles.eventHeader}>
                <View style={[styles.eventIcon, { backgroundColor: event.color + '20' }]}>
                  <Ionicons name={getTypeIcon(event.type)} size={20} color={event.color} />
                </View>
                <Text style={styles.eventDuration}>{event.duration}min</Text>
              </View>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <Text style={styles.eventLocation}>{event.location}</Text>
            </TouchableOpacity>
          </View>
        ))}
      </View>
    </View>
  );

  const renderTasksView = () => (
    <View style={styles.viewContent}>
      <View style={styles.tasksHeader}>
        <Text style={styles.sectionTitle}>Today's Tasks</Text>
        <TouchableOpacity style={styles.addTaskButton}>
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Task Categories */}
      <View style={styles.taskCategories}>
        <TouchableOpacity style={[styles.categoryChip, styles.activeCategoryChip]}>
          <Text style={styles.activeCategoryText}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryChip}>
          <Text style={styles.categoryText}>High Priority</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.categoryChip}>
          <Text style={styles.categoryText}>Study</Text>
        </TouchableOpacity>
      </View>

      {/* Tasks List */}
      {tasks.map((task) => (
        <TouchableOpacity key={task.id} style={styles.taskCard}>
          <View style={styles.taskLeft}>
            <TouchableOpacity style={[
              styles.taskCheckbox,
              task.completed && styles.taskCheckboxCompleted
            ]}>
              {task.completed && <Ionicons name="checkmark" size={16} color="#fff" />}
            </TouchableOpacity>
          </View>
          <View style={styles.taskContent}>
            <Text style={[
              styles.taskTitle,
              task.completed && styles.taskTitleCompleted
            ]}>
              {task.title}
            </Text>
            <View style={styles.taskMeta}>
              <View style={[styles.priorityDot, { backgroundColor: getPriorityColor(task.priority) }]} />
              <Text style={styles.taskPriority}>{task.priority} priority</Text>
              <Text style={styles.taskTime}>• {task.estimatedTime}min</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.taskOptions}>
            <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
          </TouchableOpacity>
        </TouchableOpacity>
      ))}

      {/* Study Session Suggestions */}
      <View style={styles.studySuggestions}>
        <Text style={styles.sectionTitle}>Suggested Study Sessions</Text>
        <TouchableOpacity style={styles.suggestionCard}>
          <LinearGradient
            colors={['#228B22', '#32CD32']}
            style={styles.suggestionGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}>
            <View style={styles.suggestionContent}>
              <Text style={styles.suggestionTitle}>Focus Session</Text>
              <Text style={styles.suggestionDesc}>2 hours of deep work on high-priority tasks</Text>
            </View>
            <Ionicons name="arrow-forward" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderCalendarView = () => (
    <View style={styles.viewContent}>
      <Text style={styles.sectionTitle}>Weekly Overview</Text>
      
      {/* Week Navigation */}
      <View style={styles.weekNavigation}>
        <TouchableOpacity style={styles.weekNavButton}>
          <Ionicons name="chevron-back" size={20} color="#666" />
        </TouchableOpacity>
        <Text style={styles.weekTitle}>March 13 - 19, 2024</Text>
        <TouchableOpacity style={styles.weekNavButton}>
          <Ionicons name="chevron-forward" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {/* Week Days */}
      <View style={styles.weekDays}>
        {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day, index) => (
          <TouchableOpacity 
            key={day} 
            style={[styles.dayCard, index === 2 && styles.activeDayCard]}>
            <Text style={[styles.dayText, index === 2 && styles.activeDayText]}>{day}</Text>
            <Text style={[styles.dayNumber, index === 2 && styles.activeDayNumber]}>
              {13 + index}
            </Text>
            {index === 2 && <View style={styles.dayIndicator} />}
          </TouchableOpacity>
        ))}
      </View>

      {/* Calendar Events */}
      <ScrollView style={styles.calendarEvents}>
        {todayEvents.map((event) => (
          <View key={event.id} style={styles.calendarEventCard}>
            <View style={[styles.eventColorBar, { backgroundColor: event.color }]} />
            <View style={styles.calendarEventContent}>
              <Text style={styles.calendarEventTitle}>{event.title}</Text>
              <Text style={styles.calendarEventTime}>{event.time} • {event.location}</Text>
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Schedule</Text>
        <TouchableOpacity 
          style={styles.addButton}
          onPress={() => setShowAddEvent(true)}>
          <Ionicons name="add" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* View Navigation */}
      <View style={styles.viewNavigation}>
        <TouchableOpacity 
          style={[styles.viewTab, activeView === 'today' && styles.activeViewTab]}
          onPress={() => setActiveView('today')}>
          <Text style={[styles.viewTabText, activeView === 'today' && styles.activeViewTabText]}>
            Today
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.viewTab, activeView === 'tasks' && styles.activeViewTab]}
          onPress={() => setActiveView('tasks')}>
          <Text style={[styles.viewTabText, activeView === 'tasks' && styles.activeViewTabText]}>
            Tasks
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.viewTab, activeView === 'calendar' && styles.activeViewTab]}
          onPress={() => setActiveView('calendar')}>
          <Text style={[styles.viewTabText, activeView === 'calendar' && styles.activeViewTabText]}>
            Calendar
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeView === 'today' && renderTodayView()}
        {activeView === 'tasks' && renderTasksView()}
        {activeView === 'calendar' && renderCalendarView()}
      </ScrollView>

      {/* Pomodoro Timer Modal */}
      <Modal
        visible={showPomodoroTimer}
        animationType="slide"
        presentationStyle="pageSheet">
        <SafeAreaView style={styles.pomodoroModal}>
          <View style={styles.pomodoroHeader}>
            <Text style={styles.pomodoroTitle}>Focus Timer</Text>
            <TouchableOpacity onPress={() => setShowPomodoroTimer(false)}>
              <Ionicons name="close" size={24} color="#36454F" />
            </TouchableOpacity>
          </View>
          
          <View style={styles.pomodoroContent}>
            <View style={styles.timerCircle}>
              <Text style={styles.timerText}>{formatTime(pomodoroTime)}</Text>
              <Text style={styles.timerLabel}>Focus Time</Text>
            </View>
            
            <View style={styles.timerControls}>
              <TouchableOpacity 
                style={[styles.timerButton, styles.timerButtonSecondary]}
                onPress={() => setPomodoroTime(25 * 60)}>
                <Text style={styles.timerButtonText}>25min</Text>
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.timerButton, styles.timerButtonPrimary]}
                onPress={() => setIsTimerRunning(!isTimerRunning)}>
                <Ionicons 
                  name={isTimerRunning ? "pause" : "play"} 
                  size={24} 
                  color="#fff" 
                />
              </TouchableOpacity>
              <TouchableOpacity 
                style={[styles.timerButton, styles.timerButtonSecondary]}
                onPress={() => setPomodoroTime(5 * 60)}>
                <Text style={styles.timerButtonText}>5min</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Add Event Modal */}
      <Modal
        visible={showAddEvent}
        animationType="slide"
        presentationStyle="pageSheet">
        <SafeAreaView style={styles.addEventModal}>
          <View style={styles.addEventHeader}>
            <TouchableOpacity onPress={() => setShowAddEvent(false)}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.addEventTitle}>New Event</Text>
            <TouchableOpacity>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.addEventContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Title</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Event title"
                placeholderTextColor="#999"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Time</Text>
              <TouchableOpacity style={styles.timeInput}>
                <Text style={styles.timeInputText}>Select time</Text>
                <Ionicons name="time" size={20} color="#666" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Location</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Event location"
                placeholderTextColor="#999"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Type</Text>
              <View style={styles.typeOptions}>
                <TouchableOpacity style={[styles.typeOption, styles.activeTypeOption]}>
                  <Text style={styles.activeTypeOptionText}>Class</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.typeOption}>
                  <Text style={styles.typeOptionText}>Study</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.typeOption}>
                  <Text style={styles.typeOptionText}>Exam</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.typeOption}>
                  <Text style={styles.typeOptionText}>Event</Text>
                </TouchableOpacity>
              </View>
            </View>
          </ScrollView>
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
  addButton: {
    backgroundColor: '#BB0000',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  viewNavigation: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  viewTab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeViewTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#BB0000',
  },
  viewTabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeViewTabText: {
    color: '#BB0000',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  viewContent: {
    padding: 20,
  },
  todayHeader: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 25,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  todayHeaderContent: {
    flex: 1,
  },
  todayDate: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 5,
  },
  todayStats: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  pomodoroButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 15,
  },
  timeline: {
    marginBottom: 20,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  timelineLeft: {
    width: 80,
    alignItems: 'center',
    marginRight: 15,
  },
  timelineTime: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#666',
    marginBottom: 8,
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    marginBottom: 8,
  },
  timelineLine: {
    width: 2,
    flex: 1,
    backgroundColor: '#e0e0e0',
  },
  eventCard: {
    flex: 1,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  eventIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  eventDuration: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },
  eventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 4,
  },
  eventLocation: {
    fontSize: 14,
    color: '#666',
  },
  tasksHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  addTaskButton: {
    backgroundColor: '#228B22',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskCategories: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#f0f0f0',
    marginRight: 10,
  },
  activeCategoryChip: {
    backgroundColor: '#BB0000',
  },
  categoryText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeCategoryText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  taskCard: {
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
  taskLeft: {
    marginRight: 15,
    justifyContent: 'center',
  },
  taskCheckbox: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 2,
    borderColor: '#e0e0e0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  taskCheckboxCompleted: {
    backgroundColor: '#228B22',
    borderColor: '#228B22',
  },
  taskContent: {
    flex: 1,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 4,
  },
  taskTitleCompleted: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  priorityDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  taskPriority: {
    fontSize: 12,
    color: '#666',
    textTransform: 'capitalize',
  },
  taskTime: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
  taskOptions: {
    justifyContent: 'center',
    paddingLeft: 10,
  },
  studySuggestions: {
    marginTop: 20,
  },
  suggestionCard: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  suggestionGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
  },
  suggestionContent: {
    flex: 1,
  },
  suggestionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  suggestionDesc: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
  },
  weekNavigation: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  weekNavButton: {
    padding: 8,
  },
  weekTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#36454F',
  },
  weekDays: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  dayCard: {
    alignItems: 'center',
    padding: 10,
    borderRadius: 12,
    minWidth: 40,
  },
  activeDayCard: {
    backgroundColor: '#BB0000',
  },
  dayText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
    marginBottom: 4,
  },
  activeDayText: {
    color: '#fff',
  },
  dayNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
  },
  activeDayNumber: {
    color: '#fff',
  },
  dayIndicator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: '#fff',
    marginTop: 4,
  },
  calendarEvents: {
    flex: 1,
  },
  calendarEventCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventColorBar: {
    width: 4,
  },
  calendarEventContent: {
    flex: 1,
    padding: 15,
  },
  calendarEventTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 4,
  },
  calendarEventTime: {
    fontSize: 14,
    color: '#666',
  },
  pomodoroModal: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  pomodoroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  pomodoroTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#36454F',
  },
  pomodoroContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  timerCircle: {
    width: 200,
    height: 200,
    borderRadius: 100,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  timerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#36454F',
  },
  timerLabel: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
  },
  timerControls: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 20,
  },
  timerButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  timerButtonPrimary: {
    backgroundColor: '#BB0000',
  },
  timerButtonSecondary: {
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#e0e0e0',
  },
  timerButtonText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#36454F',
  },
  addEventModal: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  addEventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  addEventTitle: {
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
    color: '#BB0000',
    fontWeight: 'bold',
  },
  addEventContent: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 8,
  },
  textInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  timeInput: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  timeInputText: {
    fontSize: 16,
    color: '#999',
  },
  typeOptions: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  typeOption: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  activeTypeOption: {
    backgroundColor: '#BB0000',
    borderColor: '#BB0000',
  },
  typeOptionText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTypeOptionText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});