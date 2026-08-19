import React, { useMemo } from 'react';
import { Modal, View, Text } from 'react-native';
import TripMetrics from './TripMetrics';
import PaymentSummary from './PaymentSummary';
import ActionButton from '../../../../shared/components/ActionButton';
import { createStyles } from '../../styles/tripEndedModal.styles';
import { useTheme } from '../../../../core/theme/useTheme';
import LinearBg from '../../../../shared/components/LinearBg';
import { useTranslation } from 'react-i18next';
import { CurrentRide, RideFilter } from '../../types/ride.types';

type Props = {
  visible: boolean;
  onConfirmPayment: () => void;
  currentRide: CurrentRide | null;
  filters: RideFilter[];
};

export default function TripEndedModal({ currentRide, visible, onConfirmPayment, filters }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['tripEnded', 'common']);
  
  const selectedFilters = filters.filter(filter =>
    currentRide?.preference_ids?.includes(Number(filter.id))
  );
  
  const filtersTotal = useMemo(() => {
    return filters
      .filter(filter =>
        currentRide?.preference_ids?.includes(Number(filter.id))
      )
      .reduce(
        (sum, filter) => sum + Number(filter.extra_fee),
        0,
      );
  }, [filters, currentRide?.preference_ids]);


  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <LinearBg
          colors={[colors.backgroundSoft, colors.background]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0.8 }}
          style={styles.modalContainer}
        >
          <Text style={styles.title}>{t('tripEnded.title')}</Text>
          <Text style={styles.subtitle}>{t('tripEnded.subtitle')}</Text>

          <View style={styles.divider} />

          <Text style={styles.total}>{currentRide?.actual_price ?? 
            (Number(currentRide?.estimated_price ?? 0) + filtersTotal)}$</Text>

          <View style={styles.divider} />

          <View style={styles.content}>
            <TripMetrics estimatedPrice={currentRide?.estimated_price ?? currentRide?.actual_price ?? '0'} filters={selectedFilters}/>

            <View style={styles.verticalDivider} />

            <PaymentSummary />
          </View>

          <View style={styles.divider} />

          <ActionButton title={t('tripEnded.confirmPayment')} onPress={onConfirmPayment} />
        </LinearBg>
      </View>
    </Modal>
  );
}
