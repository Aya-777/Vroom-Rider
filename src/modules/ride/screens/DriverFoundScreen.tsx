import React from 'react';
import { View, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../../../core/theme/useTheme';
import { HomeStackScreenProps } from '../../../navigation/main/home/homeTypes';
import BottomSheetCard from '../../../shared/components/ride/BottomSheetCard';
import Header from '../../../shared/components/ride/Header';

import { useDriverHereViewModel } from '../viewmodels/useDriverHereViewModel';
import { createStyles } from '../styles/DriverFound.styles';

import DriverStatus from '../components/DriverFoundScreen/DriverStatus';
import DriverAvatar from '../components/DriverFoundScreen/DriverAvatar';
import CommunicationActions from '../components/DriverFoundScreen/CommunicationActions';
import CarDetailsCard from '../components/DriverFoundScreen/CarDetailsCard';
import ProgressBar from '../components/DriverFoundScreen/ProgressBar';

export default function DriverFoundScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const navigation = useNavigation<HomeStackScreenProps<'DriverFound'>['navigation']>();

  const { driver } = useDriverHereViewModel();

  return (
    <View style={styles.contentContainer}>
      <StatusBar translucent backgroundColor="transparent" />
      <Header title="Track your trip" onBackPress={() => navigation.goBack()} />

      <BottomSheetCard>
        <DriverStatus text={driver.statusMessage} styles={styles} />

        <DriverAvatar uri={driver.avatar} styles={styles} />

        <DriverStatus text={driver.name} styles={styles} />

        <CommunicationActions styles={styles} colors={colors} />

        <ProgressBar styles={styles} colors={colors} />

        <CarDetailsCard driver={driver} styles={styles} colors={colors} />
      </BottomSheetCard>
    </View>
  );
}