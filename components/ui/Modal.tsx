import React, { useEffect } from 'react';
import {
  Modal as RNModal,
  View,
  StyleSheet,
  TouchableOpacity,
  SafeAreaView,
  Dimensions,
  StatusBar,
} from 'react-native';
import { BlurView } from 'expo-blur';
import Animated, {
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  withTiming,
  runOnJS,
} from 'react-native-reanimated';

const { height } = Dimensions.get('window');

interface ModalProps {
  visible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  animationType?: 'slide' | 'fade' | 'scale';
  position?: 'center' | 'bottom' | 'top';
  closeOnBackdrop?: boolean;
  showBlur?: boolean;
}

export default function Modal({
  visible,
  onClose,
  children,
  animationType = 'slide',
  position = 'center',
  closeOnBackdrop = true,
  showBlur = true,
}: ModalProps) {
  const opacity = useSharedValue(0);
  const translateY = useSharedValue(height);
  const scale = useSharedValue(0.8);

  useEffect(() => {
    if (visible) {
      opacity.value = withTiming(1, { duration: 300 });
      
      switch (animationType) {
        case 'slide':
          translateY.value = withSpring(0, { damping: 15, stiffness: 300 });
          break;
        case 'scale':
          scale.value = withSpring(1, { damping: 15, stiffness: 300 });
          break;
        case 'fade':
          // Opacity animation is already handled above
          break;
      }
    } else {
      opacity.value = withTiming(0, { duration: 200 });
      
      switch (animationType) {
        case 'slide':
          translateY.value = withTiming(height, { duration: 200 });
          break;
        case 'scale':
          scale.value = withTiming(0.8, { duration: 200 });
          break;
      }
    }
  }, [visible, animationType]);

  const backdropStyle = useAnimatedStyle(() => {
    return {
      opacity: opacity.value,
    };
  });

  const getModalStyle = () => {
    switch (animationType) {
      case 'slide':
        return useAnimatedStyle(() => ({
          transform: [{ translateY: translateY.value }],
        }));
      case 'scale':
        return useAnimatedStyle(() => ({
          transform: [{ scale: scale.value }],
          opacity: opacity.value,
        }));
      case 'fade':
        return useAnimatedStyle(() => ({
          opacity: opacity.value,
        }));
      default:
        return {};
    }
  };

  const getPositionStyle = () => {
    switch (position) {
      case 'bottom':
        return styles.bottomPosition;
      case 'top':
        return styles.topPosition;
      default:
        return styles.centerPosition;
    }
  };

  const handleBackdropPress = () => {
    if (closeOnBackdrop) {
      onClose();
    }
  };

  return (
    <RNModal
      visible={visible}
      transparent
      animationType="none"
      statusBarTranslucent>
      <View style={styles.container}>
        <StatusBar backgroundColor="rgba(0,0,0,0.5)" barStyle="light-content" />
        
        {/* Backdrop */}
        <TouchableOpacity
          style={StyleSheet.absoluteFill}
          activeOpacity={1}
          onPress={handleBackdropPress}>
          <Animated.View style={[StyleSheet.absoluteFill, backdropStyle]}>
            {showBlur ? (
              <BlurView intensity={20} style={StyleSheet.absoluteFill} />
            ) : (
              <View style={[StyleSheet.absoluteFill, styles.backdrop]} />
            )}
          </Animated.View>
        </TouchableOpacity>

        {/* Modal Content */}
        <View style={[styles.modalContainer, getPositionStyle()]}>
          <Animated.View style={[styles.modal, getModalStyle()]}>
            <SafeAreaView style={styles.safeArea}>
              {children}
            </SafeAreaView>
          </Animated.View>
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  backdrop: {
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modal: {
    backgroundColor: '#fff',
    borderRadius: 16,
    maxHeight: '90%',
    width: '100%',
    maxWidth: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  safeArea: {
    borderRadius: 16,
    overflow: 'hidden',
  },
  centerPosition: {
    justifyContent: 'center',
  },
  bottomPosition: {
    justifyContent: 'flex-end',
    paddingBottom: 0,
  },
  topPosition: {
    justifyContent: 'flex-start',
    paddingTop: 50,
  },
});