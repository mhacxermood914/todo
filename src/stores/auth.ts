import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth-user', {
  state() {
    return {
      isLoggedIn: false,
      userInfos: null,
    }
  },
  getters: {
    isAuth(state) {
      return state.isLoggedIn
    },
    userInfo(state) {
      return state.userInfos
    },
  },
  actions: {
    login(data: any) {
      this.isLoggedIn = true
      this.userInfos = data.user
    },
    logout() {
      this.isLoggedIn = false
      this.userInfos = null
    },
  },
})
