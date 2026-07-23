import { Double } from "react-native/Libraries/Types/CodegenTypes";

export type Car = {
  model: string;
  color: string;
  plate: string;
};

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

export interface RideParams {
  id: string;
  pickupLocation: string;
  dropoffLocation: string;
  selectedPerson: string;
  time: string;
  payment: string;
  vehicleType: string;
  prefrences: Array<Prefrences>,
  contactPhone: string;
}

export interface RideEstimate {
  price: string;
  time: string;
}