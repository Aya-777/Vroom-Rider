import { useEffect, useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { HomeStackScreenProps } from '../../../navigation/main/home/homeTypes';
import { useTranslation } from 'react-i18next';

export function useTripStartedViewModel() {
  const navigation =
    useNavigation<HomeStackScreenProps<'SelectRide'>['navigation']>();

  // --- UI State ---

  const [tip, setTip] = useState('');
  const [errors, setErrors] = useState({});
  // const { t } = useTranslation('selectRide');

  // Actions
  const handleBackPress = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    navigation.navigate('HomeScreen');
  };

  const handleCloseReviewModal = () => {
    navigation.navigate('HomeScreen');
  };


  return {
    // State
    tip,
    errors,

    // Setters
    setTip,
    setErrors,

    // Actions
    handleBackPress,
    handleSubmit,
    handleCloseReviewModal
  };
}
