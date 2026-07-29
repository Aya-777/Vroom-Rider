import { useEffect, useState } from 'react';
import { useRideStore } from '../store/useRideStore';

export function useRideDetailsViewModel() {
  const { rideData, setRideDetails} = useRideStore();
  const estimate = useRideStore(state => state.estimate);

  // UI State only
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(1);
  const [selectedPayment, setSelectedPayment] = useState('cash');

  const updateRideDetails = () => {};

  useEffect(() => {
  console.log("estimate updated:", estimate);
}, [estimate]);

  return {
    // ride Data
    selectedVehicleId,
    selectedPayment,
    estimate,
    rideData,

    // UI
    isDropdownOpen,

    // Setters,
    setSelectedVehicleId,
    setSelectedPayment,
    setIsDropdownOpen,

    updateRideDetails,
  };
}
