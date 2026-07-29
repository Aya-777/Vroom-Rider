import React from 'react';
import { View, Text, TouchableOpacity, Alert } from 'react-native';
import { SavedPlace } from '../../types/savedPlaces.types';
import { ICON_MAP, IconId } from '../../utils/iconMap';

interface SavedPlaceItemProps {
  place: SavedPlace;
  onPress: () => void;
  styles: any;
  onDelete: (id: number) => void;
}

export const SavedPlaceItem: React.FC<SavedPlaceItemProps> = ({
  place,
  onPress,
  styles,
  onDelete
}) => {
  const PlaceIcon = ICON_MAP[place.icon as IconId] ?? ICON_MAP.pin;
  const DeleteIcon = ICON_MAP['delete'];

  const onDeletePress = () => {
    Alert.alert(
      'Delete saved place?',
      'This action cannot be undone.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => onDelete(place.id),
        },
      ],
    );
  }

  return (
    <>
      <TouchableOpacity
        style={styles.container}
        activeOpacity={0.8}
        onPress={onPress}
      >
        <View style={styles.iconContainer}>
          <PlaceIcon width={20} height={20} fill="#9BA8D0" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{place.label}</Text>
          <Text style={styles.address} numberOfLines={2}>
            {place.address}
          </Text>
        </View>
        <TouchableOpacity onPress={onDeletePress}>
          <DeleteIcon width={20} height={20} fill={'#990011'} />
        </TouchableOpacity>
      </TouchableOpacity>
    </>
  );
};
