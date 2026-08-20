import { useCallback } from 'react';
import { driverMock } from '../constants/driverData';
import { useRideStore } from '../store/useRideStore';
import { rideApi } from '../services/rideApi';
import { useResendCode } from '../../../shared/hooks/useResendCode';

export function useDriverArrivedViewModel() {
  const { currentRide } = useRideStore();
  const resendPinRequest = useCallback(async () => {
    if (!currentRide?.id) return;
    await rideApi.resendTripPin(currentRide.id);
  }, [currentRide?.id]);
  const { canResend, formatTimer, handleResend } = useResendCode(resendPinRequest);
  return { currentRide, driver: driverMock, canResend, resendPin: handleResend, resendPinTimer: formatTimer() };
}
