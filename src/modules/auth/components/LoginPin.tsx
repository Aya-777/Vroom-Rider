import React from 'react';
import { View, StyleSheet } from 'react-native';
import MaskedView from '@react-native-masked-view/masked-view';

import { PinMask } from '../../../shared/components/PinShape';

const LoginPin = ({ children }: { children: React.ReactNode }) => {
  return (
    <View style={styles.wrapper}>
      <MaskedView style={styles.flex} maskElement={<PinMask />}>
        
        <View style={styles.background} />

        <View style={styles.content}>
          {children}
        </View>

      </MaskedView>
    </View>
  );
};

export default LoginPin;

const styles = StyleSheet.create({
  wrapper: {
    width: '90%',
    maxWidth: 348,
    aspectRatio: 348 / 520,
    overflow: 'hidden',
  },

  background: {
    ...StyleSheet.absoluteFill,
    backgroundColor: 'rgba(255,255,255,0.55)',
  },

  content: {
    flex: 1,
    paddingTop: 35,
    paddingHorizontal: 24,
  },

  flex: {
    flex: 1,
  },
});