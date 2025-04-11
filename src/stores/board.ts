import { defineStore } from 'pinia'

export const useBoardStore = defineStore('board-store', {
  state(): any {
    return {
      board: [
        {
          id: 1,
          name: 'Board 1',
          list: [],
        },
      ],
    }
  },
  getters: {
    getListByBoardId: (state) => {
      return (id: number) => state.board.find((el: any) => el.id === id)
    },
  },
  actions: {
    addListToBoardByid(index: number, list: any) {
      this.board[index].list.push(list)
    },
    deleteListFromBoardByid(index: number, listIndex: number) {
      if (this.board[index] && this.board[index].list[listIndex]) {
        this.board[index].list.splice(listIndex, 1)
      }
    },
    updateListName(index: number, listIndex: number, newName: string) {
      if (this.board[index] && this.board[index].list[listIndex]) {
        this.board[index].list[listIndex].name = newName
      }
    },
    addCardToList(boardIndex: number, listIndex: number, content: string) {
      const newCard = {
        id: this.board[boardIndex].list[listIndex].cards.length + 1,
        content: content || '',
      }

      this.board[boardIndex].list[listIndex].cards.unshift(newCard)
    },

    deleteCardFromList(boardIndex: number, listIndex: number, cardIndex: number) {
      if (this.board[boardIndex] && this.board[boardIndex].list[listIndex]) {
        this.board[boardIndex].list[listIndex].cards.splice(cardIndex, 1)
      }
    },

    updateCardInList(boardIndex: number, listIndex: number, cardIndex: number, updatedCard: any) {
      const card = this.board[boardIndex]?.list[listIndex]?.cards[cardIndex]
      if (card) {
        card.content = updatedCard.content || card.content
      }
    },
  },
})
