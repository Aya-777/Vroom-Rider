import { useEffect, useRef, useState } from 'react';
import PermissionService from '../../../core/services/location/PermissionService';
import LocationService, {
  Location,
} from '../../../core/services/location/LocationService';
import { CameraRef, MapRef } from '@maplibre/maplibre-react-native';
import { useRideStore } from '../store/useRideStore';
import { RideState, TripStatus } from '../types/RideState';

export default function useMapViewModel() {
  const [deviceLocation, setDeviceLocation] = useState<[number, number] | null>(
    null,
  );
  const { estimate, currentRide, rideData, rideState, driverLocation } = useRideStore();
  const [isSearchingForDriver , setIsSearchingForDriver]= useState(rideData?.status === TripStatus.PENDING);
  // const routeCoordinates = estimate.route_geometry;

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

   useEffect(()=>{
    setIsSearchingForDriver(rideState === RideState.SEARCHING_FOR_DRIVER);
  }, [rideState]);


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
      center: [location.longitude, location.latitude],
      zoom: 16,
      duration: 700,
    });
  };


  const rawRouteCoordinates = estimate?.route_geometry ?? [];


  console.log('ruote;;;;;;;;;;;;;;;;;;;;;;;;;;;', rawRouteCoordinates);

const routeCoordinates: [number, number][] = Array.isArray(rawRouteCoordinates)
  ? rawRouteCoordinates
      .map((coordinate: any) => {
        // Already [lng, lat]
        if (Array.isArray(coordinate)) {
          return [Number(coordinate[0]), Number(coordinate[1])] as [
            number,
            number,
          ];
        }

        // { longitude, latitude }
        if (
          coordinate &&
          coordinate.longitude != null &&
          coordinate.latitude != null
        ) {
          return [
            Number(coordinate.longitude),
            Number(coordinate.latitude),
          ] as [number, number];
        }

        // { lng, lat }
        if (
          coordinate &&
          coordinate.lng != null &&
          coordinate.lat != null
        ) {
          return [Number(coordinate.lng), Number(coordinate.lat)] as [
            number,
            number,
          ];
        }

        return null;
      })
      .filter(
        (coordinate): coordinate is [number, number] =>
          coordinate !== null &&
          Number.isFinite(coordinate[0]) &&
          Number.isFinite(coordinate[1]),
      )
  : [];

  console.log("routeee geomtry .......................................", routeCoordinates)

  const routeBounds =
    routeCoordinates.length > 0
      ? routeCoordinates.reduce(
          (bounds, [lng, lat]) => ({
            west: Math.min(bounds.west, lng),
            south: Math.min(bounds.south, lat),
            east: Math.max(bounds.east, lng),
            north: Math.max(bounds.north, lat),
          }),
          {
            west: routeCoordinates[0][0],
            south: routeCoordinates[0][1],
            east: routeCoordinates[0][0],
            north: routeCoordinates[0][1],
          },
        )
      : null;

  const pickup = rideData.stops?.find(stop => stop.stop_type === 'PICKUP');

  const destination = rideData.stops?.find(
    stop => stop.stop_type === 'DROP_OFF',
  );

  const intermediateStops = rideData.stops?.filter(
    stop => stop.stop_type === 'STOP',
  );

  return {
    deviceLocation,
    mapRef,
    cameraRef,
    handleRegionDidChange,
    isPickingLocation,
    centerOnLocation,
    routeCoordinates,
    routeBounds,
    isSearchingForDriver,

    pickup,
    destination,
    intermediateStops,
    driverLocation,
  };
}
