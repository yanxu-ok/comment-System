import instance from '@/libs/api.request'
let axios = instance.axios8090

let axios1 = instance.axios8091
// import {
//   setToken,
//   getToken
// } from '@/libs/util'

// 获取平台
export const getPlatform = () => {
  return axios.request({
    url: 'platform/get_platform_list',
    params: {},
    method: 'get'
  })
}

// 平台添加
export const platformAdd = ({
  platformName,
  imgUrl,
  appKey,
  appSecret,
  interfaceDomain,
  webSecret
}) => {
  return axios.request({
    url: 'platform/bind_platform',
    params: {
      platformName,
      imgUrl,
      appKey,
      appSecret,
      interfaceDomain,
      webSecret
    },
    method: 'get'
  })
}

// 机构列表
export const getJigouList = (platformKey) => {
  return axios.request({
    url: 'org/get_org_list',
    params: {
      platformKey
    },
    method: 'get'
  })
}

// 机构刷新
export const getJigourefresh = (platformKey) => {
  return axios.request({
    url: 'org/get_org_list',
    params: {
      platformKey
    },
    method: 'get'
  })
}

// // 获取刷新栏目数据
// export const getCateList = ({
//   platformKey,
//   orgKey,
//   columnKey
// }) => {

//   return axios.request({
//     url: 'org/get_org_list',
//     params: {
//       platformKey,
//       orgKey,
//     },
//     method: 'get'
//   })
// }

// 修改展示隐藏状态
export const getChangeStatus = ({
  columnKey,
  status,
  platformKey
}) => {
  console.log(columnKey, status);
  return axios.request({
    url: 'column/change_status',
    params: {
      columnKey,
      status,
      platformKey
    },
    method: 'get'
  })
}

// 获取栏目列表
export const getCateList = ({
  orgKey,
  platformKey
}, status) => {
  if (!status) {
    let data = {
      orgKey,
      platformKey,
      parentColumnKey: ''
    }
    return axios.request({
      url: 'column/get_column_list',
      data: new URLSearchParams(data),
      method: 'POST'
    })
  } else {
    let data = {
      orgKey,
      platformKey,
      parentColumnKey: '',
      status
    }
    return axios.request({
      url: 'column/get_column_list',
      data: new URLSearchParams(data),
      method: 'POST'
    })
  }
}
