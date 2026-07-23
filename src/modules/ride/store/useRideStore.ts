import { create } from 'zustand';
import { RideParams } from '../types/ride.types';

interface RideEstimate {
  price?: string;
  time?: string;
  distance?: number;
}

interface RideState {
  rideData: Partial<RideParams>;

  estimate: RideEstimate;

  setRideDetails: (details: Partial<RideParams>) => void;

  setEstimate: (estimate: RideEstimate) => void;

  clearRide: () => void;
}

export const useRideStore = create<RideState>((set) => ({
  rideData: {
    vehicleType: 'economy',
    payment: 'cash',
    selectedPerson: 'forMe',
    time: 'now',
    prefrences: [],
  },

  estimate: {},

  setRideDetails: (details) =>
    set((state) => ({
      rideData: {
        ...state.rideData,
        ...details,
      },
    })),

  setEstimate: (estimate) =>
    set({
      estimate,
    }),

  clearRide: () =>
    set({
      rideData: {},
      estimate: {},
    }),
}));