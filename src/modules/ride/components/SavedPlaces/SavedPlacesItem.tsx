import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Feather'; // Assuming vector-icons is used
import { SavedPlace } from '../../types/savedPlaces.types';

interface SavedPlaceItemProps {
  place: SavedPlace;
  onPress: () => void;
  styles: any;
}

export const SavedPlaceItem: React.FC<SavedPlaceItemProps> = ({ place, onPress, styles }) => {
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
  
});