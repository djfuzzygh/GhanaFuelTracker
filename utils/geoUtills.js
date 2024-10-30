// src/utils/geoUtils.js
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
    // Haversine formula implementation
    const R = 6371; // Earth's radius in km
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };
  
  // src/components/maps/GeoFencing.js
  export const setupGeofence = (currentLocation, stations, radius = 5) => {
    return stations.filter(station => {
      const distance = calculateDistance(
        currentLocation.latitude,
        currentLocation.longitude,
        station.location.latitude,
        station.location.longitude
      );
      return distance <= radius;
    });
  };