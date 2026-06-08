import React from 'react';
import { View, StatusBar, TextInput } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { useTheme } from '../../../core/theme/useTheme';
import BottomSheetCard from '../../../shared/components/ride/BottomSheetCard';
import Header from '../../../shared/components/ride/Header';
import { HomeStackScreenProps } from '../../../navigation/main/home/homeTypes';
import InfoBox from '../components/RideConfirmationScreen/InfoBox';
import FindDriverButton from '../components/RideConfirmationScreen/FindDriverButton';
import { createStyles } from '../styles/confirmRide.styles';
import ClockIcon from '../../../assets/svg/common/schedule.svg';
import EstimatedPriceIcon from '../../../assets/svg/payment/price.svg';
import CashIcon from '../../../assets/svg/payment/cash.svg';
import CarIcon from '../../../assets/svg/common/ride.svg';
import PhoneNumberIcon from '../../../assets/svg/contact/call.svg';

type RideRouteParams = {
  price?: string;
  time?: string;
  car?: string;
  payment?: string;
};

export default function RideConfirmationScreen() {
  const navigation =
    useNavigation<HomeStackScreenProps<'ConfirmRide'>['navigation']>();

  const route = useRoute();
  const { colors, mode } = useTheme();

  const styles = createStyles(colors);

  const { price, time, car, payment } =
    (route.params as RideRouteParams) || {};

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />

      <Header
        title="Ride Confirmation"
        onBackPress={() => navigation.goBack()}
      />

      <BottomSheetCard>
        <View style={styles.grid}>
          <InfoBox
            icon={<ClockIcon width={16} height={16} fill={colors.primary} />}
            title="Time"
            value={time || 'N/A'}
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
            value={price || 'N/A'}
          />

          <InfoBox
            icon={<CarIcon width={16} height={16} fill={colors.primary} />}
            title="Selected Car"
            value={car || 'N/A'}
          />

          <InfoBox
            icon={<CashIcon width={16} height={16} fill={colors.primary} />}
            title="Payment"
            value={payment || 'N/A'}
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
          onPress={() =>
            navigation.navigate('DriverFound', {
              driverId: '1',
            })
          }
        />
      </BottomSheetCard>
    </View>
  );
}