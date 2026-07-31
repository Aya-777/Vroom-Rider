import { apiClient } from '../../../core/network/apiClient';
import { ENDPOINTS } from '../../../core/network/endpoints';
import { v4 as uuidv4 } from 'uuid';

import { RequestRideRequestDTO, RequestRideResponseDTO } from './dto/ride.dto';

import {
  SavedPlaceDTO,
  CreateSavedPlaceRequestDTO,
  CreateSavedPlaceResponseDTO,
} from './dto/savedPlaces.dto';

import {
  EstimateInitialRequestDTO,
  EstimateInitialResponseDTO,
} from './dto/estimate.dto';
import { RideParams } from '../types/ride.types';

export const rideApi = {
  // Saved Places
  getSavedPlaces: async (): Promise<SavedPlaceDTO[]> => {
    const response = await apiClient.get<SavedPlaceDTO[]>(
      ENDPOINTS.TRIPS.SAVED_LOCATIONS,
    );
    return response.data;
  },

  createSavedPlace: async (
    data: CreateSavedPlaceRequestDTO,
  ): Promise<CreateSavedPlaceResponseDTO> => {
    const formData = new FormData();
    formData.append('label', data.label);
    formData.append('address', data.address);
    formData.append('icon', data.icon);
    formData.append('latitude', data.latitude);
    formData.append('longitude', data.longitude);

    const response = await apiClient.post<CreateSavedPlaceResponseDTO>(
      ENDPOINTS.TRIPS.SAVED_LOCATIONS,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data;
  },

  deleteSavedPlace: async (id: number): Promise<void> => {
    await apiClient.delete(ENDPOINTS.TRIPS.SAVED_LOCATION(id));
  },

  // Ride
  estimateInitial: async (
    data: EstimateInitialRequestDTO,
  ): Promise<EstimateInitialResponseDTO> => {
    const response = await apiClient.post<EstimateInitialResponseDTO>(
      ENDPOINTS.TRIPS.INITIAL_ESTIMATE,
      data,
    );

    return response.data;
  },

  cancelRide: async (rideId: number, reason: string) => {
    const response = await apiClient.post(ENDPOINTS.TRIPS.CANCEL(rideId), {
      cancellation_reason: reason,
    });

    return response.data;
  },

  confirmRide: async (
    data: RequestRideRequestDTO,
  ): Promise<RequestRideResponseDTO> => {
    const idempotencyKey = uuidv4();

    const response = await apiClient.post<RequestRideResponseDTO>(
      ENDPOINTS.TRIPS.CONFIRM,
      data,
      {
        headers: {
          'ْْْX-Idempotency-Key': idempotencyKey,
        },
      },
    );

    return response.data;
  },
};
