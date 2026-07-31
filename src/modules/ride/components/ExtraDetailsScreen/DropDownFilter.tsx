// src/components/DropdownFilter/DropdownFilter.tsx
import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStyles } from '../../styles/dropDownFilter.styles';
import { useTheme } from '../../../../core/theme/useTheme';
import { useTranslation } from 'react-i18next';

export interface FilterOption {
  id: string;
  label: string;
  price?: string;
  iconName: string;
}

interface DropdownFilterProps {
  options: FilterOption[];
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
      updatedSelection = selectedIds.filter((itemKey) => itemKey !== id);
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
                isSelected && styles.optionSelected,
                isLast && styles.optionItemLast,
              ]}
              onPress={() => handleToggle(item.id)}
              activeOpacity={0.7}
            >
              <View style={styles.leftContent}>
                {/* Checkbox / Radio visual indicator could go here */}
                <Text
                  style={[
                    styles.optionText,
                    isSelected && styles.optionTextSelected,
                  ]}
                  numberOfLines={1}
                  adjustsFontSizeToFit
                >
                  {item.label}
                </Text>
              </View>
              {item.price && (
                <Text style={styles.optionPrice}>{item.price}</Text>
              )}
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
};