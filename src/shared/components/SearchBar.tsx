import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';

import ScheduleIcon from '../../assets/svg/common/schedule.svg';
import SearchIcon from '../../assets/svg/common/search.svg';

import { Typography, Spacing, Radius, Shadows } from '../../core/theme/tokens';
import { useTheme } from '../../core/theme/useTheme';
import { useTranslation } from 'react-i18next';
import { ThemeColors } from '../../core/theme/theme.types';
import { HomeStackParamList } from '../../navigation/main/home/homeTypes';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { useRideStore } from '../../modules/ride/store/useRideStore';
import { RideState } from '../../modules/ride/types/RideState';

function SearchBar() {
  const { t } = useTranslation(['home', 'common']);
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();
  const [query, setQuery] = useState('');
  const {setRideState} = useRideStore();

  const submitSearch = () => {
    const destinationText = query.trim();
    navigation.navigate(
      'Ride',
      destinationText ? { destinationText } : undefined,
    );
  };

  return (
    <View style={styles.searchContainer}>
      <TouchableOpacity
        onPress={submitSearch}
        accessibilityRole="button"
        accessibilityLabel={t('common:search')}
      >
        <SearchIcon fill={colors.primary} />
      </TouchableOpacity>

      <TextInput
        placeholder={t('whereTo')}
        value={query}
        onChangeText={setQuery}
        onSubmitEditing={submitSearch}
        returnKeyType="search"
        placeholderTextColor={colors.textMuted}
        style={styles.searchInput}
      />

      <View style={styles.divider} />

      <TouchableOpacity style={styles.timeButton} onPress={() => {
        navigation.navigate('Ride');
        setRideState(RideState.SELECT_TIME);
      }}>
        <ScheduleIcon fill={colors.primary} />
        <Text style={styles.timeText}>{t('common:now')}</Text>
      </TouchableOpacity>
    </View>
  );
}

const createStyles = (colors: ThemeColors) =>
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

