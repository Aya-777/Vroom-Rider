import React, { useEffect, useMemo } from 'react';
import { View, StatusBar, Text } from 'react-native';
import { useTheme } from '../../../../core/theme/useTheme';
import { BaseBottomSheet } from '../../../../shared/components/BaseBottomSheet';
import { createStyles } from '../../styles/trip.styles';
import { useTranslation } from 'react-i18next';
import { TripSummaryGrid } from '../../components/TripStartedScreen/TripSummaryGrid';
import { DriverInfoCard } from '../../components/TripStartedScreen/DriverInfoCard';
import { useTripStartedViewModel } from '../../viewmodels/useTripStartedViewModel';
import ReviewModal from '../../../review/components/ReviewModal';
import TripEndedModal from '../TripEndedModal/TripEndedModal';
import { SharedValue } from 'react-native-reanimated';

type Props = {
  animatedPosition?: SharedValue<number>;
};

export default function TripStartedScreen({
  animatedPosition,
}: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['rideStarted', 'common']);

  const vm = useTripStartedViewModel();

  const snapPoints = useMemo(() => ['30%', '70%'], []);

  return (
    <>
      <BaseBottomSheet
        isVisible={true}
        snapPoints={snapPoints}
        index={1}
        animatedPosition={animatedPosition}
      >
        <StatusBar translucent backgroundColor="transparent" />
        <Text style={styles.tripStartedMessage}>{t('tripStarted')}</Text>
        {/* Driver Card */}
        <DriverInfoCard
          name={
            vm.currentRide?.driver?.first_name +
            ' ' +
            vm.currentRide?.driver?.last_name
          }
          rating={vm.currentRide?.driver?.rating}
          car={
            vm.currentRide?.vehicle?.car_model ??
            vm.currentRide?.vehicle?.custom_model_name
          }
          plate={vm.currentRide?.vehicle?.plate_number}
          styles={styles}
          colors={colors}
        />

        {/* Title */}
        <Text style={styles.summaryTitle}>{t('preTripSummary')}</Text>
        <Text style={styles.disclaimerText}>
          {t('common:date')}: {new Date().toLocaleDateString()}
        </Text>
        {/* Summary Grid */}
        <TripSummaryGrid />

        {/* Subtotal & Payment */}
        <View style={styles.footerRow}>
          <View>
            <Text style={styles.subtotalLabel}>{t('subtotal')}</Text>
            <Text style={styles.subtotalValue}>
              <Text style={styles.subtotalValue}>
                {(
                  Number(vm.currentRide?.estimated_price ?? 0) + vm.filtersTotal
                ).toFixed(2)}$
              </Text>
            </Text>
          </View>
          <View style={styles.payment_method}>
            <Text style={styles.paymentText}>
              {vm.currentRide?.payment_method}
            </Text>
          </View>
        </View>
        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerText}>{t('finalPriceDisclaimer')}</Text>
        </View>
      </BaseBottomSheet>
    </>
  );
}
