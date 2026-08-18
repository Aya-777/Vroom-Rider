import React, { useState } from 'react';
import { Text, TextInput, Pressable, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../core/theme/useTheme';
import SubHeader from '../../../shared/components/SubHeader';
import ActionButton from '../../../shared/components/ActionButton';
import LinearBg from '../../../shared/components/LinearBg';
import { useWalletActions } from '../hooks/useWalletActions';
import { createStyles } from '../styles/wallet.styles';

const SUGGESTED_AMOUNTS = [5, 10, 25, 50, 100];

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
    if (result.success) {
      navigation.goBack();
    } else {
      setError(t('wallet.topUpFailed'));
    }
  };

  return (
    <LinearBg colors={[colors.backgroundSoft, colors.background]} style={styles.screen}>
      <SubHeader title={t('wallet.topUp')} onBackPress={() => navigation.goBack()} />
      <View style={[styles.content, styles.topUpContent]}>
        <Text style={styles.topUpSectionTitle}>{t('wallet.enterAmount')}</Text>

        <View style={[styles.amountRow, styles.topUpAmountRow]}>
          {SUGGESTED_AMOUNTS.map((value) => {
            const selected = amount === value;
            return (
              <Pressable
                key={value}
                onPress={() => { setAmount(value); setError(null); }}
                style={[styles.amountChip, selected && styles.amountChipSelected]}
              >
                <Text style={[styles.amountChipText, selected && styles.amountChipTextSelected]}>
                  {value}
                </Text>
              </Pressable>
            );
          })}
        </View>

        <TextInput
          style={[styles.amountInput, styles.topUpAmountInput]}
          value={amount ? String(amount) : ''}
          keyboardType="numeric"
          placeholder={t('wallet.customAmount')}
          placeholderTextColor={colors.textMuted}
          onChangeText={(value) => { setAmount(Number(value) || null); setError(null); }}
        />

        {error && <Text style={[styles.errorText, styles.topUpError]}>{error}</Text>}

        <View style={styles.topUpButtonContainer}>
          <ActionButton
            title={t('wallet.confirmTopUp')}
            onPress={handleTopUp}
            loading={isProcessing}
            disabled={!amount || isProcessing}
          />
        </View>
      </View>
    </LinearBg>
  );
}