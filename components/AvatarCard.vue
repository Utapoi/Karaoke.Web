<script setup lang="ts">
// HTML Refs
const MenuRef = ref<HTMLElement | undefined>(undefined)

// Stores
const UserStore = useUserStore()

// Variables
const ShowMenu = ref(false)

await UserStore.GetUser()

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
    <div class="h-8 w-8 inline-flex items-center justify-center rounded-full bg-gray-400 text-sm">
      M
    </div>
    <div class="flex flex-col flex-wrap">
      <span class="text-sm">{{ UserStore.CurrentUser?.username }}</span>
    </div>

    <!-- Menu Panel -->
    <div v-if="ShowMenu" class="absolute right-0 top-10 z-1 w-64 rounded-lg bg-gray-900 p-1 shadow-lg">
      <div class="w-full flex flex-col items-center space-y-1">
        <NuxtLink to="/account" class="w-full">
          <div class="w-full inline-flex items-center rounded-md px-2 py-1 transition-all duration-200 hover:bg-gray-800">
            <span class="i-fluent:person-12-filled" />
            <span class="ml-1">Profile</span>
          </div>
        </NuxtLink>
        <NuxtLink to="/account/settings" class="w-full">
          <div class="w-full inline-flex items-center rounded-md px-2 py-1 transition-all duration-200 hover:bg-gray-800">
            <span class="i-fluent:settings-20-filled" />
            <span class="ml-1">Settings</span>
          </div>
        </NuxtLink>
        <span class="w-full border-t border-gray-800" />
        <NuxtLink v-if="UserStore.IsInRole('Admin')" to="/admin" class="w-full">
          <div class="w-full inline-flex items-center rounded-md px-2 py-1 transition-all duration-200 hover:bg-gray-800">
            <span class="i-fluent:important-12-filled" />
            <span class="ml-1">Administrator</span>
          </div>
        </NuxtLink>
        <div class="w-full" @click="UserStore.LogOut()">
          <div class="w-full inline-flex items-center rounded-md px-2 py-1 transition-all duration-200 hover:bg-gray-800">
            <span class="i-fluent:arrow-exit-20-filled transform-rotate-180" />
            <span class="ml-1">Log out</span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
