import React from 'react';
import { View, StatusBar, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../../../core/theme/useTheme';
import BottomSheetCard from '../../../shared/components/ride/BottomSheetCard';
import Header from '../../../shared/components/ride/Header';
import { HomeStackScreenProps } from '../../../navigation/main/home/homeTypes';
import RideDropdown from '../components/shared/RideDropdown';
import RideLocationInputs from '../components/SelectRideScreen/RideLocationInputs';
import RideActionButton from '../components/SelectRideScreen/RideActionButton';
import RideNextButton from '../components/shared/RideNextButton';
import { useSelectRide } from '../hooks/useSelectRide';
import { createStyles } from '../styles/selectRide.styles';
import ProfileIcon from '../../../assets/svg/profile/profile.svg';
import ScheduleIcon from '../../../assets/svg/common/schedule.svg';
import PinIcon from '../../../assets/svg/common/pin.svg';
import StarIcon from '../../../assets/svg/common/star.svg';

export default function SelectRideScreen() {
  const navigation =
    useNavigation<HomeStackScreenProps<'SelectRide'>['navigation']>();

  const { colors, mode } = useTheme();
  const styles = createStyles(colors);

  const {
    isNowDropdownOpen,
    isForMeDropdownOpen,
    selectedPerson,
    selectedTime,
    fromLocation,
    toLocation,

    setIsNowDropdownOpen,
    setIsForMeDropdownOpen,
    setSelectedPerson,
    setSelectedTime,
    setFromLocation,
    setToLocation,
  } = useSelectRide();

  const handleNextPress = () => {
    if (!fromLocation.trim() || !toLocation.trim()) {
      Alert.alert(
        'Missing Information',
        'Please fill in both pickup and destination locations.',
      );
      return;
    }

    navigation.navigate('RideDetails', {
      pickupLocation: fromLocation,
      dropoffLocation: toLocation,
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />

      <Header
        title="Ride"
        onBackPress={() => navigation.goBack()}
      />

      <BottomSheetCard>
        <View style={styles.dropdownRow}>
          <RideDropdown
            icon={<ScheduleIcon fill={colors.primary} />}
            value={selectedTime}
            isOpen={isNowDropdownOpen}
            items={['Now', 'Schedule']}
            onToggle={() =>
              setIsNowDropdownOpen(!isNowDropdownOpen)
            }
            onSelect={item => {
              setSelectedTime(item);
              setIsNowDropdownOpen(false);
            }}
          />

          <RideDropdown
            icon={<ProfileIcon fill={colors.primary} />}
            value={selectedPerson}
            isOpen={isForMeDropdownOpen}
            items={['For me', 'Other Contact']}
            onToggle={() =>
              setIsForMeDropdownOpen(!isForMeDropdownOpen)
            }
            onSelect={item => {
              setSelectedPerson(item);
              setIsForMeDropdownOpen(false);
            }}
          />
        </View>

        <RideLocationInputs
          fromLocation={fromLocation}
          toLocation={toLocation}
          onChangeFrom={setFromLocation}
          onChangeTo={setToLocation}
        />

        <View style={styles.actionRow}>
          <RideActionButton
            icon={<PinIcon fill={colors.textSecondary} />}
            title="Set on map"
          />

          <RideActionButton
            icon={<StarIcon fill={colors.textSecondary} />}
            title="Saved places"
          />
        </View>

        <RideNextButton onPress={handleNextPress} />
      </BottomSheetCard>
    </View>
  );
}