import { useEffect, useRef, useState } from 'react';
import { RideState, TripStatus } from '../types/RideState';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../../navigation/main/home/homeTypes';
import LocationService, {
  Location,
} from '../../../core/services/location/LocationService';
import { useRideStore } from '../store/useRideStore';
import { rideApi } from '../services/rideApi';


export function useSearchingForaDriverViewModel() {
  const [rideState, setRideState] = useState(RideState.SELECT_RIDE);
  const [currentLocation, setCurrentLocation] = useState<Location>({
    address: '',
    latitude: 0,
    longitude: 0,
  });
  const [isCancelling, setIsCancelling] = useState(false);
  const {
    rideData,
    estimate,
    setEstimate,
    clearRide,
    currentRide,
    setCurrentRide,
  } = useRideStore();
  const isSearchingForDriver = rideData?.status === TripStatus.PENDING;


  return{
    isSearchingForDriver
  }
}