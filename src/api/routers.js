import instance from '@/libs/api.request'
let axios = instance.axios8090

let axios1 = instance.axios8091

export const getRouterReq = (access) => {
  return axios.request({
    url: 'get_router',
    params: {
      access
    },
    method: 'get'
  })
}
