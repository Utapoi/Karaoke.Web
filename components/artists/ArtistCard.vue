<script setup lang="ts">
import type { Singer } from '~/Core/Models/Singer'

defineProps<{
  singer: Singer
}>()
</script>

<template>
  <div class="h-full w-full">
    <div class="h-80 w-auto hover:cursor-pointer">
      <!-- TODO: Dynamic URL from Singer.Id. -->
      <NuxtLink class="h-full w-full" :to="`/singers/${singer.Id}`">
        <img :src="`${singer.ProfilePicture}`" class="h-full w-full transform-gpu rounded-lg object-cover transition-transform hover:scale-102">
      </NuxtLink>
    </div>
    <p class="overflow-hidden text-ellipsis whitespace-nowrap pt-1">
      {{ singer.GetName("English") }}
    </p>
  </div>
</template>
