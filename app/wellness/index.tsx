import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WellnessTracker from '@/components/WellnessTracker';

export default function WellnessPage() {
  return (
    <SafeAreaView style={styles.container}>
      <WellnessTracker />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
});