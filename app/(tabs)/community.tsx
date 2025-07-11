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
  Image,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

interface Post {
  id: string;
  author: string;
  avatar: string;
  time: string;
  content: string;
  likes: number;
  comments: number;
  category: string;
  isLiked: boolean;
}

interface StudyGroup {
  id: string;
  name: string;
  subject: string;
  members: number;
  nextSession: string;
  image: string;
  color: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  category: string;
  image: string;
}

export default function Community() {
  const [activeTab, setActiveTab] = useState('feed');
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [showJoinGroup, setShowJoinGroup] = useState(false);

  const posts: Post[] = [
    {
      id: '1',
      author: 'Sarah Wanjiku',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      time: '2h ago',
      content: 'Just finished my calculus assignment! The integration problems were challenging but I finally got them. Anyone else struggling with Chapter 5?',
      likes: 12,
      comments: 5,
      category: 'Mathematics',
      isLiked: false,
    },
    {
      id: '2',
      author: 'David Kimani',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      time: '4h ago',
      content: 'Study group for Computer Science tomorrow at 3 PM in the library. We\'ll be covering data structures. All welcome! 💻',
      likes: 18,
      comments: 8,
      category: 'Computer Science',
      isLiked: true,
    },
    {
      id: '3',
      author: 'Grace Achieng',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      time: '6h ago',
      content: 'Looking for someone to practice Swahili conversation with. I\'m a native speaker and can help with English in return!',
      likes: 7,
      comments: 3,
      category: 'Languages',
      isLiked: false,
    },
  ];

  const studyGroups: StudyGroup[] = [
    {
      id: '1',
      name: 'Advanced Mathematics',
      subject: 'Calculus & Linear Algebra',
      members: 24,
      nextSession: 'Tomorrow, 2:00 PM',
      image: 'https://images.pexels.com/photos/6238050/pexels-photo-6238050.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
      color: '#BB0000',
    },
    {
      id: '2',
      name: 'CS Study Circle',
      subject: 'Data Structures & Algorithms',
      members: 18,
      nextSession: 'Friday, 4:00 PM',
      image: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
      color: '#228B22',
    },
    {
      id: '3',
      name: 'Physics Lab Group',
      subject: 'Quantum Mechanics',
      members: 12,
      nextSession: 'Monday, 10:00 AM',
      image: 'https://images.pexels.com/photos/2280571/pexels-photo-2280571.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
      color: '#FFD700',
    },
  ];

  const events: Event[] = [
    {
      id: '1',
      title: 'Tech Career Fair 2024',
      date: 'March 25',
      time: '9:00 AM - 5:00 PM',
      location: 'Main Auditorium',
      attendees: 156,
      category: 'Career',
      image: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    },
    {
      id: '2',
      title: 'Cultural Festival',
      date: 'March 30',
      time: '6:00 PM - 10:00 PM',
      location: 'Student Center',
      attendees: 89,
      category: 'Social',
      image: 'https://images.pexels.com/photos/1190298/pexels-photo-1190298.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    },
    {
      id: '3',
      title: 'Research Symposium',
      date: 'April 5',
      time: '2:00 PM - 6:00 PM',
      location: 'Science Building',
      attendees: 67,
      category: 'Academic',
      image: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&dpr=2',
    },
  ];

  const renderFeed = () => (
    <View style={styles.tabContent}>
      {/* Create Post Button */}
      <TouchableOpacity 
        style={styles.createPostButton}
        onPress={() => setShowCreatePost(true)}>
        <View style={styles.createPostContent}>
          <Image 
            source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2' }}
            style={styles.createPostAvatar}
          />
          <Text style={styles.createPostText}>What's on your mind?</Text>
        </View>
        <Ionicons name="camera" size={24} color="#666" />
      </TouchableOpacity>

      {/* Posts */}
      {posts.map((post) => (
        <View key={post.id} style={styles.postCard}>
          <View style={styles.postHeader}>
            <Image source={{ uri: post.avatar }} style={styles.postAvatar} />
            <View style={styles.postAuthorInfo}>
              <Text style={styles.postAuthor}>{post.author}</Text>
              <View style={styles.postMeta}>
                <Text style={styles.postTime}>{post.time}</Text>
                <Text style={styles.postCategory}>• {post.category}</Text>
              </View>
            </View>
            <TouchableOpacity style={styles.postOptions}>
              <Ionicons name="ellipsis-horizontal" size={20} color="#666" />
            </TouchableOpacity>
          </View>
          
          <Text style={styles.postContent}>{post.content}</Text>
          
          <View style={styles.postActions}>
            <TouchableOpacity style={styles.postAction}>
              <Ionicons 
                name={post.isLiked ? "heart" : "heart-outline"} 
                size={20} 
                color={post.isLiked ? "#BB0000" : "#666"} 
              />
              <Text style={[styles.postActionText, post.isLiked && { color: '#BB0000' }]}>
                {post.likes}
              </Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.postAction}>
              <Ionicons name="chatbubble-outline" size={20} color="#666" />
              <Text style={styles.postActionText}>{post.comments}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.postAction}>
              <Ionicons name="share-outline" size={20} color="#666" />
              <Text style={styles.postActionText}>Share</Text>
            </TouchableOpacity>
          </View>
        </View>
      ))}
    </View>
  );

  const renderGroups = () => (
    <View style={styles.tabContent}>
      <View style={styles.groupsHeader}>
        <Text style={styles.sectionTitle}>Study Groups</Text>
        <TouchableOpacity 
          style={styles.joinGroupButton}
          onPress={() => setShowJoinGroup(true)}>
          <Ionicons name="add" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      {studyGroups.map((group) => (
        <TouchableOpacity key={group.id} style={styles.groupCard}>
          <Image source={{ uri: group.image }} style={styles.groupImage} />
          <View style={styles.groupContent}>
            <View style={styles.groupHeader}>
              <Text style={styles.groupName}>{group.name}</Text>
              <View style={[styles.groupBadge, { backgroundColor: group.color }]}>
                <Text style={styles.groupBadgeText}>{group.members}</Text>
              </View>
            </View>
            <Text style={styles.groupSubject}>{group.subject}</Text>
            <View style={styles.groupMeta}>
              <Ionicons name="time" size={16} color="#666" />
              <Text style={styles.groupNextSession}>Next: {group.nextSession}</Text>
            </View>
            <TouchableOpacity style={[styles.joinButton, { backgroundColor: group.color }]}>
              <Text style={styles.joinButtonText}>Join Group</Text>
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      ))}

      {/* Create Group */}
      <TouchableOpacity style={styles.createGroupCard}>
        <LinearGradient
          colors={['#BB0000', '#FF6B6B']}
          style={styles.createGroupGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}>
          <Ionicons name="add-circle" size={40} color="#fff" />
          <Text style={styles.createGroupTitle}>Create New Group</Text>
          <Text style={styles.createGroupDesc}>Start your own study group and invite classmates</Text>
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );

  const renderEvents = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Upcoming Events</Text>
      
      {events.map((event) => (
        <TouchableOpacity key={event.id} style={styles.eventCard}>
          <Image source={{ uri: event.image }} style={styles.eventImage} />
          <View style={styles.eventContent}>
            <View style={styles.eventHeader}>
              <Text style={styles.eventTitle}>{event.title}</Text>
              <View style={styles.eventCategory}>
                <Text style={styles.eventCategoryText}>{event.category}</Text>
              </View>
            </View>
            <View style={styles.eventDetails}>
              <View style={styles.eventDetail}>
                <Ionicons name="calendar" size={16} color="#666" />
                <Text style={styles.eventDetailText}>{event.date}</Text>
              </View>
              <View style={styles.eventDetail}>
                <Ionicons name="time" size={16} color="#666" />
                <Text style={styles.eventDetailText}>{event.time}</Text>
              </View>
              <View style={styles.eventDetail}>
                <Ionicons name="location" size={16} color="#666" />
                <Text style={styles.eventDetailText}>{event.location}</Text>
              </View>
            </View>
            <View style={styles.eventFooter}>
              <View style={styles.eventAttendees}>
                <Ionicons name="people" size={16} color="#666" />
                <Text style={styles.eventAttendeesText}>{event.attendees} attending</Text>
              </View>
              <TouchableOpacity style={styles.rsvpButton}>
                <Text style={styles.rsvpButtonText}>RSVP</Text>
              </TouchableOpacity>
            </View>
          </View>
        </TouchableOpacity>
      ))}

      {/* Campus Marketplace */}
      <View style={styles.marketplaceSection}>
        <Text style={styles.sectionTitle}>Campus Marketplace</Text>
        <View style={styles.marketplaceGrid}>
          <TouchableOpacity style={styles.marketplaceCard}>
            <Ionicons name="book" size={32} color="#BB0000" />
            <Text style={styles.marketplaceTitle}>Textbooks</Text>
            <Text style={styles.marketplaceDesc}>Buy & sell used textbooks</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.marketplaceCard}>
            <Ionicons name="laptop" size={32} color="#228B22" />
            <Text style={styles.marketplaceTitle}>Electronics</Text>
            <Text style={styles.marketplaceDesc}>Laptops, phones & gadgets</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.marketplaceCard}>
            <Ionicons name="school" size={32} color="#FFD700" />
            <Text style={styles.marketplaceTitle}>Tutoring</Text>
            <Text style={styles.marketplaceDesc}>Find or offer tutoring services</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.marketplaceCard}>
            <Ionicons name="home" size={32} color="#87CEEB" />
            <Text style={styles.marketplaceTitle}>Housing</Text>
            <Text style={styles.marketplaceDesc}>Roommates & accommodation</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Community</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="search" size={24} color="#36454F" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="notifications" size={24} color="#36454F" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Tab Navigation */}
      <View style={styles.tabNavigation}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'feed' && styles.activeTab]}
          onPress={() => setActiveTab('feed')}>
          <Text style={[styles.tabText, activeTab === 'feed' && styles.activeTabText]}>
            Feed
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'groups' && styles.activeTab]}
          onPress={() => setActiveTab('groups')}>
          <Text style={[styles.tabText, activeTab === 'groups' && styles.activeTabText]}>
            Groups
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'events' && styles.activeTab]}
          onPress={() => setActiveTab('events')}>
          <Text style={[styles.tabText, activeTab === 'events' && styles.activeTabText]}>
            Events
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'feed' && renderFeed()}
        {activeTab === 'groups' && renderGroups()}
        {activeTab === 'events' && renderEvents()}
      </ScrollView>

      {/* Create Post Modal */}
      <Modal
        visible={showCreatePost}
        animationType="slide"
        presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowCreatePost(false)}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Create Post</Text>
            <TouchableOpacity>
              <Text style={styles.saveButton}>Post</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.createPostModal}>
            <View style={styles.postAuthorSection}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=50&h=50&dpr=2' }}
                style={styles.modalAvatar}
              />
              <View>
                <Text style={styles.modalAuthorName}>John Doe</Text>
                <TouchableOpacity style={styles.categorySelector}>
                  <Text style={styles.categorySelectorText}>Select Category</Text>
                  <Ionicons name="chevron-down" size={16} color="#666" />
                </TouchableOpacity>
              </View>
            </View>
            
            <TextInput
              style={styles.postTextInput}
              placeholder="What's on your mind?"
              multiline
              placeholderTextColor="#999"
            />
            
            <View style={styles.postOptions}>
              <TouchableOpacity style={styles.postOption}>
                <Ionicons name="camera" size={24} color="#666" />
                <Text style={styles.postOptionText}>Photo</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postOption}>
                <Ionicons name="location" size={24} color="#666" />
                <Text style={styles.postOptionText}>Location</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.postOption}>
                <Ionicons name="people" size={24} color="#666" />
                <Text style={styles.postOptionText}>Tag People</Text>
              </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>
      </Modal>

      {/* Join Group Modal */}
      <Modal
        visible={showJoinGroup}
        animationType="slide"
        presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowJoinGroup(false)}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Join Study Group</Text>
            <TouchableOpacity>
              <Text style={styles.saveButton}>Join</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.joinGroupModal}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Search Groups</Text>
              <TextInput
                style={styles.textInput}
                placeholder="Search by subject or group name"
                placeholderTextColor="#999"
              />
            </View>
            
            <Text style={styles.sectionTitle}>Recommended Groups</Text>
            {studyGroups.slice(0, 2).map((group) => (
              <TouchableOpacity key={group.id} style={styles.recommendedGroup}>
                <Image source={{ uri: group.image }} style={styles.recommendedGroupImage} />
                <View style={styles.recommendedGroupContent}>
                  <Text style={styles.recommendedGroupName}>{group.name}</Text>
                  <Text style={styles.recommendedGroupSubject}>{group.subject}</Text>
                  <Text style={styles.recommendedGroupMembers}>{group.members} members</Text>
                </View>
                <TouchableOpacity style={styles.quickJoinButton}>
                  <Text style={styles.quickJoinButtonText}>Join</Text>
                </TouchableOpacity>
              </TouchableOpacity>
            ))}
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
  headerActions: {
    flexDirection: 'row',
  },
  headerButton: {
    marginLeft: 15,
    padding: 5,
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
  createPostButton: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  createPostContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  createPostAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  createPostText: {
    fontSize: 16,
    color: '#999',
  },
  postCard: {
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
  postHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  postAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postAuthorInfo: {
    flex: 1,
  },
  postAuthor: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 2,
  },
  postMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postTime: {
    fontSize: 12,
    color: '#666',
  },
  postCategory: {
    fontSize: 12,
    color: '#BB0000',
    fontWeight: '500',
  },
  postOptions: {
    padding: 5,
  },
  postContent: {
    fontSize: 16,
    color: '#36454F',
    lineHeight: 24,
    marginBottom: 15,
  },
  postActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 12,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  postAction: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  postActionText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
    fontWeight: '500',
  },
  groupsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#36454F',
  },
  joinGroupButton: {
    backgroundColor: '#BB0000',
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  groupImage: {
    width: '100%',
    height: 120,
  },
  groupContent: {
    padding: 15,
  },
  groupHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  groupName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#36454F',
    flex: 1,
  },
  groupBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  groupBadgeText: {
    fontSize: 12,
    color: '#fff',
    fontWeight: 'bold',
  },
  groupSubject: {
    fontSize: 14,
    color: '#666',
    marginBottom: 10,
  },
  groupMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  groupNextSession: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  joinButton: {
    borderRadius: 8,
    paddingVertical: 10,
    alignItems: 'center',
  },
  joinButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  createGroupCard: {
    borderRadius: 12,
    overflow: 'hidden',
    marginTop: 10,
  },
  createGroupGradient: {
    padding: 30,
    alignItems: 'center',
  },
  createGroupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
    marginTop: 15,
    marginBottom: 8,
  },
  createGroupDesc: {
    fontSize: 14,
    color: '#fff',
    opacity: 0.9,
    textAlign: 'center',
  },
  eventCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  eventImage: {
    width: '100%',
    height: 120,
  },
  eventContent: {
    padding: 15,
  },
  eventHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 10,
  },
  eventTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#36454F',
    flex: 1,
    marginRight: 10,
  },
  eventCategory: {
    backgroundColor: '#BB0000' + '20',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  eventCategoryText: {
    fontSize: 12,
    color: '#BB0000',
    fontWeight: 'bold',
  },
  eventDetails: {
    marginBottom: 15,
  },
  eventDetail: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  eventDetailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  eventFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  eventAttendees: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  eventAttendeesText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 6,
  },
  rsvpButton: {
    backgroundColor: '#BB0000',
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
  },
  rsvpButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  marketplaceSection: {
    marginTop: 30,
  },
  marketplaceGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginTop: 15,
  },
  marketplaceCard: {
    width: (width - 50) / 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  marketplaceTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
    marginTop: 10,
    marginBottom: 5,
  },
  marketplaceDesc: {
    fontSize: 12,
    color: '#666',
    textAlign: 'center',
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
    color: '#BB0000',
    fontWeight: 'bold',
  },
  createPostModal: {
    flex: 1,
    padding: 20,
  },
  postAuthorSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  modalAuthorName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 5,
  },
  categorySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  categorySelectorText: {
    fontSize: 12,
    color: '#666',
    marginRight: 5,
  },
  postTextInput: {
    fontSize: 16,
    color: '#36454F',
    textAlignVertical: 'top',
    minHeight: 120,
    marginBottom: 20,
  },
  postOptions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#f0f0f0',
  },
  postOption: {
    alignItems: 'center',
  },
  postOptionText: {
    fontSize: 12,
    color: '#666',
    marginTop: 5,
  },
  joinGroupModal: {
    flex: 1,
    padding: 20,
  },
  inputGroup: {
    marginBottom: 25,
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
  recommendedGroup: {
    flexDirection: 'row',
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
  recommendedGroupImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 15,
  },
  recommendedGroupContent: {
    flex: 1,
  },
  recommendedGroupName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 4,
  },
  recommendedGroupSubject: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  recommendedGroupMembers: {
    fontSize: 12,
    color: '#999',
  },
  quickJoinButton: {
    backgroundColor: '#BB0000',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    alignSelf: 'center',
  },
  quickJoinButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
});