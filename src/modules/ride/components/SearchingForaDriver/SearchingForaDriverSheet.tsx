import React, { useMemo } from 'react';
import { BaseBottomSheet } from '../../../../shared/components/BaseBottomSheet';
import { useTheme } from '../../../../core/theme/useTheme';
import { createStyles } from '../../styles/selectRide.styles';
import { useTranslation } from 'react-i18next';
import { Text, TouchableOpacity } from 'react-native-gesture-handler';
import { SharedValue } from 'react-native-reanimated';
import { useSearchingForaDriverViewModel } from '../../viewmodels/useSearchingForaDriverViewModel';
import { CancelModal } from '../shared/CancelModal';

type Props = {
  onCancelPress: (reason : string) => void;
  animatedPosition?: SharedValue<number>;
  isCancelling: boolean;
  setIsCancelling: (value: boolean) => void;
  onKeepRide: () => void;
};

export default function SearchingForaDriverSheet({ onCancelPress, animatedPosition, isCancelling, setIsCancelling, onKeepRide }: Props) {
  const { colors, mode } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['selectRide', 'common']);

  const vm = useSearchingForaDriverViewModel();

return(
  <>
    <BaseBottomSheet 
      isVisible={!vm.isSearchingForDriver}
      index={1} 
      snapPoints={['20%']} 
      animatedPosition={animatedPosition}
      >
        <TouchableOpacity style={styles.confirmButton} onPress={setIsCancelling.bind(null, true)}>
          <Text style={styles.confirmButtonText} numberOfLines={1}>Cancel</Text>
        </TouchableOpacity>
      </BaseBottomSheet>

      {isCancelling && (
              <CancelModal
                cancelCurrentRide={onCancelPress}
                keepRide={onKeepRide}
                isCancelling={isCancelling}
              />
            )}
    </>
  );
}
  