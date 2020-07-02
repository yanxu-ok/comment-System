import {
  login,
  getUserInfo,
  getUser
} from '@/api/user'
import {
  setToken,
  getToken
} from '@/libs/util'

export default {
  state: {
    userName: '',
    userId: '',
    avatarImgPath: '',
    token: getToken(),
    access: '',
    hasGetInfo: false,
    userPlatKey: '',
    userJiGouKey: '',
  },

  mutations: {
    setAvatar(state, avatarPath) {
      state.avatarImgPath = avatarPath
    },
    setUserPlatKey(state, id) {
      state.userPlatKey = id
    },
    setUserJiGouKey(state, id) {
      state.userJiGouKey = id
    },
    setUserName(state, name) {
      state.userName = name
    },
    setAccess(state, access) {
      state.access = access
    },
    setToken(state, token) {
      state.token = token
      setToken(token)
    },
    setHasGetInfo(state, status) {
      state.hasGetInfo = status
    },
    setUserId(state, status) {
      state.userId = status
    }
  },

  actions: {
    // 登录
    handleLogin({
      commit
    }, {
      userName,
      password
    }) {
      userName = userName.trim()
      return new Promise((resolve, reject) => {
        login({
          userName,
          password
        }).then(res => {
          const data = res.data
          commit('setToken', data.token)
          resolve()
        }).catch(err => {
          reject(err)
        })
      })
    },

    // 退出登录
    handleLogOut({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {
        // logout(state.token).then(() => {
        //   commit('setToken', '')
        //   commit('setAccess', [])
        //   resolve()
        // }).catch(err => {
        //   reject(err)
        // })
        // 如果你的退出登录无需请求接口，则可以直接使用下面三行代码而无需使用logout调用接口
        commit('setToken', '')
        commit('setAccess', [])
        resolve()
      })
    },

    // 获取用户相关信息
    getUserInfo({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {
        try {
          getUserInfo(state.token).then(res => {
            const data = res.data
            commit('setAvatar', data.avatar)
            commit('setUserName', data.name)
            commit('setUserId', data.user_id)
            commit('setAccess', data.access)
            commit('setHasGetInfo', true)
            resolve(data)
          }).catch(err => {
            reject(err)
          })
        } catch (error) {
          reject(error)
        }
      })
    },

    // 获取用户信息
    getUser({
      state,
      commit
    }) {
      return new Promise((resolve, reject) => {
        getUser().then(res => {
          commit('setUserName', res.data.data.nickname)
          commit('setUserId', res.data.data.id)
          commit('setAccess', [res.data.data.priv])
          // commit('setAccess', ['platform_super'])
          commit('setCurrectPlatFormId', res.data.data.platformKey)
          commit('setCurrectJigouId', res.data.data.orgKey)
          commit('setUserOrgName', res.data.data.orgName)
          resolve(res.data.data)
        }).catch(err => {
          reject(err)
        })
      })
    }
  }
}
