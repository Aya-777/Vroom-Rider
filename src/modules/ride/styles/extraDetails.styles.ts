import { StyleSheet } from 'react-native';
import { Radius, Shadows, Typography } from '../../../core/theme/tokens';
import { ThemeColors } from '../../../core/theme/theme.types';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    nextButton: {
      flexDirection: 'row',
      width: '50%',
      paddingVertical: 14,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.primary,
      ...Shadows.small,
    },

    nextText: {
      color: colors.background,
      fontWeight: '600',
      marginRight: 6,
      marginBottom: 4,
    },

    timePriceRow: {
      flexDirection: 'row',
      marginBottom: 12,
    },

    timeBox: {
      flex: 1,
      backgroundColor: colors.surface,
      padding: 10,
      marginRight: 6,
      borderRadius: Radius.md,
      ...Shadows.small,
    },

    priceBox: {
      flex: 1,
      backgroundColor: colors.surface,
      padding: 10,
      marginLeft: 6,
      borderRadius: Radius.md,
      ...Shadows.small,
    },

    timePriceText: {
      color: colors.textPrimary,
      marginTop: 4,
    },

    vehicleRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 24,
      zIndex: 1,
    },

    vehicleCard: {
      width: '30%',
      borderRadius: 12,
      paddingVertical: 12,
      alignItems: 'center',
      backgroundColor: colors.surface,
      ...Shadows.small,
    },

    activeVehicleCard: {
      borderWidth: 2,
      borderColor: colors.primary,
      backgroundColor : colors.primary + '20'
    },

    vehicleImage: {
      width: 50,
      height: 35,
      marginBottom: 6,
    },

    vehicleText: {
      color: colors.textMuted,
      ...Typography.semiBoldCaption,
    },

    activeVehicleText: {
      color: colors.primary,
    },

  });