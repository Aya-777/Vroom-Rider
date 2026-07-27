import React from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
// import Icon from 'react-native-vector-icons/Feather';
import { SavedPlaceItem } from './SavedPlacesItem';
import { SavedPlacesModalProps } from '../../types/savedPlaces.types';
import CloseIcon from '../../../../assets/svg/common/close.svg';
import AddIcon from '../../../../assets/svg/common/add.svg';

export const SavedPlacesModal: React.FC<SavedPlacesModalProps> = ({
  visible,
  onClose,
  // places,
  onSelectPlace,
  // onAddPlace,
}) => {
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
          <TouchableOpacity style={styles.addButton} activeOpacity={0.85} onPress={()=>{}}>
            <AddIcon width={18} height={18} fill="#5875F0"/>
            <Text style={styles.addButtonText}>Add New Place</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(5, 8, 15, 0.75)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContainer: {
    width: '100%',
    maxWidth: 380,
    backgroundColor: '#0F1523',
    borderRadius: 24,
    borderWidth: 1,
    borderColor: '#1D2840',
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.5,
    shadowRadius: 20,
    elevation: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#FFFFFF',
  },
  closeButton: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#161D31',
    justifyContent: 'center',
    alignItems: 'center',
  },
  listContainer: {
    paddingBottom: 8,
  },
  addButton: {
    flexDirection: 'row',
    height: 52,
    backgroundColor: '#D6E2FF',
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },
  addIcon: {
    marginRight: 8,
  },
  addButtonText: {
    fontSize: 15,
    fontWeight: '600',
    color: '#2648CE',
  },
});