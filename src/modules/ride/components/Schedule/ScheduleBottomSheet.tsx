import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity, NativeSyntheticEvent, NativeScrollEvent } from 'react-native';
import { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { createStyles } from '../../styles/schedule.styles';
import { useTheme } from '../../../../core/theme/useTheme';
import { BaseBottomSheet } from '../../../../shared/components/BaseBottomSheet';
import { SharedValue } from 'react-native-reanimated';

interface ScheduleOrderSheetProps {
  onClose: () => void;
  onSetupOrder: (data: { date: string; time: string; amPm: string }) => void;
  animatedPosition?: SharedValue<number>;
  
}

const ITEM_HEIGHT = 40;

export const ScheduleBottomSheet: React.FC<ScheduleOrderSheetProps> = ({
  onClose,
  onSetupOrder,
  animatedPosition
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  // Generate dynamic date options ( Today + next 7 days)
  const dates = useMemo(() => {
    const list = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const label = i === 0 ? 'Today' : d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short' });
      list.push(label);
    }
    return list;
  }, []);

  const hours = useMemo(() => Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')), []);
  const minutes = useMemo(() => Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0')), []);
  const amPmOptions = ['AM', 'PM'];

  const [selectedIndexDate, setSelectedIndexDate] = useState(0);
  const [selectedIndexHour, setSelectedIndexHour] = useState(1); // Default to 2
  const [selectedIndexMinute, setSelectedIndexMinute] = useState(10); // Default to 50
  const [selectedIndexAmPm, setSelectedIndexAmPm] = useState(0); // Default to AM

  const handleScrollEnd = (
    e: NativeSyntheticEvent<NativeScrollEvent>,
    setIndex: (val: number) => void
  ) => {
    const y = e.nativeEvent.contentOffset.y;
    const index = Math.round(y / ITEM_HEIGHT);
    setIndex(index);
  };

  const renderWheelColumn = (
    data: string[],
    selectedIndex: number,
    setIndex: (val: number) => void
  ) => (
    <View style={styles.column}>
      <BottomSheetScrollView
        showsVerticalScrollIndicator={false}
        snapToInterval={ITEM_HEIGHT}
        // decelerationRate="fast"
        onMomentumScrollEnd={(e) => handleScrollEnd(e, setIndex)}
        contentContainerStyle={{ paddingVertical: ITEM_HEIGHT }}
      >
        {data.map((item, idx) => {
          const isSelected = idx === selectedIndex;
          return (
            <View key={idx} style={styles.itemContainer}>
              <Text style={isSelected ? styles.selectedItemText : styles.itemText}>
                {item}
              </Text>
            </View>
          );
        })}
      </BottomSheetScrollView>
    </View>
  );

  const snapPoints = useMemo(() => ['30%', '70%'], []);
  return (
    <BaseBottomSheet 
      isVisible={true} 
      onClose={onClose} 
      snapPoints={snapPoints}
      animatedPosition={animatedPosition}
    >
      {/* Header */}
      <View style={styles.headerContainer}>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.headerButton}>Order now</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={onClose}>
          <Text style={styles.headerButton}>Cancel</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>When?</Text>

      {/* Dynamic Pickers Container with active highlight overlay */}
      <View style={styles.pickerContainer}>
        <View style={styles.selectionHighlight} />
        {renderWheelColumn(dates, selectedIndexDate, setSelectedIndexDate)}
        {renderWheelColumn(hours, selectedIndexHour, setSelectedIndexHour)}
        {renderWheelColumn(minutes, selectedIndexMinute, setSelectedIndexMinute)}
        {renderWheelColumn(amPmOptions, selectedIndexAmPm, setSelectedIndexAmPm)}
      </View>

      <Text style={styles.footerText}>Your driver will be assigned later</Text>

      {/* Action Button */}
      <TouchableOpacity
        style={styles.submitButton}
        activeOpacity={0.8}
        onPress={() => {
          onSetupOrder({
            date: dates[selectedIndexDate],
            time: `${hours[selectedIndexHour]}:${minutes[selectedIndexMinute]}`,
            amPm: amPmOptions[selectedIndexAmPm],
          });
          onClose();
        }}
      >
        <Text style={styles.submitButtonText}>Set up your order</Text>
      </TouchableOpacity>
    </BaseBottomSheet>
  );
};