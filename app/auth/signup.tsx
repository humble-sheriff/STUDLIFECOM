import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  university: string;
  course: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    university: '',
    course: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const universities = [
    'University of Nairobi',
    'Kenyatta University',
    'Moi University',
    'Jomo Kenyatta University',
    'Strathmore University',
    'United States International University',
  ];

  const courses = [
    'Computer Science',
    'Engineering',
    'Medicine',
    'Business Administration',
    'Law',
    'Education',
    'Agriculture',
    'Arts & Humanities',
  ];

  const updateFormData = (field: keyof FormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(formData.firstName && formData.lastName && formData.email && formData.phone);
      case 2:
        return !!(formData.university && formData.course);
      case 3:
        return !!(formData.password && formData.confirmPassword && formData.password === formData.confirmPassword);
      default:
        return false;
    }
  };

  const handleNext = () => {
    if (!validateStep(currentStep)) {
      Alert.alert('Error', 'Please fill in all required fields');
      return;
    }
    
    if (currentStep === 3 && formData.password !== formData.confirmPassword) {
      Alert.alert('Error', 'Passwords do not match');
      return;
    }

    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    } else {
      handleSignUp();
    }
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    
    // Simulate signup process
    setTimeout(() => {
      setIsLoading(false);
      Alert.alert(
        'Success!',
        'Your account has been created successfully. Please verify your email.',
        [{ text: 'OK', onPress: () => router.replace('/auth/login') }]
      );
    }, 2000);
  };

  const renderProgressBar = () => (
    <View style={styles.progressContainer}>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${(currentStep / 3) * 100}%` }]} />
      </View>
      <Text style={styles.progressText}>Step {currentStep} of 3</Text>
    </View>
  );

  const renderStep1 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Personal Information</Text>
      <Text style={styles.stepSubtitle}>Let's start with your basic details</Text>

      <View style={styles.inputRow}>
        <View style={[styles.inputContainer, { flex: 1, marginRight: 10 }]}>
          <Ionicons name="person" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="First Name"
            placeholderTextColor="#999"
            value={formData.firstName}
            onChangeText={(value) => updateFormData('firstName', value)}
            autoCapitalize="words"
          />
        </View>
        <View style={[styles.inputContainer, { flex: 1, marginLeft: 10 }]}>
          <Ionicons name="person" size={20} color="#666" style={styles.inputIcon} />
          <TextInput
            style={styles.input}
            placeholder="Last Name"
            placeholderTextColor="#999"
            value={formData.lastName}
            onChangeText={(value) => updateFormData('lastName', value)}
            autoCapitalize="words"
          />
        </View>
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="mail" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="University email"
          placeholderTextColor="#999"
          value={formData.email}
          onChangeText={(value) => updateFormData('email', value)}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCorrect={false}
        />
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="call" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Phone number (+254...)"
          placeholderTextColor="#999"
          value={formData.phone}
          onChangeText={(value) => updateFormData('phone', value)}
          keyboardType="phone-pad"
        />
      </View>
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Academic Information</Text>
      <Text style={styles.stepSubtitle}>Tell us about your studies</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="school" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Select University"
          placeholderTextColor="#999"
          value={formData.university}
          onChangeText={(value) => updateFormData('university', value)}
        />
      </View>

      <View style={styles.universityList}>
        {universities.map((uni, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.optionItem,
              formData.university === uni && styles.selectedOption
            ]}
            onPress={() => updateFormData('university', uni)}>
            <Text style={[
              styles.optionText,
              formData.university === uni && styles.selectedOptionText
            ]}>
              {uni}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="book" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Course/Program"
          placeholderTextColor="#999"
          value={formData.course}
          onChangeText={(value) => updateFormData('course', value)}
        />
      </View>

      <View style={styles.courseList}>
        {courses.map((course, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.courseChip,
              formData.course === course && styles.selectedCourseChip
            ]}
            onPress={() => updateFormData('course', course)}>
            <Text style={[
              styles.courseChipText,
              formData.course === course && styles.selectedCourseChipText
            ]}>
              {course}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Secure Your Account</Text>
      <Text style={styles.stepSubtitle}>Create a strong password</Text>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#999"
          value={formData.password}
          onChangeText={(value) => updateFormData('password', value)}
          secureTextEntry={!showPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity 
          style={styles.eyeIcon}
          onPress={() => setShowPassword(!showPassword)}>
          <Ionicons 
            name={showPassword ? "eye-off" : "eye"} 
            size={20} 
            color="#666" 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.inputContainer}>
        <Ionicons name="lock-closed" size={20} color="#666" style={styles.inputIcon} />
        <TextInput
          style={styles.input}
          placeholder="Confirm Password"
          placeholderTextColor="#999"
          value={formData.confirmPassword}
          onChangeText={(value) => updateFormData('confirmPassword', value)}
          secureTextEntry={!showConfirmPassword}
          autoCapitalize="none"
        />
        <TouchableOpacity 
          style={styles.eyeIcon}
          onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
          <Ionicons 
            name={showConfirmPassword ? "eye-off" : "eye"} 
            size={20} 
            color="#666" 
          />
        </TouchableOpacity>
      </View>

      <View style={styles.passwordRequirements}>
        <Text style={styles.requirementsTitle}>Password must contain:</Text>
        <View style={styles.requirement}>
          <Ionicons 
            name={formData.password.length >= 8 ? "checkmark-circle" : "ellipse-outline"} 
            size={16} 
            color={formData.password.length >= 8 ? "#228B22" : "#ccc"} 
          />
          <Text style={styles.requirementText}>At least 8 characters</Text>
        </View>
        <View style={styles.requirement}>
          <Ionicons 
            name={/[A-Z]/.test(formData.password) ? "checkmark-circle" : "ellipse-outline"} 
            size={16} 
            color={/[A-Z]/.test(formData.password) ? "#228B22" : "#ccc"} 
          />
          <Text style={styles.requirementText}>One uppercase letter</Text>
        </View>
        <View style={styles.requirement}>
          <Ionicons 
            name={/[0-9]/.test(formData.password) ? "checkmark-circle" : "ellipse-outline"} 
            size={16} 
            color={/[0-9]/.test(formData.password) ? "#228B22" : "#ccc"} 
          />
          <Text style={styles.requirementText}>One number</Text>
        </View>
      </View>

      <View style={styles.termsContainer}>
        <TouchableOpacity style={styles.checkbox}>
          <Ionicons name="checkmark" size={16} color="#fff" />
        </TouchableOpacity>
        <Text style={styles.termsText}>
          I agree to the <Text style={styles.termsLink}>Terms of Service</Text> and{' '}
          <Text style={styles.termsLink}>Privacy Policy</Text>
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.keyboardView}>
        
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => currentStep > 1 ? setCurrentStep(currentStep - 1) : router.back()}>
            <Ionicons name="arrow-back" size={24} color="#36454F" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Create Account</Text>
          <View style={styles.placeholder} />
        </View>

        {renderProgressBar()}

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity 
            style={[styles.nextButton, !validateStep(currentStep) && styles.nextButtonDisabled]}
            onPress={handleNext}
            disabled={!validateStep(currentStep) || isLoading}>
            <LinearGradient
              colors={!validateStep(currentStep) || isLoading ? ['#ccc', '#ccc'] : ['#BB0000', '#FF6B6B']}
              style={styles.nextGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}>
              {isLoading ? (
                <Text style={styles.nextButtonText}>Creating Account...</Text>
              ) : (
                <Text style={styles.nextButtonText}>
                  {currentStep === 3 ? 'Create Account' : 'Next'}
                </Text>
              )}
            </LinearGradient>
          </TouchableOpacity>
        </View>

        {/* Sign In Link */}
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already have an account? </Text>
          <TouchableOpacity onPress={() => router.push('/auth/login')}>
            <Text style={styles.signInLink}>Sign In</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  keyboardView: {
    flex: 1,
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
  placeholder: {
    width: 34,
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
  },
  stepSubtitle: {
    fontSize: 16,
    color: '#666',
    marginBottom: 30,
  },
  inputRow: {
    flexDirection: 'row',
    marginBottom: 15,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 15,
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  inputIcon: {
    marginRight: 12,
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
    color: '#36454F',
  },
  eyeIcon: {
    padding: 5,
  },
  universityList: {
    marginBottom: 20,
  },
  optionItem: {
    backgroundColor: '#fff',
    borderRadius: 8,
    padding: 15,
    marginBottom: 8,
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
  courseList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
    marginTop: 10,
  },
  courseChip: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedCourseChip: {
    backgroundColor: '#BB0000',
    borderColor: '#BB0000',
  },
  courseChipText: {
    fontSize: 14,
    color: '#36454F',
    fontWeight: '500',
  },
  selectedCourseChipText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  passwordRequirements: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  requirementsTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 10,
  },
  requirement: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  requirementText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  termsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 20,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    backgroundColor: '#BB0000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  termsLink: {
    color: '#BB0000',
    fontWeight: '600',
  },
  actionButtons: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
  },
  nextButton: {
    borderRadius: 12,
    overflow: 'hidden',
  },
  nextButtonDisabled: {
    opacity: 0.5,
  },
  nextGradient: {
    paddingVertical: 16,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#fff',
  },
  footerText: {
    fontSize: 16,
    color: '#666',
  },
  signInLink: {
    fontSize: 16,
    color: '#BB0000',
    fontWeight: 'bold',
  },
});