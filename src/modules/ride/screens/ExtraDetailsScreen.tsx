import React from 'react';
import { View, StatusBar } from 'react-native';
import { useTheme } from '../../../core/theme/useTheme';
import Header from '../../../shared/components/SubHeader';
import BottomSheetCard from '../../../shared/components/ride/BottomSheetCard';
import VehicleSelector from '../components/ExtraDetailsScreen/VehicleSelector';
import { createStyles } from '../styles/shared.styles';
import RideNextButton from '../components/shared/RideNextButton';
import TimePriceBox from '../components/ExtraDetailsScreen/TimePriceBox';
import RideActionFilters from '../components/ExtraDetailsScreen/RideActionFilters';
import {useRideDetailsViewModel} from '../viewmodels/useRideDetailsViewModel';

export default function ExtraDetailsScreen() {
  const { colors, mode } = useTheme();

  const {
    timeEstimate,
    priceEstimate,
    selectedVehicle,
    selectedPayment,
    isDropdownOpen,
    setSelectedVehicle,
    setSelectedPayment,
    setIsDropdownOpen,

    handleNextPress,
    handleBackPress
  } = useRideDetailsViewModel();

  const onNextPress = () => {
    handleNextPress();
  };

  const styles = createStyles(colors);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />

      <Header title="Ride" onBackPress={handleBackPress} />

      <BottomSheetCard>
        <TimePriceBox time={timeEstimate} price={priceEstimate} />
        
        <RideActionFilters
          selectedValue={selectedPayment}
          isOpen={isDropdownOpen}
          styles={styles}
          onToggleDropdown={() => setIsDropdownOpen(!isDropdownOpen)}
          onSelectPayment={(item) => {
            setSelectedPayment(item);
            setIsDropdownOpen(false);
          }}
          onFiltersPress={() => console.log('Filters Pressed from Screen')}
        />
        <VehicleSelector
          selected={selectedVehicle}
          onSelect={setSelectedVehicle}
        />

        <RideNextButton onPress={onNextPress} />
      </BottomSheetCard>
    </View>
  );
}