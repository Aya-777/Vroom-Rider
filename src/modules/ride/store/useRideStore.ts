import { create } from 'zustand';
import { RideParams } from '../types/ride.types';
import { SavedPlace } from '../types/savedPlaces.types';

interface RideEstimate {
  price?: string;
  time?: string;
  distance?: number;
}

interface RideState {
  rideData: Partial<RideParams>;

  estimate: RideEstimate;

  savedPlaces: SavedPlace[];

  setRideDetails: (details: Partial<RideParams>) => void;

  setEstimate: (estimate: RideEstimate) => void;

  setSavedPlaces: (places: SavedPlace[]) => void;

  clearSavedPlaces: () => void;

  clearRide: () => void;
}

export const useRideStore = create<RideState>(set => ({
  rideData: {
    vehicleTypeId: 1,
    paymentMethod: 'CASH',
    isForSomeoneElse: false,
    passengerContactPhone: '09********',
    stops: [],
    preferenceIds: [],
    scheduledAt: 'NOW',
  },

  estimate: {},
  savedPlaces: [],

  setSavedPlaces: places =>
    set({
      savedPlaces: places,
    }),

  clearSavedPlaces: () =>
    set({
      savedPlaces: [],
    }),
    
  setRideDetails: details =>
    set(state => ({
      rideData: {
        ...state.rideData,
        ...details,
      },
    })),

  setEstimate: estimate =>
    set({
      estimate,
    }),

  clearRide: () =>
    set({
      rideData: {},
      estimate: {},
      savedPlaces: [],
    }),
}));
