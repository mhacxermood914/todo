<template>
  <div class="font-poppins flex items-center justify-center h-screen bg-[#eeee]">
    <div class="w-1/3 bg-white rounded-md shadow-sm p-4">
      <div class="flex justify-between">
        <div class="uppercase font-semibold">S'authentifier</div>
        <router-link :to="{ name: 'register' }" class="text-sm underline text-blue-900"
          >S'inscrire</router-link
        >
      </div>

      <form class="space-y-3 my-4" @submit.prevent="handleSubmit">
        <div class="flex flex-col space-y-2">
          <label for="">Email</label>
          <input type="text" v-model="data.email" class="bg-[#eeee] outline-none h-[2rem] px-1" />
        </div>
        <div class="flex flex-col space-y-2">
          <label for="">Password</label>
          <input
            type="text"
            v-model="data.password"
            class="bg-[#eeee] outline-none h-[2rem] px-1"
          />
        </div>
        <div class="">
          <button
            class="bg-blue-900 p-2 cursor-pointer text-white rounded-md mt-3 w-full hover:bg-white hover:text-black in-hover:border-blue-900 hover:border hover:cursor-pointer"
          >
            <div v-if="!loading">Se connecter</div>
            <div
              v-else
              class="w-6 h-6 border-3 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto"
            ></div>
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import router from '../../router'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'
import useAuthUser from '@/composables/useAuth'

const data = ref({
  email: '',
  password: '',
})

const loading = ref(false)

const { login } = useAuthUser()

async function handleSubmit() {
  loading.value = true

  let res = await login(data.value)

  loading.value = false

  if (!res.error) {
    toast('Connexion réussi.!!!', {
      autoClose: 1000,
      type: 'success',
    })
    router.push({ name: 'board' })
  } else {
    toast(res.error.message, {
      autoClose: 1000,
      type: 'error',
    })
  }
}
</script>
