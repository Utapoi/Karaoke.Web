<script setup lang="ts">
import { useUsersService } from '~/composables/services/UsersService'
import { useAuthStore } from '~/composables/stores/AuthStore'

const Route = useRoute()
const AuthStore = useAuthStore()
const UsersService = useUsersService()

onMounted(async () => {
  if (!AuthStore.IsConnected) {
    const u = await UsersService.GetCurrentUser()

    if (u !== undefined)
      AuthStore.SetCurrentUser(u)
  }
})
</script>

<template>
  <header>
    <section class="w-full px-6">
      <div class="mx-auto h-16 max-w-7xl w-full flex items-center justify-between">
        <div class="flex items-start gap-1.5">
          <h1 class="text-2xl font-semibold text-[#f90b31]">
            Utapoi
          </h1>
          <span class="text-xs font-semibold text-gray-500">Karaoke</span>
        </div>
        <div class="h-full w-full flex items-center justify-center gap-4">
          <NuxtLink to="/">
            <div class="w-full inline-flex items-center gap-4 rounded-lg p-2 hover:text-white" :class="{ 'text-white': Route.path === '/', 'text-gray-400': Route.path !== '/' }">
              <!-- <span class="i-fluent:home-16-filled text-lg" /> -->
              <span class="hidden xl:block">Home</span>
            </div>
          </NuxtLink>
          <NuxtLink to="/songs">
            <div class="w-full inline-flex items-center gap-4 rounded-lg p-2 hover:text-white" :class="{ 'text-white': Route.path.includes('/songs'), 'text-gray-400': !Route.path.includes('/songs') }">
              <!-- <span class="i-game-icons:musical-notes text-lg" /> -->
              <span class="hidden xl:block">Songs</span>
            </div>
          </NuxtLink>
          <NuxtLink to="/singers">
            <div class="w-full inline-flex items-center gap-4 rounded-lg p-2 hover:text-white" :class="{ 'text-white': Route.path.includes('/singers'), 'text-gray-400': !Route.path.includes('/singers') }">
              <!-- <span class="i-game-icons:microphone text-lg" /> -->
              <span class="hidden xl:block">Artists</span>
            </div>
          </NuxtLink>
        </div>

        <div v-if="AuthStore.IsConnected">
          <AvatarCard />
        </div>
        <div v-else class="flex items-center gap-2">
          <NuxtLink to="/auth/login">
            <div class="border border-[#f90b31] rounded-full px-3 py-1 text-sm text-[#f90b31] transition-all duration-200 hover:cursor-pointer hover:bg-[#f90b31] hover:text-white">
              Login
            </div>
          </NuxtLink>
        </div>
      </div>
    </section>
  </header>
  <main class="w-full">
    <div class="h-full w-full">
      <!-- <div class="min-h-[calc(100vh-4rem)] pt-4 xl:min-w-44">
        <div class="w-full flex flex-col flex-wrap gap-0.5 pl-3 hover:cursor-pointer">
          <NuxtLink to="/">
            <div class="w-full inline-flex items-center gap-4 rounded-lg p-2 hover:bg-gray-800" :class="{ 'bg-gray-800': Route.path === '/' }">
              <span class="i-fluent:home-16-filled text-lg" />
              <span class="hidden xl:block">Home</span>
            </div>
          </NuxtLink>
          <NuxtLink to="/songs">
            <div class="w-full inline-flex items-center gap-4 rounded-lg p-2 hover:bg-gray-800" :class="{ 'bg-gray-800': Route.path.includes('/songs') }">
              <span class="i-game-icons:musical-notes text-lg" />
              <span class="hidden xl:block">Songs</span>
            </div>
          </NuxtLink>
          <NuxtLink to="/singers">
            <div class="w-full inline-flex items-center gap-4 rounded-lg p-2 hover:bg-gray-800" :class="{ 'bg-gray-800': Route.path.includes('/artists') }">
              <span class="i-game-icons:microphone text-lg" />
              <span class="hidden xl:block">Artists</span>
            </div>
          </NuxtLink>
          <span v-if="UserStore.IsInRole('Admin')" class="my-4 w-full border-t border-gray-700" />
          <NuxtLink to="/admin">
            <div class="w-full inline-flex items-center gap-4 rounded-lg p-2 hover:bg-gray-800" :class="{ 'bg-gray-800': Route.path.includes('/artists') }">
              <span class="i-fluent:important-12-filled text-lg" />
              <span class="hidden xl:block">Admin</span>
            </div>
          </NuxtLink>
        </div>
      </div> -->
      <slot />
    </div>
  </main>
</template>
