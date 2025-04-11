import { defineStore } from 'pinia'

export const useBoardStore = defineStore('board-store', {
  state(): any {
    return {
      boards: [],
    }
  },
  getters: {
    getListByBoardId: (state) => {
      return (id: number) => state.boards.find((el: any) => el.id === id)
    },
    getBoard(state){
        return state.boards
    }
  },
  actions: {
    addBoard(board: any) {
      this.boards.push(board)
    },
    setBoards(boards:any){
        this.boards = boards
    },
    addListToBoardByid(index: number, list: any) {
      this.boards[index].list.push(list)
    },
    deleteBoardByid(index: number) {
      if (this.boards[index]) {
        this.boards.splice(index, 1)
      }
    },
    deleteListFromBoardByid(index: number, listIndex: number) {
      if (this.boards[index] && this.boards[index].list[listIndex]) {
        this.boards[index].list.splice(listIndex, 1)
      }
    },
    updateListName(index: number, listIndex: number, newName: string) {
      if (this.boards[index] && this.boards[index].list[listIndex]) {
        this.boards[index].list[listIndex].name = newName
      }
    },
    addCardToList(boardIndex: number, listIndex: number, content: string, card: any = null) {
      const newCard = card || {
        id: this.boards[boardIndex].list[listIndex].cards.length + 1,
        content: content || '',
      }

      this.boards[boardIndex].list[listIndex].cards.unshift(newCard)
    },

    deleteCardFromList(boardIndex: number, listIndex: number, cardIndex: number) {
      if (this.boards[boardIndex] && this.boards[boardIndex].list[listIndex]) {
        this.boards[boardIndex].list[listIndex].cards.splice(cardIndex, 1)
      }
    },

    updateCardInList(boardIndex: number, listIndex: number, cardIndex: number, updatedCard: any) {
      const card = this.boards[boardIndex]?.list[listIndex]?.cards[cardIndex]
      if (card) {
        card.content = updatedCard.content || card.content
      }
    },
  },
})
