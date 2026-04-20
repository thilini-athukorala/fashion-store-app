<template>
  <div
    class="bg-white dark:bg-gray-800 rounded-2xl shadow hover:shadow-lg transition-all duration-300 overflow-hidden group cursor-pointer"
    @click="router.push(`/product/${product.id}`)"
  >
    <div class="relative overflow-hidden">
      <img
        :src="product.thumbnail"
        :alt="product.title"
        class="w-full h-56 object-cover group-hover:scale-105 transition-transform duration-300"
      />
      <span class="absolute top-2 right-2 bg-pink-500 text-white text-xs px-2 py-1 rounded-full">
        -{{ product.discountPercentage }}%
      </span>
    </div>

    <div class="p-4 flex flex-col gap-2">
      <span class="text-xs text-pink-400 uppercase font-medium">{{ product.category }}</span>
      <h3 class="font-bold text-gray-800 dark:text-white line-clamp-1">{{ product.title }}</h3>
      <p class="text-gray-400 text-sm line-clamp-2">{{ product.description }}</p>

      <div class="flex items-center gap-1">
        <span class="text-yellow-400 text-sm">★</span>
        <span class="text-sm text-gray-500 dark:text-gray-400">{{ product.rating }}</span>
      </div>

      <div class="flex items-center justify-between mt-2">
        <span class="text-xl font-bold text-pink-500">${{ product.price }}</span>
        <button
          @click.stop="addToCart"
          class="bg-pink-500 hover:bg-pink-600 text-white text-sm px-4 py-2 rounded-xl transition"
        >
          Add to Cart
        </button>
      </div>
    </div>

    <Toast :show="showToast" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useCartStore } from '../stores/useCartStore'
import type { Product } from '../types'
import Toast from './Toast.vue'

const props = defineProps<{ product: Product }>()
const router = useRouter()
const cart = useCartStore()
const showToast = ref(false)

function addToCart() {
  cart.addToCart(props.product)
  showToast.value = true
  setTimeout(() => { showToast.value = false }, 2000)
}
</script>