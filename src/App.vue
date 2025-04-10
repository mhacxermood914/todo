<script setup>
import { onMounted } from 'vue'
import { RouterLink, RouterView } from 'vue-router'
import useSupabase from '@/composables/useSupabase'
import useAuthUser from '@/composables/useAuth'

const { supabase } = useSupabase()
const { setUser } = useAuthUser()

onMounted(() => {
  supabase.auth.onAuthStateChange((event, session) => {
    if (event === 'SIGNED_IN') setUser(session.user)
  })
})
</script>

<template>
  <div>
    <RouterView />
  </div>
</template>
