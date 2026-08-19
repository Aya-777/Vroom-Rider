import { apiClient } from '../../../core/network/apiClient';
import { ENDPOINTS } from '../../../core/network/endpoints';
import { v4 as uuidv4 } from 'uuid';
import { RecentTripDTO } from './dto/recentTrip.dto';
import {
  GetCurrentRideDTO,
  GetTripResponse,
  LocationResponseDTO,
  RequestRideRequestDTO,
  RequestRideResponseDTO,
  ReviewRequestDTO,
  ReviewResponseDTO,
} from './dto/ride.dto';
import {
  SavedPlaceDTO,
  CreateSavedPlaceRequestDTO,
  CreateSavedPlaceResponseDTO,
} from './dto/savedPlaces.dto';
import { RideFilter } from '../types/ride.types';
import {
  EstimateInitialRequestDTO,
  EstimateInitialResponseDTO,
  RouteCoordinate,
} from './dto/estimate.dto';
import {
  TripHistoryItemDTO,
  PaginatedResult,
  ApiEnvelope,
} from './dto/tripHistory.dto';
import {
  EnterRideNumberRequestDTO,
  EnterRideNumberResponseDTO,
  ResendOtpRequestDTO,
  VerifyOtpRequestDTO,
  VerifyOtpResponseDTO,
} from './dto/ride.dto';
import { ReorderTripResponseDTO } from './dto/tripHistory.dto';

export const rideApi = {
  // Saved Places
  getSavedPlaces: async (): Promise<SavedPlaceDTO[]> => {
    const response = await apiClient.get<SavedPlaceDTO[]>(
      ENDPOINTS.TRIPS.SAVED_LOCATIONS,
    );
    return response.data;
  },

  createSavedPlace: async (
    data: CreateSavedPlaceRequestDTO,
  ): Promise<CreateSavedPlaceResponseDTO> => {
    const formData = new FormData();
    formData.append('label', data.label);
    formData.append('address', data.address);
    formData.append('icon', data.icon);
    formData.append('latitude', data.latitude);
    formData.append('longitude', data.longitude);

    const response = await apiClient.post<CreateSavedPlaceResponseDTO>(
      ENDPOINTS.TRIPS.SAVED_LOCATIONS,
      formData,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      },
    );

    return response.data;
  },

  deleteSavedPlace: async (id: number): Promise<void> => {
    await apiClient.delete(ENDPOINTS.TRIPS.SAVED_LOCATION(id));
  },

  // Filters
  getFilters: async (): Promise<RideFilter[]> => {
    const response = await apiClient.get<RideFilter[]>(
      ENDPOINTS.TRIPS.PREFERENCES,
    );
    return response.data;
  },

  // Ride
  getTripById: async (id: number) => {
    const response = await apiClient.get(ENDPOINTS.TRIPS.GET_TRIP(id));

    return response.data;
  },

  estimateInitial: async (
    data: EstimateInitialRequestDTO,
  ): Promise<EstimateInitialResponseDTO> => {
    const response = await apiClient.post<EstimateInitialResponseDTO>(
      ENDPOINTS.TRIPS.INITIAL_ESTIMATE,
      data,
    );

    return response.data;
  },

  cancelRide: async (rideId: number, reason: string) => {
    const response = await apiClient.post<GetTripResponse>(
      ENDPOINTS.TRIPS.CANCEL(rideId),
      {
        cancellation_reason: reason,
      },
    );

    return response.data;
  },

  confirmRide: async (
    data: RequestRideRequestDTO,
    idempotencyKey: string,
  ): Promise<RequestRideResponseDTO> => {
    const response = await apiClient.post<RequestRideResponseDTO>(
      ENDPOINTS.TRIPS.CONFIRM,
      data,
      {
        headers: {
          'X-Idempotency-Key': idempotencyKey,
        },
      },
    );

    return response.data;
  },

  updatePaymentMethod: async (
    id: number,
    payment_method: 'CASH' | 'WALLET',
  ) => {
    const response = await apiClient.patch(ENDPOINTS.TRIPS.GET_TRIP(id), {
      payment_method,
    });
    return response.data;
  },

  setCashPaymentMethod: async (tripId: number) => {
    const response = await apiClient.patch(
      ENDPOINTS.PAYMENTS.SET_CASH_PAYMENT_METHOD(tripId),
    );

    return response.data;
  },

  rematch: async (id: number) => {
    const response = await apiClient.post(ENDPOINTS.TRIPS.REMATCH(id));

    return response;
  },

  enterRideNumber: async (
    data: EnterRideNumberRequestDTO,
  ): Promise<EnterRideNumberResponseDTO> => {
    const response = await apiClient.post<EnterRideNumberResponseDTO>(
      ENDPOINTS.TRIPS.VERIFY_NUMBER_ENTER,
      data,
    );

    return response.data;
  },

  verifyRideOtp: async (
    data: VerifyOtpRequestDTO,
  ): Promise<VerifyOtpResponseDTO> => {
    const response = await apiClient.post<VerifyOtpResponseDTO>(
      ENDPOINTS.TRIPS.VERIFY_RIDE_OTP,
      data,
    );
    return response.data;
  },

  resendRideOtp: async (
    data: ResendOtpRequestDTO,
  ): Promise<{ message: string }> => {
    const response = await apiClient.post<{ message: string }>(
      ENDPOINTS.TRIPS.VERIFY_RIDE_RESEND,
      data,
    );
    return response.data;
  },

  submitReview: async (data: ReviewRequestDTO, id: number) => {
    const response = await apiClient.post<ReviewResponseDTO>(
      ENDPOINTS.TRIPS.SUBMIT_REVIEW(id),
      data,
    );

    return response;
  },

  // Recent Trips
  getRecentTrips: async (): Promise<RecentTripDTO[]> => {
    const response = await apiClient.get<ApiEnvelope<RecentTripDTO[]>>(
      ENDPOINTS.TRIPS.RECENT,
    );
    return response.data.data;
  },

  reorderTrip: async (tripId: number, idempotencyKey: string) => {
    const response = await apiClient.post<ReorderTripResponseDTO>(
      ENDPOINTS.TRIPS.RERIDE(tripId),
      null,
      {
        headers: {
          'X-Idempotency-Key': idempotencyKey,
        },
      },
    );
    return response.data;
  },

  // curret trip
  getCurrent: async () => {
    const response = await apiClient.get<GetCurrentRideDTO>(
      ENDPOINTS.TRIPS.CURRENT,
    );

    return response.data.data;
  },

  getCurrentRoute: async (tripId: number): Promise<RouteCoordinate[]> => {
    const response = await apiClient.get(ENDPOINTS.TRIPS.ROUTE(tripId));

    return response.data.data;
  },

  // Location
  getDriverLocation: async (id: number): Promise<LocationResponseDTO> => {
    const response = await apiClient.get<LocationResponseDTO>(
      ENDPOINTS.TRIPS.DRIVER_LOCATION(id),
    );

    return response.data;
  },

  // SOS
  sosPress: async (id: number) => {
    await apiClient.post(ENDPOINTS.TRIPS.SOS(id));
    return;
  },

  areYouSafePress: async (id: number, is_safe: boolean) => {
    await apiClient.post(ENDPOINTS.TRIPS.AREUSAFE(id), { is_safe: is_safe });
    return;
  },
};

// Trip History
export const getTripHistory = async (params?: {
  status?: string;
}): Promise<PaginatedResult<TripHistoryItemDTO>> => {
  const response = await apiClient.get<
    ApiEnvelope<PaginatedResult<TripHistoryItemDTO>>
  >('/trips/history/', { params });
  return response.data.data;
};

export const getTripHistoryByUrl = async (
  url: string,
): Promise<PaginatedResult<TripHistoryItemDTO>> => {
  const response = await apiClient.get<
    ApiEnvelope<PaginatedResult<TripHistoryItemDTO>>
  >(url);
  return response.data.data;
};
