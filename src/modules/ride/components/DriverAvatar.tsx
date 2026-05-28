import React from 'react';
import { View, Image } from 'react-native';

export default function DriverAvatar({ uri, styles }: any) {
  return (
    <View style={styles.avatarContainer}>
      <Image source={{ uri }} style={styles.avatarImage} />
    </View>
  );
}