import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../../core/theme/theme.types';
import {
  Radius,
  Shadows,
  Spacing,
  Typography,
} from '../../../core/theme/tokens';

export const createStyles = (c: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: Spacing.md,
    },

    // Wallet balance card
    balanceCard: {
      borderRadius: Radius.md,
      padding: Spacing.lg,
      marginBottom: Spacing.lg,
      backgroundColor: c.surfaceAccent,
      alignItems: 'center',
      ...Shadows.medium,
    },
    balanceLabel: {
      ...Typography.body,
      color: c.textSecondary,
      marginBottom: Spacing.xs,
    },
    balanceAmount: {
      ...Typography.h2,
      color: c.textPrimary,
      marginBottom: Spacing.md,
    },

    // Section
    sectionTitle: {
      ...Typography.h3,
      color: c.textPrimary,
      marginTop: Spacing.md,
      marginBottom: Spacing.xs,
    },

    // Transactions
    transactionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: Spacing.md,
      borderBottomWidth: 1,
      borderBottomColor: c.border,
    },
    transactionType: {
      ...Typography.body,
      color: c.textPrimary,
    },
    transactionAmount: {
      ...Typography.semiBoldBody,
      color: c.textPrimary,
    },

    // Top-up amounts
    amountRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      columnGap: Spacing.sm,
      rowGap: Spacing.sm,
      marginBottom: Spacing.md,
    },
    amountChip: {
      backgroundColor: c.surface,
      borderWidth: 1,
      borderColor: c.border,
      paddingVertical: Spacing.sm,
      paddingHorizontal: Spacing.md,
      borderRadius: Radius.sm,
    },
    amountChipSelected: {
      backgroundColor: c.primary,
      borderColor: c.primary,
    },
    amountChipText: {
      ...Typography.body,
      color: c.textPrimary,
    },
    amountChipTextSelected: {
      color: c.background,
    },
    amountInput: {
      borderWidth: 1,
      borderColor: c.border,
      borderRadius: Radius.sm,
      padding: Spacing.md,
      marginBottom: Spacing.md,
      color: c.textPrimary,
      ...Typography.body,
    },
    errorText: {
      ...Typography.caption,
      color: c.error,
      marginBottom: Spacing.sm,
    },
  });
