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
import { CurrentRide, RideFilter } from '../types/ride.types';
import { fetchFilters } from '../utils/fetchFilters';
import { RequestRideRequestDTO } from '../services/dto/ride.dto';
import { Alert } from 'react-native';
import { getRideStateFromStatus } from '../utils/getRideStateFromStatus';

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
  const [isReviewVisible, setIsReviewVisible] = useState(false);
  const [isBillVisible, setIsBillVisible] = useState(false);
  const [filters, setFilters] = useState<RideFilter[]>([]);
  const {
  rideData,
  setRideDetails,
  estimate,
  setEstimate,
  clearRide,
  currentRide,
  setCurrentRide,
  rideState,
  setRideState,
  getIdempotencyKey,
} = useRideStore();


  useEffect(() => {
    let mounted = true;
    const loadFilters = async () => {
      try {
        const f = await fetchFilters();
        if (mounted) setFilters(f);
      } catch (e) {
        console.error('Failed to load filters', e);
      }
    };
    loadFilters();
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
  let mounted = true;

  const loadCurrentRide = async () => {
    try {
      const response = await rideApi.getCurrent();

      if (!mounted) {
        return;
      }

      const ride = response;

      if (!ride) {
        setCurrentRide(null);
        setRideState(RideState.SELECT_RIDE);
        return;
      }

      console.log('Current ride:', ride);

      setCurrentRide(ride);

      const state = getRideStateFromStatus(ride.status);

      setRideState(state);
    } catch (error) {
      console.error('Failed to load current ride:', error);
    }
  };

  loadCurrentRide();

  return () => {
    mounted = false;
  };
}, [setCurrentRide, setRideState]);


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

  useEffect(() => {
    if (currentRide?.status === TripStatus.COMPLETED) {
      setRideState(RideState.TRIP_ENDED);
      setIsBillVisible(true);
    }
  }, [currentRide?.status]);

  const goToExtraDetails = async () => {
    setRideState(RideState.EXTRA_DETAILS);
  };

  const goToRideConfirmation = () => setRideState(RideState.CONFIRM_RIDE);

  const goToSearchingForaDriver = () =>
    setRideState(RideState.SEARCHING_FOR_DRIVER);

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
    } catch (error) {
      console.error('Failed to cancel ride:', error);
    } finally {
      setIsCancelling(false);
    }
  };

  const keepRidePress = () => {
    setIsCancelling(false);
  };

  const handleRematch = async () => {
    try {
      const response = await rideApi.rematch(currentRide?.id ?? rideData.id ?? 0);
      setRideDetails({
        status: TripStatus.PENDING,
      });
      setRideState(RideState.SEARCHING_FOR_DRIVER);
      return response;
    } catch (error) {
      Alert.alert('Error', 'Could not find a driver. Please try again.');
      return null;
    }
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

  const handleSubmitReview = () => {
    setIsReviewVisible(false);
    navigation.navigate('HomeScreen');
    setCurrentRide(null);
    clearRide();
    setRideState(RideState.SELECT_RIDE);
  };

  const handleMaybeLater = () => {
    setIsReviewVisible(false);
    navigation.navigate('HomeScreen');
    setCurrentRide(null);
    clearRide();
    setRideState(RideState.SELECT_RIDE);
  };

  return {
    rideState,
    currentLocation,
    estimate,
    isCancelling,
    setIsCancelling,
    isBillVisible,
    isReviewVisible,
    setIsBillVisible,
    setIsReviewVisible,
    filters,

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
    handleRematch,
    onMyLocationPress,
    handleSubmitReview,
    handleMaybeLater,
  };
}
