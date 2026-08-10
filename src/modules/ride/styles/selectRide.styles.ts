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

    dropdownRow: {
      flexDirection: 'row',
      justifyContent: 'center',
      marginBottom: 16,
    },

    inputCard: {
      width: '100%',
      borderRadius: 16,
      padding: 16,
      paddingBottom: 0,
      flexDirection: 'row',
      elevation: 2,
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      backgroundColor: colors.surface,
    },

    inputTimeline: {
      width: 20,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingVertical: 10,
      marginVertical: 4,
    },

    timelineDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: colors.primary,
    },

    timelineLine: {
      flex: 1,
      width: 2,
      backgroundColor: colors.primary,
    },

    inputContainer: {
      flex: 1,
      marginStart: 10,
    },

    input: {
      height: 35,
      ...Typography.caption,
      color: colors.textPrimary,
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 10,
    },
    addInputContainer:{
      flex:1,
      flexDirection: 'row',
      alignItems:'flex-start',
      justifyContent:'center',
      marginBottom: -15,
    },
    addButton:{
      width: 42,
      height: 51,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.backgroundSoft,
      marginStart: -24,
      marginTop: 2,
    },

    divider: {
      height: 1,
      marginTop: -10,
      marginVertical: 8,
      backgroundColor: colors.primary,
    },

    actionRow: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      marginTop: 16,
      marginBottom: 20,
    },

    actionButton: {
      flexDirection: 'row',
      width: '48%',
      paddingVertical: 8,
      borderRadius: 12,
      justifyContent: 'center',
      alignItems: 'center',
      elevation: 1,
      backgroundColor: colors.surface,
    },

    contactSection: {
      alignItems: 'center',
      // justifyContent: 'center',
      marginBottom: Spacing.lg,
    },

    contactHeader: {  
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: Spacing.sm,
      gap: Spacing.sm,
    },

    numberInput: {
      height: 35,
      width: 300,
      fontSize: 15,
      borderRadius: Radius.lg,
      paddingBottom: Spacing.sm,
      paddingStart: 10,
      marginTop: Spacing.sm,
      backgroundColor: colors.backgroundSoft,
      color: colors.textPrimary,
      ...Shadows.small,
    },

    actionButtonText: {
      ...Typography.caption,
      marginStart: 6,
      color: colors.primary,
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
      elevation: 3,
    },
    
    nextButtonText: {
      ...Typography.body,
      marginEnd: 5,
      marginBottom: 2,
      color: colors.background,
    },
    
    confirmButtonText: {
      ...Typography.h3,
      marginEnd: 5,
      marginBottom: 2,
      color: colors.background,
    },
    
    confirmButton: {
      flexDirection: 'row',
      width: '65%',
      paddingVertical: 14,
      borderRadius: 25,
      justifyContent: 'center',
      alignItems: 'center',
      alignSelf: 'center',
      backgroundColor: colors.primary,
      // elevation: 3,
      margin: 20,
    },
    
    myLocationButton: {
    position: 'absolute',

    right: 0,
    bottom: -50, // adjust to be above your bottom sheet

    width: 52,
    height: 52,
    borderRadius: 26,

    justifyContent: 'center',
    alignItems: 'center',

    backgroundColor: colors.surface,

    zIndex: 20,

    ...Shadows.medium,
  },
  });
