import React, { useMemo } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createStyles } from '../../styles/schedule.styles';
import { useTheme } from '../../../../core/theme/useTheme';
import { BaseBottomSheet } from '../../../../shared/components/BaseBottomSheet';
import { SharedValue } from 'react-native-reanimated';
import { useScheduleRideViewModel } from '../../viewmodels/useScheduleRideViewModel';
import DatePicker from 'react-native-date-picker';
import { useTranslation } from 'react-i18next';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { HomeStackParamList } from '../../../../navigation/main/home/homeTypes';

interface ScheduleOrderSheetProps {
  onClose: () => void;
  onSetupOrder: (value: string) => void;
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
  const { t } = useTranslation(['schedule', 'common']);
  const navigation = useNavigation<NativeStackNavigationProp<HomeStackParamList>>();

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
          <Text style={styles.headerButton}>{t('orderNow')}</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => {
            onClose();
            navigation.navigate('HomeScreen');
          }}>
          <Text style={styles.headerButton}>{t('common:cancel')}</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.title}>{t('when')}</Text>

      <View style={styles.pickerContainer}>
        <DatePicker
          date={vm.date}
          onDateChange={vm.setDate}
          mode="datetime"
          minuteInterval={5}
          minimumDate={vm.minimumDate}
        />
      </View>

      <Text style={styles.footerText}>
        {t('notificationMessage')}
      </Text>

      {/* Action Button */}
      <TouchableOpacity
        style={[styles.submitButton]}
        onPress={() => {
          const dateString = vm.getDateString();
          console.log('scheduled_at:', dateString);
          onSetupOrder(dateString);
          onClose();
        }}
      >
        <Text style={styles.submitButtonText}>{t('schedule:setupYourOrder')}</Text>
      </TouchableOpacity>
    </BaseBottomSheet>
  );
};