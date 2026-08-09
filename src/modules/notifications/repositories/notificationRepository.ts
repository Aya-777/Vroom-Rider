import { apiClient } from '../../../core/network/apiClient';

export async function registerDeviceToken(
  token: string,
  platform: 'android' | 'ios',
) {
  console.log(' FCM TOKEN:', token);
  return apiClient.post('/api/v1/notifications/device-tokens/', {
    token,
    platform,
  });
}

export async function deactivateDeviceToken(deviceTokenId: string) {
  console.log('  DEACTIVATING DEVICE TOKEN:', deviceTokenId);
  return apiClient.patch(
    `/api/v1/notifications/device-tokens/${deviceTokenId}/deactivate/`,
  );
}
