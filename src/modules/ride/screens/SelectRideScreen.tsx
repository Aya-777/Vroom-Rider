  import React from 'react';
  import { View, StatusBar } from 'react-native';

  import { useTheme } from '../../../core/theme/useTheme';

  import BottomSheetCard from '../../../shared/components/ride/BottomSheetCard';
  import Header from '../../../shared/components/ride/Header';

  import RideDropdown from '../components/RideDropdown';
  import RideLocationInputs from '../components/RideLocationInputs';
  import RideActionButton from '../components/RideActionButton';
  import RideNextButton from '../components/RideNextButton';

  import { useSelectRideViewModel } from '../viewmodels/useSelectRideViewModel';
  import { useSelectRide } from '../hooks/useSelectRide';

  import { createStyles } from '../styles/selectRide.styles';

  // SVGs
  import ProfileIcon from '../../../assets/svg/profile/profile.svg';
  import ScheduleIcon from '../../../assets/svg/common/schedule.svg';
  import PinIcon from '../../../assets/svg/common/pin.svg';
  import StarIcon from '../../../assets/svg/common/star.svg';


  export default function SelectRideScreen() {
    
    const { colors, mode } = useTheme();
    const styles = createStyles(colors);
    
    const {
      isNowDropdownOpen,
      isForMeDropdownOpen,
      selectedPerson,
      selectedTime,
      fromLocation,
      toLocation,
      errors,
      
      setIsNowDropdownOpen,
      setIsForMeDropdownOpen,
      setSelectedPerson,
      setSelectedTime,
      setFromLocation,
      setToLocation,
      
      validate,
    } = useSelectRideViewModel();
    const {handleNextPress, handleBackPress} = useSelectRide(fromLocation, toLocation);

    const onNextPress = () => {
      if (validate()) {
        handleNextPress();
      }
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
          onBackPress={handleBackPress}
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
            errors={errors}
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

          <RideNextButton onPress={onNextPress} />
        </BottomSheetCard>
      </View>
    );
  }