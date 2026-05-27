import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  StatusBar,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

import {
  Shadows,
  Typography,
  Spacing,
  Radius,
} from '../../../core/theme/tokens';

import { useTheme } from '../../../core/theme/useTheme';

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

interface VehicleOption {
  id: string;
  type_name: string;
  image: any;
}

const VEHICLE_DATA: VehicleOption[] = [
  { id: 'economy', type_name: 'Economy', image: 'car' },
  { id: 'comfort', type_name: 'Comfort', image: 'car' },
  { id: 'xl', type_name: 'XL', image: 'car' },
];

interface Props {
  timeEstimate?: string;
  priceEstimate?: string;
}

export default function ExtraDetailsScreen({
  timeEstimate = '30:00 m',
  priceEstimate = '$24.50',
}: Props) {
  const navigation = useNavigation<any>();
  const { colors, mode } = useTheme();

  const [selectedVehicle, setSelectedVehicle] = useState('Economy');
  const [selectedPayment, setSelectedPayment] = useState('Cash');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={mode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

      <Header title="Ride" onBackPress={() => navigation.goBack()} />

      <BottomSheetCard>
        {/* TIME & PRICE */}
        <View style={styles.infoRow}>
          <View style={[styles.infoBox, { backgroundColor: colors.surface }]}>
            <View style={styles.infoTitleRow}>
              <ClockIcon width={16} height={16} fill={colors.primary} />
              <Text style={[styles.infoTitle, { color: colors.textPrimary }]}>
                Time
              </Text>
            </View>

            <Text style={[styles.infoValue, { color: colors.textPrimary }]}>
              {timeEstimate}
            </Text>
            <View style={[styles.line, { backgroundColor: colors.border }]} />
          </View>

          <View style={[styles.infoBox, { backgroundColor: colors.surface }]}>
            <View style={styles.infoTitleRow}>
              <EstimatedPriceIcon width={16} height={16} fill={colors.primary} />
              <Text style={[styles.infoTitle, { color: colors.textPrimary }]}>
                Estimated
              </Text>
            </View>

            <Text style={[styles.infoValue, { color: colors.textPrimary }]}>
              {priceEstimate}
            </Text>
            <View style={[styles.line, { backgroundColor: colors.border }]} />
          </View>
        </View>

        {/* FILTER + PAYMENT */}
        <View style={styles.row}>
          <LinearBg style={styles.actionBtn}>
            <FilterIcon width={18} height={18} fill={colors.primary} />
            <Text style={[styles.actionText, { color: colors.primary }]}>
              Filters
            </Text>
          </LinearBg>

          <LinearBg style={styles.actionBtn}>
            <TouchableOpacity
              style={styles.dropdown}
              onPress={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <Text style={[styles.dropdownText, { color: colors.textPrimary }]}>
                {selectedPayment}
              </Text>

              {isDropdownOpen ? (
                <ArrowUp fill={colors.primary} />
              ) : (
                <DropDownArrowIcon fill={colors.primary} />
              )}
            </TouchableOpacity>

            {isDropdownOpen && (
              <View style={[styles.dropdownMenu, { backgroundColor: colors.surface }]}>
                {['Cash', 'Wallet'].map((item, index) => (
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
                        styles.menuText,
                        { color: colors.textSecondary },
                        selectedPayment === item && { color: colors.primary },
                      ]}
                    >
                      {item}
                    </Text>

                    {index === 0 && (
                      <View style={[styles.divider, { backgroundColor: colors.border }]} />
                    )}
                  </TouchableOpacity>
                ))}
              </View>
            )}
          </LinearBg>
        </View>

        {/* VEHICLES */}
        <Text style={[styles.sectionTitle, { color: colors.textSecondary }]}>
          SELECT VEHICLE
        </Text>

        <View style={styles.vehicleRow}>
          {VEHICLE_DATA.map((v) => {
            const active = selectedVehicle === v.type_name;

            return (
              <TouchableOpacity
                key={v.id}
                style={[
                  styles.vehicleCard,
                  { backgroundColor: colors.surface },
                  active && { borderColor: colors.primary },
                ]}
                onPress={() => setSelectedVehicle(v.type_name)}
              >
                <Image
                  source={v.image}
                  style={styles.vehicleImage}
                  resizeMode="contain"
                />

                <Text
                  style={[
                    styles.vehicleText,
                    { color: colors.textMuted },
                    active && { color: colors.primary },
                  ]}
                >
                  {v.type_name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>

        {/* NEXT */}
        <TouchableOpacity
          style={[styles.nextButton, { backgroundColor: colors.primary }]}
          onPress={() =>
            navigation.navigate('ConfirmRide', {
              price: priceEstimate,
              time: timeEstimate,
              car: selectedVehicle,
              payment: selectedPayment,
            })
          }
        >
          <Text style={[styles.nextText, { color: colors.background }]}>
            Next
          </Text>
          <ArrowRightIcon fill={colors.background} />
        </TouchableOpacity>
      </BottomSheetCard>
    </View>
  );
}

/* ---------------- STYLES ---------------- */

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },

  infoBox: {
    flex: 1,
    borderRadius: Radius.md,
    padding: Spacing.sm,
    marginHorizontal: 4,
    ...Shadows.medium,
  },

  infoTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },

  infoTitle: {
    ...Typography.boldCaption,
    marginLeft: 6,
  },

  infoValue: {
    ...Typography.semiBoldBody,
    textAlign: 'center',
    marginVertical: 4,
  },

  line: {
    height: 1,
    marginTop: 4,
  },

  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.md,
  },

  actionBtn: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 4,
    borderRadius: Radius.md,
    paddingVertical: Spacing.sm,
    ...Shadows.small,
  },

  actionText: {
    marginLeft: 6,
    ...Typography.semiBoldCaption,
  },

  sectionTitle: {
    ...Typography.boldCaption,
    marginBottom: Spacing.sm,
  },

  vehicleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.lg,
  },

  vehicleCard: {
    flex: 1,
    marginHorizontal: 4,
    borderRadius: Radius.md,
    alignItems: 'center',
    padding: Spacing.sm,
    borderWidth: 1,
    borderColor: 'transparent',
    ...Shadows.small,
  },

  vehicleImage: {
    width: 50,
    height: 35,
    marginBottom: 6,
  },

  vehicleText: {
    ...Typography.caption,
  },

  nextButton: {
    flexDirection: 'row',
    alignSelf: 'center',
    paddingHorizontal: 28,
    paddingVertical: 12,
    borderRadius: Radius.full,
    alignItems: 'center',
    ...Shadows.small,
  },

  nextText: {
    marginRight: 6,
    ...Typography.semiBoldBody,
  },

  dropdown: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  dropdownText: {
    marginRight: 6,
    ...Typography.semiBoldCaption,
  },

  dropdownMenu: {
    position: 'absolute',
    top: 45,
    borderRadius: Radius.md,
    width: 120,
    ...Shadows.small,
    zIndex: 100,
  },

  menuItem: {
    padding: Spacing.sm,
    alignItems: 'center',
  },

  menuText: {
    ...Typography.semiBoldCaption,
  },

  divider: {
    height: 1,
    marginVertical: 4,
  },
});