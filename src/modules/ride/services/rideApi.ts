import { apiClient } from '../../../core/network/apiClient';
import { ENDPOINTS } from '../../../core/network/endpoints';

import {
    PriceEstimateRequestDTO,
    PriceEstimateResponseDTO,
    RequestRideRequestDTO,
    RequestRideResponseDTO,
} from './dto/ride.dto';

export const rideApi = {

    estimatePrice: async (
        data: PriceEstimateRequestDTO
    ): Promise<PriceEstimateResponseDTO> => {

        const response =
            await apiClient.post<PriceEstimateResponseDTO>(
                ENDPOINTS.TRIPS.PRICE_ESTIMATE,
                data,
            );

        return response.data;
    },

    requestRide: async (
        data: RequestRideRequestDTO
    ): Promise<RequestRideResponseDTO> => {

        const response =
            await apiClient.post<RequestRideResponseDTO>(
                ENDPOINTS.TRIPS.REQUEST,
                data,
            );

        return response.data;
    },

};