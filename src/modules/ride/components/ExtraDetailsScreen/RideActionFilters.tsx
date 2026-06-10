import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { useTheme } from '../../../../core/theme/useTheme'; 
import LinearBg from '../../../../shared/components/LinearBg';
import DropDownArrowIcon from '../../../../assets/svg/arrows/dropdownArrow.svg';
import ArrowUp from '../../../../assets/svg/arrows/arrowUp.svg';
import FilterIcon from '../../../../assets/svg/ride/filters.svg';
import CashIcon from '../../../../assets/svg/payment/price.svg';

type Props = {
  selectedValue: string;
  isOpen: boolean;
  onToggleDropdown: () => void;
  onSelectPayment: (item: string) => void;
  onFiltersPress?: () => void;
  styles: any; 
};

export default function RideActionFilters({
  selectedValue,
  isOpen,
  onToggleDropdown,
  onSelectPayment,
  onFiltersPress,
  styles,
}: Props) {
  const { colors } = useTheme();
  const gradientColors = [colors.backgroundSoft, colors.surface];

  return (
    <View style={styles.actionCardsRow}>
      
      <TouchableOpacity
        style={styles.cardWrapper}
        onPress={onFiltersPress || (() => console.log('Filters Pressed'))}
        activeOpacity={0.8}
      >
        <LinearBg colors={gradientColors} style={styles.actionCardGradient}>
          <View style={styles.iconWrapper}>
            <FilterIcon width={18} height={18} fill="#FFFFFF" />
          </View>
          <Text style={styles.cardText}>Filters</Text>
        </LinearBg>
      </TouchableOpacity>

      <View style={styles.dropdownWrapper}>
        <TouchableOpacity
          style={styles.cardWrapper}
          onPress={onToggleDropdown}
          activeOpacity={0.8}
        >
          <LinearBg colors={gradientColors} style={styles.actionCardGradient}>
            <View style={styles.iconWrapper}>
              <CashIcon width={18} height={18} fill="#FFFFFF" />
            </View>
            <Text style={styles.cardText}>{selectedValue}</Text>
            {isOpen ? (
              <ArrowUp width={12} height={12} fill="#FFFFFF" />
            ) : (
              <DropDownArrowIcon width={12} height={12} fill="#FFFFFF" />
            )}
          </LinearBg>
        </TouchableOpacity>

        {isOpen && (
          <View style={styles.dropdownMenu}>
            {['Cash', 'Wallet'].map((item) => (
              <TouchableOpacity
                key={item}
                style={styles.menuItem}
                onPress={() => onSelectPayment(item)}
              >
                <Text
                  style={[
                    styles.menuItemText,
                    {
                      color:
                        selectedValue === item
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

    </View>
  );
}