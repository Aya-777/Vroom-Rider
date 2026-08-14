import { driverMock } from '../constants/driverData';
import { useRideStore } from '../store/useRideStore';

export function useDriverArrivedViewModel() {

  const {currentRide} = useRideStore();

  return {
    currentRide,
    driver: driverMock,
  };
}
