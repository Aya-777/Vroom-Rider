import React from 'react';
import { View, Text } from 'react-native';
import CarIcon from '../../../assets/svg/car.svg';

export default function CarDetailsCard({ driver, styles, colors }: any) {
  return (
    <View style={[styles.carDetailsCard, { backgroundColor: colors.primary }]}>
      <View style={styles.carIconContainer}>
        <CarIcon fill={colors.surface} />
      </View>

      <View style={styles.carInfoTextDetails}>
        <Text style={[styles.carDetailsTitle, { color: colors.surface }]}>
          CAR DETAILS
        </Text>

        <Text style={[styles.carModelText, { color: colors.surface }]}>
          {driver.car.model}
        </Text>

        <View style={styles.plateRow}>
          <Text style={[styles.carColorText, { color: colors.surface }]}>
            {driver.car.color}
          </Text>
        </View>
      </View>
    </View>
  );
}