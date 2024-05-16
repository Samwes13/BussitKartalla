import React from 'react';
import { StyleSheet, View, TouchableOpacity, Text } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook for navigation

const Frontscreen = () => {
  const navigation = useNavigation(); // Hook for accessing navigation object

  const handleShowMapPress = () => {
    navigation.navigate('BusTrackingApp'); // Navigate to BusTrackingApp screen
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome to Bus Tracking App!</Text>
      <TouchableOpacity style={styles.button} onPress={handleShowMapPress}>
        <Text style={styles.buttonText}>Show Buses on Map</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
  },
  button: {
    backgroundColor: '#DDDDDD',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333333',
  },
});

export default Frontscreen;
