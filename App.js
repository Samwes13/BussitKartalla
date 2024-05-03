import React from 'react';
import { StyleSheet, View } from 'react-native';
import BusTrackingApp from './components/BusTrackingApp';

export default function App() {
  return (
    <View style={styles.container}>
      <BusTrackingApp />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});