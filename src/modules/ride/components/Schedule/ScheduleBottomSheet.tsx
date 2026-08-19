import React, { useMemo, useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStyles } from '../../styles/schedule.styles';
import { useTheme } from '../../../../core/theme/useTheme';
import { BaseBottomSheet } from '../../../../shared/components/BaseBottomSheet';
import { SharedValue } from 'react-native-reanimated';
import { useScheduleRideViewModel } from '../../viewmodels/useScheduleRideViewModel';
import DatePicker from 'react-native-date-picker';

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
  const [date, setDate] = useState(new Date());

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

      <View style={styles.pickerContainer}>
        <DatePicker 
          date={date}
          onDateChange={setDate}
          mode="datetime" 
          minuteInterval={5}
          minimumDate={new Date()}
        />
      </View>

      <Text style={styles.footerText}>
        You will be notified when driver is assigned.
      </Text>

      {/* Action Button */}
      <TouchableOpacity
        style={[
          styles.submitButton,
        ]}
        onPress={() => {
          onSetupOrder({
            date: vm.dates[vm.selectedIndexDate],
            time: `${vm.hours[vm.selectedIndexHour]}:${
              vm.minutes[vm.selectedIndexMinute]
            }`,
            amPm: vm.amPmOptions[vm.selectedIndexAmPm],
          });

          onClose();
        }}
      >
        <Text style={styles.submitButtonText}>Set up your order</Text>
      </TouchableOpacity>
    </BaseBottomSheet>
  );
};
