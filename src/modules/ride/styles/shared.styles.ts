import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../../core/theme/theme.types';
import {
  Radius,
  Shadows,
  Spacing,
  Typography,
} from '../../../core/theme/tokens';

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
      backgroundColor: colors.surface,
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
      backgroundColor: colors.surface,
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
    map: { flex: 1, zIndex: 0 },

    stopMarker: {
      width: 32,
      height: 32,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
    },

    stopNumber: {
      fontSize: 14,
      fontWeight: 'bold',
    },

    searchResultsContainer: {
      maxHeight: 180,
      backgroundColor: colors.backgroundSoft,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: colors.border,
      zIndex: 20,
      elevation: 10, // For Android touch priority
      marginTop: -15,
    },

    searchScroll: {
      maxHeight: 180,
    },

    searchResultItem: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: colors.border,
    },

    searchResultText: {
      color: colors.textPrimary,
      fontSize: 13,
      lineHeight: 18,
    },
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.45)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: Spacing.xl,
    },

    modal: {
      width: '100%',
      borderRadius: Radius.xl,
      paddingHorizontal: 33,
      paddingVertical: 20,
      overflow: 'hidden',
    },

    title: {
      ...Typography.h2,
      textAlign: 'center',
      color: colors.primary,
      marginBottom: Spacing.md,
    },

    message: {
      ...Typography.semiBoldBody,
      lineHeight: 22,
      textAlign: 'center',
      marginBottom: 20,
      color: colors.textPrimary,
    },

    Divider: {
      height: 2,
      backgroundColor: colors.border,
      marginBottom: Spacing.lg,
      marginTop: Spacing.md,
    },

    cancelInputContainer: {
      marginTop: 12,
      marginBottom: Spacing.xl,
    },

    cancelInputBox: {
      height: undefined,
      minHeight: 90,
      alignItems: 'flex-start',
      paddingVertical: 10,
      borderWidth: 0,
      backgroundColor: colors.surface,
      borderRadius: Radius.md,
    },

    cancelInput: {
      minHeight: 110,
      textAlignVertical: 'top',
      ...Typography.caption,
      color: colors.textPrimary,
      alignItems: 'flex-start',
    },

    actions: {
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      gap: 12,
    },

    cancelButton: {
      flex: 1,
    },

    confirmButton: {
      flex: 1,
    },
  });
