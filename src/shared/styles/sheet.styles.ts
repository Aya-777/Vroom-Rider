import { StyleSheet } from 'react-native';
import { ThemeColors } from '../../core/theme/theme.types';

export const createStyles = (colors: ThemeColors) =>
  StyleSheet.create({
    handleIndicatorStyle: {
      backgroundColor: colors.textSecondary,
      width: 50,
    },

    sheetBackground: {
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
    },
    myLocationButton: {
      width: 52,
      height: 52,
      borderRadius: 26,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: colors.surface,

      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 6,
    },
  });
