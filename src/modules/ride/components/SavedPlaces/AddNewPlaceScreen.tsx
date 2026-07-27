import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useSavedPlacesViewModel } from '../../viewmodels/useSavedPlacesViewModel';

import PinIcon from '../../../../assets/svg/common/pin.svg';
import SaveIcon from '../../../../assets/svg/common/schedule.svg';
import Header from '../../../../shared/components/SubHeader';
import { useTheme } from '../../../../core/theme/useTheme';
import { createStyles } from '../../styles/savedPlaces.styles';
import { useTranslation } from 'react-i18next';

const AVAILABLE_ICONS = [
  { id: 'home', name: 'home' },
  { id: 'briefcase', name: 'briefcase' },
  { id: 'activity', name: 'activity' },
  { id: 'heart', name: 'heart' },
  { id: 'star', name: 'star' },
  { id: 'book', name: 'book-open' },
  { id: 'utensils', name: 'coffee' }, // mapped to available vector icons
  { id: 'coffee', name: 'coffee' },
];

export default function AddNewPlaceScreen() {

  const { colors, mode } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['selectRide', 'common']);


  const vm = useSavedPlacesViewModel();

  const handleSave = () => {
    // vm.onSave expects literal type "string" in its signature; cast to satisfy TypeScript
    vm.onSave(
      vm.name as unknown as 'string',
      vm.address as unknown as 'string',
      vm.selectedIcon,
    );
  };

  return (
    <>
  <Header title="Add New Place" onBackPress={vm.onBack} />
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.AddNewPlacecontainer}>
        {/* Header */}

        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Name of Place Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Name of Place</Text>
            <TextInput
              style={styles.textInput}
              placeholder="e.g., Home, Office"
              placeholderTextColor="#536280"
              value={vm.name}
              onChangeText={vm.setName}
            />
          </View>

          {/* Address Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>Address</Text>
            <View style={styles.addressInputContainer}>
              <PinIcon width={18} height={20} fill="#7C8DB0" />
              <TextInput
                style={styles.addressTextInput}
                placeholder="Search for address..."
                placeholderTextColor="#536280"
                value={vm.address}
                onChangeText={vm.setAddress}
              />
            </View>
          </View>

          {/* Icon Selection */}
          <View style={styles.inputGroup}>
            <View style={styles.iconSelectionHeader}>
              <Text style={styles.label}>Icon Selection</Text>
              <Text style={styles.optionalText}>Optional</Text>
            </View>
            <View style={styles.iconGrid}>
              {AVAILABLE_ICONS.map(item => {
                const isSelected = vm.selectedIcon === item.id;
                return (
                  <TouchableOpacity
                    key={item.id}
                    style={[
                      styles.iconCard,
                      isSelected && styles.selectedIconCard,
                    ]}
                    activeOpacity={0.8}
                    onPress={() => vm.setSelectedIcon(item.id)}
                  >
                    {/* <Icon
                      size={20}
                      color={isSelected ? '#FFFFFF' : '#7C8DB0'}
                    /> */}
                  </TouchableOpacity>
                );
              })}
            </View>
          </View>
        </ScrollView>

        {/* Save Button Footer */}
        <View style={styles.footer}>
          <TouchableOpacity
            style={styles.saveButton}
            activeOpacity={0.85}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>Save Place</Text>
            <SaveIcon width={18} height={18} fill="#2648CE" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
    </>
  );
}
