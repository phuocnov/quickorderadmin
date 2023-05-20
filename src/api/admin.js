import api from './api'
import API_CONSTAINTS from './constant'

export default {
  login: (params) => {
    return api.post(API_CONSTAINTS.ADMIN.LOGIN, params)
  },
  createProduct: (params) => {
    return api.post(API_CONSTAINTS.ADMIN.CREATE_PRODUCT, params)
  },
  adjustProduct: (params) => {
    return api.post(API_CONSTAINTS.ADMIN.ADJUST_CLOTHE, params)
  },
  getHistory: () => {
    return api.get(API_CONSTAINTS.ADMIN.ORDER_HISTORY)
  },
  getCurrentOrder: () => {
    return api.get(API_CONSTAINTS.ADMIN.CURRENT_ORDER)
  },
  cancelCurrentOrder: (id) => {
    return api.put(API_CONSTAINTS.ADMIN.CANCEL_ORDER(id))
  },
  deliveryOrder: (id) => {
    return api.put(API_CONSTAINTS.ADMIN.DELIVERY_ORDER(id))
  },
  deleteProduct: (id) => {
    return api.delete(API_CONSTAINTS.ADMIN.DELETE_CLOTHE(id))
  }
}
