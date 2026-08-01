import { useEffect, useRef, useState } from 'react';
import PermissionService from '../../../core/services/location/PermissionService';
import LocationService, { Location } from '../../../core/services/location/LocationService';
import { useLocationStore } from '../../../core/store/locationStore';
import { CameraRef, MapRef } from '@maplibre/maplibre-react-native';
import { useRideStore } from '../store/useRideStore';

export default function useMapViewModel() {
  const [deviceLocation, setDeviceLocation] = useState<[number, number] | null>(null);
  const { estimate } = useRideStore();

  const mapRef = useRef<MapRef>(null);
  const cameraRef = useRef<CameraRef>(null);

  const { isPickingLocation, setSelectedMapLocation } = useRideStore();

  const hasCentered = useRef(false);

  useEffect(() => {
    let watchId: number | undefined;

    const initialize = async () => {
      const granted = await PermissionService.requestLocationPermission();

      if (!granted) {
        return;
      }

      try {
        const currentLocation = await LocationService.getCurrentLocation();

        const coords: [number, number] = [
          currentLocation.longitude,
          currentLocation.latitude,
        ];

        console.log('GPS LOCATION:', coords);

        setDeviceLocation(coords);
      } catch (error) {
        console.error('Failed to get current location:', error);
      }

      watchId = LocationService.watchLocation(newLocation => {
        const coords: [number, number] = [
          newLocation.longitude,
          newLocation.latitude,
        ];

        setDeviceLocation(coords);
      });
    };

    initialize();

    return () => {
      if (watchId !== undefined) {
        LocationService.stopWatching(watchId);
      }
    };
  }, []);

  // Center the camera exactly once
  // when we receive the first real GPS location.
  useEffect(() => {
    if (!deviceLocation || hasCentered.current) {
      return;
    }

    console.log('CENTERING CAMERA ON:', deviceLocation);

    cameraRef.current?.easeTo({
      center: deviceLocation,
      duration: 1000,
    });

    hasCentered.current = true;
  }, [deviceLocation]);

  const handleRegionDidChange = (event: any) => {
    if (!isPickingLocation) {
      return;
    }

    const [longitude, latitude] = event.nativeEvent.center;

    setSelectedMapLocation({
      latitude,
      longitude,
    });
  };

  const centerOnLocation = (location: Location) => {
    cameraRef.current?.easeTo({
        center: [
            location.longitude,
            location.latitude,
        ],
        zoom: 16,
        duration: 700,
    });
};

  const routeCoordinates =
    estimate?.route_geometry.map(point => [
      point.longitude,
      point.latitude,
    ]) ?? [];
    

  return {
    deviceLocation,
    mapRef,
    cameraRef,
    handleRegionDidChange,
    isPickingLocation,
    centerOnLocation,
    routeCoordinates,
  };
}
