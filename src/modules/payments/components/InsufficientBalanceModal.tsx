import React from 'react';
import { Modal, Pressable, Text, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../core/theme/useTheme';
import LinearBg from '../../../shared/components/LinearBg';

type Props = {
  isVisible: boolean;
  onClose: () => void;
  onSwitchToCash: () => void;
  onTopUp: () => void;
  context: 'pre_ride' | 'post_ride';
};

export function InsufficientBalanceModal({ isVisible, onClose, onSwitchToCash, onTopUp, context }: Props) {
  const { t } = useTranslation('payments');
  const { colors } = useTheme();
  return (
    <Modal visible={isVisible} transparent animationType="fade" statusBarTranslucent onRequestClose={onClose}>
      <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.45)', justifyContent: 'center', alignItems: 'center', padding: 24 }}>
        <LinearBg colors={[colors.backgroundSoft, colors.background]} start={{ x: 0, y: 0 }} end={{ x: 1, y: 0.8 }} style={{ width: '100%', borderRadius: 24, padding: 24, overflow: 'hidden' }}>
          <Text style={{ color: colors.primary, fontSize: 20, fontWeight: '700', textAlign: 'center', marginBottom: 12 }}>{t(`wallet.insufficientBalance.${context}.title`)}</Text>
          <Text style={{ color: colors.textPrimary, fontSize: 15, lineHeight: 22, textAlign: 'center', marginBottom: 24 }}>{t(`wallet.insufficientBalance.${context}.message`)}</Text>
          <View style={{ flexDirection: 'row', gap: 10 }}>
            <Pressable onPress={onSwitchToCash} style={{ flex: 1, minHeight: 44, borderWidth: 1, borderColor: colors.primary, borderRadius: 12, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 8 }}>
              <Text style={{ color: colors.primary, fontWeight: '700', textAlign: 'center' }}>{t('wallet.switchToCash')}</Text>
            </Pressable>
            <Pressable onPress={onTopUp} style={{ flex: 1, minHeight: 44, backgroundColor: colors.primary, borderRadius: 12, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 8 }}>
              <Text style={{ color: colors.backgroundSoft, fontWeight: '700', textAlign: 'center' }}>{t('wallet.topUpNow')}</Text>
            </Pressable>
          </View>
        </LinearBg>
      </View>
    </Modal>
  );
}
