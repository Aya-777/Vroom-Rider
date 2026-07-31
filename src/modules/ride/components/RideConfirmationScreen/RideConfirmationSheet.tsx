import React, { useMemo } from 'react';
import { View } from 'react-native';
import { BaseBottomSheet } from '../../../../shared/components/BaseBottomSheet';
import InfoBox from './InfoBox';
import ActionButton from '../../../../shared/components/ActionButton';
import { useConfirmRideViewModel } from '../../viewmodels/useConfirmRideViewModel';
import CashIcon from '../../../../assets/svg/payment/cash.svg';
import CarIcon from '../../../../assets/svg/common/ride.svg';
import SearchIcon from '../../../../assets/svg/common/search.svg';

import { createStyles } from '../../styles/confirmRide.styles';
import { useTranslation } from 'react-i18next';
import { useTheme } from '../../../../core/theme/useTheme';
import TimePriceBox from '../ExtraDetailsScreen/TimePriceBox';

type Props = {
  onNextPress: () => void;
};

export default function RideConfirmationSheet({ onNextPress }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['confirmRide', 'common']);

  const vm = useConfirmRideViewModel();

  const snapPoints = useMemo(() => ['30%', '70%'], []);

  const handleFindPress = async () => {
    const response = await vm.handleFindDriver();
    if(response){
      onNextPress();
    }
  };

  const selectedVehicle = vm.estimate?.pricing_tiers?.find(
    tier => tier.tier_id === vm.rideData.vehicle_type_id,
  );

  return (
    <BaseBottomSheet isVisible={true} snapPoints={snapPoints} index={1}>
      <View style={styles.grid}>
        <TimePriceBox
          time={`${vm.estimate.estimated_duration_minutes}`}
          estimatedPrice={
            selectedVehicle
              ? `$${selectedVehicle.estimated_price.toFixed(2)}`
              : '...'
          }
        />

        <InfoBox
          icon={<CarIcon width={16} height={16} fill={colors.primary} />}
          title={t('selectedCar')}
          value={selectedVehicle?.tier_name ?? 'N/A'}
        />

        <InfoBox
          icon={<CashIcon width={16} height={16} fill={colors.primary} />}
          title={t('payment')}
          value={
            vm.rideData.payment_method ? vm.rideData.payment_method : 'N/A'
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
