import request from '../../utils/request'
import api from '../../assets/datas/api'

export default {
  actions: {
    sendResume({}, n) {
      return request.post(api.addVitae, n);
    },
    changeResume({}, n) {
      return request.post(api.updateVitae, n);
    },
    getResume({}, n) {
      return request.post(api.selectVitae, n);
    }
  }
}
