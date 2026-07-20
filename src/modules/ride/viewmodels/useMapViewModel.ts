import { useEffect, useState } from 'react';

import PermissionService from '../../../core/services/location/PermissionService';
import LocationService from '../../../core/services/location/LocationService';

export default function useMapViewModel() {
  const [location, setLocation] = useState<[number, number] | null>(null);

  useEffect(() => {
    loadLocation();
  }, []);

  const loadLocation = async () => {
    const granted = await PermissionService.requestLocationPermission();

    if (!granted) {
      return;
    }

    try {
      const currentLocation = await LocationService.getCurrentLocation();

      setLocation([
        currentLocation.longitude,
        currentLocation.latitude,
      ]);
      console.log(currentLocation);
      
    } catch (error) {
      console.error(error);
    }
  };

  return {
    location,
  };
}