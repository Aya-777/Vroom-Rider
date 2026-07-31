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

type Props = {
  onNextPress: () => void;
};

export default function ExtraDetailsScreen({ onNextPress }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['rideDetails', 'common']);

  const paymentItems = [
    { key: 'cash', label: t('common:payment.cash') },
    { key: 'wallet', label: t('common:payment.wallet') },
  ];

  const vm = useRideDetailsViewModel();

  const handleNextPress = () => {
    vm.updateRideDetails();
    onNextPress();
  };

  const snapPoints = useMemo(() => ['30%', '70%'], []);

  return (
    <BaseBottomSheet isVisible={true} snapPoints={snapPoints} index={1}>
      <TimePriceBox
        time={
          vm.estimate.estimated_duration_minutes > 0
            ? `${vm.estimate.estimated_duration_minutes}`
            : '...'
        }
        price={
          vm.selectedVehicle
            ? `$${vm.selectedVehicle.estimated_price.toFixed(2)}`
            : '...'
        }
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
        filtersVisible = {vm.filtersVisible}
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
        onPress={handleNextPress}
        title={t('common:next')}
        icon={<ArrowRight fill={colors.background} />}
      />
    </BaseBottomSheet>
  );
}
