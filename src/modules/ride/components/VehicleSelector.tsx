/* eslint-disable react-native/no-inline-styles */
import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { VEHICLE_DATA } from '../constants/vehicleData';
import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/extraDetails.styles';

type Props = {
  selected: string;
  onSelect: (v: string) => void;
};

export default function VehicleSelector({ selected, onSelect }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.vehicleRow}>
      {VEHICLE_DATA.map(v => {
        const active = selected === v.type_name;

        return (
          <TouchableOpacity
            key={v.id}
            onPress={() => onSelect(v.type_name)}
            style={[
              styles.vehicleCard,
              {
                borderColor: active ? colors.primary : 'transparent',
              },
            ]}
          >
            <Image source={v.image} style={styles.vehicleImage} />

            <Text
              style={[
                styles.vehicleText,
                {
                  color: active ? colors.primary : colors.textMuted,
                },
              ]}
            >
              {v.type_name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}