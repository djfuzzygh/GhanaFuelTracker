import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker, Circle } from 'react-native-maps';
import { locationService } from '../services/locationService';

export const StationTrackingScreen = () => {
  const [currentLocation, setCurrentLocation] = useState(null);
  const [nearbyStations, setNearbyStations] = useState([]);

  useEffect(() => {
    setupLocation();
  }, []);

  const setupLocation = async () => {
    const hasPermission = await locationService.requestPermissions();
    if (hasPermission) {
      const location = await locationService.getCurrentLocation();
      setCurrentLocation({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
      });
      // Fetch nearby stations based on location
      fetchNearbyStations(location);
    }
  };

  return (
    
      {currentLocation && (
        
          
          {nearbyStations.map(station => (
            
          ))}
        
      )}
  );
}