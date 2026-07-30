import { create } from 'zustand';
import { CurrentRide, RideParams, RideStop, Tiers } from '../types/ride.types';
import { SavedPlace } from '../types/savedPlaces.types';
import { EstimateInitialResponseDTO } from '../services/dto/estimate.dto';

type MapLocation = {
  latitude: number;
  longitude: number;
};

interface RideState {
  rideData: Partial<RideParams>;

  currentRide: CurrentRide | null;

  estimate: EstimateInitialResponseDTO;

  savedPlaces: SavedPlace[];

  setRideDetails: (details: Partial<RideParams>) => void;

  setCurrentRide: (ride: CurrentRide | null) => void;

  setEstimate: (estimate: EstimateInitialResponseDTO) => void;

  setSavedPlaces: (places: SavedPlace[]) => void;

  setStops: (stops: RideStop[]) => void;

  updateStop: (order: number, stop: RideStop) => void;

  addStop: (stop: RideStop, index?: number) => void;

  removeStop: (order: number) => void;

  clearSavedPlaces: () => void;

  clearRide: () => void;

  isPickingLocation: boolean;

  setPickingLocation: (value: boolean) => void;

  selectedMapLocation: MapLocation | null;

  setSelectedMapLocation: (location: MapLocation | null) => void;
}

const normalizeStops = (stops: RideStop[]): RideStop[] => {
  return stops.map(
    (stop, index, array): RideStop => ({
      ...stop,
      order: index,
      stop_type: index === 0 ? 'PICKUP' : 'DROP_OFF',
    }),
  );
};

export const useRideStore = create<RideState>(set => ({
  rideData: {
    vehicle_type_id: 1,
    payment_method: 'CASH',
    is_for_someone_else: false,
    passenger_contact_phone: '09********',
    stops: [],
    preferenceIds: [],
    scheduled_at: 'NOW',
  },

  currentRide: {
    id: 1,
    rider: 1,
    driver: null,
    vehicle: null,
    vehicle_type: 'ECONOMY',
    status: 'PENDING',

    stops: [],
    preferences: [],

    estimated_distance: 0,
    estimated_duration: 0,
    estimated_price: '0',

    actual_distance: null,
    actual_duration: null,
    actual_price: null,

    cancellation_reason: null,
    cancelled_at: null,

    idempotency_key: '',

    requested_at: '',
    accepted_at: null,
    started_at: null,
    ended_at: null,

    is_for_someone_else: false,
    passenger_contact_phone: null,
    payment_method: 'CASH',
  },

  estimate: {
    estimated_distance_km: 0,
    estimated_duration_minutes: 0,
    pricing_tiers: [],
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

      const insertIndex = index === undefined ? stops.length : index;

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
          (state.rideData.stops ?? []).filter(stop => stop.order !== order),
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

  setCurrentRide: ride =>
    set({
      currentRide: ride,
    }),

  setEstimate: estimate =>
    set({
      estimate,
    }),

  clearRide: () =>
    set({
      rideData: {},
      estimate: {
        estimated_distance_km: 0,
        estimated_duration_minutes: 0,
        pricing_tiers: [],
      },
      savedPlaces: [],
    }),

  isPickingLocation: false,

  setPickingLocation: value =>
    set({
      isPickingLocation: value,
    }),

  selectedMapLocation: null,

  setSelectedMapLocation: location => set({ selectedMapLocation: location }),
}));
