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
import { Colors } from '../../../core/theme';
import { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import BottomSheetCard from '../../../shared/components/ride/BottomSheetCard';
import Header from '../../../shared/components/ride/Header';

// SVG Asset Imports (Make sure these paths match your assets folder)
import ClockIcon from '../../../assets/svg/schedule.svg'; // Or reuse ScheduleIcon
import LinearBg from '../../../shared/components/LinearBg';
// import CardIcon from '../../../assets/svg/card.svg';   // For cash/payment icon
// import FilterIcon from '../../../assets/svg/filters.svg';

interface VehicleOption {
  id: string;
  name: string;
  image: any;
}

// Mock vehicle data - Later get it from back side 
const VEHICLE_DATA: VehicleOption[] = [
  { id: 'economy', name: 'Economy', image: 'car' },
  { id: 'comfort', name: 'Comfort', image: 'car' },
  { id: 'xl', name: 'XL', image:'car' },
];

interface ExtraDetailsScreenProps {
  timeEstimate?: string;
  priceEstimate?: string;
  onNextPress?: () => void;
}

export default function ExtraDetailsScreen({
  timeEstimate = "30 : 00 m",
  priceEstimate = "$24.50",
  onNextPress,
}: ExtraDetailsScreenProps) {
  const [selectedVehicle, setSelectedVehicle] = useState('economy');
  const navigation = useNavigation<any>();

  return (
    <View style={styles.contentContainer}>
      
      <StatusBar barStyle="dark-content" backgroundColor="#F5F4FA" translucent={false} />
      <Header
        title="Ride"
        onBackPress={() => {navigation.goBack()
        }}
      />
      {/* MAP VIEW COMPONENT */}
      <BottomSheetCard>
        {/* 1. INFO BOXES ROW (Time & Price Estimate) */}
        <View style={styles.infoRow}>
          {/* Time Box */}
          <View style={styles.infoBox}>
            <View style={styles.infoTitleRow}>
              <ClockIcon width={16} height={16} fill="#443366" />
              <Text style={styles.infoBoxTitle}>Time</Text>
            </View>
            <Text style={styles.infoBoxValue}>{timeEstimate}</Text>
            <View style={styles.underline} />
          </View>

          {/* Estimated Price Box */}
          <View style={styles.infoBox}>
            <View style={styles.infoTitleRow}>
              {/* <CardIcon width={16} height={16} fill="#443366" /> */}
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
            <TouchableOpacity >
              {/* <FilterIcon width={18} height={18} fill="#1A1C29" /> */}
              <Text style={styles.outlineButtonText}>Filters</Text>
            </TouchableOpacity>
          </LinearBg>

          <LinearBg
            colors={['#F0EBFF', '#FAFAFF']}
            start={{ x: 0, y: 0 }}
            end={{ x: 0, y: 1 }}
            style={styles.outlineButton}>
            <TouchableOpacity >
              {/* <CardIcon width={18} height={18} fill="#1A1C29" /> */}
              <Text style={styles.outlineButtonText}>Cash</Text>
            </TouchableOpacity>
          </LinearBg>
        </View>

        {/* 3. VEHICLE SELECTION ZONE */}
        <Text style={styles.sectionTitle}>SELECT VEHICLE</Text>
        
        <View style={styles.vehicleRow}>
          {VEHICLE_DATA.map((vehicle) => {
            const isSelected = selectedVehicle === vehicle.id;
            return (
              <TouchableOpacity
                key={vehicle.id}
                style={[
                  styles.vehicleCard,
                  isSelected && styles.selectedVehicleCard
                ]}
                onPress={() => setSelectedVehicle(vehicle.id)}
              >
                <Image source={vehicle.image} style={styles.vehicleImage} resizeMode="contain" />
                <Text style={[
                  styles.vehicleName,
                  isSelected && styles.selectedVehicleName
                ]}>
                  {vehicle.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* 4. FOOTER ACTION BUTTON */}
        <TouchableOpacity style={styles.nextButton} onPress={onNextPress}>
          <Text style={styles.nextButtonText}>Next</Text>
          <Text style={styles.arrowIcon}>→</Text> 
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
    backgroundColor: '#FFFFFF',
    width: '48%',
    borderRadius: 12,
    paddingTop: 12,
    paddingHorizontal: 14,
    paddingBottom: 6,
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  infoTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  infoBoxTitle: {
    fontSize: 13,
    fontWeight: '700',
    color: '#3B335C',
    marginLeft: 6,
  },
  infoBoxValue: {
    fontSize: 15,
    fontWeight: '600',
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
  },
  outlineButton: {
    flexDirection: 'row',
    backgroundColor: 'transparent',
    borderWidth: 1.5,
    borderColor: '#221A3B',
    width: '48%',
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  outlineButtonText: {
    color: '#1A1C29',
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 6,
  },
  sectionTitle: {
    alignSelf: 'flex-start',
    fontSize: 12,
    fontWeight: '700',
    color: '#5C4E75',
    letterSpacing: 1,
    marginBottom: 12,
  },
  vehicleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 24,
  },
  vehicleCard: {
    backgroundColor: '#FFFFFF',
    width: '30%',
    borderRadius: 12,
    paddingVertical: 12,
    alignItems: 'center',
    elevation: 1,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.08,
    shadowRadius: 2,
  },
  selectedVehicleCard: {
    backgroundColor: '#DDD8F0',
    borderWidth: 1.5,
    borderColor: '#443366',
  },
  vehicleImage: {
    width: 50,
    height: 35,
    marginBottom: 6,
  },
  vehicleName: {
    fontSize: 13,
    fontWeight: '500',
    color: '#5C4E75',
  },
  selectedVehicleName: {
    color: '#443366',
    fontWeight: '700',
  },
  nextButton: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF', // Clean custom text frame styling matching screenshot 2
    width: '52%',
    paddingVertical: 12,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.15,
    shadowRadius: 3,
  },
  nextButtonText: {
    color: '#1A1C29',
    fontSize: 16,
    fontWeight: '600',
    marginRight: 6,
  },
  arrowIcon: {
    color: '#1A1C29',
    fontSize: 16,
    fontWeight: '600',
  },
});
