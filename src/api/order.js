import api from './api'
import API_CONSTAINTS from './constant'

export default {
  order: (params) => {
    return api.post(API_CONSTAINTS.ORDER.ORDER, params)
  },
  history: () => {
    return api.get(API_CONSTAINTS.ORDER.HISTORY)
  },
  current: () => {
    return api.get(API_CONSTAINTS.ORDER.CURRENT)
  }
}
