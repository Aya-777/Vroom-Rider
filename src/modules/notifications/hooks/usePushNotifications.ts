import { useEffect, useRef } from 'react';
import { Platform } from 'react-native';
import {
  requestNotificationPermission,
  getFcmToken,
  onTokenRefresh,
  onForegroundMessage,
  onNotificationOpenedApp,
  getInitialNotification,
} from '../services/fcmService';
import { registerDeviceToken } from '../repositories/notificationRepository';

type NotificationData = {
  type?: string; // NEW_TRIP | RIDER_CANCELLED | NO_DRIVER_FOUND | DRIVER_CANCELLED | DRIVER_ACCEPTED
  trip_id?: string;
};

export function usePushNotifications(
  isAuthenticated: boolean,
  onNotificationTap: (data: NotificationData) => void,
) {
  const registeredRef = useRef(false);
  const callbackRef = useRef(onNotificationTap);
  callbackRef.current = onNotificationTap;

  useEffect(() => {
    if (!isAuthenticated || registeredRef.current) return;

    (async () => {
      const granted = await requestNotificationPermission();
      if (!granted) return;

      const token = await getFcmToken();
      if (token) {
        await registerDeviceToken(token, Platform.OS as 'android' | 'ios');
        registeredRef.current = true;
      }
    })();

    const unsubscribeRefresh = onTokenRefresh(async newToken => {
      await registerDeviceToken(newToken, Platform.OS as 'android' | 'ios');
    });

    const unsubscribeForeground = onForegroundMessage(async remoteMessage => {
      console.log('Foreground notification:', remoteMessage);
    });

    const unsubscribeOpened = onNotificationOpenedApp(remoteMessage => {
      if (remoteMessage?.data) {
        callbackRef.current(remoteMessage.data as NotificationData);
      }
    });

    getInitialNotification().then(remoteMessage => {
      if (remoteMessage?.data) {
        callbackRef.current(remoteMessage.data as NotificationData);
      }
    });

    return () => {
      unsubscribeRefresh();
      unsubscribeForeground();
      unsubscribeOpened();
    };
  }, [isAuthenticated]);
}
