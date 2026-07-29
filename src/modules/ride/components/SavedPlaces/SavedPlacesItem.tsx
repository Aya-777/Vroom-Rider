import React from 'react';
import { View, Text, TouchableOpacity} from 'react-native';
import { SavedPlace } from '../../types/savedPlaces.types';
import { ICON_MAP, IconId } from '../../utils/iconMap';

interface SavedPlaceItemProps {
  place: SavedPlace;
  onPress: () => void;
  styles: any;
}

export const SavedPlaceItem: React.FC<SavedPlaceItemProps> = ({ place, onPress, styles }) => {
  const PlaceIcon = ICON_MAP[place.icon as IconId] ?? ICON_MAP.pin;
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.iconContainer}>
        <PlaceIcon width={20} height={20} fill="#9BA8D0" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{place.label}</Text>
        <Text style={styles.address} numberOfLines={2}>
          {place.address}
        </Text>
      </View>
    </TouchableOpacity>
  );
};