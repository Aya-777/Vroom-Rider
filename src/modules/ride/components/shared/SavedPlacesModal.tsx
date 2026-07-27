import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
import { SavedPlaceItem } from './SavedPlacesItem';
import { SavedPlacesModalProps } from '../../types/savedPlaces.types';
import CloseIcon from '../../../../assets/svg/common/close.svg';
import AddIcon from '../../../../assets/svg/common/add.svg';
import { createStyles } from '../../styles/savedPlaces.styles';
import { useTheme } from '../../../../core/theme/useTheme';
import { useTranslation } from 'react-i18next';

export const SavedPlacesModal: React.FC<SavedPlacesModalProps> = ({
  visible,
  onClose,
  // places,
  onSelectPlace,
  // onAddPlace,
}) => {
  const { colors, mode } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['selectRide', 'common']);

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.modalContainer}>
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Saved Places</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <CloseIcon width={20} height={20} fill="#A0AEC0" />
            </TouchableOpacity>
          </View>

          {/* List of Saved Places */}
          {/* <FlatList
            data={}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <SavedPlaceItem place={item} onPress={() => onSelectPlace(item)} />
            )}
            contentContainerStyle={styles.listContainer}
            showsVerticalScrollIndicator={false}
          /> */}

          {/* Add New Place Button */}
          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.85}
            onPress={() => {}}
          >
            <AddIcon width={18} height={18} fill="#5875F0" />
            <Text style={styles.addButtonText}>Add New Place</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};
