import { useTheme } from '../../core/theme/useTheme';
import { createStyles } from '../styles/sheet.styles';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import BottomSheet, {
  BottomSheetView,
  BottomSheetProps,
} from '@gorhom/bottom-sheet';
import { StyleSheet, ViewStyle } from 'react-native';
import SheetBackground from './SheetBackground';
import {
  SharedValue,

} from 'react-native-reanimated';

interface BaseBottomSheetProps extends Omit<BottomSheetProps, 'children'> {
  isVisible: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle;
  animatedPosition?: SharedValue<number>;
}

export const BaseBottomSheet: React.FC<BaseBottomSheetProps> = ({
  isVisible,
  onClose,
  snapPoints = ['30%', '70%'],
  children,
  contentContainerStyle,
  animatedPosition,
  ...rest
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const renderBackground = useCallback(
    () => <SheetBackground colors={colors} />,
    [colors],
  );
  // Use StyleSheet.flatten to safely merge the passed style with the global padding
  const containerStyle = useMemo(
    () =>
      StyleSheet.flatten([
        { paddingHorizontal: 20, paddingVertical: 10 },
        contentContainerStyle,
      ]),
    [contentContainerStyle],
  );

  const bottomSheetRef = useRef<BottomSheet>(null);

  useEffect(() => {
    if (isVisible) {
      bottomSheetRef.current?.snapToIndex(0);
    } else {
      bottomSheetRef.current?.close();
    }
  }, [isVisible]);

  return (
    <>
      <BottomSheet
      style={styles.bottomSheet}
        ref={bottomSheetRef}
        index={-1}
        snapPoints={snapPoints}
        animatedPosition={animatedPosition}
        onClose={onClose}
        handleIndicatorStyle={styles.handleIndicatorStyle}
        backgroundComponent={renderBackground}
        {...rest}
      >
        <BottomSheetView style={containerStyle}>{children}</BottomSheetView>
      </BottomSheet>
    </>
  );
};




