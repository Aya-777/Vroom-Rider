import { TripStatus } from '../types/RideState';
import { useRideStore } from '../store/useRideStore';

export function useSearchingForaDriverViewModel() {
  const {
    rideData,
  } = useRideStore();
  const isSearchingForDriver = rideData?.status === TripStatus.PENDING;

  return{
    isSearchingForDriver
  }
}