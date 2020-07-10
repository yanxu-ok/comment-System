import HttpRequest from '@/libs/axios'
import config from '@/config'
const baseUrl = process.env.NODE_ENV === 'development' ? config.baseUrl.dev : config.baseUrl.pro
const baseUrl1 = process.env.NODE_ENV === 'development' ? config.baseUrl1.dev : config.baseUrl1.pro

const axios8090 = new HttpRequest(baseUrl)
const axios8091 = new HttpRequest(baseUrl1)
export default {
  axios8090,
  axios8091
}
