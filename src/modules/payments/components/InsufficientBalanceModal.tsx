import React from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import ActionButton from '../../../shared/components/ActionButton';
import { BaseBottomSheet } from '../../../shared/components/BaseBottomSheet';

interface Props {
    isVisible: boolean;
    onClose: () => void;
    onSwitchToCash: () => void;
    onTopUp: () => void;
    context: 'pre_ride' | 'post_ride';
}

export function InsufficientBalanceModal({
    isVisible,
    onClose,
    onSwitchToCash,
    onTopUp,
    context,
}: Props) {
    const { t } = useTranslation('payments');

    return (
        <BaseBottomSheet isVisible={isVisible} onClose={onClose}>
            <Text>{t(`wallet.insufficientBalance.${context}.title`)}</Text>
            <Text>{t(`wallet.insufficientBalance.${context}.message`)}</Text>
            <ActionButton title={t('wallet.switchToCash')} onPress={onSwitchToCash} />
            <ActionButton
                title={t('wallet.topUpNow')}
                onPress={onTopUp}
                style={{ backgroundColor: 'transparent', borderWidth: 1 }}
            />
        </BaseBottomSheet>
    );
}