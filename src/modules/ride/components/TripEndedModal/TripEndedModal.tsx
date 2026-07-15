import React from 'react';
import { Modal, View, Text } from 'react-native';
import TripMetrics from './TripMetrics';
import PaymentSummary from './PaymentSummary';
import ActionButton from '../../../../shared/components/ActionButton';
import {styles} from '../../styles/tripEndedModal.styles'

type Props = {
  visible: boolean;
  onConfirmPayment: () => void;
};

export default function TripEndedModal({
  visible,
  onConfirmPayment,
}: Props) {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <View style={styles.modal}>
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

          <ActionButton
            title="Confirm Payment"
            onPress={onConfirmPayment}
          />
        </View>
      </View>
    </Modal>
  );
}