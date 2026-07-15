import React from 'react';
import { View, Text } from 'react-native';
import Input from '../../../../shared/components/Input';
import {useTripStartedViewModel} from '../../viewmodels/useTripStartedViewModel'
import { useTheme } from '../../../../core/theme/useTheme';
import { createStyles } from '../../styles/trip.styles';

export const TripSummaryGrid = () => {

  const { colors } = useTheme();
  const styles = createStyles(colors);
  const vm = useTripStartedViewModel();

  return(
  <View style={styles.gridContainer}>
    {/* Left Column */}
    <View style={styles.column}>
      {['Estimated', 'Base Fare', 'Distance'].map((label) => (
        <View key={label} style={styles.metricCard}>
          <Text style={styles.metricLabel}>{label}</Text>
          <Text style={styles.metricValue}>...</Text>
        </View>
      ))}
    </View>

    {/* Vertical Divider */}
    <View style={styles.verticalDivider} />

    {/* Right Column */}
    <View style={styles.column}>
      <Text style={styles.tipLabel}>Add a tip?</Text>

      <Input
      value={vm.tip}
      placeholder="0.00"
      onChangeText={vm.setTip}
      inputBoxStyle={styles.tipInput}
      inputStyle={styles.tipValue}
      
    />

      <Text style={styles.delayLabel}>Potential Delay :</Text>

      <View style={styles.delayBox}>
        <Text style={styles.delayValue}>+$2.50</Text>
      </View>
    </View>
  </View>
  )
};