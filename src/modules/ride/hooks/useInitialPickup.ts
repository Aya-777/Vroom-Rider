// hooks/useInitialPickup.ts

import { useEffect, useState } from 'react';
import LocationService from '../../../core/services/location/LocationService';

interface Coordinates {
  latitude: number;
  longitude: number;
}

export function useInitialPickup(currentLocation: Coordinates | null) {
  const [pickup, setPickup] = useState<{
    address: string;
    latitude: number;
    longitude: number;
  } | null>(null);

  useEffect(() => {
    if (!currentLocation) return;

    const initialize = async () => {
      const address = await LocationService.reverseGeocode(
        currentLocation.latitude,
        currentLocation.longitude,
      );

      setPickup({
        address,
        latitude: currentLocation.latitude,
        longitude: currentLocation.longitude,
      });
    };

    initialize();
  }, [currentLocation]);

  return pickup;
}
