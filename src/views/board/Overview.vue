<template>
  <div class="w-11/12 mx-auto mt-[2rem] font-poppins overflow-x-auto">
    <div class="font-semibold mb-3">Board 1</div>
    <div class="flex h-[calc(100vh-10rem)] space-x-3">
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

        <div
          v-for="card in item.cards"
          :key="card.id"
          class="w-full bg-gray-200 my-4 rounded-md min-h-[8rem] max-h-[14rem]"
        >
          A
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
</template>

<script setup>
import { ref } from 'vue'

const listInputClassName = ref('outline-none font-semibold w-[8ch]')

const list = ref([
  {
    id: 1,
    boardId: 1,
    name: 'untitled',
    cards: [],
  },
])

function addNewList() {
  list.value.push({
    id: list.value.length + 1,
    boardId: 1,
    name: 'untitled',
    cards: [],
  })
}

function addCard(index) {
  list.value[index].cards.push({ id: list.value[index].cards.length + 1, content: '' })
  console.log({ list })
}

function onBlur() {
  console.log({ list })
  listInputClassName.value = 'outline-none font-semibold w-[8ch]'
}

function onFocus() {
  listInputClassName.value = 'border border-gray-400 w-[8ch]'
}
</script>
