import { useEffect } from 'react';
import LocationService from './LocationService';
import { useLocationStore } from '../../store/locationStore';

export function useLocationTracking() {
  const setCurrentLocation = useLocationStore(
    state => state.setCurrentLocation,
  );

  useEffect(() => {
    const watchId = LocationService.watchLocation(
      location => {
        setCurrentLocation(location);
      },
      error => {
        console.log('Location tracking error:', error);
      },
    );

    return () => {
      LocationService.stopWatching(watchId);
    };
  }, []);
}
