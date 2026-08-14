import { RideFilter } from '../types/ride.types';
import { rideApi } from '../services/rideApi';

export const fetchFilters = async (): Promise<RideFilter[]> => {
  try {
    const filters = await rideApi.getFilters();

    return filters;
  } catch (error) {
    console.error('[fetchFilters] Failed to fetch filters:', error);
    return [];
  }
};