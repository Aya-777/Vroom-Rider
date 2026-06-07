import React from 'react';
import {
  View,
  TextInput,
} from 'react-native';

import { useTheme } from '../../../../core/theme/useTheme';

import { createStyles } from '../../styles/selectRide.styles';

type Props = {
  fromLocation: string;
  toLocation: string;
  onChangeFrom: (text: string) => void;
  onChangeTo: (text: string) => void;
};

export default function RideLocationInputs({
  fromLocation,
  toLocation,
  onChangeFrom,
  onChangeTo,
}: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.inputCard}>
      <View style={styles.inputTimeline}>
        <View style={styles.timelineDot} />

        <View style={styles.timelineLine} />

        <View style={styles.timelineDot} />
      </View>

      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="From"
          placeholderTextColor={colors.textMuted}
          value={fromLocation}
          onChangeText={onChangeFrom}
        />

        <View style={styles.divider} />

        <TextInput
          style={styles.input}
          placeholder="To?"
          placeholderTextColor={colors.textMuted}
          value={toLocation}
          onChangeText={onChangeTo}
        />
      </View>
    </View>
  );
}