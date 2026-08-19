import { useState } from 'react';
import { useStripe } from '@stripe/stripe-react-native';
import { paymentsRepository } from '../repositories/paymentsRepository';
import { useWalletStore } from '../store/useWalletStore';

type TopUpOutcome =
  | { success: true }
  | {
      success: false;
      error: 'cancelled' | 'init_failed' | 'payment_failed' | 'network_error';
      message?: string;
    };

const withTimeout = <T>(
  promise: Promise<T>,
  milliseconds: number,
): Promise<T> =>
  Promise.race([
    promise,
    new Promise<T>((_, reject) =>
      setTimeout(() => reject(new Error('TOP_UP_TIMEOUT')), milliseconds),
    ),
  ]);

const readableError = (error: any): string | undefined =>
  error?.message ||
  error?.localizedMessage ||
  error?.response?.data?.message ||
  error?.response?.data?.detail;

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
      return {
        success: false,
        error: 'payment_failed',
        message: 'Invalid top-up amount.',
      };
    }

    setIsProcessing(true);
    try {
      const { clientSecret } = await withTimeout(
        paymentsRepository.initiateTopUp(amount),
        15000,
      );
      if (!clientSecret)
        return {
          success: false,
          error: 'init_failed',
          message: 'Backend did not return a Stripe client secret.',
        };

      const { error: initError } = await withTimeout(
        initPaymentSheet({
          paymentIntentClientSecret: clientSecret,
          merchantDisplayName: 'Vroom',
          googlePay: {
            merchantCountryCode: 'US', 
            testEnv: true,
          },
          // returnURL: 'vroomrider://stripe-redirect',
        }),
        15000,
      );
      if (initError) {
        const message = readableError(initError);
        console.warn('[Wallet] Stripe PaymentSheet init failed:', initError);
        return { success: false, error: 'init_failed', message };
      }

      const { error: presentError } = await withTimeout(
        presentPaymentSheet(),
        120000,
      );
      if (presentError) {
        const message = readableError(presentError);
        console.warn(
          '[Wallet] Stripe PaymentSheet presentation failed:',
          presentError,
        );
        return {
          success: false,
          error:
            presentError.code === 'Canceled' ? 'cancelled' : 'payment_failed',
          message,
        };
      }

      try {
        await refreshBalance();
      } catch (balanceError) {
        console.warn(
          '[Wallet] Payment succeeded but balance refresh failed:',
          balanceError,
        );
      }
      return { success: true };
    } catch (error: any) {
      const message = readableError(error) || 'Top up request failed.';
      console.warn('[Wallet] Top up failed:', error);
      return { success: false, error: 'network_error', message };
    } finally {
      setIsProcessing(false);
    }
  };

  return { topUp, refreshBalance, isProcessing };
}
