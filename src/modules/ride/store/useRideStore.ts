import { create } from 'zustand';
import { RideParams, RideStop } from '../types/ride.types';
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

  setStops: (stops: RideStop[]) => void;

  updateStop: (order: number, stop: RideStop) => void;

  addStop: (stop: RideStop, index?: number) => void;

  removeStop: (order: number) => void;

  clearSavedPlaces: () => void;

  clearRide: () => void;
}

const normalizeStops = (stops: RideStop[]): RideStop[] => {
  return stops.map((stop, index, array) => ({
    ...stop,
    order: index,
    stopType:
      index === 0
        ? 'PICKUP'
        : index === array.length - 1
        ? 'DROP_OFF'
        : 'STOP',
  }));
};

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
updateStop: (order, updatedStop) =>
  set(state => {
    const stops = [...(state.rideData.stops ?? [])];

    const index = stops.findIndex(s => s.order === order);

    if (index === -1) {
      return state;
    }

    stops[index] = updatedStop;

    return {
      rideData: {
        ...state.rideData,
        stops: normalizeStops(stops),
      },
    };
  }),
  
  addStop: (stop, index) =>
  set(state => {
    const stops = [...(state.rideData.stops ?? [])];

    const insertIndex =
      index === undefined ? stops.length : index;

    stops.splice(insertIndex, 0, stop);

    return {
      rideData: {
        ...state.rideData,
        stops: normalizeStops(stops),
      },
    };
  }),
  
  removeStop: order =>
  set(state => ({
    rideData: {
      ...state.rideData,
      stops: normalizeStops(
        (state.rideData.stops ?? []).filter(
          stop => stop.order !== order,
        ),
      ),
    },
  })),

  setStops: stops =>
    set(state => ({
      rideData: {
        ...state.rideData,
        stops,
      },
    })),

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
