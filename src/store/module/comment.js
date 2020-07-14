import {
  getColumnList,
  getHomeStationCommentVerify,
  passOfflineAllComment,
  passOfflineComment,
  updateComment,
  saveComment,
  saveBlack,
  getCommentPage,
  getReportList,
  pass_offline_all_comment,
  pass_offline_comment,
  getBlackPage,
  deleteBlackByKey,
  getFilterPage,
  saveFilter,
  deleteFilterByKey,
  getUserCommentPage,
  getPList
} from '@/api/comment'
import {
  getJigouList
} from '@/api/platform'
import {
  objAddAtt,
  getShijain
} from "@/libs/tools";

// 评论vuex
export default {
  state: {
    tabsList: [{
        id: 0,
        label: "待审核"
      },
      {
        id: 1,
        label: "已通过"
      },
      {
        id: 2,
        label: "已下线"
      }
    ],
    tabs: ["pending-review", "passed", "offline"],
    tabsIndex: 0,
    columnList: [], //当前栏目分类列表
    currectPlatFormId: '', // 当前平台ID
    currectJigouId: '', //当前机构ID
    currectCateKey: '', //当前栏目ID
    currctJiGouList: [], //当前机构列表
    currectTotal: null, //当前评论总数
    homeList: [], //本站评论列表
    reportList: [], //举报评论列表
    blackList: [], //黑名单列表
    commentList: [], //楼层评论列表
    currectCommentTotal: null, // 评论总数
    filterList: [], // 过滤词列表
    userOrgName: '', // 用户所在机构名字
  },
  getters: {
    currentTab(state, getters, rootState) {
      return state.tabs[state.tabsIndex];
    },
    // 监听 栏目分类列表
    newColumnList(state) {
      return state.columnList;
    },
    // 当前机构列表
    getCurrectJiGouList: state => state.currctJiGouList,

    // 监听当前平台ID
    getCurrectPlatFormId: state => state.currectPlatFormId,

    // 监听当前机构ID
    getCurrectJigouId: state => state.currectJigouId,

    // 监听当前文章列表总数
    getCurrectTotal: state => state.currectTotal,

    // 当前文章的栏目key
    getCurrectCateKey: state => state.currectCateKey,

    // 监听本站列表
    getHomeList: state => state.homeList,

    // 举报评论列表
    getNewReportList: state => state.reportList,

    // 黑名单列表
    getBlackList: state => state.blackList,

    // 当前评论列表
    getCommentList: state => state.commentList,

    // 楼层评论总数
    getCurrectCommentTotal: state => state.currectCommentTotal,

    // 获取过滤词列表
    getFilterList: state => state.filterList
  },
  mutations: {
    // 设置栏目分类列表
    setColumnList(state, list) {
      state.columnList = list;
    },
    // 设置当前机构列表
    setCurrectJiGouList(state, value) {
      state.currctJiGouList = value;
    },
    // 设置当前平台ID
    setCurrectPlatFormId(state, value) {
      // console.log(value, "当前平台Key");
      state.currectPlatFormId = value;
    },
    // 设置当前机构ID
    setCurrectJigouId(state, value) {
      // console.log(value, "当前机构Key");
      state.currectJigouId = value;
    },
    // 设置总数
    setCurrectTotal(state, value) {
      state.currectTotal = value;
    },
    // 设置当前文章栏目key
    setCurrectCateKey(state, value) {
      state.currectCateKey = value;
    },
    // 本站列表
    setHomeList(state, value) {
      state.homeList = value;
    },
    // 举报评论列表
    setReportList(state, value) {
      state.reportList = value;
    },
    // 黑名单
    setBlackList(state, value) {
      state.blackList = value;
    },
    // 设置评论列表
    setCommentList(state, value) {
      state.commentList = value;
    },
    // 设置楼层评论总数
    setCurrectCommentTotal(state, value) {
      state.currectCommentTotal = value
    },
    // 设置过滤词列表
    setFilterList(state, value) {
      state.filterList = value;
    },

    setUserOrgName(state, value) {
      state.userOrgName = value
    }
  },
  actions: {
    // 标签页点击事件
    tabsHandleClick({
      state,
      dispatch
    }, value) {
      state.tabsIndex = value;
      value = parseInt(value)
      console.log(value);
      dispatch('getHomeStationCommentVerify', {
        offset: 1,
        status: value,
        pageSize: 10,
        columnKey: state.currectCateKey
      })
    },
    // 获取栏目分类列表
    getColumnList({
      state,
      commit
    }, status) {
      let obj = {
        orgKey: state.currectJigouId,
        platformKey: state.currectPlatFormId,
      }
      console.log(obj, "栏目列表获取参数");
      return new Promise((resolve, reject) => {
        getColumnList(obj, status).then(res => {
          console.log(res, '栏目分类列表');
          commit('setColumnList', res.data.data);
          resolve(res.data.data);
        })
      })
    },

    //  根据平台id获取机构列表
    getCurrectJigouList({
      state,
      commit
    }, platFormKey) {
      // 设置当前平台ID
      commit("setCurrectPlatFormId", platFormKey);
      return new Promise((resolve, reject) => {
        getJigouList(platFormKey).then(res => {
          let newData = objAddAtt(res.data.data)
          console.log(res.data, "当前机构列表");
          commit("setCurrectJiGouList", newData)
          resolve(newData)
        })
      })
    },
    // 获取本站评论审核
    getHomeStationCommentVerify({
      state,
      commit
    }, {
      offset,
      status,
      pageSize,
      columnKey,
      selectIndex,
      selectValue
    }) {
      let obj = {
        offset,
        pageSize,
        commentContent: selectIndex == "1" ? selectValue : '',
        status,
        columnKey,
        loginName: selectIndex == "2" ? selectValue : '',
        loginId: selectIndex == "3" ? selectValue : '',
        orgKey: state.currectJigouId,
        platformKey: state.currectPlatFormId
      }
      return new Promise((resolve, reject) => {
        commit('setHomeList', []);
        getHomeStationCommentVerify(obj).then(res => {
          commit('setCurrectTotal', res.data.totalCount) //设置分页总数
          console.log(res, "本站评论列表");
          if (res.data.data == null) {
            commit('setHomeList', []);
          } else {
            commit('setHomeList', res.data.data);
          }
          resolve(res.data.data)
        })
      })
    },

    // 获取举报评论审核
    getReportList({
      state,
      commit
    }, {
      offset,
      pageSize,
      columnKey,
      selectIndex,
      selectValue
    }) {
      let obj = {
        offset,
        pageSize,
        commentContent: selectIndex == "1" ? selectValue : '',
        status,
        columnKey,
        loginName: selectIndex == "2" ? selectValue : '',
        loginId: selectIndex == "3" ? selectValue : '',
        orgKey: state.currectJigouId,
        platformKey: state.currectPlatFormId
      }
      return new Promise((resolve, reject) => {
        getReportList(obj).then(res => {
          commit('setReportList', [])
          commit('setCurrectTotal', res.data.totalCount)
          console.log(res.data, "举报评论列表");
          if (res.data.data == null) {
            commit('setReportList', []);
          } else {
            commit('setReportList', res.data.data)
          }
          resolve(res.data.data)
        })
      })
    },

    // 下线通过 所有评论
    passOfflineAllComment({
      state,
      commit,
      dispatch
    }, {
      idListStr,
      changeFlag
    }) {
      return new Promise((resolve, reject) => {
        passOfflineComment({
          idListStr,
          changeFlag
        }).then(res => {
          console.log(res, "下线通过评论");
          resolve(res.data)
        })
      })
    },

    // 下线的所有举报评论
    pass_offline_all_comment({
      state,
      commit
    }, {
      idListStr,
      changeFlag
    }) {
      return new Promise((resolve, reject) => {
        pass_offline_comment({
          idListStr,
          changeFlag
        }).then(res => {
          console.log(res, "下线的所有举报评论");
          resolve(res.data)
        })
      })
    },

    // 下线通过举报 评论
    pass_offline_comment({
      state,
      commit
    }, {
      idListStr,
      changeFlag
    }) {
      console.log(idListStr, changeFlag);
      return new Promise((resolve, reject) => {
        pass_offline_comment({
          idListStr,
          changeFlag
        }).then(res => {
          console.log(res, "下线举报评论");
          let commentIndex = state.reportList.findIndex((item, index) => {
            return item.commentKey == idListStr
          })
          state.reportList.splice(commentIndex, 1)
          commit('setReportList', state.reportList)
          commit('setCurrectTotal', state.currectTotal - 1)
          resolve(res)
        })
      })
    },

    // 下线通过 评论
    passOfflineComment({
      state,
      commit
    }, {
      idListStr,
      changeFlag
    }) {
      console.log(idListStr, changeFlag, 1111);
      return new Promise((resolve, reject) => {
        passOfflineComment({
          idListStr,
          changeFlag
        }).then(res => {
          console.log(res, "下线评论");
          if (res.data.ok) {
            let commentIndex = state.homeList.findIndex((item, index) => {
              return item.commentKey == idListStr
            })
            state.homeList.splice(commentIndex, 1)
            commit('setHomeList', state.homeList)
            commit('setCurrectTotal', state.currectTotal - 1)
          }
          resolve(res)
        })
      })
    },

    // 设置为热门评论
    updateComment({
      state,
      commit,
      dispatch
    }, {
      commentkey,
      isHot
    }) {
      // 当前已通过的
      let {
        status,
        commentKey
      } = commentkey;
      console.log(commentKey);
      return new Promise((resolve, reject) => {
        updateComment({
          commentKey,
          isHot
        }).then(res => {
          console.log(res, "设置为热门评论");
          resolve(res);
        })
      })
    },

    // 回复
    saveComment({
      state,
      commit,
      rootState
    }, {
      row,
      contentValue
    }) {
      console.log(row, rootState.user.userName);
      let {
        programId,
        status,
        ip,
        commentKey,
        columnKey,
        orgKey,
        platformKey
      } = row;
      let obj = {
        programId,
        commentContent: contentValue,
        status,
        loginName: rootState.user.userName,
        loginId: rootState.user.userId,
        ip,
        atCommentKey: commentKey,
        columnKey,
        orgKey,
        platformKey,
      }
      console.log(obj);
      return new Promise((resolve, reject) => {
        saveComment(obj).then(res => {
          console.log(res, "回复");
          resolve()
        })
      })
    },

    // 禁言用户
    saveBlack({
      commit
    }, row) {
      console.log(row);
      let currectDate = getShijain()
      let {
        loginName,
        loginId,
        operatorName,
        blackReason,
        createTime,
        platformKey
      } = row
      let obj = {
        loginName,
        loginId,
        operatorName: '操作员2',
        blackReason: '不合法',
        createTime: currectDate,
        platformKey
      }
      console.log(obj);
      return new Promise((resolve, reject) => {
        saveBlack(obj).then(res => {
          console.log(res, "禁言用户");
          resolve(res);
        })
      })
    },

    // 查询评论列表
    getCommentPage({
      commit
    }, {
      row,
      offset
    }) {
      console.log(row);
      let {
        programId,
        orgKey,
        columnKey,
        platformKey,
        status
      } = row
      let obj = {
        offset,
        pageSize: 10,
        programId,
        orgKey,
        columnKey,
        platformKey,
        status
      }
      return new Promise((resolve, reject) => {
        getCommentPage(obj).then(res => {
          console.log(res, "查询评论列表");
          commit('setCurrectCommentTotal', res.data.totalCount)
          commit('setCommentList', res.data.data)
          resolve(res)
        })
      })
    },

    // 查询用户的所有评论列表
    getUserCommentPage({
      commit
    }, {
      row,
      offset
    }) {
      console.log(row);
      let {
        orgKey,
        columnKey,
        platformKey,
        loginId
      } = row
      let obj = {
        offset,
        pageSize: 10,
        orgKey,
        columnKey,
        platformKey,
        loginId
      }
      return new Promise((resolve, reject) => {
        getUserCommentPage(obj).then(res => {
          console.log(res, "查询用户的所有评论列表");
          resolve(res)
        })
      })
    },

    // 查询评论列表
    getCommentAllPage({
      commit
    }, {
      row,
      offset,
      status
    }) {
      console.log(row);
      let {
        programId,
        orgKey,
        columnKey,
        platformKey
      } = row
      let obj = {
        offset,
        pageSize: 10,
        programId,
        orgKey,
        columnKey,
        platformKey,
        status
      }
      return new Promise((resolve, reject) => {
        getCommentPage(obj).then(res => {
          console.log(res, "查询所有的评论列表");
          resolve(res)
        })
      })
    },

    // 黑名单
    getBlackPage({
      state,
      commit
    }, {
      platformKey,
      offset,
      pageSize,
    }) {
      return new Promise((resolve, reject) => {
        getBlackPage({
          platformKey,
          offset,
          pageSize,
        }).then(res => {
          console.log(res, "黑名单列表");
          commit('setBlackList', res.data.data)
          commit('setCurrectCommentTotal', res.data.totalCount)
          resolve(res);
        })
      })
    },

    // 恢复黑名单
    deleteBlackByKey({
      state,
      commit,
      dispatch
    }, obj) {
      console.log(obj);
      console.log(state.currectPlatFormId);
      return new Promise((resolve, reject) => {
        deleteBlackByKey(obj.blackKey).then(res => {
          console.log(res, "黑名单恢复");
          dispatch('getBlackPage', {
            platFormId: state.currectPlatFormId,
            offset: 1,
            pageSize: 10,
          })
        })
      })
    },

    // 获取过滤词列表
    getFilterPage({
      state,
      commit
    }, obj) {
      console.log(obj);
      return new Promise((resolve, reject) => {
        getFilterPage(obj).then(res => {
          console.log(res, "过滤词列表");
          commit('setFilterList', res.data.data)
          commit('setCurrectCommentTotal', res.data.totalCount)
        })
      })
    },

    // 过滤词添加
    saveFilter({
      state,
      commit
    }, obj) {
      console.log(obj);
      return new Promise((resolve, reject) => {
        saveFilter(obj).then(res => {
          console.log(res, "过滤词添加");
          resolve();
        })
      })
    },

    // 删除过滤词
    deleteFilterByKey({
      state,
      commit,
      dispatch
    }, obj) {
      console.log(obj);
      let {
        filterType
      } = obj
      return new Promise((resolve, reject) => {
        deleteFilterByKey(obj.filterKey).then(res => {
          console.log(res, "删除过滤词");
          dispatch("getFilterPage", {
            filterType,
            filterContent: "",
            pageSize: 10,
            offset: 1
          })
        })
      })
    },


    // 实时聊天获取文章列表
    getPList({
      state,
      commit,
      dispatch
    }, obj) {
      let {
        page,
        pageSize
      } = obj;
      let data = {
        page,
        pageSize,
        platformKey: state.currectPlatFormId,
        columnKey: state.currectCateKey
      }
      console.log(data, "获取文章列表");
      return new Promise((resolve, reject) => {
        getPList(data).then(res => {
          resolve(res.data.data)
        })
      })
    }
  }
}
