import React from 'react';
import { Modal, View, Text } from 'react-native';
import TripMetrics from './TripMetrics';
import PaymentSummary from './PaymentSummary';
import ActionButton from '../../../../shared/components/ActionButton';
import { createStyles } from '../../styles/tripEndedModal.styles';
import { useTheme } from '../../../../core/theme/useTheme';
import LinearBg from '../../../../shared/components/LinearBg';

type Props = {
  visible: boolean;
  onConfirmPayment: () => void;
};

export default function TripEndedModal({ visible, onConfirmPayment }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <LinearBg
          colors={[colors.backgroundSoft, colors.background]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.8 }}
          style={styles.modalContainer}
        >
          <Text style={styles.title}>Your trip has ended!</Text>
          <Text style={styles.subtitle}>Thank you for riding with us</Text>

          <View style={styles.divider} />

          <Text style={styles.total}>25.50$</Text>

          <View style={styles.divider} />

          <View style={styles.content}>
            <TripMetrics />

            <View style={styles.verticalDivider} />

            <PaymentSummary />
          </View>

          <View style={styles.divider} />

          <ActionButton title="Confirm Payment" onPress={onConfirmPayment} />
        </LinearBg>
      </View>
    </Modal>
  );
}
