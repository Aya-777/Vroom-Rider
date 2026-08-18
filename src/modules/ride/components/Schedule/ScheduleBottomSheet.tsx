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
import { useScheduleRideViewModel } from '../../viewmodels/useScheduleRideViewModel';

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
  const vm = useScheduleRideViewModel();
  
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
          items={vm.amPmOptions.map(value => ({
            value,
            label: value,
          }))}
          selectedIndex={vm.selectedIndexAmPm}
          onChange={vm.setSelectedIndexAmPm}
          itemHeight={40}
          visibleItems={3}
          textSize={20}
        />
        <WheelPicker
          items={vm.minutes.map(minute => ({
            value: minute,
            label: minute,
          }))}
          selectedIndex={vm.selectedIndexMinute}
          onChange={vm.setSelectedIndexMinute}
          itemHeight={40}
          visibleItems={3}
          textSize={20}
        />

        <WheelPicker
          items={vm.hours.map(hour => ({
            value: hour,
            label: hour,
          }))}
          selectedIndex={vm.selectedIndexHour}
          onChange={vm.setSelectedIndexHour}
          itemHeight={40}
          visibleItems={3}
          textSize={20}
        />
            <WheelPicker
              items={vm.dates.map(date => ({
                value: date,
                label: date,
              }))}
              selectedIndex={vm.selectedIndexDate}
              onChange={vm.setSelectedIndexDate}
              itemHeight={40}
              visibleItems={3}
              textSize={16}
              flex={1.4}
              width={200}
            />
      </View>

      {vm.scheduleError && (
        <Text style={styles.scheduleError}>
          {vm.scheduleError}
        </Text>
      )}

      <Text style={styles.footerText}>
        You will be notified when driver is assigned.
      </Text>

      {/* Action Button */}
      <TouchableOpacity
  style={[
    styles.submitButton,
    vm.scheduleError && styles.submitButtonDisabled,
  ]}
  disabled={!!vm.scheduleError}
  onPress={() => {
    onSetupOrder({
      date: vm.dates[vm.selectedIndexDate],
      time: `${vm.hours[vm.selectedIndexHour]}:${vm.minutes[vm.selectedIndexMinute]}`,
      amPm: vm.amPmOptions[vm.selectedIndexAmPm],
    });

    onClose();
  }}
>
  <Text style={styles.submitButtonText}>
    Set up your order
  </Text>
</TouchableOpacity>
    </BaseBottomSheet>
  );
};
