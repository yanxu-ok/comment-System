import intance from '@/libs/api.request'

let axios = intance.axios8090

let axios1 = intance.axios8091

// 获取平全局设置
export const getGlobalSetting = () => {
  return axios.request({
    url: 'commentSetting/get_global_setting',
    params: {},
    method: 'get'
  })
}

// 设置平全局设置
export const setGlobalSetting = (string, number) => {
  return axios.request({
    url: 'commentSetting/global_setting',
    params: {
      settingType: string,
      settingValue: number
    },
    method: 'get'
  })
}

// 获取机构设置
export const getJigouSetting = (platformKey) => {
  return axios.request({
    url: 'org/get_org_settings',
    params: {
      platformKey
    },
    method: 'get'
  })
}

// 修改配置
export const setDetailSetting = (obj) => {
  return axios.request({
    url: 'commentSetting/detail_setting',
    params: obj,
    method: 'get'
  })
}

// 获取栏目配置
export const getCatePageList = ({
  platformKey,
  orgKey,
  parentColumnKey,
  pageSize,
  offset
}) => {
  return axios.request({
    url: 'column/get_column_settings',
    params: {
      platformKey,
      orgKey,
      parentColumnKey,
      pageSize,
      offset
    },
    method: 'get'
  })
}

// 获取稿件列表配置
export const getArticleList = ({
  platformKey,
  columnKey,
  pageSize,
  offset
}) => {
  return axios.request({
    url: 'column/get_article_list',
    params: {
      platformKey,
      columnKey,
      pageSize,
      offset
    },
    method: 'get'
  })
}
