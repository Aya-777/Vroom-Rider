import React from 'react';
import { Text } from 'react-native';

export default function DriverStatus({ text, styles, colors }: any) {
  return (
    <Text style={[styles.statusText, { color: colors.textPrimary }]}>
      {text}
    </Text>
  );
}