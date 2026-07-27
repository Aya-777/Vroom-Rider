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
  data: CreateSavedPlaceRequestDTO
): Promise<CreateSavedPlaceResponseDTO> => {

  const response =
    await apiClient.post<CreateSavedPlaceResponseDTO>(
      ENDPOINTS.TRIPS.SAVED_LOCATIONS,
      data,
    );

  return response.data;
},
};
