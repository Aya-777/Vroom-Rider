import { Double } from "react-native/Libraries/Types/CodegenTypes";

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

export interface RideStop {
  address: string;
  order: number;
  latitude: number;
  longitude: number;
  stop_type: 'PICKUP' | 'DROP_OFF';
}
export interface RideParams {
  id: number;
  vehicle_type_id: number;
  payment_method: 'CASH' | 'CARD';
  is_for_someone_else: boolean;
  passenger_contact_phone?: string;
  stops: RideStop[];
  preference_ids: number[];
  scheduled_at?: string;
}
