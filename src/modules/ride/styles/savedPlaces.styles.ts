import { StyleSheet } from 'react-native';
import { Typography, Spacing, Shadows } from '../../../core/theme/tokens';
import { ThemeColors } from '../../../core/theme/theme.types';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: 'rgba(5, 8, 15, 0.75)',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 20,
    },
    modalContainer: {
      width: '100%',
      maxWidth: 380,
      backgroundColor: '#0F1523',
      borderRadius: 24,
      borderWidth: 1,
      borderColor: '#1D2840',
      padding: 20,
      ...Shadows.medium,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 20,
    },
    headerTitle: {
      fontSize: 18,
      fontWeight: '700',
      color: '#FFFFFF',
    },
    closeButton: {
      width: 32,
      height: 32,
      borderRadius: 16,
      backgroundColor: '#161D31',
      justifyContent: 'center',
      alignItems: 'center',
    },
    listContainer: {
      paddingBottom: 8,
    },
    addButton: {
      flexDirection: 'row',
      height: 52,
      backgroundColor: colors.primary,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 8,
    },
    addIcon: {
      marginRight: 8,
    },
    addButtonText: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.backgroundSoft,
    },

    // saved places item
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#161D31',
      borderRadius: 16,
      padding: 14,
      marginBottom: 12,
      borderWidth: 1,
      borderColor: '#202A44',
    },
    iconContainer: {
      width: 40,
      height: 40,
      borderRadius: 12,
      backgroundColor: '#1E2842',
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 12,
    },
    textContainer: {
      flex: 1,
      marginRight: 8,
    },
    title: {
      fontSize: 15,
      fontWeight: '600',
      color: '#FFFFFF',
      marginBottom: 2,
    },
    address: {
      fontSize: 12,
      color: '#8A9BB8',
      lineHeight: 16,
    },

  });
