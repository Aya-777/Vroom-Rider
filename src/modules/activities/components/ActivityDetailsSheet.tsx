import BottomSheet, {
  BottomSheetBackgroundProps,
  BottomSheetView,
} from '@gorhom/bottom-sheet';
import { useMemo } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import LinearBg from '../../../shared/components/LinearBg';
import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/activityDetails.styles';
import { ActivityDetailsSheetProps } from '../types/activities.types';

export default function ActivityDetailsSheet({
  visible,
  activity,
  onClose,
  onReview,
  onReride,
}: ActivityDetailsSheetProps) {

  const { colors } = useTheme();
  const styles = createStyles(colors);

  const snapPoints = useMemo(() => ['70%'], []);

  const renderBackground = (props: BottomSheetBackgroundProps) => (
    <LinearBg
      colors={[colors.backgroundSoft, colors.background]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
      style={[styles.sheetBackground, props.style]}
    />
  );

  if (!activity) return null;

  return (
    <BottomSheet
      index={visible ? 0 : -1}
      snapPoints={snapPoints}
      enablePanDownToClose
      onClose={onClose}
      handleIndicatorStyle={styles.handleIndicatorStyle}
      backgroundComponent={renderBackground}
      backgroundStyle={styles.sheetBackground}
    >
      <LinearBg
        colors={[colors.backgroundSoft, colors.background]}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.sheetContainer}
      >
        <BottomSheetView style={styles.sheetContent}>

          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.scrollContent}
          >
            <Text style={styles.title}>
              Trip Details
            </Text>
            <View style={styles.row}>
              <Text style={styles.label}>Vehicle</Text>
              <Text style={styles.value}>
                {activity.vehicleType}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Status</Text>
              <Text style={styles.value}>
                {activity.status}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Requested</Text>
              <Text style={styles.value}>
                {activity.date}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Distance</Text>
              <Text style={styles.value}>
                {activity.distance} km
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Duration</Text>
              <Text style={styles.value}>
                {activity.duration}
              </Text>
            </View>

            <View style={styles.row}>
              <Text style={styles.label}>Price</Text>
              <Text style={styles.value}>
                {activity.price} $
              </Text>
            </View>

            <Text style={styles.sectionTitle}>
              Pickup
            </Text>

            <Text style={styles.location}>
              {activity.pickupLocation}
            </Text>

            <Text style={styles.sectionTitle}>
              Destination
            </Text>

            <Text style={styles.location}>
              {activity.dropoffLocation}
            </Text>

            <View style={styles.buttonsRow}>

              <TouchableOpacity
                style={styles.reviewButton}
                onPress={onReview}
              >
                <Text style={styles.reviewText}>
                  Leave Review
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.rerideButton}
                onPress={onReride}
              >
                <Text style={styles.rerideText}>
                  Re-Ride
                </Text>
              </TouchableOpacity>

            </View>
          </ScrollView>
        </BottomSheetView>
      </LinearBg>
    </BottomSheet >
  );
}