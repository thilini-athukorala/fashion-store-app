<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <NavBar />

    <!-- Hero Section -->
    <div class="relative overflow-hidden bg-pink-50 dark:bg-gray-800">
      <div class="max-w-7xl mx-auto">
        <div class="flex flex-col md:flex-row items-center">

          <!-- Left Text -->
          <div class="flex-1 text-left py-16 px-8 z-10">
  <p class="text-pink-500 font-semibold text-lg mb-2 tracking-widest uppercase">New Arrivals 2026</p>
  <h1 class="text-5xl md:text-6xl font-extrabold text-gray-900 dark:text-white leading-tight mb-3">
    Discover Your <br/>
    <span class="text-pink-500">Style</span>
  </h1>
  <p class="text-lg text-gray-500 dark:text-gray-300 mb-8">
    Explore the latest trends in fashion.<br/> Free shipping on orders over $50.
  </p>
  <div class="flex gap-4">
    <button
      @click="scrollToProducts"
      class="bg-pink-500 hover:bg-pink-600 text-white font-bold px-8 py-3 rounded-full transition shadow-md"
    >
      Shop Now
    </button>
    
  </div>
</div>

          <!-- Right Image -->
          <div class="flex-1 flex justify-end">
            <img
              src="/fashion.jpg.jpg"
              alt="Fashion Model"
             class="w-full max-w-4xl object-cover h-[500px] md:h-[600px]"
            />
          </div>

        </div>
      </div>
    </div>

    <!-- Products Section -->
    <main id="products" class="max-w-7xl mx-auto px-4 py-8">
      <h2 class="text-2xl font-bold text-gray-800 dark:text-white mb-6">
        Our Products
      </h2>
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
     <Footer />
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
import Footer from '../components/Footer.vue'

const products = ref<Product[]>([])
const categories = ref<Category[]>([])
const loading = ref(true)

function scrollToProducts() {
  document.getElementById('products')?.scrollIntoView({ behavior: 'smooth' })
}

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