const API_CONSTAINTS = {
  AUTH: {
    LOGIN: '/login',
    SIGNUP: '/register',
    LOGOUT: '/logout',
    RESET_PASSWORD: '/resetPassword'
  },
  PRODUCTS: {
    GET_PRODUCTS: '/alldrink',
    DETAIL_PRODUCT: (id) => `/drink/${id}`,
    CATEGORIES: '/drink/category'
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
    CREATE_PRODUCT: '/admin/drink/create',
    ADJUST_DRINK: (id) => `/admin/drink/${id}}`,
    DELETE_DRINk: (id) => `/admin/drink/${id}}`,
    ORDER_HISTORY: '/admin/order/history',
    CURRENT_ORDER: '/admin/order/current',
    CANCEL_ORDER: (id) => `/admin/order/cancel/${id}`,
    DELIVERY_ORDER: (id) => `/admin/order/update/${id}`
  }
}
export default API_CONSTAINTS
