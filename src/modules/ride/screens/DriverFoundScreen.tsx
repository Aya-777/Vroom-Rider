/* eslint-disable @typescript-eslint/no-unused-vars */
import React from 'react';
import { View } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../../../core/theme/useTheme';
import BottomSheetCard from '../../../shared/components/ride/BottomSheetCard';
import Header from '../../../shared/components/ride/Header';

import { useRideConfirmationViewModel } from '../viewmodels/useRideConfirmationViewModel';
import { createStyles } from '../styles/DriverFound.styles';

import DriverStatus from '../components/DriverStatus';
import DriverAvatar from '../components/DriverAvatar';
import CommunicationActions from '../components/CommunicationActions';
import CarDetailsCard from '../components/CarDetailsCard';
import ProgressBar from '../components/ProgressBar';

export default function RideConfirmationScreen() {
  const { colors, mode } = useTheme();
  const styles = createStyles(colors);
  const navigation = useNavigation<any>();

  const { driver } = useRideConfirmationViewModel();

  return (
    <View style={styles.contentContainer}>
      <Header title="Track your trip" onBackPress={() => navigation.goBack()} />

      <BottomSheetCard>
        <DriverStatus text={driver.statusMessage} styles={styles} colors={colors} />

        <DriverAvatar uri={driver.avatar} styles={styles} />

        <DriverStatus text={driver.name} styles={styles} colors={colors} />

        <CommunicationActions styles={styles} colors={colors} />

        <ProgressBar styles={styles} colors={colors} />

        <CarDetailsCard driver={driver} styles={styles} colors={colors} />
      </BottomSheetCard>
    </View>
  );
}