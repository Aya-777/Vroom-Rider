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
  const [isSOSVisible, setSOSVisible] = useState(false);
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
    sosVisible: storeSOSVisible,
    setSOSVisible: setStoreSosVisible,
    sosAlertId,
    setDriverLocation,
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
  const loadCurrentRide = async () => {
    try {
      const ride = await rideApi.getCurrent();

      if (!ride) {
        setCurrentRide(null);
        if(rideState === RideState.SELECT_TIME){
          setRideState(RideState.SELECT_TIME)
        }else{
          setRideState(RideState.SELECT_RIDE);
        }
        return;
      }
      const state = getRideStateFromStatus(ride.status);
      const location = await rideApi.getDriverLocation(ride.id);

      console.log('[Ridevm] Driver location:', location);

      // Save it in Zustand
      setDriverLocation({
        latitude: location.data.latitude,
        longitude: location.data.longitude,
      });


      setCurrentRide(ride);
      setRideState(state);
    } catch (error: any) {
      if (
        error?.response?.status === 404 &&
        error?.response?.data?.message === 'trips.detail.no_current_trip'
      ) {
        setCurrentRide(null);
        if(rideState === RideState.SELECT_TIME){
          setRideState(RideState.SELECT_TIME)
        }else{
          setRideState(RideState.SELECT_RIDE);
        }
        return;
      }
      console.error('Failed to load current ride:', error);
    }
  };

  loadCurrentRide();
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
    if (rideState === RideState.SELECT_RIDE || rideState === RideState.SELECT_TIME) {
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
      const response = await rideApi.rematch(
        currentRide?.id ?? rideData.id ?? 0,
      );
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

  const handleSubmitReview = async (
    rating: number,
    review: string,
    isComplaint: boolean,
  ) => {
    setIsReviewVisible(false);

    console.log('submiting.....');
    try{
      await rideApi.submitReview(
        { rating: rating, comment: review, is_complaint: isComplaint },
        currentRide?.id ?? rideData.id ?? 0,
      );

    }catch{
      console.log('Error submitting review...');
    }

    navigation.navigate('HomeScreen');
    setCurrentRide(null);
    clearRide();
    setRideState(RideState.SELECT_RIDE);
    setIsReviewVisible(false);
  };

  const handleMaybeLater = () => {
    setIsReviewVisible(false);
    navigation.navigate('HomeScreen');
    setCurrentRide(null);
    clearRide();
    setRideState(RideState.SELECT_RIDE);
  };

  const handleSosPress = async () => {
    if(!currentRide){
      console.log('There is no current ride');
      return false;
    }
    try{
      if(storeSOSVisible && sosAlertId){
        await rideApi.areYouSafePress(sosAlertId, false);
      }else{
        await rideApi.sosPress(currentRide?.id)
      }
      console.log('Sos sent successfully.');
      return true;
    }catch{
      console.log('failed to send sos, try again.');
      return false;
    }
  }

  return {
    rideState,
    currentLocation,
    estimate,
    isCancelling,
    setIsCancelling,
    isBillVisible,
    isReviewVisible,
    isSOSVisible,
    storeSOSVisible,
    setIsBillVisible,
    setIsReviewVisible,
    setSOSVisible,
    setStoreSosVisible,
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
    handleSosPress,
  };
}
