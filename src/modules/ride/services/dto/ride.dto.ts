import { RideStop } from '../../types/ride.types';
import { TripStatus } from '../../types/RideState';

export interface RidePreferenceDTO {
  id: number;
  code: string;
  title: string;
  extra_fee: string;
}

export interface RequestRideRequestDTO {
  vehicle_type_id: number;
  preference_ids: number[];
  payment_method: 'CASH' | 'WALLET';
  is_for_someone_else: boolean;
  passenger_contact_phone?: string;
  stops: RideStop[];
}


export interface RequestRideResponseDTO {
  id: number;
  rider: number;
  driver: number | null;
  vehicle: number | null;
  vehicle_type_id: string;
  status: TripStatus;

  stops: RideStop[];
  preference_ids: number[];

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
  payment_method: 'CASH' | 'WALLET';
}