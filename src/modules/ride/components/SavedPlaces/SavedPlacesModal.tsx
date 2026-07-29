import React from 'react';
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  StyleSheet,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { SavedPlaceItem } from './SavedPlacesItem';
import { SavedPlacesModalProps } from '../../types/savedPlaces.types';
import CloseIcon from '../../../../assets/svg/common/close.svg';
import AddIcon from '../../../../assets/svg/common/add.svg';
import { createStyles } from '../../styles/savedPlaces.styles';
import { useTheme } from '../../../../core/theme/useTheme';
import { useTranslation } from 'react-i18next';
import LinearBg from '../../../../shared/components/LinearBg';

export const SavedPlacesModal: React.FC<SavedPlacesModalProps> = ({
  visible,
  loading,

  places,

  onClose,
  onAddPress,
  onSelectPlace,
  onDeletePlace,
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
        <LinearBg
          style={styles.modalContainer}
          colors={[colors.backgroundSoft, colors.background]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {/* <View style={styles.modalContainer}> */}
          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Saved Places</Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <CloseIcon width={20} height={20} fill={colors.textMuted} />
            </TouchableOpacity>
          </View>

          {/* List of Saved Places */}

          {loading ? (
            <ActivityIndicator style={{ marginBottom: 20 }} />
          ) : (
            <FlatList
              data={places}
              keyExtractor={item => item.id.toString()}
              renderItem={({ item }) => (
                <SavedPlaceItem
                  place={item}
                  onPress={() => onSelectPlace(item)}
                  styles={styles}
                  onDelete={onDeletePlace}
                />
              )}
              contentContainerStyle={styles.listContainer}
              showsVerticalScrollIndicator={false}
            />
          )}

          {/* Add New Place Button */}
          <TouchableOpacity
            style={styles.addButton}
            activeOpacity={0.85}
            onPress={onAddPress}
          >
            <AddIcon width={18} height={18} fill={colors.backgroundSoft} />
            <Text style={styles.addButtonText}>Add New Place</Text>
          </TouchableOpacity>
          {/* </View> */}
        </LinearBg>
      </View>
    </Modal>
  );
};
