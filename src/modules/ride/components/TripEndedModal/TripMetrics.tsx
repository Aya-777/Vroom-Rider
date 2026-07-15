import React from 'react';
import { View, Text } from 'react-native';
import { createStyles } from '../../styles/tripEndedModal.styles';
import { useTheme } from '../../../../core/theme/useTheme';

const metrics = [
  { label: 'Estimated Price', value: '0' },
  { label: 'Accept animals', value: '0' },
  { label: 'No smoking', value: '0' },
  { label: 'Air conditioner', value: '0' },
];

export default function TripMetrics() {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.metricsColumn}>
      {metrics.map((item, index) => (
        <View key={index} style={styles.metricRow}>
          <Text style={styles.metricLabel} adjustsFontSizeToFit={true}>
            {item.label}:
          </Text>

          <Text style={styles.valueText}>{item.value}</Text>
        </View>
      ))}
    </View>
  );
}
