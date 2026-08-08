import { favoriteDriverApi } from '../services/favoriteDriverApi';

export const favoriteDriverRepository = {
  toggleFavorite: async (driverId: string | number) => {
    return await favoriteDriverApi.toggleFavorite({ driver_id: driverId });
  },
};