export type DriverStatus = 'available' | 'on_trip' | 'offline';

export interface Driver {
  id: string;
  name: string;
  rating: number;
  phone: string;
  plate: string;
  vehicleName: string;
  status: DriverStatus;
  avatarUrl: string;
}