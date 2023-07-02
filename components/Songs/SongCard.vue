<script setup lang="ts">
import type { Song } from '~/Core/Models/Song'
import type { Singer } from '~/Core/Models/Singer'

defineProps<{
  song: Song
  singers: Singer[]
}>()

const Config = useRuntimeConfig()

const CardRef = ref<HTMLElement | undefined>(undefined)
const IsHovering = ref<boolean>(false)

function OnMouseEnter() {
  IsHovering.value = true
}

function OnMouseLeave() {
  IsHovering.value = false
}
</script>

<template>
  <div class="relative" @mouseenter="OnMouseEnter" @mouseleave="OnMouseLeave">
    <NuxtLink :to="`/songs/${song.Id}`">
      <img
        class="aspect-1/1 object-cover" :class="{
          'rounded-xl': !IsHovering,
          'rounded-l-xl': IsHovering,
        }"
        :src="`${Config.public.API_URL}${song.GetCover()}`"
      >
    </NuxtLink>
    <div
      v-if="IsHovering"
      ref="CardRef"
      v-motion-slide-left
      class="absolute bottom-0 top-0 z-1 w-56 flex flex-col transform-gpu justify-between rounded-r-xl bg-latte-surface2 px-5 py-3 shadow -right-160% dark:bg-mocha-surface2"
    >
      <div>
        <p class="font-semibold text-latte-text dark:text-mocha-text">
          {{ song.GetTitle() }}
        </p>
        <p v-for="singer in singers" :key="singer.Id" class="text-sm text-latte-subtext1 dark:text-mocha-subtext1">
          {{ singer.GetName() }} · <span>{{ new Date(song.ReleaseDate).toLocaleDateString() }}</span>
        </p>
      </div>
      <div class="flex items-center gap-2 overflow-hidden text-ellipsis whitespace-nowrap text-sm">
        <p>
          from <span class="font-semibold text-latte-lavender dark:text-mocha-lavender">{{ song.GetAlbum().GetTitle() }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
