<template>
  <nav class="bg-white dark:bg-gray-800 shadow-sm sticky top-0 z-50">
    <div class="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
     <router-link to="/" class="flex items-center gap-0">
  <span class="text-3xl font-light tracking-[0.3em] uppercase text-gray-800 dark:text-white">FASHION</span>
  <span class="text-3xl font-black tracking-[0.3em] uppercase text-pink-500">STORE</span>
</router-link>

      <div class="flex items-center gap-4">
        <button
          @click="toggleDark"
          class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition text-xl"
        >
          {{ isDark ? '☀️' : '🌙' }}
        </button>

        <router-link to="/cart" class="relative p-2">
          <span class="text-2xl">🛒</span>
          <span
            v-if="cart.totalItems > 0"
            class="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center"
          >
            {{ cart.totalItems }}
          </span>
        </router-link>

        <div v-if="auth.isLoggedIn" class="flex items-center gap-2">
          <span class="text-sm font-medium dark:text-white hidden sm:block">
            {{ auth.user?.firstName }}
          </span>
          <button
            @click="auth.logout()"
            class="bg-gray-100 dark:bg-gray-700 dark:text-white px-4 py-2 rounded-xl text-sm hover:bg-gray-200 transition"
          >
            Logout
          </button>
        </div>

        <router-link
          v-else
          to="/login"
          class="bg-pink-500 hover:bg-pink-600 text-white px-4 py-2 rounded-xl text-sm font-medium transition"
        >
          Login
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useCartStore } from '../stores/useCartStore'
import { useAuthStore } from '../stores/useAuthStore'

const cart = useCartStore()
const auth = useAuthStore()
const isDark = ref(false)

function toggleDark() {
  isDark.value = !isDark.value
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
  localStorage.setItem('darkMode', String(isDark.value))
}

onMounted(() => {
  isDark.value = localStorage.getItem('darkMode') === 'true'
  if (isDark.value) {
    document.documentElement.classList.add('dark')
  } else {
    document.documentElement.classList.remove('dark')
  }
})
</script>