import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  Image,
  Alert,
  Dimensions,
  TextInput,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const { width } = Dimensions.get('window');

interface OnboardingData {
  profilePhoto: string | null;
  campusLocation: string;
  studyPreferences: string[];
  mpesaNumber: string;
  communityInterests: string[];
  completedSteps: number[];
  hasSkippedSteps: boolean[];
}

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    profilePhoto: null,
    campusLocation: '',
    studyPreferences: [],
    mpesaNumber: '',
    communityInterests: [],
    completedSteps: [],
    hasSkippedSteps: [false, false, false, false, false],
  });

  const totalSteps = 5;

  const campusLocations = [
    'University of Nairobi - Main Campus',
    'University of Nairobi - Chiromo Campus',
    'University of Nairobi - Lower Kabete Campus',
    'Kenyatta University - Main Campus',
    'Kenyatta University - Ruiru Campus',
    'Moi University - Main Campus',
    'Moi University - Nairobi Campus',
    'JKUAT - Main Campus',
    'JKUAT - Karen Campus',
    'Strathmore University',
    'USIU-Africa',
    'Daystar University',
    'Catholic University of Eastern Africa',
    'Africa Nazarene University',
    'Mount Kenya University',
    'Kenya Methodist University',
    'Technical University of Kenya',
    'Dedan Kimathi University of Technology',
    'Egerton University - Main Campus',
    'Maseno University',
  ];

  const studyPreferenceOptions = [
    { id: 'morning', label: 'Morning Study Sessions', icon: 'sunny', color: '#FFD700' },
    { id: 'evening', label: 'Evening Study Sessions', icon: 'moon', color: '#6B46C1' },
    { id: 'group', label: 'Group Study', icon: 'people', color: '#4A90E2' },
    { id: 'solo', label: 'Solo Study', icon: 'person', color: '#228B22' },
    { id: 'library', label: 'Library Environment', icon: 'library', color: '#8B4513' },
    { id: 'outdoor', label: 'Outdoor Study', icon: 'leaf', color: '#32CD32' },
    { id: 'music', label: 'Music While Studying', icon: 'musical-notes', color: '#FF6B6B' },
    { id: 'silence', label: 'Complete Silence', icon: 'volume-mute', color: '#666' },
    { id: 'breaks', label: 'Frequent Breaks', icon: 'time', color: '#FFA500' },
    { id: 'marathon', label: 'Long Study Sessions', icon: 'fitness', color: '#DC143C' },
  ];

  const communityOptions = [
    { id: 'academic', label: 'Academic Study Groups', icon: 'school', color: '#4A90E2', description: 'Join subject-specific study groups' },
    { id: 'sports', label: 'Sports & Fitness', icon: 'fitness', color: '#228B22', description: 'Connect with fitness enthusiasts' },
    { id: 'arts', label: 'Arts & Culture', icon: 'color-palette', color: '#FF6B6B', description: 'Explore creative communities' },
    { id: 'tech', label: 'Technology & Innovation', icon: 'laptop', color: '#6B46C1', description: 'Tech meetups and coding groups' },
    { id: 'business', label: 'Entrepreneurship', icon: 'briefcase', color: '#FFD700', description: 'Business and startup communities' },
    { id: 'volunteer', label: 'Volunteer Work', icon: 'heart', color: '#FF69B4', description: 'Community service opportunities' },
    { id: 'religious', label: 'Religious Groups', icon: 'book', color: '#8B4513', description: 'Faith-based communities' },
    { id: 'social', label: 'Social Events', icon: 'people', color: '#FFA500', description: 'Social gatherings and events' },
    { id: 'debate', label: 'Debate & Discussion', icon: 'chatbubbles', color: '#87CEEB', description: 'Intellectual discussions' },
    { id: 'music', label: 'Music & Performance', icon: 'musical-notes', color: '#9370DB', description: 'Musical groups and performances' },
  ];

  const featureTourSteps = [
    {
      title: 'AI Study Assistant',
      description: 'Get personalized help with your coursework, create quizzes, and receive study recommendations.',
      icon: 'sparkles',
      color: '#BB0000',
    },
    {
      title: 'Smart Budgeting',
      description: 'Track your expenses, link M-Pesa, and discover scholarship opportunities.',
      icon: 'wallet',
      color: '#228B22',
    },
    {
      title: 'Campus Community',
      description: 'Connect with classmates, join study groups, and participate in campus events.',
      icon: 'people',
      color: '#4A90E2',
    },
    {
      title: 'Schedule Management',
      description: 'Organize your classes, assignments, and study sessions with smart reminders.',
      icon: 'calendar',
      color: '#FFD700',
    },
    {
      title: 'Wellness Tracking',
      description: 'Monitor your mental health, access support resources, and maintain work-life balance.',
      icon: 'heart',
      color: '#FF6B6B',
    },
  ];

  const pickImage = () => {
    Alert.alert(
      'Select Profile Photo',
      'Choose how you\'d like to add your profile photo',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Camera', onPress: () => simulateImagePicker('camera') },
        { text: 'Gallery', onPress: () => simulateImagePicker('gallery') },
      ]
    );
  };

  const simulateImagePicker = (source: string) => {
    // Simulate image selection
    const demoImages = [
      'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
      'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=200&h=200&dpr=2',
    ];
    
    const randomImage = demoImages[Math.floor(Math.random() * demoImages.length)];
    setData(prev => ({ ...prev, profilePhoto: randomImage }));
    
    Alert.alert('Success', `Profile photo selected from ${source}!`);
  };

  const togglePreference = (preferenceId: string) => {
    setData(prev => ({
      ...prev,
      studyPreferences: prev.studyPreferences.includes(preferenceId)
        ? prev.studyPreferences.filter(p => p !== preferenceId)
        : [...prev.studyPreferences, preferenceId]
    }));
  };

  const toggleCommunity = (communityId: string) => {
    setData(prev => ({
      ...prev,
      communityInterests: prev.communityInterests.includes(communityId)
        ? prev.communityInterests.filter(i => i !== communityId)
        : [...prev.communityInterests, communityId]
    }));
  };

  const saveProgress = (step: number, skipped: boolean = false) => {
    setData(prev => ({
      ...prev,
      completedSteps: skipped ? prev.completedSteps : [...prev.completedSteps, step],
      hasSkippedSteps: prev.hasSkippedSteps.map((skip, index) => 
        index === step - 1 ? skipped : skip
      )
    }));
  };

  const handleNext = () => {
    saveProgress(currentStep);
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleSkip = () => {
    saveProgress(currentStep, true);
    
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    const completionRate = ((data.completedSteps.length / totalSteps) * 100).toFixed(0);
    
    Alert.alert(
      'Welcome to StudentLife AI!',
      `Your profile setup is ${completionRate}% complete. You can always update your preferences later in settings.`,
      [{ text: 'Get Started', onPress: () => router.replace('/(tabs)') }]
    );
  };

  const linkMPesa = () => {
    if (!data.mpesaNumber) {
      Alert.alert('Error', 'Please enter your M-Pesa phone number');
      return;
    }

    Alert.alert(
      'Link M-Pesa Account',
      `Send verification code to ${data.mpesaNumber}?`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Send Code', 
          onPress: () => {
            Alert.alert(
              'Verification Code Sent',
              'A verification code has been sent to your phone. For demo purposes, enter any 4-digit code.',
              [{ text: 'OK' }]
            );
          }
        },
      ]
    );
  };

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${(currentStep / totalSteps) * 100}%` }]} />
      </View>
      <Text style={styles.progressText}>Step {currentStep} of {totalSteps}</Text>
      <View style={styles.progressDots}>
        {Array.from({ length: totalSteps }, (_, index) => (
          <View
            key={index}
            style={[
              styles.progressDot,
              index < currentStep ? styles.completedDot : 
              index === currentStep - 1 ? styles.activeDot : styles.inactiveDot
            ]}
          />
        ))}
      </View>
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Welcome to StudentLife AI!</Text>
        <Text style={styles.stepSubtitle}>Let's personalize your experience</Text>
      </View>
      
      <View style={styles.photoSection}>
        <TouchableOpacity style={styles.photoContainer} onPress={pickImage}>
          {data.profilePhoto ? (
            <Image source={{ uri: data.profilePhoto }} style={styles.profilePhoto} />
          ) : (
            <View style={styles.photoPlaceholder}>
              <Ionicons name="camera" size={40} color="#666" />
              <Text style={styles.photoText}>Add Profile Photo</Text>
            </View>
          )}
          <View style={styles.photoEditBadge}>
            <Ionicons name="camera" size={16} color="#fff" />
          </View>
        </TouchableOpacity>
        
        <Text style={styles.photoHint}>
          Add a profile photo to help your classmates recognize you in study groups and campus events
        </Text>
      </View>

      <View style={styles.welcomeFeatures}>
        <Text style={styles.featuresTitle}>What you'll get:</Text>
        <View style={styles.featuresList}>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#228B22" />
            <Text style={styles.featureText}>AI-powered study assistance</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#228B22" />
            <Text style={styles.featureText}>Smart budget tracking with M-Pesa</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#228B22" />
            <Text style={styles.featureText}>Campus community connections</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="checkmark-circle" size={20} color="#228B22" />
            <Text style={styles.featureText}>Personalized study schedules</Text>
          </View>
        </View>
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Select Your Campus</Text>
        <Text style={styles.stepSubtitle}>Choose your primary campus location for local features</Text>
      </View>
      
      <ScrollView style={styles.optionsList} nestedScrollEnabled>
        {campusLocations.map((location, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionItem,
              data.campusLocation === location && styles.selectedOption
            ]}
            onPress={() => setData(prev => ({ ...prev, campusLocation: location }))}>
            <View style={styles.optionContent}>
              <Ionicons name="location" size={20} color="#666" />
              <Text style={[
                styles.optionText,
                data.campusLocation === location && styles.selectedOptionText
              ]}>
                {location}
              </Text>
            </View>
            {data.campusLocation === location && (
              <Ionicons name="checkmark-circle" size={20} color="#BB0000" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.campusFeatures}>
        <Text style={styles.featuresTitle}>Campus-specific features:</Text>
        <Text style={styles.featureText}>• Local study group recommendations</Text>
        <Text style={styles.featureText}>• Campus event notifications</Text>
        <Text style={styles.featureText}>• Nearby resource locations</Text>
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Study Preferences</Text>
        <Text style={styles.stepSubtitle}>Help us personalize your study recommendations</Text>
      </View>
      
      <View style={styles.preferencesGrid}>
        {studyPreferenceOptions.map((preference) => (
          <TouchableOpacity
            key={preference.id}
            style={[
              styles.preferenceCard,
              data.studyPreferences.includes(preference.id) && styles.selectedPreference
            ]}
            onPress={() => togglePreference(preference.id)}>
            <View style={[styles.preferenceIcon, { backgroundColor: preference.color + '20' }]}>
              <Ionicons name={preference.icon} size={24} color={preference.color} />
            </View>
            <Text style={[
              styles.preferenceText,
              data.studyPreferences.includes(preference.id) && styles.selectedPreferenceText
            ]}>
              {preference.label}
            </Text>
            {data.studyPreferences.includes(preference.id) && (
              <View style={styles.selectedBadge}>
                <Ionicons name="checkmark" size={16} color="#fff" />
              </View>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.selectionCounter}>
        <Text style={styles.counterText}>
          {data.studyPreferences.length} preferences selected
        </Text>
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Financial Setup</Text>
        <Text style={styles.stepSubtitle}>Link your M-Pesa for smart budget tracking</Text>
      </View>
      
      <View style={styles.mpesaContainer}>
        <View style={styles.mpesaIcon}>
          <Ionicons name="phone-portrait" size={40} color="#228B22" />
        </View>
        <Text style={styles.mpesaTitle}>Connect M-Pesa</Text>
        <Text style={styles.mpesaDesc}>
          Link your M-Pesa account to automatically track expenses, categorize spending, and get budget insights
        </Text>
        
        <Input
          label="M-Pesa Phone Number"
          placeholder="+254 7XX XXX XXX"
          value={data.mpesaNumber}
          onChangeText={(text) => setData(prev => ({ ...prev, mpesaNumber: text }))}
          keyboardType="phone-pad"
          leftIcon="call"
        />
        
        <TouchableOpacity style={styles.linkButton} onPress={linkMPesa}>
          <Text style={styles.linkButtonText}>Link M-Pesa Account</Text>
        </TouchableOpacity>

        <View style={styles.mpesaFeatures}>
          <Text style={styles.featuresTitle}>What you'll get:</Text>
          <View style={styles.featureItem}>
            <Ionicons name="analytics" size={16} color="#228B22" />
            <Text style={styles.featureText}>Automatic expense categorization</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="notifications" size={16} color="#228B22" />
            <Text style={styles.featureText}>Budget alerts and insights</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="school" size={16} color="#228B22" />
            <Text style={styles.featureText}>Scholarship opportunity notifications</Text>
          </View>
        </View>
        
        <View style={styles.securityNote}>
          <Ionicons name="shield-checkmark" size={20} color="#228B22" />
          <Text style={styles.securityText}>
            Your financial data is encrypted and secure. We use bank-level security.
          </Text>
        </View>
      </View>
    </View>
  );

  const renderStep5 = () => (
    <View style={styles.stepContainer}>
      <View style={styles.stepHeader}>
        <Text style={styles.stepTitle}>Join Communities</Text>
        <Text style={styles.stepSubtitle}>Connect with like-minded students and expand your network</Text>
      </View>
      
      <ScrollView style={styles.communityList} nestedScrollEnabled>
        {communityOptions.map((community) => (
          <TouchableOpacity
            key={community.id}
            style={[
              styles.communityCard,
              data.communityInterests.includes(community.id) && styles.selectedCommunity
            ]}
            onPress={() => toggleCommunity(community.id)}>
            <View style={[styles.communityIcon, { backgroundColor: community.color + '20' }]}>
              <Ionicons name={community.icon} size={24} color={community.color} />
            </View>
            <View style={styles.communityContent}>
              <Text style={[
                styles.communityTitle,
                data.communityInterests.includes(community.id) && styles.selectedCommunityText
              ]}>
                {community.label}
              </Text>
              <Text style={styles.communityDesc}>{community.description}</Text>
            </View>
            {data.communityInterests.includes(community.id) && (
              <Ionicons name="checkmark-circle" size={24} color={community.color} />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <View style={styles.communityStats}>
        <Text style={styles.statsText}>
          {data.communityInterests.length} communities selected
        </Text>
        <Text style={styles.statsSubtext}>
          You can join more communities later from the Community tab
        </Text>
      </View>
    </View>
  );

  const canProceed = () => {
    switch (currentStep) {
      case 1: return true; // Profile photo is optional
      case 2: return data.campusLocation !== '';
      case 3: return data.studyPreferences.length > 0;
      case 4: return true; // M-Pesa linking is optional
      case 5: return data.communityInterests.length > 0;
      default: return true;
    }
  };

  const canSkip = () => {
    // All steps except campus selection can be skipped
    return currentStep !== 2;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : router.back()}>
          <Ionicons name="arrow-back" size={24} color="#36454F" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Setup Profile</Text>
        {canSkip() && (
          <TouchableOpacity onPress={handleSkip}>
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        )}
      </View>

      {renderProgressBar()}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
      </ScrollView>

      {/* Action Container */}
      <View style={styles.actionContainer}>
        <Button
          title={currentStep === totalSteps ? 'Complete Setup' : 'Continue'}
          onPress={handleNext}
          variant="primary"
          gradient
          fullWidth
          icon={currentStep === totalSteps ? 'checkmark' : 'arrow-forward'}
          iconPosition="right"
          disabled={!canProceed()}
        />
        
        {canSkip() && (
          <TouchableOpacity style={styles.skipButton} onPress={handleSkip}>
            <Text style={styles.skipButtonText}>
              Skip this step
            </Text>
          </TouchableOpacity>
        )}
      </View>
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
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    padding: 5,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#36454F',
  },
  skipText: {
    fontSize: 16,
    color: '#666',
  },
  progressContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  progressBar: {
    width: '100%',
    height: 4,
    backgroundColor: '#e0e0e0',
    borderRadius: 2,
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#BB0000',
    borderRadius: 2,
  },
  progressText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 10,
  },
  progressDots: {
    flexDirection: 'row',
    gap: 8,
  },
  progressDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  completedDot: {
    backgroundColor: '#BB0000',
  },
  activeDot: {
    backgroundColor: '#BB0000',
  },
  inactiveDot: {
    backgroundColor: '#e0e0e0',
  },
  content: {
    flex: 1,
  },
  stepContainer: {
    padding: 20,
  },
  stepHeader: {
    alignItems: 'center',
    marginBottom: 30,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 8,
    textAlign: 'center',
  },
  stepSubtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  photoContainer: {
    position: 'relative',
    marginBottom: 15,
  },
  profilePhoto: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  photoPlaceholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#e0e0e0',
    borderStyle: 'dashed',
  },
  photoText: {
    fontSize: 12,
    color: '#666',
    marginTop: 8,
    textAlign: 'center',
  },
  photoEditBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#BB0000',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  photoHint: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    lineHeight: 20,
    maxWidth: 280,
  },
  welcomeFeatures: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginTop: 20,
  },
  featuresTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 15,
  },
  featuresList: {
    gap: 12,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  featureText: {
    fontSize: 14,
    color: '#666',
    flex: 1,
  },
  optionsList: {
    maxHeight: 400,
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 20,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedOption: {
    backgroundColor: '#BB0000' + '10',
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  optionText: {
    fontSize: 16,
    color: '#36454F',
    marginLeft: 12,
    flex: 1,
  },
  selectedOptionText: {
    color: '#BB0000',
    fontWeight: '600',
  },
  campusFeatures: {
    backgroundColor: '#4A90E2' + '10',
    borderRadius: 12,
    padding: 15,
  },
  preferencesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    marginBottom: 20,
  },
  preferenceCard: {
    width: (width - 52) / 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'transparent',
    position: 'relative',
  },
  selectedPreference: {
    borderColor: '#BB0000',
    backgroundColor: '#BB0000' + '05',
  },
  preferenceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  preferenceText: {
    fontSize: 12,
    color: '#36454F',
    textAlign: 'center',
    fontWeight: '500',
  },
  selectedPreferenceText: {
    color: '#BB0000',
    fontWeight: 'bold',
  },
  selectedBadge: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#BB0000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectionCounter: {
    alignItems: 'center',
  },
  counterText: {
    fontSize: 14,
    color: '#666',
  },
  mpesaContainer: {
    alignItems: 'center',
  },
  mpesaIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#228B22' + '20',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  mpesaTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 10,
  },
  mpesaDesc: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 20,
  },
  linkButton: {
    backgroundColor: '#228B22',
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 30,
    marginTop: 15,
    marginBottom: 20,
  },
  linkButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  mpesaFeatures: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
  },
  securityNote: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#228B22' + '10',
    padding: 15,
    borderRadius: 12,
    width: '100%',
  },
  securityText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 10,
    flex: 1,
    lineHeight: 18,
  },
  communityList: {
    maxHeight: 400,
    marginBottom: 20,
  },
  communityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  selectedCommunity: {
    borderColor: '#BB0000',
    backgroundColor: '#BB0000' + '05',
  },
  communityIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  communityContent: {
    flex: 1,
  },
  communityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 4,
  },
  selectedCommunityText: {
    color: '#BB0000',
  },
  communityDesc: {
    fontSize: 12,
    color: '#666',
  },
  communityStats: {
    alignItems: 'center',
  },
  statsText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#36454F',
  },
  statsSubtext: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  actionContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  skipButton: {
    alignItems: 'center',
    paddingVertical: 12,
    marginTop: 10,
  },
  skipButtonText: {
    fontSize: 14,
    color: '#666',
  },
});