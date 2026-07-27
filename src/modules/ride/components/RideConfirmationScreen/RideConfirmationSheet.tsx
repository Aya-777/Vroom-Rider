import React, { useMemo, useState } from 'react';
import { View, StatusBar, TextInput } from 'react-native';
import { BaseBottomSheet } from '../../../../shared/components/BaseBottomSheet';
import InfoBox from './InfoBox';
import ActionButton from '../../../../shared/components/ActionButton';
import { useConfirmRideViewModel } from '../../viewmodels/useConfirmRideViewModel';

import ClockIcon from '../../../../assets/svg/common/schedule.svg';
import EstimatedPriceIcon from '../../../../assets/svg/payment/price.svg';
import CashIcon from '../../../../assets/svg/payment/cash.svg';
import CarIcon from '../../../../assets/svg/common/ride.svg';
import SearchIcon from '../../../../assets/svg/common/search.svg';
import PhoneNumberIcon from '../../../../assets/svg/contact/call.svg';

import { createStyles } from '../../styles/confirmRide.styles';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../../core/theme/useTheme';

type Props = {
  onNextPress: () => void;
};

export default function RideConfirmationSheet({ onNextPress }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['confirmRide', 'common']);

  const vm = useConfirmRideViewModel();

  const snapPoints = useMemo(() => ['30%', '70%'], []);

  const handleFindPress = () => {
    vm.handleFindDriver();
    onNextPress();
  };
  console.log(vm.rideData);

  return (
    <BaseBottomSheet isVisible={true} snapPoints={snapPoints} index={1}>
      <View style={styles.grid}>
        <InfoBox
          icon={<ClockIcon width={16} height={16} fill={colors.primary} />}
          title={t('time')}
          value={vm.estimate.time || 'N/A'}
        />

        <InfoBox
          icon={
            <EstimatedPriceIcon width={16} height={16} fill={colors.primary} />
          }
          title={t('totalPrice')}
          value={`${vm.estimate.price}$` || 'N/A'}
        />

        <InfoBox
          icon={<CarIcon width={16} height={16} fill={colors.primary} />}
          title={t('selectedCar')}
          value={
            vm.rideData.vehicleType
              ? t(`common:carType.${vm.rideData.vehicleType}`)
              : 'N/A'
          }
        />

        <InfoBox
          icon={<CashIcon width={16} height={16} fill={colors.primary} />}
          title={t('payment')}
          value={
            vm.rideData.payment
              ? t(`common:payment.${vm.rideData.payment}`)
              : 'N/A'
          }
        />
      </View>

      <ActionButton
        onPress={handleFindPress}
        title={t('findaDriver')}
        icon={<SearchIcon fill={colors.background} />}
        textStyle={styles.buttonText}
        style={styles.button}
      />
    </BaseBottomSheet>
  );
}
