export interface RideStopRequestDTO {
  address: string;
  order: number;
  latitude: number;
  longitude: number;
  stop_type: 'PICKUP' | 'DROP_OFF';
}

export interface EstimateInitialRequestDTO {
  stops: RideStopRequestDTO[];
}

export interface EstimateInitialResponseDTO {
  // Fill this according to the backend response
}