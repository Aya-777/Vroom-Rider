import { paymentsApi } from '../services/paymentsApi';
import { WalletTransactionDto } from '../services/dto/payments.dto';
import {
  WalletBalance,
  WalletTransaction,
  TopUpResult,
} from '../types/payments.types';

const mapTransaction = (dto: WalletTransactionDto): WalletTransaction => ({
  id: dto.id,
  type: dto.type,
  amount: Number(dto.amount),
  status: dto.status,
  createdAt: dto.created_at,
  description: dto.description,
});

export const paymentsRepository = {
  async getBalance(): Promise<WalletBalance> {
    const { data } = await paymentsApi.getWalletBalance();
    return { balance: Number(data.balance), currency: data.currency };
  },

  async getTransactions(): Promise<WalletTransaction[]> {
    const { data } = await paymentsApi.getTransactions();
    return data.map(mapTransaction);
  },

  async initiateTopUp(amount: number): Promise<TopUpResult> {
    const { data } = await paymentsApi.topUp(amount);
    return {
      clientSecret: data.client_secret,
      paymentIntentId: data.payment_intent_id,
    };
  },
};
