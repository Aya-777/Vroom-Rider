import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  StatusBar,
  Image,
  TouchableOpacity,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import { useTheme } from '../../../core/theme/useTheme';
import { Typography, Spacing, Radius, Shadows } from '../../../core/theme/tokens';

import BottomSheetCard from '../../../shared/components/ride/BottomSheetCard';
import Header from '../../../shared/components/ride/Header';

// SVGs
import CarIcon from '../../../assets/svg/car.svg';
import PhoneNumberIcon from '../../../assets/svg/phoneNumber.svg';
import MessageIcon from '../../../assets/svg/chat.svg';
import WhatsAppIcon from '../../../assets/svg/whatsapp.svg';

export default function RideConfirmationScreen() {
  const navigation = useNavigation<any>();
  const { colors, mode } = useTheme();

  const driverData = {
    name: 'Alex Driver',
    avatar:
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
    statusMessage: 'Your driver is on his way to you. 💜',
    car: {
      model: 'Mercedes-Benz S-Class',
      color: 'Silver',
      plate: 'NY-772-DX',
    },
  };

  return (
    <View style={[styles.contentContainer, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={mode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

      <Header
        title="Track your trip"
        onBackPress={() => navigation.goBack()}
      />

      <BottomSheetCard>
        <View style={[styles.handleBar, { backgroundColor: colors.border }]} />

        <Text style={[styles.statusText, { color: colors.textPrimary }]}>
          {driverData.statusMessage}
        </Text>

        <View style={[styles.avatarContainer, { backgroundColor: colors.surface }]}>
          <Image source={{ uri: driverData.avatar }} style={styles.avatarImage} />
        </View>

        <Text style={[styles.driverName, { color: colors.textPrimary }]}>
          {driverData.name}
        </Text>

        <View style={styles.communicationRow}>
          <TouchableOpacity style={styles.iconButton}>
            <PhoneNumberIcon width={24} height={24} fill={colors.textPrimary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <MessageIcon width={24} height={24} fill={colors.textPrimary} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.iconButton}>
            <WhatsAppIcon width={24} height={24} fill={colors.primary} />
          </TouchableOpacity>
        </View>

        <View style={styles.progressContainer}>
          <View style={[styles.trackLine, { backgroundColor: colors.border }]} />
        </View>

        <View style={[styles.carDetailsCard, { backgroundColor: colors.primary }]}>
          <View style={styles.carIconContainer}>
            <CarIcon width={24} height={24} fill={colors.surface} />
          </View>

          <View style={styles.carInfoTextDetails}>
            <Text style={[styles.carDetailsTitle, { color: colors.surface }]}>
              CAR DETAILS
            </Text>

            <Text style={[styles.carModelText, { color: colors.surface }]}>
              {driverData.car.model}
            </Text>

            <View style={styles.plateRow}>
              <Text style={[styles.carColorText, { color: colors.surface }]}>
                {driverData.car.color}
              </Text>

              <View style={styles.bulletSeparator} />

              <View style={styles.plateContainer}>
                <Text style={[styles.plateText, { color: colors.surface }]}>
                  {driverData.car.plate}
                </Text>
              </View>
            </View>
          </View>
        </View>

      </BottomSheetCard>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  contentContainer: {
    flex: 1,
  },

  handleBar: {
    width: 40,
    height: 4,
    borderRadius: Radius.full,
    alignSelf: 'center',
    marginBottom: Spacing.md,
  },

  statusText: {
    ...Typography.semiBoldBody,
    textAlign: 'center',
    marginBottom: Spacing.lg,
  },

  avatarContainer: {
    width: 84,
    height: 84,
    borderRadius: 42,
    overflow: 'hidden',
    alignSelf: 'center',
    marginBottom: Spacing.sm,
    ...Shadows.small,
  },

  avatarImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },

  driverName: {
    ...Typography.h2,
    textAlign: 'center',
    marginBottom: Spacing.md,
  },

  communicationRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.lg,
    marginBottom: Spacing.lg,
  },

  iconButton: {
    padding: Spacing.xs,
  },

  progressContainer: {
    width: '100%',
    height: 20,
    justifyContent: 'center',
    marginBottom: Spacing.md,
  },

  trackLine: {
    width: '100%',
    height: 2,
  },

  carDetailsCard: {
    borderRadius: Radius.lg,
    padding: Spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    ...Shadows.medium,
  },

  carIconContainer: {
    width: 44,
    height: 44,
    borderRadius: Radius.sm,
    backgroundColor: 'rgba(255,255,255,0.15)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },

  carInfoTextDetails: {
    flex: 1,
  },

  carDetailsTitle: {
    ...Typography.semiBoldCaption,
    marginBottom: 4,
  },

  carModelText: {
    ...Typography.semiBoldBody,
    marginBottom: 6,
  },

  plateRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  carColorText: {
    ...Typography.caption,
    opacity: 0.8,
  },

  bulletSeparator: {
    width: 4,
    height: 4,
    borderRadius: 2,
    marginHorizontal: 8,
    opacity: 0.7,
    backgroundColor: '#fff',
  },

  plateContainer: {
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.25)',
    borderRadius: Radius.sm,
    paddingHorizontal: 8,
    paddingVertical: 2,
  },

  plateText: {
    fontSize: 13,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
});