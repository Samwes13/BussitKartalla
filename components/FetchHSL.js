import React, { useEffect } from 'react';
import GtfsRealtimeBindings from "gtfs-realtime-bindings";

const FetchHSL = ({ setBusData }) => {
  useEffect(() => {
    const intervalId = setInterval(fetchBusData, 1000);
    return () => clearInterval(intervalId);
  }, []);

  const fetchBusData = async () => {
    try {
      const response = await fetch('https://realtime.hsl.fi/realtime/vehicle-positions/v2/hsl');
      if (!response.ok) {
        throw new Error('Failed to fetch bus data');
      }
      const buffer = await response.arrayBuffer();
      const parsedBusData = parseGTFSData(buffer);
      setBusData(parsedBusData);
      //console.log(parsedBusData);
    } catch (error) {
      console.error(error);
    }
  };

  const parseGTFSData = (buffer) => {
    try {
      const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(buffer));
      return feed.entity.map(entity => {
        const vehicle = entity.vehicle;
        const trip = entity.tripUpdate ? entity.tripUpdate.trip : null;
        const tripId = trip ? trip.tripId : null;
        const routeId = trip ? trip.routeId : 'Unknown';
        // Lisätään routeId busData-objektiin
        return {
          id: `${vehicle.vehicle.id}`,
          trip_id: tripId,
          position: vehicle.position,
          route_id: routeId,
          schedule_relationship: vehicle.schedule_relationship || 'SCHEDULED',
          occupancy_status: vehicle.occupancy_status || 'UNKNOWN',
        };
      }).filter(vehicle => vehicle != null);
    } catch (error) {
      console.error('Error parsing GTFS data:', error);
      return [];
    }
  };

  return null;
};

export default FetchHSL;
