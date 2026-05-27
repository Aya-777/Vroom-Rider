import React from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StatusBar,
} from 'react-native';

import {
  Shadows,
  Typography,
  Radius,
  Spacing,
} from '../../../core/theme/tokens';

import { useTheme } from '../../../core/theme/useTheme';

import BottomSheetCard from '../../../shared/components/ride/BottomSheetCard';
import Header from '../../../shared/components/ride/Header';
import { useNavigation, useRoute } from '@react-navigation/native';

// SVGs
import ClockIcon from '../../../assets/svg/schedule.svg';
import EstimatedPriceIcon from '../../../assets/svg/price.svg';
import CashIcon from '../../../assets/svg/cash.svg';
import CarIcon from '../../../assets/svg/car.svg';
import PhoneNumberIcon from '../../../assets/svg/phoneNumber.svg';
import SearchIcon from '../../../assets/svg/search.svg';

type RideRouteParams = {
  price?: string;
  time?: string;
  car?: string;
  payment?: string;
};

export default function RideConfirmationScreen() {
  const navigation = useNavigation<any>();
  const route = useRoute();

  const { colors, mode } = useTheme();

  const { price, time, car, payment } =
    (route.params as RideRouteParams) || {};

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={mode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

      <Header
        title="Ride Confirmation"
        onBackPress={() => navigation.goBack()}
      />

      <BottomSheetCard>
        {/* INFO GRID */}
        <View style={styles.grid}>
          <InfoBox
            colors={colors}
            icon={<ClockIcon width={16} height={16} fill={colors.primary} />}
            title="Time"
            value={time || 'N/A'}
          />

          <InfoBox
            colors={colors}
            icon={
              <EstimatedPriceIcon
                width={16}
                height={16}
                fill={colors.primary}
              />
            }
            title="Total Price"
            value={price || 'N/A'}
          />

          <InfoBox
            colors={colors}
            icon={<CarIcon width={16} height={16} fill={colors.primary} />}
            title="Selected Car"
            value={car || 'N/A'}
          />

          <InfoBox
            colors={colors}
            icon={<CashIcon width={16} height={16} fill={colors.primary} />}
            title="Payment"
            value={payment || 'N/A'}
          />
        </View>

        {/* CONTACT */}
        <View style={styles.contactSection}>
          <View style={styles.contactHeader}>
            <PhoneNumberIcon width={18} height={18} fill={colors.textPrimary} />
            <Text style={[styles.contactTitle, { color: colors.textPrimary }]}>
              Contact Number
            </Text>
          </View>

          <TextInput
            style={[
              styles.input,
              {
                backgroundColor: colors.surface,
                color: colors.textPrimary,
              },
            ]}
            placeholder="+963 935 916 399"
            placeholderTextColor={colors.textMuted}
          />
        </View>

        {/* BUTTON */}
        <TouchableOpacity
          style={[styles.button, { backgroundColor: colors.primary }]}
          onPress={() => navigation.navigate('DriverFound')}
        >
          <Text style={[styles.buttonText, { color: colors.background }]}>
            Find a Driver
          </Text>
          <SearchIcon width={18} height={18} fill={colors.background} />
        </TouchableOpacity>
      </BottomSheetCard>
    </View>
  );
}

/* ---------------- COMPONENT ---------------- */

const InfoBox = ({ icon, title, value, colors }: any) => {
  return (
    <View
      style={[
        styles.box,
        {
          backgroundColor: colors.surface,
        },
      ]}
    >
      <View style={styles.boxHeader}>
        {icon}
        <Text style={[styles.boxTitle, { color: colors.textPrimary }]}>
          {title}
        </Text>
      </View>

      <Text style={[styles.boxValue, { color: colors.textPrimary }]}>
        {value}
      </Text>

      <View
        style={[
          styles.line,
          { backgroundColor: colors.border },
        ]}
      />
    </View>
  );
};

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },

  box: {
    width: '48%',
    borderRadius: Radius.md,
    padding: Spacing.sm,
    marginBottom: Spacing.sm,
    ...Shadows.medium,
  },

  boxHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },

  boxTitle: {
    marginLeft: Spacing.xs,
    ...Typography.boldCaption,
  },

  boxValue: {
    ...Typography.semiBoldCaption,
    textAlign: 'center',
    marginVertical: Spacing.xs,
  },

  line: {
    height: 1,
    marginTop: Spacing.xs,
  },

  contactSection: {
    marginBottom: Spacing.lg,
  },

  contactHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },

  contactTitle: {
    marginLeft: Spacing.sm,
    ...Typography.semiBoldCaption,
  },

  input: {
    borderRadius: Radius.lg,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm,
    ...Shadows.small,
  },

  button: {
    flexDirection: 'row',
    borderRadius: Radius.full,
    paddingVertical: Spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    gap: Spacing.sm,
    ...Shadows.small,
  },

  buttonText: {
    ...Typography.semiBoldBody,
  },
});