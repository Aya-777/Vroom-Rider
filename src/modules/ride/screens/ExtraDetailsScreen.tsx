import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  Dimensions,
  StatusBar,
  Alert,
  Image
} from 'react-native';
import { Colors, Shadows, Typography } from '../../../core/theme';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import BottomSheetCard from '../../../shared/components/ride/BottomSheetCard';
import Header from '../../../shared/components/ride/Header';
import LinearBg from '../../../shared/components/LinearBg';

// SVGs
import ClockIcon from '../../../assets/svg/schedule.svg';
import EstimatedPriceIcon from '../../../assets/svg/price.svg';
import FilterIcon from '../../../assets/svg/filters.svg';
import ArrowRightIcon from '../../../assets/svg/arrows/arrow.svg';
import DropDownArrowIcon from '../../../assets/svg/arrows/dropdownArrow.svg';
import ArrowUp from '../../../assets/svg/arrows/arrowUp.svg';
import { HomeStackScreenProps } from '../../../navigation/main/home/homeTypes';

interface VehicleOption {
  id: string;
  type_name: string;
  image: any;
}

// Mock vehicle data - Later get it from back side 
const VEHICLE_DATA: VehicleOption[] = [
  { id: 'economy', type_name: 'Economy', image: 'car' },
  { id: 'comfort', type_name: 'Comfort', image: 'car' },
  { id: 'xl', type_name: 'XL', image:'car' },
];

interface ExtraDetailsScreenProps {
  timeEstimate?: string;
  priceEstimate?: string;
}

export default function ExtraDetailsScreen({
  timeEstimate = "30 : 00 m",
  priceEstimate = "$24.50",
}: ExtraDetailsScreenProps) {
  const [selectedVehicle, setSelectedVehicle] = useState('Economy');
  const [selectedPayment, setSelectedPayment] = useState('Cash');
  const navigation = useNavigation<HomeStackScreenProps<'RideDetails'>['navigation']>();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <View style={styles.contentContainer}>
      
      <StatusBar barStyle="dark-content" backgroundColor="#F5F4FA" translucent={false} />
      <Header
        title="Ride"
        onBackPress={() => { navigation.goBack() }}
      />
      {/* MAP VIEW COMPONENT */}
      <BottomSheetCard>
        {/* 1. (Time & Price Estimate) */}
        <View style={styles.infoRow}>
          {/* Time Box */}
          <View style={styles.infoBox}>
            <View style={styles.infoTitleRow}>
              <ClockIcon width={16} height={16} fill={Colors.primary} />
              <Text style={styles.infoBoxTitle}>Time</Text>
            </View>
            <Text style={styles.infoBoxValue}>{timeEstimate}</Text>
            <View style={styles.underline} />
          </View>

          {/* Estimated Price Box */}
          <View style={styles.infoBox}>
            <View style={styles.infoTitleRow}>
              <EstimatedPriceIcon width={16} height={16} fill={Colors.primary} />
              <Text style={styles.infoBoxTitle}>Estimated</Text>
            </View>
            <Text style={styles.infoBoxValue}>{priceEstimate}</Text>
            <View style={styles.underline} />
          </View>
        </View>

        {/* 2. FILTER & PAYMENT BUTTONS ROW */}
        <View style={styles.buttonRow}>
          <LinearBg
            colors={['#F0EBFF', '#FAFAFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.outlineButton}>
            <FilterIcon width={18} height={18} fill={Colors.primary} />
            <TouchableOpacity style={styles.insideButton}>
              <Text style={styles.outlineButtonText}>Filters</Text>
            </TouchableOpacity>
          </LinearBg>

          <LinearBg
            colors={['#F0EBFF', '#FAFAFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.outlineButton}>
            <View style={{ zIndex: 10, width: '100%' }}> 
              <TouchableOpacity 
                style={styles.dropdown} 
                onPress={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                <Text style={styles.dropdownText}>
                  {selectedPayment}
                </Text>
                {isDropdownOpen ? <ArrowUp fill={Colors.primary} /> : <DropDownArrowIcon fill={Colors.primary}/>}
              </TouchableOpacity>

              {/* Custom Payment Dropdown Overlay */}
              {isDropdownOpen && (
                <View style={styles.dropdownMenu}>
                  <TouchableOpacity 
                    style={styles.menuItem} 
                    onPress={() => {
                      setSelectedPayment('Cash');
                      setIsDropdownOpen(false);
                    }}
                  >
                    <Text style={[
                      styles.menuItemText, 
                      selectedPayment === 'Cash' && styles.selectedMenuText
                    ]}>Cash</Text>
                  </TouchableOpacity>

                  <View style={styles.menuDivider} />

                  <TouchableOpacity 
                    style={styles.menuItem} 
                    onPress={() => {
                      setSelectedPayment('Wallet');
                      setIsDropdownOpen(false);
                    }}
                  >
                    <Text style={[
                      styles.menuItemText, 
                      selectedPayment === 'Wallet' && styles.selectedMenuText
                    ]}>Wallet</Text>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </LinearBg>
          
        </View>

        {/* VEHICLE SELECTION ZONE */}
        <Text style={styles.sectionTitle}>SELECT VEHICLE</Text>
        
        <View style={styles.vehicleRow}>
          {VEHICLE_DATA.map((vehicle) => {
            const isSelected = selectedVehicle === vehicle.type_name;
            return (
              <TouchableOpacity
                key={vehicle.id}
                style={[
                  styles.vehicleCard,
                  isSelected && styles.selectedVehicleCard
                ]}
                onPress={() => setSelectedVehicle(vehicle.type_name)}
              >
                <Image source={vehicle.image} style={styles.vehicleImage} resizeMode="contain" />
                <Text style={[
                  styles.vehicleName,
                  isSelected && styles.selectedVehicleName
                ]}>
                  {vehicle.type_name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* NEXT BUTTON */}
        <TouchableOpacity 
          style={styles.nextButton} 
          onPress={() => navigation.navigate('ConfirmRide', {
            price: priceEstimate,
            time: timeEstimate,
            car: selectedVehicle,
            payement: selectedPayment, 
          })}
        >
          <Text style={styles.nextButtonText}>Next</Text>
          <ArrowRightIcon fill={Colors.background}/>
        </TouchableOpacity>
      </BottomSheetCard>
    </View>
  );
}

// --- COMPONENT STYLES ---
const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
    backgroundColor: '#151324',
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 16,
  },
  infoBox: {
    backgroundColor: Colors.surface,
    width: '48%',
    borderRadius: 12,
    paddingTop: 12,
    paddingHorizontal: 14,
    paddingBottom: 6,
    ...Shadows.medium
  },
  infoTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoBoxTitle: {
    color: Colors.textPrimary,
    marginLeft: 6,
    ...Typography.boldCaption
  },
  infoBoxValue: {
    ...Typography.semiBoldBody,
    color: '#1A1C29',
    textAlign: 'center',
    marginVertical: 4,
  },
  underline: {
    height: 1,
    backgroundColor: '#EAE6F8',
    width: '100%',
    marginTop: 4,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 20,
    zIndex: 50,
    elevation: 5,
  },
  outlineButton: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: Colors.secondary,
    width: '48%',
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.small
  },
  insideButton:{
    flexDirection: 'row',
    justifyContent: "center",
    alignContent: 'center',
  },
  outlineButtonText: {
    color: Colors.secondary,
    ...Typography.semiBoldCaption,
    fontSize: 14,
    marginLeft: 6,
  },
  sectionTitle: {
    alignSelf: 'flex-start',
    ...Typography.boldCaption,
    color: Colors.textSecondary,
    letterSpacing: 1,
    marginBottom: 12,
  },
  vehicleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
    zIndex: 1,
  },
  vehicleCard: {
    backgroundColor: '#FFFFFF',
    width: '30%',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    ...Shadows.small
  },
  selectedVehicleCard: {
    backgroundColor: Colors.lightAccent,
    borderWidth: 1.5,
    borderColor: Colors.secondary,
  },
  vehicleImage: {
    width: 50,
    height: 35,
    marginBottom: 6,
  },
  vehicleName: {
    ...Typography.caption,
    color: Colors.textMuted,
  },
  selectedVehicleName: {
    ...Typography.boldCaption,
    color: Colors.secondary,
  },
  nextButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    width: '50%',
    paddingVertical: 14,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.small,
  },
  nextButtonText: {
    ...Typography.semiBoldBody,
    marginRight: 6,
    marginBottom: 4,
    color: Colors.background,
  },
  dropdown: {
    flexDirection: 'row',
    paddingVertical: 6, 
    paddingHorizontal: 14,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minWidth: 120,
  },
  dropdownIcon: {
    marginRight: 6,
  },
  dropdownText: {
    color: '#1A1C29',
    fontWeight: '600',
    fontSize: 14,
    marginRight: 8,
  },
  dropdownMenu: {
    position: 'absolute',
    top: 40, 
    left: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    width: 120,
    ...Shadows.small,
    paddingVertical: 4,
    zIndex: 100,
    elevation: 10,     
  },
  menuItem: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  menuItemText: {
    fontSize: 14,
    color: '#5C4E75',
    fontWeight: '500',
  },
  selectedMenuText: {
    color: '#443366',
    fontWeight: '700',
  },
  menuDivider: {
    height: 1,
    backgroundColor: '#EAE6F8',
    marginHorizontal: 8,
  },
});