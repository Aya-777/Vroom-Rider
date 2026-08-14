import { PusherEvent } from '@pusher/pusher-websocket-react-native';
import { useRideStore } from '../store/useRideStore';
import { RideState, TripStatus } from '../types/RideState';
import { rideApi } from './rideApi';

class RideRealtimeService {
  handleEvent(event: PusherEvent) {
    try {
      const data = JSON.parse(event.data);

      console.log('[RideRealtime] Event:', event.eventName);
      console.log('[RideRealtime] Data:', data);

      switch (event.eventName) {
        case 'trip.driver.assigned':
          this.handleDriverAssigned(data);
          break;

        case 'trip.driver.arrived':
          this.handleDriverArrived(data);
          break;

        case 'trip.started':
          this.handleTripStarted(data);
          break;

        case 'trip.completed':
          this.handleTripCompleted(data);
          break;

        case 'trip.cancelled':
          this.handleTripCancelled(data);
          break;

        default:
          console.log('[RideRealtime] Unhandled event:', event.eventName);
      }
    } catch (error) {
      console.error('[RideRealtime] Failed to handle event:', error);
    }
  }

  private async handleDriverAssigned(data: {
    trip_id: number;
    driver_id: number;
    driver_name: string;
    status: string;
  }) {
    const { currentRide, setCurrentRide, setRideState } =
      useRideStore.getState();

    if (!currentRide) {
      console.warn('[RideRealtime] No current ride found');
      return;
    }

    if (currentRide.id !== data.trip_id) {
      console.warn(
        '[RideRealtime] Event belongs to another trip:',
        data.trip_id,
      );
      return;
    }

    try {
      // Wait for the backend to give us the complete trip
      const trip = await rideApi.getTripById(currentRide.id);

      console.log('[RideRealtime] Full trip:', trip);

      // Update currentRide FIRST
      setCurrentRide({
        ...currentRide,
        status: data.status as TripStatus,
        driver: trip.data.driver,
        vehicle: trip.data.vehicle,
      });

      // Only AFTER currentRide has been updated
      setRideState(RideState.DRIVER_FOUND);
    } catch (error) {
      console.error('[RideRealtime] Failed to fetch trip details:', error);
    }
  }

  private handleDriverArrived(data: {
    trip_id: number;
    status: TripStatus;
    pin: string;
  }) {
    const { setRideState, currentRide, setCurrentRide } =
      useRideStore.getState();

    if (!currentRide) {
      console.warn('[RideRealtime] No current ride found');
      return;
    }

    if (currentRide.id !== data.trip_id) {
      console.warn(
        '[RideRealtime] Event belongs to another trip:',
        data.trip_id,
      );
      return;
    }

    setCurrentRide({
      ...currentRide,
      pin: data.pin,
      status: data.status,
    });

    setRideState(RideState.DRIVER_ARRIVED);
  }

  private handleTripStarted(data: { trip_id: number; status: string }) {
    const { setRideState, currentRide, setCurrentRide } =
      useRideStore.getState();

    if (!currentRide) {
      console.warn('[RideRealtime] No current ride found');
      return;
    }

    if (currentRide.id !== data.trip_id) {
      console.warn(
        '[RideRealtime] Event belongs to another trip:',
        data.trip_id,
      );
      return;
    }

    setCurrentRide({
      ...currentRide,
      status: data.status as TripStatus,
    });

    setRideState(RideState.TRIP_STARTED);
  }

  private handleTripCompleted(data: { trip_id: number; status: string }) {
    const { setRideState, currentRide, setCurrentRide } =
      useRideStore.getState();

    if (!currentRide) {
      console.warn('[RideRealtime] No current ride found');
      return;
    }

    if (currentRide.id !== data.trip_id) {
      console.warn(
        '[RideRealtime] Event belongs to another trip:',
        data.trip_id,
      );
      return;
    }

    setCurrentRide({
      ...currentRide,
      status: data.status as TripStatus,
    });

    setRideState(RideState.TRIP_ENDED);
  }

  private handleTripCancelled(data: { trip_id: number; status: string }) {
    const { currentRide, clearRide, setCurrentRide, setRideState } =
      useRideStore.getState();

    if (!currentRide) {
      return;
    }

    if (currentRide.id !== data.trip_id) {
      return;
    }

    setRideState(RideState.SELECT_RIDE);
    clearRide();
    setCurrentRide(null);
  }
}

export const rideRealtimeService = new RideRealtimeService();
