import { createClient, SupabaseClient } from '@supabase/supabase-js'

const supabaseUrl: string = import.meta.env.VITE_SUPABASE_URL
const supabaseKey: string = import.meta.env.VITE_SUPABASE_KEY

const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey)

export default function useSupabase(): { supabase: SupabaseClient } {
  return { supabase }
}
