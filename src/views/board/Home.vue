<template>
  <div class="font-poppins bg-[#eee] h-screen">
    <!-- header -->
    <div class="bg-white h-[4rem] flex items-center px-3 justify-between shadow-sm">
      <div class="font-bold text-xl">Board</div>

      <div class="relative group">
        <div class="h-10 w-10 rounded-full bg-gray-400 cursor-pointer"></div>
        <ul
          class="absolute hidden group-hover:block bg-white shadow-md -mt-1 pt-[.5rem] rounded text-sm z-10 right-[.5rem]"
        >
          <li class="px-4 py-2 hover:bg-gray-100 cursor-pointer" @click="loggedOut">Deconnexion</li>
        </ul>
      </div>
    </div>
    <!-- end header -->

    <div class="flex items-center mt-[4rem]">
      <div class="w-11/12 mx-auto grid grid-cols-4 gap-8">
        <div class="bg-white w-full rounded-md h-[12rem] shadow-md cursor-pointer"></div>
        <div class="bg-white w-full rounded-md h-[12rem] shadow-md cursor-pointer"></div>
        <div class="bg-white w-full rounded-md h-[12rem] shadow-md cursor-pointer"></div>
        <div class="bg-white w-full rounded-md h-[12rem] shadow-md cursor-pointer"></div>
        <div class="bg-white w-full rounded-md h-[12rem] shadow-md cursor-pointer"></div>
      </div>
    </div>
  </div>
</template>
<script setup>
import useAuthUser from '@/composables/useAuth'
import router from '@/router'

const { logout } = useAuthUser()

async function loggedOut() {
  await logout()
  router.push({ name: 'login' })
}
</script>
