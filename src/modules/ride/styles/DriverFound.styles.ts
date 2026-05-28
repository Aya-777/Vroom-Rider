import { StyleSheet } from 'react-native';
import { Typography, Spacing, Radius, Shadows } from '../../../core/theme/tokens';

export const createStyles = (_colors: any) =>
  StyleSheet.create({
    contentContainer: {
      flex: 1,
    },

    handleBar: {
      width: 40,
      height: 4,
      borderRadius: Radius.full,
      alignSelf: 'center',
      marginBottom: Spacing.md,
    },

    statusText: {
      ...Typography.semiBoldBody,
      textAlign: 'center',
      marginBottom: Spacing.lg,
    },

    avatarContainer: {
      width: 84,
      height: 84,
      borderRadius: 42,
      overflow: 'hidden',
      alignSelf: 'center',
      marginBottom: Spacing.sm,
      ...Shadows.small,
    },

    avatarImage: {
      width: '100%',
      height: '100%',
      resizeMode: 'cover',
    },

    driverName: {
      ...Typography.h2,
      textAlign: 'center',
      marginBottom: Spacing.md,
    },

    communicationRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: Spacing.lg,
      marginBottom: Spacing.lg,
    },

    iconButton: {
      padding: Spacing.xs,
    },

    progressContainer: {
      width: '100%',
      height: 20,
      justifyContent: 'center',
      marginBottom: Spacing.md,
    },

    trackLine: {
      width: '100%',
      height: 2,
    },

    carDetailsCard: {
      borderRadius: Radius.lg,
      padding: Spacing.md,
      flexDirection: 'row',
      alignItems: 'center',
      ...Shadows.medium,
    },

    carIconContainer: {
      width: 44,
      height: 44,
      borderRadius: Radius.sm,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: Spacing.md,
    },

    carInfoTextDetails: {
      flex: 1,
    },

    carDetailsTitle: {
      ...Typography.semiBoldCaption,
      marginBottom: 4,
    },

    carModelText: {
      ...Typography.semiBoldBody,
      marginBottom: 6,
    },

    plateRow: {
      flexDirection: 'row',
      alignItems: 'center',
    },

    carColorText: {
      ...Typography.caption,
      opacity: 0.8,
    },

    bulletSeparator: {
      width: 4,
      height: 4,
      borderRadius: 2,
      marginHorizontal: 8,
    },

    plateContainer: {
      borderRadius: Radius.sm,
      paddingHorizontal: 8,
      paddingVertical: 2,
    },

    plateText: {
      fontSize: 13,
      fontWeight: '700',
      letterSpacing: 0.5,
    },
  });