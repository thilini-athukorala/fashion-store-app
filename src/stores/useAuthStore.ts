import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { User } from '../types'
import { api } from '../services/api'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(
    JSON.parse(localStorage.getItem('user') || 'null')
  )

  const isLoggedIn = computed(() => !!user.value)

  async function login(username: string, password: string) {
    const data = await api.login(username, password)
    user.value = data
    localStorage.setItem('user', JSON.stringify(data))
  }

  function logout() {
    user.value = null
    localStorage.removeItem('user')
  }

  return { user, isLoggedIn, login, logout }
})
