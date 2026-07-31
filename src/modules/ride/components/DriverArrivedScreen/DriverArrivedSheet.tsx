import React, { useEffect, useMemo } from 'react';
import { View, Text, Alert } from 'react-native';
import { useTheme } from '../../../../core/theme/useTheme';
import { BaseBottomSheet } from '../../../../shared/components/BaseBottomSheet';
import { useDriverArrivedViewModel } from '../../viewmodels/useDriverArrivedViewModel';
import { createStyles } from '../../styles/driver.styles';
import DriverStatus from '../../components/DriverFoundScreen/DriverStatus';
import DriverAvatar from '../../components/DriverFoundScreen/DriverAvatar';
import CommunicationActions from '../../components/DriverFoundScreen/CommunicationActions';
import CarDetailsCard from '../../components/DriverFoundScreen/CarDetailsCard';
import ProgressBar from '../../components/DriverFoundScreen/ProgressBar';
import { useTranslation } from 'react-i18next';
import { DriverPinEntry } from '../../components/DriverArrivedScreen/DriverPinEntry';
import ActionButton from '../../../../shared/components/ActionButton';
import { CancelModal } from '../shared/CancelModal';

type Props = {
  onTripStarted: () => void;
  onCancelPress: (reason: string) => void;
  isCancelling: boolean;
  setIsCancelling: (value: boolean) => void;
};

export default function DriverArrivedSheet({
  onTripStarted,
  onCancelPress,
  isCancelling,
  setIsCancelling,
}: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['driverArrived', 'common']);
  const { driver } = useDriverArrivedViewModel();

  const snapPoints = useMemo(() => ['30%', '70%'], []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onTripStarted();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <BaseBottomSheet isVisible={true} snapPoints={snapPoints} index={1}>
        <DriverStatus text={t(driver.arrivedMessage)} styles={styles} />
        {/* 1. PIN Section */}
        <DriverPinEntry
          pin="1234"
          styles={styles}
          pinMessage={t(driver.pinMessage)}
        />

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

        <ActionButton
          title={t('common:cancel')}
          onPress={() => setIsCancelling(false)}
          style={styles.canelButton}
          textStyle={styles.cancelButtonText}
        />
      </BaseBottomSheet>

      {isCancelling && (
        <CancelModal
          cancelCurrentRide={onCancelPress}
          isCancelling={isCancelling}
        />
      )}
    </>
  );
}
