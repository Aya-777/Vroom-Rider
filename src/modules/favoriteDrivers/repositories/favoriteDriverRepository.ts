import { favoriteDriverApi } from '../services/favoriteDriverApi';

export const favoriteDriverRepository = {
  toggleFavorite: async (driverId: number) => {
    return await favoriteDriverApi.toggleFavorite({ driver_id: driverId });
  },
  getFavoriteDrivers: async () => {
    return await favoriteDriverApi.getFavoriteDrivers();
  },
};