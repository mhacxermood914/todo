import { ref } from 'vue'
import useSupabase from './useSupabase'
import { useAuthStore } from '@/stores/auth'

const user: any = ref(null)
const { supabase } = useSupabase()

type authInfo = {
  email: string
  password: string
  [key: string]: unknown
}

export default function useAuthUser() {
  const authStore = useAuthStore()
  const login = async ({ email, password }: authInfo) => {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password })
    return { data, error }
  }

  const logout = async () => {}

  const register = async ({ email, password, ...meta }: authInfo) => {
    let { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    console.log({ error })

    return { data, error }
  }

  const update = async (data: any) => {}

  const setUser = async (data: any) => {
    authStore.login({ isLoggedIn: true, user: data })
  }
  const isLoggedIn = () => {
    return authStore.isAuth
  }

  const sendPasswordRestEmail = async (email: string) => {}

  return {
    user,
    login,
    isLoggedIn,
    logout,
    register,
    setUser,
    update,
    sendPasswordRestEmail,
  }
}
