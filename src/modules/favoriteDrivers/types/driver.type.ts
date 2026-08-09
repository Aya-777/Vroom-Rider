export type DriverStatus = 'available' | 'on_trip' | 'offline';

export interface Driver {
  driver_id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  profile_image: string | undefined;
  rating: number;
  status? : DriverStatus
}