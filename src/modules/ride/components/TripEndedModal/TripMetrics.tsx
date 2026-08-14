import React from 'react';
import { View, Text } from 'react-native';
import { createStyles } from '../../styles/tripEndedModal.styles';
import { useTheme } from '../../../../core/theme/useTheme';
import { useTranslation } from 'react-i18next';
import { RideFilter } from '../../types/ride.types';

type Props = {
  estimatedPrice: string;
  filters: RideFilter[];
};

export default function TripMetrics({ estimatedPrice, filters }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['tripEnded', 'common']);

  return (
    <View style={styles.metricsColumn}>
      <View style={styles.metricRow}>
        <Text style={styles.metricLabel} adjustsFontSizeToFit={true}>
          {t('common:totalPrice')}:
        </Text>

        <Text style={styles.valueText}>{estimatedPrice}$</Text>
      </View>

      {filters.length === 0 && (
        <View>
          <Text style={styles.metricLabel}>{t('tripEnded:tripEnded.noFilters')}</Text>
        </View>
      )}

      {filters.length > 0 &&
        filters.map(item => (
          <View key={item.id} style={styles.metricRow}>
            <Text style={styles.metricLabel} adjustsFontSizeToFit={true}>
              {t(item.title)}:
            </Text>

            <Text style={styles.valueText}>{item.extra_fee}$</Text>
          </View>
        ))}
    </View>
  );
}
