import { useState } from 'react';
import { RideValidationErrors } from '../types/ride.types';
import { validateRideInputs } from '../utils/selectRideValidation';

export function useSelectRideViewModel() {
  
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

    
  const [errors, setErrors] = useState<RideValidationErrors>({});

  const validate = (): boolean => {
    const validationErrors = validateRideInputs(fromLocation, toLocation);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  return {
    isNowDropdownOpen,
    isForMeDropdownOpen,
    selectedPerson,
    selectedTime,
    fromLocation,
    toLocation,
    errors,
    setIsNowDropdownOpen,
    setIsForMeDropdownOpen,
    setSelectedPerson,
    setSelectedTime,
    setFromLocation,
    setToLocation,
    validate,
  };
}