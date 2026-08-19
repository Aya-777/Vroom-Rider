import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../../../core/theme/useTheme';
import { createStyles } from '../../styles/extraDetails.styles';

import ClockIcon from '../../../../assets/svg/common/schedule.svg';
import EstimatedPriceIcon from '../../../../assets/svg/payment/price.svg';
import InfoBox from '../RideConfirmationScreen/InfoBox';
import { useTranslation } from 'react-i18next';

type Props = {
  time: string;
  estimatedPrice: string;
  totalPrice?: string;
};

export default function TimePriceBox({ time, estimatedPrice, totalPrice }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['rideDetails', 'common']);

  return (
    <View style={styles.timePriceRow}>
      <InfoBox
        icon={<ClockIcon width={16} height={16} fill={colors.primary} />}
        title={t('common:time')}
        value={`${time} min`}
      />

      <InfoBox
        icon={
          <EstimatedPriceIcon width={16} height={16} fill={colors.primary} />
        }
        title={t('common:payment.estimated')}
        value={`${estimatedPrice}$`}
        title2={t('common:totalPrice')}
        value2={`${totalPrice}$`}
        icon2={<EstimatedPriceIcon width={16} height={16} fill={colors.primary}/>}
      />
    </View>
  );
}
