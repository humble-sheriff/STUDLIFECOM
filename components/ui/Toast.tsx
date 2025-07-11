import React, { useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

const { width } = Dimensions.get('window');

interface ToastProps {
  visible: boolean;
  message: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  duration?: number;
  onHide: () => void;
  position?: 'top' | 'bottom';
  showCloseButton?: boolean;
}

export default function Toast({
  visible,
  message,
  type = 'info',
  duration = 3000,
  onHide,
  position = 'top',
  showCloseButton = true,
}: ToastProps) {
  const translateY = useSharedValue(position === 'top' ? -100 : 100);
  const opacity = useSharedValue(0);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 300 });
      translateY.value = withSpring(0, { damping: 15, stiffness: 300 });

      if (duration > 0) {
        const timer = setTimeout(() => {
          hideToast();
        }, duration);

        return () => clearTimeout(timer);
      }
    } else {
      hideToast();
    }
  }, [visible, duration]);

  const hideToast = () => {
    opacity.value = withTiming(0, { duration: 200 });
    translateY.value = withTiming(
      position === 'top' ? -100 : 100,
      { duration: 200 },
      () => {
        runOnJS(onHide)();
      }
    );
  };

  const animatedStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
      transform: [{ translateY: translateY.value }],
    };
  });

  const getToastStyle = () => {
    switch (type) {
      case 'success':
        return styles.success;
      case 'error':
        return styles.error;
      case 'warning':
        return styles.warning;
      default:
        return styles.info;
    }
  };

  const getIcon = () => {
    switch (type) {
      case 'success':
        return 'checkmark-circle';
      case 'error':
        return 'close-circle';
      case 'warning':
        return 'warning';
      default:
        return 'information-circle';
    }
  };

  const getIconColor = () => {
    switch (type) {
      case 'success':
        return '#fff';
      case 'error':
        return '#fff';
      case 'warning':
        return '#fff';
      default:
        return '#fff';
    }
  };

  if (!visible) return null;

  return (
    <Animated.View style={[
      styles.container,
      position === 'top' ? styles.topPosition : styles.bottomPosition,
      animatedStyle
    ]}>
      <View style={[styles.toast, getToastStyle()]}>
        <Ionicons 
          name={getIcon()} 
          size={20} 
          color={getIconColor()} 
          style={styles.icon}
        />
        <Text style={styles.message}>{message}</Text>
        {showCloseButton && (
          <TouchableOpacity onPress={hideToast} style={styles.closeButton}>
            <Ionicons name="close" size={18} color={getIconColor()} />
          </TouchableOpacity>
        )}
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  topPosition: {
    top: 60,
  },
  bottomPosition: {
    bottom: 100,
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
  icon: {
    marginRight: 12,
  },
  message: {
    flex: 1,
    fontSize: 14,
    fontWeight: '500',
    color: '#fff',
  },
  closeButton: {
    marginLeft: 12,
    padding: 2,
  },
  
  // Toast types
  success: {
    backgroundColor: '#28A745',
  },
  error: {
    backgroundColor: '#DC3545',
  },
  warning: {
    backgroundColor: '#FFC107',
  },
  info: {
    backgroundColor: '#17A2B8',
  },
});