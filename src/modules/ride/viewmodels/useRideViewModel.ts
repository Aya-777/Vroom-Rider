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
import { RideFilter } from '../types/ride.types';
import { fetchFilters } from '../utils/fetchFilters';
import { Alert } from 'react-native';
import { getRideStateFromStatus } from '../utils/getRideStateFromStatus';
import { useBalanceCheck } from '../../payments/hooks/useBalanceCheck';
import { useWalletActions } from '../../payments/hooks/useWalletActions';

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
  const { hasSufficientBalance } = useBalanceCheck();
  const { topUp, isProcessing: isTopUpProcessing } = useWalletActions();
  const [isPostRideInsufficientVisible, setPostRideInsufficientVisible] =
    useState(false);

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
          if (rideState === RideState.SELECT_TIME) {
            setRideState(RideState.SELECT_TIME);
          } else {
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

        const route = await rideApi.getCurrentRoute(ride.id);

        console.log('[RideVM] Raw route:', route);


        setEstimate({
          ...estimate,
          route_geometry: route,
        });

        setCurrentRide(ride);
        setRideState(state);
      } catch (error: any) {
        if (
          error?.response?.status === 404 &&
          error?.response?.data?.message === 'trips.detail.no_current_trip'
        ) {
          setCurrentRide(null);
          if (rideState === RideState.SELECT_TIME) {
            setRideState(RideState.SELECT_TIME);
          } else {
            setRideState(RideState.SELECT_RIDE);
          }
          return;
        }
      }
    };
    loadCurrentRide();
  }, [setCurrentRide, setRideState, setDriverLocation]);

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
    const checkAndShowBill = async () => {
      if (currentRide?.status !== TripStatus.COMPLETED) return;

      setRideState(RideState.TRIP_ENDED);

      if (currentRide.payment_method === 'WALLET') {
        const finalPrice = Number(
          currentRide.actual_price ?? currentRide.estimated_price,
        );
        const sufficient = await hasSufficientBalance(finalPrice);
        if (!sufficient) {
          setPostRideInsufficientVisible(true);
          return;
        }
      }

      setIsBillVisible(true);
    };

    checkAndShowBill();
  }, [
    currentRide?.status,
    currentRide?.payment_method,
    currentRide?.actual_price,
    currentRide?.estimated_price,
    hasSufficientBalance,
    setRideState,
  ]);

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
    if (
      rideState === RideState.SELECT_RIDE ||
      rideState === RideState.SELECT_TIME
    ) {
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
    } catch {
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

  const handleSosPress = async () => {
    if (!currentRide) {
      console.log('There is no current ride');
      return false;
    }
    try {
      if (storeSOSVisible && sosAlertId) {
        await rideApi.areYouSafePress(sosAlertId, false);
      } else {
        await rideApi.sosPress(currentRide?.id);
      }
      console.log('Sos sent successfully.');
      return true;
    } catch {
      console.log('failed to send sos, try again.');
      return false;
    }
  };

  const handlePostRideSwitchToCash = async () => {
    console.log(
      'TODO: switch payment_method to CASH on backend for ride',
      currentRide?.id,
    );

    setPostRideInsufficientVisible(false);
    setIsBillVisible(true);
  };

  const handlePostRideTopUp = async () => {
    const finalPrice = Number(
      currentRide?.actual_price ?? currentRide?.estimated_price ?? 0,
    );
    const result = await topUp(finalPrice);
    if (!result.success) return;
    const sufficient = await hasSufficientBalance(finalPrice);
    if (sufficient) {
      setPostRideInsufficientVisible(false);
      setIsBillVisible(true);
    }
  };

  const handleSetupRide = (date: Date) => {
    setRideDetails({
      is_scheduled: true,
      scheduled_at: date,
    });
  };

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
    isPostRideInsufficientVisible,
    isTopUpProcessing,
    setPostRideInsufficientVisible,
    handlePostRideSwitchToCash,
    handlePostRideTopUp,
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
    handleSosPress,
    handleSetupRide,
  };
}
