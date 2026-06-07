import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import { useTheme } from '../../../../core/theme/useTheme';
import { createStyles } from '../../styles/selectRide.styles';
import DropDownArrowIcon from '../../../../assets/svg/arrows/dropdownArrow.svg';
import ArrowUp from '../../../../assets/svg/arrows/arrowUp.svg';

type Props = {
  icon?: React.ReactNode;
  value: string;
  isOpen: boolean;
  items: string[];
  onToggle: () => void;
  onSelect: (item: string) => void;
};

export default function RideDropdown({
  icon,
  value,
  isOpen,
  items,
  onToggle,
  onSelect,
}: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  return (
    <View style={styles.dropdownContainer}>
      <TouchableOpacity
        style={styles.dropdown}
        onPress={onToggle}
      >
        {icon && icon}

        <Text style={styles.dropdownText}>
          {value}
        </Text>

        {isOpen ? (
          <ArrowUp fill={colors.primary} />
        ) : (
          <DropDownArrowIcon fill={colors.primary} />
        )}
      </TouchableOpacity>

      {isOpen && (
        <View style={styles.dropdownMenu}>
          {items.map(item => (
            <TouchableOpacity
              key={item}
              style={styles.menuItem}
              onPress={() => onSelect(item)}
            >
              <Text
                style={[
                  styles.menuItemText,
                  {
                    color:
                      value === item
                        ? colors.primary
                        : colors.textSecondary,
                  },
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      )}
    </View>
  );
}