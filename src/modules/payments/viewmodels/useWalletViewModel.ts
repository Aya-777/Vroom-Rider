import { useEffect, useState, useCallback } from 'react';
import { paymentsRepository } from '../repositories/paymentsRepository';
import { useWalletStore } from '../store/useWalletStore';
import { WalletTransaction } from '../types/payments.types';
export function useWalletViewModel() {
  const { balance, setBalance, isLoading, setLoading } = useWalletStore();
  const [transactions, setTransactions] = useState<WalletTransaction[]>([]);
  const [error, setError] = useState<unknown>(null);
  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const [b, txs] = await Promise.all([paymentsRepository.getBalance(), paymentsRepository.getTransactions()]);
      setBalance(b);
      setTransactions(txs);
    } catch (loadError) {
      setError(loadError);
    } finally {
      setLoading(false);
    }
  }, [setBalance, setLoading]);
  useEffect(() => { load(); }, [load]);
  return { balance, transactions, isLoading, error, refresh: load };
}