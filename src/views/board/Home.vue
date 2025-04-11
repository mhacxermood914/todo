<template>
  <div class="mt-[4rem]">
    <Modal ref="modal">
      <template #modal-content>
        <div class="font-poppins">
          <form @submit.prevent="edit ? handleEdit() : addBoard()">
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
              <div v-if="!loading">
                {{ edit ? 'Mettre a jour le nom du board' : 'Ajouter un nouveau board' }}
              </div>
              <div
                v-else
                class="w-6 h-6 border-3 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto"
              ></div>
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
      <div
        v-if="loadingBoards"
        class="w-6 h-6 border-3 border-gray-200 border-t-blue-500 rounded-full animate-spin mx-auto"
      ></div>
      <div class="text-2xl" v-else-if="!boardStore.boards.length">No Board available</div>
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
                  @click.stop="editBoard($event, i, item)"
                />
              </div>
              <div class="group-hover hidden">
                <font-awesome-icon
                  icon="trash-alt"
                  class="cursor-pointer"
                  @click.stop="moveBoardToTrash($event, i, item.id)"
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
import { ref, onMounted } from 'vue'
import useAuthUser from '@/composables/useAuth'
import useBoard from '@/composables/useBoard'
import router from '@/router'
import { useBoardStore } from '@/stores/board'
import { toast } from 'vue3-toastify'
import 'vue3-toastify/dist/index.css'

const boardStore = useBoardStore()
const {
  addBoard: addToBoard,
  readBoard,
  addBoardList,
  readBoardList,
  updateBoard,
  updateBoardCard,
  deleteBoard,
  readBoardCard,
} = useBoard()

onMounted(() => {
  getBoard()
})

const loading = ref(false)
const loadingBoards = ref(false)

const edit = ref(false)

async function getBoard() {
  loadingBoards.value = true
  const res = await readBoard()
  // console.log({ res })
  const boards = await Promise.all(
    res.data.map(async (el) => {
      const lists = await readBoardList(el.id)

      const mappedLists = await Promise.all(
        lists.data.map(async (listItem) => {
          const cards = await readBoardCard({ listid: listItem.id })
          return {
            id: listItem.id,
            boardId: el.id,
            name: listItem.name,
            cards: cards.data,
          }
        }),
      )

      return {
        ...el,
        list: mappedLists,
      }
    }),
  )

  // console.log({ res, boards })
  boardStore.setBoards(boards)

  loadingBoards.value = false
}

const { logout } = useAuthUser()

const modal = ref(null)

const board = ref({
  name: '',
  id: null,
})

async function editBoard(event, index, item) {
  event.preventDefault()
  board.value.name = item.name
  board.value.id = item.id
  edit.value = true
  showModal()
}

async function handleEdit() {
  await updateBoard({ id: board.value.id, name: board.value.name })
  toast('Mise a jour éffectuée avec succès.', {
    autoClose: 1000,
    type: 'success',
  })
  getBoard()
  board.value.name = ''
  board.value.id = null
  closeModal()
}

function showModal() {
  modal.value.openModal()
}

function closeModal() {
  edit.value = false

  modal.value.closeModal()
}

async function addBoard() {
  loading.value = true
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

  let res = await addToBoard({ name: payload.name })
  // console.log({ res })

  addBoardList({ boardid: res.data.pop().id, name: 'Untitled' })

  getBoard()

  boardStore.addBoard(payload)
  board.value.name = ''
  loading.value = false
  closeModal()
}

function moveBoardToTrash(event, index, id = null) {
  event.preventDefault()
  event.stopPropagation()
  deleteBoard(id)
  boardStore.deleteBoardByid(index)
}

async function loggedOut() {
  await logout()
  router.push({ name: 'login' })
}
</script>
