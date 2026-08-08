export const ENDPOINTS = {
  AUTH: {
    SIGNUP: '/api/v1/auth/signup/',
    VERIFY_OTP: '/api/v1/auth/signup/verify-otp/',
    RESEND_OTP: '/api/v1/auth/signup/resend-otp/',
    LOGIN: '/api/v1/auth/login/',
    REFRESH_TOKEN: '/api/v1/auth/token/refresh/',
    FORGOT_PASSWORD: '/api/v1/auth/forgot-password/',
    FORGOT_PASSWORD_VERIFY_OTP: '/api/v1/auth/forgot-password/verify-otp/',
    FORGOT_PASSWORD_RESEND_OTP: '/api/v1/auth/forgot-password/resend-otp/',
    RESET_PASSWORD: '/api/v1/auth/forgot-password/reset-password/',
    LOGOUT: '/api/v1/auth/logout/',
  },
  USERS: {
    ME: '/api/v1/users/me/',
    EDIT_PROFILE: '/api/v1/users/me/profile/',
    CHANGE_PHONE_REQUEST: '/api/v1/users/me/change-phone/',
    CHANGE_PHONE_RESEND: '/api/v1/users/me/change-phone/resend-otp/',
    CHANGE_PHONE_VERIFY: '/api/v1/users/me/change-phone/verify-otp/',
    CHANGE_PASSWORD: '/api/v1/users/me/change-password/',
  },

  TRIPS: {
    INITIAL_ESTIMATE: '/trips/trips/estimate/initial/',
    REFINED_ESTIMATE: '/trips/trips/estimate/refined/',
    SAVED_LOCATIONS: '/trips/saved-locations/',
    SAVED_LOCATION: (id: number) => `/trips/saved-locations/${id}/`,
    PREFERENCES: '/trips/preferences/',
    CONFIRM: '/trips/confirm/',
    CANCEL: (id: number) => `/trips/trips/${id}/cancel/`,
    HISTORY: '/trips/history/',
    RECENT: '/trips/recent/',
  },

  FAVORITE_DRIVERS: {
    TOGGLE: '/api/v1/users/favorite-drivers/toggle/',
  },
} as const;