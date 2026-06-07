import React from 'react';
import { View, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../core/theme/useTheme';
import { HomeStackScreenProps } from '../../../navigation/main/home/homeTypes';
import Header from '../../../shared/components/ride/Header';
import BottomSheetCard from '../../../shared/components/ride/BottomSheetCard';
import { useExtraDetails } from '../hooks/useExtraDetails';
import TimePriceBox from '../components/ExtraDetailsScreen/TimePriceBox';
import VehicleSelector from '../components/ExtraDetailsScreen/VehicleSelector';
import { createStyles } from '../styles/extraDetails.styles';
import RideNextButton from '../components/shared/RideNextButton';
import RideDropdown from '../components/shared/RideDropdown';

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

  const handleNextPress = () => {
    navigation.navigate('ConfirmRide', {
      price: priceEstimate,
      time: timeEstimate,
      car: selectedVehicle,
      payment: selectedPayment,
    })
  }

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

        <RideDropdown
          value={selectedPayment}
          isOpen={isDropdownOpen}
          items={['Cash', 'Wallet']}
          onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
          onSelect={(item) => {
            setSelectedPayment(item);
            setIsDropdownOpen(false);
          }}
        />

        <VehicleSelector
          selected={selectedVehicle}
          onSelect={setSelectedVehicle}
        />

        <RideNextButton onPress={handleNextPress} />
      </BottomSheetCard>
    </View>
  );
}