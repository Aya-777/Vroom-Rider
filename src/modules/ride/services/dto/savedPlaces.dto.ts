
export interface SavedPlaceDTO {
  id: number;
  label: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface CreateSavedPlaceRequestDTO {
  label: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
}

export interface CreateSavedPlaceResponseDTO {
  id: number;
  label: string;
  category: string;
  address: string;
  latitude: number;
  longitude: number;
}

