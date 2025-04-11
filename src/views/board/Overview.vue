<template>
  <div class="w-11/12 mx-auto mt-[2rem] font-poppins overflow-x-auto">
    <div class="font-semibold mb-3">Board 1</div>
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
                @click="addCard(i)"
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
              class="w-full group bg-gray-200 my-4 p-2 rounded-md min-h-[8rem] cursor-pointer max-h-[14rem]"
            >
              <div class="flex justify-end h-8">
                <div class="flex space-x-4">
                  <div class="group-hover:block">
                    <font-awesome-icon
                      icon="pencil-alt"
                      class="cursor-pointer"
                      @click="focusTextarea(i, j)"
                    />
                  </div>
                  <div class="group-hover:block">
                    <font-awesome-icon
                      icon="trash-alt"
                      class="cursor-pointer"
                      @click="moveCardToTrash(i, j)"
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
import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'
import {useBoardStore} from "@/stores/board"

const listInputClassName = ref('outline-none font-semibold w-11/12')

const boardStore = useBoardStore()

const list = ref([
  {
    id: 1,
    boardId: 1,
    name: 'untitled',
    cards: [],
  },
])

const textareas = ref([])

function setTextareaRef(el, index, j) {
  if (el) {
    textareas.value[`${index + '' + j}`] = el
  }
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
    const card = list.value[fromListIndex].cards.splice(cardIndex, 1)[0]
    // Add to target
    list.value[targetListIndex].cards.unshift(card)

    // Reset temp values
    draggedCard.value = null
    draggedFrom.value = { listIndex: null, cardIndex: null }
  }
}

function addNewList() {
  list.value.push({
    id: list.value.length + 1,
    boardId: 1,
    name: 'untitled',
    cards: [],
  })
}

function addCard(index) {
  list.value[index].cards.unshift({ id: list.value[index].cards.length + 1, content: '' })
  console.log({ list })
}

function onAdd(event) {
  console.log('add', event)
}

function moveCardToTrash(i, j) {
  list.value[i].cards = list.value[i].cards.filter((el, ind) => ind !== j)
  console.log({ list })
}

function moveListToTrash(i) {
  if(i){
    list.value = list.value.filter((el, ind) => ind !== i)
    console.log({ list })
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
