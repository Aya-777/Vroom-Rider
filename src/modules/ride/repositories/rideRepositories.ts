import { useMutation, useQuery } from '@tanstack/react-query';

import { rideApi } from '../services/rideApi';

import {
  PriceEstimateRequestDTO,
  PriceEstimateResponseDTO,
  RequestRideRequestDTO,
  RequestRideResponseDTO,
  SavedPlaceDTO
} from '../services/dto/ride.dto';

export const useRideRepository = {
 useSavedPlaces: (enabled = true) =>
    useQuery<SavedPlaceDTO[], Error>({
      queryKey: ['savedPlaces'],
      queryFn: rideApi.getSavedPlaces,
      enabled,
    }),
};
