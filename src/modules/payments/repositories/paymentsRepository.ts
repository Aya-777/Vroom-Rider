import { paymentsApi } from '../services/paymentsApi';
import { WalletTransactionDto } from '../services/dto/payments.dto';
import {
  WalletBalance,
  WalletTransaction,
  TopUpResult,
} from '../types/payments.types';

type ApiEnvelope<T> = { data: T };

const unwrap = <T>(payload: T | ApiEnvelope<T>): T => {
  if (payload && typeof payload === 'object' && 'data' in payload) {
    return (payload as ApiEnvelope<T>).data;
  }
  return payload as T;
};

const mapTransaction = (dto: WalletTransactionDto): WalletTransaction => {
  const rawType = String(dto.type).toLowerCase().replace(/[-\\s]+/g, '_');
  const type = rawType === 'top_up' ? 'topup' : rawType === 'trip-payment' ? 'trip_payment' : rawType;
  return {
  id: dto.id,
  type: type as WalletTransaction['type'],
  amount: Number(dto.amount),
  status: dto.status,
  createdAt: dto.created_at,
  description: dto.description,
  };
};

export const paymentsRepository = {
  async getBalance(): Promise<WalletBalance> {
    const response = await paymentsApi.getWalletBalance();
    const data = unwrap(response.data);
    return { balance: Number(data.balance), currency: '$' };
  },

  async getTransactions(): Promise<WalletTransaction[]> {
    const response = await paymentsApi.getTransactions();
    const data = unwrap(response.data) as
      | WalletTransactionDto[]
      | { results?: WalletTransactionDto[] };
    const rows = Array.isArray(data) ? data : data.results ?? [];
    return rows.map(mapTransaction);
  },

  async initiateTopUp(amount: number): Promise<TopUpResult> {
    const response = await paymentsApi.topUp(amount);
    const data = unwrap(response.data);
    return {
      clientSecret: data.client_secret,
      paymentIntentId: data.payment_intent_id,
    };
  },
};
