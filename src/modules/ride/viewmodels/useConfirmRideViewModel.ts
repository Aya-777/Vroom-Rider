import { useState } from 'react';
import { useRideStore } from '../store/useRideStore';
import { rideApi } from '../services/rideApi';
import { RequestRideRequestDTO } from '../services/dto/ride.dto';
import { Alert } from 'react-native';
import { CurrentRide } from '../types/ride.types';

export function useConfirmRideViewModel() {
  const [isLoading, setIsLoading] = useState(false);
  const { rideData, estimate, setCurrentRide } = useRideStore();

  const handleFindDriver = async () => {
    setIsLoading(true);
    try {
      const response = await rideApi.confirmRide(
        rideData as RequestRideRequestDTO,
      );
      console.log(response);
      setCurrentRide(response as CurrentRide);

      return response;
    } catch (error) {
      Alert.alert('Error', 'Could not find a driver. Please try again.');
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return { handleFindDriver, isLoading, rideData, estimate };
}
