import React, { useState } from 'react';
import { View, Text, Modal, TextInput } from 'react-native';
import { createStyles } from '../../styles/shared.styles';
import { useTheme } from '../../../../core/theme/useTheme';
import { useTranslation } from 'react-i18next';
import LinearBg from '../../../../shared/components/LinearBg';
import ActionButton from '../../../../shared/components/ActionButton';

type Props = {
  cancelCurrentRide: (reason: string) => void;
  isCancelling: boolean;
};

export const CancelModal = ({ cancelCurrentRide, isCancelling }: Props) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['selectRide', 'common']);
  const [cancellationReason, setCancellationReason] = useState('');

  const setIsCancelling = (value: boolean) => {
    isCancelling = value;
  };

  return (
    <Modal visible={isCancelling} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <LinearBg
          style={styles.modal}
          colors={[colors.backgroundSoft, colors.background]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* Header */}
          {/* <View style={styles.header}> */}
          <Text style={styles.title}>Cancel Ride?</Text>

          <Text style={styles.message}>
            Are you sure you want to cancel this ride?
          </Text>

          <TextInput
            value={cancellationReason}
            onChangeText={setCancellationReason}
            placeholder="Why are you cancelling?"
            multiline
            style={styles.input}
          />

          <View style={styles.actions}>
            <ActionButton
              title="Keep Ride"
              onPress={() => setIsCancelling(false)}
              style={styles.actionButton}
              textStyle={styles.actionButtonText}
            />

            <ActionButton
              title="Cancel Ride"
              onPress={() => cancelCurrentRide(cancellationReason)}
              style={styles.actionButton}
              textStyle={styles.actionButtonText}
            />
          </View>
          {/* </View> */}
        </LinearBg>
      </View>
    </Modal>
  );
};
