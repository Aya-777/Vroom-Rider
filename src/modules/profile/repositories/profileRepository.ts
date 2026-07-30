import { profileApi } from '../services/profileApi';
import { UserProfile, UpdateProfileInput } from '../types/profile.types';

export const profileRepository = {
    getMyProfile: async (): Promise<UserProfile> => {
        const response = await profileApi.getMyProfile();
        const dto = response.data;

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

    updateProfile: async (input: UpdateProfileInput): Promise<UserProfile> => {
        const response = await profileApi.updateProfile(input);
        const dto = response.data;

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

    requestPhoneChange: async (newPhoneNumber: string): Promise<void> => {
        await profileApi.requestPhoneChange(newPhoneNumber);
    },

    resendPhoneChange: async (): Promise<void> => {
        await profileApi.resendPhoneChange();
    },

    verifyPhoneChange: async (otp: string): Promise<void> => {
        await profileApi.verifyPhoneChange(otp);
    },
};