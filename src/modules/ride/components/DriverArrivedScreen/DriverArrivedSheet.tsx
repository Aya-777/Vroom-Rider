import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../../core/theme/useTheme';
import { BaseBottomSheet } from '../../../../shared/components/BaseBottomSheet';
import { useDriverArrivedViewModel } from '../../viewmodels/useDriverArrivedViewModel';
import { createStyles } from '../../styles/driver.styles';
import DriverStatus from '../../components/DriverFoundScreen/DriverStatus';
import DriverAvatar from '../../components/DriverFoundScreen/DriverAvatar';
import CommunicationActions from '../../components/DriverFoundScreen/CommunicationActions';
import CarDetailsCard from '../../components/DriverFoundScreen/CarDetailsCard';
import { DriverPinEntry } from '../DriverArrivedScreen/DriverPinEntry';
import ProgressBar from '../DriverFoundScreen/ProgressBar';
import ActionButton from '../../../../shared/components/ActionButton';
import { CancelModal } from '../shared/CancelModal';
import { useTranslation } from 'react-i18next';

type Props = { onCancelPress: () => void; onKeepRide: () => void; isCancelling: boolean; setIsCancelling: (value: boolean) => void; animatedPosition?: any };

export default function DriverArrivedSheet({ onCancelPress, onKeepRide, isCancelling, setIsCancelling, animatedPosition }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['driverArrived', 'common']);
  const { currentRide, driver, canResend, resendPin, resendPinTimer } = useDriverArrivedViewModel();
  const snapPoints = useMemo(() => ['30%', '70%'], []);
  return (
    <>
      <BaseBottomSheet isVisible={true} snapPoints={snapPoints} index={1} animatedPosition={animatedPosition}>
        <DriverStatus text={t('arrivedMessage')} styles={styles} />
        <DriverPinEntry pin={currentRide?.pin ?? ''} styles={styles} pinMessage={t('pinMessage')} />
        <TouchableOpacity disabled={!canResend} onPress={resendPin} style={[styles.resendPinButton, !canResend && styles.resendPinButtonDisabled]}>
          <Text style={styles.resendPinText}>{canResend ? 'Resend PIN' : 'Wait ' + resendPinTimer}</Text>
        </TouchableOpacity>
        <View style={styles.driverInfoRow}>
          <DriverAvatar uri={currentRide?.driver?.profile_image || ''} styles={styles} />
          <View>
            <Text style={styles.driverName}>{currentRide?.driver?.first_name} {currentRide?.driver?.last_name}</Text>
            <CommunicationActions
              styles={styles}
              colors={colors}
              driver_number={currentRide?.driver?.phone_number ?? ''}
            />
          </View>
        </View>
        <ProgressBar styles={styles} colors={colors} />
        <CarDetailsCard car={currentRide?.vehicle ?? driver.car} styles={styles} colors={colors} />
        <ActionButton title={t('common:cancel')} onPress={() => setIsCancelling(true)} style={styles.canelButton} textStyle={styles.cancelButtonText} />
      </BaseBottomSheet>
      {isCancelling && <CancelModal cancelCurrentRide={onCancelPress} keepRide={onKeepRide} isCancelling={isCancelling} />}
    </>
  );
}
