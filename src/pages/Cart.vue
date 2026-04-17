<template>
  <div class="min-h-screen bg-gray-50 dark:bg-gray-900">
    <NavBar />
    <div class="max-w-4xl mx-auto px-4 py-8">
      <h1 class="text-3xl font-bold mb-8 dark:text-white">🛒 Your Cart</h1>

      <div v-if="cart.items.length === 0" class="text-center py-20">
        <p class="text-gray-400 text-xl">Your cart is empty!</p>
        <router-link
          to="/"
          class="mt-4 inline-block bg-pink-500 text-white px-6 py-3 rounded-xl hover:bg-pink-600 transition"
        >
          Continue Shopping
        </router-link>
      </div>

      <div v-else>
        <div class="flex flex-col gap-4">
          <div
            v-for="item in cart.items"
            :key="item.product.id"
            class="bg-white dark:bg-gray-800 rounded-2xl shadow p-4 flex items-center gap-4"
          >
            <img
              :src="item.product.thumbnail"
              :alt="item.product.title"
              class="w-24 h-24 rounded-xl object-cover"
            />
            <div class="flex-1">
              <h3 class="font-bold text-lg dark:text-white">{{ item.product.title }}</h3>
              <p class="text-pink-500 font-medium">${{ item.product.price }}</p>
              <p class="text-gray-400 text-sm">Qty: {{ item.quantity }}</p>
            </div>
            <div class="flex flex-col items-end gap-2">
              <p class="font-bold dark:text-white">
                ${{ (item.product.price * item.quantity).toFixed(2) }}
              </p>
              <button
                @click="cart.removeFromCart(item.product.id)"
                class="text-red-400 hover:text-red-600 text-sm"
              >
                Remove
              </button>
            </div>
          </div>
        </div>

        <div class="mt-8 bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
          <div class="flex justify-between items-center mb-4">
            <span class="text-xl font-bold dark:text-white">Total</span>
            <span class="text-2xl font-bold text-pink-500">
              ${{ cart.totalPrice.toFixed(2) }}
            </span>
          </div>
          <button
            @click="cart.clearCart()"
            class="w-full bg-pink-500 hover:bg-pink-600 text-white font-bold py-3 rounded-xl transition"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useCartStore } from '../stores/useCartStore'
import NavBar from '../components/NavBar.vue'

const cart = useCartStore()
</script>