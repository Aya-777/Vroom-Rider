import React, { useEffect } from 'react';
import {
  View,
  StatusBar,
  TouchableOpacity,
  Text,
} from 'react-native';
import Header from '../../../shared/components/SubHeader';
import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/selectRide.styles';
import { useTranslation } from 'react-i18next';
import { MapContainer } from '../components/Map/MapContainer';
import { useRideViewModel } from '../viewmodels/useRideViewModel';
import RideBottomSheet from '../components/RideScreen/RideBottomSheet';
import { useNavigation } from '@react-navigation/native';
import { HomeStackScreenProps } from '../../../navigation/main/home/homeTypes';
import MyLocationIcon from '../../../assets/svg/common/myLocation.svg';
import LocationService from '../../../core/services/location/LocationService';
import useMapViewModel from '../viewmodels/useMapViewModel';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { RideState } from '../types/RideState';

export default function RideScreen() {
  const { colors, mode } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['selectRide', 'common']);
  const navigation =
    useNavigation<HomeStackScreenProps<'Ride'>['navigation']>();
  const vm = useRideViewModel();
  const mapVm = useMapViewModel();
  const animatedPosition = useSharedValue(0);

  const handleMyLocationPress = async () => {
    const location = await LocationService.getCurrentLocation();

    if (!location) return;
    mapVm.centerOnLocation(location);
  };

  const buttonStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    right: 20,
    top: animatedPosition.value - 68,
  }));

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />

      <View>
    <Header
      title={t('common:ride')}
      onBackPress={vm.handleBackPress}
    />
    {
      vm.rideState === (RideState.DRIVER_FOUND || RideState.DRIVER_ARRIVED || RideState.TRIP_STARTED || RideState.TRIP_ENDED)
      &&
      <TouchableOpacity
        style={styles.sosButton}
        onPress={vm.handleSosPress}
        activeOpacity={0.8}
      >
        <Text style={styles.sosText}>SOS</Text>
      </TouchableOpacity>
      }
    </View>

      <MapContainer vm={mapVm} />

      <Animated.View style={buttonStyle}>
        <TouchableOpacity
          style={styles.myLocationButton}
          onPress={handleMyLocationPress}
        >
          <MyLocationIcon fill={colors.primary} />
        </TouchableOpacity>
      </Animated.View>

      <RideBottomSheet
        rideState={vm.rideState}
        isCancelling={vm.isCancelling}
        setIsCancelling={vm.setIsCancelling}
        onSelectRideNext={vm.goToExtraDetails}
        onExtraDetailsNext={vm.goToRideConfirmation}
        onRideConfirmed={vm.goToSearchingForaDriver}
        onCancelPress={vm.cancelCurrentRide}
        onKeepRide={vm.keepRidePress}
        rematch={vm.handleRematch}
        animatedPosition={animatedPosition}
        isBillVisible={vm.isBillVisible}
        isReviewVisible={vm.isReviewVisible}
        setIsBillVisible={vm.setIsBillVisible}
        setIsReviewVisible={vm.setIsReviewVisible}
        filters={vm.filters}
        handleSubmit={vm.handleSubmitReview}
        handleMaybeLater={vm.handleMaybeLater}
      />
    </View>
  );
}