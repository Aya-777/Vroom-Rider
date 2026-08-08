export interface ToggleFavoriteDriverRequest {
  driver_id: string | number;
}

export interface ToggleFavoriteDriverResponse {
  success: boolean;
  message: string;
  is_favorite: boolean;
}