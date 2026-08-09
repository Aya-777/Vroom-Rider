import { TerminalTripStatus } from '../../ride/services/dto/tripHistory.dto';

export type ActivityFilterTab = 'All' | 'Completed' | 'Cancelled' | 'Rejected';

export type DisplayStatus = 'Completed' | 'Cancelled' | 'Rejected';

export interface Activity {
  id: string;
  rawStatus: TerminalTripStatus;
  displayStatus: DisplayStatus;
  pickupLocation: string;
  dropoffLocation: string;
  date: string;
  price: number | null;
  driverId: number | null;
  driverName: string;
  isFavorite: boolean;
  currency: string;
  rideType: string;
  distance: number | null;
  duration: number | null;
  cancellationReason: string | null;
}

export interface ActivityDetailsSheetProps {
  visible: boolean;
  activity: Activity | null;
  onClose: () => void;
  onReview: () => void;
  onReride: () => void;
}
