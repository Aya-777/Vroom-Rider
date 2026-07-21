import { profileApi } from '../services/profileApi';
import { UserProfile } from '../types/profile.types';

export const profileRepository = {
    getMyProfile: async (): Promise<UserProfile> => {
        const response = await profileApi.getMyProfile();
        const dto = response.data; // فك الغلاف هون

        return {
            id: dto.id,
            firstName: dto.first_name,
            lastName: dto.last_name,
            phone: dto.phone_number,
            role: dto.role,
            accountStatus: dto.account_status,
            profileImage: dto.profile_image,
            ratingAvg: dto.rating_avg,
            isActive: dto.is_active,
        };
    },
};