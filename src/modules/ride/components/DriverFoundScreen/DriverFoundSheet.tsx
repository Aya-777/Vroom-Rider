import React, { useEffect, useMemo } from 'react';
import { useTheme } from '../../../../core/theme/useTheme';
import { BaseBottomSheet } from '../../../../shared/components/BaseBottomSheet';
import { useDriverFoundViewModel } from '../../viewmodels/useDriverFoundViewModel';
import { createStyles } from '../../styles/driver.styles';
import DriverStatus from './DriverStatus';
import DriverAvatar from './DriverAvatar';
import CommunicationActions from './CommunicationActions';
import CarDetailsCard from './CarDetailsCard';
import ProgressBar from './ProgressBar';
import { useTranslation } from 'react-i18next';
import ActionButton from '../../../../shared/components/ActionButton';
import { Alert } from 'react-native';
import { CancelModal } from '../shared/CancelModal';
import { SharedValue } from 'react-native-reanimated';

type Props = {
  onDriverFound: () => void;
  onCancelPress: (reason: string) => void;
  isCancelling: boolean;
  setIsCancelling: (value: boolean) => void;
  onKeepRide: () => void;
  animatedPosition?: SharedValue<number>;
};

export default function DriverFoundSheet({
  onDriverFound,
  onCancelPress,
  isCancelling,
  setIsCancelling,
  onKeepRide,
  animatedPosition,
}: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['driverFound', 'common']);

  const { driver } = useDriverFoundViewModel();

  const snapPoints = useMemo(() => ['30%', '70%'], []);

  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     onDriverFound();
  //   }, 3000);
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <>
      <BaseBottomSheet isVisible={true} snapPoints={snapPoints} index={1} animatedPosition={animatedPosition}>
        <DriverStatus text={t(driver.onTheWayMessage)} styles={styles} />

        <DriverAvatar uri={driver.avatar} styles={styles} />

        <DriverStatus text={t(driver.name)} styles={styles} />

        <CommunicationActions styles={styles} colors={colors} />

        <ProgressBar styles={styles} colors={colors} />

        <CarDetailsCard driver={driver} styles={styles} colors={colors} />

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
