import { BaseBottomSheet } from '../../../shared/components/BaseBottomSheet';
import { useTheme } from '../../../core/theme/useTheme';
import { createStyles } from '../styles/activityDetails.styles';
import ActivityDetailsList from './sheet/ActivityDetailsList';
import ActivityFooterActions from './sheet/ActivityFooterActions';

export default function ActivityDetailsSheet({
  visible,
  activity,
  onClose,
  onReview,
  onReride,
}: any) {
  const { colors } = useTheme();
  const styles = createStyles(colors);

  if (!activity) return null;

  return (
    <BaseBottomSheet
      isVisible={visible}
      onClose={onClose}
      contentContainerStyle={styles.sheetClip}
      enablePanDownToClose
    >
      <ActivityDetailsList
        activity={activity}
        styles={styles}
        colors={colors}
      />
      <ActivityFooterActions
        styles={styles}
        onReview={onReview}
        onReride={onReride}
      />
    </BaseBottomSheet>
  );
}