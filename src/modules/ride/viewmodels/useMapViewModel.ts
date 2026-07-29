import { useEffect, useRef, useState } from 'react';
import PermissionService from '../../../core/services/location/PermissionService';
import LocationService from '../../../core/services/location/LocationService';
import { useLocationStore } from '../../../core/store/locationStore';
import {
  MapRef,
} from '@maplibre/maplibre-react-native';


export default function useMapViewModel() {
  const [location, setLocation] = useState<[number, number] | null>(null);
  const mapRef = useRef<MapRef>(null);
  const currentLocation = useLocationStore(state => state.currentLocation);
  const [cameraCenter, setCameraCenter] = useState<[number, number]>(
    currentLocation
      ? [currentLocation.longitude, currentLocation.latitude]
      : [31.2357, 30.0444],
  );

  const hasCentered = useRef(false);

  useEffect(() => {
    if (location && !hasCentered.current) {
      setCameraCenter(location);
      hasCentered.current = true;
    }
  }, [location]);

  const [selectedLocation, setSelectedLocation] = useState({
    latitude: currentLocation?.latitude,
    longitude: currentLocation?.longitude,
  });

  useEffect(() => {
    let watchId: number;

    const initialize = async () => {
      const granted = await PermissionService.requestLocationPermission();

      if (!granted) return;

      // Get an initial location immediately
      const currentLocation = await LocationService.getCurrentLocation();

      setLocation([currentLocation.longitude, currentLocation.latitude]);

      // Then start listening for updates
      watchId = LocationService.watchLocation(newLocation => {
        setLocation([newLocation.longitude, newLocation.latitude]);
      });
    };

    initialize();

    return () => {
      if (watchId !== undefined) {
        LocationService.stopWatching(watchId);
      }
    };
  }, []);

  return {
    location,
    cameraCenter,
  };
}
