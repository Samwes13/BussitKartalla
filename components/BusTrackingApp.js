import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, View, Alert, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { Icon } from '@rneui/themed'; // Import Icon component from React Native Elements

const BusTrackingApp = ({ busData }) => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const mapViewRef = useRef(null);

  //Päivittää oamn sijainnin kartalla jatkuvasti ja kysyy luvan sijannin kayttoon
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('No permission to access location');
        return;
      }
      await updateLocation(); // Ensimmäinen sijainnin päivitys
      const intervalId = setInterval(updateLocation, 1000); // Päivittää sijainnin sekunnin välein
      return () => clearInterval(intervalId); // Puhdista intervali
    })();
  }, []);

  //Oman Sijainnin päivitys
  const updateLocation = async () => {
    try {
      const location = await Location.getCurrentPositionAsync({});
      setCurrentLocation(location);
    } catch (error) {
      console.error('Error updating location:', error);
    }
  };

  //Oman sijainnin keskitys
  const handleCenterPress = () => {
    if (mapViewRef.current && currentLocation) {
      mapViewRef.current.animateToRegion({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.007, 
        longitudeDelta: 0.007, 
      });
    }
  };

  // Yhdistää bussien tiedot ja muokkaa niitä - mutta tällä hetkellä mapppaa vaan bussien sijainnit 
  const mergedBusData = busData.map(bus => {
    const routeId = bus.routeId ? bus.routeId : 'Unknown';
    return {
      ...bus,
      routeId: routeId,
    };
  });

  return (
    <View style={styles.container}>
      <MapView
        ref={mapViewRef}
        style={styles.map}
        initialRegion={{
          latitude: currentLocation ? currentLocation.coords.latitude : 60.1695,
          longitude: currentLocation ? currentLocation.coords.longitude : 24.9354,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.coords.latitude,
              longitude: currentLocation.coords.longitude,
            }}
            title="Your Location"
            description="You are here"
            pinColor="blue" // Sininen pallo
          />
        )}
        {mergedBusData.map(bus => (
          <Marker
            key={bus.id}
            coordinate={{
              latitude: bus.position?.latitude,
              longitude: bus.position?.longitude,
            }}
            title={`${bus.id} - ${bus.routeId}`}
            description={`${bus.schedule_relationship}, ${bus.occupancy_status}`}
            pinColor="red" // Punainen pallo
          />
        ))}
      </MapView>
      <TouchableOpacity style={styles.button} onPress={handleCenterPress}>
        <Icon type="ionicon" name="compass" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  map: {
    width: '100%',
    height: '100%',
  },
  button: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    backgroundColor: '#ffffff',
    padding: 10,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: '#000000',
  },
});

export default BusTrackingApp;
