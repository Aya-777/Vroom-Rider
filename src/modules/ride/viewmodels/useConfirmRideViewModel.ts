import { useState } from 'react';
import { useRideStore } from '../store/useRideStore';
import { rideApi } from '../services/rideApi';
import { RequestRideRequestDTO } from '../services/dto/ride.dto';
import { Alert } from 'react-native';
import { CurrentRide } from '../types/ride.types';
import { TripStatus } from '../types/RideState';
import { useBalanceCheck } from '../../payments/hooks/useBalanceCheck';
import { useWalletActions } from '../../payments/hooks/useWalletActions';

export function useConfirmRideViewModel() {
  const [isLoading, setIsLoading] = useState(false);
  const [isInsufficientBalanceVisible, setInsufficientBalanceVisible] =
    useState(false);
  const {
    rideData,
    estimate,
    setCurrentRide,
    setRideDetails,
    getIdempotencyKey,
  } = useRideStore();
  const { hasSufficientBalance, isChecking } = useBalanceCheck();
  const { topUp, isProcessing: isTopUpProcessing } = useWalletActions();

  const proceedToFindDriver = async () => {
    setIsLoading(true);
    const idempotencyKey = getIdempotencyKey();
    try {
      const response = await rideApi.confirmRide(
        rideData as RequestRideRequestDTO,
        idempotencyKey,
      );
      setCurrentRide(response as CurrentRide);
      setRideDetails({ status: TripStatus.PENDING });
      return response;
    } catch (err: any) {
      Alert.alert(
        err.response?.data?.message || err.message || 'Error',
        'Could not find a driver. Please try again.',
      );
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  const handleFindDriver = async (selectedPrice: number) => {
    if (rideData.payment_method === 'WALLET') {
      const sufficient = await hasSufficientBalance(selectedPrice);
      if (!sufficient) {
        setInsufficientBalanceVisible(true);
        return null;
      }
    }
    return proceedToFindDriver();
  };

  const handleTopUp = async (amount: number) => {
    const result = await topUp(amount);
    if (!result.success) return null;
    setInsufficientBalanceVisible(false);
    return proceedToFindDriver();
  };
  const handleSwitchToCash = () => {
    setRideDetails({ payment_method: 'CASH' });
    setInsufficientBalanceVisible(false);
    return proceedToFindDriver();
  };

  return {
    handleFindDriver,
    isLoading: isLoading || isChecking || isTopUpProcessing,
    rideData,
    estimate,
    isInsufficientBalanceVisible,
    setInsufficientBalanceVisible,
    handleSwitchToCash,
    handleTopUp,
  };
}

