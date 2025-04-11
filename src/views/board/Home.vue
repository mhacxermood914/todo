<template>
  <div class="mt-[4rem]">
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
          v-for="item in boardStore.boards"
          :key="item.id"
          class="bg-white flex items-center justify-center w-full board-card hover:text-white rounded-md h-[8rem] shadow-md cursor-pointer"
        >
          {{ item.name }}
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import useAuthUser from '@/composables/useAuth'
import router from '@/router'
import { useBoardStore } from '@/stores/board'

const boardStore = useBoardStore()

const { logout } = useAuthUser()

const modal = ref(null)

// const boards = ref([
//   {
//     id: 1,
//     name: 'Board 1',
//     list: [],
//   },
// ])

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
    id: boardStore.boards.length + 1,
    ...board.value,
  }

  boardStore.addBoard(payload)
  // boards.value.push(payload)
  board.value.name = ''
  closeModal()
}

async function loggedOut() {
  await logout()
  router.push({ name: 'login' })
}
</script>
