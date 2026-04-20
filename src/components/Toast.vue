<template>
  <div
    v-if="visible"
    class="fixed bottom-6 right-6 bg-pink-500 text-white px-6 py-3 rounded-xl shadow-lg z-50 flex items-center gap-2 animate-bounce"
  >
    🛒 Added to Cart!
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

const props = defineProps<{ show: boolean }>()
const visible = ref(false)

watch(() => props.show, (val) => {
  if (val) {
    visible.value = true
    setTimeout(() => { visible.value = false }, 2000)
  }
})
</script>