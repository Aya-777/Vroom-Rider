import React from 'react';
import { View } from 'react-native';

export default function ProgressBar({ styles, colors }: any) {
  return (
    <View style={styles.progressContainer}>
      <View style={[styles.trackLine, { backgroundColor: colors.border }]} />
    </View>
  );
}