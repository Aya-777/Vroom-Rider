import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Assuming vector-icons is used
import { SavedPlace } from '../../types/savedPlaces.types';

interface SavedPlaceItemProps {
  place: SavedPlace;
  onPress: () => void;
}

export const SavedPlaceItem: React.FC<SavedPlaceItemProps> = ({ place, onPress }) => {
  return (
    <TouchableOpacity style={styles.container} activeOpacity={0.8} onPress={onPress}>
      <View style={styles.iconContainer}>
        <Icon name={place.icon} size={20} color="#9BA8D0" />
      </View>
      <View style={styles.textContainer}>
        <Text style={styles.title}>{place.title}</Text>
        <Text style={styles.address} numberOfLines={2}>
          {place.address}
        </Text>
      </View>
      <Icon name="chevron-right" size={18} color="#6B7A99" />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#161D31',
    borderRadius: 16,
    padding: 14,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#202A44',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#1E2842',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textContainer: {
    flex: 1,
    marginRight: 8,
  },
  title: {
    fontSize: 15,
    fontWeight: '600',
    color: '#FFFFFF',
    marginBottom: 2,
  },
  address: {
    fontSize: 12,
    color: '#8A9BB8',
    lineHeight: 16,
  },
});