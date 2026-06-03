import React from 'react';
import { Text } from 'react-native';

export default function DriverName({
  name,
  styles,
  colors,
}: any) {
  return (
    <Text
      style={[
        styles.driverName,
        { color: colors.textPrimary },
      ]}
    >
      {name}
    </Text>
  );
}