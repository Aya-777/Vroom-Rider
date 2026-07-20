import React from 'react';
import { View, StatusBar} from 'react-native';
import Header from '../../../shared/components/SubHeader';
import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/selectRide.styles';
import { useTranslation } from 'react-i18next';
import { MapContainer } from '../components/shared/MapContainer';
import {useRideViewModel} from '../viewmodels/useRideViewModel'
import SelectRideSheet from '../components/SelectRideScreen/SelectRideSheet';
import RideBottomSheet from '../components/RideScreen/RideBottomSheet';

export default function RideScreen() {
  const { colors, mode } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['selectRide', 'common']);

  const vm = useRideViewModel();

  console.log(vm.rideState);

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />

      <Header title={t('common:ride')} onBackPress={vm.handleBackPress} />

      <MapContainer />

      <RideBottomSheet
          rideState={vm.rideState}
          setRideState={vm.setRideState}
      />
    </View>
  );
}
