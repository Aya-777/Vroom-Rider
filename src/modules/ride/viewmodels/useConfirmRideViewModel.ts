import { useState } from 'react';
import { useRideStore } from '../store/useRideStore';
import { rideApi } from '../services/rideApi';
import { RequestRideRequestDTO } from '../services/dto/ride.dto';
import { Alert } from 'react-native';
import { CurrentRide } from '../types/ride.types';
import { TripStatus } from '../types/RideState';

export function useConfirmRideViewModel() {
  const [isLoading, setIsLoading] = useState(false);
  const { rideData, estimate, setCurrentRide, setRideDetails } = useRideStore();

  const handleFindDriver = async () => {
    setIsLoading(true);
    try {
      const response = await rideApi.confirmRide(
        rideData as RequestRideRequestDTO,
      );
      setCurrentRide(response as CurrentRide);
      setRideDetails({
        ...rideData, status: TripStatus.PENDING });

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
