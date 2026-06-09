import { driverMock } from '../constants/driverData';

export function useDriverHereViewModel() {
  // لاحقاً هون ممكن تجيب data من API / socket

  return {
    driver: driverMock,
  };
}