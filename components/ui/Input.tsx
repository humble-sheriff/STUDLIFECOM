import React, { useState, forwardRef } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  TextInputProps,
  ViewStyle,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withTiming,
  interpolateColor,
} from 'react-native-reanimated';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: keyof typeof Ionicons.glyphMap;
  rightIcon?: keyof typeof Ionicons.glyphMap;
  onRightIconPress?: () => void;
  containerStyle?: ViewStyle;
  required?: boolean;
  showPasswordToggle?: boolean;
}

const Input = forwardRef<TextInput, InputProps>(({
  label,
  error,
  hint,
  leftIcon,
  rightIcon,
  onRightIconPress,
  containerStyle,
  required = false,
  showPasswordToggle = false,
  secureTextEntry,
  ...props
}, ref) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  const focusAnimation = useSharedValue(0);
  const errorAnimation = useSharedValue(0);

  React.useEffect(() => {
    focusAnimation.value = withTiming(isFocused ? 1 : 0, { duration: 200 });
  }, [isFocused]);

  React.useEffect(() => {
    errorAnimation.value = withTiming(error ? 1 : 0, { duration: 200 });
  }, [error]);

  const animatedBorderStyle = useAnimatedStyle(() => {
    const borderColor = interpolateColor(
      focusAnimation.value,
      [0, 1],
      [error ? '#DC3545' : '#e0e0e0', error ? '#DC3545' : '#BB0000']
    );
    
    return {
      borderColor,
      borderWidth: withTiming(isFocused || error ? 2 : 1, { duration: 200 }),
    };
  });

  const animatedLabelStyle = useAnimatedStyle(() => {
    const color = interpolateColor(
      focusAnimation.value,
      [0, 1],
      [error ? '#DC3545' : '#666', error ? '#DC3545' : '#BB0000']
    );
    
    return {
      color,
    };
  });

  const handleFocus = (e: any) => {
    setIsFocused(true);
    props.onFocus?.(e);
  };

  const handleBlur = (e: any) => {
    setIsFocused(false);
    props.onBlur?.(e);
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const getRightIcon = () => {
    if (showPasswordToggle && secureTextEntry) {
      return isPasswordVisible ? 'eye-off' : 'eye';
    }
    return rightIcon;
  };

  const handleRightIconPress = () => {
    if (showPasswordToggle && secureTextEntry) {
      togglePasswordVisibility();
    } else {
      onRightIconPress?.();
    }
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && (
        <Animated.Text style={[styles.label, animatedLabelStyle]}>
          {label}
          {required && <Text style={styles.required}> *</Text>}
        </Animated.Text>
      )}
      
      <Animated.View style={[styles.inputContainer, animatedBorderStyle]}>
        {leftIcon && (
          <Ionicons 
            name={leftIcon} 
            size={20} 
            color={isFocused ? '#BB0000' : '#666'} 
            style={styles.leftIcon}
          />
        )}
        
        <TextInput
          ref={ref}
          style={[styles.input, leftIcon && styles.inputWithLeftIcon]}
          placeholderTextColor="#999"
          secureTextEntry={showPasswordToggle ? !isPasswordVisible : secureTextEntry}
          onFocus={handleFocus}
          onBlur={handleBlur}
          {...props}
        />
        
        {(rightIcon || showPasswordToggle) && (
          <TouchableOpacity 
            onPress={handleRightIconPress}
            style={styles.rightIconContainer}
            disabled={!onRightIconPress && !showPasswordToggle}>
            <Ionicons 
              name={getRightIcon()!} 
              size={20} 
              color={isFocused ? '#BB0000' : '#666'} 
            />
          </TouchableOpacity>
        )}
      </Animated.View>
      
      {error && (
        <Animated.View style={styles.errorContainer}>
          <Ionicons name="alert-circle" size={16} color="#DC3545" />
          <Text style={styles.errorText}>{error}</Text>
        </Animated.View>
      )}
      
      {hint && !error && (
        <Text style={styles.hintText}>{hint}</Text>
      )}
    </View>
  );
});

Input.displayName = 'Input';

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#36454F',
  },
  required: {
    color: '#DC3545',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    paddingHorizontal: 16,
    minHeight: 48,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#36454F',
    paddingVertical: 12,
  },
  inputWithLeftIcon: {
    marginLeft: 12,
  },
  leftIcon: {
    marginRight: 0,
  },
  rightIconContainer: {
    padding: 4,
    marginLeft: 8,
  },
  errorContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 6,
  },
  errorText: {
    fontSize: 14,
    color: '#DC3545',
    marginLeft: 6,
    flex: 1,
  },
  hintText: {
    fontSize: 14,
    color: '#666',
    marginTop: 6,
  },
});

export default Input;