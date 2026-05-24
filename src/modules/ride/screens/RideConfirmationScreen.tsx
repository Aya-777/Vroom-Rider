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
import { Colors, Shadows, Typography, Radius, Spacing } from '../../../core/theme';
import BottomSheetCard from '../../../shared/components/ride/BottomSheetCard';
import Header from '../../../shared/components/ride/Header';
import { useNavigation, useRoute } from '@react-navigation/native'; 

// SVGs
import ClockIcon from '../../../assets/svg/schedule.svg';
import EstimatedPriceIcon from '../../../assets/svg/price.svg';
import CashIcon from '../../../assets/svg/cash.svg';
import ArrowRightIcon from '../../../assets/svg/arrows/arrow.svg';
import CarIcon from '../../../assets/svg/car.svg';
import PhoneNumberIcon from '../../../assets/svg/phoneNumber.svg';
import SearchIcon from '../../../assets/svg/search.svg';

type RideRouteParams = {
  price?: string;
  time?: string;
  car?: string;
  payement?: string;
};

export default function RideConfirmationScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  
  // Extract your parameters safely 
  const { price, time, car, payement } = (route.params as RideRouteParams) || {};
  return (
    <View style={styles.contentContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F4FA" translucent={false} />
      <Header
        title="Ride Confirmation"
        onBackPress={() => { navigation.goBack(); }}
      />
      {/* MAP VIEW COMPONENT */}
      <BottomSheetCard>
        <View style={styles.gridContainer}>
          <View style={styles.infoBox}>
            <View style={styles.infoTitleRow}>
              <ClockIcon width={16} height={16} fill={Colors.textSecondary} />
              <Text style={styles.infoBoxTitle}>Time</Text>
            </View>
            <Text style={styles.infoBoxValue}>{time || 'N/A'}</Text>
            <View style={styles.underline} />
          </View>

          <View style={styles.infoBox}>
            <View style={styles.infoTitleRow}>
              <EstimatedPriceIcon width={16} height={16} fill={Colors.textSecondary} />
              <Text style={styles.infoBoxTitle}>Total Price</Text>
            </View>
            <Text style={styles.infoBoxValue}>{price || 'N/A'}</Text>
            <View style={styles.underline} />
          </View>

          <View style={styles.infoBox}>
            <View style={styles.infoTitleRow}>
              <CarIcon width={16} height={16} fill={Colors.textSecondary} />
              <Text style={styles.infoBoxTitle}>Selected Car</Text>
            </View>
            <Text style={styles.infoBoxValue}>{car}</Text>
            <View style={styles.underline} />
          </View>

          <View style={styles.infoBox}>
            <View style={styles.infoTitleRow}>
              <CashIcon width={16} height={16} fill={Colors.textSecondary} />
              <Text style={styles.infoBoxTitle}>Payement</Text>
            </View>
            <Text style={styles.infoBoxValue}>{payement}</Text>
            <View style={styles.underline} />
          </View>
        </View>

        <View style={styles.ContactNumberContainer}>
          <View style={styles.ContactTitleContainer}>
            <PhoneNumberIcon width={18} height={18} fill={Colors.textPrimary} />
            <Text style={styles.contactNumberText}>Contact Number</Text>
          </View>
          <TextInput 
            style={styles.input} 
            placeholder="  +963 935916399" 
            placeholderTextColor="#C0BCC7"  
          />
        </View>
        
        {/* Find BUTTON */}
        <TouchableOpacity 
          style={styles.findButton} 
          onPress={() => {}}  
        >
          <Text style={styles.findButtonText}>Find a Driver</Text>
          <SearchIcon fill={Colors.background}/>
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
  gridContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 50,    
    flexWrap: 'wrap',
  },
  infoBox: {
    backgroundColor: Colors.surface,
    width: '48%',
    borderRadius: 12,
    paddingTop: 12,
    paddingHorizontal: 14,
    paddingBottom: 6,
    marginBottom: 15,
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
    ...Typography.semiBoldCaption,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginVertical: 4,
  },
  underline: {
    height: 1,
    backgroundColor: '#EAE6F8',
    width: '100%',
    marginTop: -4,
  },
  ContactNumberContainer: {
  },
  ContactTitleContainer:{
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
  },
  contactNumberText: {
    color: Colors.textPrimary,
    marginLeft: 10,
    ...Typography.semiBoldCaption
  },
  input: {
    height: 35,
    width: 300,
    fontSize: 15,
    backgroundColor: Colors.background,
    padding: 0,
    borderRadius: Radius.lg,
    marginTop: Spacing.sm,
    marginBottom: Spacing.xxl,
    ...Shadows.small,
  },
  findButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    width: '70%',
    paddingVertical: 14,
    borderRadius: Radius.full,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.small,
    marginBottom: Spacing.xl,
  },
  findButtonText: {
    ...Typography.semiBoldBody,
    marginRight: 6,
    marginBottom: 4,
    color: Colors.background,
  },
});
