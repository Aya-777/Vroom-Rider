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
import BottomSheetCard from '../../../shared/components/ride/BottomSheetCard';
import Header from '../../../shared/components/ride/Header';
import LinearBg from '../../../shared/components/LinearBg';
import { useNavigation, useRoute } from '@react-navigation/native'; 

// SVGs
import ClockIcon from '../../../assets/svg/schedule.svg';
import EstimatedPriceIcon from '../../../assets/svg/price.svg';
import CardIcon from '../../../assets/svg/creditcard.svg';
import CashIcon from '../../../assets/svg/cash.svg';
import FilterIcon from '../../../assets/svg/filters.svg';
import ArrowRightIcon from '../../../assets/svg/arrows/arrow.svg';
import CarIcon from '../../../assets/svg/car.svg';
import PhoneNumberIcon from '../../../assets/svg/phoneNumber.svg';

type RideRouteParams = {
  price?: string;
  time?: string;
};

export default function RideConfirmationScreen() {
  const navigation = useNavigation();
  const route = useRoute();
  
  // 4. Extract your parameters safely from route.params
  const { price, time } = (route.params as RideRouteParams) || {};

  return (
    <View style={styles.contentContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F4FA" translucent={false} />
      <Header
        title="Ride"
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
            <Text style={styles.infoBoxValue}></Text>
            <View style={styles.underline} />
          </View>

          <View style={styles.infoBox}>
            <View style={styles.infoTitleRow}>
              <CashIcon width={16} height={16} fill={Colors.textSecondary} />
              <Text style={styles.infoBoxTitle}>Payement</Text>
            </View>
            <Text style={styles.infoBoxValue}></Text>
            <View style={styles.underline} />
          </View>
        </View>

        <View style={styles.ContactNumberContainer}>
          <PhoneNumberIcon width={16} height={16} fill={Colors.primary} />
          <Text style={styles.contactNumberText}>Contact Number</Text>
        </View>
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
    ...Typography.semiBoldBody,
    color: '#1A1C29',
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
    flexDirection: 'row',
  },
  contactNumberText: {
    marginLeft: 10,
    ...Typography.caption
  },
  nextButton: {
    flexDirection: 'row',
    backgroundColor: '#443366',
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
});
