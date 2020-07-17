import {
  getWaterList,
  getWaterContent,
  save_water,
  save_water_record,
  deleteWaterTemplate,
  saveWaterTemplate,
  saveWaterContent,
  deleteWaterContent
} from '@/api/irrigation'

export default {
  state: {},
  getters: {},
  mutations: {},
  actions: {
    // 灌水模板列表
    getWaterList({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {
        getWaterList().then(res => {
          // console.log(res);
          resolve(res.data.data)
        })
      })
    },
    // 获取灌水内容
    getWaterContent({
      state,
      commit
    }, waterTemplateKey) {
      return new Promise((resolve, reject) => {
        getWaterContent(waterTemplateKey).then(res => {
          // console.log(res);
          resolve(res.data.data)
        })
      })
    },
    // 灌水
    save_water({
      state,
      commit,
      rootState
    }, obj) {
      obj.columnKey = rootState.comment.currectCateKey;
      obj.platformKey = rootState.comment.currectPlatFormId
      obj.orgKey = rootState.comment.currectJigouId
      return new Promise((resolve, reject) => {
        console.log(obj, "灌水的数据");
        save_water(obj).then(res => {
          resolve(res)
        })
      })
    },

    // 清除灌水评论
    save_water_record({
      state,
      commit
    }, obj) {
      return new Promise((resolve, reject) => {
        console.log(obj, "灌水的数据");
        // save_water_record(obj).then(res => {
        //   console.log(res);
        //   // resolve(res.data.data)
        // })
      })
    },

    // 删除灌水模板
    deleteWaterTemplate({
      state,
      commit
    }, obj) {
      return new Promise((resolve, reject) => {
        deleteWaterTemplate(obj).then(res => {
          resolve(res)
          console.log(res);
        })
      })
    },

    // 新增灌输模板
    saveWaterTemplate({
      state,
      commit
    }, obj) {
      return new Promise((resolve, reject) => {
        saveWaterTemplate(obj).then(res => {
          resolve(res)
          console.log(res);
        })
      })
    },

    // 新增灌水内容
    saveWaterContent({
      state,
      commit
    }, obj) {
      return new Promise((resolve, reject) => {
        saveWaterContent(obj).then(res => {
          resolve(res)
          console.log(res, "灌输内容");
        })
      })
    },

    // 删除灌水内容
    deleteWaterContent({
      state,
      commit
    }, obj) {
      return new Promise((resolve, reject) => {
        deleteWaterContent(obj).then(res => {
          resolve(res)
        })
      })
    },
  }
}
