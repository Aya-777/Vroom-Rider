import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackParamList } from '../../../navigation/main/home/homeTypes';
import { RecentDestinationParams } from '../../ride/types/recentDestination.types';
import { useRef } from 'react';
import { useRideStore } from '../../ride/store/useRideStore';
import { RideState } from '../../ride/types/RideState';

export const useHomeActions = () => {

  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const {setRideState} = useRideStore();
  
    const navigateToRide = () => {
      navigation.navigate('Ride');
      setRideState(RideState.SELECT_RIDE);
    };
    
    const navigateToSchedule = () => {       
      navigation.navigate('Ride');
      setRideState(RideState.SELECT_TIME);
    };

  const navigateToRideWithDestination = (destination: RecentDestinationParams) => {
    navigation.navigate('Ride', { prefillDestination: destination });
  };

  return { navigateToRide, navigateToSchedule, navigateToRideWithDestination };
};