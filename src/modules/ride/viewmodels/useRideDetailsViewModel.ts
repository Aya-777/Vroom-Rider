import { useMemo, useState } from 'react';
import { useRideStore } from '../store/useRideStore';

export function useRideDetailsViewModel() {
  const { rideData, setRideDetails } = useRideStore();
  const estimate = useRideStore(state => state.estimate);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('cash');

  const selectedVehicle = useMemo(() => {
    return estimate?.pricing_tiers?.find(
      tier => tier.tier_id === selectedVehicleId,
    );
  }, [estimate, selectedVehicleId]);

  const updateRideDetails = () => {
    if (!selectedVehicle) return;

    // setRideDetails({
    //   vehicleId: selectedVehicleId,
    //   paymentMethod: 'CARD',
    //   price: selectedVehicle.estimated_price,
    // });
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

    isDropdownOpen,

    setSelectedVehicleId,
    setSelectedPayment,
    setIsDropdownOpen,

    onSelectVehicle,
    updateRideDetails,
  };
}