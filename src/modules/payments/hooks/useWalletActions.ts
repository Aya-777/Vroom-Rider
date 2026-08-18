import { useState } from 'react';
import { useStripe } from '@stripe/stripe-react-native';
import { paymentsRepository } from '../repositories/paymentsRepository';
import { useWalletStore } from '../store/useWalletStore';

type TopUpOutcome =
  | { success: true }
  | {
      success: false;
      error: 'cancelled' | 'init_failed' | 'payment_failed' | 'network_error';
    };

export function useWalletActions() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { setBalance } = useWalletStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const refreshBalance = async () => {
    const balance = await paymentsRepository.getBalance();
    setBalance(balance);
    return balance;
  };

  const topUp = async (amount: number): Promise<TopUpOutcome> => {
    setIsProcessing(true);
    try {
      const { clientSecret } = await paymentsRepository.initiateTopUp(amount);

      const { error: initError } = await initPaymentSheet({
        paymentIntentClientSecret: clientSecret,
        merchantDisplayName: 'Vroom',
      });
      if (initError) return { success: false, error: 'init_failed' };

      const { error: presentError } = await presentPaymentSheet();
      if (presentError) {
        return {
          success: false,
          error:
            presentError.code === 'Canceled' ? 'cancelled' : 'payment_failed',
        };
      }

      await refreshBalance();
      return { success: true };
    } catch {
      return { success: false, error: 'network_error' };
    } finally {
      setIsProcessing(false);
    }
  };

  return { topUp, refreshBalance, isProcessing };
}
