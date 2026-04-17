<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900 flex items-center justify-center">
    <div class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8 w-full max-w-md">
      <h1 class="text-3xl font-bold text-center mb-2 dark:text-white">👗 Fashion Store</h1>
      <p class="text-center text-gray-400 mb-8">Sign in to your account</p>

      <div v-if="error" class="bg-red-100 text-red-600 rounded-xl p-3 mb-4 text-sm">
        {{ error }}
      </div>

      <div class="flex flex-col gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Username
          </label>
          <input
            v-model="username"
            type="text"
            placeholder="Try: emilys"
            class="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <div>
          <label class="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">
            Password
          </label>
          <input
            v-model="password"
            type="password"
            placeholder="Try: emilyspass"
            class="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
        </div>

        <button
          @click="handleLogin"
          :disabled="loading"
          class="bg-pink-500 hover:bg-pink-600 disabled:opacity-50 text-white font-bold py-3 rounded-xl transition"
        >
          {{ loading ? 'Signing in...' : 'Sign In' }}
        </button>
      </div>

      <p class="text-center text-gray-400 text-sm mt-6">
        Use DummyJSON credentials to login
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/useAuthStore'

const router = useRouter()
const auth = useAuthStore()

const username = ref('')
const password = ref('')
const loading = ref(false)
const error = ref('')

async function handleLogin() {
  if (!username.value || !password.value) {
    error.value = 'Please enter username and password!'
    return
  }
  loading.value = true
  error.value = ''
  try {
    await auth.login(username.value, password.value)
    router.push('/')
  } catch (e) {
    error.value = 'Invalid credentials. Please try again!'
  } finally {
    loading.value = false
  }
}
</script>