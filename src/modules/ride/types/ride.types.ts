import { Double } from "react-native/Libraries/Types/CodegenTypes";
import { RidePreferenceDTO } from "../services/dto/ride.dto";
import { TripStatus } from "./RideState";
import { Coordinate } from "../services/dto/estimate.dto";

export type Car = {
  model: string;
  color: string;
  plate: string;
};

export type Tiers = {
  tier_id : number;
  tier_name : string;
  estimated_price : Double;
  image: string;
}

export type Driver = {
  name: string;
  onTheWayMessage: string;
  arrivedMessage: string;
  car: Car;
};

export interface RideValidationErrors {
  fromLocation?: string;
  toLocation?: string;
}

export interface Prefrences{
  name: string,
  code: string,
  price: Double,
}

export interface RideFilter {
  id: string;
  code: string;
  title: string;
  extra_fee: string;
  iconName?: string;
}

export type ActiveInput = 'pickup' | 'destination' | `stop-${string}` | null;

export interface RideStop {
  address: string;
  order: number;
  latitude: number;
  longitude: number;
  stop_type: 'PICKUP' | 'DROP_OFF' | 'STOP';
}

export type DraftStop = {
  id: string;
  address: string;
  latitude?: number;
  longitude?: number;
};

export interface RideParams {
  id: number;
  vehicle_type_id: string;
  payment_method: 'CASH' | 'WALLET';
  is_for_someone_else: boolean;
  passenger_contact_phone?: string;
  stops: RideStop[];
  preference_ids: number[];
  scheduled_at?: string;
  status: TripStatus;
  idempotency_key?: string,
}


export interface CurrentRide {
  id: number;
  rider: number;
  driver: number | null;
  vehicle: number | null;
  vehicle_type_id: string;
  status: TripStatus;

  stops: RideStop[];
  preference_ids: number[];
  route_geometry?: Coordinate[];

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
