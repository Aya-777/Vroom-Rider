import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

import { rideApi } from '../services/rideApi';

import {
  CreateSavedPlaceRequestDTO,
  CreateSavedPlaceResponseDTO,
  PriceEstimateRequestDTO,
  PriceEstimateResponseDTO,
  RequestRideRequestDTO,
  RequestRideResponseDTO,
  SavedPlaceDTO,
} from '../services/dto/ride.dto';

export const useRideRepository = {
  useSavedPlaces: (enabled = true) =>
    useQuery<SavedPlaceDTO[], Error>({
      queryKey: ['savedPlaces'],
      queryFn: rideApi.getSavedPlaces,
      enabled,
    }),

  useCreateSavedPlace: () => {
    const queryClient = useQueryClient();

    return useMutation<
      CreateSavedPlaceResponseDTO,
      Error,
      CreateSavedPlaceRequestDTO
    >({
      mutationFn: rideApi.createSavedPlace,
      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['savedPlaces'],
        });
      },
    });
  },
};