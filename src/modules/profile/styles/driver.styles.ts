import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../../core/theme/theme.types';
import { Spacing, Radius, Shadows, Typography } from '../../../core/theme/tokens';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
    },

    content: {
      padding: Spacing.md,
    },

    hero: {
      height: 190,
      borderRadius: Radius.md,
      overflow: 'hidden',
      marginBottom: Spacing.lg,
    },
    heroImage: {
      borderRadius: Radius.md,
    },
    heroOverlay: {
      flex: 1,
      justifyContent: 'flex-end',
      padding: Spacing.md,
    },
    heroTitle: {
      color: colors.backgroundSoft,
      fontSize: 24,
      fontWeight: '800',
    },
    heroSub: {
      color: colors.backgroundSoft,
      ...Typography.caption,
      marginTop: Spacing.xs,
      maxWidth: '85%',
    },

    section: {
      fontSize: 20,
      fontWeight: '800',
      marginBottom: Spacing.md,
      color: colors.textPrimary,
    },

    row: {
      flexDirection: 'row',
      gap: Spacing.smd,
    },
    dotColumn: {
      alignItems: 'center',
      width: 28,
    },
    dot: {
      width: 28,
      height: 28,
      borderRadius: 14,
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: colors.primary,
    },
    dotText: {
      color: colors.background,
      fontWeight: '700',
      fontSize: 13,
    },
    connector: {
      flex: 1,
      width: 2,
      minHeight: 24,
      backgroundColor: colors.primary,
      opacity: 0.35,
      marginVertical: 4,
    },
    stepContent: {
      flex: 1,
      paddingBottom: Spacing.md,
    },
    stepTitle: {
      fontSize: 14,
      fontWeight: '800',
      marginBottom: 4,
      color: colors.textPrimary,
    },
    desc: {
      fontSize: 12,
      lineHeight: 17,
      color: colors.textSecondary,
    },

    card: {
      borderRadius: 14,
      padding: Spacing.lg,
      alignItems: 'center',
      marginTop: Spacing.sm,
      marginBottom: Spacing.md,
      backgroundColor: colors.surfaceAccent,
      borderColor: colors.primary,
      borderWidth: 2,
      ...Shadows.small,
    },
    cardTitle: {
      fontSize: 19,
      fontWeight: '800',
      color: colors.textPrimary,
    },
    cardSubtitle: {
      fontSize: 12,
      color: colors.textSecondary,
      marginTop: Spacing.xs,
    },
    button: {
      width: '100%',
      padding: Spacing.smd,
      alignItems: 'center',
      marginTop: Spacing.md,
      borderRadius: Radius.sm,
      backgroundColor: colors.primary,
    },
    buttonText: {
      fontWeight: '700',
      color: colors.background,
    },

    support: {
      minHeight: 56,
      borderRadius: 12,
      paddingHorizontal: Spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      backgroundColor: colors.primary, 
    },
    supportLeft: {
      flexDirection: 'row',
      alignItems: 'center',
      gap: Spacing.sm,
    },
    supportIcon: {
      width: 22,
      height: 22,
      borderRadius: 11,
      borderWidth: 1,
      borderColor: colors.background, 
      alignItems: 'center',
      justifyContent: 'center',
    },
    supportIconText: {
      fontSize: 12,
      color: colors.background,
    },
    supportText: {
      color: colors.background,
      fontSize: 13,
    },
    link: {
      fontWeight: '800',
      textDecorationLine: 'underline',
      color: colors.background, 
      fontSize: 13,
    },
  });


