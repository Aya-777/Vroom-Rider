import { StyleSheet } from 'react-native';
import { Typography, Spacing, Shadows, Radius } from '../../../core/theme/tokens';
import { ThemeColors } from '../../../core/theme/theme.types';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(5, 8, 15, 0.75)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: Spacing.mmd,
    },
    modalContainer: {
      width: '100%',
      maxWidth: 380,
      maxHeight: 800,
      backgroundColor: colors.surface,
      borderRadius: Radius.lg,
      borderWidth: 1,
      borderColor: colors.border,
      padding: Spacing.mmd,
      ...Shadows.medium,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: Spacing.mmd,
    },
    headerTitle: {
      ...Typography.h3,
      color: colors.textSecondary,
    },
    closeButton: {
      width: 32,
      height: 32,
      borderRadius: Radius.md,
      backgroundColor: colors.neutral,
      justifyContent: 'center',
      alignItems: 'center',
    },
    listContainer: {
      paddingBottom: Spacing.sm,
    },
    addButton: {
      flexDirection: 'row',
      height: 52,
      backgroundColor: colors.primary,
      borderRadius: Radius.md,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: Spacing.sm,
    },
    addIcon: {
      marginRight: Spacing.sm,
    },
    addButtonText: {
      ...Typography.semiBoldBody,
      color: colors.backgroundSoft,
      marginStart: 5,
    },

    // saved places item
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.backgroundSoft,
      borderRadius: Radius.md,
      padding: Spacing.smd,
      marginBottom: Spacing.smm,
      borderWidth: 1,
      borderColor: colors.border,
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: Radius.smd,
      backgroundColor: colors.surface,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.smm,
    },
    textContainer: {
      flex: 1,
      marginRight: Spacing.sm,
    },
    title: {
      ...Typography.semiBoldBody,
      color: colors.textSecondary,
      marginBottom: Spacing.xxs,
    },
    address: {
      ...Typography.mediumCaption,
      color: colors.textMuted,
      lineHeight: Spacing.md,
    },

  });
