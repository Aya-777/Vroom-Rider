import React from 'react';
import { View, StatusBar} from 'react-native';
import Header from '../../../shared/components/SubHeader';
import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/selectRide.styles';
import { useTranslation } from 'react-i18next';
import { MapContainer } from '../components/shared/MapContainer';
import {useRideViewModel} from '../viewmodels/useRideViewModel'
import SelectRideSheet from '../components/SelectRideScreen/SelectRideSheet';

export default function SelectRideScreen() {
  const { colors, mode } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['selectRide', 'common']);

  const vm = useRideViewModel();

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        barStyle={mode === 'dark' ? 'light-content' : 'dark-content'}
        backgroundColor="transparent"
      />

      <Header title={t('common:ride')} onBackPress={vm.handleBackPress} />

      <MapContainer />

      <SelectRideSheet />

    </View>
  );
}
