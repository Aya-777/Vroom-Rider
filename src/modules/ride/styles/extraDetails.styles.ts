import { StyleSheet } from 'react-native';
import { Radius, Shadows } from '../../../core/theme/tokens';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    /* ---------------- NextButton ---------------- */
    nextButton: {
      backgroundColor: colors.primary,
      padding: 14,
      borderRadius: 30,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'center',
      ...Shadows.small,
    },

    nextText: {
      color: colors.background,
      fontWeight: '600',
    },

    /* ---------------- TimePriceBox ---------------- */
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

    /* ---------------- VehicleSelector ---------------- */
    vehicleRow: {
      flexDirection: 'row',
    },

    vehicleCard: {
      flex: 1,
      margin: 4,
      padding: 10,
      borderRadius: Radius.md,
      borderWidth: 1,
      alignItems: 'center',
      backgroundColor: colors.surface,
      ...Shadows.small,
    },

    vehicleImage: {
      width: 50,
      height: 35,
      marginBottom: 6,
    },

    vehicleText: {
      color: colors.textMuted,
    },
  });