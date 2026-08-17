import React, { useState } from 'react';
import { View, Text, Modal, TextInput } from 'react-native';
import { createStyles } from '../../styles/shared.styles';
import { useTheme } from '../../../../core/theme/useTheme';
import { useTranslation } from 'react-i18next';
import LinearBg from '../../../../shared/components/LinearBg';
import ActionButton from '../../../../shared/components/ActionButton';

type Props = {
  cancelPress: () => void;
  rematch: () => void;
  isFailed: boolean;
};

export const NoDriverFoundModal = ({ cancelPress, isFailed, rematch }: Props) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['modals', 'common']);

  return (
    <Modal visible={isFailed} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <LinearBg
          colors={[colors.backgroundSoft, colors.background]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.8 }}
          style={styles.modal}
      >
          {/* Header */}
          <Text style={styles.title}>{t('modals:modals.noDriverFound.title')}</Text>
            <View style={styles.Divider} />
    

          <Text style={styles.retryMessage}>
            {t('modals:modals.noDriverFound.message')}
          </Text>

          <View style={styles.actions}>
            <ActionButton
              title={t('common:cancel')}
              onPress={cancelPress}
              style={styles.actionButton}
              textStyle={styles.actionButtonText}
            />

            <ActionButton
              title={t('modals:modals.noDriverFound.actionRetry')}
              onPress={rematch}
              style={styles.actionButton}
              textStyle={styles.actionButtonText}
            />
          </View>
        </LinearBg>
      </View>
    </Modal>
  );
};
