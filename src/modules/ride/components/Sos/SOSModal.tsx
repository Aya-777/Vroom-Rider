import React, { useEffect, useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { useTheme } from '../../../../core/theme/useTheme';
import { createStyles } from '../../styles/SOSModal.styles';

interface SOSModalProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => Promise<boolean>;
}

export default function SOSModal({
  visible,
  onCancel,
  onConfirm,
}: SOSModalProps) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const [isSent, setIsSent] = useState(false);
  const [isSending, setIsSending] = useState(false);

  useEffect(() => {
    if (!visible) {
      setIsSent(false);
      setIsSending(false);
    }
  }, [visible]);

  const handleConfirm = async () => {
    if (isSending) return;

    setIsSending(true);

    try {
      const success = await onConfirm();

      if (success) {
        setIsSent(true);
      }
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <View style={styles.container}>

          {isSent ? (
            <>
              {/* Success icon */}
              <View style={styles.successIconContainer}>
                <Text style={styles.successIcon}>✓</Text>
              </View>

              <Text style={styles.title}>
                SOS Sent
              </Text>

              <Text style={styles.message}>
                Sos message sent, Help will be there soon!
              </Text>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onCancel}
                activeOpacity={0.7}
              >
                <Text style={styles.cancelText}>
                  Close
                </Text>
              </TouchableOpacity>
            </>
          ) : (
            <>
              <Text style={styles.icon}>⚠️</Text>

              <Text style={styles.title}>
                Are you Safe?
              </Text>

              <Text style={styles.message}>
                Do you want to send an emergency request?
              </Text>

              <TouchableOpacity
                style={styles.sosButton}
                onPress={handleConfirm}
                activeOpacity={0.8}
                disabled={isSending}
              >
                <Text style={styles.sosButtonText}>
                  {isSending ? 'SENDING...' : 'SEND SOS'}
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.cancelButton}
                onPress={onCancel}
                activeOpacity={0.7}
                disabled={isSending}
              >
                <Text style={styles.cancelText}>
                  Cancel
                </Text>
              </TouchableOpacity>
            </>
          )}

        </View>
      </View>
    </Modal>
  );
}