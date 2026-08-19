import { useState, useCallback } from 'react';
import { paymentsRepository } from '../repositories/paymentsRepository';
import { useWalletStore } from '../store/useWalletStore';

export function useBalanceCheck() {
  const { setBalance } = useWalletStore();
  const [isChecking, setIsChecking] = useState(false);

  const hasSufficientBalance = useCallback(
    async (amount: number): Promise<boolean> => {
      setIsChecking(true);
      try {
        const balance = await paymentsRepository.getBalance();
        setBalance(balance);
        return balance.balance >= amount;
      } finally {
        setIsChecking(false);
      }
    },
    [setBalance],
  );

  return { hasSufficientBalance, isChecking };
}
