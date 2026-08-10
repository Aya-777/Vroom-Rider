import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useTheme } from '../../../../core/theme/useTheme';

type MapPinType = 'pickup' | 'stop' | 'destination';

type Props = {
  type: MapPinType;
  label?: string;
};

export default function MapPin({ type, label }: Props) {
  const { colors } = useTheme();

  const getLabel = () => {
    if (type === 'pickup') return 'P';
    if (type === 'destination') return 'D';
    if (type === 'stop') return 'S';
    return label ?? '';
  };

  const pinColor =
    type === 'pickup'
      ? colors.primary
      : type === 'destination'
      ? colors.error
      : colors.textMuted;

  return (
    <View style={styles.wrapper}>
      <View
        style={[
          styles.pin,
          {
            backgroundColor: pinColor,
            borderColor: colors.surface,
          },
        ]}
      >
        <Text
          style={[
            styles.label,
            {
              color: colors.surface,
            },
          ]}
        >
          {getLabel()}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    width: 40,
    height: 40,
    alignItems: 'center',
  },

  pin: {
    width: 26,
    height: 26,
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
  },

  label: {
    fontSize: 14,
    fontWeight: '700',
  },
});
