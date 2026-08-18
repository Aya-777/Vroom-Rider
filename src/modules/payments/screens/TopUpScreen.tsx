import React, { useState } from 'react';
import { View, Text, TextInput, Pressable } from 'react-native';
import { useTranslation } from 'react-i18next';
import ActionButton from '../../../shared/components/ActionButton';
import { useWalletActions } from '../hooks/useWalletActions';
import { createStyles } from '../styles/wallet.styles';
import { useTheme } from '../../../core/theme/useTheme';

const SUGGESTED_AMOUNTS = [5, 10, 25, 50];

export default function TopUpScreen({ navigation }: any) {
    const { t } = useTranslation('payments');
    const { colors } = useTheme();
    const styles = createStyles(colors);
    const { topUp, isProcessing } = useWalletActions();
    const [amount, setAmount] = useState<number | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleTopUp = async () => {
        if (!amount || amount <= 0) return;
        setError(null);
        const result = await topUp(amount);
        if (result.success) navigation.goBack();
        else if (result.error !== 'cancelled') setError(t('wallet.topUpFailed'));
    };

    return (
        <View style={styles.container}>
            <Text style={styles.sectionTitle}>{t('wallet.enterAmount')}</Text>
            <View style={styles.amountRow}>
                {SUGGESTED_AMOUNTS.map((a) => {
                    const selected = amount === a;
                    return (
                        <Pressable
                            key={a}
                            style={[styles.amountChip, selected && styles.amountChipSelected]}
                            onPress={() => setAmount(a)}
                        >
                            <Text style={[styles.amountChipText, selected && styles.amountChipTextSelected]}>
                                {a}
                            </Text>
                        </Pressable>
                    );
                })}
            </View>
            <TextInput
                style={styles.amountInput}
                keyboardType="numeric"
                placeholder={t('wallet.customAmount')}
                placeholderTextColor={colors.textSecondary}
                onChangeText={(v) => setAmount(Number(v) || null)}
            />
            {error && <Text style={styles.errorText}>{error}</Text>}
            <ActionButton
                title={t('wallet.confirmTopUp')}
                onPress={handleTopUp}
                loading={isProcessing}
                disabled={!amount}
            />
        </View>
    );
}