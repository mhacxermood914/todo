<template>
  <teleport to="body">
    <div v-if="isOpen" class="fixed inset-0 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 max-w-md w-full shadow-lg">
        <button
          class="float-right cursor-pointer text-xl text-gray-500 hover:text-gray-700"
          @click="closeModal"
        >
          &times;
        </button>

        <h3 class="text-lg font-semibold mb-4">
          <slot name="modal-title"></slot>
        </h3>
        <p class="mb-4">
          <slot name="modal-content"></slot>
        </p>
        <div class="flex justify-end">
          <slot name="modal-footer"></slot>
        </div>
      </div>
    </div>
  </teleport>
</template>

<script setup>
import { ref } from 'vue'

const isOpen = ref(false)

const openModal = () => {
  isOpen.value = true
}

const closeModal = () => {
  isOpen.value = false
}

defineExpose({ openModal, closeModal })
</script>

<style scoped></style>
