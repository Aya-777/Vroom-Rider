import {
  Camera,
  Map,
  UserLocation,
  GeoJSONSource,
  Layer,
} from '@maplibre/maplibre-react-native';
import { createStyles } from '../../styles/shared.styles';
import { useTheme } from '../../../../core/theme/useTheme';
import React, { useEffect } from 'react';
import { View } from 'react-native';
import useMapViewModel from '../../viewmodels/useMapViewModel';
import { useRef } from 'react';
import { ICON_MAP } from '../../utils/iconMap';

type MapContainerProps = {
  vm: ReturnType<typeof useMapViewModel>;
};

export const MapContainer = ({ vm }: MapContainerProps) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const MAPTILER_KEY = 'mfqv0iCS1dKFXcG8KrVN';
  const PinIcon = ICON_MAP['pin'];

  useEffect(() => {
  if (!vm.routeBounds) return;

  vm.cameraRef.current?.fitBounds(
    [
      vm.routeBounds.west,
      vm.routeBounds.south,
      vm.routeBounds.east,
      vm.routeBounds.north,
    ],
    {
      padding: {
        top: 120,
        right: 40,
        bottom: 350, // leave room for the bottom sheet
        left: 40,
      },
      duration: 1000,
    },
  );
}, [vm.routeBounds]);

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
        {vm.routeCoordinates.length > 0 && (
          <GeoJSONSource
            id="route"
            data={{
              type: 'Feature',
              geometry: {
                type: 'LineString',
                coordinates: vm.routeCoordinates,
              },
              properties: {},
            }}
          >
            <Layer
              id="route-line"
              type="line"
              style={{
                lineColor: '#3B82F6',
                lineWidth: 5,
                lineCap: 'round',
                lineJoin: 'round',
              }}
            />
          </GeoJSONSource>
        )}
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