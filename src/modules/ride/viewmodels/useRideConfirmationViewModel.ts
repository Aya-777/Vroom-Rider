import { driverMock } from '../constants/rideConfirmation.data';

export function useRideConfirmationViewModel() {
  // لاحقاً هون ممكن تجيب data من API / socket

  return {
    driver: driverMock,
  };
}