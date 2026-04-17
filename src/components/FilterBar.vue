<template>
  <div class="flex flex-col sm:flex-row gap-4 items-center justify-between">
    <div class="relative w-full sm:w-96">
      <input
        v-model="searchQuery"
        @input="handleSearch"
        type="text"
        placeholder="Search fashion items..."
        class="w-full border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-3 pl-10 focus:outline-none focus:ring-2 focus:ring-pink-400"
      />
      <span class="absolute left-3 top-3.5 text-gray-400">🔍</span>
    </div>

    <select
      v-model="selectedCategory"
      @change="handleFilter"
      class="w-full sm:w-auto border border-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-pink-400"
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