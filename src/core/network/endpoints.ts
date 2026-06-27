export const ENDPOINTS = {
  AUTH: {
    SIGNUP: '/auth/signup/',
    VERIFY_OTP: '/auth/signup/verify-otp/',
    RESEND_OTP: '/auth/signup/resend-otp/',
    LOGIN: '/auth/login/',
    FORGOT_PASSWORD: '/auth/forgot-password/',
    FORGOT_PASSWORD_VERIFY_OTP: '/auth/forgot-password/verify-otp/',
    FORGOT_PASSWORD_RESEND_OTP :'/auth/forgot-password/resend-otp/',
    RESET_PASSWORD: '/auth/forgot-password/reset-password/',
  },
} as const;