import React from 'react';
import { View, Text } from 'react-native';
import Input from '../../../../shared/components/Input';
import {useTripStartedViewModel} from '../../viewmodels/useTripStartedViewModel'
import { useTheme } from '../../../../core/theme/useTheme';
import { createStyles } from '../../styles/trip.styles';
import { useTranslation } from 'react-i18next';

export const TripSummaryGrid = () => {

  const { colors } = useTheme();
  const styles = createStyles(colors);
  const vm = useTripStartedViewModel();

  const { t } = useTranslation(['rideStarted', 'common']);

  return(
  <View style={styles.gridContainer}>
      {[
        {label: t('common:payment.estimatedPrice'), value: vm.currentRide?.estimated_price}
        , {label: t('common:estimatedTime'), value: vm.currentRide?.estimated_duration}
        , {label: t('distance'), value: vm.currentRide?.estimated_distance}
        , {label: t('common:filters.filtersTotal'), value: vm.filtersTotal}
      ].map(({label, value}) => (
        <View key={label} style={styles.metricCard}>
          <Text style={styles.metricLabel}>{label}</Text>
          <Text style={styles.metricValue}>{value}</Text>
        </View>
      ))}
  </View>
  )
};