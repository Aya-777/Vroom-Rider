import { create } from 'zustand';
import { Driver } from '../types/driver.type';
import { favoriteDriverRepository } from '../repositories/favoriteDriverRepository';
import { DriverDto } from '../services/dto/favoriteDriver.dto';

interface FavoriteDriversState {
  searchQuery: string;
  selectedFilter: string;
  drivers: Driver[];
  isLoading: boolean;
  error: string | null;

  // Actions
  setSearchQuery: (query: string) => void;
  setSelectedFilter: (filter: string) => void;
  fetchFavoriteDrivers: () => Promise<void>;
  toggleFavorite: (driverId: number) => Promise<void>;
}

export const useFavoriteDriversStore = create<FavoriteDriversState>(
  (set, get) => ({
    searchQuery: '',
    selectedFilter: 'All',
    isLoading: false,
    error: null,

    // Initial Mock / Placeholder Data matching your UI
    drivers: [
      
    ],

    setSearchQuery: (query: string) => set({ searchQuery: query }),

    setSelectedFilter: (filter: string) => set({ selectedFilter: filter }),

    fetchFavoriteDrivers: async () => {
      set({ isLoading: true, error: null });
      try {
        // TODO: Replace with actual API call repository service when backend endpoint is ready
        const response = await favoriteDriverRepository.getFavoriteDrivers();
        set({ drivers: response.data , isLoading: false });

        setTimeout(() => {
          set({ isLoading: false });
        }, 500);
      } catch (err: any) {
        set({
          error: err.message || 'Failed to fetch favorite drivers',
          isLoading: false,
        });
      }
    },
    
    toggleFavorite: async (driverId) => {
      try {
        set({ isLoading: true, error: null });
        
        const response = await favoriteDriverRepository.toggleFavorite(driverId);
        const currentDrivers = get().drivers;
        const updatedDrivers = currentDrivers.filter(driver => driver.driver_id !== driverId);

        set({ 
          drivers: updatedDrivers, 
          isLoading: false 
        });
      } catch (error: any) {
        set({ 
          error: error.message || 'Failed to toggle favorite driver', 
          isLoading: false 
        });
      }
    },
  }),
);