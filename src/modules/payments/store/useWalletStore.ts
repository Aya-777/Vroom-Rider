import { create } from 'zustand';
import { WalletBalance } from '../types/payments.types';

interface WalletState {
  balance: WalletBalance | null;
  isLoading: boolean;
  setBalance: (balance: WalletBalance) => void;
  setLoading: (value: boolean) => void;
}

export const useWalletStore = create<WalletState>(set => ({
  balance: null,
  isLoading: false,
  setBalance: balance => set({ balance }),
  setLoading: isLoading => set({ isLoading }),
}));
