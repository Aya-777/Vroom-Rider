// src/features/trip/components/TripSummaryGrid.tsx
import React from 'react';
import { View, Text } from 'react-native';

export const TripSummaryGrid = ({ styles }: { styles: any }) => (
  <View style={styles.gridContainer}>
    <View style={styles.column}>
      {['Estimated', 'Base Fare', 'Distance'].map((label) => (
        <View key={label} style={styles.metricCard}>
          <Text style={styles.metricLabel}>{label}</Text>
          <Text style={styles.metricValue}>...</Text> {/* Pass data here */}
        </View>
      ))}
    </View>
    <View style={styles.column}>
      <Text style={styles.tipLabel}>Add a tip?</Text>
      <View style={styles.tipInput}>
        <Text style={styles.tipValue}>$3.00</Text>
      </View>
      <Text style={styles.delayLabel}>Potential Delay :</Text>
      <View style={styles.delayBox}>
        <Text style={styles.delayValue}>+$2.50</Text>
      </View>
    </View>
  </View>
);