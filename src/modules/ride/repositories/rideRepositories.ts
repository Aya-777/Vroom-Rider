import { useMutation } from '@tanstack/react-query';

import { rideApi } from '../services/rideApi';

import {
  PriceEstimateRequestDTO,
  PriceEstimateResponseDTO,
  RequestRideRequestDTO,
  RequestRideResponseDTO,
} from '../services/dto/ride.dto';

export const useRideRepository = {
  useEstimatePrice: () =>
    useMutation<PriceEstimateResponseDTO, Error, PriceEstimateRequestDTO>({
      mutationFn: rideApi.estimatePrice,
    }),

  useRequestRide: () =>
    useMutation<RequestRideResponseDTO, Error, RequestRideRequestDTO>({
      mutationFn: rideApi.requestRide,
    }),
};
