import { StyleSheet } from 'react-native';
import type { ThemeColors } from '../../../core/theme/types';
import { Radius, Shadows } from '../../../core/theme/tokens';

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

    // infoRow: {
    //   flexDirection: 'row',
    //   justifyContent: 'space-between',
    //   width: '100%',
    //   marginBottom: 16,
    // },

    vehicleCard: {
      width: '30%',
      borderRadius: 12,
      paddingVertical: 12,
      alignItems: 'center',
      backgroundColor: colors.surface,
      ...Shadows.small,
    },

    activeVehicleCard: {
      borderWidth: 1,
      borderColor: colors.primary,
    },

    vehicleImage: {
      width: 50,
      height: 35,
      marginBottom: 6,
    },

    vehicleText: {
      color: colors.textMuted,
    },

    activeVehicleText: {
      color: colors.primary,
    },

    // underline: {
    //   height: 1,
    //   width: '100%',
    //   marginTop: 4,
    // },

    // infoBox: {
    //   backgroundColor: colors.surface,
    //   width: '48%',
    //   borderRadius: 12,
    //   paddingTop: 12,
    //   paddingHorizontal: 14,
    //   paddingBottom: 6,
    //   ...Shadows.medium,
    // }
  });