import React from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import ScheduleIcon from '../../assets/svg/schedule.svg';
import SearchIcon from '../../assets/svg/search.svg';
import { Colors, Typography, Spacing, Radius, Shadows } from '../../core/theme';

function SearchBar() {
  return (
    <View style={styles.searchContainer}>
      <SearchIcon fill={Colors.primary} />

      <TextInput
        placeholder="Where to?"
        placeholderTextColor={Colors.textMuted}
        style={styles.searchInput}
      />

      <View style={styles.divider} />

      <TouchableOpacity style={styles.timeButton}>
        <ScheduleIcon fill={Colors.secondary} />
        <Text style={styles.timeText}>Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: Colors.surface,
    borderRadius: Radius.full,
    borderWidth: 1,
    borderColor: Colors.border,
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
    color: Colors.primary,
  },

  divider: {
    width: 1,
    height: 24,
    backgroundColor: Colors.border,
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
    color: Colors.primary,
    marginLeft: Spacing.xs,
    marginBottom: Spacing.xs,
  },
});

export default SearchBar;