import { StyleSheet } from 'react-native';
import { Typography, Spacing, Shadows, Radius } from '../../../core/theme/tokens';
import { ThemeColors } from '../../../core/theme/theme.types';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    handleIndicatorStyle: {
      backgroundColor: colors.border || '#D1D5DB',
      width: 40,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    headerButton: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.textSecondary,
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 10,
      color: colors.textPrimary,
    },
    pickerContainer: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignContent: 'center',
      // height: 120,
      marginVertical: 30,
      overflow: 'hidden',
    },
    column: {
      flex: 1,
      height: 160,
    },
    itemContainer: {
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemText: {
      fontSize: 18,
      color: colors.textMuted,
    },
    selectedItemText: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.textPrimary,
    },
    footerText: {
      textAlign: 'center',
      fontSize: 14,
      color: colors.textMuted,
      marginVertical: 12,
    },
    submitButton: {
      backgroundColor: colors.backgroundSoft,
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      ...Shadows.small,
      marginBottom: 10,
    },
    submitButtonText: {
      color: colors.textPrimary,
      fontSize: 16,
      fontWeight: '600',
    },
  });