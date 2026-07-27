import { apiClient } from '../../../core/network/apiClient';
import { ENDPOINTS } from '../../../core/network/endpoints';

import {
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
};
