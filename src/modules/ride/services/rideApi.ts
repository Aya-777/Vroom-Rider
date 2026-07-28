import { apiClient } from '../../../core/network/apiClient';
import { ENDPOINTS } from '../../../core/network/endpoints';

import {
  CreateSavedPlaceRequestDTO,
  CreateSavedPlaceResponseDTO,
  PriceEstimateRequestDTO,
  PriceEstimateResponseDTO,
  RequestRideRequestDTO,
  RequestRideResponseDTO,
  SavedPlaceDTO,
} from './dto/ride.dto';

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
};
