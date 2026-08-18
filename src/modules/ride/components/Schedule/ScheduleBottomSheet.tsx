import React, { useMemo, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
} from 'react-native';
import { createStyles } from '../../styles/schedule.styles';
import { useTheme } from '../../../../core/theme/useTheme';
import { BaseBottomSheet } from '../../../../shared/components/BaseBottomSheet';
import { SharedValue } from 'react-native-reanimated';
import WheelPicker from './WheelPicker';

interface ScheduleOrderSheetProps {
  onClose: () => void;
  onSetupOrder: (data: { date: string; time: string; amPm: string }) => void;
  animatedPosition?: SharedValue<number>;
}

export const ScheduleBottomSheet: React.FC<ScheduleOrderSheetProps> = ({
  onClose,
  onSetupOrder,
  animatedPosition,
}) => {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  // Generate dynamic date options ( Today + next 7 days)
  const dates = useMemo(() => {
    const list = [];
    for (let i = 0; i < 7; i++) {
      const d = new Date();
      d.setDate(d.getDate() + i);
      const label =
        i === 0
          ? 'Today'
          : d.toLocaleDateString('en-US', {
              weekday: 'short',
              day: 'numeric',
              month: 'short',
            });
      list.push(label);
    }
    return list;
  }, []);

  const hours = useMemo(
    () => Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0')),
    [],
  );
  const minutes = useMemo(
    () => Array.from({ length: 12 }, (_, i) => String(i * 5).padStart(2, '0')),
    [],
  );
  const amPmOptions = ['AM', 'PM'];

  const [selectedIndexDate, setSelectedIndexDate] = useState(0);
  const [selectedIndexHour, setSelectedIndexHour] = useState(0);
  const [selectedIndexMinute, setSelectedIndexMinute] = useState(0);
  const [selectedIndexAmPm, setSelectedIndexAmPm] = useState(0);
  const snapPoints = useMemo(() => ['50%'], []);
  
  return (
    <BaseBottomSheet
      isVisible={true}
      index={1}
      onClose={onClose}
      snapPoints={snapPoints}
      animatedPosition={animatedPosition}
      enableContentPanningGesture={false}
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

        <WheelPicker
          items={amPmOptions.map(value => ({
            value,
            label: value,
          }))}
          selectedIndex={selectedIndexAmPm}
          onChange={setSelectedIndexAmPm}
          itemHeight={40}
          visibleItems={3}
          textSize={20}
          flex={0.4}
        />
        <WheelPicker
          items={minutes.map(minute => ({
            value: minute,
            label: minute,
          }))}
          selectedIndex={selectedIndexMinute}
          onChange={setSelectedIndexMinute}
          itemHeight={40}
          visibleItems={3}
          textSize={20}
        />

        <WheelPicker
          items={hours.map(hour => ({
            value: hour,
            label: hour,
          }))}
          selectedIndex={selectedIndexHour}
          onChange={setSelectedIndexHour}
          itemHeight={40}
          visibleItems={3}
          textSize={20}
        />
            <WheelPicker
              items={dates.map(date => ({
                value: date,
                label: date,
              }))}
              selectedIndex={selectedIndexDate}
              onChange={setSelectedIndexDate}
              itemHeight={40}
              visibleItems={3}
              textSize={16}
              flex={2}
              width={200}
            />
      </View>

      <Text style={styles.footerText}>
        You will be notified when driver is assigned.
      </Text>

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
