import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../../navigation/main/home/homeTypes';
import { RecentDestinationParams } from '../../ride/types/recentDestination.types';
import { useRef } from 'react';
import { useRideStore } from '../../ride/store/useRideStore';
import { RideState } from '../../ride/types/RideState';
import { RideStop } from '../../ride/types/ride.types';
export const useHomeActions = () => {
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const { setRideState, setRideDetails, rideData } = useRideStore();
  
  const navigateToRide = () => {
    navigation.navigate('Ride');
    setRideState(RideState.SELECT_RIDE);
  };
  
  const navigateToSchedule = () => {      
    navigation.navigate('Ride');
    setRideState(RideState.SELECT_TIME);
  };

  const navigateToRideWithDestination = (destination: RecentDestinationParams) => {
    
    const dropOffStop: RideStop = {
      address: destination.address,
      latitude: destination.latitude,
      longitude: destination.longitude,
      stop_type: 'DROP_OFF',
      order: 0, // Will be normalized or adjusted if there's a pickup
    };
    
    // Keep existing stops (like pickup) and set or replace the drop-off stop
    const existingStops = rideData.stops ?? [];
    const filteredStops = existingStops.filter(stop => stop.stop_type !== 'DROP_OFF');
    
    setRideDetails({
      stops: [...filteredStops, dropOffStop],
    });
    
    navigation.navigate('Ride');
    setRideState(RideState.SELECT_RIDE);
  };

  return { navigateToRide, navigateToSchedule, navigateToRideWithDestination };
};