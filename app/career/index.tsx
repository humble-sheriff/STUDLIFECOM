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

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: 'internship' | 'entry-level' | 'part-time';
  salary: string;
  posted: string;
  logo: string;
  skills: string[];
}

interface Mentor {
  id: string;
  name: string;
  title: string;
  company: string;
  industry: string;
  experience: string;
  avatar: string;
  rating: number;
}

interface Skill {
  name: string;
  level: number;
  category: string;
}

export default function CareerDevelopment() {
  const [activeTab, setActiveTab] = useState('jobs');
  const [showProfileBuilder, setShowProfileBuilder] = useState(false);
  const [showSkillAssessment, setShowSkillAssessment] = useState(false);

  const jobs: Job[] = [
    {
      id: '1',
      title: 'Software Engineering Intern',
      company: 'Safaricom PLC',
      location: 'Nairobi, Kenya',
      type: 'internship',
      salary: 'KSh 50,000/month',
      posted: '2 days ago',
      logo: 'https://images.pexels.com/photos/1181263/pexels-photo-1181263.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      skills: ['JavaScript', 'React', 'Node.js'],
    },
    {
      id: '2',
      title: 'Data Analyst',
      company: 'Equity Bank',
      location: 'Nairobi, Kenya',
      type: 'entry-level',
      salary: 'KSh 80,000/month',
      posted: '1 week ago',
      logo: 'https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      skills: ['Python', 'SQL', 'Excel'],
    },
    {
      id: '3',
      title: 'Marketing Assistant',
      company: 'Kenya Airways',
      location: 'Nairobi, Kenya',
      type: 'part-time',
      salary: 'KSh 35,000/month',
      posted: '3 days ago',
      logo: 'https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      skills: ['Digital Marketing', 'Content Creation', 'Analytics'],
    },
  ];

  const mentors: Mentor[] = [
    {
      id: '1',
      name: 'Dr. Grace Wanjiku',
      title: 'Senior Software Engineer',
      company: 'Microsoft',
      industry: 'Technology',
      experience: '8 years',
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      rating: 4.9,
    },
    {
      id: '2',
      name: 'James Mwangi',
      title: 'Product Manager',
      company: 'Jumia',
      industry: 'E-commerce',
      experience: '6 years',
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      rating: 4.8,
    },
    {
      id: '3',
      name: 'Sarah Achieng',
      title: 'Financial Analyst',
      company: 'KCB Bank',
      industry: 'Banking',
      experience: '5 years',
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&dpr=2',
      rating: 4.7,
    },
  ];

  const skills: Skill[] = [
    { name: 'JavaScript', level: 75, category: 'Technical' },
    { name: 'Python', level: 60, category: 'Technical' },
    { name: 'Communication', level: 85, category: 'Soft Skills' },
    { name: 'Leadership', level: 70, category: 'Soft Skills' },
    { name: 'Project Management', level: 55, category: 'Professional' },
    { name: 'Data Analysis', level: 65, category: 'Technical' },
  ];

  const getJobTypeColor = (type: string) => {
    switch (type) {
      case 'internship': return '#4A90E2';
      case 'entry-level': return '#228B22';
      case 'part-time': return '#FFD700';
      default: return '#666';
    }
  };

  const getSkillColor = (level: number) => {
    if (level >= 80) return '#228B22';
    if (level >= 60) return '#FFD700';
    return '#BB0000';
  };

  const renderJobs = () => (
    <View style={styles.tabContent}>
      <View style={styles.jobsHeader}>
        <Text style={styles.sectionTitle}>Recommended Jobs</Text>
        <TouchableOpacity style={styles.filterButton}>
          <Ionicons name="filter" size={20} color="#666" />
        </TouchableOpacity>
      </View>

      {jobs.map((job) => (
        <TouchableOpacity key={job.id} style={styles.jobCard}>
          <View style={styles.jobHeader}>
            <Image source={{ uri: job.logo }} style={styles.companyLogo} />
            <View style={styles.jobInfo}>
              <Text style={styles.jobTitle}>{job.title}</Text>
              <Text style={styles.companyName}>{job.company}</Text>
              <View style={styles.jobMeta}>
                <Ionicons name="location" size={14} color="#666" />
                <Text style={styles.jobLocation}>{job.location}</Text>
                <View style={[styles.jobTypeBadge, { backgroundColor: getJobTypeColor(job.type) + '20' }]}>
                  <Text style={[styles.jobTypeText, { color: getJobTypeColor(job.type) }]}>
                    {job.type.replace('-', ' ').toUpperCase()}
                  </Text>
                </View>
              </View>
            </View>
            <TouchableOpacity style={styles.bookmarkButton}>
              <Ionicons name="bookmark-outline" size={20} color="#666" />
            </TouchableOpacity>
          </View>

          <View style={styles.jobDetails}>
            <Text style={styles.jobSalary}>{job.salary}</Text>
            <Text style={styles.jobPosted}>Posted {job.posted}</Text>
          </View>

          <View style={styles.skillsRequired}>
            <Text style={styles.skillsLabel}>Skills:</Text>
            <View style={styles.skillTags}>
              {job.skills.map((skill, index) => (
                <View key={index} style={styles.skillTag}>
                  <Text style={styles.skillTagText}>{skill}</Text>
                </View>
              ))}
            </View>
          </View>

          <TouchableOpacity style={styles.applyButton}>
            <Text style={styles.applyButtonText}>Apply Now</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      ))}

      {/* Job Search Tips */}
      <View style={styles.tipsSection}>
        <Text style={styles.sectionTitle}>Job Search Tips</Text>
        <View style={styles.tipCard}>
          <Ionicons name="bulb" size={24} color="#FFD700" />
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Tailor Your CV</Text>
            <Text style={styles.tipDesc}>Customize your CV for each application to match job requirements</Text>
          </View>
        </View>
        <View style={styles.tipCard}>
          <Ionicons name="people" size={24} color="#4A90E2" />
          <View style={styles.tipContent}>
            <Text style={styles.tipTitle}>Network Actively</Text>
            <Text style={styles.tipDesc}>Connect with professionals in your field through LinkedIn and events</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderMentorship = () => (
    <View style={styles.tabContent}>
      <Text style={styles.sectionTitle}>Find a Mentor</Text>
      
      {mentors.map((mentor) => (
        <View key={mentor.id} style={styles.mentorCard}>
          <Image source={{ uri: mentor.avatar }} style={styles.mentorAvatar} />
          <View style={styles.mentorInfo}>
            <Text style={styles.mentorName}>{mentor.name}</Text>
            <Text style={styles.mentorTitle}>{mentor.title}</Text>
            <Text style={styles.mentorCompany}>{mentor.company}</Text>
            <View style={styles.mentorMeta}>
              <View style={styles.mentorRating}>
                <Ionicons name="star" size={14} color="#FFD700" />
                <Text style={styles.ratingText}>{mentor.rating}</Text>
              </View>
              <Text style={styles.mentorExperience}>{mentor.experience} experience</Text>
            </View>
            <View style={styles.industryBadge}>
              <Text style={styles.industryText}>{mentor.industry}</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.connectButton}>
            <Text style={styles.connectButtonText}>Connect</Text>
          </TouchableOpacity>
        </View>
      ))}

      {/* Mentorship Benefits */}
      <View style={styles.benefitsSection}>
        <Text style={styles.sectionTitle}>Why Find a Mentor?</Text>
        <View style={styles.benefitsList}>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={20} color="#228B22" />
            <Text style={styles.benefitText}>Get industry insights and career guidance</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={20} color="#228B22" />
            <Text style={styles.benefitText}>Expand your professional network</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={20} color="#228B22" />
            <Text style={styles.benefitText}>Receive feedback on your career goals</Text>
          </View>
          <View style={styles.benefitItem}>
            <Ionicons name="checkmark-circle" size={20} color="#228B22" />
            <Text style={styles.benefitText}>Learn from real-world experience</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderSkills = () => (
    <View style={styles.tabContent}>
      <View style={styles.skillsHeader}>
        <Text style={styles.sectionTitle}>Skill Development</Text>
        <TouchableOpacity 
          style={styles.assessmentButton}
          onPress={() => setShowSkillAssessment(true)}>
          <Text style={styles.assessmentButtonText}>Take Assessment</Text>
        </TouchableOpacity>
      </View>

      {/* Skill Progress */}
      <View style={styles.skillsProgress}>
        {skills.map((skill, index) => (
          <View key={index} style={styles.skillItem}>
            <View style={styles.skillHeader}>
              <Text style={styles.skillName}>{skill.name}</Text>
              <Text style={[styles.skillLevel, { color: getSkillColor(skill.level) }]}>
                {skill.level}%
              </Text>
            </View>
            <View style={styles.skillBar}>
              <View 
                style={[
                  styles.skillFill, 
                  { 
                    width: `${skill.level}%`,
                    backgroundColor: getSkillColor(skill.level)
                  }
                ]} 
              />
            </View>
            <Text style={styles.skillCategory}>{skill.category}</Text>
          </View>
        ))}
      </View>

      {/* Recommended Courses */}
      <View style={styles.coursesSection}>
        <Text style={styles.sectionTitle}>Recommended Courses</Text>
        <TouchableOpacity style={styles.courseCard}>
          <View style={styles.courseIcon}>
            <Ionicons name="code" size={24} color="#4A90E2" />
          </View>
          <View style={styles.courseContent}>
            <Text style={styles.courseTitle}>Advanced JavaScript</Text>
            <Text style={styles.courseProvider}>Coursera • 6 weeks</Text>
            <Text style={styles.courseDesc}>Master modern JavaScript concepts and frameworks</Text>
          </View>
          <TouchableOpacity style={styles.enrollButton}>
            <Text style={styles.enrollButtonText}>Enroll</Text>
          </TouchableOpacity>
        </TouchableOpacity>

        <TouchableOpacity style={styles.courseCard}>
          <View style={styles.courseIcon}>
            <Ionicons name="bar-chart" size={24} color="#228B22" />
          </View>
          <View style={styles.courseContent}>
            <Text style={styles.courseTitle}>Data Analysis with Python</Text>
            <Text style={styles.courseProvider}>edX • 8 weeks</Text>
            <Text style={styles.courseDesc}>Learn data manipulation and visualization</Text>
          </View>
          <TouchableOpacity style={styles.enrollButton}>
            <Text style={styles.enrollButtonText}>Enroll</Text>
          </TouchableOpacity>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <LinearGradient
        colors={['#4A90E2', '#357ABD']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
        <Text style={styles.headerTitle}>Career Development</Text>
        <Text style={styles.headerSubtitle}>Build your professional future</Text>
        <TouchableOpacity 
          style={styles.profileBuilderButton}
          onPress={() => setShowProfileBuilder(true)}>
          <Ionicons name="person" size={20} color="#fff" />
          <Text style={styles.profileBuilderText}>Build Profile</Text>
        </TouchableOpacity>
      </LinearGradient>

      {/* Tab Navigation */}
      <View style={styles.tabNavigation}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'jobs' && styles.activeTab]}
          onPress={() => setActiveTab('jobs')}>
          <Text style={[styles.tabText, activeTab === 'jobs' && styles.activeTabText]}>
            Jobs
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'mentorship' && styles.activeTab]}
          onPress={() => setActiveTab('mentorship')}>
          <Text style={[styles.tabText, activeTab === 'mentorship' && styles.activeTabText]}>
            Mentorship
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'skills' && styles.activeTab]}
          onPress={() => setActiveTab('skills')}>
          <Text style={[styles.tabText, activeTab === 'skills' && styles.activeTabText]}>
            Skills
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'jobs' && renderJobs()}
        {activeTab === 'mentorship' && renderMentorship()}
        {activeTab === 'skills' && renderSkills()}
      </ScrollView>

      {/* Profile Builder Modal */}
      <Modal
        visible={showProfileBuilder}
        animationType="slide"
        presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowProfileBuilder(false)}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Build Your Profile</Text>
            <TouchableOpacity>
              <Text style={styles.saveButton}>Save</Text>
            </TouchableOpacity>
          </View>
          
          <ScrollView style={styles.profileBuilderContent}>
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Professional Summary</Text>
              <TextInput
                style={styles.textArea}
                placeholder="Write a brief summary of your skills and career goals..."
                multiline
                numberOfLines={4}
                placeholderTextColor="#999"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Skills</Text>
              <TextInput
                style={styles.textInput}
                placeholder="e.g., JavaScript, Python, Communication"
                placeholderTextColor="#999"
              />
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Experience</Text>
              <TouchableOpacity style={styles.addExperienceButton}>
                <Ionicons name="add" size={20} color="#4A90E2" />
                <Text style={styles.addExperienceText}>Add Experience</Text>
              </TouchableOpacity>
            </View>
            
            <View style={styles.inputGroup}>
              <Text style={styles.inputLabel}>Education</Text>
              <TouchableOpacity style={styles.addEducationButton}>
                <Ionicons name="add" size={20} color="#4A90E2" />
                <Text style={styles.addEducationText}>Add Education</Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
      </Modal>

      {/* Skill Assessment Modal */}
      <Modal
        visible={showSkillAssessment}
        animationType="slide"
        presentationStyle="pageSheet">
        <SafeAreaView style={styles.modal}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={() => setShowSkillAssessment(false)}>
              <Text style={styles.cancelButton}>Cancel</Text>
            </TouchableOpacity>
            <Text style={styles.modalTitle}>Skill Assessment</Text>
            <TouchableOpacity>
              <Text style={styles.saveButton}>Start</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.assessmentContent}>
            <View style={styles.assessmentIcon}>
              <Ionicons name="analytics" size={60} color="#4A90E2" />
            </View>
            <Text style={styles.assessmentTitle}>Discover Your Strengths</Text>
            <Text style={styles.assessmentDesc}>
              Take our comprehensive skill assessment to identify your strengths and areas for improvement.
            </Text>
            
            <View style={styles.assessmentFeatures}>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="#228B22" />
                <Text style={styles.featureText}>Personalized skill analysis</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="#228B22" />
                <Text style={styles.featureText}>Career recommendations</Text>
              </View>
              <View style={styles.featureItem}>
                <Ionicons name="checkmark-circle" size={20} color="#228B22" />
                <Text style={styles.featureText}>Learning path suggestions</Text>
              </View>
            </View>
            
            <TouchableOpacity style={styles.startAssessmentButton}>
              <Text style={styles.startAssessmentText}>Start Assessment</Text>
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
    marginBottom: 20,
  },
  profileBuilderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  profileBuilderText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
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
    borderBottomColor: '#4A90E2',
  },
  tabText: {
    fontSize: 16,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  content: {
    flex: 1,
  },
  tabContent: {
    padding: 20,
  },
  jobsHeader: {
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
  filterButton: {
    padding: 8,
  },
  jobCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  jobHeader: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  companyLogo: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 15,
  },
  jobInfo: {
    flex: 1,
  },
  jobTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 4,
  },
  companyName: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  jobMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  jobLocation: {
    fontSize: 14,
    color: '#666',
    marginLeft: 4,
    marginRight: 10,
  },
  jobTypeBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  jobTypeText: {
    fontSize: 10,
    fontWeight: 'bold',
  },
  bookmarkButton: {
    padding: 5,
  },
  jobDetails: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  jobSalary: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#228B22',
  },
  jobPosted: {
    fontSize: 12,
    color: '#999',
  },
  skillsRequired: {
    marginBottom: 15,
  },
  skillsLabel: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 8,
  },
  skillTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  skillTag: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
    marginRight: 8,
    marginBottom: 5,
  },
  skillTagText: {
    fontSize: 12,
    color: '#666',
  },
  applyButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 8,
    paddingVertical: 12,
    alignItems: 'center',
  },
  applyButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  tipsSection: {
    marginTop: 20,
  },
  tipCard: {
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
  tipContent: {
    flex: 1,
    marginLeft: 15,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 4,
  },
  tipDesc: {
    fontSize: 14,
    color: '#666',
  },
  mentorCard: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  mentorAvatar: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 15,
  },
  mentorInfo: {
    flex: 1,
  },
  mentorName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 4,
  },
  mentorTitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 2,
  },
  mentorCompany: {
    fontSize: 14,
    color: '#4A90E2',
    marginBottom: 8,
  },
  mentorMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  mentorRating: {
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 15,
  },
  ratingText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 4,
  },
  mentorExperience: {
    fontSize: 12,
    color: '#666',
  },
  industryBadge: {
    backgroundColor: '#f0f0f0',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf:  'flex-start',
  },
  industryText: {
    fontSize: 12,
    color: '#666',
  },
  connectButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    alignSelf: 'center',
  },
  connectButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  benefitsSection: {
    marginTop: 20,
  },
  benefitsList: {
    marginTop: 15,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  benefitText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 10,
    flex: 1,
  },
  skillsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  assessmentButton: {
    backgroundColor: '#4A90E2',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
  },
  assessmentButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: 'bold',
  },
  skillsProgress: {
    marginBottom: 30,
  },
  skillItem: {
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
  skillHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  skillName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
  },
  skillLevel: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  skillBar: {
    height: 6,
    backgroundColor: '#f0f0f0',
    borderRadius: 3,
    marginBottom: 8,
  },
  skillFill: {
    height: '100%',
    borderRadius: 3,
  },
  skillCategory: {
    fontSize: 12,
    color: '#666',
  },
  coursesSection: {
    marginTop: 20,
  },
  courseCard: {
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
  courseIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  courseContent: {
    flex: 1,
  },
  courseTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 4,
  },
  courseProvider: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  courseDesc: {
    fontSize: 14,
    color: '#666',
  },
  enrollButton: {
    backgroundColor: '#228B22',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    alignSelf: 'center',
  },
  enrollButtonText: {
    color: '#fff',
    fontSize: 14,
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
    color: '#4A90E2',
    fontWeight: 'bold',
  },
  profileBuilderContent: {
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
  textArea: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    fontSize: 16,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    minHeight: 100,
    textAlignVertical: 'top',
  },
  addExperienceButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  addExperienceText: {
    fontSize: 16,
    color: '#4A90E2',
    marginLeft: 8,
  },
  addEducationButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  addEducationText: {
    fontSize: 16,
    color: '#4A90E2',
    marginLeft: 8,
  },
  assessmentContent: {
    flex: 1,
    padding: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  assessmentIcon: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#4A90E2' + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
  },
  assessmentTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 15,
    textAlign: 'center',
  },
  assessmentDesc: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
  },
  assessmentFeatures: {
    width: '100%',
    marginBottom: 30,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureText: {
    fontSize: 16,
    color: '#36454F',
    marginLeft: 10,
  },
  startAssessmentButton: {
    backgroundColor: '#4A90E2',
    borderRadius: 12,
    paddingVertical: 15,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  startAssessmentText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});