import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BusTrackingApp from './components/BusTrackingApp';
import FetchHSL from './components/FetchHSL';
import Frontscreen from './components/FrontScreen'; // Import the new screen component

const Stack = createStackNavigator();

export default function App() {
  const [busData, setBusData] = useState([]);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Frontscreen"
        screenOptions={{
          headerTitle: 'Bussitkartallla',
          headerShown: true, // Näyttää sama yläpalkin kaikilla sivuilla
        }}
      >
        <Stack.Screen name="Frontscreen" component={Frontscreen} />
        <Stack.Screen name="BusTrackingApp">
          {props => <BusTrackingApp {...props} busData={busData} />}
        </Stack.Screen>
      </Stack.Navigator>
      <FetchHSL setBusData={setBusData} />
    </NavigationContainer>
  );
}
