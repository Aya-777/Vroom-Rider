import { StyleSheet } from 'react-native';

import {
  Typography,
  Spacing,
  Radius,
  Shadows,
} from '../../../core/theme/tokens';

export const createStyles = () =>
  StyleSheet.create({

    gradientContainer: {
      flex: 1,
    },

    container: {
      flex: 1,
    },

    scrollContent: {
      paddingHorizontal: Spacing.lg,
      paddingBottom: 100,
    },

    sectionTitle: {
      ...Typography.h3,
    },

    gridContainer: {
      flexDirection: 'row',
      justifyContent: 'space-evenly',
    },

    gridItemContainer: {
      alignItems: 'center',
      width: '23%',
      marginBottom: Spacing.md,
    },

    gridItem: {
      width: 60,
      height: 60,
      borderRadius: Radius.full,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: Spacing.sm,
    },

    activeGridItem: {
      ...Shadows.small,
    },

    gridLabel: {
      ...Typography.caption,
      textAlign: 'center',
    },

    destinationHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginTop: Spacing.xl,
      marginBottom: Spacing.md,
    },

    destinationList: {
      gap: Spacing.sm,
    },

    destinationCard: {
      flexDirection: 'row',
      padding: Spacing.md,
      borderRadius: Radius.lg,
      alignItems: 'center',
    },

    destIconContainer: {
      width: 44,
      height: 44,
      borderRadius: Radius.full,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
    },

    destTextContainer: {
      flex: 1,
    },

    destTitle: {
      ...Typography.boldBody,
      marginBottom: 2,
    },

    destSubtitle: {
      ...Typography.caption,
    },
  });