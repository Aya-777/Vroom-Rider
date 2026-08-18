import { useEffect, useState, useCallback } from 'react';
import { paymentsRepository } from '../repositories/paymentsRepository';
import { useWalletStore } from '../store/useWalletStore';
import { WalletTransaction } from '../types/payments.types';

export function useWalletViewModel() {
  const { balance, setBalance, isLoading, setLoading } = useWalletStore();
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [b, txs] = await Promise.all([
        paymentsRepository.getBalance(),
        paymentsRepository.getTransactions(),
      ]);
      setBalance(b);
      setTransactions(txs);
    } finally {
      setLoading(false);
    }
  }, [setBalance, setLoading]);

  useEffect(() => {
    load();
  }, [load]);

  return { balance, transactions, isLoading, refresh: load };
}
