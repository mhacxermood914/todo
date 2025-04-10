<template>
  <div class="font-poppins bg-[#eee] h-screen">
    <!-- header -->
    <div class="bg-white h-[4rem] flex items-center px-3 justify-between shadow-sm">
      <div class="font-bold text-xl">Board</div>

      <div class="relative group">
        <div class="h-10 w-10 rounded-full bg-gray-400 cursor-pointer"></div>
        <ul
          class="absolute hidden group-hover:block bg-white shadow-md -mt-1 pt-[.5rem] rounded text-sm z-10 right-[.5rem]"
        >
          <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" @click="loggedOut">Deconnexion</li>
        </ul>
      </div>
    </div>
    <!-- end header -->

    <Modal ref="modal">
      <template #modal-content>
        <div>
          <form @submit.prevent="addBoard">
            <div>
              <label for="" class="mt-8 block">Nom du board</label>
              <input
                v-model="board.name"
                class="bg-[#eeee] outline-none h-[2rem] px-1 w-full my-4"
              />
            </div>
            <button
              class="bg-blue-900 p-2 text-white rounded-md mt-3 w-full hover:bg-white hover:text-black in-hover:border-blue-900 hover:border hover:cursor-pointer"
            >
              Ajouter un nouveau board
            </button>
          </form>
        </div>
      </template>
    </Modal>

    <div class="mt-[4rem]">
      <div class="flex space-x-4 w-11/12 mx-auto mb-4">
        <div class="font-semibold">My board</div>
        <button class="text-gray-400 cursor-pointer outline-none" @click="showModal">
          <i></i>
          Add a board
        </button>
      </div>
      <div class="flex items-center">
        <div class="w-11/12 mx-auto grid grid-cols-4 gap-8">
          <router-link
            tag="div"
            :to="{ path: '/board/' + item.id }"
            v-for="item in boards"
            :key="item.id"
            class="bg-white flex items-center justify-center w-full hover:bg-blue-900 hover:text-white rounded-md h-[8rem] shadow-md cursor-pointer"
          >
            {{ item.name }}
          </router-link>
        </div>
      </div>
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
