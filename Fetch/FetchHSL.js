import React, { useState, useEffect } from 'react';
import GtfsRealtimeBindings from "gtfs-realtime-bindings";

const BusDataComponent = ({ setBusData }) => {
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
    } catch (error) {
      console.error(error);
    }
  };

  const parseGTFSData = (buffer) => {
    try {
      const feed = GtfsRealtimeBindings.transit_realtime.FeedMessage.decode(new Uint8Array(buffer));
      return feed.entity.map(entity => entity.vehicle).filter(vehicle => vehicle != null);
    } catch (error) {
      console.error('Error parsing GTFS data:', error);
      return [];
    }
  };

  return null;
};

export default BusDataComponent;
