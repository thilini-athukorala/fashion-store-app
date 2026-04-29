<template>
  <div class="bg-pink-50 dark:bg-gray-800 rounded-2xl p-6 shadow-sm border border-pink-100 dark:border-gray-700">
    <div class="flex flex-col sm:flex-row gap-4 items-center justify-between">
      
      <!-- Search -->
      <div class="relative w-full sm:w-96">
        <svg class="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"/>
        </svg>
        <input
          v-model="searchQuery"
          @input="handleSearch"
          type="text"
          placeholder="Search fashion items..."
          class="w-full bg-white dark:bg-gray-700 dark:text-white border border-pink-200 dark:border-gray-600 rounded-full px-4 py-3 pl-12 focus:outline-none focus:ring-2 focus:ring-pink-400 focus:border-transparent transition"
        />
      </div>

      <!-- Category -->
      <select
        v-model="selectedCategory"
        @change="handleFilter"
        class="w-full sm:w-56 bg-white dark:bg-gray-700 dark:text-white border border-pink-200 dark:border-gray-600 rounded-full px-5 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400 transition appearance-none cursor-pointer"
      >
        <option value="all">All Categories</option>
        <option
          v-for="cat in categories"
          :key="cat.slug"
          :value="cat.slug"
        >
          {{ cat.name }}
        </option>
      </select>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import type { Category } from '../types'

defineProps<{ categories: Category[] }>()

const emit = defineEmits<{
  search: [query: string]
  filter: [category: string]
}>()

const searchQuery = ref('')
const selectedCategory = ref('all')

let searchTimer: ReturnType<typeof setTimeout>

function handleSearch() {
  clearTimeout(searchTimer)
  searchTimer = setTimeout(() => {
    emit('search', searchQuery.value)
  }, 500)
}

function handleFilter() {
  emit('filter', selectedCategory.value)
}
</script>