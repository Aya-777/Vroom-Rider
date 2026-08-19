import { apiClient } from '../../../core/network/apiClient';
import { ENDPOINTS } from '../../../core/network/endpoints';
import {
  WalletBalanceDto,
  WalletTransactionDto,
  TopUpResponseDto,
} from './dto/payments.dto';

export const paymentsApi = {
  getWalletBalance: () =>
    apiClient.get<WalletBalanceDto>(ENDPOINTS.PAYMENTS.WALLET),

  getTransactions: () =>
    apiClient.get<WalletTransactionDto[]>(
      ENDPOINTS.PAYMENTS.WALLET_TRANSACTIONS,
    ),

  topUp: (amount: number) =>
    apiClient.post<TopUpResponseDto>(ENDPOINTS.PAYMENTS.WALLET_TOPUP, {
      amount,
    }),
};
