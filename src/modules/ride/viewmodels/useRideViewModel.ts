import { useEffect, useState } from 'react';
import { RideState } from '../types/RideState';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../../navigation/main/home/homeTypes';
import LocationService, {
  Location,
} from '../../../core/services/location/LocationService';
import { useRideStore } from '../store/useRideStore';
import rideService from '../services/rideService';

const previousState: Partial<Record<RideState, RideState>> = {
  [RideState.EXTRA_DETAILS]: RideState.SELECT_RIDE,
  [RideState.CONFIRM_RIDE]: RideState.EXTRA_DETAILS,
};

export function useRideViewModel() {
  const [rideState, setRideState] = useState(RideState.SELECT_RIDE);
  const [currentLocation, setCurrentLocation] = useState<Location>();
  const { rideData, estimate, setEstimate, clearRide } = useRideStore();

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
    /*
    call your estimate API here

    example response:
    {
      price: 24.5,
      time: "15 min",
      distance: 8
    }
  */

    const response = {
      price: '24.5',
      time: '15 min',
      distance: 8,
    };

    setEstimate(response);

    setRideState(RideState.EXTRA_DETAILS);
  };

  const goToRideConfirmation = () => setRideState(RideState.CONFIRM_RIDE);

  const goToDriverFound = () => setRideState(RideState.DRIVER_FOUND);

  const goToDriverArrived = () => setRideState(RideState.DRIVER_ARRIVED);

  const goToTripStarted = () => setRideState(RideState.TRIP_STARTED);

  const resetRide = () => setRideState(RideState.SELECT_RIDE);

  const handleBackPress = () => {
    const previous = previousState[rideState];
    if(rideState === RideState.SELECT_RIDE){
      navigation.goBack()
    }else if (previous) {
      setRideState(previous);
    }
  };

  const cancelCurrentRide = async () => {
  try {

    if (!rideData.id) {
      console.log('No active ride');
      return;
    }
    await rideService.cancelRide(rideData.id);
    clearRide();
    setRideState(RideState.SELECT_RIDE);

  } catch (error) {

    console.error(
      'Failed to cancel ride:',
      error
    );

  }
};

  return {
    rideState,
    currentLocation,
    estimate,

    handleBackPress,
    goToExtraDetails,
    goToRideConfirmation,
    goToDriverFound,
    goToDriverArrived,
    goToTripStarted,
    resetRide,
    cancelCurrentRide
  };
}
