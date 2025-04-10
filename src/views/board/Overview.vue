<template>
  <div class="w-11/12 mx-auto mt-[2rem] font-poppins overflow-x-auto">
    <div class="font-semibold mb-3">Board 1</div>
    <div class="flex h-[calc(100vh-10rem)] space-x-3">
      <VueDraggable
        @add="onAdd"
        :group="{ name: 'cards', pull: true, put: true }"
        class="w-full flex"
        v-model="list"
      >
        <div
          v-for="(item, i) in list"
          :key="item.id"
          class="bg-white h-full w-[20%] overflow-y-scroll rounded-md p-2 flex-shrink-0"
        >
          <div class="flex justify-between">
            <input
              type="text"
              :key="'input-' + item.id"
              v-model="item.name"
              @focus="onFocus"
              @blur="onBlur"
              :class="listInputClassName"
            />
            <div class="flex items-center">
              <button
                class="text-xl font-medium cursor-pointer hover:bg-gray-200 w-8 rounded-md"
                @click="addCard(i)"
              >
                +
              </button>
              <button class="text-2xl font-medium cursor-pointer hover:bg-gray-200 w-8 rounded-md">
                <sup>...</sup>
              </button>
            </div>
          </div>

          <hr />
          <VueDraggable
            :group="{ name: 'cards', pull: true, put: true }"
            itemKey="id"
            :animation="200"
            @change="onCardChange"
          >
            <div
              v-for="(card, j) in item.cards"
              :key="card.id"
              class="w-full group bg-gray-200 my-4 p-2 rounded-md min-h-[8rem] cursor-pointer max-h-[14rem]"
            >
              <div class="flex justify-end h-8">
                <div class="flex space-x-4">
                  <div class="hidden group-hover:block">
                    <font-awesome-icon icon="pencil-alt" class="cursor-pointer" />
                  </div>
                  <div class="hidden group-hover:block">
                    <font-awesome-icon
                      icon="trash-alt"
                      class="cursor-pointer"
                      @click="moveToTrash(i, j)"
                    />
                  </div>
                </div>
              </div>

              <textarea
                class="w-full resize-none bg-gray-100 outline-none p-2"
                id=""
                rows="4"
                @blur="handleBlur"
                v-model="card.content"
              ></textarea>
            </div>
          </VueDraggable>
        </div>

        <div class="w-[8rem] flex-shrink-0">
          <button
            class="bg-gray-300 cursor-pointer bg-opacity-10 p-2 rounded-md w-full"
            @click="addNewList"
          >
            Nouvelle liste
          </button>
        </div>
      </VueDraggable>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { VueDraggable } from 'vue-draggable-plus'

const listInputClassName = ref('outline-none font-semibold w-[8ch]')

const list = ref([
  {
    id: 1,
    boardId: 1,
    name: 'untitled',
    cards: [],
  },
])

const el = ref(null)
const l = ref(null)

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

function moveToTrash(i, j) {
  list.value[i].cards = list.value[i].cards.filter((el, ind) => ind !== j)
  console.log({ list })
}

function onBlur() {
  console.log({ list })
  listInputClassName.value = 'outline-none font-semibold w-[8ch]'
}

function handleBlur() {
  console.log({ list })
}

function onCardChange(event) {
  console.log('Card moved:', event)
}

function onFocus() {
  listInputClassName.value = 'border border-gray-400 w-[8ch]'
}
</script>
