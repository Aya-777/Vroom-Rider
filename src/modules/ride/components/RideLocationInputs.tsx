import React from 'react';
import {
  View,
} from 'react-native';
import Input from '../../../shared/components/Input';

import { useTheme } from '../../../core/theme/useTheme';

import { createStyles } from '../styles/selectRide.styles';

type Props = {
  fromLocation: string;
  toLocation: string;
  onChangeFrom: (text: string) => void;
  onChangeTo: (text: string) => void;
  errors: {
    fromLocation?: string;
    toLocation?: string;
  };
};

export default function RideLocationInputs({
  fromLocation,
  toLocation,
  onChangeFrom,
  onChangeTo,
  errors
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
        <Input
          style={styles.input}
          placeholder="From"
          placeholderTextColor={colors.textMuted}
          value={fromLocation}
          onChangeText={onChangeFrom}
          error={errors.fromLocation}
        />

        <View style={styles.divider} />

        <Input
          style={styles.input}
          placeholder="To?"
          placeholderTextColor={colors.textMuted}
          value={toLocation}
          onChangeText={onChangeTo}
          error={errors.toLocation}
        />
      </View>
    </View>
  );
}