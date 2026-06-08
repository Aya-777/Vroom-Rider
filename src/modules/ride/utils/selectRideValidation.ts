import { RideValidationErrors } from '../types/ride.types';

export const validateRideInputs = (from: string, to: string): RideValidationErrors => {
  const errors: RideValidationErrors = {};

  if (!from.trim()) {
    errors.fromLocation = 'Pickup location is required';
  }
  
  if (!to.trim()) {
    errors.toLocation = 'Destination is required';
  }

  if (from.trim() && to.trim() && from.trim().toLowerCase() === to.trim().toLowerCase()) {
    errors.toLocation = 'Destination cannot be the same as pickup';
  }

  return errors;
};