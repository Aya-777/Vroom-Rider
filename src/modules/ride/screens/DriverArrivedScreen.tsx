import React from 'react';
import { View, StatusBar, Text } from 'react-native';
import { useTheme } from '../../../core/theme/useTheme';
import {BaseBottomSheet} from '../../../shared/components/BaseBottomSheet';
import Header from '../../../shared/components/SubHeader';
import { useDriverHereViewModel } from '../viewmodels/useDriverHereViewModel';
import { createStyles } from '../styles/driver.styles';
import DriverStatus from '../components/DriverFoundScreen/DriverStatus';
import DriverAvatar from '../components/DriverFoundScreen/DriverAvatar';
import CommunicationActions from '../components/DriverFoundScreen/CommunicationActions';
import CarDetailsCard from '../components/DriverFoundScreen/CarDetailsCard';
import ProgressBar from '../components/DriverFoundScreen/ProgressBar';
import { useTranslation } from 'react-i18next';
import { DriverPinEntry } from '../components/DriverArrivedScreen/DriverPinEntry';

export default function DriverArrivedScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['driverFound', 'common']);
  const { driver, handleBackPress } = useDriverHereViewModel();

  return (
    <View style={styles.contentContainer}>
      <StatusBar translucent backgroundColor="transparent" />
      <Header title={t('trackYourTrip')} onBackPress={handleBackPress} />

      {/* Placeholder for Map - Ensure this exists behind the BottomSheet */}
      {/* <View style={styles.mapContainer} />  */}

      <BaseBottomSheet isVisible={true} onClose={() => {}}>
        <DriverStatus text={driver.statusMessage} styles={styles} />
        {/* 1. PIN Section */}
        <DriverPinEntry pin="1234" styles={styles} />

        {/* 2. Driver Info Row */}
        <View style={styles.driverInfoRow}>
          <DriverAvatar uri={driver.avatar} styles={styles} />
          <View>
            <Text style={styles.driverName}>{driver.name}</Text>
            <CommunicationActions styles={styles} colors={colors} />
          </View>
        </View>

        {/* 3. Progress */}
        <ProgressBar styles={styles} colors={colors} />

        {/* 4. Car Details */}
        <CarDetailsCard driver={driver} styles={styles} colors={colors} />
      </BaseBottomSheet>
    </View>
  );
}