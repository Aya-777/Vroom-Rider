import React from 'react';
import {
  TouchableOpacity,
  Text,
} from 'react-native';
import { useTheme } from '../../../../core/theme/useTheme';
import { createStyles } from '../../styles/selectRide.styles';
import ArrowIcon from '../../../../assets/svg/arrows/arrow.svg';
import { useTranslation } from 'react-i18next';

type Props = {
  onPress: () => void;
};

export default function RideNextButton({
  onPress,
}: Props) {
  const { colors } = useTheme();
  const styles = createStyles(colors);
  const { t } = useTranslation(['common']);

  return (
    <TouchableOpacity
      style={styles.nextButton}
      onPress={onPress}
    >
      <Text style={styles.nextButtonText}>
        {t('next')}
      </Text>

      <ArrowIcon fill={colors.background} />
    </TouchableOpacity>
  );
}