import { StyleSheet } from 'react-native';

import {
  Typography,
  Spacing,
  Radius,
  Shadows,
} from '../../../core/theme/tokens';
import { ThemeColors } from '../../../core/theme/theme.types';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },
    listContainer: {
      padding: Spacing.md,
    },

    // Search 
    searchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.md,
      gap: Spacing.sm,
    },
    searchBarContainer: {
      flex: 1,
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: Radius.smd,
      borderWidth: 1,
      borderColor: colors.border,
      paddingHorizontal: Spacing.smm,
      height: 46,
    },
    searchIcon: {
      marginRight: Spacing.sm,
    },
    input: {
      flex: 1,
      ...Typography.mediumCaption,
      color: colors.textSecondary,
    },
    filterButton: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: colors.surface,
      borderRadius: Radius.smd,
      borderWidth: 1,
      borderColor: colors.surface,
      paddingHorizontal: Spacing.smd,
      height: 46,
      gap: Spacing.sm,
    },
    filterText: {
      ...Typography.boldCaption,
      color: colors.textPrimary,
    },

    //Driver Card
    card: {
    backgroundColor: colors.backgroundSoft,
    borderRadius: Radius.md,
    padding: Spacing.md,
    marginBottom: Spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    ...Shadows.small,
  },
  headerRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.md,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: Radius.lg,
    backgroundColor: '#e2e8f0',
  },
  headerInfo: {
    flex: 1,
    marginLeft: Spacing.smm,
  },
  name: {
    ...Typography.h3,
    color: colors.textPrimary,
  },
  ratingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: Spacing.xxs,
    gap: Spacing.xs,
  },
  ratingText: {
    ...Typography.mediumCaption,
    color: colors.textMuted,
    letterSpacing: 0.5,
  },
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: Spacing.smm,
    paddingVertical: Spacing.xs,
    borderRadius: Radius.lg,
    gap: Spacing.xs,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
  },
  badgeText: {
    ...Typography.smallBoldCaption,
  },
  detailsGrid: {
    flexDirection: 'column',
    marginBottom: Spacing.smm,
  },
  detailColumn: {
    flex: 1,
  },
  detailLabel: {
    ...Typography.smallBoldCaption,
    color: colors.textMuted,
    // marginBottom: Spacing.xs,
    letterSpacing: 0.5,
  },
  detailValue: {
    ...Typography.boldCaption,
    color: colors.textSecondary,
  },
  plateContainer: {
    backgroundColor: colors.surface,
    paddingHorizontal: Spacing.sm,
    paddingVertical: Spacing.xxs,
    borderRadius: Radius.sm -2,
    alignSelf: 'flex-start',
    marginTop: Spacing.xs,
  },
  plateText: {
    ...Typography.boldCaption,
    color: colors.textPrimary,
  },
  vehicleSection: {
    marginBottom: Spacing.sm,
  },
  vehicleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    // gap: Spacing.sm,
  },
  colorDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  vehicleName: {
    ...Typography.boldCaption,
    color: colors.textSecondary,
  },
  footerRow: {
    flexDirection: 'row',
    gap: Spacing.sm,
    alignItems: 'center',
    // justifyContent: 'space-between',
  },
  primaryButton: {
    flex: 1,
    height: 44,
    backgroundColor: colors.surface,
    borderRadius: Radius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: Spacing.sm,
  },
  offlineButton: {
    backgroundColor: '#f1f5f9',
  },
  primaryButtonText: {
    ...Typography.boldCaption,
    color: colors.textSecondary,
  },
  offlineButtonText: {
    color: '#94a3b8',
  },
  smallButton: {
    width: 44,
    height: 44,
    backgroundColor: colors.surface,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: Radius.sm,
    alignItems: 'center',
    justifyContent: 'center',
  },
  });
