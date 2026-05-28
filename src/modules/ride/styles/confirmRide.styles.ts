import { StyleSheet } from 'react-native';

import {
  Shadows,
  Typography,
  Radius,
  Spacing,
} from '../../../core/theme/tokens';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    grid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
      marginBottom: Spacing.lg,
    },

    box: {
      width: '48%',
      borderRadius: Radius.md,
      padding: Spacing.sm,
      marginBottom: Spacing.sm,
      backgroundColor: colors.surface,
      ...Shadows.medium,
    },

    boxHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.xs,
    },

    boxTitle: {
      marginLeft: Spacing.xs,
      color: colors.textPrimary,
      ...Typography.boldCaption,
    },

    boxValue: {
      color: colors.textPrimary,
      textAlign: 'center',
      marginVertical: Spacing.xs,
      ...Typography.semiBoldCaption,
    },

    line: {
      height: 1,
      marginTop: Spacing.xs,
      backgroundColor: colors.border,
    },

    contactSection: {
      marginBottom: Spacing.lg,
    },

    contactHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.sm,
      gap: Spacing.sm,
    },

    input: {
      flex: 1,
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
      color: colors.background,
      ...Typography.semiBoldBody,
    },
  });