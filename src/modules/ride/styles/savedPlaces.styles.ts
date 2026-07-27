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
      marginBottom:20,
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
    },
    saveButton: {
      flexDirection: 'row',
      height: 54,
      backgroundColor: colors.primary,
      borderRadius: 16,
      justifyContent: 'center',
      alignItems: 'center',
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
searchResultsContainer: {
      position: 'absolute',
      top: 60,
      left: 0,
      right: 0,
      maxHeight: 180, // Use maxHeight instead of strict height
      backgroundColor: '#12192B',
      borderRadius: 16,
      borderWidth: 1,
      borderColor: '#1D2840',
      zIndex: 999, // Ensure it's high enough to capture touches above other elements
      elevation: 10, // For Android touch priority
    },

    searchScroll: {
      maxHeight: 180, // Match the container limit
    },

    searchResultItem: {
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderBottomWidth: 1,
      borderBottomColor: '#1D2840',
    },  

    searchResultText: {
      color: '#FFFFFF',
      fontSize: 13,
      lineHeight: 18,
    },
  });
