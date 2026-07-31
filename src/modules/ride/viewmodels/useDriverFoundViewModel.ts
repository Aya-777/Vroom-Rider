import { driverMock } from '../constants/driverData';
import { useEffect } from 'react';

export function useDriverFoundViewModel() {
  // لاحقاً هون ممكن تجيب data من API / socket

  return {
    driver: driverMock,
  };
}
