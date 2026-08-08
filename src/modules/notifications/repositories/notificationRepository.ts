import { apiClient } from "../../../core/network/apiClient";

export async function registerDeviceToken(
  token: string,
  platform: 'android' | 'ios',
) {
  return apiClient.post('/notifications/device-tokens/', { token, platform });
}

export async function deactivateDeviceToken(deviceTokenId: string) {
  return apiClient.patch(
    `/notifications/device-tokens/${deviceTokenId}/deactivate/`,
  );
}
