import React from 'react';
import { StyleSheet, View, Dimensions } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

const MapViewComponent = ({ busData }) => {
  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 60.1695,
          longitude: 24.9354,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {busData.map((bus, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: bus.position.latitude,
              longitude: bus.position.longitude,
            }}
            title={`Bus ${bus.vehicle.id}`}
          />
        ))}
      </MapView>
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
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default MapViewComponent;
