import { create } from 'zustand';
import { RideParams, RideStop, Tiers } from '../types/ride.types';
import { SavedPlace } from '../types/savedPlaces.types';
import { EstimateInitialResponseDTO } from '../services/dto/estimate.dto';

interface RideState {
  rideData: Partial<RideParams>;

  estimate: EstimateInitialResponseDTO;

  savedPlaces: SavedPlace[];

  setRideDetails: (details: Partial<RideParams>) => void;

  setEstimate: (estimate: EstimateInitialResponseDTO) => void;

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

  estimate: {
    estimated_distance_km: 0,
    estimated_duration_minutes:0,
    pricing_tiers: []
  },
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
      stops.push(updatedStop);
    } else {
      stops[index] = updatedStop;
    }

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
      estimate: {
        estimated_distance_km: 0,
        estimated_duration_minutes:0,
        pricing_tiers: []
      },
      savedPlaces: [],
    }),
}));
