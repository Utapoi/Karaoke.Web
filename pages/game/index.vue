<script setup lang="ts">
import KaraokePlayer from '~/components/player/KaraokePlayer.vue'

definePageMeta({
  layout: 'game',
})
</script>

<template>
  <div class="relative">
    <KaraokePlayer />
    <div class="absolute left-0 right-0 top-12">
      <div class="w-full flex items-center justify-center gap-16">
        <!-- Player 01 -->
        <div class="flex flex-col items-center justify-center gap-4">
          <div class="h-38 w-38 rounded-full bg-red-500" />
          <p>Player 01</p>
        </div>

        <!-- Player 02 -->
        <div class="flex flex-col items-center justify-center gap-4">
          <div class="h-38 w-38 rounded-full bg-green-500" />
          <p>Player 02</p>
        </div>

        <!-- Player 03 -->
        <div class="flex flex-col items-center justify-center gap-4">
          <div class="h-38 w-38 rounded-full bg-blue-500" />
          <p>Player 03</p>
        </div>
        <!-- Player 04 -->
        <div class="flex flex-col items-center justify-center gap-4">
          <div class="h-38 w-38 rounded-full bg-orange-500" />
          <p>Player 03</p>
        </div>
      </div>
    </div>
  </div>
</template>
