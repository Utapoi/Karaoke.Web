<script setup lang="ts">
import type { Album } from '~/Core/Models/Album'
import type { Singer } from '~/Core/Models/Singer'

defineProps<{
  album: Album
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
    <NuxtLink :to="`/albums/${album.Id}`">
      <img
        class="aspect-1/1 object-cover" :class="{
          'rounded-xl': !IsHovering,
          'rounded-l-xl': IsHovering,
        }"
        :src="`${Config.public.API_URL}${album.Cover}`"
      >
    </NuxtLink>
    <div
      v-if="IsHovering"
      ref="CardRef"
      v-motion-slide-left
      class="absolute bottom-0 top-0 z-1 w-56 flex flex-col transform-gpu justify-between rounded-r-xl bg-latte-surface2 px-5 py-3 shadow -right-56 dark:bg-mocha-surface2"
    >
      <div>
        <p class="font-semibold text-latte-text dark:text-mocha-text">
          {{ album.GetTitle() }}
        </p>
        <p v-for="singer in singers" :key="singer.Id" class="text-sm text-latte-subtext1 dark:text-mocha-subtext1">
          {{ singer.GetName() }} · <span v-if="album.ReleaseDate">{{ new Date(album.ReleaseDate).toLocaleDateString() }}</span>
        </p>
      </div>
    </div>
  </div>
</template>
