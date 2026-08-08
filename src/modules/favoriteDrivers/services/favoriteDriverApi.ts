import { apiClient } from '../../../core/network/apiClient';
import { ENDPOINTS } from '../../../core/network/endpoints';
import { 
  ToggleFavoriteDriverRequest, 
  ToggleFavoriteDriverResponse,
  GetFavoriteDriversResponse
} from './dto/favoriteDriver.dto';

export const favoriteDriverApi = {
  getFavoriteDrivers: async (): Promise<GetFavoriteDriversResponse> => {
    const response = await apiClient.get<GetFavoriteDriversResponse>(
      ENDPOINTS.FAVORITE_DRIVERS.GET_FAVORITE_DRIVERS
    );
    return response.data;
  },

  toggleFavorite: async (data: ToggleFavoriteDriverRequest): Promise<ToggleFavoriteDriverResponse> => {
    const response = await apiClient.post<ToggleFavoriteDriverResponse>(
      ENDPOINTS.FAVORITE_DRIVERS.TOGGLE,
      data
    );
    return response.data;
  },
};