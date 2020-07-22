import {
  getPlatform,
  platformAdd,
  getJigouList,
  getJigourefresh,
  getCateList,
  getChangeStatus
} from '@/api/platform'
import {
  objAddAtt
} from "@/libs/tools";

const quid = (array) => {
  for (let index = 0; index < array.length; index++) {
    const element = array[index];
    delete element.id
  }
  return array
}

export default {
  state: {
    platFormList: [],
    jiGouList: [],
    userNamePlatFormList: [], // 用户平台列表
  },
  getters: {
    // 平台列表
    getPlatFormList(state, getters, rootState) {
      return state.platFormList;
    },
    // 机构列表
    getJiGouList: state => state.jiGouList,
    // 栏目列表
    getCateList: state => state.cateList
  },
  mutations: {
    // 设置平台列表
    setPlatFormList(state, value) {
      state.platFormList = value;
    },
    // 设置机构列表
    setJiGouList(state, value) {
      state.jiGouList = value;
    },
    // 设置用户列表
    setUserNamePlatFormList(state, value) {
      state.userNamePlatFormList = value;
    }
  },
  actions: {
    // 标签页点击事件  根据平台id获取机构列表
    tabsClick({
      state,
      commit
    }, platFormId) {
      return new Promise((resolve, reject) => {
        getJigouList(platFormId).then(res => {
          let newData = objAddAtt(res.data.data)
          // console.log(res.data, "机构列表");
          commit("setJiGouList", newData)
          resolve(newData)
        })
      })
    },
    // 机构刷新
    jiGouRefresh({
      state,
      commit
    }, platFormId) {
      return new Promise((resolve, reject) => {
        getJigourefresh(platFormId).then(res => {
          let newData = objAddAtt(res.data.data)
          // console.log(newData, "刷新成功");
          commit("setJiGouList", newData)
        })
      })
    },
    // // 栏目刷新
    // cateRefresh({
    //   state,
    //   commit
    // }, row) {
    //   console.log(row);
    // },
    // 获取平台接口调用
    getPlatforms({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {
        getPlatform().then(res => {
            console.log(res, "获取平台接口");
            let newData = objAddAtt(res.data.data);
            commit('setPlatFormList', newData)
            resolve(newData)
          })
          .catch(err => {
            reject();
          });
      })
    },
    // 开关改变事件
    getSwitchChange({
      state,
      commit
    }, row) {
      console.log(row);
      return new Promise((resolve, reject) => {
        getChangeStatus(row).then(res => {
          console.log(res);
        })
      })
    },
    // 机构删除
    getJiGouDelete({
      state,
      commit
    }, row) {
      console.log(row);
      return new Promise((resolve, reject) => {

      })
    },
    // 平台添加
    getPlatformAdd({
      state,
      commit,
      dispatch
    }, platformObj) {
      return new Promise((resolve, reject) => {
        platformAdd(platformObj).then(res => {
          dispatch('getPlatforms')
          console.log(res);
          resolve()
        })
      })
    },
    // 展开树形菜单获取栏目列表
    // item 父节点的数据
    getCatesList({
      state,
      commit
    }, {
      item,
      callback
    }) {
      console.log(item, callback);
      return new Promise((resolve, reject) => {
        getCateList(item).then(res => {
          console.log(res, "平台机构列表");
          // 去掉ID
          let newData = quid(res.data.data)
          callback(newData);
        })
      });
    }
  }
}
