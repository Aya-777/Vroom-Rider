import React from 'react';
import { View, Text } from 'react-native';
import Input from '../../../../shared/components/Input';
import { createStyles } from '../../styles/tripEndedModal.styles';
import { useTheme } from '../../../../core/theme/useTheme';
import { useTripStartedViewModel } from '../../viewmodels/useTripStartedViewModel';

export default function PaymentSummary() {
  const vm = useTripStartedViewModel();

  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.paymentColumn}>
      <View style={styles.metricRow}>
        <Text style={styles.label} adjustsFontSizeToFit={true}>
          Add a tip?
        </Text>
        <View>
          <Input
            value={vm.tip}
            inputBoxStyle={styles.tipInput}
            inputStyle={styles.tipText}
            keyboardType="decimal-pad"
            onChangeText={vm.setTip}
          />
        </View>
      </View>

      <View style={styles.metricRow}>
        <Text style={styles.label} adjustsFontSizeToFit={true}>
          Delay:
        </Text>
        <Text style={styles.valueText} adjustsFontSizeToFit={true}>
          $2.50
        </Text>
      </View>
    </View>
  );
}
