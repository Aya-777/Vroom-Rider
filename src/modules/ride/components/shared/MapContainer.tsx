import {
  Camera,
  Map,
  UserLocation,
  CameraRef,
} from '@maplibre/maplibre-react-native';
import { createStyles } from '../../styles/shared.styles';
import { useTheme } from '../../../../core/theme/useTheme';
import React from 'react';
import { View } from 'react-native';
import useMapViewModel from '../../viewmodels/useMapViewModel';
import { useRef } from 'react';
import { ICON_MAP } from '../../utils/iconMap';
export const MapContainer = () => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const vm = useMapViewModel();

  const MAPTILER_KEY = 'mfqv0iCS1dKFXcG8KrVN';
  const PinIcon = ICON_MAP['pin'];

  return (
    <View style={styles.mapContainer}>
      <Map
        style={styles.map}
        mapStyle={`https://api.maptiler.com/maps/streets-v2/style.json?key=${MAPTILER_KEY}`}
        ref={vm.mapRef}
        onRegionDidChange={
          vm.isPickingLocation
            ? vm.handleRegionDidChange
            : undefined
        }
      >
        <Camera
          ref={vm.cameraRef}
          initialViewState={{
            center: [31.2357, 30.0444],
            zoom: 15,
          }}
        />

        <UserLocation />
      </Map>

      {vm.isPickingLocation && (
        <View
          pointerEvents="none"
          style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: [
              { translateX: -16 },
              { translateY: -32 },
            ],
          }}
        >
          <PinIcon fill="#111111" />
        </View>
      )}
    </View>
  );
};