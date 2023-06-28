<script setup lang="ts">
import { useMotion } from '@vueuse/motion'
import type { Album } from '~/Core/Models/Album'
import type { Singer } from '~/Core/Models/Singer'

defineProps<{
  album: Album
  singers: Singer[]
}>()

const CardRef = ref<HTMLElement | undefined>(undefined)

const IsHovering = ref<boolean>(false)

const MotionInstance = useMotion(CardRef)

function OnMouseEnter() {
  IsHovering.value = true
}

function OnMouseLeave() {
  MotionInstance.leave(() => {
    IsHovering.value = false
  })
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
        :src="`https://localhost:7215${album.Cover}`"
      >
    </NuxtLink>
    <div
      v-if="IsHovering"
      ref="CardRef"
      v-motion
      :initial="{
        opacity: 0,
        scale: 0.5,
      }"
      :enter="{
        opacity: 1,
        scale: 1,
      }"
      :leave="{
        opacity: 0,
        scale: 0.5,
      }"
      class="absolute bottom-0 top-0 z-1 transform-gpu rounded-r-xl bg-latte-surface2 px-5 py-3 shadow -right-42 dark:bg-mocha-surface2"
    >
      <p class="text-latte-text dark:text-mocha-text">
        {{ album.GetTitle() }}
      </p>
      <p v-for="singer in singers" :key="singer.Id" class="text-sm text-latte-subtext1 dark:text-mocha-subtext1">
        {{ singer.GetName() }}
      </p>
    </div>
  </div>
</template>
