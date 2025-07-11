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
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import * as ImagePicker from 'expo-image-picker';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const { width } = Dimensions.get('window');

interface OnboardingData {
  profilePhoto: string | null;
  campusLocation: string;
  studyPreferences: string[];
  mpesaNumber: string;
  communityInterests: string[];
}

export default function Onboarding() {
  const [currentStep, setCurrentStep] = useState(1);
  const [data, setData] = useState<OnboardingData>({
    profilePhoto: null,
    campusLocation: '',
    studyPreferences: [],
    mpesaNumber: '',
    communityInterests: [],
  });

  const totalSteps = 5;

  const campusLocations = [
    'University of Nairobi - Main Campus',
    'University of Nairobi - Chiromo Campus',
    'Kenyatta University',
    'Moi University',
    'JKUAT - Main Campus',
    'Strathmore University',
    'USIU-Africa',
  ];

  const studyPreferenceOptions = [
    'Morning Study Sessions',
    'Evening Study Sessions',
    'Group Study',
    'Solo Study',
    'Library Environment',
    'Outdoor Study',
    'Music While Studying',
    'Complete Silence',
  ];

  const communityOptions = [
    'Academic Study Groups',
    'Sports & Fitness',
    'Arts & Culture',
    'Technology & Innovation',
    'Entrepreneurship',
    'Volunteer Work',
    'Religious Groups',
    'Social Events',
  ];

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setData(prev => ({ ...prev, profilePhoto: result.assets[0].uri }));
    }
  };

  const togglePreference = (preference: string) => {
    setData(prev => ({
      ...prev,
      studyPreferences: prev.studyPreferences.includes(preference)
        ? prev.studyPreferences.filter(p => p !== preference)
        : [...prev.studyPreferences, preference]
    }));
  };

  const toggleCommunity = (interest: string) => {
    setData(prev => ({
      ...prev,
      communityInterests: prev.communityInterests.includes(interest)
        ? prev.communityInterests.filter(i => i !== interest)
        : [...prev.communityInterests, interest]
    }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      handleComplete();
    }
  };

  const handleComplete = () => {
    // Save onboarding data
    Alert.alert(
      'Welcome to StudentLife AI!',
      'Your profile has been set up successfully.',
      [{ text: 'Get Started', onPress: () => router.replace('/(tabs)') }]
    );
  };

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${(currentStep / totalSteps) * 100}%` }]} />
      </View>
      <Text style={styles.progressText}>Step {currentStep} of {totalSteps}</Text>
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Welcome to StudentLife AI!</Text>
      <Text style={styles.stepSubtitle}>Let's set up your profile</Text>
      
      <TouchableOpacity style={styles.photoContainer} onPress={pickImage}>
        {data.profilePhoto ? (
          <Image source={{ uri: data.profilePhoto }} style={styles.profilePhoto} />
        ) : (
          <View style={styles.photoPlaceholder}>
            <Ionicons name="camera" size={40} color="#666" />
            <Text style={styles.photoText}>Add Profile Photo</Text>
          </View>
        )}
      </TouchableOpacity>
      
      <Text style={styles.photoHint}>
        Add a profile photo to help your classmates recognize you
      </Text>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Select Your Campus</Text>
      <Text style={styles.stepSubtitle}>Choose your primary campus location</Text>
      
      <ScrollView style={styles.optionsList}>
        {campusLocations.map((location, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionItem,
              data.campusLocation === location && styles.selectedOption
            ]}
            onPress={() => setData(prev => ({ ...prev, campusLocation: location }))}>
            <Text style={[
              styles.optionText,
              data.campusLocation === location && styles.selectedOptionText
            ]}>
              {location}
            </Text>
            {data.campusLocation === location && (
              <Ionicons name="checkmark" size={20} color="#BB0000" />
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Study Preferences</Text>
      <Text style={styles.stepSubtitle}>How do you prefer to study?</Text>
      
      <View style={styles.preferencesGrid}>
        {studyPreferenceOptions.map((preference, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.preferenceChip,
              data.studyPreferences.includes(preference) && styles.selectedChip
            ]}
            onPress={() => togglePreference(preference)}>
            <Text style={[
              styles.chipText,
              data.studyPreferences.includes(preference) && styles.selectedChipText
            ]}>
              {preference}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Financial Setup</Text>
      <Text style={styles.stepSubtitle}>Link your M-Pesa for budget tracking</Text>
      
      <View style={styles.mpesaContainer}>
        <View style={styles.mpesaIcon}>
          <Ionicons name="phone-portrait" size={40} color="#228B22" />
        </View>
        <Text style={styles.mpesaTitle}>Connect M-Pesa</Text>
        <Text style={styles.mpesaDesc}>
          Link your M-Pesa account to automatically track expenses and manage your budget
        </Text>
        
        <Input
          label="M-Pesa Phone Number"
          placeholder="+254 7XX XXX XXX"
          value={data.mpesaNumber}
          onChangeText={(text) => setData(prev => ({ ...prev, mpesaNumber: text }))}
          keyboardType="phone-pad"
          leftIcon="call"
        />
        
        <View style={styles.securityNote}>
          <Ionicons name="shield-checkmark" size={20} color="#228B22" />
          <Text style={styles.securityText}>
            Your financial data is encrypted and secure
          </Text>
        </View>
      </View>
    </View>
  );

  const renderStep5 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Join Communities</Text>
      <Text style={styles.stepSubtitle}>Connect with like-minded students</Text>
      
      <View style={styles.communityGrid}>
        {communityOptions.map((interest, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.communityCard,
              data.communityInterests.includes(interest) && styles.selectedCommunity
            ]}
            onPress={() => toggleCommunity(interest)}>
            <Text style={[
              styles.communityText,
              data.communityInterests.includes(interest) && styles.selectedCommunityText
            ]}>
              {interest}
            </Text>
            {data.communityInterests.includes(interest) && (
              <Ionicons name="checkmark-circle" size={20} color="#BB0000" />
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

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
        <TouchableOpacity onPress={() => router.replace('/(tabs)')}>
          <Text style={styles.skipText}>Skip</Text>
        </TouchableOpacity>
      </View>

      {renderProgressBar()}

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {currentStep === 1 && renderStep1()}
        {currentStep === 2 && renderStep2()}
        {currentStep === 3 && renderStep3()}
        {currentStep === 4 && renderStep4()}
        {currentStep === 5 && renderStep5()}
      </ScrollView>

      {/* Action Button */}
      <View style={styles.actionContainer}>
        <Button
          title={currentStep === totalSteps ? 'Complete Setup' : 'Next'}
          onPress={handleNext}
          variant="primary"
          gradient
          fullWidth
          icon={currentStep === totalSteps ? 'checkmark' : 'arrow-forward'}
          iconPosition="right"
        />
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
  },
  progressBar: {
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
    textAlign: 'center',
  },
  content: {
    flex: 1,
  },
  stepContainer: {
    padding: 20,
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
    marginBottom: 30,
    textAlign: 'center',
  },
  photoContainer: {
    alignSelf: 'center',
    marginBottom: 20,
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
  },
  photoHint: {
    fontSize: 14,
    color: '#666',
    textAlign: 'center',
  },
  optionsList: {
    maxHeight: 400,
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedOption: {
    borderColor: '#BB0000',
    backgroundColor: '#BB0000' + '10',
  },
  optionText: {
    fontSize: 16,
    color: '#36454F',
  },
  selectedOptionText: {
    color: '#BB0000',
    fontWeight: '600',
  },
  preferencesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  preferenceChip: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 10,
  },
  selectedChip: {
    backgroundColor: '#BB0000',
    borderColor: '#BB0000',
  },
  chipText: {
    fontSize: 14,
    color: '#36454F',
    fontWeight: '500',
  },
  selectedChipText: {
    color: '#fff',
    fontWeight: 'bold',
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
  securityNote: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 15,
  },
  securityText: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  communityGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  communityCard: {
    width: (width - 50) / 2,
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    alignItems: 'center',
    minHeight: 80,
    justifyContent: 'center',
  },
  selectedCommunity: {
    borderColor: '#BB0000',
    backgroundColor: '#BB0000' + '10',
  },
  communityText: {
    fontSize: 14,
    color: '#36454F',
    textAlign: 'center',
    marginBottom: 5,
  },
  selectedCommunityText: {
    color: '#BB0000',
    fontWeight: 'bold',
  },
  actionContainer: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
});