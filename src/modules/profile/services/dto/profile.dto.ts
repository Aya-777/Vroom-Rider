export type ProfileData = {
    id: number;
    first_name: string;
    last_name: string;
    phone_number: string;
    role: string;
    account_status: string;
    profile_image: string | null;
    rating_avg: number;
    is_active: boolean;
    created_at: string;
    blocked_at: string | null;
    deleted_at: string | null;
};

export type ProfileResponseDto = {
    success: boolean;
    data: ProfileData;
};