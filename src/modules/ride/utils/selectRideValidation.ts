import { RideValidationErrors } from '../types/ride.types';
import { useTranslation } from 'react-i18next';

export const validateRideInputs = (from: string, to: string): RideValidationErrors => {
  const errors: RideValidationErrors = {};
  const {t} = useTranslation('selectRide');
  
  if (!from.trim()) {
    errors.fromLocation = t('selectRide:pickupRequired');
  }
  
  if (!to.trim()) {
    errors.toLocation = t('selectRide:destinationRequired');
  }

  if (from.trim() && to.trim() && from.trim().toLowerCase() === to.trim().toLowerCase()) {
    errors.toLocation = t('selectRide:sameInputs');
  }

  return errors;
};