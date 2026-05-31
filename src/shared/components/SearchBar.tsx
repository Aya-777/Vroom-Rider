import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import ScheduleIcon from '../../assets/svg/schedule.svg';
import SearchIcon from '../../assets/svg/search.svg';

import { Typography, Spacing, Radius, Shadows } from '../../core/theme/tokens';
import { useTheme } from '../../core/theme/useTheme';

function SearchBar() {
  const { colors } = useTheme();

  const styles = createStyles(colors);

  return (
    <View style={styles.searchContainer}>
      <SearchIcon fill={colors.primary} />

      <TextInput
        placeholder="Where to?"
        placeholderTextColor={colors.textMuted}
        style={styles.searchInput}
      />

      <View style={styles.divider} />

      <TouchableOpacity style={styles.timeButton}>
        <ScheduleIcon fill={colors.primary} />
        <Text style={styles.timeText}>Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (colors: any) =>
  StyleSheet.create({
    searchContainer: {
      flexDirection: 'row',
      backgroundColor: colors.surface,
      borderRadius: Radius.full,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: Spacing.md,
      alignItems: 'center',
      justifyContent: 'center',
      height: 55,
      marginTop: Spacing.sm,
      marginBottom: Spacing.lg,
      ...Shadows.small,
    },

    searchInput: {
      flex: 1,
      ...Typography.body,
      color: colors.textPrimary,
    },

    divider: {
      width: 1,
      height: 24,
      backgroundColor: colors.primary,
      marginHorizontal: Spacing.sm,
    },

    timeButton: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: 4,
    },

    timeText: {
      ...Typography.body,
      fontFamily: 'Lora-SemiBold',
      color: colors.primary,
      marginLeft: Spacing.xs,
      marginBottom: Spacing.xs,
    },
  });

export default SearchBar;