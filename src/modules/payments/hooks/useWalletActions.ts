import { useState } from 'react';
import { useStripe } from '@stripe/stripe-react-native';
import { paymentsRepository } from '../repositories/paymentsRepository';
import { useWalletStore } from '../store/useWalletStore';

type TopUpOutcome =
  | { success: true }
  | { success: false; error: 'cancelled' | 'init_failed' | 'payment_failed' | 'network_error' };

const withTimeout = <T,>(promise: Promise<T>, milliseconds: number): Promise<T> =>
  Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('TOP_UP_TIMEOUT')), milliseconds),
    ),
  ]);

export function useWalletActions() {
  const { initPaymentSheet, presentPaymentSheet } = useStripe();
  const { setBalance } = useWalletStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const refreshBalance = async () => {
    const balance = await withTimeout(paymentsRepository.getBalance(), 12000);
    setBalance(balance);
    return balance;
  };

  const topUp = async (amount: number): Promise<TopUpOutcome> => {
    if (isProcessing || !Number.isFinite(amount) || amount <= 0) {
      return { success: false, error: 'payment_failed' };
    }

    setIsProcessing(true);
    try {
      const { clientSecret } = await withTimeout(
        paymentsRepository.initiateTopUp(amount),
        15000,
      );

      if (!clientSecret) {
        return { success: false, error: 'init_failed' };
      }

      const { error: initError } = await withTimeout(
        initPaymentSheet({
          paymentIntentClientSecret: clientSecret,
          merchantDisplayName: 'Vroom',
        }),
        15000,
      );
      if (initError) {
        console.warn('[Wallet] Stripe sheet initialization failed', initError);
        return { success: false, error: 'init_failed' };
      }

      const { error: presentError } = await withTimeout(
        presentPaymentSheet(),
        120000,
      );
      if (presentError) {
        return {
          success: false,
          error: presentError.code === 'Canceled' ? 'cancelled' : 'payment_failed',
        };
      }

      try {
        await refreshBalance();
      } catch (balanceError) {
        console.warn('[Wallet] Payment succeeded but balance refresh failed', balanceError);
      }
      return { success: true };
    } catch (error) {
      console.warn('[Wallet] Top up failed', error);
      return { success: false, error: 'network_error' };
    } finally {
      setIsProcessing(false);
    }
  };

  return { topUp, refreshBalance, isProcessing };
}