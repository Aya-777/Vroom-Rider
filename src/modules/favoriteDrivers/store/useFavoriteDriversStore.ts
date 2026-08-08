import { create } from 'zustand';
import { Driver } from '../types/driver.type';

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
  notifyDriverWhenActive: (driverId: string) => void;
}

export const useFavoriteDriversStore = create<FavoriteDriversState>((set, get) => ({
  searchQuery: '',
  selectedFilter: 'All',
  isLoading: false,
  error: null,
  
  // Initial Mock / Placeholder Data matching your UI
  drivers: [
    {
      id: '1',
      name: 'Alexander Wright',
      rating: 4.9,
      phone: '+1 (555) 012-4829',
      plate: 'K-9283-LP',
      vehicleColor: '#1e1b4b',
      vehicleName: 'Midnight Blue Tesla Model 3',
      status: 'available',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb',
    },
    {
      id: '2',
      name: 'Sarah Jenkins',
      rating: 4.8,
      phone: '+1 (555) 923-1104',
      plate: 'A-4721-BC',
      vehicleColor: '#94a3b8',
      vehicleName: 'Silver Mercedes-Benz E-Class',
      status: 'on_trip',
      avatarUrl: 'https://images.unsplash.com/photo-1517841905240-472988babdf9',
    },
    {
      id: '3',
      name: 'Michael Chen',
      rating: 4.7,
      phone: '+1 (555) 443-8821',
      plate: 'T-1884-FF',
      vehicleColor: '#334155',
      vehicleName: 'Obsidian Black Audi A6',
      status: 'offline',
      avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d',
    },
  ],

  setSearchQuery: (query: string) => set({ searchQuery: query }),
  
  setSelectedFilter: (filter: string) => set({ selectedFilter: filter }),

  fetchFavoriteDrivers: async () => {
    set({ isLoading: true, error: null });
    try {
      // TODO: Replace with actual API call repository service when backend endpoint is ready
      // const response = await driverRepository.getFavoriteDrivers();
      // set({ drivers: response, isLoading: false });
      
      setTimeout(() => {
        set({ isLoading: false });
      }, 500);
    } catch (err: any) {
      set({ error: err.message || 'Failed to fetch favorite drivers', isLoading: false });
    }
  },

  notifyDriverWhenActive: (driverId: string) => {
    // Logic for handling "Notify When Active" button click for offline drivers
    console.log(`Notification set for driver ID: ${driverId} when they come online.`);
  },
}));