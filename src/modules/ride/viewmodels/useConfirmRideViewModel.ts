import { useState } from 'react';
import { useRideStore } from '../store/useRideStore';
import { rideApi } from '../services/rideApi';
import { RequestRideRequestDTO } from '../services/dto/ride.dto';
import { Alert } from 'react-native';
import { CurrentRide } from '../types/ride.types';
import { TripStatus } from '../types/RideState';

export function useConfirmRideViewModel() {
  const [isLoading, setIsLoading] = useState(false);
  const { rideData, estimate, setCurrentRide, setRideDetails, getIdempotencyKey } = useRideStore();

  const handleFindDriver = async () => {
    setIsLoading(true);
    const idempotencyKey = getIdempotencyKey();
    try {
      const response = await rideApi.confirmRide(
        rideData as RequestRideRequestDTO,
        idempotencyKey,
      );
      console.log(response.id);
      setCurrentRide(response as CurrentRide);
      setRideDetails({
        status: TripStatus.PENDING,
      });

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
