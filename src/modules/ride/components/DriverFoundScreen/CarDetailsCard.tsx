import React from 'react';
import { View, Text } from 'react-native';
import type { Car, Driver } from '../../types/ride.types';
import type { ThemeColors } from '../../../../core/theme/theme.types';
import type { createStyles } from '../../styles/driver.styles';
import CarIcon from '../../../../assets/svg/common/ride.svg';
import { useTranslation } from 'react-i18next';

type CarDetailsCardProps = {
  car: Car | null;
  styles: ReturnType<typeof createStyles>;
  colors: ThemeColors;
};

export default function CarDetailsCard({car, styles, colors }: CarDetailsCardProps) {
  const {t} = useTranslation('driverFound');
  return (
    <View style={styles.carDetailsCard}>
      <View style={styles.carIconContainer}>
        <CarIcon fill={colors.primary} />
      </View>

      <View style={styles.carInfoTextDetails}>
        <Text style={styles.carDetailsTitle}>
          {t('carDetails')}
        </Text>

        <Text style={styles.carModelText}>
          {car?.custom_model_name ?? car?.car_model}
        </Text>

        <View style={styles.plateRow}>
          <View style={styles.plateContainer}>
            <Text style={styles.plateText}>
              {car?.plate_number ?? car?.plate_number}
            </Text>
          </View>
          <Text style={styles.carColorText}>
            {car?.custom_color_name ?? car?.color}
          </Text>
        </View>
      </View>
    </View>
  );
}