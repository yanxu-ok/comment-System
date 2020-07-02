import {
  getGlobalSetting,
  setGlobalSetting,
  getJigouSetting,
  setDetailSetting,
  getCatePageList,
  getArticleList
} from '@/api/management'
import {
  changeTrue,
  changeNumber
} from '@/libs/tools'
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

const Column = "column",
  Org = "org";

// 管理vuex
export default {
  state: {
    globalSetting: {}, //全局设置
    jigouSetting: [], //机构设置
    paramsColumnList: [], //栏目列表
    currectParams: {}, //当前传递的参数
    total: null,
    actList: [], // 当前文章列表
  },
  getters: {
    getSetting(state) {
      return state.globalSetting;
    },
    // 监听机构设置
    getJigouSetting(state) {
      return state.jigouSetting;
    },
    // 监听当前栏目列表
    getParamsColumnList(state) {
      return state.paramsColumnList;
    },
    // 监听当前的参数
    getCurrectParams(state) {
      return state.currectParams;
    },
    // 监听当前总数
    getTotal(state) {
      return state.total;
    },
    // 当前文章列表
    getActList(state) {
      return state.actList;
    }
  },
  mutations: {
    // 设置全局
    setGlobalSetting(state, value) {
      state.globalSetting = value;
    },
    // 设置机构设置
    setJigouSetting(state, value) {
      state.jigouSetting = value;
    },
    // 设置当前数组
    setParamsColumnList(state, value) {
      state.paramsColumnList = value;
    },
    // 设置当前的参数
    setCurrectParams(state, value) {
      state.currectParams = value;
    },
    // 设置当前总数
    setTotal(state, value) {
      state.total = value;
    },
    // 当前文章列表
    setActList(state, value) {
      state.actList = value;
    }
  },
  actions: {
    // 获取全局设置
    getGSetting({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {
        getGlobalSetting().then(res => {
          console.log(res.data.data, '获取全局设置');
          // 格式化数据
          let newObj = changeTrue(res.data.data)
          commit('setGlobalSetting', newObj);
        })
      })
    },
    // 设置全局设置
    setGlobalSetting({
      state,
      commit,
      dispatch
    }, newObj) {
      // console.log(newObj);
      for (const key in newObj) {
        if (newObj.hasOwnProperty(key)) {
          let number = changeNumber(newObj[key], key)
          return new Promise((resolve, reject) => {
            setGlobalSetting(key, number).then(res => {
              dispatch('getGSetting')
            })
          })
        }
      }
    },
    // 获取机构设置
    getGlobalSetting({
      state,
      commit,
      rootState
    }, platFormId) {
      return new Promise((resolve, reject) => {
        getJigouSetting(platFormId).then(res => {
          // 格式化数据 
          let newData = objAddAtt(res.data.data)
          // 遍历添加Id
          if (!newData) {
            return;
          }
          newData.forEach((element, index) => {
            element.id = index + 1;
          });
          console.log(newData, '获取机构设置');
          commit('setJigouSetting', newData);
        })
      })
    },
    // 修改配置
    setDetailSetting({
      state,
      commit,
      rootState
    }, {
      row,
      setting,
      type,
      obj
    }) {
      console.log(row, setting, type, obj);
      let submitObj;
      if (type == Org) {
        let {
          orgKey,
          platformKey,
          columnKey
        } = row;
        submitObj = {
          settingType: setting,
          settingValue: row[setting],
          type,
          settingKey: orgKey,
          platformKey
        }
      } else if (type == "programe") {
        let {
          articleKey
        } = row
        let {
          platformKey
        } = obj
        submitObj = {
          settingType: setting,
          settingValue: row[setting],
          type,
          settingKey: articleKey,
          platformKey
        }
      } else {
        let {
          platformKey,
          columnKey
        } = row;
        submitObj = {
          settingType: setting,
          settingValue: row[setting],
          type,
          settingKey: columnKey,
          platformKey
        }
      }
      return new Promise((resolve, reject) => {
        setDetailSetting(submitObj).then(res => {
          console.log(res);
        })
      })
    },

    // 获取栏目列表设置
    getCatePageList({}, {
      item,
      callback
    }) {
      console.log(item, callback);
      let {
        platformKey,
        orgKey,
        parentColumnKey,
        pageSize,
        offset
      } = item;
      return new Promise((resolve, reject) => {
        getCatePageList(item).then(res => {
          let newData = quid(res.data.data.rows)
          console.log(newData, "点击树形获取的内容");
          callback(newData)
        })
      })
    },

    // 获取政务下拉
    getZhengwuPageList({}, {
      item,
      callback
    }) {
      console.log(item, callback);
      let obj = {
        platformKey: item.platformKey,
        orgKey: item.orgKey,
        parentColumnKey: item.columnKey
      };
      return new Promise((resolve, reject) => {
        getCatePageList(obj).then(res => {
          let newData = quid(res.data.data.rows)
          console.log(newData, "点击政务树形获取的内容");
          callback(newData)
        })
      })
    },

    // 根据参数获得列表
    getCateParamsList({
      commit
    }, obj) {
      console.log(obj);
      return new Promise((resolve, reject) => {
        getCatePageList(obj).then(res => {
          console.log(res.data, "根据参数获得的栏目列表");
          commit('setTotal', res.data.data.total);
          if (res.data.data) {
            let newData = objAddAtt(res.data.data.rows)
            newData.forEach((element, index) => {
              element.id = index + 1;
            });
            commit('setParamsColumnList', newData)
          }
        })
      })
    },

    // 获取文章列表
    getArticleList({
      commit
    }, obj) {
      let {
        platformKey,
        columnKey,
        pageSize,
        offset
      } = obj;
      let item = {
        platformKey,
        columnKey,
        pageSize,
        offset
      }
      return new Promise((resolve, reject) => {
        getArticleList(item).then(res => {
          console.log(res.data.data, "根据参数获得的文章列表");
          if (res.data.data) {
            commit('setTotal', res.data.data.total);
            commit('setActList', res.data.data.rows)
          }
        })
      })
    }
  }
}
