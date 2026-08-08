import React from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/favoriteDrivers.styles';
// import { Ionicons } from '@expo/vector-icons';
import SearchIcon from '../../../assets/svg/common/search.svg'
import FiltersIcon from '../../../assets/svg/ride/filters.svg'
import { useTranslation } from 'react-i18next';

interface DriverSearchBarProps {
  placeholder: string;
  value: string;
  onChangeText: (text: string) => void;
  onFilterPress: () => void;
}

export const DriverSearchBar: React.FC<DriverSearchBarProps> = ({
  placeholder,
  value,
  onChangeText,
  onFilterPress,
}) => {

  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation('favoriteDrivers');
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBarContainer}>
        <SearchIcon width={16} height={16} fill={colors.textMuted}/>
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#94a3b8"
          value={value}
          onChangeText={onChangeText}
        />
      </View>
      <TouchableOpacity style={styles.filterButton} onPress={onFilterPress} activeOpacity={0.8}>
        <FiltersIcon width={18} height={18} fill={colors.textPrimary}/>
        <Text style={styles.filterText}>{t('favoriteDrivers.filters')}</Text>
      </TouchableOpacity>
    </View>
  );
};
