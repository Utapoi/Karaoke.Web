<script setup lang="ts">
import type { Singer } from '~/Core/Models/Singer'

defineProps<{
  singer: Singer
}>()
</script>

<template>
  <div class="relative">
    <!-- TODO: Dynamic URL from Singer.Id. -->
    <NuxtLink :to="`/singers/${singer.Id}`">
      <img :src="`https://localhost:7215${singer.ProfilePicture}`" class="aspect-1/1 transform-gpu rounded-lg object-cover transition-transform">
    </NuxtLink>
    <p class="overflow-hidden text-ellipsis whitespace-nowrap pt-1 text-latte-text dark:text-mocha-text">
      {{ singer.GetName("English") }}
    </p>
  </div>
</template>
