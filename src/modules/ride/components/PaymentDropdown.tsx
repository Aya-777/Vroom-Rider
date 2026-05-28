import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../core/theme/useTheme';

type Props = {
  selected: string;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: string) => void;
};

export default function PaymentDropdown({
  selected,
  isOpen,
  onToggle,
  onSelect,
}: Props) {
  const { colors } = useTheme();

  return (
    <View>
      <TouchableOpacity onPress={onToggle}>
        <Text style={{ color: colors.textPrimary }}>{selected}</Text>
      </TouchableOpacity>

      {isOpen &&
        ['Cash', 'Wallet'].map(item => (
          <TouchableOpacity key={item} onPress={() => onSelect(item)}>
            <Text>{item}</Text>
          </TouchableOpacity>
        ))}
    </View>
  );
}