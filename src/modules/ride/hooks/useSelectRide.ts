import { useState } from 'react';

export function useSelectRide() {
  const [isNowDropdownOpen, setIsNowDropdownOpen] =
    useState(false);

  const [isForMeDropdownOpen, setIsForMeDropdownOpen] =
    useState(false);

  const [selectedPerson, setSelectedPerson] =
    useState('For me');

  const [selectedTime, setSelectedTime] =
    useState('Now');

  const [fromLocation, setFromLocation] =
    useState('');

  const [toLocation, setToLocation] =
    useState('');

  return {
    isNowDropdownOpen,
    isForMeDropdownOpen,
    selectedPerson,
    selectedTime,
    fromLocation,
    toLocation,

    setIsNowDropdownOpen,
    setIsForMeDropdownOpen,
    setSelectedPerson,
    setSelectedTime,
    setFromLocation,
    setToLocation,
  };
}