import { ref } from 'vue'
import useSupabase from './useSupabase'
import { useBoardStore } from '@/stores/board'

const user: any = ref(null)
const { supabase } = useSupabase()

export default function useBoard() {
  const authStore = useBoardStore()

  const addBoard = async ({ name }: { name: string }) => {
    const { data, error } = await supabase.from('board').insert([{ name }]).select()
    return { data, error }
  }

  const readBoard = async () => {
    let { data, error } = await supabase.from('board').select('id,name')
    return { data, error }
  }

  const updateBoard = async ({ name, id }: { name: string; id: number }) => {
    const { data, error } = await supabase.from('board').update({ name }).eq('id', id).select()
    return { data, error }
  }

  const deleteBoard = async (id: number) => {
    const { error } = await supabase.from('board').delete().eq('id', id)
    return { error }
  }

  const addBoardList = async ({ name, boardid }: { name: string; boardid: number }) => {
    const { data, error } = await supabase.from('board-view').insert([{ name, boardid }]).select()
    return { data, error }
  }

  const readBoardList = async (boardid: number) => {
    let { data, error } = await supabase.from('board-view').select('id,name').eq('boardid', boardid)
    return { data, error }
  }

  const updateBoardList = async ({ name, id }: { name: string; id: number }) => {
    const { data, error } = await supabase.from('board-view').update({ name }).eq('id', id).select()
    return { data, error }
  }

  const deleteBoardList = async (id: number) => {
    const { error } = await supabase.from('board-view').delete().eq('id', id)
    return { error }
  }

  const addBoardCard = async ({ content, listid }: { content: string; listid: number }) => {
    const { data, error } = await supabase
      .from('cards')
      .insert([{ content, boardviewid: listid }])
      .select()
    return { data, error }
  }

  const readBoardCard = async ({ listid }: { listid: number }) => {
    let { data, error } = await supabase
      .from('cards')
      .select('id,content')
      .eq('boardviewid', listid)
    return { data, error }
  }

  const moveBoardCardFromListToAnother = async ({ from, to }: any) => {
    console.log({ from, to })
    const { data, error } = await supabase
      .from('cards')
      .update({ boardviewid: to })
      .eq('id', from)
      .select()
    return { data, error }
  }

  const updateBoardCard = async ({ name, id }: { name: string; id: number }) => {
    const { data, error } = await supabase.from('board').update({ name }).eq('id', id).select()
    return { data, error }
  }

  const deleteBoardCard = async (id: number) => {
    const { error } = await supabase.from('cards').delete().eq('id', id)
    return { error }
  }

  return {
    addBoard,
    readBoard,
    updateBoard,
    deleteBoard,

    addBoardList,
    updateBoardList,
    readBoardList,
    deleteBoardList,

    moveBoardCardFromListToAnother,

    addBoardCard,
    updateBoardCard,
    readBoardCard,
    deleteBoardCard,
  }
}
