import React from 'react';
import { View, Text, FlatList } from 'react-native';
import { useTranslation } from 'react-i18next';
import ActionButton from '../../../shared/components/ActionButton';
import { useWalletViewModel } from '../viewmodels/useWalletViewModel';
import { createStyles } from '../styles/wallet.styles';
import { useTheme } from '../../../core/theme/useTheme';

export default function WalletScreen({ navigation }: any) {
    const { t } = useTranslation('payments');
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const { balance, transactions, isLoading, refresh } = useWalletViewModel();

    return (
        <View style={styles.container}>
            <View style={styles.balanceCard}>
                <Text style={styles.balanceLabel}>{t('wallet.balance')}</Text>
                <Text style={styles.balanceAmount}>
                    {balance ? `${balance.balance} ${balance.currency}` : '--'}
                </Text>
                <ActionButton title={t('wallet.topUp')} onPress={() => navigation.navigate('TopUp')} />
            </View>

            <Text style={styles.sectionTitle}>{t('wallet.recentTransactions')}</Text>
            <FlatList
                data={transactions.slice(0, 5)}
                keyExtractor={(item) => item.id}
                refreshing={isLoading}
                onRefresh={refresh}
                renderItem={({ item }) => (
                    <View style={styles.transactionRow}>
                        <Text style={styles.transactionType}>{t(`wallet.types.${item.type}`)}</Text>
                        <Text style={styles.transactionAmount}>{item.amount}</Text>
                    </View>
                )}
                ListFooterComponent={
                    <ActionButton
                        title={t('wallet.viewAll')}
                        onPress={() => navigation.navigate('Transactions')}
                        style={{ backgroundColor: 'transparent' }}
                        textStyle={{ color: colors.primary }}
                    />
                }
            />
        </View>
    );
}