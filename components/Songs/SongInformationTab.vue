<script setup lang="ts">
import type { Song } from '~/Core/Models/Song'

defineProps<{
  song: Song
}>()
</script>

<template>
  <div class="mb-2 mt-6 rounded-xl bg-latte-surface0 dark:bg-mocha-surface0">
    <div class="mb-6 flex items-center gap-2">
      <h2 class="text-2xl text-latte-text dark:text-mocha-text">
        Latest Songs
      </h2>
    </div>
    <div class="grid grid-cols-2 w-full items-center gap-5 text-latte-text lg:grid-cols-7 md:grid-cols-5 sm:grid-cols-4 dark:text-mocha-text">
      <article class="whitespace-pre-line text-center text-justify prose prose-latte-subtext1 dark:prose-mocha-subtext1 dark:prose-invert">
        {{ song.GetLyrics() }}
      </article>
    </div>
  </div>
</template>
