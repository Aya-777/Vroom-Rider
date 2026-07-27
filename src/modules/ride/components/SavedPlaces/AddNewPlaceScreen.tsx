import React from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import { useSavedPlacesViewModel } from '../../viewmodels/useSavedPlacesViewModel';

import PinIcon from '../../../../assets/svg/common/pin.svg';
import SaveIcon from '../../../../assets/svg/common/save.svg';
import Header from '../../../../shared/components/SubHeader';
import { useTheme } from '../../../../core/theme/useTheme';
import { createStyles } from '../../styles/savedPlaces.styles';
import { useTranslation } from 'react-i18next';
import { AVAILABLE_ICONS, ICON_MAP } from '../../../ride/utils/iconMap';

export default function AddNewPlaceScreen() {
  const { colors, mode } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['selectRide', 'common']);

  const vm = useSavedPlacesViewModel();

  const handleSave = () => {
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
                  const IconComponent = ICON_MAP[item.id];

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
                      <IconComponent
                        width={23}
                        height={23}
                        fill={
                          isSelected ? colors.textPrimary : colors.textMuted
                        }
                      />
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
              <SaveIcon width={18} height={18} fill={colors.backgroundSoft} />
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>
    </>
  );
}
