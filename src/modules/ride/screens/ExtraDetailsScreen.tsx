import React from 'react';
import { View, StatusBar } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../core/theme/useTheme';
import { HomeStackScreenProps } from '../../../navigation/main/home/homeTypes';
import Header from '../../../shared/components/ride/Header';
import BottomSheetCard from '../../../shared/components/ride/BottomSheetCard';
import { useExtraDetails } from '../hooks/useExtraDetails';
import VehicleSelector from '../components/ExtraDetailsScreen/VehicleSelector';
import { createStyles } from '../styles/shared.styles';
import RideNextButton from '../components/shared/RideNextButton';
import TimePriceBox from '../components/ExtraDetailsScreen/TimePriceBox';
import RideActionFilters from '../components/ExtraDetailsScreen/RideActionFilters';

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
    });
  };

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

        {/* <View style={styles.actionCardsRow}>

          <TouchableOpacity
            style={styles.cardWrapper}
            onPress={() => console.log('Filters Pressed')}
            activeOpacity={0.8}
          >
            <LinearBg colors={gradientColors} style={styles.actionCardGradient}>
              <View style={styles.iconWrapper}>
                <FilterIcon width={18} height={18} fill="#FFFFFF" />
              </View>
              <Text style={styles.cardText}>Filters</Text>
            </LinearBg>
          </TouchableOpacity>

          <View style={styles.dropdownWrapper}>
            <TouchableOpacity
              style={styles.cardWrapper}
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}
              activeOpacity={0.8}
            >
              <LinearBg colors={gradientColors} style={styles.actionCardGradient}>
                <View style={styles.iconWrapper}>
                  <CashIcon width={18} height={18} fill="#FFFFFF" />
                </View>
                <Text style={styles.cardText}>{selectedPayment}</Text>
                {isDropdownOpen ? (
                  <ArrowUp width={12} height={12} fill="#FFFFFF" />
                ) : (
                  <DropDownArrowIcon width={12} height={12} fill="#FFFFFF" />
                )}
              </LinearBg>
            </TouchableOpacity>

            {isDropdownOpen && (
              <View style={styles.dropdownMenu}>
                {['Cash', 'Wallet'].map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={styles.menuItem}
                    onPress={() => {
                      setSelectedPayment(item);
                      setIsDropdownOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.menuItemText,
                        {
                          color:
                            selectedPayment === item
                              ? colors.primary
                              : colors.textSecondary,
                        },
                      ]}
                    >
                      {item}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </View>

        </View> */}
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

        <RideNextButton onPress={handleNextPress} />
      </BottomSheetCard>
    </View>
  );
}