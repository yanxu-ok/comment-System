import {
  visualization,
  praiseAndFloorList,
  praiseAndFloorList1,
  popularArticles,
  commentSituation,
  auditStatus
} from '@/api/statistics'
export default {
  state: {
    tabsList: [{
        id: 0,
        label: "点赞排行"
      },
      {
        id: 1,
        label: "盖楼排行"
      }
    ],
    floorDataList: [], //点赞和盖楼的列表
    praiseDataList: [],
    total: null, //文章总数
    total1: null,
    hotList: [], //热门文章列表
    situationList: null, // 评论概况列表
    shenHeObj: null, //审核情况
    visualizationObj: null, //可视化
    tabs: ["like", "build"],
    tabsIndex: 0
  },
  getters: {
    currentTab1(state, getters, rootState) {
      return state.tabs[state.tabsIndex];
    },
    // 获取点赞列表
    getPraiseDataList(state) {
      return state.praiseDataList;
    },
    // 获取盖楼列表
    getFloorDataList(state) {
      return state.floorDataList;
    },
    // 文章总数
    getNewTotal(state) {
      return state.total;
    },
    // 文章总数
    getNewTotal1(state) {
      return state.total1;
    },
    //获取热门文章列表
    getHotList(state) {
      return state.hotList;
    },
    // 获取评论列表
    getSituationList(state) {
      return state.situationList;
    },
    // 获取审核情况
    getShenHeObj(state) {
      return state.shenHeObj;
    },
    // 获取可视化
    getVisualizationObj(state) {
      return state.visualizationObj;
    }
  },
  mutations: {
    // 设置盖楼列表
    setFloorDataList(state, value) {
      state.floorDataList = value
    },
    // 设置点赞列表
    setPraiseDataList(state, value) {
      state.praiseDataList = value;
    },
    // 设置文章总数
    setNewTotal(state, value) {
      state.total = value;
    },
    // 设置文章总数
    setNewTotal1(state, value) {
      state.total1 = value;
    },
    // 设置文章列表
    setHotList(state, value) {
      state.hotList = value;
    },
    // 设置评论概况
    setSituationList(state, value) {
      state.situationList = value;
    },
    //设置 审核情况
    setShenHeObj(state, value) {
      state.shenHeObj = value;
    },
    // 设置 可视化
    setvisualizationObj(state, value) {
      state.visualizationObj = value;
    }
  },
  actions: {
    tabsHandleClick1({
      dispatch,
      state,
      commit
    }, name) {
      commit('setFloorDataList', []);
      commit('setPraiseDataList', []);
      state.tabsIndex = name;
      name = parseInt(name)
      console.log(name);
    },
    // 可视化
    visualization({
      commit,
      rootState
    }, {
      startTime,
      endTime
    }) {
      let obj = {
        columnKey: rootState.comment.currectCateKey,
        orgKey: rootState.comment.currectJigouId,
        platformKey: rootState.comment.currectPlatFormId,
        startTime,
        endTime
      }
      return new Promise((resolve, reject) => {
        visualization(obj).then(res => {
          console.log(res, "可视化");
          commit('setvisualizationObj', res.data.dataMap)
        })
      })
    },

    // 获取点赞列表
    praiseAndFloorList({
      commit,
      rootState
    }, {
      startTime,
      endTime,
      pageSize,
      offset
    }) {
      let obj = {
        columnKey: rootState.comment.currectCateKey,
        orgKey: rootState.comment.currectJigouId,
        platformKey: rootState.comment.currectPlatFormId,
        startTime,
        endTime,
        pageSize,
        offset
      }
      return new Promise((resolve, reject) => {
        praiseAndFloorList(obj).then(res => {
          console.log(res, "点赞列表");
          if (res.data.dataMap) {
            commit('setNewTotal', res.data.totalCount)
            commit('setPraiseDataList', res.data.dataMap.praiseDataList)
          }
        })
      })
    },

    // 获取盖楼列表
    praiseAndFloorList1({
      commit,
      rootState
    }, {
      startTime,
      endTime,
      pageSize,
      offset
    }) {
      let obj = {
        columnKey: rootState.comment.currectCateKey,
        orgKey: rootState.comment.currectJigouId,
        platformKey: rootState.comment.currectPlatFormId,
        startTime,
        endTime,
        pageSize,
        offset
      }
      return new Promise((resolve, reject) => {
        praiseAndFloorList1(obj).then(res => {
          console.log(res, "盖楼列表");
          commit('setNewTotal1', res.data.totalCount)
          commit('setFloorDataList', res.data.dataMap.floorDataList)
        })
      })
    },

    // 获取热门文章列表
    popularArticles({
      commit,
      rootState
    }, {
      startTime,
      endTime,
      pageSize,
      offset
    }) {
      let obj = {
        columnKey: rootState.comment.currectCateKey,
        orgKey: rootState.comment.currectJigouId,
        platformKey: rootState.comment.currectPlatFormId,
        startTime,
        endTime,
        pageSize,
        offset
      }
      return new Promise((resolve, reject) => {
        popularArticles(obj).then(res => {
          console.log(res, "热门文章列表");
          commit('setHotList', res.data.data);
          commit('setNewTotal', res.data.totalCount)
        })
      })

    },

    // 评论概况
    commentSituation({
      state,
      commit,
      rootState
    }, {
      startTime,
      endTime
    }) {
      let obj = {
        // columnKey: rootState.comment.currectCateKey,
        orgKey: rootState.comment.currectJigouId,
        platformKey: rootState.comment.currectPlatFormId,
        startTime,
        endTime
      }
      return new Promise((resolve, reject) => {
        commentSituation(obj).then(res => {
          console.log(res, "评论概况");
          commit('setSituationList', res.data.data)
        })
      })
    },

    // 评论审核
    auditStatus({
      commit,
      rootState
    }, {
      startTime,
      endTime
    }) {
      let obj = {
        // columnKey: rootState.comment.currectCateKey,
        orgKey: rootState.comment.currectJigouId,
        platformKey: rootState.comment.currectPlatFormId,
        startTime,
        endTime
      }
      return new Promise((resolve, reject) => {
        auditStatus(obj).then(res => {
          console.log(res, "评论审核");
          commit('setShenHeObj', res.data.data)
        })
      })
    }

  }
}
