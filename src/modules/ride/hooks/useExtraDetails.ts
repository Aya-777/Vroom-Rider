import { useState } from 'react';

export function useExtraDetails() {
  const [selectedVehicle, setSelectedVehicle] = useState('Economy');
  const [selectedPayment, setSelectedPayment] = useState('Cash');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return {
    timeEstimate: '30:00 m',
    priceEstimate: '$24.50',

    selectedVehicle,
    selectedPayment,
    isDropdownOpen,

    setSelectedVehicle,
    setSelectedPayment,
    setIsDropdownOpen,
  };
}