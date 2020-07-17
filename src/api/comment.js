import instance from '@/libs/api.request'
let axios = instance.axios8090

let axios1 = instance.axios8091

// 获取栏目分类列表
export const getColumnList = (obj, status) => {
  obj.status = status;
  const data = obj;
  return axios.request({
    url: 'column/get_column_list',
    data: new URLSearchParams(data),
    method: 'POST'
  })
}

// 本站评论审核列表
export const getHomeStationCommentVerify = ({
  offset,
  pageSize,
  commentContent,
  status,
  columnKey,
  orgKey,
  platformKey,
  loginName,
  loginId,
  programName
}) => {
  const data = {
    offset,
    pageSize,
    status,
    columnKey,
    orgKey,
    platformKey,
    commentContent,
    loginName,
    loginId,
    programName
  };
  return axios.request({
    url: 'comment/get_home_station_comment_verify',
    data: new URLSearchParams(data),
    method: 'POST'
  })
}

// 举报评论审核列表查询
export const getReportList = ({
  offset,
  pageSize,
  columnKey,
  orgKey,
  platformKey,
  commentContent,
  loginName,
  loginId,
}) => {
  const data = {
    offset,
    pageSize,
    columnKey,
    orgKey,
    platformKey,
    commentContent,
    loginName,
    loginId,
  };
  return axios.request({
    url: 'report/get_report_list',
    data: new URLSearchParams(data),
    method: 'POST'
  })
}


// 下线 通过所有评论
export const passOfflineAllComment = ({
  orgKey,
  platformKey,
  columnKey,
  changeFlag
}) => {
  const data = {
    orgKey,
    platformKey,
    columnKey,
    changeFlag
  };
  return axios.request({
    url: 'comment/pass_offline_all_comment',
    data: new URLSearchParams(data),
    method: 'POST'
  })
}

// 通过/下线所有举报评论功能
export const pass_offline_all_comment = ({
  columnKey,
  orgKey,
  platformKey,
  changeFlag
}) => {
  const data = {
    orgKey,
    platformKey,
    changeFlag,
    columnKey,
  };
  return axios.request({
    url: 'report/pass_offline_all_comment',
    data: new URLSearchParams(data),
    method: 'POST'
  })
}

// 下线 通过评论
export const passOfflineComment = ({
  idListStr,
  changeFlag
}) => {
  const data = {
    idListStr,
    changeFlag
  };

  return axios.request({
    url: 'comment/pass_offline_comment',
    data: new URLSearchParams(data),
    method: 'POST'
  })
}

// 下线 举报通过评论
export const pass_offline_comment = ({
  idListStr,
  changeFlag
}) => {
  const data = {
    idListStr,
    changeFlag
  };
  return axios.request({
    url: 'report/pass_offline_comment',
    data: new URLSearchParams(data),
    method: 'POST'
  })
}

// 设置热门评论
export const updateComment = ({
  commentKey,
  isHot
}) => {
  const data = {
    commentKey,
    isHot
  };
  return axios1.request({
    url: 'comment_page/update_comment',
    data: new URLSearchParams(data),
    method: 'POST'
  })
}

// 回复
export const saveComment = ({
  programId,
  commentContent,
  status,
  loginName,
  loginId,
  ip,
  atCommentKey,
  columnKey,
  orgKey,
  platformKey
}) => {
  const data = {
    programId,
    commentContent,
    status,
    loginName,
    loginId,
    ip,
    atCommentKey,
    columnKey,
    orgKey,
    platformKey
  };
  return axios1.request({
    url: 'comment_page/reply_comment',
    data: new URLSearchParams(data),
    method: 'POST'
  })
}

// 禁言用户
export const saveBlack = ({
  loginName,
  loginId,
  operatorName,
  blackReason,
  createTime,
  platformKey
}) => {
  const data = {
    loginName,
    loginId,
    operatorName,
    blackReason,
    createTime,
    platformKey
  };
  return axios1.request({
    url: 'black_page/save_black',
    data: new URLSearchParams(data),
    method: 'POST'
  })
}

// 查询文章内评论列表
export const getCommentPage = ({
  programId,
  orgKey,
  platformKey,
  offset,
  pageSize,
  columnKey,
  commentKey
}) => {
  const data = {
    programId,
    offset,
    pageSize,
    columnKey,
    orgKey,
    platformKey,
    commentKey
  };
  return axios.request({
    url: 'comment/get_building_comment',
    data: new URLSearchParams(data),
    method: 'POST'
  })
}

// 实时聊天定时刷新
export const getChat = ({
  programId,
  orgKey,
  platformKey,
  offset,
  pageSize,
  columnKey
}) => {
  const data = {
    programId,
    offset,
    pageSize,
    columnKey,
    orgKey,
    platformKey
  };
  return axios.request({
    url: 'comment/get_home_station_comment_verify',
    data: new URLSearchParams(data),
    method: 'POST'
  })
}

// 实时聊天定时刷新
export const getCommentAllPage = ({
  programId,
  orgKey,
  platformKey,
  offset,
  pageSize,
  columnKey,
  status
}) => {
  const data = {
    programId,
    offset,
    pageSize,
    columnKey,
    orgKey,
    platformKey,
    status
  };
  return axios.request({
    url: 'comment/get_home_station_comment_verify',
    data: new URLSearchParams(data),
    method: 'POST'
  })
}

// 查询用户所有的评论列表
export const getUserCommentPage = ({
  loginId,
  orgKey,
  platformKey,
  offset,
  pageSize,
  columnKey,
}) => {
  const data = {
    loginId,
    offset,
    pageSize,
    columnKey,
    orgKey,
    platformKey
  };
  return axios.request({
    url: 'comment/get_home_station_comment_verify',
    data: new URLSearchParams(data),
    method: 'POST'
  })
}

// 查询黑名单列表
export const getBlackPage = ({
  platformKey,
  offset,
  pageSize,
}) => {
  const data = {
    platformKey,
    offset,
    pageSize,
  };
  return axios.request({
    url: 'black/get_black_page',
    data: new URLSearchParams(data),
    method: 'POST'
  })
}

// 恢复黑名单
export const deleteBlackByKey = (
  blackKey
) => {
  const data = {
    blackKey
  };
  return axios.request({
    url: 'black/delete_black_by_key',
    data: new URLSearchParams(data),
    method: 'POST'
  })
}

// 获取过滤词列表
export const getFilterPage = ({
  filterType,
  filterContent,
  pageSize,
  offset
}) => {
  const data = {
    filterType,
    filterContent,
    pageSize,
    offset
  };
  return axios.request({
    url: 'filter/get_filter_page',
    data: new URLSearchParams(data),
    method: 'POST'
  })
}

// 添加过滤词
export const saveFilter = ({
  operatorName,
  filterContent,
  filterType,
  createTime
}) => {
  const data = {
    operatorName,
    filterContent,
    filterType,
    createTime
  };
  return axios.request({
    url: 'filter/save_filter',
    data: new URLSearchParams(data),
    method: 'POST'
  })
}

// 删除过滤词
export const deleteFilterByKey = (filterKey) => {
  const data = {
    filterKey
  };
  return axios.request({
    url: 'filter/delete_filter_by_key',
    data: new URLSearchParams(data),
    method: 'POST'
  })
}

// 实时聊天 获取文章列表
export const getPList = (obj) => {
  return axios1.request({
    url: 'comment_page/article_list',
    data: new URLSearchParams(obj),
    method: 'POST'
  })
}

// 实时聊天发评论
export const liveChat = (obj) => {
  return axios1.request({
    url: 'comment_page/live_chat',
    data: new URLSearchParams(obj),
    method: 'POST'
  })
}

// 实时获取token
export const getImgToken = (obj) => {
  let {
    orgId,
    userId
  } = obj
  return axios.request({
    url: 'get_upload_token',
    data: new URLSearchParams(obj),
    method: 'POST'
  })
}
