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
    <div class="flex items-center justify-center">
      <div class="text-2xl" v-if="!boardStore.boards.length">No Board available</div>
      <div v-else class="w-11/12 mx-auto grid grid-cols-4 gap-8">
        <router-link
          tag="div"
          :to="{ path: '/board/' + item.id }"
          v-for="(item, i) in boardStore.boards"
          :key="item.id"
          class="bg-white relative flex group items-center justify-center w-full board-card hover:text-white rounded-md h-[8rem] shadow-md cursor-pointer"
        >
          <div class="flex justify-end h-8 absolute top-4 right-4">
            <div class="flex space-x-4">
              <div class="group-hover hidden">
                <font-awesome-icon
                  icon="pencil-alt"
                  class="cursor-pointer"
                  @click="focusTextarea(i, j)"
                />
              </div>
              <div class="group-hover hidden">
                <font-awesome-icon
                  icon="trash-alt"
                  class="cursor-pointer"
                  @click.stop="moveBoardToTrash($event, i)"
                />
              </div>
            </div>
          </div>
          <div>{{ item.name }}</div>
        </router-link>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref } from 'vue'
import useAuthUser from '@/composables/useAuth'
import useBoard from '@/composables/useBoard'
import router from '@/router'
import { useBoardStore } from '@/stores/board'

const boardStore = useBoardStore()
const { add } = useBoard()

const { logout } = useAuthUser()

const modal = ref(null)

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
    list: [
      {
        id: 1,
        boardId: 1,
        name: 'untitled',
        cards: [],
      },
    ],
  }

  add({ name: payload.name })

  boardStore.addBoard(payload)
  board.value.name = ''
  closeModal()
}

function moveBoardToTrash(event, index) {
  event.preventDefault()
  event.stopPropagation()
  boardStore.deleteBoardByid(index)
}

async function loggedOut() {
  await logout()
  router.push({ name: 'login' })
}
</script>
