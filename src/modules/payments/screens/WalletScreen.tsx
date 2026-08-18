import React from 'react';
import { ActivityIndicator, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../core/theme/useTheme';
import { useCurrentUser } from '../../../core/store/userStore';
import SubHeader from '../../../shared/components/SubHeader';
import ActionButton from '../../../shared/components/ActionButton';
import LinearBg from '../../../shared/components/LinearBg';
import { useWalletViewModel } from '../viewmodels/useWalletViewModel';
import TransactionWheel from '../components/TransactionWheel';
import { createStyles } from '../styles/wallet.styles';

export default function WalletScreen({ navigation }: any) {
  const { t } = useTranslation('payments');
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const user: any = useCurrentUser();
  const { balance, transactions, isLoading, error, refresh } = useWalletViewModel();
  const holderName = [user?.first_name, user?.last_name].filter(Boolean).join(' ') || 'â€”';
  const cardNumber = user?.wallet_card_number || user?.card_number || t('wallet.cardNotAvailable');

  return (
    <LinearBg colors={[colors.backgroundSoft, colors.background]} style={styles.screen}>
      <SubHeader title={t('wallet.title')} onBackPress={() => navigation.goBack()} />
      <View style={styles.content}>
        <LinearBg colors={[colors.surfaceAccent, colors.backgroundSoft]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 1 }} style={styles.walletCard}>
          <Text style={styles.cardLabel}>{t('wallet.balance')}</Text>
          <Text style={styles.balanceAmount}>{balance ? `${balance.balance.toFixed(2)} ${balance.currency}` : '0 US'}</Text>
          <View style={styles.cardFooter}>
            <View>
              <Text style={styles.cardMeta}>{t('wallet.cardHolder')}</Text>
              <Text style={styles.cardName}>{holderName}</Text>
              <Text style={styles.cardNumber}>{cardNumber}</Text>
            </View>
            <Text style={styles.cardBrand}>VROOM</Text>
          </View>
        </LinearBg>
        <ActionButton title={t('wallet.topUp')} onPress={() => navigation.navigate('TopUp')} style={styles.topUpButton} />
        <Text style={styles.sectionTitle}>{t('wallet.recentTransactions')}</Text>
        {isLoading ? (
          <View style={styles.stateContainer}><ActivityIndicator color={colors.primary} /><Text style={styles.stateText}>{t('wallet.loading')}</Text></View>
        ) : error ? (
          <View style={styles.stateContainer}><Text style={styles.stateText}>{t('wallet.loadError')}</Text><ActionButton title={t('wallet.retry')} onPress={refresh} style={styles.retryButton} /></View>
        ) : transactions.length ? (
          <TransactionWheel transactions={transactions} />
        ) : (
          <View style={styles.stateContainer}><Text style={styles.stateTitle}>{t('wallet.emptyTitle')}</Text><Text style={styles.stateText}>{t('wallet.emptyMessage')}</Text><ActionButton title={t('wallet.topUp')} onPress={() => navigation.navigate('TopUp')} style={styles.retryButton} /></View>
        )}
      </View>
    </LinearBg>
  );
}