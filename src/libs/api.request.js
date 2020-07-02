import HttpRequest from '@/libs/axios'
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro

const axios8090 = new HttpRequest(baseUrl)
const axios8091 = new HttpRequest("http://10.0.117.248:8091")
export default {
  axios8090,
  axios8091
}
