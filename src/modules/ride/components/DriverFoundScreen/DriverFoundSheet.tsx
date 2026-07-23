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

type Props = {
  onDriverFound: () => void;
  onCancelPress: () => void;
};

export default function DriverFoundSheet({
  onDriverFound,
  onCancelPress,
}: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['driverFound', 'common']);

  const { driver } = useDriverFoundViewModel();

  const snapPoints = useMemo(() => ['30%', '70%'], []);

  useEffect(() => {
    const timer = setTimeout(() => {
      onDriverFound();
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleCancelPress = () => {
    Alert.alert('Cancel Ride', 'Are you sure you want to cancel?', [
      {
        text: 'No',
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: onCancelPress,
      },
    ]);
  };

  return (
    <BaseBottomSheet isVisible={true} snapPoints={snapPoints} index={1}>
      <DriverStatus text={t(driver.onTheWayMessage)} styles={styles} />

      <DriverAvatar uri={driver.avatar} styles={styles} />

      <DriverStatus text={t(driver.name)} styles={styles} />

      <CommunicationActions styles={styles} colors={colors} />

      <ProgressBar styles={styles} colors={colors} />

      <CarDetailsCard driver={driver} styles={styles} colors={colors} />

      <ActionButton
        title={t('common:cancel')}
        onPress={handleCancelPress}
        style={styles.canelButton}
      />
    </BaseBottomSheet>
  );
}
