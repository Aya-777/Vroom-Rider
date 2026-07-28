import { StyleSheet } from 'react-native';
import { Typography, Spacing, Shadows } from '../../../core/theme/tokens';
import { ThemeColors } from '../../../core/theme/theme.types';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    // add new place screen
    safeArea: {
      flex: 1,
      paddingTop: 20,
      backgroundColor: colors.backgroundSoft,
    },
    AddNewPlacecontainer: {
      flex: 1,
      backgroundColor: colors.backgroundSoft,
      paddingHorizontal: 20,
      zIndex: 10,
    },
    scrollContent: {
      paddingTop: 10,
      paddingBottom: 24,
    },
    inputGroup: {
      marginBottom: 20,
      // zIndex:10,
    },
    addressGroup: {
      zIndex: 100,
      elevation: 100,
      marginBottom: 20,
    },
    label: {
      fontSize: 14,
      fontWeight: '600',
      color: '#FFFFFF',
      marginBottom: 8,
    },
    textInput: {
      height: 54,
      backgroundColor: '#12192B',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#1D2840',
      paddingHorizontal: 16,
      fontSize: 15,
      color: '#FFFFFF',
    },
    addressInputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      height: 54,
      backgroundColor: '#12192B',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#1D2840',
      paddingHorizontal: 16,
      marginBottom: 20,
    },
    inputIcon: {
      marginRight: 12,
    },
    addressTextInput: {
      flex: 1,
      fontSize: 15,
      color: '#FFFFFF',
    },
    iconSelectionHeader: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 8,
    },
    optionalText: {
      fontSize: 13,
      color: '#536280',
      fontWeight: '500',
    },
    iconGrid: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      gap: 12,
    },
    iconCard: {
      width: '22%',
      backgroundColor: colors.background,
      borderRadius: 16,
      borderWidth: 1,
      borderColor: colors.background,
      justifyContent: 'center',
      alignItems: 'center',
      height: 50,
    },
    selectedIconCard: {
      backgroundColor: colors.surface,
      borderColor: colors.border,
    },
    footer: {
      paddingVertical: 16,
      alignItems: 'center',
    },
    saveButton: {
      flexDirection: 'row',
      height: 54,
      backgroundColor: colors.primary,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
      width: '70%',
    },
    saveIcon: {
      marginLeft: 8,
    },
    saveButtonText: {
      fontSize: 15,
      fontWeight: '600',
      color: colors.backgroundSoft,
      marginEnd: 5,
    },

    addressWrapper: {
      position: 'relative',
      zIndex: 10,
    },
  });
