export interface WalletBalanceDto {
  balance: string;
  currency: string;
}

export interface WalletTransactionDto {
  id: string;
  type: 'topup' | 'trip_payment' | 'refund';
  amount: string;
  status: 'pending' | 'completed' | 'failed';
  created_at: string;
  description?: string;
}

export interface TopUpResponseDto {
  client_secret: string;
  payment_intent_id: string;
}
