import { ref } from 'vue'
import useSupabase from './useSupabase'

const user = ref(null)
const { supabase } = useSupabase()

type authInfo = {
  email: string
  password: string
  [key: string]: unknown
}

export default function useAuthUser() {
  const login = async ({ email, password }: authInfo) => {}

  const logout = async () => {}

  const isLoggedIn = () => {}

  const register = async ({ email, password, ...meta }: authInfo) => {
    let { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    console.log({ error })

    return { data, error }
  }

  const update = async (data: any) => {}

  const setUser = async ()=>{
    
  }

  const sendPasswordRestEmail = async (email: string) => {}

  return {
    user,
    login,
    isLoggedIn,
    logout,
    register,
    update,
    sendPasswordRestEmail,
  }
}
