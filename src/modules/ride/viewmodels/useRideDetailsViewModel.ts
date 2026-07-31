import { useMemo, useState } from 'react';
import { useRideStore } from '../store/useRideStore';

export function useRideDetailsViewModel() {
  const { rideData, setRideDetails } = useRideStore();
  const { estimate, setEstimate } = useRideStore();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('cash');
  const [selectedFilterIds, setSelectedFilterIds] = useState<string[]>([]);
  const [filtersVisible, setFiltersVisible] = useState(false);

  const selectedVehicle = useMemo(() => {
    return estimate?.pricing_tiers?.find(
      tier => tier.tier_id === selectedVehicleId,
    );
  }, [estimate, selectedVehicleId]);

  const updateRideDetails = () => {
    setRideDetails({
      vehicle_type_id: selectedVehicleId,
      payment_method: selectedPayment === 'cash' ? 'CASH' : 'WALLET',
    });
  };

  const onSelectVehicle = (vehicleId: number) => {
    setSelectedVehicleId(vehicleId);
  };

  return {
    rideData,
    estimate,

    selectedVehicleId,
    selectedVehicle,
    selectedPayment,
    selectedFilterIds,
    filtersVisible,

    isDropdownOpen,

    setSelectedFilterIds,
    setFiltersVisible,
    setSelectedVehicleId,
    setSelectedPayment,
    setIsDropdownOpen,

    onSelectVehicle,
    updateRideDetails,
  };
}
