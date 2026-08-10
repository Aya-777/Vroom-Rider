import { RideStop } from "../../types/ride.types";

export interface TripHistoryStopDTO {
  id: number;
  address: string;
  order: number;
  stop_type: 'PICKUP' | 'STOP' | 'DROP_OFF';
}

export type TerminalTripStatus =
  | 'COMPLETED'
  | 'CANCELLED_BY_RIDER'
  | 'CANCELLED_BY_DRIVER';

export interface TripHistoryItemDTO {
  id: number;
  status: TerminalTripStatus;
  stops: TripHistoryStopDTO[];
  driverId: number | null,
  driver_name: string | null;
  isFavorite: boolean;
  vehicle_type: string | null;
  price: string | null;
  distance: number | null;
  duration: number | null;
  payment_method: string;
  cancellation_reason: string | null;
  cancelled_at: string | null;
  requested_at: string;
  ended_at: string | null;
}

export interface PaginatedResult<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}

export interface ApiEnvelope<T> {
  'status code': number;
  message: string;
  data: T;
}

export interface ReorderTripDTO {
  id: number;
  rider: number;
  driver: number | null;
  vehicle: number | null;
  status: string;

  stops: RideStop[];

  estimated_distance: number;
  estimated_duration: number;
  estimated_price: string;

  actual_distance: number | null;
  actual_duration: number | null;
  actual_price: string | null;

  idempotency_key: string;

  requested_at: string;
  accepted_at: string | null;
  started_at: string | null;
  ended_at: string | null;

  is_for_someone_else: boolean;
  passenger_contact_phone: string | null;

  payment_method: string;

  estimated_route_geometry: [number, number][];

  vehicle_type_id: number;
  preference_ids: number[];
}

export interface ReorderTripResponseDTO {
  'status code': number;
  message: string;
  data: ReorderTripDTO;
}
