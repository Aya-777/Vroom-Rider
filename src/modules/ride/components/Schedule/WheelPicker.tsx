import React, {
  useCallback,
  useEffect,
  useRef,
} from 'react';
import {
  FlatList,
  NativeScrollEvent,
  NativeSyntheticEvent,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

export interface WheelPickerItem {
  value: string;
  label: string;
}

interface WheelPickerProps {
  items: WheelPickerItem[];
  selectedIndex: number;
  onChange: (index: number) => void;

  width?: number;
  itemHeight?: number;
  visibleItems?: number;

  textSize?: number;
}

export default function WheelPicker({
  items,
  selectedIndex,
  onChange,
  width = 100,
  itemHeight = 48,
  visibleItems = 5,
  textSize = 18,
}: WheelPickerProps) {
  const listRef = useRef<FlatList<WheelPickerItem>>(null);

  const pickerHeight = itemHeight * visibleItems;

  const verticalPadding =
    (pickerHeight - itemHeight) / 2;

  /**
   * Keep the selected item centered.
   */
  useEffect(() => {
    requestAnimationFrame(() => {
      listRef.current?.scrollToOffset({
        offset: selectedIndex * itemHeight,
        animated: false,
      });
    });
  }, [selectedIndex, itemHeight]);

  const handleScrollEnd = useCallback(
    (
      event: NativeSyntheticEvent<NativeScrollEvent>,
    ) => {
      const offset =
        event.nativeEvent.contentOffset.y;

      const index = Math.round(offset / itemHeight);

      const clampedIndex = Math.max(
        0,
        Math.min(index, items.length - 1),
      );

      if (clampedIndex !== selectedIndex) {
        onChange(clampedIndex);
      }
    },
    [
      itemHeight,
      items.length,
      onChange,
      selectedIndex,
    ],
  );

  const handlePress = (index: number) => {
    onChange(index);

    listRef.current?.scrollToOffset({
      offset: index * itemHeight,
      animated: true,
    });
  };

  const renderItem = ({
    item,
    index,
  }: {
    item: WheelPickerItem;
    index: number;
  }) => {
    const distance = Math.abs(
      index - selectedIndex,
    );

    const isSelected = distance === 0;

    let opacity = 0.2;

    if (distance === 0) {
      opacity = 1;
    } else if (distance === 1) {
      opacity = 0.45;
    }

    return (
      <TouchableOpacity
        activeOpacity={0.8}
        onPress={() => handlePress(index)}
        style={[
          styles.item,
          {
            height: itemHeight,
          },
        ]}
      >
        <Text
          style={[
            styles.text,
            {
              fontSize: textSize,
              opacity,
              fontWeight: isSelected
                ? '500'
                : '400',
            },
          ]}
        >
          {item.label}
        </Text>
      </TouchableOpacity>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          width,
          height: pickerHeight,
        },
      ]}
    >
      {/* Selected row highlight */}

      <View
        pointerEvents="none"
        style={[
          styles.selectedRow,
          {
            height: itemHeight,
            top: verticalPadding,
          },
        ]}
      />

      <FlatList
        ref={listRef}
        data={items}
        keyExtractor={(item, index) =>
          `${item.value}-${index}`
        }
        renderItem={renderItem}
        showsVerticalScrollIndicator={false}

        /**
         * This is what makes it a wheel.
         */
        snapToInterval={itemHeight}
        decelerationRate="fast"
        snapToAlignment="start"

        /**
         * Makes first/last items able to reach
         * the center.
         */
        contentContainerStyle={{
          paddingVertical: verticalPadding,
        }}

        getItemLayout={(_, index) => ({
          length: itemHeight,
          offset: itemHeight * index,
          index,
        })}

        onMomentumScrollEnd={handleScrollEnd}
        onScrollEndDrag={handleScrollEnd}

        /**
         * Prevent the FlatList from behaving like
         * a normal long scrolling list.
         */
        nestedScrollEnabled
        bounces={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
    overflow: 'hidden',
  },

  item: {
    alignItems: 'center',
    justifyContent: 'center',
  },

  text: {
    color: '#111',
  },

  selectedRow: {
    position: 'absolute',
    left: 0,
    right: 0,

    borderTopWidth: 1,
    borderBottomWidth: 1,

    borderColor: '#E5E5E5',

    zIndex: 10,
  },
});