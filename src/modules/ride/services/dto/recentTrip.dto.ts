export interface RecentTripDTO {
    id: number;
    dropoff_address: string;
    dropoff_latitude: number;
    dropoff_longitude: number;
    vehicle_type_id: number | null;
    requested_at: string;
}