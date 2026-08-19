import { useNavigation } from '@react-navigation/native';
import { useCallback, useEffect, useState } from 'react';
import {
  deleteNotificationApi,
  fetchNotifications,
  markNotificationAsRead,
} from '../services/notificationApi';
import { NotificationDTO } from '../services/dto/notification.dto';
import { NotificationItem } from '../types/notifications.types';

const toNotificationItem = (notification: NotificationDTO): NotificationItem => ({
  id: String(notification.id),
  user_id: '',
  trip_id: notification.trip_id == null ? null : String(notification.trip_id),
  title: notification.title,
  body: notification.body,
  type: notification.type,
  created_at: notification.created_at,
  isRead: notification.is_read,
});

export function useNotificationsViewModel() {
  const [notifications, setNotifications] = useState<NotificationItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigation = useNavigation();

  const loadNotifications = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await fetchNotifications();
      setNotifications(data.map(toNotificationItem));
    } catch (error) {
      console.warn('Failed to load notifications', error);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadNotifications();
  }, [loadNotifications]);

  const markAsRead = async (id: string) => {
    setNotifications(previous =>
      previous.map(item => (item.id === id ? { ...item, isRead: true } : item)),
    );
    try {
      await markNotificationAsRead(Number(id));
    } catch (error) {
      console.warn('Failed to mark notification as read', error);
      loadNotifications();
    }
  };

  const deleteNotification = async (id: string) => {
    const previous = notifications;
    setNotifications(current => current.filter(item => item.id !== id));
    try {
      await deleteNotificationApi(Number(id));
    } catch (error) {
      console.warn('Failed to delete notification', error);
      setNotifications(previous);
    }
  };

  return {
    notifications,
    isLoading,
    handleBackPress: () => navigation.goBack(),
    deleteNotification,
    markAsRead,
    refresh: loadNotifications,
  };
}
