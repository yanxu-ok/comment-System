import instance from '@/libs/api.request'
let axios = instance.axios8090

let axios1 = instance.axios8091
// 可视化
export const visualization = ({
  // columnKey,
  orgKey,
  platformKey,
  startTime,
  endTime,
}) => {
  let data;
  if (!startTime) {
    data = {
      // columnKey,
      orgKey,
      platformKey
    };
  } else {
    data = {
      // columnKey,
      orgKey,
      platformKey,
      startTime,
      endTime
    };
  }
  return axios.request({
    url: 'comment/visualization',
    data: new URLSearchParams(data),
    method: 'POST'
  })
}

// 获取点赞排行列表
export const praiseAndFloorList = ({
  columnKey,
  orgKey,
  platformKey,
  startTime,
  endTime,
  pageSize,
  offset
}) => {
  let data;
  if (!startTime) {
    data = {
      columnKey,
      orgKey,
      platformKey,
      pageSize,
      offset
    };
  } else {
    data = {
      columnKey,
      orgKey,
      platformKey,
      startTime,
      endTime,
      pageSize,
      offset
    };
  }
  return axios.request({
    url: 'comment/praise_list',
    data: new URLSearchParams(data),
    method: 'POST'
  })
}

// 获取盖楼排行列表
export const praiseAndFloorList1 = ({
  columnKey,
  orgKey,
  platformKey,
  startTime,
  endTime,
  pageSize,
  offset
}) => {
  let data;
  if (!startTime) {
    data = {
      columnKey,
      orgKey,
      platformKey,
      pageSize,
      offset
    };
  } else {
    data = {
      columnKey,
      orgKey,
      platformKey,
      startTime,
      endTime,
      pageSize,
      offset
    };
  }
  return axios.request({
    url: 'comment/floor_list',
    data: new URLSearchParams(data),
    method: 'POST'
  })
}

// 获取热门文章列表
export const popularArticles = ({
  columnKey,
  orgKey,
  platformKey,
  startTime,
  endTime,
  pageSize,
  offset
}) => {
  let data;
  if (!startTime) {
    data = {
      columnKey,
      orgKey,
      platformKey,
      pageSize,
      offset
    };
  } else {
    data = {
      columnKey,
      orgKey,
      platformKey,
      startTime,
      endTime,
      pageSize,
      offset
    };
  }
  return axios.request({
    url: 'comment/popular_articles',
    data: new URLSearchParams(data),
    method: 'POST'
  })
}

// 获取评论概况
export const commentSituation = ({
  // columnKey,
  orgKey,
  platformKey,
  startTime,
  endTime
}) => {
  let data;
  if (!startTime) {
    data = {
      // columnKey,
      orgKey,
      platformKey
    };
  } else {
    data = {
      // columnKey,
      orgKey,
      platformKey,
      startTime,
      endTime
    };
  }
  return axios.request({
    url: 'comment/comment_situation',
    data: new URLSearchParams(data),
    method: 'POST'
  })
}

// 获取审核情况
export const auditStatus = ({
  // columnKey,
  orgKey,
  platformKey,
  startTime,
  endTime
}) => {
  let data;
  if (!startTime) {
    data = {
      // columnKey,
      orgKey,
      platformKey
    };
  } else {
    data = {
      // columnKey,
      orgKey,
      platformKey,
      startTime,
      endTime
    };
  }
  return axios.request({
    url: 'comment/audit_status',
    data: new URLSearchParams(data),
    method: 'POST'
  })
}
