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
    screen: {
      flex: 1,
    },

    container: {
      flex: 1,
      padding: Spacing.md,
    },

    content: {
      flex: 1,
      padding: Spacing.md,
    },

    // Wallet Card
    walletCard: {
      minHeight: 220,
      borderRadius: Radius.xl,
      padding: Spacing.lg,
      marginBottom: Spacing.md,
      overflow: 'hidden',
      ...Shadows.medium,
    },

    cardLabel: {
      ...Typography.caption,
      color: c.textSecondary,
      marginBottom: Spacing.xs,
    },

    balanceAmount: {
      ...Typography.h1,
      color: c.textPrimary,
      marginBottom: Spacing.xl,
    },

    cardFooter: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'flex-end',
    },

    cardMeta: {
      ...Typography.smallCaption,
      color: c.textMuted,
    },

    cardName: {
      ...Typography.semiBoldBody,
      color: c.textPrimary,
      marginBottom: Spacing.xs,
    },

    cardNumber: {
      ...Typography.caption,
      color: c.textSecondary,
    },

    cardBrand: {
      ...Typography.h3,
      color: c.primary,
      letterSpacing: 2,
    },

    // Top Up
    topUpButton: {
      marginBottom: Spacing.lg,
    },

    // Transactions
    sectionTitle: {
      ...Typography.h3,
      color: c.textPrimary,
      marginBottom: Spacing.sm,
    },

    wheel: {
      height: 230,
      justifyContent: 'flex-start',
      paddingTop: Spacing.sm,
      marginTop: 60,
    },

    transactionCard: {
      position: 'absolute',
      width: '100%',
      height: 150,
      borderRadius: Radius.lg,
      overflow: 'hidden',
      ...Shadows.small,
    },

    transactionGradient: {
      flex: 1,
      padding: Spacing.md,
      borderRadius: Radius.lg,
    },

    transactionTopRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    transactionType: {
      ...Typography.semiBoldBody,
      color: c.textPrimary,
      textTransform: 'capitalize',
    },

    transactionAmount: {
      ...Typography.semiBoldBody,
    },

    credit: {
      color: c.success,
    },

    debit: {
      color: c.success,
    },

    transactionDescription: {
      ...Typography.body,
      color: c.textSecondary,
      marginTop: Spacing.md,
    },

    transactionDate: {
      ...Typography.caption,
      color: c.textMuted,
      marginTop: Spacing.sm,
    },

    // Loading / Empty / Error States
    stateContainer: {
      minHeight: 190,
      alignItems: 'center',
      justifyContent: 'center',
      gap: Spacing.sm,
    },

    stateTitle: {
      ...Typography.h3,
      color: c.textPrimary,
    },

    stateText: {
      ...Typography.body,
      color: c.textSecondary,
      textAlign: 'center',
    },

    retryButton: {
      minWidth: 140,
    },

    // Top Up Amount
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
    topUpContent: { paddingTop: 28 },
    topUpSectionTitle: {
      ...Typography.h3,
      color: c.textPrimary,
      textAlign: 'left',
      marginBottom: 18,
    },
    topUpAmountRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      flexWrap: 'nowrap',
      gap: 8,
    },
    topUpAmountInput: {
      marginTop: 22,
    },
    topUpError: {
      textAlign: 'center',
      marginTop: 12,
    },
    topUpButtonContainer: {
      alignItems: 'center',
      marginTop: 22,
    },
  });
