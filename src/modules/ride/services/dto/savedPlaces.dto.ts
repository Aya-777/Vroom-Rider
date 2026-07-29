
export interface SavedPlaceDTO {
  id: number;
  label: string;
  address: string;
  latitude: number;
  longitude: number;
  icon: string;
}

export interface CreateSavedPlaceRequestDTO {
  label: string;
  address: string;
  latitude: number;
  longitude: number;
  icon: string;
}

export interface CreateSavedPlaceResponseDTO {
  label: string;
  address: string;
  icon: string;
}

