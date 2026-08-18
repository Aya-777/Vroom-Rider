import { StyleSheet } from 'react-native';
import { Typography, Spacing, Shadows, Radius } from '../../../core/theme/tokens';
import { ThemeColors } from '../../../core/theme/theme.types';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    handleIndicatorStyle: {
      backgroundColor: colors.border || '#D1D5DB',
      width: 40,
    },
    headerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    headerButton: {
      fontSize: 16,
      fontWeight: '600',
      color: colors.primary || '#FF8C00',
    },
    title: {
      fontSize: 22,
      fontWeight: '700',
      textAlign: 'center',
      marginBottom: 10,
      color: colors.textPrimary || '#000000',
    },
    pickerContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      height: 160,
      marginVertical: 10,
      overflow: 'hidden',
    },
    // Highlight window showing the selected active row
    selectionHighlight: {
      position: 'absolute',
      top: 60,
      left: 0,
      right: 0,
      height: 40,
      borderTopWidth: StyleSheet.hairlineWidth,
      borderBottomWidth: StyleSheet.hairlineWidth,
      borderColor: colors.border || '#E5E7EB',
      backgroundColor: colors.primary || 'transparent',
      pointerEvents: 'none',
    },
    column: {
      flex: 1,
      height: 160,
    },
    itemContainer: {
      height: 40,
      alignItems: 'center',
      justifyContent: 'center',
    },
    itemText: {
      fontSize: 18,
      color: colors.textMuted || '#9CAzia',
    },
    selectedItemText: {
      fontSize: 22,
      fontWeight: '700',
      color: colors.textPrimary || '#000000',
    },
    footerText: {
      textAlign: 'center',
      fontSize: 14,
      color: colors.textMuted || '#6B7280',
      marginVertical: 12,
    },
    submitButton: {
      backgroundColor: colors.primary || '#007AFF',
      borderRadius: 12,
      paddingVertical: 16,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    submitButtonText: {
      color: '#FFFFFF',
      fontSize: 16,
      fontWeight: '600',
    },
  });