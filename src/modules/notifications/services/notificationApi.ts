import { apiClient } from '../../../core/network/apiClient';
import {
  NotificationDTO,
  NotificationsListResponse,
} from './dto/notification.dto';

export async function fetchNotifications(): Promise<NotificationDTO[]> {
  const response = await apiClient.get<NotificationsListResponse>(
    '/api/v1/notifications/',
  );
  return response.data.data;
}

export async function markNotificationAsRead(id: number): Promise<void> {
  await apiClient.patch(`/api/v1/notifications/${id}/read/`);
}

export async function deleteNotificationApi(id: number): Promise<void> {
  await apiClient.delete(`/api/v1/notifications/${id}/`);
}
