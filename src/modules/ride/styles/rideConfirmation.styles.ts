import { StyleSheet } from 'react-native';
import type { ThemeColors } from '../../../core/theme/types';
import { Spacing, Radius, Shadows, Typography } from '../../../core/theme/tokens';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 50,
    },

    contactSection: {
      marginBottom: Spacing.lg,
    },

    contactHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.sm,
    },

    contactTitle: {
      marginLeft: Spacing.sm,
      ...Typography.semiBoldCaption,
      color: colors.textPrimary,
    },

    input: {
      borderRadius: Radius.lg,
      paddingHorizontal: Spacing.md,
      paddingVertical: Spacing.sm,
      backgroundColor: colors.surface,
      color: colors.textPrimary,
      ...Shadows.small,
    },

    button: {
      flexDirection: 'row',
      borderRadius: Radius.full,
      paddingVertical: Spacing.md,
      justifyContent: 'center',
      alignItems: 'center',
      gap: Spacing.sm,
      backgroundColor: colors.primary,
      ...Shadows.small,
    },

    buttonText: {
      ...Typography.semiBoldBody,
      color: colors.background,
    },
  });