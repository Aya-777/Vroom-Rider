import { getApp } from '@react-native-firebase/app';
import {
  getMessaging,
  requestPermission,
  getToken,
  onTokenRefresh as _onTokenRefresh,
  onMessage,
  onNotificationOpenedApp as _onNotificationOpenedApp,
  getInitialNotification as _getInitialNotification,
  setBackgroundMessageHandler as _setBackgroundMessageHandler,
  AuthorizationStatus,
} from '@react-native-firebase/messaging';
import { Platform, PermissionsAndroid } from 'react-native';

const messagingInstance = getMessaging(getApp());

export async function requestNotificationPermission(): Promise<boolean> {
  if (Platform.OS === 'android' && Platform.Version >= 33) {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (granted !== PermissionsAndroid.RESULTS.GRANTED) return false;
  }

  const authStatus = await requestPermission(messagingInstance);
  return (
    authStatus === AuthorizationStatus.AUTHORIZED ||
    authStatus === AuthorizationStatus.PROVISIONAL
  );
}

export async function getFcmToken(): Promise<string | null> {
  try {
    return await getToken(messagingInstance);
  } catch (e) {
    console.warn('FCM getToken failed', e);
    return null;
  }
}

export function onTokenRefresh(callback: (token: string) => void) {
  return _onTokenRefresh(messagingInstance, callback);
}

export function onForegroundMessage(callback: (message: any) => void) {
  return onMessage(messagingInstance, callback);
}

export function onNotificationOpenedApp(callback: (message: any) => void) {
  return _onNotificationOpenedApp(messagingInstance, callback);
}

export async function getInitialNotification() {
  return _getInitialNotification(messagingInstance);
}

// Must be registered outside the React component tree, e.g. in index.js
export function setBackgroundMessageHandler(
  handler: (message: any) => Promise<void>,
) {
  _setBackgroundMessageHandler(messagingInstance, handler);
}
