import React, { useCallback, useMemo } from 'react';
import BottomSheet, { BottomSheetView, BottomSheetProps } from '@gorhom/bottom-sheet';
import { useTheme } from '../../core/theme/useTheme';
import { ViewStyle } from 'react-native';
import SheetBackground from './SheetBackground';

interface BaseBottomSheetProps extends Omit<BottomSheetProps, 'children'> {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle;
}

export const BaseBottomSheet: React.FC<BaseBottomSheetProps> = ({
  isVisible,
  onClose,
  snapPoints = ['70%'],
  children,
  contentContainerStyle,
  ...rest
}) => {
  const { colors } = useTheme();

  // Standardize the handle indicator color or style here if needed
  const handleIndicatorStyle = useMemo(() => ({
    backgroundColor: colors.textSecondary,
  }), [colors]);

  const renderBackground = useCallback(
    () => <SheetBackground colors={colors} />,
    [colors]);

  return (
    <BottomSheet
      index={isVisible ? 0 : -1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={onClose}
      handleIndicatorStyle={handleIndicatorStyle}
      backgroundComponent={renderBackground}
      {...rest}
    >
      <BottomSheetView style={contentContainerStyle}>
        {children}
      </BottomSheetView>
    </BottomSheet>
  );
};