import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HomeStackScreenProps } from '../../../navigation/main/home/homeTypes';
import { RideValidationErrors } from '../types/ride.types';
import { validateRideInputs } from '../utils/selectRideValidation';

export function useSelectRideViewModel(showAlert: (title: string, msg: string) => void) {
  const navigation = useNavigation<HomeStackScreenProps<'SelectRide'>['navigation']>();

  // --- UI State ---
  const [isNowDropdownOpen, setIsNowDropdownOpen] = useState(false);
  const [isForMeDropdownOpen, setIsForMeDropdownOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState('For me');
  const [selectedTime, setSelectedTime] = useState('Now');
  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');
  const [errors, setErrors] = useState<RideValidationErrors>({});

  // --- Logic ---
  const validate = (): boolean => {
    const validationErrors = validateRideInputs(fromLocation, toLocation);
    setErrors(validationErrors);
    return Object.keys(validationErrors).length === 0;
  };

  // Actions
  const handleNextPress = () => {
    if (!validate()) {
      showAlert('Missing Information', 'Please fill in both pickup and destination locations.');
      return;
    }

    navigation.navigate('RideDetails', {
      pickupLocation: fromLocation,
      dropoffLocation: toLocation,
    });
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return {
    // State
    isNowDropdownOpen,
    isForMeDropdownOpen,
    selectedPerson,
    selectedTime,
    fromLocation,
    toLocation,
    errors,
    
    // Setters
    setIsNowDropdownOpen,
    setIsForMeDropdownOpen,
    setSelectedPerson,
    setSelectedTime,
    setFromLocation,
    setToLocation,
    
    // Actions
    validate,
    handleNextPress,
    handleBackPress,
  };
}