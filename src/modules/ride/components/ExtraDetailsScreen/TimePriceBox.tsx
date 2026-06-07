import React from 'react';
import { View, Text } from 'react-native';
import { useTheme } from '../../../../core/theme/useTheme';
import { createStyles } from '../../styles/extraDetails.styles';

import ClockIcon from '../../../../assets/svg/common/schedule.svg';
import PriceIcon from '../../../../assets/svg/payment/price.svg';

type Props = {
  time: string;
  price: string;
};

export default function TimePriceBox({ time, price }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.timePriceRow}>
      <View style={styles.timeBox}>
        <ClockIcon fill={colors.primary} />
        <Text style={styles.timePriceText}>{time}</Text>
      </View>

      <View style={styles.priceBox}>
        <PriceIcon fill={colors.primary} />
        <Text style={styles.timePriceText}>{price}</Text>
      </View>
    </View>
  );
}