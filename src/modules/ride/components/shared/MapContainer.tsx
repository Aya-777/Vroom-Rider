import { Camera, Map, UserLocation } from '@maplibre/maplibre-react-native';
import { createStyles } from '../../styles/shared.styles';
import { useTheme } from '../../../../core/theme/useTheme';
import React from 'react';
import { View } from 'react-native';

export const MapContainer = () => {

  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.mapContainer}>
      <Map
        style={styles.map}
        mapStyle="https://api.maptiler.com/maps/streets-v2/style.json?key=get_your_own_D6rA4zTHduk6KOKTXzGB"
      >
        <Camera
          center={[31.2357, 30.0444]}
          zoom={14}
          trackUserLocation="default" // Options: "default" | "heading" | "course"
        />

        <UserLocation />
      </Map>
    </View>
  );
};
