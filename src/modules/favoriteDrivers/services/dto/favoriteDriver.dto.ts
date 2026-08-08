export interface DriverDto {
  driver_id: number;
  first_name: string;
  last_name: string;
  phone_number: string;
  profile_image: string | undefined;
  rating: number;
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