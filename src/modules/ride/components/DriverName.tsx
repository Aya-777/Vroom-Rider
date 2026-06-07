import React from 'react';
import { Text } from 'react-native';
import type { ThemeColors } from '../../../core/theme/theme.types';
import type { DriverFoundStyles } from '../styles/DriverFound.styles';

type DriverNameProps = {
  name: string;
  styles: DriverFoundStyles;
  colors: ThemeColors;
};

export default function DriverName({
  name,
  styles,
}: DriverNameProps) {
  return (
    <Text style={styles.driverName}>
      {name}
    </Text>
  );
}