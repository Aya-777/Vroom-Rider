import { StyleSheet } from 'react-native';
import { Typography, Spacing, Radius } from '../../../core/theme/tokens';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
    },

    modalContainer: {
      width: '100%',
      borderRadius: Radius.xl,
      paddingHorizontal: 33,
      paddingVertical: 20,
      overflow: 'hidden',
    },

    title: {
      ...Typography.h3,
      color: colors.textPrimary,
      textAlign: 'center',
    },

    subtitle: {
      ...Typography.mediumCaption,
      color: colors.textSecondary,
      textAlign: 'center',
      marginTop: Spacing.xs,
    },

    divider: {
      height: 1,
      backgroundColor: colors.neutral,
      marginVertical: Spacing.mmd,
    },

    total: {
      ...Typography.h1,
      color: colors.textPrimary,
      textAlign: 'center',
    },

    content: {
      flexDirection: 'row',
      minHeight: 175,
      marginBottom: Spacing.md,
    },

    metricsColumn: {
      flex: 1,
      paddingRight: Spacing.smm,
      justifyContent: 'center',
    },

    paymentColumn: {
      flex: 0.4,
      justifyContent: 'center',
      gap: Spacing.md,
      paddingLeft: Spacing.smm,
    },

    verticalDivider: {
      width: 2,
      backgroundColor: colors.textPrimary,
    },
    paymentRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    metricLabel: {
      ...Typography.mediumCaption,
      color: colors.textPrimary,
      marginStart: 2,
    },

    label: {
      ...Typography.mediumCaption,
      color: colors.textPrimary,
    },

    metricRow: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      minWidth: 60,
      height: 30,
      borderRadius: Radius.lg,
      backgroundColor: colors.surface,
      marginBottom: Spacing.smd,
    },

    valueText: {
      ...Typography.mediumCaption,
      color: colors.textPrimary,
      marginEnd: 2,
    },

    tipLabel:{
      ...Typography.caption,
      color: colors.textPrimary,
      marginBottom: -20,
    },

    tipInput: {
      width: "80%",
      height: 30,
      borderRadius: Radius.lg,
      backgroundColor: colors.surface,
      paddingHorizontal: Spacing.sm,
      justifyContent: 'center',
      marginTop: 10,
    },

    tipText: {
      color: colors.textPrimary,
      ...Typography.mediumCaption,
      textAlign: 'center',
      paddingVertical: -20,
    },
  });
