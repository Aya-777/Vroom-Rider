import { driverMock } from '../constants/driverData';
import { useEffect } from 'react';
import { useRideStore } from '../store/useRideStore';

export function useDriverFoundViewModel() {
  const {currentRide} = useRideStore();


  return {
    driver: driverMock,
    currentRide,
  };
}
