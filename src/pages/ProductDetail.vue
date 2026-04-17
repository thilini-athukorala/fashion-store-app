<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <NavBar />
    <div class="max-w-7xl mx-auto px-4 py-8">
      <button
        @click="router.back()"
        class="mb-6 flex items-center gap-2 text-pink-500 hover:text-pink-600 font-medium"
      >
        ← Back
      </button>

      <div v-if="loading" class="flex justify-center py-20">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
      </div>

      <div v-else-if="product" class="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-8">
        <div class="grid grid-cols-1 md:grid-cols-2 gap-10">
          <div>
            <img
              :src="product.thumbnail"
              :alt="product.title"
              class="w-full rounded-xl object-cover h-96"
            />
            <div class="flex gap-2 mt-4 overflow-x-auto">
              <img
                v-for="img in product.images"
                :key="img"
                :src="img"
                class="h-20 w-20 rounded-lg object-cover cursor-pointer hover:opacity-80"
              />
            </div>
          </div>

          <div class="flex flex-col gap-4">
            <span class="text-pink-500 text-sm font-medium uppercase">{{ product.category }}</span>
            <h1 class="text-3xl font-bold dark:text-white">{{ product.title }}</h1>
            <p class="text-gray-500 dark:text-gray-400">{{ product.description }}</p>

            <div class="flex items-center gap-2">
              <span class="text-yellow-400">★</span>
              <span class="font-medium dark:text-white">{{ product.rating }}</span>
              <span class="text-gray-400">| Stock: {{ product.stock }}</span>
            </div>

            <div class="flex items-center gap-4">
              <span class="text-3xl font-bold text-pink-500">${{ product.price }}</span>
              <span class="text-green-500 text-sm font-medium">
                {{ product.discountPercentage }}% OFF
              </span>
            </div>

            <button
              @click="addToCart(product)"
              class="mt-4 bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 px-8 rounded-xl transition"
            >
              🛒 Add to Cart
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { api } from '../services/api'
import { useCartStore } from '../stores/useCartStore'
import type { Product } from '../types'
import NavBar from '../components/NavBar.vue'

const route = useRoute()
const router = useRouter()
const cart = useCartStore()
const product = ref<Product | null>(null)
const loading = ref(true)

function addToCart(p: Product) {
  cart.addToCart(p)
  alert('Added to cart! 🛒')
}

onMounted(async () => {
  const id = Number(route.params.id)
  product.value = await api.getProductById(id)
  loading.value = false
})
</script>