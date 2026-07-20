import { useNavigation } from '@react-navigation/native';
import { HomeStackScreenProps } from '../../../navigation/main/home/homeTypes';
import { useState } from 'react';
import { RideState } from '../types/RideState';

export function useRideViewModel() {
  const navigation = useNavigation<HomeStackScreenProps<'Ride'>['navigation']>();
  const [rideState, setRideState] = useState(
    RideState.SELECT_RIDE,
  );

  const handleBackPress = () => {
    navigation.goBack();
  };

  return {
    rideState,
    handleBackPress,
    setRideState,
  };
}