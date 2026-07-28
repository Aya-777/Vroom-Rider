import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import Input from '../../../../shared/components/Input';

import { useTheme } from '../../../../core/theme/useTheme';

import { createStyles } from '../../styles/selectRide.styles';
import { useTranslation } from 'react-i18next';
import { GeocodeResult } from '../../../../core/services/location/GeoCodingService';
import SearchResults from '../shared/SearchResults';

type ActiveInput = 'pickup' | 'destination' | null;

type Props = {
  fromLocation: string;
  toLocation: string;
  onChangeFrom: (text: string) => void;
  onChangeTo: (text: string) => void;
  errors: {
    fromLocation?: string;
    toLocation?: string;
  };
  onPickupFocus?: () => void;
  onDestinationFocus?: () => void;
  onSelectPickup: (place: GeocodeResult) => void;
  onSelectDestination: (place: GeocodeResult) => void;
  pickupResults: GeocodeResult[];
  destinationResults: GeocodeResult[];

  activeInput: ActiveInput;
};

export default function RideLocationInputs({
  fromLocation,
  toLocation,
  onChangeFrom,
  onChangeTo,
  errors,
  onPickupFocus,
  onDestinationFocus,
  onSelectPickup,
  onSelectDestination,
  pickupResults,
  destinationResults,
  activeInput,
}: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['selectRide']);

  return (
    <View style={styles.inputCard}>
      <View style={styles.inputTimeline}>
        <View style={styles.timelineDot} />

        <View style={styles.timelineLine} />

        <View style={styles.timelineDot} />
      </View>

      <View style={styles.inputContainer}>
        <Input
          inputStyle={styles.input}
          placeholder={t('from')}
          placeholderTextColor={colors.textMuted}
          value={fromLocation}
          onChangeText={onChangeFrom}
          error={errors.fromLocation}
          onFocus={onPickupFocus}
        />

        {activeInput === 'pickup' && pickupResults.length > 0 && (
          <SearchResults results={pickupResults} onSelectItem={onSelectPickup}/>
        )}

        <View style={styles.divider} />

        <Input
          inputStyle={styles.input}
          placeholder={t('to')}
          placeholderTextColor={colors.textMuted}
          value={toLocation}
          onChangeText={onChangeTo}
          error={errors.toLocation}
          onFocus={onDestinationFocus}
        />

        {activeInput === 'destination' && destinationResults.length > 0 && (
          <SearchResults results={destinationResults} onSelectItem={onSelectDestination} />
        )}
      </View>
    </View>
  );
}
