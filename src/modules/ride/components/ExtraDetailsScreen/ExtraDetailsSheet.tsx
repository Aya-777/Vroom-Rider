import React, { useMemo } from 'react';
import { useTheme } from '../../../../core/theme/useTheme';
import { BaseBottomSheet } from '../../../../shared/components/BaseBottomSheet';
import VehicleSelector from '../../components/ExtraDetailsScreen/VehicleSelector';
import { createStyles } from '../../styles/shared.styles';
import ActionButton from '../../../../shared/components/ActionButton';
import TimePriceBox from '../../components/ExtraDetailsScreen/TimePriceBox';
import RideActionFilters from '../../components/ExtraDetailsScreen/RideActionFilters';
import { useRideDetailsViewModel } from '../../viewmodels/useRideDetailsViewModel';
import { useTranslation } from 'react-i18next';
import ArrowRight from '../../../../assets/svg/arrows/arrow.svg';
import { Double } from 'react-native/Libraries/Types/CodegenTypes';
import { SharedValue } from 'react-native-reanimated';

type Props = {
  onNextPress: () => void;
  animatedPosition?: SharedValue<number>;
};

export default function ExtraDetailsScreen({ onNextPress, animatedPosition }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['rideDetails', 'common']);

  const paymentItems = [
    { key: 'cash', label: t('common:payment.cash') },
    { key: 'wallet', label: t('common:payment.wallet') },
  ];

  const vm = useRideDetailsViewModel();

  const handleNextPress = (totalPrice: Double) => {
    vm.updateRideDetails(totalPrice);
    onNextPress();
  };

  const snapPoints = useMemo(() => ['30%', '70%'], []);

  const totalPrice = useMemo(() => {
    if (!vm.selectedVehicle) {
      return null;
    }

    const vehiclePrice = Number(vm.selectedVehicle.estimated_price);

    if (Number.isNaN(vehiclePrice)) {
      console.log('Invalid vehicle price:', vm.selectedVehicle.estimated_price);
      return null;
    }
    const filtersPrice = vm.filters
      .filter(filter => vm.selectedFilterIds.includes(String(filter.id)))
      .reduce((total, filter) => {
        const extraFee = Number(filter.extra_fee);
        return total + extraFee;
      }, 0);

    return vehiclePrice + filtersPrice;
  }, [vm.selectedVehicle, vm.filters, vm.selectedFilterIds]);

  return (
    <BaseBottomSheet isVisible={true} snapPoints={snapPoints} index={1} animatedPosition={animatedPosition}>
      <TimePriceBox
        time={
          vm.estimate.estimated_duration_minutes > 0
            ? `${vm.estimate.estimated_duration_minutes}`
            : '...'
        }
        estimatedPrice={
          vm.selectedVehicle
            ? `${vm.selectedVehicle.estimated_price.toFixed(2)}`
            : '...'
        }
        totalPrice={totalPrice?.toFixed(2).toString()}
      />

      <RideActionFilters
        selectedValue={t(`common:payment.${vm.selectedPayment}`)}
        isOpen={vm.isDropdownOpen}
        styles={styles}
        onToggleDropdown={() => vm.setIsDropdownOpen(!vm.isDropdownOpen)}
        onSelectPayment={item => {
          vm.setSelectedPayment(item);
          vm.setIsDropdownOpen(false);
        }}
        paymentItems={paymentItems}
        filters={vm.filters}
        filtersVisible={vm.filtersVisible}
        setFiltersVisible={vm.setFiltersVisible}
        selectedFiltersIds={vm.selectedFilterIds}
        setSelectedFiltersIds={vm.setSelectedFilterIds}
      />
      <VehicleSelector
        selected={vm.selectedVehicleId}
        onSelect={vm.onSelectVehicle}
        vehicles={vm.estimate.pricing_tiers}
      />

      <ActionButton
        onPress={() => handleNextPress(totalPrice || 0)}
        title={t('common:next')}
        icon={<ArrowRight fill={colors.background} />}
      />
    </BaseBottomSheet>
  );
}
