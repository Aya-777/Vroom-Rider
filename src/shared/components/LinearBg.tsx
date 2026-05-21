import React, { ReactNode } from 'react';
import { StyleProp, ViewStyle } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

type Props = {
  children?: ReactNode;
  style?: StyleProp<ViewStyle>;

  colors?: string[];
  start?: { x: number; y: number };
  end?: { x: number; y: number };
};

const LinearBg = ({
  children,
  style,
  colors = ['#FFFFFF', '#E9E9E9'],
  start = { x: 0, y: 0 },
  end = { x: 1, y: 1 },
}: Props) => {
  return (
    <LinearGradient
      colors={colors}
      start={start}
      end={end}
      style={style}
    >
      {children}
    </LinearGradient>
  );
};

export default LinearBg;