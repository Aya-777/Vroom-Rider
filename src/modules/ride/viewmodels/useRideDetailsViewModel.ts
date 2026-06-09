import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HomeStackScreenProps } from '../../../navigation/main/home/homeTypes';

export function useRideDetailsViewModel() {
  
  const navigation = useNavigation<HomeStackScreenProps<'RideDetails'>['navigation']>();

  const [timeEstimate, setTimeEstimate] = useState('30:00 m');
  const [priceEstimate, setPriceEstimate] = useState('$24.50');
  const [selectedVehicle, setSelectedVehicle] = useState('Economy');
  const [selectedPayment, setSelectedPayment] = useState('Cash');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);


  const handleNextPress = () => {
    navigation.navigate('ConfirmRide', {
      price: priceEstimate,
      time: timeEstimate,
      car: selectedVehicle,
      payment: selectedPayment,
    });
  }

  const handleBackPress= () => {
    navigation.goBack();
  }
  
  return {
    timeEstimate,
    priceEstimate,
    selectedVehicle,
    selectedPayment,
    isDropdownOpen,

    setTimeEstimate,
    setPriceEstimate,
    setSelectedVehicle,
    setSelectedPayment,
    setIsDropdownOpen,

    handleNextPress,
    handleBackPress,
  };
}