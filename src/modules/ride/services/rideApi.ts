import { apiClient } from '../../../core/network/apiClient';
import { ENDPOINTS } from '../../../core/network/endpoints';

import {
  PriceEstimateRequestDTO,
  PriceEstimateResponseDTO,
  RequestRideRequestDTO,
  RequestRideResponseDTO,
} from './dto/ride.dto';

import { SavedPlaceDTO,
  CreateSavedPlaceRequestDTO,
  CreateSavedPlaceResponseDTO
  } from './dto/savedPlaces.dto';

  import { 
    EstimateInitialRequestDTO,
    EstimateInitialResponseDTO
   } from './dto/estimate.dto';

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
    formData.append('password', data.category);
    formData.append('address', data.address);
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
  
  estimateInitial: async (
    data: EstimateInitialRequestDTO,
  ): Promise<EstimateInitialResponseDTO> => {
    const response = await apiClient.post<EstimateInitialResponseDTO>(
      ENDPOINTS.TRIPS.INITIAL_ESTIMATE,
      data,
    );

    return response.data;
  },
  
  cancelRide: async (rideId: string) => {
    const response = await apiClient.post(
      `/api/v1/rides/${rideId}/cancel/`,
    );

    return response.data;
  }


};
