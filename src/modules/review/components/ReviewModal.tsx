import React, { useState } from 'react';
import {
  Modal,
  View,
  Text,
  TouchableWithoutFeedback,
  Keyboard,
  Pressable,
} from 'react-native';
import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/review.styles';
import RatingStars from './RatingStars';
import ReviewActions from './ReviewActions';
import Input from '../../../shared/components/Input';
import LinearBg from '../../../shared/components/LinearBg';
import { useReviewViewModel } from '../../ride/viewmodels/useReviewViewModel';

type Props = {
  isVisible: boolean;
  setIsVisible: (value: boolean) => void;
  rideId?: number;
};

export default function ReviewModal({
  isVisible,
  rideId,
  setIsVisible,
}: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  const vm = useReviewViewModel(isVisible, setIsVisible, rideId);

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.overlay}>
          <LinearBg
            colors={[colors.backgroundSoft, colors.background]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0.8 }}
            style={styles.modalContainer}
          >
            <Text style={styles.modalTitle}>Leave a Review</Text>
            <View style={styles.Divider} />
            <View>
              <Text style={styles.sectionTitle}>Rate your trip</Text>
              <RatingStars rating={vm.rating} onChange={vm.setRating} />
              <View style={styles.Divider} />
            </View>
            <View>
              <Text style={styles.sectionTitle}>Write your review</Text>
              <Input
                value={vm.review}
                onChangeText={vm.setReview}
                placeholder="Write your review..."
                multiline
                numberOfLines={5}
                maxLength={500}
                containerStyle={styles.reviewInputContainer}
                inputBoxStyle={styles.reviewInputBox}
                inputStyle={styles.reviewInput}
              />
            </View>
            <Pressable
              style={styles.complaintRow}
              onPress={() => vm.setIsComplaint(prev => !prev)}
            >
              <View
                style={[
                  styles.checkbox,
                  vm.isComplaint && styles.checkboxChecked,
                ]}
              >
                {vm.isComplaint && <Text style={styles.checkmark}>✓</Text>}
              </View>

              <Text style={styles.complaintLabel}>Complaint</Text>
            </Pressable>
            <View style={styles.Divider} />
            <ReviewActions
              onCancel={() => {
                setIsVisible(false);
                vm.handleMaybeLater();
              }}
              onSubmit={() => {
                vm.handleSubmitReview();
                setIsVisible(false);
              }}
            />
          </LinearBg>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
