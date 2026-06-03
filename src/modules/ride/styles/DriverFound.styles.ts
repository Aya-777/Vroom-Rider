import { StyleSheet } from 'react-native';
import { Typography, Spacing, Shadows } from '../../../core/theme/tokens';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    contentContainer: {
      flex: 1,
      backgroundColor: colors.background,
    },

    handleBar: {
      width: 38,
      height: 4,
      borderRadius: 2,
      alignSelf: 'center',
      marginBottom: 20,
      backgroundColor: colors.primary,
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
      backgroundColor: colors.primary,
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
      gap: 28,
      marginBottom: 24,
    },

    iconButton: {
      padding: 4,
      width: 44,
      height: 44,
      borderRadius: 22,
      justifyContent: 'center',
      alignItems: 'center',
    },

    progressContainer: {
      width: '100%',
      height: 20,
      justifyContent: 'center',
      marginBottom: Spacing.md,
      alignItems: 'center',
    },

    trackLine: {
      width: '100%',
      position: 'absolute',
      height: 2,
      backgroundColor: colors.primary,
    },

    carDetailsCard: {
      width: '100%',
      borderRadius: 18,
      padding: 18,
      flexDirection: 'row',
      alignItems: 'center',
      color: colors.primary,
      letterSpacing: 1.2,
      backgroundColor: colors.primary,
      ...Shadows.medium,
    },

    carIconContainer: {
      backgroundColor: colors.natural,
      width: 44,
      height: 44,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 16,
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
      color: colors.surface
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
      backgroundColor: colors.primary,
    },

    plateContainer: {
      borderWidth: 1,
      borderRadius: 6,
      paddingHorizontal: 8,
      paddingVertical: 2,
      backgroundColor: colors.natural,
      borderColor: colors.natural,
    },

    plateText: {
      fontSize: 13,
      fontWeight: '700',
      letterSpacing: 0.5,
    },
  });