import { useTheme } from '../../core/theme/useTheme';
import { createStyles } from '../styles/sheet.styles';
import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import BottomSheet, {
  BottomSheetView,
  BottomSheetProps,
} from '@gorhom/bottom-sheet';
import { StyleSheet, ViewStyle } from 'react-native';
import SheetBackground from './SheetBackground';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { TouchableOpacity } from 'react-native';
import MyLocationIcon from '../../assets/svg/common/myLocation.svg';

interface BaseBottomSheetProps extends Omit<BottomSheetProps, 'children'> {
  isVisible: boolean;
  onClose?: () => void;
  children: React.ReactNode;
  contentContainerStyle?: ViewStyle;
}

export const BaseBottomSheet: React.FC<BaseBottomSheetProps> = ({
  isVisible,
  onClose,
  snapPoints = ['30%', '70%'],
  children,
  contentContainerStyle,
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
  const animatedPosition = useSharedValue(0);

  const locationButtonStyle = useAnimatedStyle(() => ({
  position: 'absolute',
  right: 20,
  top: animatedPosition.value - 68, // button height (52) + 16px margin
  zIndex: 999,
}));

useEffect(() => {
  if (isVisible) {
    bottomSheetRef.current?.snapToIndex(0);
  } else {
    bottomSheetRef.current?.close();
  }
}, [isVisible]);

  return (
    <>
  <Animated.View style={locationButtonStyle}>
    <TouchableOpacity
      style={styles.myLocationButton}
      onPress={() => {
        // TODO
      }}
    >
      <MyLocationIcon
        width={24}
        height={24}
        fill={colors.primary}
      />
    </TouchableOpacity>
  </Animated.View>

  <BottomSheet
    ref={bottomSheetRef}
    index={-1}
    snapPoints={snapPoints}
    animatedPosition={animatedPosition}
    onClose={onClose}
    handleIndicatorStyle={styles.handleIndicatorStyle}
    backgroundComponent={renderBackground}
    {...rest}
  >
    <BottomSheetView style={containerStyle}>
      {children}
    </BottomSheetView>
  </BottomSheet>
</>
  );
};
