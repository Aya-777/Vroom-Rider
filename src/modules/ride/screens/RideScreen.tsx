import React, { useEffect } from 'react';
import { View, StatusBar, TouchableOpacity } from 'react-native';
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

export default function RideScreen() {
  const { colors, mode } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['selectRide', 'common']);
  const navigation =
    useNavigation<HomeStackScreenProps<'Ride'>['navigation']>();
  const vm = useRideViewModel();
  const mapVm = useMapViewModel();
  const animatedPosition = useSharedValue(0);

  const handleTripEnded = () => {
    vm.resetRide();

    navigation.navigate('HomeScreen');
  };

  const handleMyLocationPress = async () => {
    const location = await LocationService.getCurrentLocation();

    if (!location) return;
    mapVm.centerOnLocation(location);
  };

  const buttonStyle = useAnimatedStyle(() => ({
    position: 'absolute',
    right: 20,

    // 68 = button height (52) + 16px spacing
    top: animatedPosition.value - 68,
  }));

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />

      <Header title={t('common:ride')} onBackPress={vm.handleBackPress} />

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
        onDriverFound={vm.goToDriverArrived}
        onTripStarted={vm.goToTripStarted}
        onTripEnded={handleTripEnded}
        onCancelPress={vm.cancelCurrentRide}
        onKeepRide={vm.keepRidePress}
        animatedPosition={animatedPosition}
      />
    </View>
  );
}
