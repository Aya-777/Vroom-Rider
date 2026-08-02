import React from 'react';
import { View, Text, TouchableOpacity, Image } from 'react-native';
import { VEHICLE_DATA } from '../../constants/vehicleData';
import { useTheme } from '../../../../core/theme/useTheme';
import { createStyles } from '../../styles/extraDetails.styles';
import { useTranslation } from 'react-i18next';
import { Tiers } from '../../types/ride.types';

type Props = {
  selected: number;
  onSelect: (v: number) => void;
  vehicles?: Tiers[];
};

export default function VehicleSelector({
  selected,
  onSelect,
  vehicles,
}: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['common']);

  return (
    <View style={styles.vehicleRow}>
      {vehicles?.map(v => {
        const active = selected === v.tier_id;

        return (
          <TouchableOpacity
            key={v.tier_id}
            onPress={() => onSelect(v.tier_id)}
            style={[styles.vehicleCard, active && styles.activeVehicleCard]}
          >
            <Image
              source={{ uri: v.image ? v.image : '' }}
              style={styles.vehicleImage}
            />
            <Text
              style={[styles.vehicleText]}
            >
              {v.tier_name}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}
