// src/components/DropdownFilter/DropdownFilter.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStyles } from '../../styles/dropDownFilter.styles';
import { useTheme } from '../../../../core/theme/useTheme';
import { useTranslation } from 'react-i18next';
import { RideFilter } from '../../types/ride.types';

interface DropdownFilterProps {
  options: RideFilter[];
  selectedIds: string[]; // Changed from single selectedOption to array of IDs
  onSelect: (selectedIds: string[]) => void;
  placeholder?: string;
}

export const DropdownFilter: React.FC<DropdownFilterProps> = ({
  options,
  selectedIds,
  onSelect,
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['rideDetails', 'common']);

  const handleToggle = (id: string) => {
    let updatedSelection: string[];
    if (selectedIds.includes(id)) {
      // Remove if already selected
      updatedSelection = selectedIds.filter(itemKey => itemKey !== id);
    } else {
      // Add if not selected
      updatedSelection = [...selectedIds, id];
    }
    onSelect(updatedSelection);
  };

  return (
    <View style={styles.container}>
      <View style={styles.dropdownList}>
        {options.map((item, index) => {
          const isSelected = selectedIds.includes(item.id);
          const isLast = index === options.length - 1;

          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.optionItem,
                isSelected && styles.activeFilter,
              ]}
              onPress={() => handleToggle(item.id)}
              activeOpacity={0.7}
            >
              <View style={styles.leftContent}>
                {/* Checkbox / Radio visual indicator could go here */}
                <Text
                  style={[
                    styles.optionText,
                    isSelected && styles.activeFilterText,
                  ]}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {item.title}
                </Text>
              </View>
              {item.extra_fee && (
                <Text style={styles.optionPrice}>{"+$"}{item.extra_fee}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};
