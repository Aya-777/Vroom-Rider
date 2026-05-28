import { StyleSheet } from 'react-native';

import {
  Shadows,
} from '../../../core/theme/tokens';

export const createStyles = (colors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: colors.background,
    },

    dropdownRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 16,
    },

    dropdownContainer: {
      zIndex: 10,
    },

    dropdown: {
      flexDirection: 'row',
      paddingVertical: 8,
      paddingHorizontal: 14,
      borderRadius: 20,
      alignItems: 'center',
      marginHorizontal: 6,
      backgroundColor: colors.surface,
    },

    dropdownText: {
      fontWeight: '600',
      fontSize: 14,
      marginLeft: 6,
      marginRight: 6,
      color: colors.textPrimary,
    },

    dropdownMenu: {
      position: 'absolute',
      top: 42,
      left: 6,
      borderRadius: 12,
      width: 140,
      elevation: 5,
      paddingVertical: 4,
      backgroundColor: colors.surface,
    },

    menuItem: {
      paddingVertical: 12,
      alignItems: 'center',
    },

    menuItemText: {
      fontSize: 14,
      fontWeight: '500',
    },

    inputCard: {
      width: '100%',
      borderRadius: 16,
      padding: 16,
      flexDirection: 'row',
      backgroundColor: colors.surface,
      ...Shadows.small,
    },

    inputTimeline: {
      width: 20,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
    },

    timelineDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.border,
    },

    timelineLine: {
      flex: 1,
      width: 2,
      backgroundColor: colors.border,
    },

    inputContainer: {
      flex: 1,
      marginLeft: 10,
    },

    input: {
      height: 35,
      fontSize: 15,
      color: colors.textPrimary,
    },

    divider: {
      height: 1,
      marginVertical: 4,
      backgroundColor: colors.border,
    },

    actionRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      marginTop: 16,
      marginBottom: 20,
    },

    actionButton: {
      flexDirection: 'row',
      width: '48%',
      paddingVertical: 12,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.surface,
    },

    actionButtonText: {
      fontWeight: '600',
      fontSize: 14,
      marginLeft: 6,
    },

    nextButton: {
      flexDirection: 'row',
      width: '50%',
      paddingVertical: 14,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: colors.primary,
    },

    nextButtonText: {
      fontSize: 16,
      fontWeight: '600',
      marginRight: 5,
      color: colors.background,
    },
  });