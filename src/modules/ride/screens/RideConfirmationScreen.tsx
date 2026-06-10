import React from 'react';
import { View, StatusBar, TextInput } from 'react-native';
import { useTheme } from '../../../core/theme/useTheme';
import BottomSheetCard from '../../../shared/components/ride/BottomSheetCard';
import Header from '../../../shared/components/ride/Header';
import InfoBox from '../components/RideConfirmationScreen/InfoBox';
import FindDriverButton from '../components/RideConfirmationScreen/FindDriverButton';
import { createStyles } from '../styles/confirmRide.styles';
import { useConfirmRideViewModel } from '../viewmodels/useConfirmRideViewModel';
import ClockIcon from '../../../assets/svg/common/schedule.svg';
import EstimatedPriceIcon from '../../../assets/svg/payment/price.svg';
import CashIcon from '../../../assets/svg/payment/cash.svg';
import CarIcon from '../../../assets/svg/common/ride.svg';
import PhoneNumberIcon from '../../../assets/svg/contact/call.svg';

export default function RideConfirmationScreen() {

  const { colors, mode } = useTheme();
  const styles = createStyles(colors);
  
  const vm = useConfirmRideViewModel();
  
  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />

      <Header
        title="Ride Confirmation"
        onBackPress={vm.handleBackPress}
      />

      <BottomSheetCard>
        <View style={styles.grid}>
          <InfoBox
            icon={<ClockIcon width={16} height={16} fill={colors.primary} />}
            title="Time"
            value={vm.rideData.time || 'N/A'}
          />

          <InfoBox
            icon={
              <EstimatedPriceIcon
                width={16}
                height={16}
                fill={colors.primary}
              />
            }
            title="Total Price"
            value={vm.rideData.price || 'N/A'}
          />

          <InfoBox
            icon={<CarIcon width={16} height={16} fill={colors.primary} />}
            title="Selected Car"
            value={vm.rideData.vehicleType || 'N/A'}
          />

          <InfoBox
            icon={<CashIcon width={16} height={16} fill={colors.primary} />}
            title="Payment"
            value={vm.rideData.payment || 'N/A'}
          />
        </View>

        <View style={styles.contactSection}>
          <View style={styles.contactHeader}>
            <PhoneNumberIcon
              width={18}
              height={18}
              fill={colors.textPrimary}
            />

            <TextInput
              style={styles.input}
              placeholder="+963 935 916 399"
              placeholderTextColor={colors.textMuted}
            />
          </View>
        </View>

        <FindDriverButton
          onPress={() => vm.handleFindDriver()}
        />
      </BottomSheetCard>
    </View>
  );
}