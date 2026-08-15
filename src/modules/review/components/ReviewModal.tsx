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

type Props = {
  visible: boolean;
  onClose: () => void;
  onSubmit: (rating: number, review: string, isComplaint: boolean) => void;
};

export default function ReviewModal({ visible, onClose, onSubmit }: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [isComplaint, setIsComplaint] = useState(false);
  const handleSubmit = () => {
    onSubmit(rating, review, isComplaint);
    setRating(0);
    setReview('');
    onClose();
  };
  const handleCancel = () => {
    setRating(0);
    setReview('');
    onClose();
  };

  return (
    <Modal
      visible={visible}
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
              <RatingStars rating={rating} onChange={setRating} />
              <View style={styles.Divider} />
            </View>
            <View>
              <Text style={styles.sectionTitle}>Write your review</Text>
              <Input
                value={review}
                onChangeText={setReview}
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
              onPress={() => setIsComplaint(prev => !prev)}
            >
              <View style={[styles.checkbox, isComplaint && styles.checkboxChecked]}>
                {isComplaint && <Text style={styles.checkmark}>✓</Text>}
              </View>

              <Text style={styles.complaintLabel}>Complaint</Text>
            </Pressable>
            <View style={styles.Divider} />
            <ReviewActions onCancel={handleCancel} onSubmit={handleSubmit} />
          </LinearBg>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}
