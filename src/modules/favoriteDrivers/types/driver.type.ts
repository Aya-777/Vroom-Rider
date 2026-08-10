export type DriverStatus = 'available' | 'on_trip' | 'offline';

export interface Driver {
  driver_id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  profile_image: string | undefined;
  rating: number;
  vehicle: {
    id: 2,
    plate_number: string,
    color: string | null,
    custom_color_name: string | null,
    brand: string | null ,
    custom_brand_name: string | null,
    model: string | null ,
    custom_model_name: string | null
  }
}