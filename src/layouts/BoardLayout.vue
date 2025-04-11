<template>
  <div class="font-poppins bg-[#eee] h-screen">
    <!-- header -->
    <div class="bg-white h-[4rem] flex items-center px-3 justify-between shadow-sm">
      <div class="font-bold text-xl">Board</div>

      <div class="relative group">
        <div class="h-10 w-10 rounded-full bg-gray-400 cursor-pointer"></div>
        <ul
          class="absolute hidden group-hover bg-white shadow-md -mt-1 pt-[.5rem] rounded text-sm z-10 right-[.5rem]"
        >
          <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" @click="loggedOut">Deconnexion</li>
        </ul>
      </div>
    </div>
    <!-- end header -->

    

    <div class="">
      <router-view />
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import useAuthUser from '@/composables/useAuth'
import router from '@/router'

const { logout } = useAuthUser()

const modal = ref(null)

const boards = ref([])

const board = ref({
  name: '',
})

function showModal() {
  modal.value.openModal()
}

function closeModal() {
  modal.value.closeModal()
}

function addBoard() {
  let payload = {
    id: boards.value.length + 1,
    ...board.value,
  }
  boards.value.push(payload)
  board.value.name = ''
  closeModal()
}

async function loggedOut() {
  await logout()
  router.push({ name: 'login' })
}
</script>
