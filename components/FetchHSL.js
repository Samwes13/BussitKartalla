import React, { useEffect } from 'react';
import GtfsRealtimeBindings from "gtfs-realtime-bindings";

const FetchHSL = ({ setBusData }) => {
  // Käynnistetään pyyntö bussidatan hakemiseksi ja päivitetään se säännöllisin väliajoin
  useEffect(() => {
    const intervalId = setInterval(fetchBusData, 1000); //Paivittaa sekunnin valein
    return () => clearInterval(intervalId); // Puhdista intervali
  }, []);

  // Hakee bussidatan ja päivittää sen GTFS-RT
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

  // Parsii GTFS-datan ja muokkaa sen haluttuun muotoon
  const parseGTFSData = (buffer) => {
    try {
      const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(buffer));
      return feed.entity.map(entity => {
        const vehicle = entity.vehicle;
        const routeId = entity.tripUpdate ? entity.tripUpdate.trip.routeId : 'Unknown';
       
        return {
          id: `${vehicle.vehicle.id}`,
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
