<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <NavBar />
    <main class="max-w-7xl mx-auto px-4 py-8">
      <FilterBar
        :categories="categories"
        @search="handleSearch"
        @filter="handleFilter"
      />
      <div v-if="loading" class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        <ProductSkeleton v-for="n in 8" :key="n" />
      </div>
      <div v-else class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
        <ProductCard
          v-for="product in products"
          :key="product.id"
          :product="product"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { api } from '../services/api'
import type { Product, Category } from '../types'
import NavBar from '../components/NavBar.vue'
import ProductCard from '../components/ProductCard.vue'
import FilterBar from '../components/FilterBar.vue'
import ProductSkeleton from '../components/ProductSkeleton.vue'

const products = ref<Product[]>([])
const categories = ref<Category[]>([])
const loading = ref(true)

async function loadProducts() {
  loading.value = true
  const data = await api.getProducts()
  products.value = data.products
  loading.value = false
}

async function handleSearch(query: string) {
  loading.value = true
  const data = await api.searchProducts(query)
  products.value = data.products
  loading.value = false
}

async function handleFilter(category: string) {
  loading.value = true
  if (category === 'all') {
    const data = await api.getProducts()
    products.value = data.products
  } else {
    const data = await api.getProductsByCategory(category)
    products.value = data.products
  }
  loading.value = false
}

onMounted(async () => {
  categories.value = await api.getCategories()
  await loadProducts()
})
</script>