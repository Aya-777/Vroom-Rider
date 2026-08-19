import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { rideApi } from '../services/rideApi';

import {
  EnterRideNumberRequestDTO,
  EnterRideNumberResponseDTO,
} from '../services/dto/ride.dto';
import {
  SavedPlaceDTO,
  CreateSavedPlaceRequestDTO,
  CreateSavedPlaceResponseDTO,
} from '../services/dto/savedPlaces.dto';
import {
  VerifyOtpRequestDTO,
  VerifyOtpResponseDTO,
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

  useDeleteSavedPlace: () => {
    const queryClient = useQueryClient();

    return useMutation<void, Error, number>({
      mutationFn: rideApi.deleteSavedPlace,

      onSuccess: () => {
        queryClient.invalidateQueries({
          queryKey: ['savedPlaces'],
        });
      },
    });
  },

  useEnterRideNumber: () => {
    return useMutation<
      EnterRideNumberResponseDTO,
      Error,
      EnterRideNumberRequestDTO
    >({
      mutationFn: rideApi.enterRideNumber,
    });
  },

  useVerifyRideOtp: () => {
    return useMutation<VerifyOtpResponseDTO, Error, VerifyOtpRequestDTO>({
      mutationFn: rideApi.verifyRideOtp,
    });
  },

  useResendRideOtp: () => {
    return useMutation<{ message: string }, Error, void>({
      mutationFn: () => rideApi.resendRideOtp(),
    });
  },
};