export type Car = {
  model: string;
  color: string;
  plate: string;
};

export type Driver = {
  name: string;
  avatar: string;
  statusMessage: string;
  car: Car;
};