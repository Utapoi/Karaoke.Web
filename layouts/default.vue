<script setup lang="ts">
import { useUsersService } from '~/Composables/Services/UsersService'
import { useAuthStore } from '~/Composables/stores/AuthStore'
import DarkToggle from '~/components/Common/DarkToggle.vue'

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
              <span class="hidden xl:block">Home</span>
            </div>
          </NuxtLink>
          <NuxtLink to="/songs">
            <div class="w-full inline-flex items-center gap-4 rounded-lg p-2 hover:text-white" :class="{ 'text-white': Route.path.includes('/songs'), 'text-gray-400': !Route.path.includes('/songs') }">
              <span class="hidden xl:block">Songs</span>
            </div>
          </NuxtLink>
          <NuxtLink to="/singers">
            <div class="w-full inline-flex items-center gap-4 rounded-lg p-2 hover:text-white" :class="{ 'text-white': Route.path.includes('/singers'), 'text-gray-400': !Route.path.includes('/singers') }">
              <span class="hidden xl:block">Artists</span>
            </div>
          </NuxtLink>
        </div>

        <div class="flex items-center gap-4">
          <div class="flex items-center gap-4">
            <DarkToggle />
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
      </div>
    </section>
  </header>
  <main class="w-full">
    <div class="h-full w-full">
      <slot />
    </div>
  </main>
</template>
