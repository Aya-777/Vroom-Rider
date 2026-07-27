export const ENDPOINTS = {
  AUTH: {
    SIGNUP: '/api/v1/auth/signup/',
    VERIFY_OTP: '/api/v1/auth/signup/verify-otp/',
    RESEND_OTP: '/api/v1/auth/signup/resend-otp/',
    LOGIN: '/api/v1/auth/login/',
    FORGOT_PASSWORD: '/api/v1/auth/forgot-password/',
    FORGOT_PASSWORD_VERIFY_OTP: '/api/v1/auth/forgot-password/verify-otp/',
    FORGOT_PASSWORD_RESEND_OTP :'/api/v1/auth/forgot-password/resend-otp/',
    RESET_PASSWORD: '/api/v1/auth/forgot-password/reset-password/',
  },

  TRIPS: {
  INITIAL_ESTIMATE: '/api/v1/trips/trips/estimate/initial/',
  REFINED_ESTIMATE: '/api/v1/trips/trips/estimate/refined/',
  SAVED_LOCATIONS: '/api/v1/trips/saved-locations/',
  PREFERENCES: '/api/v1/trips/preferences/',
  CONFIRM: '/api/v1/trips/confirm/',
},

} as const;