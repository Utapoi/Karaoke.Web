<script setup lang="ts">
const Route = useRoute()
</script>

<template>
  <header>
    <section class="h-16 w-full flex items-center justify-between px-6">
      <div class="flex items-start gap-1.5">
        <h1 class="text-2xl font-semibold text-[#f90b31]">
          Utapoi
        </h1>
        <span class="text-xs font-semibold text-gray-500">Admin</span>
      </div>
      <AvatarCard />
    </section>
  </header>
  <main class="w-full">
    <div class="h-full w-full flex">
      <div class="min-h-[calc(100vh-4rem)] pt-4 md:min-w-64">
        <div class="w-full flex flex-col flex-wrap gap-0.5 pl-3 hover:cursor-pointer">
          <NuxtLink to="/admin">
            <div class="w-full inline-flex items-center gap-4 rounded-lg p-2 hover:bg-gray-800" :class="{ 'bg-gray-800': Route.path === '/admin' }">
              <span class="i-fluent:home-16-filled text-lg" />
              <span>Dashboard</span>
            </div>
          </NuxtLink>
          <NuxtLink to="/admin/songs">
            <div class="w-full inline-flex items-center gap-4 rounded-lg p-2 hover:bg-gray-800" :class="{ 'bg-gray-800': Route.path.includes('/admin/songs') }">
              <span class="i-game-icons:musical-notes text-lg" />
              <span>Songs</span>
            </div>
          </NuxtLink>
          <NuxtLink to="/admin/artists">
            <div class="w-full inline-flex items-center gap-4 rounded-lg p-2 hover:bg-gray-800" :class="{ 'bg-gray-800': Route.path.includes('/admin/artists') }">
              <span class="i-game-icons:microphone text-lg" />
              <span>Artists</span>
            </div>
          </NuxtLink>
          <span class="my-4 w-full border-t border-gray-700" />
          <NuxtLink to="/">
            <div class="w-full inline-flex items-center gap-4 rounded-lg p-2 hover:bg-gray-800">
              <span class="i-fluent:arrow-left-24-filled text-lg" />
              <span>Back</span>
            </div>
          </NuxtLink>
        </div>
      </div>
      <slot />
    </div>
  </main>
</template>
