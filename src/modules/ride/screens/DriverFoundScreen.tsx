import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import { Colors, Shadows, Typography } from '../../../core/theme';
import BottomSheetCard from '../../../shared/components/ride/BottomSheetCard';
import Header from '../../../shared/components/ride/Header';
import { useNavigation, useRoute } from '@react-navigation/native'; 
import { HomeStackScreenProps } from '../../../navigation/main/home/homeTypes';

// SVGs
import CarIcon from '../../../assets/svg/car.svg';
import PhoneNumberIcon from '../../../assets/svg/phoneNumber.svg';
import MessageIcon from '../../../assets/svg/chat.svg';
import WhatsAppIcon from '../../../assets/svg/whatsapp.svg'; 

export default function RideConfirmationScreen() {
  const route = useRoute();
  const navigation = useNavigation<HomeStackScreenProps<'DriverFound'>['navigation']>();

  // Example mock data for the driver and car (can be fetched via route.params later)
  const driverData = {
    name: 'Alex Driver',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80', // Replace with dynamic image require or URI
    statusMessage: 'Your driver is on his way to you. 💜',
    car: {
      model: 'Mercedes-Benz S-Class',
      color: 'Silver',
      plate: 'NY-772-DX',
    }
  };

  return (
    <View style={styles.contentContainer}>
      <StatusBar barStyle="dark-content" backgroundColor="#F5F4FA" translucent={false} />
      <Header
        title="Track your trip"
        onBackPress={() => { navigation.goBack(); }}
      />
      
      {/* Background map view placeholder element goes here */}

      <BottomSheetCard>
        {/* Top Handle bar line */}
        <View style={styles.handleBar} />

        {/* Status Message */}
        <Text style={styles.statusText}>{driverData.statusMessage}</Text>

        {/* Driver Profile Image */}
        <View style={styles.avatarContainer}>
          {/* If using a local asset, replace source={{ uri: ... }} with source={require('path')} */}
          <Image source={{ uri: driverData.avatar }} style={styles.avatarImage} />
        </View>

        {/* Driver Name */}
        <Text style={styles.driverName}>{driverData.name}</Text>

        {/* Action Communication Buttons */}
        <View style={styles.communicationRow}>
          <TouchableOpacity style={styles.iconButton}>
            <PhoneNumberIcon width={24} height={24} fill="#2E2344" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <MessageIcon width={24} height={24} fill="#2E2344" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton}>
            <WhatsAppIcon width={24} height={24} fill={Colors.primary} />
          </TouchableOpacity>
        </View>

        {/* Progress Slider Line Indicator */}
        <View style={styles.progressContainer}>
          <View style={styles.trackLine} />
          {/* <View style={styles.progressDot} /> */}
        </View>

        {/* Car Details Card Box */}
        <View style={styles.carDetailsCard}>
          <View style={styles.carIconContainer}>
            <CarIcon width={24} height={24} fill="#FFFFFF" />
          </View>
          <View style={styles.carInfoTextDetails}>
            <Text style={styles.carDetailsTitle}>CAR DETAILS</Text>
            <Text style={styles.carModelText}>{driverData.car.model}</Text>
            <View style={styles.plateRow}>
              <Text style={styles.carColorText}>{driverData.car.color}</Text>
              <View style={styles.bulletSeparator} />
              <View style={styles.plateContainer}>
                <Text style={styles.plateText}>{driverData.car.plate}</Text>
              </View>
            </View>
          </View>
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
  handleBar: {
    width: 38,
    height: 4,
    backgroundColor: '#C5B6E2',
    borderRadius: 2,
    alignSelf: 'center',
    marginBottom: 20,
  },
  statusText: {
    ...Typography.semiBoldBody,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    width: 84,
    height: 84,
    borderRadius: 42,
    overflow: 'hidden',
    alignSelf: 'center',
    backgroundColor: '#E2DDF4',
    marginBottom: 12,
    ...Shadows.small,
  },
  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  driverName: {
    ...Typography.h2,
    color: Colors.textPrimary,
    textAlign: 'center',
    marginBottom: 14,
  },
  communicationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    gap: 28,
    marginBottom: 24,
  },
  iconButton: {
    padding: 4,
  },
  progressContainer: {
    width: '100%',
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  trackLine: {
    width: '100%',
    height: 2,
    backgroundColor: Colors.lightAccent,
    position: 'absolute',
  },
  progressDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2E2344',
    borderWidth: 2,
    borderColor: '#FFFFFF',
    position: 'absolute',
    left: '65%', // Adjust position percentage dynamically depending on trip calculation
    transform: [{ translateX: -5 }],
    ...Shadows.small,
  },
  carDetailsCard: {
    backgroundColor: Colors.primary,
    width: '100%',
    borderRadius: 18,
    padding: 18,
    flexDirection: 'row',
    alignItems: 'center',
    ...Shadows.medium,
  },
  carIconContainer: {
    width: 44,
    height: 44,
    borderRadius: 10,
    backgroundColor: 'rgba(255,255,255,0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  carInfoTextDetails: {
    flex: 1,
  },
  carDetailsTitle: {
    ...Typography.semiBoldCaption,
    color: Colors.lightAccent,
    letterSpacing: 1.2,
    marginBottom: 4,
  },
  carModelText: {
    ...Typography.semiBoldBody,
    color: Colors.surface,
    marginBottom: 6,
  },
  plateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  carColorText: {
    ...Typography.caption,
    color: Colors.lightAccent,
    marginBottom: 4,
  },
  bulletSeparator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: Colors.lightAccent,
    marginHorizontal: 8,
  },
  plateContainer: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },
  plateText: {
    fontSize: 13,
    fontWeight: '700',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
});