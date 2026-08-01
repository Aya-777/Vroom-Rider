import { apiClient } from '../../core/network/apiClient';

export const getFullImageUrl = (path?: string | null): string | undefined => {
    if (!path) return undefined;
    return `${apiClient.defaults.baseURL}media/${path}`;
};