import {
  getWaterList,
  getWaterContent,
  save_water,
  save_water_record
} from '@/api/irrigation'


export default {
  state: {},
  getters: {

  },
  mutations: {

  },
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
  }
}
