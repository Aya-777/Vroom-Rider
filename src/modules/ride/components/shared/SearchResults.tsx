import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useTheme } from '../../../../core/theme/useTheme';
import { createStyles } from '../../styles/shared.styles';
import { GeocodeResult } from '../../../../core/services/location/GeoCodingService';

type Props = {
  results: GeocodeResult[];
  onSelectItem: (place: GeocodeResult) => void;
};

export default function SearchResults({ results, onSelectItem}: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.searchResultsContainer}>
      <ScrollView
        style={styles.searchScroll}
        contentContainerStyle={{ paddingVertical: 4 }}
        nestedScrollEnabled={true}
        keyboardShouldPersistTaps="always"
        showsVerticalScrollIndicator={true}
      >
        {results.map(place => (
          <TouchableOpacity
            key={`${place.latitude}-${place.longitude}`}
            onPress={() => onSelectItem(place)}
            style={styles.searchResultItem}
          >
            <Text style={styles.searchResultText}>{place.address}</Text>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
}
