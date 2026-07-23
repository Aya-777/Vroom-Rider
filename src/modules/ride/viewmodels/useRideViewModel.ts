import { useEffect, useState } from 'react';
import { RideState } from '../types/RideState';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../../navigation/main/home/homeTypes';
import LocationService, { Location } from '../../../core/services/location/LocationService';

export function useRideViewModel() {
  const [rideState, setRideState] = useState(RideState.SELECT_RIDE);
  const [currentLocation, setCurrentLocation] = useState<Location>();

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


  const goToExtraDetails = () =>
    setRideState(RideState.EXTRA_DETAILS);

  const goToRideConfirmation = () =>
    setRideState(RideState.CONFIRM_RIDE);

  const goToDriverFound = () =>
    setRideState(RideState.DRIVER_FOUND);

  const goToDriverArrived = () =>
    setRideState(RideState.DRIVER_ARRIVED);

  const goToTripStarted = () =>
    setRideState(RideState.TRIP_STARTED);

  const resetRide = () =>
    setRideState(RideState.SELECT_RIDE);

  const handleBackPress = () => {
    navigation.goBack();
  };

  return {
    rideState,
    currentLocation,

    handleBackPress,
    goToExtraDetails,
    goToRideConfirmation,
    goToDriverFound,
    goToDriverArrived,
    goToTripStarted,
    resetRide,
  };
}