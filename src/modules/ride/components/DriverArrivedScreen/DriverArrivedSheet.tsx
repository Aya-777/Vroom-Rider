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
import { SharedValue } from 'react-native-reanimated';

type Props = {
  onCancelPress: (reason: string) => void;
  isCancelling: boolean;
  setIsCancelling: (value: boolean) => void;
  onKeepRide: () => void;
  animatedPosition?: SharedValue<number>;
};

export default function DriverArrivedSheet({
  onCancelPress,
  isCancelling,
  setIsCancelling,
  onKeepRide,
  animatedPosition,
}: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['driverArrived', 'common']);
  const { currentRide, driver } = useDriverArrivedViewModel();

  const snapPoints = useMemo(() => ['30%', '70%'], []);

  return (
    <>
      <BaseBottomSheet
        isVisible={true}
        snapPoints={snapPoints}
        index={1}
        animatedPosition={animatedPosition}
      >
        <DriverStatus text={t('arrivedMessage')} styles={styles} />
        {/* 1. PIN Section */}
        <DriverPinEntry
          pin={currentRide?.pin ?? ""}
          styles={styles}
          pinMessage={t('pinMessage')}
        />

        {/* 2. Driver Info Row */}
        <View style={styles.driverInfoRow}>
          <DriverAvatar
            uri={currentRide?.driver?.profile_image || ''}
            styles={styles}
          />
          <View>
            <Text style={styles.driverName}>
              {currentRide?.driver?.first_name} {currentRide?.driver?.last_name}
            </Text>
            <CommunicationActions driver_number={currentRide?.driver?.phone_number ?? ''} styles={styles} colors={colors} />
          </View>
        </View>

        {/* 3. Progress */}
        <ProgressBar styles={styles} colors={colors} />

        {/* 4. Car Details */}
        <CarDetailsCard
          car={currentRide?.vehicle ?? driver.car}
          styles={styles}
          colors={colors}
        />

        <ActionButton
          title={t('common:cancel')}
          onPress={() => setIsCancelling(true)}
          style={styles.canelButton}
          textStyle={styles.cancelButtonText}
        />
      </BaseBottomSheet>

      {isCancelling && (
        <CancelModal
          cancelCurrentRide={onCancelPress}
          keepRide={onKeepRide}
          isCancelling={isCancelling}
        />
      )}
    </>
  );
}
