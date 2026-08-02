import React, { useMemo } from 'react';
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
import {
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SavedPlacesModal } from '../SavedPlaces/SavedPlacesModal';
import { Text } from 'react-native-gesture-handler';
import { SharedValue } from 'react-native-reanimated';

type Props = {
  onNextPress: () => void;
  animatedPosition?: SharedValue<number>;
};

export default function SelectRideSheet({ onNextPress, animatedPosition }: Props) {
  const { colors, mode } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['selectRide', 'common']);

  const vm = useSelectRideViewModel();

  const personItems = [
    { key: 'forMe', label: t('selectRide:forMe'), value: true },
    { key: 'otherContact', label: t('selectRide:otherContact'), value: false },
  ];

  const timeItems = [
    { key: 'now', label: t('common:now') },
    { key: 'schedule', label: t('common:schedule') },
  ];

  const handleNextPress = () => {
    if(vm.validate()){
      vm.onNextPress();
      onNextPress();
    }
  };
  const snapPoints = useMemo(() => ['30%', '70%'], []);

  return (
    <>
      <BaseBottomSheet isVisible={vm.isSheetVisible} index={1} snapPoints={snapPoints} animatedPosition={animatedPosition}>
        <View style={styles.dropdownRow}>
          <RideDropdown
            icon={<ScheduleIcon fill={colors.primary} />}
            value={t(`common:${vm.selectedTime}`)}
            isOpen={vm.isNowDropdownOpen}
            items={timeItems}
            onToggle={() => vm.setIsNowDropdownOpen(!vm.isNowDropdownOpen)}
            onSelect={item => {
              vm.setSelectedTime(item);
              vm.setIsNowDropdownOpen(false);
            }}
          />

          <RideDropdown
            icon={<ProfileIcon fill={colors.primary} />}
            value={t(`selectRide:${vm.selectedPerson}`)}
            isOpen={vm.isForMeDropdownOpen}
            items={personItems}
            onToggle={() => vm.setIsForMeDropdownOpen(!vm.isForMeDropdownOpen)}
            onSelect={item => {
              vm.setSelectedPerson(item);
              vm.setIsForMeDropdownOpen(false);
            }}
          />
        </View>

        <RideLocationInputs
          fromLocation={vm.fromText}
          toLocation={vm.toText}
          onChangeFrom={vm.setFromText}
          onChangeTo={vm.setToText}

          pickupResults={vm.pickupResults}
          destinationResults={vm.destinationResults}

          activeInput={vm.activeInput}

          onSelectPickup={vm.onSelectPickup}
          onSelectDestination={vm.onSelectDestination}

          onPickupFocus={vm.onPickupFocus}
          onDestinationFocus={vm.onDestinationFocus}

          errors={vm.errors}
      />

        <View style={styles.actionRow}>
          <ActionButton
            onPress={vm.onSetOnMap}
            icon={<PinIcon fill={colors.textSecondary} />}
            title={t('setOnMap')}
            textStyle={{ color: colors.textSecondary }}
            style={styles.actionButton}
          />

          <ActionButton
            onPress={vm.handleFlipModal}
            icon={<StarIcon fill={colors.textSecondary} />}
            title={t('common:savedPlaces')}
            textStyle={{ color: colors.textSecondary }}
            style={styles.actionButton}
          />
        </View>

        <SavedPlacesModal
          visible={vm.isModalVisible}
          onClose={vm.handleFlipModal}
          places={vm.savedPlaces}
          loading={vm.savedPlacesLoading}
          onSelectPlace={vm.onSelectPlace}
          onAddPress={vm.onAddPlacePress}
          onDeletePlace={vm.onDeleteSavedPlace}
        />

        <View style={styles.contactSection}>
          <View style={styles.contactHeader}>
            <PhoneNumberIcon width={18} height={18} fill={colors.textPrimary} />
            <TextInput
              style={styles.numberInput}
              value={vm.contactPhone}
              onChangeText={vm.setContactPhone}
              keyboardType="phone-pad"
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

        {!vm.isSheetVisible && 
          <BaseBottomSheet 
          isVisible={!vm.isSheetVisible}
          index={1} 
          snapPoints={['20%']} 
          animatedPosition={animatedPosition}
          >
            <TouchableOpacity style={styles.confirmButton} onPress={vm.onConfirmLocation}>
              <Text style={styles.confirmButtonText} numberOfLines={1}>Confirm</Text>
            </TouchableOpacity>
          </BaseBottomSheet>
        }

    </>
  );
}
