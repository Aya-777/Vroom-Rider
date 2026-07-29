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
  latitude: number;
  longitude: number;
  order: number;
  stopType: 'PICKUP' | 'DROP_OFF' | 'STOP';
}
export interface RideParams {

  id: number,
  vehicleTypeId?: number;
  paymentMethod: 'CASH' | 'CARD';
  isForSomeoneElse: boolean;
  passengerContactPhone?: string;
  stops: RideStop[];
  preferenceIds: number[];
  scheduledAt?: string;

}
