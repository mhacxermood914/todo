<template>
  <div class="w-11/12 mx-auto mt-[2rem] font-poppins overflow-x-auto">
    <div class="font-semibold mb-3 flex item-center space-x-3">
      <button class="flex space-x-3 items-center cursor-pointer" @click="goBack">
        <font-awesome-icon icon="arrow-alt-circle-left" class="cursor-pointer" />
        <div>{{ boardName }}</div>
      </button>
    </div>
    <div class="flex h-[calc(100vh-10rem)] space-x-3">
      <div class="w-[20%] flex space-x-3">
        <div
          @drop="onDrop(i)"
          @dragover.prevent
          v-for="(item, i) in list"
          :key="i"
          class="bg-white h-full w-full overflow-y-scroll rounded-md p-2 flex-shrink-0"
        >
          <div class="flex justify-between">
            <input
              type="text"
              v-model="item.name"
              @keyup.enter="$event.target.blur()"
              @focus="onFocus"
              @blur="onBlur"
              :class="[
                'max-w-11/12',
                'overflow-hidden',
                'whitespace-nowrap',
                'truncate',
                listInputClassName,
              ]"
            />
            <div class="flex items-center">
              <button
                class="text-2xl font-medium cursor-pointer hover:bg-gray-200 w-8 rounded-md"
                @click="addCard(i, item.id)"
              >
                +
              </button>
              <button class="font-medium cursor-pointer hover:bg-gray-200 w-8 rounded-md">
                <font-awesome-icon
                  icon="trash-alt"
                  class="cursor-pointer"
                  @click="moveListToTrash(i)"
                />
              </button>
            </div>
          </div>

          <hr />
          <div>
            <div
              v-for="(card, j) in item.cards"
              :key="card.id"
              draggable="true"
              @dragstart="onDragStart(card, i, j)"
              class="w-full group bg-gray-200 my-4 p-2 rounded-md min-h-[8rem] cursor-move max-h-[14rem]"
            >
              <div class="flex justify-end h-8">
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
                      @click="moveCardToTrash(i, j, card.id)"
                    />
                  </div>
                </div>
              </div>

              <textarea
                class="w-full resize-none bg-gray-100 outline-none p-2"
                id=""
                :ref="(el) => setTextareaRef(el, i, j)"
                rows="4"
                @blur="handleBlur"
                v-model="card.content"
              ></textarea>
            </div>
          </div>
        </div>

        <div class="w-[8rem] flex-shrink-0">
          <button
            class="bg-gray-300 cursor-pointer bg-opacity-10 p-2 rounded-md w-full"
            @click="addNewList"
          >
            Nouvelle liste
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import useBoard from '@/composables/useBoard'
import { useRoute, useRouter } from 'vue-router'
import { VueDraggable } from 'vue-draggable-plus'
import { useBoardStore } from '@/stores/board'
import { createDOMCompilerError } from '@vue/compiler-dom'

const listInputClassName = ref('outline-none font-semibold w-11/12')

const route = useRoute()
const router = useRouter()

const boardStore = useBoardStore()

const boardId = Number(route.params.id)

const { addBoardList, addBoardCard, deleteBoardCard } = useBoard()

const boardName = computed(() => {
  const board = boardStore.getListByBoardId(boardId)
  return board.name || 'Untitled Board'
})

const list = boardStore.getListByBoardId(boardId).list
console.log({ list: list.length })

const textareas = ref([])

function setTextareaRef(el, index, j) {
  if (el) {
    textareas.value[`${index + '' + j}`] = el
  }
}

function goBack() {
  router.back()
}

function focusTextarea(index, j) {
  if (textareas.value[`${index + '' + j}`]) {
    textareas.value[`${index + '' + j}`].focus()
  }
}

const el = ref(null)
const l = ref(null)

const draggedCard = ref(null)
const draggedFrom = ref({ listIndex: null, cardIndex: null })

function onDragStart(card, listIndex, cardIndex) {
  console.log({ card, listIndex, cardIndex })
  draggedCard.value = card
  draggedFrom.value = { listIndex, cardIndex }
}

function onDrop(targetListIndex) {
  const { listIndex: fromListIndex, cardIndex } = draggedFrom.value

  console.log({ targetListIndex })

  if (
    draggedCard.value &&
    fromListIndex !== null &&
    cardIndex !== null &&
    fromListIndex !== targetListIndex
  ) {
    // Remove from original
    const card = list[fromListIndex].cards.splice(cardIndex, 1)[0]
    // Add to target

    boardStore.addCardToList(
      boardStore.boards.findIndex((el) => el.id === boardId),
      targetListIndex,
      null,
      card,
    )

    // Reset temp values
    draggedCard.value = null
    draggedFrom.value = { listIndex: null, cardIndex: null }
  }
}

function addNewList() {
  boardStore.addListToBoardByid(
    boardStore.boards.findIndex((el) => el.id === boardId),
    {
      id: list.length + 1,
      boardId,
      name: 'untitled',
      cards: [],
    },
  )

  addBoardList({ boardid: boardId, name: 'Untitled' })
}

function addCard(index, id = null) {
  boardStore.addCardToList(
    boardStore.boards.findIndex((el) => el.id === boardId),
    index,
    null,
  )

  addBoardCard({ content: '', listid: id })

  console.log({ list })
}

function onAdd(event) {
  console.log('add', event)
}

function moveCardToTrash(i, j, id = null) {
  boardStore.deleteCardFromList(
    boardStore.boards.findIndex((el) => el.id === boardId),
    i,
    j,
  )

  deleteBoardCard(id)
}

function moveListToTrash(i) {
  if (i) {
    boardStore.deleteListFromBoardByid(
      boardStore.boards.findIndex((el) => el.id === boardId),
      i,
    )
  }
}

function onBlur() {
  console.log({ list })
  listInputClassName.value = 'outline-none font-semibold w-11/12'
}

function handleBlur() {
  console.log({ list })
}

function onCardChange(event) {
  console.log('Card moved:', event)
}

function onFocus() {
  listInputClassName.value = 'w-11/12'
}
</script>
