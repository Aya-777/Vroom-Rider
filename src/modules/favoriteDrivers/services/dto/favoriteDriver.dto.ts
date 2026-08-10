export interface DriverDto {
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

export interface ToggleFavoriteDriverRequest {
  driver_id: number;
}

export interface ToggleFavoriteDriverResponse {
  "status code": number;
  message: string;
  data: {
    is_favorite: boolean;
    driver: DriverDto;
  };
}

export interface GetFavoriteDriversResponse {
  "status code": number;
  message: string;
  data: DriverDto[];
}