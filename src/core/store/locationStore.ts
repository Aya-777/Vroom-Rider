import { create } from 'zustand';
import { Location } from '../services/location/LocationService';

interface LocationState {
  currentLocation: Location | null;
  setCurrentLocation: (location: Location) => void;
}

export const useLocationStore = create<LocationState>((set) => ({
  currentLocation: null,

  setCurrentLocation: (location) =>
    set({
      currentLocation: location,
    }),
}));