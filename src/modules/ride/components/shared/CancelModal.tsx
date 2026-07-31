import React, { useState } from 'react';
import { View, Text, Modal, TextInput } from 'react-native';
import { createStyles } from '../../styles/shared.styles';
import { useTheme } from '../../../../core/theme/useTheme';
import { useTranslation } from 'react-i18next';
import LinearBg from '../../../../shared/components/LinearBg';
import ActionButton from '../../../../shared/components/ActionButton';
import Input from '../../../../shared/components/Input';

type Props = {
  cancelCurrentRide: (reason: string) => void;
  keepRide: () => void;
  isCancelling: boolean;
};

export const CancelModal = ({ cancelCurrentRide, isCancelling, keepRide }: Props) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['selectRide', 'common']);
  const [cancellationReason, setCancellationReason] = useState('');

  return (
    <Modal visible={isCancelling} transparent={true} animationType="fade">
      <View style={styles.overlay}>
        <LinearBg
          colors={[colors.backgroundSoft, colors.background]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.8 }}
          style={styles.modal}
      >
          {/* Header */}
          <Text style={styles.title}>Cancel Ride?</Text>
            <View style={styles.Divider} />
    

          <Text style={styles.message}>
            Are you sure you want to cancel this ride?
          </Text>

          <Input
            value={cancellationReason}
            onChangeText={setCancellationReason}
            placeholder="Why are you cancelling?"
            multiline
            numberOfLines={5}
            maxLength={500}
            containerStyle={styles.cancelInputContainer}
            inputBoxStyle={styles.cancelInputBox}
            inputStyle={styles.cancelInput}
          />

          <View style={styles.actions}>
            <ActionButton
              title="Cancel Ride"
              onPress={() => cancelCurrentRide(cancellationReason)}
              style={styles.actionButton}
              textStyle={styles.actionButtonText}
            />

            <ActionButton
              title="Keep Ride"
              onPress={keepRide}
              style={styles.actionButton}
              textStyle={styles.actionButtonText}
            />
          </View>
        </LinearBg>
      </View>
    </Modal>
  );
};
