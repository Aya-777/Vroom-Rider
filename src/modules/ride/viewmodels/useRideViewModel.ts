import { useEffect, useState } from 'react';
import { RideState, TripStatus } from '../types/RideState';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../../navigation/main/home/homeTypes';
import LocationService, {
  Location,
} from '../../../core/services/location/LocationService';
import { useRideStore } from '../store/useRideStore';
import { rideApi } from '../services/rideApi';

const previousState: Partial<Record<RideState, RideState>> = {
  [RideState.EXTRA_DETAILS]: RideState.SELECT_RIDE,
  [RideState.CONFIRM_RIDE]: RideState.EXTRA_DETAILS,
};

export function useRideViewModel() {

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
    rideState,
    setRideState
  } = useRideStore();
  

  const navigation =
    useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

  useEffect(() => {
    const loadLocation = async () => {
      try {
        const location = await LocationService.getCurrentLocation();

        setCurrentLocation(location);

        console.log('Address:', location.address);
      } catch (error) {
        console.error('Failed to get location:', error);
      }
    };
    loadLocation();
  }, []);


  const goToExtraDetails = async () => {
    setRideState(RideState.EXTRA_DETAILS);
  };

  const goToRideConfirmation = () => setRideState(RideState.CONFIRM_RIDE);

  const goToSearchingForaDriver = () => setRideState(RideState.SEARCHING_FOR_DRIVER);

  const goToDriverFound = () => setRideState(RideState.DRIVER_FOUND);

  const goToDriverArrived = () => setRideState(RideState.DRIVER_ARRIVED);

  const goToTripStarted = () => setRideState(RideState.TRIP_STARTED);

  const resetRide = () => setRideState(RideState.SELECT_RIDE);

  const handleBackPress = () => {
    const previous = previousState[rideState];
    if (rideState === RideState.SELECT_RIDE) {
      navigation.goBack();
    } else if (previous) {
      setRideState(previous);
      if (previous === RideState.SELECT_RIDE) {
        setEstimate({
          estimated_distance_km: 0,
          estimated_duration_minutes: 0,
          pricing_tiers: [],
          stops: [],
          route_geometry: [],
        });
      }
    }
  };

  const cancelCurrentRide = async (reason: string) => {
    try {
      if (!currentRide?.id) {
        console.log('No active ride');
        return;
      }
      setIsCancelling(true);

      await rideApi.cancelRide(currentRide.id, reason);
      setCurrentRide({ ...currentRide, status: TripStatus.CANCELLED_BY_RIDER });
      clearRide();
      setRideState(RideState.SELECT_RIDE);
    } catch (error) {
      console.error('Failed to cancel ride:', error);
    } finally {
      setIsCancelling(false);
    }
  };

  const keepRidePress = () => {
    setIsCancelling(false);
  };

  const onMyLocationPress = async () => {
    try {
      const location = await LocationService.getCurrentLocation();
      setCurrentLocation(location);
      return location;
    } catch (e) {
      console.error(e);
      return null;
    }
  };

  return {
    rideState ,
    currentLocation,
    estimate,
    isCancelling,
    setIsCancelling,

    handleBackPress,
    goToExtraDetails,
    goToRideConfirmation,
    goToSearchingForaDriver,
    goToDriverFound,
    goToDriverArrived,
    goToTripStarted,
    resetRide,
    cancelCurrentRide,
    keepRidePress,
    onMyLocationPress,
  };
}
