import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../../core/theme/theme.types';
import { Typography } from '../../../core/theme/tokens';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    actionCardsRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      width: '100%',
      marginBottom: 20,
      gap: 16,
      zIndex: 10,
    },

    dropdown: {
      flexDirection: 'row',
      paddingVertical: 4,
      paddingHorizontal: 5,
      borderRadius: 20,
      alignItems: 'center',
      marginHorizontal: 6,
      elevation: 1,
      borderWidth: 2,
      borderColor: colors.primary,
      backgroundColor: colors.surface,
    },

    dropdownText: {
      ...Typography.semiBoldCaption,
      marginStart: 6,
      marginEnd: 6,
      color: colors.textPrimary,
    },

    dropdownContainer: {
      zIndex: 10,
    },

    cardWrapper: {
      flex: 1,
      height: 58,
      borderRadius: 12,
      overflow: 'hidden',
    },

    actionCardGradient: {
      flex: 1,
      padding: 16,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      borderWidth: 2,
      borderColor: colors.primary,
      borderRadius: 12,
      gap: 6,
      elevation: 4,
      shadowColor: '#1a1c20',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
    },

    cardText: {
      ...Typography.boldCaption,
      color: colors.primary,
    },

    iconWrapper: {
      width: 18,
      height: 18,
      justifyContent: 'center',
      alignItems: 'center',
    },

    dropdownWrapper: {
      flex: 1,
      position: 'relative',
    },

    dropdownMenu: {
      position: 'absolute',
      top: 42,
      left: 6,
      borderRadius: 12,
      width: 120,
      elevation: 5,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      paddingVertical: 4,
      backgroundColor: colors.backgroundSoft,
    },

    menuItem: {
      paddingVertical: 12,
      alignItems: 'center',
    },

    menuItemText: {
      ...Typography.boldCaption,
    },

    actionButton: {
      flexDirection: 'row',
      width: '55%',
      paddingVertical: 10,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: colors.primary,
      elevation: 3,
    },

    actionButtonText: {
      ...Typography.semiBoldBody,
      marginEnd: 5,
      marginBottom: 2,
      color: colors.background,
    },
    mapContainer: {
      flex: 1,
      zIndex: 0, 
    },
    map: { flex: 1,
      zIndex: 0, 
    },
  });
