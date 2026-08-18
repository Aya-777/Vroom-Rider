import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { RideStop, Tiers } from "../../types/ride.types";

export type RouteCoordinate = [number, number];

export interface RideStopRequestDTO {
  address: string;
  order: number;
  latitude: number;
  longitude: number;
  stop_type: 'PICKUP' | 'DROP_OFF' | 'STOP' | null;
}

export interface EstimateInitialRequestDTO {
  stops: RideStopRequestDTO[];
}

export interface EstimateInitialResponseDTO {
  estimated_distance_km: Double;
  estimated_duration_minutes: Double;
  pricing_tiers: Tiers[];
  stops: RideStop[];
  route_geometry: RouteCoordinate[];
}