import React from 'react';
import { ViewAnnotation } from '@maplibre/maplibre-react-native';
import LottieView from 'lottie-react-native';
import { StyleSheet, View } from 'react-native';
import { Marker } from '@maplibre/maplibre-react-native';

import BreathingDot from './BreathingDot';

type Props = {
  coordinate?: [number, number] | null;
  searching: boolean;
};

const UserLocationMarker = ({ coordinate, searching }: Props) => {
  return (
    <Marker lngLat={[coordinate?.[0] ?? 0, coordinate?.[1] ?? 0]}>
      <View style={styles.container}>
        {searching && (
          <LottieView
            source={require('../../../../../assets/animations/mapPulse.json')}
            autoPlay
            loop
            style={styles.lottie}
          />
        )}

        <BreathingDot />
      </View>
    </Marker>
  );
};

export default UserLocationMarker;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  lottie: {
    position: 'absolute',
    width: 500,
    height: 500,
  },
});
