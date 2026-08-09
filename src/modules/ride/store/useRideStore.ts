import { create } from 'zustand';
import {
  CurrentRide,
  RideParams,
  RideStop,
} from '../types/ride.types';
import { SavedPlace } from '../types/savedPlaces.types';
import { EstimateInitialResponseDTO } from '../services/dto/estimate.dto';
import { TripStatus } from '../types/RideState';

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

  addStop: (stop: RideStop) => void;

  removeStop: (order: number) => void;

  clearSavedPlaces: () => void;

  clearRide: () => void;

  isPickingLocation: boolean;

  setPickingLocation: (value: boolean) => void;

  selectedMapLocation: MapLocation | null;

  setSelectedMapLocation: (location: MapLocation | null) => void;

  rideOtpVerified: boolean;

  setRideOtpVerified: (value: boolean) => void;
}

const normalizeStops = (stops: RideStop[]): RideStop[] => {
  return stops.map((stop, index) => ({
    ...stop,
    order: index,
  }));
};

export const useRideStore = create<RideState>(set => ({
  rideData: {
    vehicle_type_id: '1',
    payment_method: 'CASH',
    is_for_someone_else: false,
    passenger_contact_phone: undefined,
    stops: [],
    preference_ids: [],
    scheduled_at: 'now',
    status: TripStatus.NULL,
  },

  currentRide: {
    id: 1,
    rider: 1,
    driver: null,
    vehicle: null,
    vehicle_type_id: '1',
    status: TripStatus.PENDING,

    stops: [],
    preference_ids: [],

    estimated_distance: 0,
    estimated_duration: 0,
    estimated_price: '0',

    actual_distance: null,
    actual_duration: null,
    actual_price: null,

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
    stops: [],
    route_geometry: [],
  },
  savedPlaces: [],

  setSavedPlaces: places =>
    set({
      savedPlaces: places,
    }),

  setStops: stops =>
    set(state => ({
      rideData: {
        ...state.rideData,
        stops: normalizeStops(stops),
      },
    })),

  addStop: stop =>
    set(state => {
      const stops = [...(state.rideData.stops ?? [])];

      const destinationIndex = stops.findIndex(
        currentStop => currentStop.stop_type === 'DROP_OFF',
      );

      const newStop: RideStop = {
        ...stop,
        stop_type: 'STOP',
      };

      if (destinationIndex === -1) {
        // No destination yet.
        // Just append the stop.
        stops.push(newStop);
      } else {
        // Insert before destination.
        stops.splice(destinationIndex, 0, newStop);
      }

      return {
        rideData: {
          ...state.rideData,
          stops: normalizeStops(stops),
        },
      };
    }),

  /**
   * Update an existing stop without changing
   * its position in the route.
   */
  updateStop: (order, updatedStop) =>
    set(state => {
      const stops = [...(state.rideData.stops ?? [])];

      const index = stops.findIndex(stop => stop.order === order);

      if (index === -1) {
        return state;
      }

      stops[index] = {
        ...updatedStop,
        order,
      };

      return {
        rideData: {
          ...state.rideData,
          stops: normalizeStops(stops),
        },
      };
    }),

  /**
   * Remove a stop and re-number the remaining stops.
   */
  removeStop: order =>
    set(state => {
      const stops = (state.rideData.stops ?? []).filter(
        stop => stop.order !== order,
      );

      return {
        rideData: {
          ...state.rideData,
          stops: normalizeStops(stops),
        },
      };
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
        stops: [],
        route_geometry: [],
      },
    }),

  isPickingLocation: false,

  setPickingLocation: value =>
    set({
      isPickingLocation: value,
    }),

  selectedMapLocation: null,

  setSelectedMapLocation: location =>
    set({
      selectedMapLocation: location,
    }),

  rideOtpVerified: true,

  setRideOtpVerified: value =>
    set({
      rideOtpVerified: value,
    }),
}));