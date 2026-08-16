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
  CHANGE_PASSWORD: '/api/v1/users/me/change-password/',
  USERS: {
    ME: '/api/v1/users/me/',
    EDIT_PROFILE: '/api/v1/users/me/profile/',
    CHANGE_PHONE_REQUEST: '/api/v1/users/me/change-phone/',
    CHANGE_PHONE_RESEND: '/api/v1/users/me/change-phone/resend-otp/',
    CHANGE_PHONE_VERIFY: '/api/v1/users/me/change-phone/verify-otp/',
  },
  
  TRIPS: {
    GET_TRIP:(id: number) => `/trips/${id}/`,
    CURRENT: '/trips/current/',
    INITIAL_ESTIMATE: '/trips/trips/estimate/initial/',
    REFINED_ESTIMATE: '/trips/trips/estimate/refined/',
    VERIFY_NUMBER_ENTER: '/trips/contact-number/enter/',
    VERIFY_RIDE_OTP: '/trips/contact-number/verify/',
    VERIFY_RIDE_RESEND: '/trips/contact-number/resend/',
    SAVED_LOCATIONS: '/trips/saved-locations/',
    SAVED_LOCATION: (id: number) => `/trips/saved-locations/${id}/`,
    PREFERENCES: '/trips/preferences/',
    CONFIRM: '/trips/confirm/',
    REMATCH:(id: number) => `/trips/${id}/rematch/`,
    CANCEL: (id: number) => `/trips/trips/${id}/cancel/`,
    SUBMIT_REVIEW: (id: number) => `/trips/trips/${id}/reviews/`,
    HISTORY: '/trips/history/',
    RERIDE: (tripId: number) => `/trips/${tripId}/reorder/`,
    RECENT: '/trips/recent/',
    DRIVER_LOCATION:(id:number) => `/trips/${id}/location/`,
    SOS: (id: number) => `/trips/trips/${id}/sos/`,
    AREUSAFE: (id: number) => `/trips/safety-alerts/${id}/respond/`
},

  FAVORITE_DRIVERS: {
    TOGGLE: '/api/v1/users/favorite-drivers/toggle/',
    GET_FAVORITE_DRIVERS: '/api/v1/users/favorite-drivers/',
  },
  
  NOTIFICATIONS: {
    LIST: '/api/v1/notifications/',
    TYPES: '/api/v1/notifications/types/',
    DEVICE_TOKENS: '/api/v1/notifications/device-tokens/',
    DEACTIVATE: (id: number) =>
      `/api/v1/notifications/device-tokens/${id}/deactivate/`,
    MARK_READ: (id: number) => `/api/v1/notifications/${id}/read/`,
    DELETE: (id: number) => `/api/v1/notifications/${id}/`,
  },

  PUSHER:{
    AUTH: 'trips/pusher-auth/',
    CHANNELS: '/realtime/channels/',
  }
} as const;
