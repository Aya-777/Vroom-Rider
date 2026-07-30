import { RideStop } from "../../types/ride.types";

export interface RequestRideRequestDTO {
  vehicle_type_id: number;
  preference_ids: number[];
  payment_method: 'CASH' | 'CARD';
  is_for_someone_else: boolean;
  passenger_contact_phone?: string;
  stops: RideStop[];
}


export interface RequestRideResponseDTO {
  // Add the actual response fields returned by the backend
}