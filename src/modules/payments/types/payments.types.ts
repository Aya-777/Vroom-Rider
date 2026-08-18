export interface WalletBalance {
  balance: number;
  currency: string;
}

export type TransactionType = 'topup' | 'trip_payment' | 'refund';
export type TransactionStatus = 'pending' | 'completed' | 'failed';

export interface WalletTransaction {
  id: string;
  type: TransactionType;
  amount: number;
  status: TransactionStatus;
  createdAt: string;
  description?: string;
}

export interface TopUpResult {
  clientSecret: string;
  paymentIntentId: string;
}
