import { RideState, TripStatus } from '../types/RideState';

export function getRideStateFromStatus(status: TripStatus): RideState {
  switch (status) {
    case TripStatus.PENDING:
      return RideState.SEARCHING_FOR_DRIVER;

    case TripStatus.ACCEPTED:
      return RideState.DRIVER_FOUND;

    case TripStatus.PICKUP:
      return RideState.DRIVER_ARRIVED;

    case TripStatus.ON_TRIP:
      return RideState.TRIP_STARTED;

    case TripStatus.COMPLETED:
      return RideState.TRIP_ENDED;

    default:
      return RideState.SELECT_RIDE;
  }
}