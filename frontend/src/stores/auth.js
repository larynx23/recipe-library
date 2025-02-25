import { defineStore } from 'pinia'
import { http } from '../utils/http.mjs'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null,
    token: localStorage.getItem('token') || null,
  }),
  
  getters: {
    isAuthenticated: (state) => !!state.token,
  },
  
  actions: {
    async login(credentials) {
      try {
        const response = await http.post('/login', credentials)
        this.token = response.data.token
        localStorage.setItem('token', this.token)
        http.defaults.headers.common['Authorization'] = `Bearer ${this.token}`
        return response
      } catch (error) {
        throw error.response?.data?.message || 'Login failed'
      }
    },

    async register(userData) {
      try {
        const response = await http.post('/register', userData)
        return response
      } catch (error) {
        throw error.response?.data?.message || 'Registration failed'
      }
    },

    async logout() {
      try {
        await http.post('/logout')
      } finally {
        this.token = null
        localStorage.removeItem('token')
        delete http.defaults.headers.common['Authorization']
      }
    }
  }
})