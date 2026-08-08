import { driverMock } from '../constants/driverData';
import { useEffect } from 'react';
import { useRideStore } from '../store/useRideStore';

export function useDriverFoundViewModel() {
  // لاحقاً هون ممكن تجيب data من API / socket

  return {
    driver: driverMock,
  };
}
