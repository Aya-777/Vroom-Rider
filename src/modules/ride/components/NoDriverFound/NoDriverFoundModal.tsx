import React, { useState } from 'react';
import { View, Text, Modal, TextInput } from 'react-native';
import { createStyles } from '../../styles/shared.styles';
import { useTheme } from '../../../../core/theme/useTheme';
import { useTranslation } from 'react-i18next';
import LinearBg from '../../../../shared/components/LinearBg';
import ActionButton from '../../../../shared/components/ActionButton';
import Input from '../../../../shared/components/Input';

type Props = {
  cancelPress: () => void;
  rematch: () => void;
  isFailed: boolean;
};

export const NoDriverFoundModal = ({ cancelPress, isFailed, rematch }: Props) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['selectRide', 'common']);

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
          <Text style={styles.title}>Search Failed</Text>
            <View style={styles.Divider} />
    

          <Text style={styles.message}>
            We couldn't find a driver for your trip, do you want to retry?
          </Text>

          <View style={styles.actions}>
            <ActionButton
              title="Cancel"
              onPress={() => cancelPress}
              style={styles.actionButton}
              textStyle={styles.actionButtonText}
            />

            <ActionButton
              title="Retry"
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
