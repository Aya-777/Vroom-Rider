import React, { useCallback, useMemo } from 'react';
import { useSelectRideViewModel } from '../../viewmodels/useSelectRideViewModel';
import { BaseBottomSheet } from '../../../../shared/components/BaseBottomSheet';
import RideDropdown from '../../components/shared/RideDropdown';
import RideLocationInputs from '../../components/SelectRideScreen/RideLocationInputs';
import ActionButton from '../../../../shared/components/ActionButton';
import ProfileIcon from '../../../../assets/svg/profile/profile.svg';
import ScheduleIcon from '../../../../assets/svg/common/schedule.svg';
import PinIcon from '../../../../assets/svg/common/pin.svg';
import StarIcon from '../../../../assets/svg/common/star.svg';
import ArrowRight from '../../../../assets/svg/arrows/arrow.svg';
import PhoneNumberIcon from '../../../../assets/svg/contact/call.svg';
import { useTheme } from '../../../../core/theme/useTheme';
import { createStyles } from '../../styles/selectRide.styles';
import { useTranslation } from 'react-i18next';
import { Alert, Text, TextInput, View } from 'react-native';
import {SavedPlacesModal} from '../SavedPlaces/SavedPlacesModal';
import { Location } from '../../../../core/services/location/LocationService';

type Props = {
  onNextPress: () => void;
  currentLocation: Location;
};

export default function SelectRideSheet({
  onNextPress,
  currentLocation,
}: Props) {
  const { colors, mode } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['selectRide', 'common']);

  const showAlert = useCallback((title: string, msg: string) => {
    Alert.alert(title, msg);
  }, []);

  const {
    isNowDropdownOpen,
    isForMeDropdownOpen,
    selectedPerson,
    selectedTime,
    fromLocation,
    toLocation,
    errors,
    savedPlaces,
    savedPlacesLoading,
    
    isModalVisible,

    setIsNowDropdownOpen,
    setIsForMeDropdownOpen,
    setSelectedPerson,
    setSelectedTime,
    setFromLocation,
    setToLocation,

    validate,
    updateRideDetails,
    handleFlipModal,
    onAddPlacePress
  } = useSelectRideViewModel(showAlert, currentLocation);

  const personItems = [
    { key: 'forMe', label: t('selectRide:forMe'), value: true },
    { key: 'otherContact', label: t('selectRide:otherContact'), value: false },
  ];

  const timeItems = [
    { key: 'now', label: t('common:now') },
    { key: 'schedule', label: t('common:schedule') },
  ];

  const handleNextPress = () => {
    if (!validate()) {
      return;
    }

    updateRideDetails();

    onNextPress();
  };
  const snapPoints = useMemo(() => ['30%', '70%'], []);

  return (
    <BaseBottomSheet isVisible={true} index={1} snapPoints={snapPoints}>
      <View style={styles.dropdownRow}>
        <RideDropdown
          icon={<ScheduleIcon fill={colors.primary} />}
          value={t(`common:${selectedTime}`)}
          isOpen={isNowDropdownOpen}
          items={timeItems}
          onToggle={() => setIsNowDropdownOpen(!isNowDropdownOpen)}
          onSelect={item => {
            setSelectedTime(item);
            setIsNowDropdownOpen(false);
          }}
        />

        <RideDropdown
          icon={<ProfileIcon fill={colors.primary} />}
          value={t(`selectRide:${selectedPerson}`)}
          isOpen={isForMeDropdownOpen}
          items={personItems}
          onToggle={() => setIsForMeDropdownOpen(!isForMeDropdownOpen)}
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
        <ActionButton
          onPress={() => {}}
          icon={<PinIcon fill={colors.textSecondary} />}
          title={t('setOnMap')}
          textStyle={{ color: colors.textSecondary }}
          style={styles.actionButton}
        />

        <ActionButton
          onPress={handleFlipModal}
          icon={<StarIcon fill={colors.textSecondary} />}
          title={t('common:savedPlaces')}
          textStyle={{ color: colors.textSecondary }}
          style={styles.actionButton}
        />
      </View>
      
      <SavedPlacesModal
        visible={isModalVisible}
        onClose={handleFlipModal}
        places={savedPlaces}
        loading={savedPlacesLoading}
        onSelectPlace={()=>{}}
        onAddPress={onAddPlacePress}
    />

      
      <View style={styles.contactSection}>
        <View style={styles.contactHeader}>
          <PhoneNumberIcon width={18} height={18} fill={colors.textPrimary} />
          <TextInput
            style={styles.numberInput}
            placeholder="+963 9** *** ***"
            placeholderTextColor={colors.textMuted}
          />
        </View>
      </View>

      <ActionButton
        onPress={handleNextPress}
        title={t('common:next')}
        icon={<ArrowRight fill={colors.background} />}
      />
    </BaseBottomSheet>
  );
}
