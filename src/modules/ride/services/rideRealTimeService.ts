import { PusherEvent } from '@pusher/pusher-websocket-react-native';
import { useRideStore } from '../store/useRideStore';
import { TripStatus } from '../types/RideState';

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

        case 'trip.cancelled':
          this.handleTripCancelled(data);
          break;

        default:
          console.log(
            '[RideRealtime] Unhandled event:',
            event.eventName,
          );
      }
    } catch (error) {
      console.error(
        '[RideRealtime] Failed to handle event:',
        error,
      );
    }
  }

  private handleDriverAssigned(data: {
    trip_id: number;
    driver_id: number;
    driver_name: string;
    status: string;
  }) {
    const { currentRide, setCurrentRide } =
      useRideStore.getState();

    if (!currentRide) {
      console.warn(
        '[RideRealtime] No current ride found',
      );
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
      // driver: data.driver_id,
      // driver_name: data.driver_name,
    });
  }

  private handleTripCancelled(data: {
    trip_id: number;
    status: string;
  }) {
    const { currentRide, setCurrentRide } =
      useRideStore.getState();

    if (!currentRide) {
      return;
    }

    if (currentRide.id !== data.trip_id) {
      return;
    }

    setCurrentRide({
      ...currentRide,
      status: data.status as TripStatus,
    });

    
  }
}

export const rideRealtimeService =
  new RideRealtimeService();