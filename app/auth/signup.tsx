import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  Alert,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';

const { width } = Dimensions.get('window');

interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  university: string;
  course: string;
  password: string;
  confirmPassword: string;
  isPhoneVerified: boolean;
  verificationCode: string;
  acceptedTerms: boolean;
  acceptedPrivacy: boolean;
  emailConfirmed: boolean;
}

interface ValidationErrors {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  university?: string;
  course?: string;
  password?: string;
  confirmPassword?: string;
  verificationCode?: string;
  terms?: string;
}

interface PasswordStrength {
  score: number;
  feedback: string[];
  isValid: boolean;
}

export default function SignUp() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isVerifying, setIsVerifying] = useState(false);
  const [sentCode, setSentCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState<PasswordStrength>({
    score: 0,
    feedback: [],
    isValid: false,
  });

  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    university: '',
    course: '',
    password: '',
    confirmPassword: '',
    isPhoneVerified: false,
    verificationCode: '',
    acceptedTerms: false,
    acceptedPrivacy: false,
    emailConfirmed: false,
  });

  const totalSteps = 4;

  const universities = [
    'University of Nairobi',
    'Kenyatta University', 
    'Moi University',
    'Jomo Kenyatta University of Agriculture and Technology (JKUAT)',
    'Strathmore University',
    'United States International University (USIU-Africa)',
    'Egerton University',
    'Maseno University',
    'Technical University of Kenya',
    'Dedan Kimathi University of Technology',
    'Mount Kenya University',
    'Kenya Methodist University',
    'Catholic University of Eastern Africa',
    'Daystar University',
    'Africa Nazarene University',
  ];

  const courses = [
    'Computer Science',
    'Information Technology',
    'Software Engineering',
    'Data Science',
    'Cybersecurity',
    'Business Administration',
    'Economics',
    'Accounting',
    'Finance',
    'Marketing',
    'Medicine',
    'Nursing',
    'Pharmacy',
    'Dentistry',
    'Engineering (Civil)',
    'Engineering (Mechanical)',
    'Engineering (Electrical)',
    'Engineering (Chemical)',
    'Law',
    'Education',
    'Psychology',
    'Sociology',
    'Political Science',
    'International Relations',
    'Agriculture',
    'Veterinary Medicine',
    'Architecture',
    'Arts & Humanities',
    'Mass Communication',
    'Journalism',
  ];

  const updateFormData = (field: keyof FormData, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    
    // Clear error when user starts typing
    if (errors[field as keyof ValidationErrors]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }

    // Real-time password strength checking
    if (field === 'password' && typeof value === 'string') {
      checkPasswordStrength(value);
    }
  };

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const universityDomains = ['uonbi.ac.ke', 'ku.ac.ke', 'mu.ac.ke', 'jkuat.ac.ke', 'strathmore.edu'];
    
    if (!emailRegex.test(email)) return false;
    
    // Check if it's a university email
    const domain = email.split('@')[1];
    return universityDomains.some(uniDomain => domain.includes(uniDomain)) || 
           email.includes('.edu') || email.includes('.ac.');
  };

  const validatePhone = (phone: string): boolean => {
    const phoneRegex = /^\+254[17]\d{8}$/;
    return phoneRegex.test(phone);
  };

  const checkPasswordStrength = (password: string): void => {
    const feedback: string[] = [];
    let score = 0;

    if (password.length >= 8) {
      score += 1;
    } else {
      feedback.push('At least 8 characters');
    }

    if (/[A-Z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('One uppercase letter');
    }

    if (/[a-z]/.test(password)) {
      score += 1;
    } else {
      feedback.push('One lowercase letter');
    }

    if (/[0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push('One number');
    }

    if (/[^A-Za-z0-9]/.test(password)) {
      score += 1;
    } else {
      feedback.push('One special character');
    }

    setPasswordStrength({
      score,
      feedback,
      isValid: score >= 4,
    });
  };

  const validateStep = (step: number): ValidationErrors => {
    const newErrors: ValidationErrors = {};

    switch (step) {
      case 1:
        if (!formData.firstName.trim()) newErrors.firstName = 'First name is required';
        if (!formData.lastName.trim()) newErrors.lastName = 'Last name is required';
        if (!formData.email.trim()) {
          newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
          newErrors.email = 'Please use a valid university email address';
        }
        if (!formData.phone.trim()) {
          newErrors.phone = 'Phone number is required';
        } else if (!validatePhone(formData.phone)) {
          newErrors.phone = 'Please use format: +254712345678';
        }
        break;

      case 2:
        if (!formData.university) newErrors.university = 'Please select your university';
        if (!formData.course) newErrors.course = 'Please select your course';
        break;

      case 3:
        if (!formData.password) {
          newErrors.password = 'Password is required';
        } else if (!passwordStrength.isValid) {
          newErrors.password = 'Password does not meet requirements';
        }
        if (!formData.confirmPassword) {
          newErrors.confirmPassword = 'Please confirm your password';
        } else if (formData.password !== formData.confirmPassword) {
          newErrors.confirmPassword = 'Passwords do not match';
        }
        break;

      case 4:
        if (!formData.acceptedTerms || !formData.acceptedPrivacy) {
          newErrors.terms = 'Please accept the terms and privacy policy';
        }
        if (!formData.isPhoneVerified) {
          if (!formData.verificationCode) {
            newErrors.verificationCode = 'Please enter verification code';
          } else if (formData.verificationCode !== sentCode) {
            newErrors.verificationCode = 'Invalid verification code';
          }
        }
        break;
    }

    return newErrors;
  };

  const handleNext = async () => {
    const stepErrors = validateStep(currentStep);
    
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }

    if (currentStep === 1 && !formData.isPhoneVerified) {
      await sendVerificationCode();
      return;
    }

    if (currentStep === 1 && formData.isPhoneVerified) {
      await checkEmailExists();
      return;
    }

    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    } else {
      await handleSignUp();
    }
  };

  const sendVerificationCode = async () => {
    setIsVerifying(true);
    const code = Math.floor(100000 + Math.random() * 900000).toString();
    setSentCode(code);

    // Simulate SMS sending
    setTimeout(() => {
      setIsVerifying(false);
      Alert.alert(
        'Verification Code Sent',
        `A 6-digit code has been sent to ${formData.phone}.\n\nFor demo purposes, the code is: ${code}`,
        [{ text: 'OK' }]
      );
    }, 1500);
  };

  const verifyPhone = () => {
    if (formData.verificationCode === sentCode) {
      updateFormData('isPhoneVerified', true);
      Alert.alert('Success', 'Phone number verified successfully!');
      setCurrentStep(2);
    } else {
      setErrors({ verificationCode: 'Invalid verification code' });
    }
  };

  const checkEmailExists = async () => {
    setIsLoading(true);
    
    // Simulate checking for duplicate email
    setTimeout(() => {
      setIsLoading(false);
      
      // Demo: Check if email contains "duplicate" to simulate existing account
      if (formData.email.toLowerCase().includes('duplicate')) {
        Alert.alert(
          'Account Already Exists',
          'An account with this email already exists. Would you like to sign in instead?',
          [
            { text: 'Cancel', style: 'cancel' },
            { text: 'Sign In', onPress: () => router.push('/auth/login') },
          ]
        );
        return;
      }
      
      setCurrentStep(2);
    }, 1000);
  };

  const handleSocialSignUp = (provider: string) => {
    Alert.alert(
      `${provider} Sign Up`,
      `${provider} authentication will be integrated in the full version. This will automatically fill your profile information.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { 
          text: 'Continue', 
          onPress: () => {
            // Simulate social sign up success
            Alert.alert(
              'Account Created!',
              `Your account has been created using ${provider}. Redirecting to onboarding...`,
              [{ text: 'Continue', onPress: () => router.push('/auth/onboarding') }]
            );
          }
        },
      ]
    );
  };

  const sendEmailConfirmation = async () => {
    // Simulate sending confirmation email
    Alert.alert(
      'Confirmation Email Sent',
      `A confirmation email has been sent to ${formData.email}. Please check your inbox and click the confirmation link.\n\nFor demo purposes, we'll proceed directly to onboarding.`,
      [{ text: 'OK' }]
    );
  };

  const handleSignUp = async () => {
    setIsLoading(true);
    
    try {
      // Simulate account creation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Send email confirmation
      await sendEmailConfirmation();
      
      setIsLoading(false);
      
      Alert.alert(
        'Account Created Successfully!',
        'Welcome to StudentLife AI! Let\'s set up your profile.',
        [{ text: 'Continue', onPress: () => router.push('/auth/onboarding') }]
      );
      
    } catch (error) {
      setIsLoading(false);
      Alert.alert('Error', 'Failed to create account. Please try again.');
    }
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
      <Text style={styles.stepTitle}>Personal Information</Text>
      <Text style={styles.stepSubtitle}>Let's start with your basic details</Text>

      <View style={styles.inputRow}>
        <Input
          label="First Name"
          placeholder="Enter your first name"
          value={formData.firstName}
          onChangeText={(value) => updateFormData('firstName', value)}
          autoCapitalize="words"
          leftIcon="person"
          error={errors.firstName}
          required
          containerStyle={{ flex: 1, marginRight: 10 }}
        />
        <Input
          label="Last Name"
          placeholder="Enter your last name"
          value={formData.lastName}
          onChangeText={(value) => updateFormData('lastName', value)}
          autoCapitalize="words"
          leftIcon="person"
          error={errors.lastName}
          required
          containerStyle={{ flex: 1, marginLeft: 10 }}
        />
      </View>

      <Input
        label="University Email"
        placeholder="your.name@university.ac.ke"
        value={formData.email}
        onChangeText={(value) => updateFormData('email', value)}
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
        leftIcon="mail"
        error={errors.email}
        hint="Use your official university email address"
        required
      />

      <Input
        label="Phone Number"
        placeholder="+254712345678"
        value={formData.phone}
        onChangeText={(value) => updateFormData('phone', value)}
        keyboardType="phone-pad"
        leftIcon="call"
        error={errors.phone}
        hint="We'll send a verification code to this number"
        required
      />

      {!formData.isPhoneVerified && sentCode && (
        <Input
          label="Verification Code"
          placeholder="Enter 6-digit code"
          value={formData.verificationCode}
          onChangeText={(value) => updateFormData('verificationCode', value)}
          keyboardType="numeric"
          maxLength={6}
          leftIcon="lock-closed"
          error={errors.verificationCode}
          hint={`Code sent to ${formData.phone}`}
          required
        />
      )}

      {formData.isPhoneVerified && (
        <View style={styles.verifiedBadge}>
          <Ionicons name="checkmark-circle" size={20} color="#228B22" />
          <Text style={styles.verifiedText}>Phone number verified</Text>
        </View>
      )}
    </View>
  );

  const renderStep2 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Academic Information</Text>
      <Text style={styles.stepSubtitle}>Tell us about your studies</Text>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>University *</Text>
        <ScrollView style={styles.optionsList} nestedScrollEnabled>
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
              {formData.university === uni && (
                <Ionicons name="checkmark" size={20} color="#BB0000" />
              )}
            </TouchableOpacity>
          ))}
        </ScrollView>
        {errors.university && <Text style={styles.errorText}>{errors.university}</Text>}
      </View>

      <View style={styles.inputGroup}>
        <Text style={styles.inputLabel}>Course/Program *</Text>
        <View style={styles.courseGrid}>
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
        {errors.course && <Text style={styles.errorText}>{errors.course}</Text>}
      </View>
    </View>
  );

  const renderStep3 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Secure Your Account</Text>
      <Text style={styles.stepSubtitle}>Create a strong password</Text>

      <Input
        label="Password"
        placeholder="Create a strong password"
        value={formData.password}
        onChangeText={(value) => updateFormData('password', value)}
        secureTextEntry={!showPassword}
        autoCapitalize="none"
        leftIcon="lock-closed"
        rightIcon={showPassword ? "eye-off" : "eye"}
        onRightIconPress={() => setShowPassword(!showPassword)}
        error={errors.password}
        required
      />

      <View style={styles.passwordStrength}>
        <Text style={styles.strengthTitle}>Password Strength</Text>
        <View style={styles.strengthBar}>
          <View style={[
            styles.strengthFill,
            { 
              width: `${(passwordStrength.score / 5) * 100}%`,
              backgroundColor: passwordStrength.score < 2 ? '#DC3545' : 
                             passwordStrength.score < 4 ? '#FFC107' : '#28A745'
            }
          ]} />
        </View>
        <View style={styles.requirements}>
          {passwordStrength.feedback.map((req, index) => (
            <View key={index} style={styles.requirement}>
              <Ionicons 
                name="ellipse-outline" 
                size={12} 
                color="#DC3545" 
              />
              <Text style={styles.requirementText}>{req}</Text>
            </View>
          ))}
          {passwordStrength.isValid && (
            <View style={styles.requirement}>
              <Ionicons name="checkmark-circle" size={12} color="#28A745" />
              <Text style={[styles.requirementText, { color: '#28A745' }]}>
                Password meets all requirements
              </Text>
            </View>
          )}
        </View>
      </View>

      <Input
        label="Confirm Password"
        placeholder="Confirm your password"
        value={formData.confirmPassword}
        onChangeText={(value) => updateFormData('confirmPassword', value)}
        secureTextEntry={!showConfirmPassword}
        autoCapitalize="none"
        leftIcon="lock-closed"
        rightIcon={showConfirmPassword ? "eye-off" : "eye"}
        onRightIconPress={() => setShowConfirmPassword(!showConfirmPassword)}
        error={errors.confirmPassword}
        required
      />
    </View>
  );

  const renderStep4 = () => (
    <View style={styles.stepContainer}>
      <Text style={styles.stepTitle}>Final Steps</Text>
      <Text style={styles.stepSubtitle}>Review and confirm your registration</Text>

      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Account Summary</Text>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Name:</Text>
          <Text style={styles.summaryValue}>{formData.firstName} {formData.lastName}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Email:</Text>
          <Text style={styles.summaryValue}>{formData.email}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>University:</Text>
          <Text style={styles.summaryValue}>{formData.university}</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryLabel}>Course:</Text>
          <Text style={styles.summaryValue}>{formData.course}</Text>
        </View>
      </View>

      <View style={styles.termsContainer}>
        <TouchableOpacity 
          style={styles.checkboxContainer}
          onPress={() => updateFormData('acceptedTerms', !formData.acceptedTerms)}>
          <View style={[styles.checkbox, formData.acceptedTerms && styles.checkedBox]}>
            {formData.acceptedTerms && <Ionicons name="checkmark" size={16} color="#fff" />}
          </View>
          <Text style={styles.termsText}>
            I agree to the <Text style={styles.termsLink}>Terms of Service</Text>
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={styles.checkboxContainer}
          onPress={() => updateFormData('acceptedPrivacy', !formData.acceptedPrivacy)}>
          <View style={[styles.checkbox, formData.acceptedPrivacy && styles.checkedBox]}>
            {formData.acceptedPrivacy && <Ionicons name="checkmark" size={16} color="#fff" />}
          </View>
          <Text style={styles.termsText}>
            I agree to the <Text style={styles.termsLink}>Privacy Policy</Text>
          </Text>
        </TouchableOpacity>

        {errors.terms && <Text style={styles.errorText}>{errors.terms}</Text>}
      </View>

      <View style={styles.emailConfirmNote}>
        <Ionicons name="mail" size={20} color="#4A90E2" />
        <Text style={styles.emailConfirmText}>
          A confirmation email will be sent to verify your account
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
          <TouchableOpacity onPress={() => router.push('/auth/login')}>
            <Text style={styles.skipText}>Sign In</Text>
          </TouchableOpacity>
        </View>

        {renderProgressBar()}

        <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
          {currentStep === 4 && renderStep4()}

          {/* Social Sign Up - Show on first step */}
          {currentStep === 1 && (
            <View style={styles.socialSection}>
              <View style={styles.divider}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>or sign up with</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.socialButtons}>
                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => handleSocialSignUp('Google')}>
                  <Ionicons name="logo-google" size={20} color="#DB4437" />
                  <Text style={styles.socialButtonText}>Google</Text>
                </TouchableOpacity>

                <TouchableOpacity 
                  style={styles.socialButton}
                  onPress={() => handleSocialSignUp('Facebook')}>
                  <Ionicons name="logo-facebook" size={20} color="#4267B2" />
                  <Text style={styles.socialButtonText}>Facebook</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}
        </ScrollView>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          {currentStep === 1 && !formData.isPhoneVerified && sentCode ? (
            <Button
              title="Verify Phone"
              onPress={verifyPhone}
              variant="primary"
              gradient
              fullWidth
              icon="checkmark"
              disabled={!formData.verificationCode}
            />
          ) : (
            <Button
              title={
                isLoading ? "Creating Account..." :
                isVerifying ? "Sending Code..." :
                currentStep === totalSteps ? "Create Account" : 
                currentStep === 1 && !formData.isPhoneVerified ? "Send Verification Code" :
                "Next"
              }
              onPress={handleNext}
              variant="primary"
              gradient
              fullWidth
              loading={isLoading || isVerifying}
              icon={currentStep === totalSteps ? "checkmark" : "arrow-forward"}
              iconPosition="right"
            />
          )}
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
  skipText: {
    fontSize: 16,
    color: '#BB0000',
    fontWeight: '600',
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
    marginBottom: 0,
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
  optionsList: {
    maxHeight: 200,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 12,
    backgroundColor: '#fff',
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
  optionText: {
    fontSize: 16,
    color: '#36454F',
    flex: 1,
  },
  selectedOptionText: {
    color: '#BB0000',
    fontWeight: '600',
  },
  courseGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 10,
  },
  courseChip: {
    backgroundColor: '#fff',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    marginBottom: 5,
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
  passwordStrength: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  strengthTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 8,
  },
  strengthBar: {
    height: 6,
    backgroundColor: '#e0e0e0',
    borderRadius: 3,
    marginBottom: 10,
  },
  strengthFill: {
    height: '100%',
    borderRadius: 3,
  },
  requirements: {
    gap: 5,
  },
  requirement: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  requirementText: {
    fontSize: 12,
    color: '#666',
  },
  summaryCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  summaryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#36454F',
    marginBottom: 15,
  },
  summaryItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  summaryValue: {
    fontSize: 14,
    color: '#36454F',
    fontWeight: '600',
    flex: 1,
    textAlign: 'right',
  },
  termsContainer: {
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 15,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: '#BB0000',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
    marginTop: 2,
  },
  checkedBox: {
    backgroundColor: '#BB0000',
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
    textDecorationLine: 'underline',
  },
  emailConfirmNote: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4A90E2' + '10',
    padding: 15,
    borderRadius: 12,
    marginBottom: 10,
  },
  emailConfirmText: {
    fontSize: 14,
    color: '#4A90E2',
    marginLeft: 10,
    flex: 1,
  },
  verifiedBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#228B22' + '10',
    padding: 12,
    borderRadius: 8,
    marginTop: 10,
  },
  verifiedText: {
    fontSize: 14,
    color: '#228B22',
    fontWeight: '600',
    marginLeft: 8,
  },
  socialSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  divider: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#e0e0e0',
  },
  dividerText: {
    fontSize: 14,
    color: '#666',
    paddingHorizontal: 15,
  },
  socialButtons: {
    flexDirection: 'row',
    gap: 10,
  },
  socialButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  socialButtonText: {
    fontSize: 14,
    color: '#36454F',
    fontWeight: '600',
    marginLeft: 8,
  },
  actionButtons: {
    padding: 20,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
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
  errorText: {
    fontSize: 12,
    color: '#DC3545',
    marginTop: 5,
  },
});