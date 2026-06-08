export type Car = {
  model: string;
  color: string;
  plate: string;
};

export type Driver = {
  name: string;
  statusMessage: string;
  car: Car;
};

export interface RideValidationErrors {
  fromLocation?: string;
  toLocation?: string;
}