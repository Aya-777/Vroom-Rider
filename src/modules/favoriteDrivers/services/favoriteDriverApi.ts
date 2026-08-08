import { apiClient } from '../../../core/network/apiClient';
import { ENDPOINTS } from '../../../core/network/endpoints';
import { 
  ToggleFavoriteDriverRequest, 
  ToggleFavoriteDriverResponse 
} from './dto/favoriteDriver.dto';

export const favoriteDriverApi = {
  toggleFavorite: async (data: ToggleFavoriteDriverRequest): Promise<ToggleFavoriteDriverResponse> => {
    const response = await apiClient.post<ToggleFavoriteDriverResponse>(
      ENDPOINTS.FAVORITE_DRIVERS.TOGGLE,
      data
    );
    return response.data;
  },
};