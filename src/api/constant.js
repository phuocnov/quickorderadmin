const API_CONSTAINTS = {
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/register',
    LOGOUT: '/logout',
    RESET_PASSWORD: '/resetPassword'
  },
  PRODUCTS: {
    GET_PRODUCTS: '/allclothe',
    DETAIL_PRODUCT: (id) => `/clothe/${id}`,
    CATEGORIES: '/clothe/category'
  },
  USER: {
    INFO: '/userInfo',
    CHANGE: '/userInfo'
  },
  ORDER: {
    ORDER: '/order/preparing',
    COMPLETE: (id) => `/order/complete/${id}`,
    CANCEL: (id) => `/order/cancel/${id}`,
    HISTORY: '/order/history',
    CURRENT: '/order/current'
  },
  ADMIN: {
    LOGIN: '/admin/login',
    CREATE_PRODUCT: '/admin/clothe/create',
    ADJUST_CLOTHE: (id) => `/admin/clothe/${id}}`,
    DELETE_CLOTHE: (id) => `/admin/clothe/${id}}`,
    ORDER_HISTORY: '/admin/order/history',
    CURRENT_ORDER: '/admin/order/current',
    CANCEL_ORDER: (id) => `/admin/order/cancel/${id}`,
    DELIVERY_ORDER: (id) => `/admin/order/update/${id}`
  }
}
export default API_CONSTAINTS
