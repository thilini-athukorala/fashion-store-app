import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import type { CartItem, Product } from '../types'

export const useCartStore = defineStore('cart', () => {
  const items = ref<CartItem[]>(
    JSON.parse(localStorage.getItem('cart') || '[]')
  )

  const totalItems = computed(() =>
    items.value.reduce((sum, i) => sum + i.quantity, 0)
  )

  const totalPrice = computed(() =>
    items.value.reduce((sum, i) => sum + i.product.price * i.quantity, 0)
  )

  function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(items.value))
  }

  function addToCart(product: Product) {
    const existing = items.value.find(i => i.product.id === product.id)
    if (existing) {
      existing.quantity++
    } else {
      items.value.push({ product, quantity: 1 })
    }
    saveToStorage()
  }

  function removeFromCart(productId: number) {
    items.value = items.value.filter(i => i.product.id !== productId)
    saveToStorage()
  }

  function clearCart() {
    items.value = []
    saveToStorage()
  }

  return { items, totalItems, totalPrice, addToCart, removeFromCart, clearCart }
})