import React, { useEffect, useState } from 'react';
import { View, StatusBar, Text } from 'react-native';
import { useTheme } from '../../../core/theme/useTheme';
import {BaseBottomSheet} from '../../../shared/components/BaseBottomSheet';
import Header from '../../../shared/components/SubHeader';
import { useDriverArrivedViewModel } from '../viewmodels/useDriverArrivedViewModel';
import { createStyles } from '../styles/driver.styles';
import DriverStatus from '../components/DriverFoundScreen/DriverStatus';
import DriverAvatar from '../components/DriverFoundScreen/DriverAvatar';
import CommunicationActions from '../components/DriverFoundScreen/CommunicationActions';
import CarDetailsCard from '../components/DriverFoundScreen/CarDetailsCard';
import ProgressBar from '../components/DriverFoundScreen/ProgressBar';
import { useTranslation } from 'react-i18next';
import { DriverPinEntry } from '../components/DriverArrivedScreen/DriverPinEntry';
import ReviewModal from '../../review/components/ReviewModal';

export default function DriverArrivedScreen() {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['driverArrived', 'common']);
  const { driver, handleBackPress, handleSubmit, handleCloseReviewModal } = useDriverArrivedViewModel();
  const [isReviewVisible, setIsReviewVisible] = useState(false);

  useEffect(() => {
    // Start the 3-second timer when this screen mounts
    const timer = setTimeout(() => {
      setIsReviewVisible(true);
    }, 3000);

    // Cleanup to prevent memory leaks if the user leaves before 3 seconds
    return () => clearTimeout(timer);
  }, []);

  return (
    <View style={styles.contentContainer}>
      <StatusBar translucent backgroundColor="transparent" />
      <Header title={t('trackYourTrip')} onBackPress={handleBackPress} />

      {/* Placeholder for Map - Ensure this exists behind the BottomSheet */}
      {/* <View style={styles.mapContainer} />  */}

      <BaseBottomSheet isVisible={true}>
        <DriverStatus text={t(driver.arrivedMessage)} styles={styles} />
        {/* 1. PIN Section */}
        <DriverPinEntry pin="1234" styles={styles} pinMessage={t(driver.pinMessage)} />

        {/* 2. Driver Info Row */}
        <View style={styles.driverInfoRow}>
          <DriverAvatar uri={driver.avatar} styles={styles} />
          <View>
            <Text style={styles.driverName}>{t(driver.name)}</Text>
            <CommunicationActions styles={styles} colors={colors} />
          </View>
        </View>

        {/* 3. Progress */}
        <ProgressBar styles={styles} colors={colors} />

        {/* 4. Car Details */}
        <CarDetailsCard driver={driver} styles={styles} colors={colors} />
      </BaseBottomSheet>

      <ReviewModal 
        visible={isReviewVisible} 
        onClose={() => {
          setIsReviewVisible(false)
          handleCloseReviewModal();
        }} 
        onSubmit={(rating, review) => {
          console.log(rating, review);
          setIsReviewVisible(false);
          handleSubmit();
        }}
      />
    </View>
  );
}