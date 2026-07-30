// utils/rideMappers.ts

import { RideParams, RideStop } from "../types/ride.types";

export function buildRideStops(
  pickup: {
    address: string;
    latitude: number;
    longitude: number;
  },
  destination: {
    address: string;
    latitude: number;
    longitude: number;
  },
) {
  return [
    {
      address: pickup.address,
      latitude: pickup.latitude,
      longitude: pickup.longitude,
      order: 0,
      stop_type: 'PICKUP' as const,
    },
    {
      address: destination.address,
      latitude: destination.latitude,
      longitude: destination.longitude,
      order: 1,
      stop_type: 'DROP_OFF' as const,
    },
  ];
}

export function buildRideDetails(
  ride : RideParams
) {
  return {
    stops: [
      {
        address: ride.stops[0].address,
        latitude: ride.stops[0].latitude,
        longitude: ride.stops[0].longitude,
        order: 0,
        stopType: 'PICKUP',
      },
      {
        address: ride.stops[1].address,
        latitude: ride.stops[1].latitude,
        longitude: ride.stops[1].longitude,
        order: 1,
        stopType: 'DROP_OFF',
      },
    ],
    isForSomeoneElse: ride.isForSomeoneElse,
    scheduledAt: ride.scheduledAt,
    passengerContactPhone: ride.passengerContactPhone,
  };
}