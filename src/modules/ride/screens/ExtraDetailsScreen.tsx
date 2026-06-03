import React from 'react';
import { View, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../../../core/theme/useTheme';
import { HomeStackScreenProps } from '../../../navigation/main/home/homeTypes';
import Header from '../../../shared/components/ride/Header';
import BottomSheetCard from '../../../shared/components/ride/BottomSheetCard';

import { useExtraDetails } from '../hooks/useExtraDetails';

import TimePriceBox from '../components/TimePriceBox';
import PaymentDropdown from '../components/PaymentDropdown';
import VehicleSelector from '../components/VehicleSelector';
import NextButton from '../components/NextButton';

import { createStyles } from '../styles/extraDetails.styles';

export default function ExtraDetailsScreen() {
  const { colors, mode } = useTheme();
  const navigation = useNavigation<HomeStackScreenProps<'RideDetails'>['navigation']>();

  const {
    timeEstimate,
    priceEstimate,
    selectedVehicle,
    selectedPayment,
    isDropdownOpen,
    setSelectedVehicle,
    setSelectedPayment,
    setIsDropdownOpen,
  } = useExtraDetails();

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />

      <Header title="Ride" onBackPress={() => navigation.goBack()} />

      <BottomSheetCard>
        <TimePriceBox time={timeEstimate} price={priceEstimate} />

        <PaymentDropdown
          selected={selectedPayment}
          isOpen={isDropdownOpen}
          onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
          onSelect={setSelectedPayment}
        />

        <VehicleSelector
          selected={selectedVehicle}
          onSelect={setSelectedVehicle}
        />

        <NextButton
          onPress={() =>
            navigation.navigate('ConfirmRide', {
              price: priceEstimate,
              time: timeEstimate,
              car: selectedVehicle,
              payment: selectedPayment,
            })
          }
        />
      </BottomSheetCard>
    </View>
  );
}