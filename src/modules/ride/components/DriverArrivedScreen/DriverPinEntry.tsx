import React from 'react';
import { View, Text } from 'react-native';

export const DriverPinEntry = ({ pin, styles }: { pin: string, styles: any }) => (
  <View style={styles.pinContainer}>
    <Text style={styles.pinSubMessage}>Please enter the PIN.</Text>
    <View style={styles.pinCodeBox}>
      {pin.split('').map((digit, i) => (
        <Text key={i} style={styles.pinDigit}>{digit}</Text>
      ))}
    </View>
  </View>
);