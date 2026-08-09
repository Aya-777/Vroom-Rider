import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Input from '../../../../shared/components/Input';

import { useTheme } from '../../../../core/theme/useTheme';

import { createStyles } from '../../styles/selectRide.styles';
import { useTranslation } from 'react-i18next';
import { GeocodeResult } from '../../../../core/services/location/GeoCodingService';
import SearchResults from '../shared/SearchResults';
import PlusIcon from '../../../../assets/svg/common/add.svg';
import { ActiveInput, DraftStop, RideStop } from '../../types/ride.types';

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

  draftStops: DraftStop[];
  onAddStop: () => void;
  onRemoveStop: (id: string) => void;
  onChangeStop: (id: string, text: string) => void;
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

  draftStops,
  onAddStop,
  onRemoveStop,
  onChangeStop,
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
          <SearchResults
            results={pickupResults}
            onSelectItem={onSelectPickup}
          />
        )}

        <View style={styles.divider} />

        {/* Temporary stops */}
        {draftStops.map((stop, index) => (
          <View key={stop.id} style={styles.addInputContainer}>
            <Input
              inputStyle={[styles.input, { width: '50%' }]}
              placeholder={`${t('stop')} ${index + 1}`}
              placeholderTextColor={colors.textMuted}
              value={stop.address}
              onChangeText={text => onChangeStop(stop.id, text)}
            />

            <TouchableOpacity
              style={styles.addButton}
              onPress={() => onRemoveStop(stop.id)}
            >
              <View>
                <Text style={{ color: colors.surface }}>−</Text>
              </View>
            </TouchableOpacity>
          </View>
        ))}

        {/* Destination */}
        <View style={styles.addInputContainer}>
          <Input
            inputStyle={[styles.input, { width: '50%' }]}
            placeholder={t('to')}
            placeholderTextColor={colors.textMuted}
            value={toLocation}
            onChangeText={onChangeTo}
            error={errors.toLocation}
            onFocus={onDestinationFocus}
          />

          <TouchableOpacity style={styles.addButton} onPress={onAddStop}>
            <PlusIcon width={20} height={20} fill={colors.surface} />
          </TouchableOpacity>
        </View>

        {activeInput === 'destination' && destinationResults.length > 0 && (
          <SearchResults
            results={destinationResults}
            onSelectItem={onSelectDestination}
          />
        )}
      </View>
    </View>
  );
}
