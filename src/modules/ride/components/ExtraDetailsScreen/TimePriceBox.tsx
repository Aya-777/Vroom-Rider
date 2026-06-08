import React from 'react';
import { View } from 'react-native';
import { useTheme } from '../../../../core/theme/useTheme';
import { createStyles } from '../../styles/extraDetails.styles';

import ClockIcon from '../../../../assets/svg/common/schedule.svg';
import EstimatedPriceIcon from '../../../../assets/svg/payment/price.svg';
import InfoBox from '../RideConfirmationScreen/InfoBox';

type Props = {
  time: string;
  price: string;
};

export default function TimePriceBox({ time, price }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.timePriceRow}>

      <InfoBox
                icon={<ClockIcon width={16} height={16} fill={colors.primary} />}
                title="Time"
                value={time || 'N/A'}
              />
      
              <InfoBox
                icon={
                  <EstimatedPriceIcon
                    width={16}
                    height={16}
                    fill={colors.primary}
                  />
                }
                title="Total Price"
                value={price || 'N/A'}
              />
    </View>
  );
}