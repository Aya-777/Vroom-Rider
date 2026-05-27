import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  TextInput,
  // Dimensions,
  StatusBar,
  Alert,
} from 'react-native';

import { useNavigation } from '@react-navigation/native';

import {
  Shadows,
} from '../../../core/theme/tokens';

import { useTheme } from '../../../core/theme/useTheme';

import BottomSheetCard from '../../../shared/components/ride/BottomSheetCard';
import Header from '../../../shared/components/ride/Header';

// SVGs
import ProfileIcon from '../../../assets/svg/profile.svg';
import ScheduleIcon from '../../../assets/svg/schedule.svg';
import PinIcon from '../../../assets/svg/pin.svg';
import StarIcon from '../../../assets/svg/star.svg';
import DropDownArrowIcon from '../../../assets/svg/arrows/dropdownArrow.svg';
import ArrowIcon from '../../../assets/svg/arrows/arrow.svg';
import ArrowUp from '../../../assets/svg/arrows/arrowUp.svg';
import { HomeStackScreenProps } from '../../../navigation/main/home/homeTypes';

// const { height } = Dimensions.get('window');

export default function SelectRideScreen() {
  const navigation = useNavigation<HomeStackScreenProps<'SelectRide'>['navigation']>();
  const { colors, mode } = useTheme();

  const [isNowDropdownOpen, setIsNowDropdownOpen] = useState(false);
  const [isForMeDropdownOpen, setIsForMeDropdownOpen] = useState(false);
  const [selectedPerson, setSelectedPerson] = useState('For me');
  const [selectedTime, setSelectedTime] = useState('Now');

  const [fromLocation, setFromLocation] = useState('');
  const [toLocation, setToLocation] = useState('');

  const handleNextPress = () => {
    if (!fromLocation.trim() || !toLocation.trim()) {
      Alert.alert(
        'Missing Information',
        'Please fill in both pickup and destination locations.',
      );
      return;
    }

    navigation.navigate('RideDetails',{
      pickupLocation: fromLocation,
      dropoffLocation: toLocation
    });
  };

  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <StatusBar barStyle={mode === 'dark' ? 'light-content' : 'dark-content'} backgroundColor={colors.background} />

      <Header title="Ride" onBackPress={() => navigation.goBack()} />

      <BottomSheetCard>
        {/* DROPDOWNS */}
        <View style={styles.dropdownRow}>
          {/* TIME */}
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={[
                styles.dropdown,
                { backgroundColor: colors.surface },
              ]}
              onPress={() => setIsNowDropdownOpen(!isNowDropdownOpen)}
            >
              <ScheduleIcon fill={colors.primary} />
              <Text style={[styles.dropdownText, { color: colors.textPrimary }]}>
                {selectedTime}
              </Text>
              {isNowDropdownOpen ? (
                <ArrowUp fill={colors.primary} />
              ) : (
                <DropDownArrowIcon fill={colors.primary} />
              )}
            </TouchableOpacity>

            {isNowDropdownOpen && (
              <View
                style={[
                  styles.dropdownMenu,
                  { backgroundColor: colors.surface },
                ]}
              >
                {['Now', 'Schedule'].map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={styles.menuItem}
                    onPress={() => {
                      setSelectedTime(item);
                      setIsNowDropdownOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.menuItemText,
                        {
                          color:
                            selectedTime === item
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

          {/* PERSON */}
          <View style={styles.dropdownContainer}>
            <TouchableOpacity
              style={[
                styles.dropdown,
                { backgroundColor: colors.surface },
              ]}
              onPress={() =>
                setIsForMeDropdownOpen(!isForMeDropdownOpen)
              }
            >
              <ProfileIcon fill={colors.primary} />
              <Text style={[styles.dropdownText, { color: colors.textPrimary }]}>
                {selectedPerson}
              </Text>
              {isForMeDropdownOpen ? (
                <ArrowUp fill={colors.primary} />
              ) : (
                <DropDownArrowIcon fill={colors.primary} />
              )}
            </TouchableOpacity>

            {isForMeDropdownOpen && (
              <View
                style={[
                  styles.dropdownMenu,
                  { backgroundColor: colors.surface },
                ]}
              >
                {['For me', 'Other Contact'].map((item) => (
                  <TouchableOpacity
                    key={item}
                    style={styles.menuItem}
                    onPress={() => {
                      setSelectedPerson(item);
                      setIsForMeDropdownOpen(false);
                    }}
                  >
                    <Text
                      style={[
                        styles.menuItemText,
                        {
                          color:
                            selectedPerson === item
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
        </View>

        {/* INPUTS */}
        <View
          style={[
            styles.inputCard,
            { backgroundColor: colors.surface },
          ]}
        >
          <View style={styles.inputTimeline}>
            <View
              style={[
                styles.timelineDot,
                { backgroundColor: colors.border },
              ]}
            />
            <View
              style={[
                styles.timelineLine,
                { backgroundColor: colors.border },
              ]}
            />
            <View
              style={[
                styles.timelineDot,
                { backgroundColor: colors.border },
              ]}
            />
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input, { color: colors.textPrimary }]}
              placeholder="From"
              placeholderTextColor={colors.textMuted}
              onChangeText={setFromLocation}
            />

            <View style={[styles.divider, { backgroundColor: colors.border }]} />

            <TextInput
              style={[styles.input, { color: colors.textPrimary }]}
              placeholder="To?"
              placeholderTextColor={colors.textMuted}
              onChangeText={setToLocation}
            />
          </View>
        </View>

        {/* ACTIONS */}
        <View style={styles.actionRow}>
          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: colors.surface },
            ]}
          >
            <PinIcon fill={colors.textSecondary} />
            <Text
              style={[
                styles.actionButtonText,
                { color: colors.textSecondary },
              ]}
            >
              Set on map
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[
              styles.actionButton,
              { backgroundColor: colors.surface },
            ]}
          >
            <StarIcon fill={colors.textSecondary} />
            <Text
              style={[
                styles.actionButtonText,
                { color: colors.textSecondary },
              ]}
            >
              Saved places
            </Text>
          </TouchableOpacity>
        </View>

        {/* NEXT */}
        <TouchableOpacity
          style={[
            styles.nextButton,
            { backgroundColor: colors.primary },
          ]}
          onPress={handleNextPress}
        >
          <Text
            style={[
              styles.nextButtonText,
              { color: colors.background },
            ]}
          >
            Next
          </Text>
          <ArrowIcon fill={colors.background} />
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

  dropdownRow: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 16,
  },

  dropdownContainer: {
    zIndex: 10,
  },

  dropdown: {
    flexDirection: 'row',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 20,
    alignItems: 'center',
    marginHorizontal: 6,
  },

  dropdownText: {
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 6,
    marginRight: 6,
  },

  dropdownMenu: {
    position: 'absolute',
    top: 42,
    left: 6,
    borderRadius: 12,
    width: 140,
    elevation: 5,
    paddingVertical: 4,
  },

  menuItem: {
    paddingVertical: 12,
    alignItems: 'center',
  },

  menuItemText: {
    fontSize: 14,
    fontWeight: '500',
  },

  inputCard: {
    width: '100%',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    ...Shadows.small,
  },

  inputTimeline: {
    width: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 10,
  },

  timelineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  timelineLine: {
    flex: 1,
    width: 2,
  },

  inputContainer: {
    flex: 1,
    marginLeft: 10,
  },

  input: {
    height: 35,
    fontSize: 15,
  },

  divider: {
    height: 1,
    marginVertical: 4,
  },

  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
    marginBottom: 20,
  },

  actionButton: {
    flexDirection: 'row',
    width: '48%',
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  actionButtonText: {
    fontWeight: '600',
    fontSize: 14,
    marginLeft: 6,
  },

  nextButton: {
    flexDirection: 'row',
    width: '50%',
    paddingVertical: 14,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },

  nextButtonText: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 5,
  },
});