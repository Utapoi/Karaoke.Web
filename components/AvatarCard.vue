<script setup lang="ts">
import { useAuthStore } from '~/composables/stores/AuthStore'

// HTML Refs
const MenuRef = ref<HTMLElement | undefined>(undefined)

// Stores
const AuthStore = useAuthStore()

// Variables
const ShowMenu = ref(false)

/**
 * @description Click outside event handler
 */
onClickOutside(MenuRef, () => {
  ShowMenu.value = false
})

/**
 * @description Click event handler
 */
function OnClick() {
  ShowMenu.value = !ShowMenu.value
}
</script>

<template>
  <div ref="MenuRef" class="relative flex items-center justify-center gap-2 hover:cursor-pointer" @click="OnClick">
    <div class="h-10 w-10 inline-flex items-center justify-center rounded-lg bg-gray-400 text-sm">
      M
    </div>
    <div class="flex flex-col flex-wrap">
      <Transition>
        <div class="font-semibold text-gray-400">
          <div v-if="!ShowMenu" class="i-fluent:chevron-down-24-filled text-sm" />
          <div v-if="ShowMenu" class="i-fluent:chevron-up-24-filled text-sm" />
        </div>
      </Transition>
    </div>

    <!-- Menu Panel -->
    <Transition>
      <div v-if="ShowMenu" class="absolute top-12 z-1 w-64 select-none rounded-lg bg-secondary p-1 shadow-lg -right-2">
        <div class="w-full flex flex-col items-center space-y-1">
          <NuxtLink to="/account" class="w-full">
            <div class="w-full inline-flex items-center rounded-md px-2 py-1 transition-all duration-200 hover:bg-black/20">
              <span class="i-fluent:person-12-filled" />
              <span class="ml-1">Profile</span>
            </div>
          </NuxtLink>
          <NuxtLink to="/account/settings" class="w-full">
            <div class="w-full inline-flex items-center rounded-md px-2 py-1 transition-all duration-200 hover:bg-black/20">
              <span class="i-fluent:settings-20-filled" />
              <span class="ml-1">Settings</span>
            </div>
          </NuxtLink>
          <NuxtLink v-if="AuthStore.IsInRole('Admin')" to="/admin" class="w-full">
            <div class="w-full inline-flex items-center rounded-md px-2 py-1 transition-all duration-200 hover:bg-black/20">
              <span class="i-fluent:important-12-filled" />
              <span class="ml-1">Administrator</span>
            </div>
          </NuxtLink>
          <div class="w-full" @click="AuthStore.Clear()">
            <div class="w-full inline-flex items-center rounded-md px-2 py-1 transition-all duration-200 hover:bg-black/20">
              <span class="i-fluent:arrow-exit-20-filled transform-rotate-180" />
              <span class="ml-1">Log out</span>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
.v-enter-from {
  opacity: 0
}
.v-enter-to {
  opacity: 1
}
.v-enter-active {
  transition: opacity 0.25s ease-in-out
}
</style>
