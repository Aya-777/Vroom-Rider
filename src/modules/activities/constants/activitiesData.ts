import { ActivityFilterTab } from '../types/activities.types';
import { TerminalTripStatus } from '../../ride/services/dto/tripHistory.dto';

export const ACTIVITY_TABS: ActivityFilterTab[] = [
  'All',
  'Completed',
  'Cancelled',
  'Rejected',
  'Pending',
  'Scheduled',
];

export const STATUS_PARAM_BY_TAB: Record<ActivityFilterTab, string | undefined> = {
  All: undefined,
  Completed: 'COMPLETED',
  Cancelled: 'CANCELLED_BY_RIDER',
  Rejected: 'CANCELLED_BY_DRIVER',
  Pending: 'PENDING',
  Scheduled: undefined,
};

export const SCHEDULED_PARAM_BY_TAB: Record<ActivityFilterTab, boolean | undefined> = {
  All: undefined,
  Completed: undefined,
  Cancelled: undefined,
  Rejected: undefined,
  Pending: undefined,
  Scheduled: true,
};

export const toDisplayStatus = (
  rawStatus: TerminalTripStatus,
  isScheduled = false,
): 'Completed' | 'Cancelled' | 'Rejected' | 'Pending' | 'Scheduled' => {
  if (isScheduled) return 'Scheduled';
  if (rawStatus === 'COMPLETED') return 'Completed';
  if (rawStatus === 'CANCELLED_BY_RIDER') return 'Cancelled';
  if (rawStatus === 'PENDING') return 'Pending';
  return 'Rejected';
};