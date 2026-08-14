import { Car, CurrentRide, Driver, RideStop } from '../../types/ride.types';
import { TripStatus } from '../../types/RideState';

export interface RidePreferenceDTO {
  id: number;
  code: string;
  title: string;
  extra_fee: string;
}

export interface RequestRideRequestDTO {
  vehicle_type_id: string;
  preference_ids: number[];
  payment_method: 'CASH' | 'WALLET';
  is_for_someone_else: boolean;
  passenger_contact_phone?: string;
  stops: RideStop[];
}


export interface RequestRideResponseDTO{
  id: number;
  rider: number;
  driver: Driver | null;
  vehicle: Car | null;
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

export interface GetTripResponse {
  id: number;
  rider: number;
  driver: Driver | null;
  vehicle: Car | null;
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

export interface GetCurrentRideDTO {
  message: string;
  'status code': number;
  data: CurrentRide;
}

export interface EnterRideNumberRequestDTO {
  phone_number: string;
}

export interface EnterRideNumberResponseDTO {
  message: string;
}

export interface VerifyOtpRequestDTO {
    phone_number: string;
    otp: string;
}

export interface VerifyOtpResponseDTO {
    message: string;
    data: {
        refresh: string;
        access: string;
        user: {
            id: number;
            phone_number: string;
            first_name: string;
            last_name: string;
            role: string;
            profile_image: string | null;
        };
    };
}

export interface ResendOtpRequestDTO {
    phone_number: string;
}

export interface LocationResponseDTO {
  latitude: number,
  longitude: number,
  last_updated: string,
}