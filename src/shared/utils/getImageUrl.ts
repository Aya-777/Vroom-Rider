import { apiClient } from '../../core/network/apiClient';

export const getFullImageUrl = (path?: string | null): string | undefined => {
    if (!path) return undefined;

    const baseUrl = (apiClient.defaults.baseURL ?? '').replace(/\/+$/, ''); 
    const cleanPath = path.replace(/^\/+/, ''); 

    return `${baseUrl}/media/${cleanPath}`;
};